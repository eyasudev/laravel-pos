<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoiceid',
        'productid',
        'productquanlity',
        'productprice',
        'productdiscount',
        'totalAmount'
    ];


    /***
     * Get the voice item from invoice.
     * */
    public function invoice() {
        return $this->belongsTo( invoice::class );
    }
}
