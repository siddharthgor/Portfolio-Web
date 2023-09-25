 <!-- Core JS -->
 <!-- build:js assets/vendor/js/core.js -->
 <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
 <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
 <script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
 <script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.4.0/tinymce.min.js"></script>

 <script src="{{ asset('assets/vendor/js/menu.js') }}"></script>
 <!-- endbuild -->

 <!-- Vendors JS -->

 <!-- Main JS -->
 <script src="{{ asset('assets/js/main.js') }}"></script>

 <!-- Page JS -->

 <script src="{{ asset('assets/js/ui-toasts.js') }}"></script>


 <!-- Place this tag in your head or just before your close body tag. -->
 <script async defer src="https://buttons.github.io/buttons.js"></script>

 <!-- select 2 js !-->
 <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
 <script src="{{ asset('assets/vendor/js/helpers.js') }}"></script>

 <script src="{{ asset('assets/js/config.js') }}"></script>

 <!-- Bootstrap-table -->

 <link rel="stylesheet" href="{{ asset('assets/css/bootstrap-table.min.css') }}">
 <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>

 <!-- Dragula -->
 <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
 {{-- <link rel="stylesheet" href="{{ asset('assets/CSS/dragula.css') }}"> --}}

 <script src="{{ asset('assets/js/toastr.min.js') }}"></script>

 <script src="{{ asset('assets/js/bootstrap-table.min.js') }}"></script>

 <script src="{{ asset('assets/js/sweetalert2.min.js') }}"></script>

 <script src="{{ asset('assets/js/bootstrap-switch.js') }}" data-turbolinks-track="true"></script>

 <script src="{{ asset('assets/js/select2.min.js') }}"></script>
 <script src="{{ asset('assets/js/iziToast.min.js') }}"></script>

 <script src="{{ asset('assets/js/custom.js') }}"></script>


 <script>
     @if (Session::has('message'))
         toastr.options = {
             "closeButton": true,
             "progressBar": true
         }
         toastr.success("{{ session('message') }}");
     @endif

     @if (Session::has('error'))
         toastr.options = {
             "closeButton": true,
             "progressBar": true
         }
         toastr.error("{{ session('error') }}");
     @endif

     @if (Session::has('info'))
         toastr.options = {
             "closeButton": true,
             "progressBar": true
         }
         toastr.info("{{ session('info') }}");
     @endif

     @if (Session::has('warning'))
         toastr.options = {
             "closeButton": true,
             "progressBar": true
         }
         toastr.warning("{{ session('warning') }}");
     @endif
 </script>
 </body>

 </html>
