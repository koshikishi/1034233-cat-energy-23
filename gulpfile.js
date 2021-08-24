const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const squoosh = require('gulp-libsquoosh');
const svgmin = require('gulp-svgmin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const path = require('path');
const del = require('del');
const sync = require('browser-sync').create();

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      includePaths: require('scss-resets').includePaths
    }))
    .pipe(postcss([
      require('webp-in-css/plugin'),
      autoprefixer(),
      csso({restructure: false})
    ]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
};

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'));
};

exports.scripts = scripts;

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh((file) => {
      return {
        encodeOptions: {
          ...(path.extname(file.path) === '.png' ? {
            oxipng: {}
          } : {
            mozjpeg: {
              quality: 80
            }
          })
        }
      };
    }))
    .pipe(gulp.dest('build/img'));
};

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/icon-*.svg'
  ])
    .pipe(gulp.dest('build/img'))
};

exports.copyImages = copyImages;

// SVG

const optimizeSvg = () => {
  return gulp.src([
    'source/img/**/*.svg',
    '!source/img/icon-*.svg'
  ])
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
};

exports.optimizeSvg = optimizeSvg;

// WebP

const createWebp = () => {
  return gulp.src([
    'source/img/**/*.{jpg,png}',
    '!source/img/favicons/**'
  ])
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('build/img'));
};

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgmin((file) => {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [
          {
            name: 'cleanupIDs',
            params: {
              prefix: prefix + '-',
              minify: true
            }
          },
          {
            name: 'removeViewBox',
            active: false
          }
        ]
      };
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};

exports.sprite = sprite;

// Clean

const clean = () => {
  return del('build');
};

exports.clean = clean;

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
  done();
};

exports.copy = copy;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false
  });
  done();
};

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
};

exports.reload = reload;

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
};

// Build

exports.build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    createWebp,
    sprite
  )
);

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    sprite
  ),
  server,
  watcher
);
