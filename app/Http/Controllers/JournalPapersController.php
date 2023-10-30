<?php

namespace App\Http\Controllers;

use App\Models\JournalPaper;
use Illuminate\Http\Request;

class JournalPapersController extends Controller
{
    public function index(Request $request)
    {
        return view('journal_papers.index');
    }
    public function list(Request $request)
    {
        $journal_papers = JournalPaper::all();
        return response()->json(['rows' => $journal_papers]);
    }
    public function create()
    {
        return view('journal_papers.create');
    }
    public function store(Request $request)
    {
        JournalPaper::create($request->all());
        return redirect()->route('journal_papers.index')->with('success', 'Journal Paper added successfully!');
    }
}
