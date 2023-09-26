<?php

namespace App\Http\Controllers;

use App\Models\Workshops_Conference;
use Illuminate\Http\Request;

class Workshops_Conference_Controller extends Controller
{
    //
    public function index(Request $request)
    {
        return view('workshops_conference.index');
    }
    public function create()
    {
        return view('workshops_conference.create');
    }
    public function store(Request $request)
    {
        Workshops_Conference::create($request->all());
        return redirect()->route('workshops_conference.index')->with('success', 'Workshops and Conference added successfully!');
    }
    public function list(Request $request)
    {
        $workshops_conference = Workshops_Conference::all();
        return response()->json(['rows' => $workshops_conference]);
    }
}
