$(document).ready(function () {

    get_invoice_data()
    
    $( "#datepicker" ).datepicker();
    // $('#datepicker').datetimepicker({
    //     format: 'dd/mm/yyyy'
    // });
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Get all company
    function get_invoice_data() {
        $.ajax({
            url: invoice_url,
            type: 'GET',
            data: {}
        }).done(function (data) {
            table_data_row(data.data)
            
        });
    }


    //Get all company
    function get_invoice_data_on_modal_load() {
        $.ajax({
            url: get_invoice_url,
            type: 'GET',
            data: {}
        }).done(function (data) {
            //
            $('.js-customer').select2({
                theme: "classic",
                placeholder: "Select customer",
                allowClear: true,
                width: '100%'
            });
            for ( var i = 0 ; i < data.customerData.length ; i++ ) {
                $('.js-customer').append("<option value=" +  data.customerData[i].id + ">" + data.customerData[i].name + "</option>");
            }

            $('.js-product').select2({
                theme: "classic",
                placeholder: "Select product",
                allowClear: true,
                width: '100%'
            });
            for ( var i = 0 ; i < data.products.length ; i++ ) {
                $('.js-product').append("<option value=" +  data.products[i].id + ">" + data.products[i].product_name + "</option>");
            }
        });
    }


    //Company table row
    function table_data_row(data) {

        var rows = '';

        $.each(data, function (key, value) {

            rows = rows + '<tr>';
            rows = rows + '<td>' + value.name + '</td>';
            rows = rows + '<td>' + value.phone_number + '</td>';
            rows = rows + '<td data-id="' + value.id + '">';
            rows = rows + '<a class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;" id="editCompany" data-id="' + value.id + '" data-toggle="modal" data-target="#modal-id">Edit</a> ';
            rows = rows + '<a class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;" id="deleteCompany" data-id="' + value.id + '" >Delete</a> ';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });

        $("tbody").html(rows);
    }
    
    //Insert company data
    $("body").on("click", "#createNewInvoice", function (e) {

        e.preventDefault;
        $('#userCrudModal').html("Create Invoice");
        $('#submit').val("Create inovice");
        $('#modal-id').modal('show');
        $('#customer_id').val('');
        $('#customerdata').trigger("reset");

        get_invoice_data_on_modal_load();

    });


    //Save data into database
    $('body').on('click', '#submit', function (event) {
        var customerName =  $('#customer_name').val();
        var dataPicker = $('#datepicker').val();
        var productName = $('#product_name').val();
        var productPrice = $('#product_price').val();
        var productQuanlity = $('#product_quanlity').val();
       
    });


});