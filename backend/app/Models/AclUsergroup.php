<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclUsergroup extends Model
{
    use HasFactory;

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
        return self::findOrFail($id);
    }
}
