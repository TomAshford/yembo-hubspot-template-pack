const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const path = require('path');
const merge = require('merge-stream');
const fs = require('fs');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
// const obfuscate = require('gulp-obfuscate');

const paths = {
  scss: 'yembo-tp/assets/src/scss/theme/',
  cssOutput: 'yembo-tp/assets/build/css',
  jsSrc: 'yembo-tp/assets/src/js',
  jsOutput: 'yembo-tp/assets/build/js',
};

const modules = 'yembo-tp/modules';

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

// Theme-level styles task
gulp.task('styles', function() {
  const folders = getFolders(paths.scss);
  const tasks = folders.map(function(folder) {
    return gulp.src(path.join(paths.scss, folder, '*.scss'))
      .pipe(concat(`${folder}.scss`))
      .pipe(sass({ quietDeps: true }).on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(rename({
        basename: folder,
        extname: '.min.css',
      }))
      .pipe(gulp.dest(paths.cssOutput));
  });
  return merge(tasks);
});

// Module-level CSS task with minification
function moduleCSS() {
  var folders = getFolders(modules);
  var tasks = folders.map(function(folder) {
    var src = path.join(modules, folder);
    return gulp.src(path.join(src, '/**/src/module.scss'))
      .pipe(sourcemaps.init())
      .pipe(sass({ quietDeps: true }).on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(rename(function(file) {
        file.dirname = path.dirname(file.dirname);
        return file;
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(src));
  });
  return merge(tasks);
}

gulp.task('moduleCSS', moduleCSS);

// Module-level JS task with obfuscation
function moduleJS() {
  var folders = getFolders(modules);
  var tasks = folders.map(function(folder) {
    var src = path.join(modules, folder);
    return gulp.src(path.join(src, '/**/src/module.js'))
      .pipe(plumber())
      // .pipe(uglify())
      // .pipe(obfuscate())
      .pipe(rename(function(file) {
        file.dirname = path.dirname(file.dirname);
        return file;
      }))
      .pipe(gulp.dest(src));
  });
  return merge(tasks);
}

gulp.task('moduleJS', moduleJS);

gulp.task('compileJS', function() {
  return gulp.src(path.join(paths.jsSrc, '**/*.js'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('theme.js')) // Concatenate all JS files into theme.js
    .pipe(uglify())
    // .pipe(obfuscate())
    .pipe(rename({ suffix: '.min' })) // Rename to theme.min.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsOutput));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(paths.scss + '**/*.scss', gulp.series('styles')); // Watch theme-level SCSS files
  gulp.watch(modules + '/**/src/*.scss', gulp.series('moduleCSS')); // Watch module-level SCSS files
  gulp.watch(modules + '/**/src/*.js', gulp.series('moduleJS')); // Watch module-level JS files
  gulp.watch(paths.jsSrc + '/**/*.js', gulp.series('compileJS')); // Watch src/js files
});

// Default task
gulp.task('default', gulp.series('styles', gulp.parallel('moduleCSS', 'moduleJS', 'compileJS'), 'watch'));
