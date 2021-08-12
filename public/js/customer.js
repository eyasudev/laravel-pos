$(document).ready(function () {
    get_customer_data()
    var inputFieldsRegex = [
        new RegExp(/^[a-z ,.'-]+$/i), // Customer name.
        new RegExp(/^[a-zA-Z0-9 \s,'-]*$/i), // Address.
        new RegExp(/^(\+92|0|92)[0-9]{10}$/i) // Phone Number
    ]


    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Get all company
    function get_customer_data() {
        $.ajax({
            url: root_url,
            type: 'GET',
            data: {}
        }).done(function (data) {
            table_data_row(data.data)
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
    $("body").on("click", "#createNewCustomer", function (e) {
        e.preventDefault;
        $('#customerAlert').hide();
        $('#userCrudModal').html("Create customer");
        $('#submit').val("Create customer");
        $('#modal-id').modal('show');
        $('#customer_id').val('');
        $('#customerdata').trigger("reset");
    });

    //Save data into database
    $('body').on('click', '#submit', function (event) {
        event.preventDefault()
        var id = $("#customer_id").val();
        var name = $("#name").val();
        var address = $("#address").val();
        var phoneNumber = $("#phone_number").val();
        
        if ( inputFieldsRegex[0].test( name ) == true && inputFieldsRegex[1].test( address ) == true && inputFieldsRegex[2].test( phoneNumber ) == true ) {
            $.ajax({
                url: store,
                type: "POST",
                data: {
                    id: id,
                    name: name,
                    address: address,
                    phoneNumber: phoneNumber
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
                    get_customer_data()
                },
                error: function (data) {
                    console.log( data );
                }
            });
        } else {
            $('#customerAlert').show();

            var customerInvalidInput = '';

            if ( inputFieldsRegex[0].test( name ) == false ) {
                customerInvalidInput = "Name";
                $('#name').addClass('red');
            } 

            if ( !address || inputFieldsRegex[1].test( address ) == false ) {
                customerInvalidInput += ", address ";
                $('#address').addClass('red');
            }

            if ( !phoneNumber || inputFieldsRegex[1].test( phoneNumber ) == false ) {
                customerInvalidInput += ", phoneNumber ";
                $('#phone_number').addClass('red');
            }
            
            customerInvalidInput += " cannot be empty or invalid."
            
            $('#customerAlert').val( customerInvalidInput );
            $('#customerAlert').text( customerInvalidInput );

            
        }
    });

    //Edit modal window
    $('body').on('click', '#editCompany', function (event) {

        event.preventDefault();
        var id = $(this).data('id');

        $.get(store + '/' + id + '/edit', function (data) {
        
            $('#userCrudModal').html("Edit customer");
            $('#submit').val("Edit customer");
            $('#modal-id').modal('show');
            $('#customer_id').val(data.data.id);
            $('#name').val(data.data.name);
            $('#address').val(data.data.area);
            $('#phone_number').val(data.data.phone_number);
        })
    });

    //DeleteCompany
    $('body').on('click', '#deleteCompany', function (event) {
        if (!confirm("Do you really want to do this?")) {
            return false;
        }

        event.preventDefault();
        var id = $(this).attr('data-id');

        $.ajax(
            {
                url: store + '/' + id,
                type: 'DELETE',
                data: {
                    id: id
                },
                success: function (response) {

                    Swal.fire(
                        'Remind!',
                        'Company deleted successfully!',
                        'success'
                    )
                    get_customer_data();
                }
            });
        return false;
    });

});