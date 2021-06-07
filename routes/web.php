<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Auth::routes();

Route::group(['middleware' => ['auth']], function() {
    // your routes
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/customer', [App\Http\Controllers\CustomerController::class, 'index'])->name('home');
    Route::get('/product', [App\Http\Controllers\ProductController::class, 'index'])->name('home');
});


Auth::routes();

// Customer Route
Route::get('/customers', [App\Http\Controllers\CustomerController::class, 'get_customer_data'])->name('data');
Route::post('/addcustomer', [App\Http\Controllers\CustomerController::class, 'store'])->name('customer.store');
Route::get('/addcustomer/{id}/edit', [App\Http\Controllers\CustomerController::class, 'update'])->name('customer.update');
Route::delete('/addcustomer/{id}',  [App\Http\Controllers\CustomerController::class, 'destroy'])->name('customer.destroy');

// Product Route
Route::get('/products', [App\Http\Controllers\ProductController::class, 'get_product_data'])->name('data');
Route::post('/addproduct', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');
Route::get('/addproduct/{id}/edit', [App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
Route::delete('/addproduct/{id}',  [App\Http\Controllers\ProductController::class, 'destroy'])->name('product.destroy');

// Invovice Route
Route::get('/invoice', [App\Http\Controllers\InvoiceController::class, 'index'])->name('home');
