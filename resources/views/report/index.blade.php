@extends('layouts.app')

@section('content')

<div class="container">
   <div class="row justify-content-center">
       <div class="col-md-12">
           <div class="card">
               <div class="col">
                    <select class="js-customer js-states form-control" id="customer_name" name="state">
                        <option value=""></option>
                    </select>
               </div>
           </div>
       </div>
   </div>
</div>
@endsection

@push('ajax_crud')
   <script src="/js/sweetalert.js"></script>
   <script src="/js/report.js"></script>
@endpush
