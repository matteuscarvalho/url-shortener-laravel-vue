<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Links extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'url', 'code', 'users_id'];

    public function click(): HasOne
    {
        return $this->hasOne(Clicks::class);
    }

}
