var gulp = require('gulp'),
    path = require('path'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    rimraf = require('rimraf'),
    source = require('vinyl-source-stream'),
    _ = require('lodash'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    jade = require('gulp-jade'),
    template = require('gulp-template-compile-commonjs'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    eslint = require('gulp-eslint'),
    esdoc = require('gulp-esdoc'),
    KarmaServer = require('karma').Server,
    config = {
        entryFile: './src/app.js',
        outputDir: './dist/',
        outputJsFile: 'app.js'
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
    .pipe(source(config.outputJsFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-js', ['jst'], function() {
    return bundle();
});

gulp.task('build-persistent', function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('jst', function () {
  return gulp.src('templates/**/*jade')
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
    return watch('templates/**/*jade', function () {
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

/**
 *  https://github.com/adametry/gulp-eslint
 */
gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!src/templates.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * https://www.npmjs.com/package/gulp-esdoc
 */
gulp.task('docs', function () {
    return gulp.src("./src")
        .pipe(esdoc({ destination: "./docs" }));
});

gulp.task('watch', ['clean', 'build-js', 'less'], function() {
    browserSync({
        server: {
            baseDir: './',
            //https://browsersync.io/docs/options/
            routes: {
                "/past-games": "./"
            }
        },
        files: config.outputDir + 'app.css'
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

// Lint, test and build docs. Supposed to be called before git push
gulp.task('pre-push', ['lint', 'test', 'docs']);

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './',
            //https://browsersync.io/docs/options/
            routes: {
                "/past-games": "./"
            }
        },
        files: config.outputDir + 'app.css'
    });
});

gulp.task('test', function (done) {
    new KarmaServer({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, done).start();
});
