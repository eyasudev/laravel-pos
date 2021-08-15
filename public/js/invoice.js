$(function () {
    var invoiceTotalAmount, tableRowInvoiceCount = 0, customerData, productData;
    var invoiceItemList = [];
    var inputFieldsRegex = [ new RegExp(/^[0-9]+$/i)];
    
    get_invoice_data();
    
    $( "#datepicker" ).datepicker();
    $( "#datepicker" ).datepicker( "setDate", new Date() );
    $('#product_discount').val(0);

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    /**
     * Get Invoice Data
     */
    function get_invoice_data() {
        $.ajax({
            url: invoice_url,
            type: 'GET',
            data: {}
        }).done(function (data) {
            table_data_row(data);
        });
    }

    /**
     * Create Pdf
     */
    function create_pdf() {
        var invoiceData = {};
        invoiceData.customer_id = $('#customer_name').val();
        invoiceData.totalAmount = $('#total_amount').val();
        invoiceData.receivedAmount = $('#received_amount').val();
        invoiceData.id = $('#customer_id').val();
        invoiceData.totalproduct = tableRowInvoiceCount;
        invoiceData.invoiceItemList = invoiceItemList;

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
            type: 'POST',
            url: create_invoice_pdf_url,
            data: {
                invoiceData
            },
            dataType: 'json',
            success: function(response){
                $('#modal-id').modal('hide');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Success',
                    showConfirmButton: false,
                    timer: 1500
                });
                get_invoice_data();
                // var blob = new Blob([response]);
                // var link = document.createElement('a');
                // link.href = window.URL.createObjectURL(blob);
                // link.download = "Sample.pdf";
                // link.click();
            },
            error: function(blob){
                
            }
        });
    }

    //Delete Invoice
    $('body').on('click', '#deleteInvoice', function (event) {
        if (!confirm("Do you really want to do this?")) {
            return false;
        }

        event.preventDefault();
        var id = $(this).attr('data-id');

        $.ajax(
            {
                url: invoice_url + '/' + id,
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
                    get_invoice_data();
                }
            });
        return false;
    });

    /**
     * Get invoice data on modal load.
     */
    function get_invoice_data_on_modal_load() {
        $.ajax({
            url: get_invoice_url,
            type: 'GET',
            data: {}
        }).done(function (data) {
            customerData = data.customerData;
            productData = data.products;
    
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


    /**
     * @name table data row.
     * @param {*} data - append table row html.
     */
    function table_data_row(data ) {

        var rows = '';
        $.each(data, function (key, value) {

            rows = rows + '<tr>';
            rows = rows + '<td>' + value.id + '</td>';
            rows = rows + '<td>' + value.name + '</td>';
            rows = rows + '<td>' + value.totalproduct + '</td>';
            rows = rows + '<td data-id="' + value.id + '">';
            rows = rows + '<a class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;" id="editInvoice" data-id="' + value.id + '" data-toggle="modal" data-target="#modal-id">Edit</a> ';
            rows = rows + '<a class="btn btn-sm btn-outline-danger py-0" style="font-size: 0.8em;" id="deleteInvoice" data-id="' + value.id + '" >Delete</a> ';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });

        $("#invoiceTable tbody").html(rows);
    }
    
    //Insert company data
    $("body").on("click", "#createNewInvoice", function (e) {
        
        e.preventDefault;
        resetInvoiceModal();
        $('#userCrudModal').html("Create Invoice");
        $('#submit').val("Create inovice");
        $('#modal-id').modal('show');
        $('#customer_id').val('');
        $('#customerdata').trigger("reset");
        invoiceItemList = [];
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

    //Edit Invoice.
    $('body').on('click', '#editInvoice', function (event) {
    
        event.preventDefault();
        resetInvoiceModal();
        var id = $(this).data('id');
        get_invoice_data_on_modal_load();

        $.get(invoice_url + '/' + id + '/edit', function (data) {
            $('#userCrudModal').html("Edit Invoice");
            $('#create_invoice').val("Edit Invoice");
            $('#create_invoice').text("Edit Invoice");
            $('#customer_id').val(data.data.id);
            $('#modal-id').modal('show');
            $('#received_amount').val(data.data.receiveAmount);
            invoiceTotalAmount = parseInt(data.data.totalAmount);
            $('#total_amount').val(data.data.totalAmount);
            $("#customer_name").select2("val", data.data.customerid.toString());
            $('#datepicker').datepicker("setDate", new Date(data.data.created_at) );
            appendProductInvoiceItemListToTable( data.data.invoiceItem );
        })
    });

    /***
     * Reset Invoice Modal Field.
     */
    function resetInvoiceModal() {
        var invoiceCount = 0;
        $('#received_amount').val(0);
        $('#total_amount').val(0);
        $("#customer_name").val("");
        $('#datepicker').datepicker("setDate", new Date() );
        
        for ( var i = 0 ; i < invoiceItemList.length ; i++ ) {
            invoiceCount++;
            $('#row-' + invoiceCount ).remove();
        }
    }

    /**
     * @name appendProductInvoiceItemListToTable
     * @description append product invoice list to table.
     * @param {*} value 
     */
     function appendProductInvoiceItemListToTable( value ) {
        var rows = '';
        for ( var i = 0 ; i < value.length ; i++  ) {
            tableRowInvoiceCount ++;
            rows = rows + '<tr  id="row-' + tableRowInvoiceCount + '" >';
            rows = rows + '<td>' + product_name_by_id( value[i].productid )  + '</td>';
            rows = rows + '<td>' + value[i].productquanlity + '</td>';
            rows = rows + '<td>' + value[i].productprice + '</td>';
            rows = rows + '<td>' + value[i].productdiscount + '</td>';
            rows = rows + '<td id="total-amount-' + tableRowInvoiceCount + '">' + value[i].totalAmount + '</td>';
            rows = rows + '<td> <button data-id=' + tableRowInvoiceCount +  ' type="button" id="delete-row" class="delete btn btn-primary btn-sm">Delete</button> </td>';
            rows = rows + '</tr>';
        }
        
        invoiceItemList.push( value );
        $("#productInvoiceList tbody").append(rows);
    }

    function product_name_by_id ( id ) {
        const result = productData.filter( product => product.id == id );
        return result[0].product_name;
    }


    $('#add_product').click(function(){
        var productInvoiceList = {};
        var isValid = true;
        productInvoiceList.productDiscount = $('#product_discount').val();
        productInvoiceList.productPrice = $('#product_price').val();
        productInvoiceList.productQuanlity = $('#product_quanlity').val();
        productInvoiceList.productList = $('#product_list').val();
        productInvoiceList.productListTitle = $('#product_list option:selected').text();
        productInvoiceList.productListTitleId = $('#product_list option:selected').val();
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
        
            appendProductInvoiceListToTable( productInvoiceList ); // function call.

        }

        /**
         * @name appendProductInvoiceListToTable
         * @description append product invoice list to table.
         * @param {*} value 
         */
        function appendProductInvoiceListToTable( value ) {
            //console.log( value );
            // console.log( $('#total_amount').val() );
            var rows = '';
            tableRowInvoiceCount ++;
            rows = rows + '<tr  id="row-' + tableRowInvoiceCount + '" >';
            rows = rows + '<td>' + value.productListTitle + '</td>';
            rows = rows + '<td>' + value.productQuanlity + '</td>';
            rows = rows + '<td>' + value.productPrice + '</td>';
            rows = rows + '<td>' + value.productDiscount + '</td>';
            rows = rows + '<td id="total-amount-' + tableRowInvoiceCount + '">' + value.totalAmount + '</td>';
            rows = rows + '<td> <button data-id=' + tableRowInvoiceCount +  ' type="button" id="delete-row" class="delete btn btn-primary btn-sm">Delete</button> </td>';
            rows = rows + '</tr>';
            invoiceItemList.push( value );
            $("#productInvoiceList tbody").append(rows);
            
            if ( $('#total_amount').val() == '' || $('#total_amount').val() == 0 ) {
                invoiceTotalAmount = value.totalAmount;
                $('#total_amount').val( invoiceTotalAmount  );
                 
            } else {
                invoiceTotalAmount = invoiceTotalAmount +  value.totalAmount;
                $('#total_amount').val(invoiceTotalAmount);
            }
        }
    });

    $(document).on('click', '#delete-row', function(){ 
        // Your Code
        var id = $(this).attr('data-id');
        tableRowInvoiceCount --;

        let totalAmount = $('#total_amount').val();
        totalAmount = totalAmount - $('#total-amount-' + id ).text();
        $('#total_amount').val(totalAmount);
        
        $('#row-' + id ).remove();
    });

    $('#customer_name').on('change', function() {});

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