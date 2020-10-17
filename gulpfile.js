let preprocessor = 'sass', // Препроцессор
  fileswatch = 'html,htm,txt,json,md', // Список расширений для прослушки
  imageswatch = 'jpg,jpeg,png,webp,svg', // Список для прослушки и сжатия
  baseDir = 'app', // Базовый путь к каталогу без «/» в конце
  online = true; // Если «false» - Browsersync будет работать в автономном режиме без подключения к интернету

let paths = {

  scripts: {
    src: [
      baseDir + '/#dist/vender/humburger.js',
      baseDir + '/#dist/vender/up.js',

      baseDir + '/#dist/vender/slider.js',
      baseDir + '/#dist/vender/tabs.js',

      baseDir + '/#dist/vender/modal.js',

      baseDir + '/#dist/vender/select.js',
      baseDir + '/#dist/vender/form.js',
      baseDir + '/#dist/vender/mask.js',
      baseDir + '/#dist/vender/toastr.js',
      
      baseDir + '/#dist/vender/fullPage.js',

      baseDir + '/#dist/vender/hello.js',
      // baseDir + '/#dist/vender/common.js' // Всегда в конце
    ],
    dest: baseDir + '/js',
  },

  styles: {
    src: baseDir + '/#dist/' + preprocessor + '/main.*',
    dest: baseDir + '/css',
  },

  images: {
    src: baseDir + '/#dist/images/**/*',
    dest: baseDir + '/images',
  },

  deploy: {
    hostname: 'username@yousite.com',
    destination: 'yousite/public_html/',
    include: [ /* '*.htaccess' */],
    exclude: ['**/Thumbs.db', '**/*.DS_Store'],
  },

  cssOutputNameMin: 'app.min.css',
  // cssOutputName: 'app.css',
  jsOutputName: 'app.min.js',

}

// Логика

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rsync = require('gulp-rsync');
const del = require('del');
const gcmq = require('gulp-group-css-media-queries');

function browsersync() {
  browserSync.init({
    server: { baseDir: baseDir + '/' },
    notify: false,
    online: online
  })
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(concat(paths.jsOutputName))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

function styles() {
  return src(paths.styles.src)
    .pipe(eval(preprocessor)())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(gcmq())
    .pipe(sass({ outputStyle: 'expanded' }))
    /* nested - показывает вложенность (по умолчанию);
     * expanded - полностью развёрнутый CSS; 
     * compact - каждый селектор на новой строке; 
     * compressed - всё в одну строку.
     */
    // .pipe(concat(paths.cssOutputName))
    // .pipe(dest(paths.styles.dest))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } }, /* формат: 'beautify' */ }))
    .pipe(concat(paths.cssOutputNameMin))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

function images() {
  return src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin())
    .pipe(dest(paths.images.dest))
}

function cleanimg() {
  return del('' + paths.images.dest + '/**/*', { force: true })
}

function deploy() {
  return src(baseDir + '/')
    .pipe(rsync({
      root: baseDir + '/',
      hostname: paths.deploy.hostname,
      destination: paths.deploy.destination,
      include: paths.deploy.include,
      exclude: paths.deploy.exclude,
      recursive: true,
      archive: true,
      silent: false,
      compress: true
    }))
}

function startwatch() {
  watch(baseDir + '/**/' + preprocessor + '/**/*', styles);
  watch(baseDir + '/**/*.{' + imageswatch + '}', images);
  watch(baseDir + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
  watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], scripts);
}

exports.browsersync = browsersync;
exports.assets = series(cleanimg, styles, scripts, images);
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanimg = cleanimg;
exports.deploy = deploy;
exports.default = parallel(images, styles, scripts, browsersync, startwatch);