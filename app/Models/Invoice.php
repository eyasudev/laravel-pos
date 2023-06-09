<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'customerid',
        'totalproduct',
        'totalAmount',
        'receiveAmount'
    ];


    /***
     * Get the customer to own invoice.
     * */
    public function customer() {
        return $this->belongsTo( Customer::class );
    }

    /**
     * Get Invoice for the customer.
     * */
    public function invoiceItems() {
        return $this->hasMany( Invoice::class );
    }
}
