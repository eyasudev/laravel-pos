
<div class="modal" tabindex="-1" id="modal-id">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="userCrudModal"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <div id="customerdata">
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
                            <select class="js-product js-states form-control" id="product_list" >
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" title="Product Discount"  id="product_discount" name="name" value="" placeholder="Product Discount">
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" title="Product Price" id="product_price" name="name" value="" placeholder="Product Price">
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" title="Product Quanl" id="product_quanlity" name="name" value="" placeholder="Product Quanlity">
                        </div>
                        <div class="col">
                            <button type="button" id="add_product" class="btn btn-primary"> Add Product </button>
                        </div>

                    </div>   
                </div>
                <hr>
                <div class="table-containner">
                    <!-- https://codepen.io/vemba/pen/EvJPex -->
                    <table class="table table-bordered" id="productInvoiceList">
                        <thead>
                            <tr>
                            <th scope="col">P Name </th>
                            <th scope="col">P Quanlity</th>
                            <th scope="col">P Price</th>
                            <th scope="col">P Discount</th>
                            <th scope="col">P Total</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <hr>
                <div class="row">
                    <div class="col">
                    &nbsp;
                    </div>
                    <div class="col">
                        <h4> Total Amount: </h4>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="customer_due" name="name" value="" placeholder="Customer Due">
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" id="total_amount" name="name" value="" placeholder="Total Amount">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="create_invoice" type="button" class="btn btn-primary">Create Invoice</button>
            </div>
        </div>
    </div>
</div>