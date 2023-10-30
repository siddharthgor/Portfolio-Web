<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;
use App\Models\JobDescription;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::all();
        return view('experience.index', compact('experiences'));
    }

    public function create()
    {
        return view('experience.create');
    }

    public function store(Request $request)
    {
        $experience = Experience::create([
            'title' => $request->input('title'),
            'organization' => $request->input('organization'),
            'location' => $request->input('location'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'duration_years' => $request->input('duration_years'),
            'duration_months' => $request->input('duration_months')
        ]);

        $jobDescriptions = $request->input('job_descriptions');

        foreach ($jobDescriptions as $description) {
            JobDescription::create([
                'experience_id' => $experience->id,
                'description' => $description
            ]);
        }

        return redirect()->route('experience.index')->with('success', 'Experience added successfully!');
    }
}
