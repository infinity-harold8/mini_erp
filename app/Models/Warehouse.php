<?php

namespace App\Models;

use App\Models\StockLevels;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Warehouse extends Model
{

        /** @use HasFactory<\Database\Factories\UserFactory> */
        use HasFactory, Notifiable, HasRoles;
    protected $fillable = [
        'name',
        'location'
    ];

    public function user_warehouse()
    {
        return $this->belongsToMany(User::class, 'user_warehouse', 'warehouse_id', 'user_id');
    }

    public function stockLevels(){
        return $this->hasMany(StockLevels::class, 'warehouse_id');
    }
}
