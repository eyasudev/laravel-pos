<div class="modal fade" id="modal-id">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            
            <div class="modal-header">
                <h4 class="modal-title" id="userCrudModal"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>

            <div class="modal-body">
                <form id="customerdata">
                    <div class="form-group row">
                        <div class="col">
                            <select class="js-customer js-states form-control" id="customer_name" name="state">
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="col">
                            <input type="text" placeholder="Select Date" class="form-control" id="datepicker">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <select class="js-product js-states form-control" name="state">
                                <option value=""></option>
                            </select>
                        </div>

                        <div class="col">
                            <input type="text" class="form-control" id="product_price" name="name" value="" placeholder="Product Price">
                        </div>

                        <div class="col">
                            <input type="text" class="form-control" id="product_quanlity" name="name" value="" placeholder="Product Quanlity">
                        </div>

                    </div>   
                        </label><br>

                    <input type="submit" value="Submit" id="submit" class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;">

                </form>
            </div>

        </div>
    </div>
</div>