$(document).ready(function () {

    //Insert company data
    $("body").on("click", "#createNewProduct", function (e) {

        e.preventDefault;
        $('#userCrudModal').html("Create product");
        $('#submit').val("Create product");
        $('#modal-id').modal('show');
        $('#product_id').val('');
        $('#productdata').trigger("reset");
    });
});