<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'organization',
        'location',
        'start_date',
        'end_date',
        'duration_years',
        'duration_months',
    ];

    public function jobDescriptions()
    {
        return $this->hasMany(JobDescription::class);
    }
}
