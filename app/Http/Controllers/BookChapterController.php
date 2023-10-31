<?php

namespace App\Http\Controllers;

use App\Models\BookChapter;
use Illuminate\Http\Request;

class BookChapterController extends Controller
{
    public function index(Request $request)
    {
        return view('book_chapters.index');
    }
    public function list(Request $request)
    {
        $conference_papers = BookChapter::all();
        return response()->json(['rows' => $conference_papers]);
    }
    public function create()
    {
        return view('book_chapters.create');
    }
    public function store(Request $request)
    {
        BookChapter::create($request->all());
        return redirect()->route('books_chapters.index')->with('success', 'Book Chapter added successfully!');
    }
}
