$(document).ready(function () {
    var invoiceTotalAmount, tableRowInvoiceCount = 0;
    var inputFieldsRegex = [
        new RegExp(/^[0-9]+$/i)
    ]
    //get_invoice_data()
    
    $( "#datepicker" ).datepicker();
    $( "#datepicker" ).datepicker( "setDate", new Date() );
    $('#product_discount').val(0);

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
    function create_pdf() {
        // $.ajax({
        //     url: create_invoice_pdf_url,
        //     type: 'GET',
        //     data: {},
        //     xhr:function(){// Seems like the only way to get access to the xhr object
        //         var xhr = new XMLHttpRequest();
        //         xhr.responseType= 'blob'
        //         return xhr;
        //     },
        // }).done(function (response) {
        //     var blob = new Blob([response]);
        //         var link = document.createElement('a');
        //         link.href = window.URL.createObjectURL(blob);
        //         link.download = "Sample.pdf";
        //         link.click();
        //     // table_data_row(data.data)
            
        // });

        $.ajax({
            type: 'GET',
            url: create_invoice_pdf_url,
            data: {},
            xhrFields: {
                responseType: 'blob'
            },
            success: function(response){
                var blob = new Blob([response]);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "Sample.pdf";
                link.click();
            },
            error: function(blob){
                console.log(blob);
            }
        });
    }


    //Get all company
    function get_invoice_data_on_modal_load() {
        console.log( get_invoice_url );
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
        // $('#product_discount').val( 0 );
        // $('#product_price').val( 0 );
        // $('#product_quanlity').val(0);

        get_invoice_data_on_modal_load();

    });


    

    $( "#create_invoice" ).click(function() {
        var customerName =  $('#customer_name').val();
        var selectedDatePicker = $('#datepicker').datepicker('getDate');
        
        var dateValidation = /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$/;
        if ( !customerName  ) {
            $('#customer_name').css('border-color', 'red');
            return;
        }
        
        if ( !selectedDatePicker ) {
            $('#datepicker').addClass('red');
            return;
        } else {
            var parseDateString = selectedDatePicker.getMonth() + 1  + '/' + selectedDatePicker.getDate() + '/' +  selectedDatePicker.getFullYear();
        }

        create_pdf();
    });


    $('#add_product').click(function(){
        var productInvoiceList = {};
        var isValid = true;
        productInvoiceList.productDiscount = $('#product_discount').val();
        productInvoiceList.productPrice = $('#product_price').val();
        productInvoiceList.productQuanlity = $('#product_quanlity').val();
        productInvoiceList.productList = $('#product_list').val();
        productInvoiceList.productListTitle = $('#product_list option:selected').text();
    
        if ( !productInvoiceList.productList ) {
            isValid = false;
            alert( 'Select Product' );
        }
        
        
        if ( !productInvoiceList.productDiscount && inputFieldsRegex[0].test( productInvoiceList.productDiscount ) == false  ) {
            isValid = false;
            $('#product_discount').addClass('red');
        }

        if ( !productInvoiceList.productQuanlity && inputFieldsRegex[0].test( productInvoiceList.productQuanlity ) == false  ) {
            isValid = false;
            $('#product_quanlity').addClass('red');
        }

        if ( !productInvoiceList.productPrice && inputFieldsRegex[0].test( productInvoiceList.productPrice ) == false ) {
            isValid = false;
            $('#product_price').addClass('red');
        }

        if ( isValid == true ) {
            $('#product_discount').removeClass('red');
            $('#product_quanlity').removeClass('red');
            $('#product_price').removeClass('red');
            productInvoiceList.totalAmount = 0;
            if (  parseInt(productInvoiceList.productDiscount) > 0 ) {
                var discountAmount =  (parseInt( productInvoiceList.productPrice ) * parseInt( productInvoiceList.productQuanlity )) * (parseInt( productInvoiceList.productDiscount )/ 100) ;
                productInvoiceList.totalAmount = parseInt( productInvoiceList.productPrice ) * parseInt( productInvoiceList.productQuanlity ) - discountAmount;

            } else { 
                productInvoiceList.totalAmount = parseInt( productInvoiceList.productPrice ) * parseInt( productInvoiceList.productQuanlity );
            }
        
            appendProductInvoiceListToTable( productInvoiceList );

        }

        function appendProductInvoiceListToTable( value ) {
            var rows = '';
            tableRowInvoiceCount ++;
            rows = rows + '<tr  id="row-' + tableRowInvoiceCount + '" >';
            rows = rows + '<td>' + value.productListTitle + '</td>';
            rows = rows + '<td>' + value.productQuanlity + '</td>';
            rows = rows + '<td>' + value.productPrice + '</td>';
            rows = rows + '<td>' + value.productDiscount + '</td>';
            rows = rows + '<td id="total-amount-' + tableRowInvoiceCount + '">' + value.totalAmount + '</td>';
            rows = rows + '<td> <button data-id=' + tableRowInvoiceCount +  ' type="button" class="delete btn btn-primary btn-sm">Delete</button> </td>';
            rows = rows + '</tr>';
            
            $("#productInvoiceList tbody").append(rows);
            
            if ( $('#total_amount').val() == '' ) {
                invoiceTotalAmount = value.totalAmount;
                $('#total_amount').val( invoiceTotalAmount  );
                 
            } else {
                invoiceTotalAmount = invoiceTotalAmount +  value.totalAmount;
                $('#total_amount').val(invoiceTotalAmount);
            }
        }

        $( ".delete" ).click(function( event ) {
            event.preventDefault();
            var id = $(this).attr('data-id');
            tableRowInvoiceCount --;

            let totalAmount = $('#total_amount').val();
            totalAmount = totalAmount - $('#total-amount-' + id ).text();
            $('#total_amount').val(totalAmount);


            $('#row-' + id ).remove();
        });

    });

    $('#product_list').on('change', function() {
        
        $.ajax({
            url: product_url + "/" + this.value,
            type: 'GET',
            data: {}
        }).done(function (data) {
           $('#product_price').val( data.trade_price );
        });
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