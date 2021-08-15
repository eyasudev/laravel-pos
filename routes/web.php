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
    Route::get('/invoice', [App\Http\Controllers\InvoiceController::class, 'index'])->name('home');
    Route::get('/report', [App\Http\Controllers\ReportController::class, 'index'])->name('home');
});


Auth::routes();

// Customer Route
Route::get('/customers', [App\Http\Controllers\CustomerController::class, 'get_customer_data'])->name('data');
Route::post('/addcustomer', [App\Http\Controllers\CustomerController::class, 'store'])->name('customer.store');
Route::get('/addcustomer/{id}/edit', [App\Http\Controllers\CustomerController::class, 'update'])->name('customer.update');
Route::delete('/addcustomer/{id}',  [App\Http\Controllers\CustomerController::class, 'destroy'])->name('customer.destroy');

// Product Route
Route::get('/products', [App\Http\Controllers\ProductController::class, 'get_product_data'])->name('product_data');
Route::get('/products/{id}', [App\Http\Controllers\ProductController::class, 'get_product_data_by_id'])->name('product_data_by_id');

Route::post('/addproduct', [App\Http\Controllers\ProductController::class, 'store'])->name('product.store');
Route::get('/addproduct/{id}/edit', [App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
Route::delete('/addproduct/{id}',  [App\Http\Controllers\ProductController::class, 'destroy'])->name('product.destroy');

// Invovice Route
Route::get('/invoices', [App\Http\Controllers\InvoiceController::class, 'get_invoices_data'])->name('invoice_data');
Route::get('/invoices/customer', [App\Http\Controllers\InvoiceController::class, 'get_customer_invoices_content'])->name('get_customer_invoice');
Route::get('/getinvoicedata', [App\Http\Controllers\InvoiceController::class, 'get_invoice_data_on_modal_load'])->name('get_invoice_data');
Route::post('/createpdf', [App\Http\Controllers\InvoiceController::class, 'create_pdf'])->name('create_invoice_pdf');
Route::delete('/invoices/{id}', [App\Http\Controllers\InvoiceController::class, 'destroy'])->name('invoice.destroy');
Route::get('/invoices/{id}/edit', [App\Http\Controllers\InvoiceController::class, 'update'])->name('invoice.update');

