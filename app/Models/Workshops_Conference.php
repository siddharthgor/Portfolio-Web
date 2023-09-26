<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workshops_Conference extends Model
{
    use HasFactory;
    protected $table = 'workshops_conference';
    protected $fillable = ['type', 'title', 'location', 'start_date', 'end_date'];
}
