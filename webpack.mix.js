const mix = require('laravel-mix');

mix
  .js('./src/main.js', 'dist/project-helpers.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'css/project-helpers.bundle.css')
  .setPublicPath('dist')