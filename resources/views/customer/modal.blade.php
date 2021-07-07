<div class="modal fade" id="modal-id">
    <div class="modal-dialog">
        <div class="modal-content">
            
            <div class="modal-header">
                <h4 class="modal-title" id="userCrudModal"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>

            <div class="modal-body">
                <form id="customerdata">                   
                    <div class="form-group row">    
                        <div class="col">
                            <input type="hidden" id="customer_id" name="customer_id" value="">  
                            <input type="text" class="form-control" id="name" name="name" value="" placeholder="Customer Name">
                        </div>
                    </div>
                        
                    <div class="form-group row">
                        <div class="col">
                            <input type="text" class="form-control" id="phone_number" name="phone_number" value="" placeholder="Phone no">
                        </div>

                        <div class="col">
                            <input type="text" class="form-control" id="address" name="address" value="" placeholder="Address">
                        </div>
                    </div>

                    </label><br>

                    <input type="submit" value="Submit" id="submit" class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;">

                </form>
            </div>

        </div>
    </div>
</div>