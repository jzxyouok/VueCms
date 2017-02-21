<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});


/* Auth */
Route::get('/login', function () {
    return view('auth.login');
});
Auth::routes();

/* Dashboard */
Route::group(['prefix' => 'dashboard'], function () {
   Route::get('{path?}', 'DashboardController@index')->where('path', '[\/\w\.-]*');
});
