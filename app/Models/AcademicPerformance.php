<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicPerformance extends Model
{
    use HasFactory;
    protected $fillable = ['degree_title', 'institution', 'year', 'grade', 'title', 'university'];
}
