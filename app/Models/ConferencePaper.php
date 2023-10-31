<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConferencePaper extends Model
{

    use HasFactory;
    protected $fillable = ['title', 'date', 'authors', 'publisher', 'link'];
}
