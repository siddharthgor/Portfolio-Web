<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <!-- Include your CSS and JavaScript files here -->
    @include('includecss')
</head>

<body>
    <header>
        <!-- Include your header content here -->
        <nav>
            <!-- Include your navigation menu here -->
        </nav>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <!-- Include your footer content here -->
    </footer>

    <!-- Include your JavaScript files here -->
    @include('includejs')
</body>

</html>
