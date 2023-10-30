<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JournalPaper extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'year', 'impact_factor', 'link'];
}
