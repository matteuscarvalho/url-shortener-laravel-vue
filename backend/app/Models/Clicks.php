<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Clicks extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'click',
        'ip',
        'user_agent',
        'link_id',
    ];

    public function link(): BelongsTo
    {
        return $this->belongsTo(Links::class);
    }
}
