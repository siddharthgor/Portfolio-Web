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
                            <div class="card-body">
                                <a href="{{ route('experience.create') }}" class="btn btn-primary mb-3">Add Experience</a>
                                @foreach ($experiences as $experience)
                                    <div class="card border border-dark shadow-sm mb-3">
                                        <div class="card-header">
                                            <h3>{{ $experience->title }}</h3>
                                            <p>{{ $experience->organization }} - {{ $experience->location }}</p>
                                            <p>Start Date: {{ $experience->start_date }} | End Date:
                                                {{ $experience->end_date ?? 'Ongoing' }}</p>
                                            <p>Duration: {{ $experience->duration_years }} Years,
                                                {{ $experience->duration_months }} Months</p>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">Job Descriptions</h5>
                                            <ul class="list-group">
                                                @foreach ($experience->jobDescriptions as $description)
                                                    <li class="list-group-item">{{ $description->description }}</li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            window.icons = {
                refresh: 'bx-refresh',
                toggleOff: 'bx-toggle-left',
                toggleOn: 'bx-toggle-right'
            }

            function loadingTemplate(message) {
                return '<i class="bx bx-loader-alt bx-spin bx-flip-vertical" ></i>'
            }
        </script>
    @endsection
