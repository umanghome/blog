const { parallel, watch, dest, src } = require('gulp');
const imagemin = require('gulp-imagemin');
const sassProcessor = require('gulp-sass');

// We want to be using canonical Sass, rather than node-sass
sassProcessor.compiler = require('sass');

// Flags whether we compress the output etc
const isProduction = process.env.NODE_ENV === 'production';

// The main Sass method grabs all root Sass files,
// processes them, then sends them to the output calculator
const sass = () => {
  return src('./css/main.scss')
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(dest('./blog/css', { sourceMaps: !isProduction }));
};


// Grabs all images, runs them through imagemin
// and plops them in the dist folder
const images = () => {
  // We have specific configs for jpeg and png files to try
  // to really pull down asset sizes
  return src('./img/**/*')
    .pipe(
      imagemin(
        [
          imagemin.mozjpeg({ quality: 60, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5, interlaced: null }),
        ],
        {
          silent: true,
        }
      )
    )
    .pipe(dest('./blog/img'));
};

// Set each directory and contents that we want to watch and
// assign the relevant task. `ignoreInitial` set to true will
// prevent the task being run when we run `gulp watch`, but it
// will run when a file changes.
const watcher = () => {
  watch('./css/*.scss', { ignoreInitial: true }, sass);
  watch('./img/**/*', { ignoreInitial: true }, images);
};

// The default (if someone just runs `gulp`) is to run each task in parrallel
exports.default = parallel(images, sass);

// This is our watcher task that instructs gulp to watch directories and
// act accordingly
exports.watch = watcher;
