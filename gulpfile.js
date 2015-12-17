var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jade = require('gulp-jade');
var template = require('./gulp-template-compile-commonjs.js');
var concat = require('gulp-concat');
var watch = require('gulp-watch')

var config = {
  entryFile: './src/app.js',
  outputDir: './dist/',
  outputFile: 'app.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
}

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('jst', function () {
  gulp.src('templates/**/*jade')
      .pipe(jade())
      .pipe(template({
            name: function (file) {
              return file.relative.replace(/\.html$/, '');
            },
            templateSettings: {
              variable: 'data'
            }

          })
        )
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('src'))
      .pipe(bundle());
});

gulp.task('watch-templates', function (cb) {
    watch('templates/**/*jade', function () {
        gulp.start('jst');
    });
});

gulp.task('watch', ['build-persistent', 'jst'], function() {

    browserSync({
        server: {
            baseDir: './',
            //https://browsersync.io/docs/options/
            routes: {
                "/collections": "./"
            }
        }
    });

    watch('templates/**/*jade', function () {
        gulp.start('jst');
    });

    getBundler().on('update', function() {
        gulp.start('build-persistent');
    });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
