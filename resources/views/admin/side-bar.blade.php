<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme" data-bg-class="bg-menu-theme"
    style="touch-action: none; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
    <div class="app-brand demo">
        <a href="/" class="app-brand-link">
            <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block">
                <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
            <span class="app-brand-logo demo  store_logo d-none">
                <img src="{{ asset('assets/img/avatars/vishal.png') }}" alt="user-avatar" class="m-lg-n2 rounded"
                    height="80px" width="100px" id="uploadedAvatar" />

            </span>
            <span class="app-brand-logo d-flex half_logo image-box-100 justify-content-end ms-sm-n5 p-2">
                <img src="{{ asset('assets/img/avatars/vishal.png') }}" alt="user-avatar"
                    class="d-block m-lg-n2 rounded" id="uploadedAvatar" />
            </span>
            {{-- <span class="app-brand-text demo menu-text fw-bolder ms-2">{{ $settings['store_title'] }}</span> --}}
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
        <!-- Dashboard -->
        <li class="menu-item {{ Request::is('admin/home') || Request::is('admin/home/*') ? 'active' : '' }}">
            <a href="/admin/home" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
            </a>
        </li>
        <li
            class="menu-item {{ Request::is('admin/academic_performance') || Request::is('admin/academic_performance/*') ? 'active' : '' }}">
            <a href="/admin/academic_performance"
                class="menu-link {{ Request::is('admin/academic_performance') || Request::is('admin/performance/*') ? 'active' : '' }}">
                <i class="menu-icon fas fa-book-open text-primary"></i>
                <div>Academic Performance</div>
            </a>
        </li>
        <li
            class="menu-item {{ Request::is('admin/workshops_conference') || Request::is('admin/workshops_conference/*') ? 'active' : '' }}">
            <a href="/admin/workshops_conference"
                class="menu-link {{ Request::is('admin/workshops_conference') || Request::is('admin/workshops_conference/*') ? 'active' : '' }}">
                <i class="menu-icon fas fa-tasks text-secondary"></i>
                <div>Workshops and Conference</div>
            </a>
        </li>
        <li class="menu-item {{ Request::is('admin/experience') || Request::is('admin/experience*') ? 'active' : '' }}">
            <a href="/admin/experience"
                class="menu-link {{ Request::is('admin/experience') || Request::is('admin/experience/*') ? 'active' : '' }}">
                <i class="menu-icon fas fa-history text-danger"></i>
                <div>Experience</div>
            </a>
        </li>
        <li class="menu-item {{ Request::is('admin/patents') || Request::is('admin/patents*') ? 'active' : '' }}">
            <a href="/admin/patents"
                class="menu-link {{ Request::is('admin/patents') || Request::is('admin/patents/*') ? 'active' : '' }}">
                <i class="menu-icon fas fa-clipboard text-warning"></i>
                <div>Patents Submitted / Published</div>
            </a>
        </li>

        <li class="menu-item {{ Request::is('admin/papers') || Request::is('admin/papers/*') ? 'active open' : '' }}">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
                <i class="menu-icon fas fa-book text-primary"></i>
                <div>Papers</div>
            </a>
            <ul class="menu-sub">
                <li class="menu-item {{ Request::is('admin/papers/journal_papers') ? 'active' : '' }}">
                    <a href="/admin/papers/journal_papers" class="menu-link">
                        <div data-i18n="Without menu">Journal Papers</div>
                    </a>
                </li>
                <li
                    class="menu-item {{ Request::is('admin/papers/conference_papers') || Request::is('admin/papers/conference_papers/*') ? 'active' : '' }}">
                    <a href="/admin/papers/conference_papers" class="menu-link">
                        <div data-i18n="Without menu">Conference Papers</div>
                    </a>
                </li>
                <li
                    class="menu-item {{ Request::is('admin/papers/books_chapters') || Request::is('admin/papers/books_chapters/*') ? 'active' : '' }}">
                    <a href="/admin/papers/books_chapters" class="menu-link">
                        <div data-i18n="Without menu">Books and Chapters</div>
                    </a>
                </li>

            </ul>
        </li>



    </ul>

</aside>
