<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'area'
    ];

    /***
     * User belong to user.
     */
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get Invoice for the customer.
     * */
    public function invoices() {
        return $this->hasMany( Customer::class );
    }

}
