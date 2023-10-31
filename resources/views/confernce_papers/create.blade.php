@extends('admin.layout')

@section('content')

@section('content')
    <div class="container-fluid flex-grow-1 container-p-y">
        <div class="row">
            <div class="col-lg-12 mb-4 order-0">
                <div class="card">
                    <div class="card-header badge bg-label-info">
                        <h4>Conference Papers</h4>
                    </div>
                    <div class="d-flex align-items-end row">
                        <div class="col-sm-12">
                            <div class="card-body">
                                <div class="text-dark">
                                    <form action="{{ route('conference_papers.store') }}" method="POST">
                                        @csrf
                                        <div class="form-group">
                                            <label for="title">Title:</label>
                                            <input type="text" name="title" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="year">Date:</label>
                                            <input type="date" name="date" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="impact_factor">Authors:</label>
                                            <input type="text" name="authors" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="impact_factor">Publisher:</label>
                                            <input type="text" name="publisher" class="form-control" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="link">Link:</label>
                                            <input type="text" name="link" class="form-control" required>
                                        </div>
                                        <button type="submit" class="btn mt-2 btn-primary">Submit</button>
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
