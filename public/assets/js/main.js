/**
 * Main
 */

"use strict";

let menu, animate;
let isHorizontalLayout = !1;
let isRtl = window.Helpers.isRtl();
(function () {
    // Initialize menu
    //-----------------

    let layoutMenuEl = document.querySelectorAll("#layout-menu");
    layoutMenuEl.forEach(function (element) {
        menu = new Menu(element, {
            orientation: "vertical",
            closeChildren: false,
        });
        // Change parameter to true if you want scroll animation
        window.Helpers.scrollToActive((animate = false));
        window.Helpers.mainMenu = menu;
    });

    // Initialize menu togglers and bind click on each
    let menuToggler = document.querySelectorAll(".layout-menu-toggle");
    menuToggler.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            window.Helpers.toggleCollapsed();
        });
    });

    // Display menu toggle (layout-menu-toggle) on hover with delay
    let delay = function (elem, callback) {
        let timeout = null;
        elem.onmouseenter = function () {
            // Set timeout to be a timer which will invoke callback after 300ms (not for small screen)
            if (!Helpers.isSmallScreen()) {
                timeout = setTimeout(callback, 300);
            } else {
                timeout = setTimeout(callback, 0);
            }
        };

        elem.onmouseleave = function () {
            // Clear any timers set to timeout
            document
                .querySelector(".layout-menu-toggle")
                .classList.remove("d-block");
            clearTimeout(timeout);
        };
    };
    if (document.getElementById("layout-menu")) {
        var t = document.getElementById("layout-menu");
        var n = function () {
            Helpers.isSmallScreen() ||
                document
                    .querySelector(".layout-menu-toggle")
                    .classList.add("d-block");
        };
        let e = null;
        (t.onmouseenter = function () {
            e = Helpers.isSmallScreen() ? setTimeout(n, 0) : setTimeout(n, 300);
        }),
            (t.onmouseleave = function () {
                document
                    .querySelector(".layout-menu-toggle")
                    .classList.remove("d-block"),
                    clearTimeout(e);
            });
    }
    if (document.getElementById("layout-menu")) {
        delay(document.getElementById("layout-menu"), function () {
            // not for small screen
            if (!Helpers.isSmallScreen()) {
                document
                    .querySelector(".layout-menu-toggle")
                    .classList.add("d-block");
            }
        });
    }

    // Display in main menu when menu scrolls
    let menuInnerContainer = document.getElementsByClassName("menu-inner"),
        menuInnerShadow =
            document.getElementsByClassName("menu-inner-shadow")[0];
    if (menuInnerContainer.length > 0 && menuInnerShadow) {
        menuInnerContainer[0].addEventListener("ps-scroll-y", function () {
            if (this.querySelector(".ps__thumb-y").offsetTop) {
                menuInnerShadow.style.display = "block";
            } else {
                menuInnerShadow.style.display = "none";
            }
        });
    }

    // Init helpers & misc
    // --------------------

    // Init BS Tooltip
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Accordion active class
    const accordionActiveFunction = function (e) {
        if (e.type == "show.bs.collapse" || e.type == "show.bs.collapse") {
            e.target.closest(".accordion-item").classList.add("active");
        } else {
            e.target.closest(".accordion-item").classList.remove("active");
        }
    };

    const accordionTriggerList = [].slice.call(
        document.querySelectorAll(".accordion")
    );
    const accordionList = accordionTriggerList.map(function (
        accordionTriggerEl
    ) {
        accordionTriggerEl.addEventListener(
            "show.bs.collapse",
            accordionActiveFunction
        );
        accordionTriggerEl.addEventListener(
            "hide.bs.collapse",
            accordionActiveFunction
        );
    });

    // Auto update layout based on screen size
    window.Helpers.setAutoUpdate(true);

    // Toggle Password Visibility
    window.Helpers.initPasswordToggle();

    // Speech To Text
    window.Helpers.initSpeechToText();

    // Manage menu expanded/collapsed with templateCustomizer & local storage
    //------------------------------------------------------------------

    // If current layout is horizontal OR current window screen is small (overlay menu) than return from here
    if (window.Helpers.isSmallScreen()) {
        return;
    }

    // If current layout is vertical and current window screen is > small

    // Auto update menu collapsed/expanded based on the themeConfig
    window.Helpers.setCollapsed(true, false);
})();
(isHorizontalLayout = document
    .getElementById("layout-menu")
    .classList.contains("menu-horizontal")),
    function () {
        document.querySelectorAll(".layout-menu-toggle").forEach((e) => {
            e.addEventListener("click", (e) => {
                if (
                    (e.preventDefault(),
                    window.Helpers.toggleCollapsed(),
                    config.enableMenuLocalStorage &&
                        !window.Helpers.isSmallScreen())
                )
                    try {
                        localStorage.setItem(
                            "templateCustomizer-" +
                                templateName +
                                "--LayoutCollapsed",
                            String(window.Helpers.isCollapsed())
                        );
                    } catch (e) {}
            });
        });
        if (
            (isRtl &&
                Helpers._addClass(
                    "dropdown-menu-end",
                    document.querySelectorAll("#layout-navbar .dropdown-menu")
                ),
            window.Helpers.setAutoUpdate(!0),
            window.Helpers.initPasswordToggle(),
            window.Helpers.initSpeechToText(),
            window.Helpers.initNavbarDropdownScrollbar(),
            window.addEventListener(
                "resize",
                function (e) {
                    window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT &&
                        document.querySelector(".search-input-wrapper") &&
                        (document
                            .querySelector(".search-input-wrapper")
                            .classList.add("d-none"),
                        (document.querySelector(".search-input").value = "")),
                        document.querySelector(
                            "[data-template^='horizontal-menu']"
                        ) &&
                            setTimeout(function () {
                                window.innerWidth <
                                window.Helpers.LAYOUT_BREAKPOINT
                                    ? document.getElementById("layout-menu") &&
                                      document
                                          .getElementById("layout-menu")
                                          .classList.contains(
                                              "menu-horizontal"
                                          ) &&
                                      menu.switchMenu("vertical")
                                    : document.getElementById("layout-menu") &&
                                      document
                                          .getElementById("layout-menu")
                                          .classList.contains(
                                              "menu-vertical"
                                          ) &&
                                      menu.switchMenu("horizontal");
                            }, 100);
                },
                !0
            ),
            !isHorizontalLayout &&
                !window.Helpers.isSmallScreen() &&
                ("undefined" != typeof TemplateCustomizer &&
                    window.templateCustomizer.settings.defaultMenuCollapsed &&
                    window.Helpers.setCollapsed(!0, !1),
                "undefined" != typeof config) &&
                config.enableMenuLocalStorage)
        )
            try {
                null !==
                    localStorage.getItem(
                        "templateCustomizer-" +
                            templateName +
                            "--LayoutCollapsed"
                    ) &&
                    "false" !==
                        localStorage.getItem(
                            "templateCustomizer-" +
                                templateName +
                                "--LayoutCollapsed"
                        ) &&
                    window.Helpers.setCollapsed(
                        "true" ===
                            localStorage.getItem(
                                "templateCustomizer-" +
                                    templateName +
                                    "--LayoutCollapsed"
                            ),
                        !1
                    );
            } catch (e) {}
    };
