<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AcademicPerformance;

class AcademicPerformanceController extends Controller
{
    //
    public function index(Request $request)
    {
        return view('academic_performance.index');
    }
    public function list(Request $request)
    {
        $academicPerformances = AcademicPerformance::all();
        return response()->json(['rows' => $academicPerformances]);
    }
    public function create()
    {
        return view('academic_performance.create');
    }

    public function store(Request $request)
    {
        AcademicPerformance::create($request->all());
        return redirect()->route('academic_performance.create')->with('success', 'Academic performance added successfully!');
    }
}
