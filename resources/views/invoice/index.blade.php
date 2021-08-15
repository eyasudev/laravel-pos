@extends('layouts.app')

@section('content')

<div class="container">
   <div class="row justify-content-center">
      <div class="col-md-12">
          <div class="card">
            <div class="col ">
               <button type="button" id="createNewInvoice" class="btn btn-md btn-primary mt-2 mb-2"> Add Invoice </button>
            </div> 
            <table id="invoiceTable" class="table table-bordered">
              <thead>
                  <tr>
                     <th>Invoice Id</th>
                     <th>Customer Number</th>
                     <th>Total Product</th>
                     <th width="200px">Action</th>
                  </tr>
              </thead>

              <tbody>
              </tbody>

            </table>
              @include('invoice.modal')
           </div>
        </div>
    </div>
</div>
@endsection

@push('ajax_crud')
   <script src="/js/sweetalert.js"></script>
   <script src="/js/invoice.js"></script>
@endpush
