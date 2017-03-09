const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.copy('resources/assets/fonts','public/fonts');
mix.copy('resources/assets/img','public/img');

//封装OneUI的CSS和JS
mix.combine(['resources/assets/css/simplemde.css'],'public/css/simplemde.css');

mix.combine([
    'resources/assets/css/bootstrap.min.css',
    'resources/assets/css/oneui.css',
    'resources/assets/css/sweetalert.css',
], 'public/css/oneui.css');

mix.combine([
    'resources/assets/js/plugins/jquery.min.js',
    'resources/assets/js/plugins/bootstrap.min.js',
    'resources/assets/js/plugins/jquery.slimscroll.min.js',
    'resources/assets/js/plugins/jquery.scrollLock.min.js',
    'resources/assets/js/plugins/jquery.appear.min.js',
    'resources/assets/js/plugins/jquery.placeholder.min.js',
    'resources/assets/js/plugins/js.cookie.min.js',
    'resources/assets/js/plugins/common.js',    
], 'public/js/oneui.js');

mix.copy('resources/assets/js/plugins/','public/js/plugins/',false);


mix.js('resources/assets/js/app.js', 'public/js');
