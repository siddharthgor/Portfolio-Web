<?php

namespace App\Http\Controllers;

use App\Models\ConferencePaper;
use Illuminate\Http\Request;

class ConferencePaperController extends Controller
{
    public function index(Request $request)
    {
        return view('confernce_papers.index');
    }
    public function list(Request $request)
    {
        $conference_papers = ConferencePaper::all();
        return response()->json(['rows' => $conference_papers]);
    }
    public function create()
    {
        return view('confernce_papers.create');
    }
    public function store(Request $request)
    {
        ConferencePaper::create($request->all());
        return redirect()->route('conference_papers.index')->with('success', 'Conference Paper added successfully!');
    }
}
