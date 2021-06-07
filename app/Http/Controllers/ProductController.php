<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('product.index');
    }

    public function get_product_data(Request $request)
    {
      $products = Product::latest()->paginate(5);

      return \Request::ajax() ? 
                   response()->json($products,Response::HTTP_OK) 
                   : abort(404);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_Id = Auth::user()->id;
            
        Product::updateOrCreate(
            [
                'id' => $request->id
            ],
            [
                'product_name' => $request->productName,
                'company_name' => $request->companyName,
                'purchase_price' => $request->purchasePrice,
                'trade_price' => $request->tradePrice,
                'product_packing' => $request->productPacking,
                'created_by' => $user_Id
            ]
            );
    
            return response()->json(
            [
            'success' => true,
            'message' => 'Data inserted successfully'
             ]
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        //
        $product  = Product::find($id);

        return response()->json([
         'data' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $product = Product::find($id);

        $product->delete();
    
        return response()->json([
          'message' => 'Data deleted successfully!'
        ]);
    }
}
