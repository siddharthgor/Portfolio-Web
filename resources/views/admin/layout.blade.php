@include('includecss')

<body>
    @auth
        <div class="top-0 end-0 m-2 fixed">
            {{-- <x-toast /> --}}
        </div>
        <!-- Layout wrapper -->

        <div class="layout-wrapper layout-content-navbar">

            <div class="layout-container">

                <!-- Menu -->

                @include('admin.side-bar')

                <!-- Layout container -->
                <div class="layout-page">



                    <!-- Content wrapper -->
                    <div class="content-wrapper">

                        @yield('content')

                    </div>
                    <!-- Content wrapper -->

                    <!-- footer -->
                    @include('footer')
                    <!-- / footer -->

                </div>

                <!-- / Layout page -->
            </div>

            <!-- Overlay -->
            <div class="layout-overlay layout-menu-toggle"></div>
        </div>
    @else
        <div class="w-100 h-100 d-flex align-items-center justify-content-center"><span>You must <a href="/login">Log
                    in</a>
        </div>
    @endauth
    <!-- / Layout wrapper -->
    @include('includejs')
