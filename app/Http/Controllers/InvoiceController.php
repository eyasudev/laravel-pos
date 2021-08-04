<?php

namespace App\Http\Controllers;

use App\Models\customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PDF;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('invoice.index');
    }

    public function get_invoice_data_on_modal_load () {
        $customers = Customer::all();
        $products = Product::all();
        
        return \Request::ajax() ? 
                response()->json(
                    [ 
                        'customerData' => $customers,
                        'products' => $products
                    ],Response::HTTP_OK) 
                : abort(404);
    }


    // Generate PDF
    public function create_pdf() {

        $array = ["property" => "property", "second" => "b"];
        $data = (object) $array;
        $pdf = PDF::loadView('invoice.pdf_view', compact( 'data',$data));
  
        // download PDF file with download method
        $path = public_path('pdf/');
        $fileName =  time().'.'. 'pdf' ;
        $pdf->save($path . '/' . $fileName);

        $pdf = public_path('pdf/'.$fileName);
        return response()->download($pdf);
      }

    public function get_invoices_data() {
        // $customers = Customer::all();
        // $users = User::all();
        
        // return \Request::ajax() ? 
        //         response()->json(
        //             [ 
        //                 'customerData' => $customers,
        //                 'users' => $users
        //             ],Response::HTTP_OK) 
        //         : abort(404);
    }


}
