<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable,ModelTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'email_verified_at',
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function createUser($inputData)
    {
        $inputData['password'] = Hash::make($inputData['password']);
        $user = self::create($inputData);

        (new AclUserUsergroup())->add([
            [
                'user_id' => $user->id,
                'acl_usergroup_id' => $inputData['usergroup_id'],
            ]
        ]);

        return $user;
    }

    public function getAll($filter,$callback)
    {
        $query = self::query();

        if(!empty($filter['search'])){
            $query->where(function($q) use ($filter){
                $q->where('name','LIKE','%'.$filter['search'].'%')
                  ->orWhere('email','LIKE','%'.$filter['search'].'%');
            });
        }

        return $callback($query);
    }

    public function updatebyId($id, $inputData)
    {
        $userData['name'] = $inputData['name'];
        $userData['email'] = $inputData['email'];

        if(!empty($inputData['password'])){
            $userData['password'] = Hash::make($inputData['password']);
        }

        $user = self::where('id', $id)->update($userData);

        if(!empty($user)) {
            AclUserUsergroup::where('user_id', $id)->delete();

            (new AclUserUsergroup())->add([
                [
                    'user_id' => $id,
                    'acl_usergroup_id' => $inputData['usergroup_id'],
                ]
            ]);
        }
        return $user;
    }

    public function getById($id)
    {
        return self::find($id);
    }
}
