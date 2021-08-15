<?php

namespace App\Http\Controllers;

use App\Models\customer;
use App\Models\Product;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

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

    /**
     * Get invoice data on modal on load
     * @return  \Illuminate\Http\Response
     */
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

    /**
     * Create invoice and generate pdf. 
     * @return  \Illuminate\Http\Response
     */
    public function create_pdf( Request $request ) {
        // get customer object.
        $customer = Customer::find($request->invoiceData['customer_id']);

        // $invoice = new Invoice;
        // $invoice->customerid = $request->invoiceData['customer_id'];
        // $invoice->totalproduct = $request->invoiceData['totalproduct'];
        // $invoice->totalAmount = $request->invoiceData['totalAmount'];
        // $invoice->receiveAmount =$request->invoiceData['receivedAmount'];
        // $invoice->save();

        // foreach ( $request->invoiceData->invoiceItemList as $value) {
        //     dd( $value );
        // }
        // $invoiceItemList = $request->invoiceData['invoiceItemList'];
        // foreach ( $invoiceItemList as $invoiceItem ) {
        //     $invoiceTable = new InvoiceItem;
        //     $invoiceTable->invoiceid = $invoice->id;
        //     $invoiceTable->productid = $invoiceItem['productListTitleId'];
        //     $invoiceTable->productquanlity = $invoiceItem['productQuanlity'];
        //     $invoiceTable->productprice = $invoiceItem['productPrice'];
        //     $invoiceTable->productdiscount = $invoiceItem['productDiscount'];
        //     $invoiceTable->totalAmount = $invoiceItem['totalAmount'];
        //     $invoiceTable->save();
        // } 
        
        
        // $array = ["property" => "property", "second" => "b"];
        // $data = (object) $array;
        // $pdf = PDF::loadView('invoice.pdf_view', compact( 'data',$data));
  
        // // download PDF file with download method
        // $path = public_path('pdf/');
        // $fileName =  time().'.'. 'pdf' ;
        // $pdf->save($path . '/' . $fileName);

        // $pdf = public_path('pdf/'.$fileName);
        //  response()->download($pdf);

        $invoice = Invoice::updateOrCreate(
            [
                'id' => $request->invoiceData['id']
            ],
            [
                'customerid' => $request->invoiceData['customer_id'],
                'totalproduct' => $request->invoiceData['totalproduct'],
                'totalAmount' => $request->invoiceData['totalAmount'],
                'receiveAmount' => $request->invoiceData['receivedAmount']
            ]
        );
        
        $invoiceItemList = $request->invoiceData['invoiceItemList'];
        if ( isset( $request->invoiceData['id'] ) ) {
            InvoiceItem::where('invoiceid', $invoice['id'] )->delete();
            //$invoiceDeletedItem->delete();
        }
        
        foreach ( $invoiceItemList as $invoiceItem ) {
            
            if ( isset($invoiceItem['productListTitleId']) ) {
                $invoiceTable = new InvoiceItem;    
                $invoiceTable->invoiceid = $invoice['id'];
                $invoiceTable->productid = $invoiceItem['productListTitleId'];
                $invoiceTable->productquanlity = $invoiceItem['productQuanlity'];   
                $invoiceTable->productprice = $invoiceItem['productPrice'];
                $invoiceTable->productdiscount = $invoiceItem['productDiscount'];
                $invoiceTable->totalAmount = $invoiceItem['totalAmount'];
                $invoiceTable->save();
            } else if ( isset($invoiceItem['productid'])  ) {
                $invoiceTable = new InvoiceItem;
                $invoiceTable->invoiceid = $invoice['id'];
                $invoiceTable->productid = $invoiceItem['productid'];
                $invoiceTable->productquanlity = $invoiceItem['productquanlity'];   
                $invoiceTable->productprice = $invoiceItem['productprice'];
                $invoiceTable->productdiscount = $invoiceItem['productDiscount'];
                $invoiceTable->totalAmount = $invoiceItem['totalAmount'];
                $invoiceTable->save();
            }
            
            
         
        }
        // return \Request::ajax() ?  response()->json($invoice,Response::HTTP_OK) : abort(404);
        return response()->json(
            [
            'invoice' => $invoice,Response::HTTP_OK,
            'success' => true,
            'message' => 'Data inserted successfully'
             ]
        );
    }

    /**
     * Get invoice data.
     * @return  \Illuminate\Http\Response
     */
    public function get_invoices_data() {
        //$invoices = Invoice::latest()->paginate(5);
        $invoices = DB::table('invoices')
            ->join('customers', 'invoices.customerid', '=', 'customers.id')
            ->select('invoices.id', 'customers.name', 'invoices.totalproduct')
            ->get();
       
        return \Request::ajax() ?  response()->json($invoices,Response::HTTP_OK) : abort(404);

    }

    public function get_customer_invoices_content() {}

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $invoice = Invoice::find($id);

        $invoice->delete();
    
        return response()->json([
          'message' => 'Data deleted successfully!'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update($id){
        //
        $invoice  = Invoice::find($id);
        $invoice->invoiceItem = InvoiceItem::where('invoiceid', $invoice->id )->get();

        return response()->json([
         'data' => $invoice
        ]);
    }

}
