<?php

namespace App\Traits;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
trait ModelTrait
{
//    protected $casts = [
//        'created_at' => 'datetime:Y-m-d H:i:s',
//        'updated_at' => 'datetime:Y-m-d H:i:s',
//    ];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) =>  Carbon::parse($value)->format('Y-m-d H:i:s'),
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) =>  Carbon::parse($value)->format('Y-m-d H:i:s'),
        );
    }
}
