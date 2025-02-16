<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclRole extends Model
{
    use HasFactory,ModelTrait;

    protected $fillable = ['name'];

    public function add($inputData)
    {
        return self::create([
            'name' => $inputData['name']
        ]);
    }

    public function updatebyId($id, $inputData)
    {
        return self::where('id', $id)->update([
            'name' => $inputData['name']
        ]);
    }

    public function deleteById($id)
    {
        return self::destroy($id);
    }

    public function getById($id)
    {
        return self::find($id);
    }

    public function getAll($filter,$callback)
    {
        $query = self::query();

        if(!empty($filter['search'])){
            $query->where(function($q) use ($filter){
                $q->where('name','LIKE','%'.$filter['search'].'%');
            });
        }

        return $callback($query);
    }
}
