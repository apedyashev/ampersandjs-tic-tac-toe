var gulp = require('gulp');
var path = require('path');
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
var watch = require('gulp-watch');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

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

gulp.task('build-persistent', function() {
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

/**
 * Documentation: https://github.com/plus3network/gulp-less
 */
gulp.task('less', function () {
    return gulp.src('stylesheets/less/**/*.less')
        .pipe(less({
            plugins: [cleancss]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.outputDir));
});

gulp.task('watch', ['clean', 'build-persistent', 'jst', 'less'], function() {
    browserSync({
        server: {
            baseDir: './',
            //https://browsersync.io/docs/options/
            routes: {
                "/past-games": "./"
            }
        },
        files: "dist/app.css"
    });

    watch('templates/**/*jade', function () {
        gulp.start('jst');
    });

    watch('stylesheets/**/*less', function () {
        gulp.start('less');
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
