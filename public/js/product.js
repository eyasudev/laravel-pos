
$(document).ready(function () {
    get_product_data();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Get all product
    function get_product_data() {
        $.ajax({
            url: product_url,
            type: 'GET',
            data: {}
        }).done(function (data) {
            table_data_row(data.data)
        });
    }

    //product table row
    function table_data_row(data) {

        var rows = '';
       
        $.each(data, function (key, value) {

            rows = rows + '<tr>';
            rows = rows + '<td>' + value.product_name + '</td>';
            rows = rows + '<td>' + value.trade_price + '</td>';
            rows = rows + '<td data-id="' + value.id + '">';
            rows = rows + '<a class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;" id="editProduct" data-id="' + value.id + '" data-toggle="modal" data-target="#modal-id">Edit</a> ';
            rows = rows + '<a class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;" id="deleteProduct" data-id="' + value.id + '" >Delete</a> ';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });

        $("tbody").html(rows);
    }


    //Insert product data
    $("body").on("click", "#createNewProduct", function (e) {

        e.preventDefault;
        $('#userCrudProductModal').html("Create product");
        $('#submit').val("Create product");
        $('#modal-id').modal('show');
        $('#product_id').val('');
        $('#productdata').trigger("reset");
    });

    //Save data into database
    $('body').on('click', '#submit', function (event) {
        event.preventDefault()
        var id = $("#product_id").val();
        var productName = $("#product_name").val();
        var companyName = $("#company_name").val();
        var purchasePrice = $("#purchase_price").val();
        var tradePrice = $("#trade_price").val();
        var productPacking = $("#product_packing").val();
        
        $.ajax({
            url: product_store,
            type: "POST",
            data: {
                id: id,
                productName: productName,
                companyName: companyName,
                purchasePrice: purchasePrice,
                tradePrice:tradePrice,
                productPacking:productPacking
            },
            dataType: 'json',
            success: function (data) {

                $('#customerdata').trigger("reset");
                $('#modal-id').modal('hide');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                })
                get_product_data()
            },
            error: function (data) {
                console.log( data );
            }
        });
    });


    //Edit modal window
    $('body').on('click', '#editProduct', function (event) {

        event.preventDefault();
        var id = $(this).data('id');
       
        $.get(product_store + '/' + id + '/edit', function (data) {
            
            $('#userCrudProductModal').html("Edit product");
            $('#submit').val("Edit product");
            $('#modal-id').modal('show');
            $('#product_id').val(data.data.id);
            $('#product_name').val(data.data.product_name);
            $('#company_name').val(data.data.company_name);
            $('#purchase_price').val(data.data.purchase_price);
            $('#trade_price').val(data.data.trade_price);
            $('#product_packing').val(data.data.product_packing);
        })
    });

    //DeleteCompany
    $('body').on('click', '#deleteProduct', function (event) {
        if (!confirm("Do you really want to do this?")) {
            return false;
        }

        event.preventDefault();
        var id = $(this).attr('data-id');

        $.ajax(
            {
                url: product_store + '/' + id,
                type: 'DELETE',
                data: {
                    id: id
                },
                success: function (response) {

                    Swal.fire(
                        'Remind!',
                        'Product deleted successfully!',
                        'success'
                    )
                    get_product_data()
                }
            });
        return false;
    });

});