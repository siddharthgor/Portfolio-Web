@extends('admin.home')
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
                                <div class="table-responsive">
                                    <a href="{{ route('academic_performance.create') }}"
                                        class="btn btn-sm btn-primary float-right mt-3">Add Academic Performance</a>
                                    <table id="table" data-toggle="table" data-url="/admin/academic_performance/list"
                                        data-icons-prefix="bx" data-icons="icons" data-loading-template="loadingTemplate"
                                        data-show-refresh="true" data-total-field="total" data-data-field="rows"
                                        data-page-list="[2, 4, 10, All]" data-search="true" data-side-pagination="client"
                                        data-pagination="true" data-show-columns="true" data-show-toggle="true"
                                        data-search-highlight="true" data-page-number="1" data-query-params="">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true" data-visible="true" data-field="id">Id</th>
                                                <th data-visible="true" data-field="degree_title">Degree</th>
                                                <th data-visible="true"data-field="university">
                                                    University</th>
                                                <th data-visible="true"data-field="institution">
                                                    Institution</th>
                                                <th data-visible="true" data-field="title">Title</th>
                                                <th data-visible="true"data-field="year">
                                                    Year</th>
                                                <th data-visible="true"data-field="grade">Grade</th>

                                            </tr>
                                        </thead>
                                    </table>


                                </div>
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
