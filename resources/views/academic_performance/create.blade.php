<!-- resources/views/academic_performance/create.blade.php -->
@extends('admin.layout')

@section('content')

@section('content')
    <div class="container-fluid flex-grow-1 container-p-y">
        <div class="row">
            <div class="col-lg-12 mb-4 order-0">
                <div class="card">
                    <div class="card-header badge bg-label-primary">
                        <h4>Academic Performance</h4>
                    </div>
                    <div class="d-flex align-items-end row">
                        <div class="col-sm-12">
                            <div class="card-body">
                                <div class="text-dark">
                                    <form action="{{ route('academic_performance.store') }}" method="post">
                                        @csrf
                                        <div class="form-group">
                                            <label for="degree_title">Degree Title</label>
                                            <input type="text" class="form-control" id="degree_title"
                                                name="degree_title">
                                        </div>
                                        <div class="form-group">
                                            <label for="institution">Institution</label>
                                            <input type="text" class="form-control" id="institution" name="institution">
                                        </div>
                                        <div class="form-group">
                                            <label for="university">University</label>
                                            <input type="text" class="form-control" id="university" name="university">
                                        </div>
                                        <div class="form-group">
                                            <label for="title">Specific Title (Optional)</label>
                                            <input type="text" class="form-control" id="title" name="title">
                                        </div>
                                        <div class="form-group">
                                            <label for="year">Year</label>
                                            <input type="text" class="form-control" id="year" name="year">
                                        </div>
                                        <div class="form-group">
                                            <label for="grade">Grade</label>
                                            <input type="text" class="form-control" id="grade" name="grade">
                                        </div>
                                        <button type="submit" class=" m-2 btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
