<?php

namespace App\Models\Inventory;

use App\Models\StockTransactions;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Warehouse;

class Batches extends Model
{
    protected $fillable = [
        'batch_number',
        'manufacturing_date',
        'expiry_date',
        'received_date',
        'description',
        'warehouse_id',
        'user_id',
        'gs1_batch_code'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function serialNumbers(){
        return $this->hasMany(SerialNumbers::class, 'batch_id');
    }

    public function stockTransactions(){
        return $this->hasMany(StockTransactions::class, 'batch_id');
    }
}
