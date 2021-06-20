<div class="modal fade" id="modal-id">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            
            <div class="modal-header">
                <h4 class="modal-title" id="userCrudModal"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>

            <div class="modal-body">
                <form id="customerdata">
                    <select class="js-customer js-states form-control" name="state">
                        <option value=""></option>
                    </select>
                    <select class="js-product js-states form-control" name="state">
                        <option value=""></option>
                    </select>
                    <input type="text" id="datepicker">
                    <input type="text" id="name" name="name" value="" placeholder="Customer Name">
                    <input type="hidden" id="customer_id" name="customer_id" value="">
                    <input type="text" id="name" name="name" value="" placeholder="Customer Name">
                    <input type="text" id="phone_number" name="phone_number" value="" placeholder="Phone no">
                    <input type="text" id="address" name="address" value="" placeholder="Address">
                    </label><br>

                    <input type="submit" value="Submit" id="submit" class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;">

                </form>
            </div>

        </div>
    </div>
</div>