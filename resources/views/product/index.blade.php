@extends('layouts.app')

@section('content')

<div class="container">
   <div class="row justify-content-center">
      <div class="col-md-12">
          <div class="card">
            <div class="col ">
               <button type="button" id="createNewProduct" class="btn btn-md btn-primary mt-2 mb-2"> Add Product </button>
            </div> 
            <table class="table table-bordered">
              <thead>
                  <tr>
                     <th>Product Name</th>
                     <th>Trade Price</th>
                     <th width="200px">Action</th>
                  </tr>
              </thead>

              <tbody>
              </tbody>

            </table>
              @include('product.modal')
           </div>
        </div>
    </div>
</div>
@endsection

@push('ajax_crud')
   <script src="/js/sweetalert.js"></script>
   <script src="/js/product.js"></script>
@endpush
