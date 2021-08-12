@extends('layouts.app')

@section('content')
<div class="container">
   <div class="row justify-content-center">
      <div class="col-md-12">
          <div class="card">
            <div class="col ">
               <button type="button" id="createNewCustomer" class="btn btn-md btn-primary mt-2 mb-2"> Add Customer </button>
            </div> 
            <table class="table table-bordered">
              <thead>
                  <tr>
                     <th>Name</th>
                     <th>Phone Number</th>
                     <th width="200px">Action</th>
                  </tr>
              </thead>

              <tbody>
              </tbody>

            </table>
              @include('customer.modal')
           </div>
        </div>
    </div>
</div>
@endsection

@push('ajax_crud')
   <script src="/js/sweetalert.js"></script>
   <script src="/js/customer.js"></script>
@endpush
