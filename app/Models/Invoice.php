<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    /***
     * Get the customer to own invoice.
     * */
    public function customer() {
        return $this->belongsTo( Customer::class );
    }
}
