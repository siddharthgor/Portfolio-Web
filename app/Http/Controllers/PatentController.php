<?php

namespace App\Http\Controllers;

use App\Models\Patent;
use Illuminate\Http\Request;

class PatentController extends Controller
{
    public function index(Request $request)
    {

        return view('patents.index');
    }
    public function list(Request $request)
    {
        $patents = Patent::all();
        return response()->json(['rows' => $patents]);
    }
    public function create()
    {
        return view('patents.create');
    }
    public function store(Request $request)
    {
        Patent::create($request->all());
        return redirect()->route('patents.index')->with('success', 'Patent added successfully!');
    }
}
