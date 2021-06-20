@extends('layouts.app')

@section('content')

<div class="container">
   <div class="row justify-content-center">
      <div class="col-md-12">
          <div class="card">
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em; width:100px;" id="createNewInvoice">Add Invoice</a>
            <table class="table table-bordered">
              <thead>
                  <tr>
                     <th>Invoice Id</th>
                     <th>Customer Number</th>
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
