// "use strict";

document.addEventListener("DOMContentLoaded", function (e) {
    (function () {
        const deactivateAcc = document.querySelector(
            "#formAccountDeactivation"
        );

        // Update/reset user image of account page
        let accountUserImage = document.getElementById("uploadedAvatar");
        const fileInput = document.querySelector(".account-file-input"),
            resetFileInput = document.querySelector(".account-image-reset");

        if (accountUserImage) {
            const resetImage = accountUserImage.src;
            if (fileInput !== null && fileInput !== undefined) {
                fileInput.onchange = () => {
                    if (fileInput.files[0]) {
                        accountUserImage.src = window.URL.createObjectURL(
                            fileInput.files[0]
                        );
                    }
                };
                resetFileInput.onclick = () => {
                    fileInput.value = "";
                    accountUserImage.src = resetImage;
                };
            }
        }
    })();
});

//academic performance table
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type: 'GET',
        url: '/admin/academic_performance/list',
        dataType: 'json',
        success: function (data) {
            // Handle the data received from the server
            $('#table').bootstrapTable({
                data: data
            });

        },
        error: function (error) {
            // Handle any errors
            console.error(error);
        }
    });
});
