@extends('admin.home')
@section('content')
    <div class="container-fluid flex-grow-1 container-p-y">
        <div class="row">
            <div class="col-lg-12 mb-4 order-0">
                <div class="card">
                    <div class="card-header badge bg-label-danger">
                        <h4>Experience</h4>
                    </div>
                    <div class="d-flex align-items-end row">
                        <div class="col-sm-12">
                            <div class="card-body ">

                                <form action="{{ route('experience.store') }}" method="post">
                                    @csrf
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="title" name="title" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="organization" class="form-label">Organization</label>
                                        <input type="text" class="form-control" id="organization" name="organization"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="location" class="form-label">Location</label>
                                        <input type="text" class="form-control" id="location" name="location" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="start_date" class="form-label">Start Date</label>
                                        <input type="date" class="form-control" id="start_date" name="start_date"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="end_date" class="form-label">End Date</label>
                                        <input type="date" class="form-control" id="end_date" name="end_date">
                                    </div>
                                    <div class="mb-3">
                                        <label for="duration_years" class="form-label">Duration (Years)</label>
                                        <input type="number" class="form-control" id="duration_years" name="duration_years"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="duration_months" class="form-label">Duration (Months)</label>
                                        <input type="number" class="form-control" id="duration_months"
                                            name="duration_months" required>
                                    </div>

                                    <h2>Job Descriptions</h2>
                                    <div id="job_descriptions_container">
                                        <div class="mb-3">
                                            <label for="job_descriptions" class="form-label">Description</label>
                                            <input type="text" class="form-control" id="job_descriptions"
                                                name="job_descriptions[]" required>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <button type="button" class="btn btn-success mt-2"
                                            onclick="addJobDescription()">Add
                                            Job
                                            Description</button>
                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <script>
                                function addJobDescription() {
                                    const jobDescriptionInput = document.createElement('input');
                                    jobDescriptionInput.type = 'text';
                                    jobDescriptionInput.classList.add('form-control');
                                    jobDescriptionInput.classList.add('mb-2');
                                    jobDescriptionInput.classList.add('mt-3');
                                    jobDescriptionInput.name = 'job_descriptions[]';
                                    jobDescriptionInput.required = true;

                                    const jobDescriptionContainer = document.getElementById('job_descriptions_container');
                                    jobDescriptionContainer.appendChild(jobDescriptionInput);
                                }
                            </script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
