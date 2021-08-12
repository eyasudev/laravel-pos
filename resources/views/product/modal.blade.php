<div class="modal fade" id="modal-id">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="userCrudProductModal"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <form id="productdata">
                    <div id="productAlert" class="alert alert-danger" role="alert"></div>
                    <div class="form-group row">
                        <div class="col">
                            <input type="hidden" id="product_id" name="product_id" value="">
                            <input type="text" class="form-control" id="product_name" name="product_name" value="" placeholder="Product Name" title="Product Name" >
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" id="company_name" name="company_name" value="" placeholder="Company Name" title="Company Name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col">
                            <input type="number" class="form-control" id="purchase_price" name="purchase_price" value="" placeholder="Purchase Price" title="Purchase Price" >
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" id="trade_price" name="trade_price" value="" placeholder="Trade Price" title="Trade Price" >
                        </div>
                        <div class="col">
                            <input type="number" class="form-control" id="product_packing" name="product_packing" value="" placeholder="Product Packing" title="Product Packing">
                        </div>
                    </div>
                    </label><br>
                    <input type="submit" value="Submit" id="submit" class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;">
                </form>
            </div>
        </div>
    </div>
</div>