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

var tenure_html = "";
tenure_html +=
    "<div class='row'>" +
    "<div class='form-group col-md-3'>" +
    "<div class='mb-3'>" +
    "<label class='form-label' for='basic-default-fullname'>Title</label>" +
    "<input type='text' class='form-control' id='basic-default-fullname'" +
    " placeholder='monthly'name='tenure_title[]'" +
    "value=''>" +
    " </div>" +
    " </div>" +
    "<div class='form-group col-md-2'>" +
    "<div class='mb-3'>" +
    "<label class='form-label' for='basic-default-email'>Months</label>" +
    "<div class='input-group input-group-merge'>" +
    "<select id='defaultSelect' name='months[]'" +
    "value=''class='form-select'>" +
    "<option value='1'>1</option>" +
    "<option value='2'>2</option>" +
    "<option value='3'>3</option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='form-group col-md-3'>" +
    "<div class='mb-3'>" +
    "<label class='form-label' for='basic-default-phone'>Price</label>" +
    "<input type='number' class='form-control' id='basic-default-fullname'" +
    "placeholder='100' min='1' name='price[]'" +
    "value=''>" +
    "</div>" +
    "</div>" +
    "<div class='form-group col-md-2'>" +
    "<div class='mb-3'>" +
    "<label class='form-label' for='basic-default-phone'>Discounted" +
    "price</label>" +
    "<input type='number' class='form-control' id='basic-default-fullname'" +
    "placeholder='80' min='1' name='discounted_price[]'" +
    "value=''>" +
    "</div>" +
    "</div>" +
    " </div>";

$(document).on("click", "#add_tenure", function () {
    $("#tenure_details").append(tenure_html);
});

var combo_group_html =
    '<div class="row" id="row_group">' +
    '<div class="form-group col-md-4">' +
    '<div class="mb-3">' +
    '<label class="form-label" for="name">Group Name</label>' +
    '<input type="text" class="form-control" id="basic-default-fullname" placeholder="Starter" name="group_name[]" value="">' +
    "</div>" +
    "</div>" +
    '<div class="form-group col-md-4">' +
    '<div class="mb-3">' +
    '<label class="form-label" for="name">Single/Multiple Item</label>' +
    '<select name="group_type[]" id="" class="form-control" data-placeholder=" Type to search and select type">' +
    '<option value="1">Single Item</option>' +
    '<option value="2">Multiple Item</option>' +
    "</select>" +
    "</div>" +
    "</div>" +
    '<div class="form-group col-md-6">' +
    '<div class="mb-3 new_product">' +
    "</div>" +
    "</div>" +
    '<div class="form-group col-md-1 d-flex justify-content-end my-4">' +
    '<button class="btn btn-icon btn-danger mb-1" type="button" id="remove_group"><i class="fas fa-minus"></i></button>' +
    "</div>" +
    "</div>";

$(document).on("click", "#add_group", function () {
    // Declare and clone products for this group
    var products = $(".combo_product_div:last .combo_products select").clone();

    // Build the HTML for this group
    var combo_group_html = "";
    combo_group_html +=
        '<div class="row group_row" id="row_group">' +
        '<div class="form-group col-md-4">' +
        '<div class="mb-3">' +
        '<label class="form-label" for="name">Group Name</label>' +
        '<input type="text" class="form-control" id="basic-default-fullname" placeholder="Starter" name="group_name[]" value="">' +
        "</div>" +
        "</div>" +
        '<div class="form-group col-md-4">' +
        '<div class="mb-3">' +
        '<label class="form-label" for="name">Single/Multiple Item</label>' +
        '<select name="group_type[]" id="" class="form-control" data-placeholder=" Type to search and select type">' +
        '<option value="1">Single Item</option>' +
        '<option value="2">Multiple Item' +
        "</option>" +
        "</select>" +
        "</div>" +
        "</div>" +
        '<div class="form-group col-md-6">' +
        '<div class="mb-3 new_product">' +
        "</div>" +
        "</div>" +
        '<div class="form-group col-md-1 d-flex justify-content-end my-4">' +
        '<button class="btn btn-icon btn-danger mb-1" type="button" id="remove_group"><i class="fas fa-minus"></i></button>' +
        "</div>" +
        "</div>";

    // Append the new group and products
    $("#group_details").append(combo_group_html);
    $(".new_product").last().append(products);

    // Initialize Select2 for the new group's select element
    $(document).find(".search_product").select2();
});

$("#add_combo").on("click", function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", $('input[name="title"]').val());
    formData.append("price", $('input[name="price"]').val());
    formData.append("image", $("#combo_product_image")[0].files[0]);

    const rowData = [];

    $(".group_row").each(function () {
        const groupName = $(this).find('input[name="group_name[]"]').val();
        const groupType = $(this).find('select[name="group_type[]"]').val();
        const productIds = $(this)
            .find('select[name="product_id[]"] option:checked')
            .map(function () {
                return $(this).val();
            })
            .get();

        const rowObject = {
            group_name: groupName,
            group_type: groupType,
            product_ids: productIds,
        };

        rowData.push(rowObject);
    });
    // console.log(rowData);
    // return;
    formData.append("data", JSON.stringify(rowData));
    $.ajax({
        method: "POST",
        url: "/partner/combo_products",
        data: formData,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
            toastr.success("Combo Added successfully");
            // location.reload();
        },
        error: function (response) {
            toastr.success("Combo added successfully");
            // location.reload();
        },
    });
});

// old working code

// $("#add_combo").on("click", function (e) {
//     const rowData = [];

//     const title = $('input[name="title"]').val();
//     const image = $('input[name="image"]').val();
//     const price = $('input[name="price"]').val();

//     var input = document.getElementById("combo_product_image");
//     // console.log(input.files);
//     var imageName = input.files[0].name;

//     $(".group_row").each(function () {
//         const groupName = $(this).find('input[name="group_name[]"]').val();
//         const groupType = $(this).find('select[name="group_type[]"]').val();
//         const productIds = $(this)
//             .find('select[name="product_id[]"] option:checked')
//             .map(function () {
//                 return $(this).val();
//             })
//             .get();

//         // console.log(title, image, price);
//         const rowObject = {
//             group_name: groupName,
//             group_type: groupType,
//             product_ids: productIds,
//         };

//         rowData.push(rowObject);
//     });

//     rowData.forEach(function (row) {
//         const groupName = row.group_name;
//         const groupType = row.group_type;
//         const productIds = row.product_ids;

//         // Process the data as needed
//         // ...
//     });
//     $.ajax({
//         method: "POST",
//         url: "/partner/combo_products",
//         data: {
//             _token: $('meta[name="csrf-token"]').attr("content"),
//             title: title,
//             image: imageName,
//             price: price,
//             data: rowData,
//         },
//         // success: function (response) {
//         //     toastr.success("Status updated successfully");
//         //     $("#table").bootstrapTable("refresh");
//         // },
//         // fail: function (response) {
//         //     toastr.success("Status not updated successfully");
//         // },
//     });
//     // console.log(rowData);
//     // return;
// });

$(document).on("click", "#remove_group", function () {
    // alert("Please");
    $(this).closest("#row_group").remove();
});

$(document).on("click", ".change_plan_status", function () {
    var id = $(this).data("id");
    var status = $(this).data("toggle-status");
    $.ajax({
        method: "GET",
        url: "/admin/plans/update_status/" + id,
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            toastr.success("Status updated successfully");
            $("#table").bootstrapTable("refresh");
        },
        fail: function (response) {
            toastr.success("Status not updated successfully");
        },
    });
});
$(document).on("click", ".change_toggle_status", function () {
    var id = $(this).data("id");
    var status = $(this).data("toggle-status");
    var url = $(this).data("url");
    // console.log(url);
    $.ajax({
        method: "GET",
        url: url,
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            toastr.success("Status updated successfully");
            $("#table").bootstrapTable("refresh");
        },
        fail: function (response) {
            toastr.success("Status not updated successfully");
            $("#table").bootstrapTable("refresh");
        },
    });
});
$(document).on("click", ".change_print_status", function () {
    var id = $(this).data("id");
    var status = $(this).data("toggle-status");
    var url = $(this).data("url");
    // console.log(url);
    $.ajax({
        method: "GET",
        url: url,
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
            variant_id: id,
            status: status,
            floor_id: $("#floor_dropdown").val(),
            table_id: $("#table-dropdown").val(),
        },
        success: function (response) {
            toastr.success("Status updated successfully");
            window.location.reload();
        },
        fail: function (response) {
            toastr.success("Status not updated successfully");
            $("#table").bootstrapTable("refresh");
        },
    });
});
$(document).ready(function () {
    $("#select2-dropdown").select2();
    $("#select2-dropdown").on("change", function (e) {
        var data = $("#select2-dropdown").select2("val");
    });
    $(".simple-product-level-stock-management").hide(200);
});

$(document).ready(function () {
    $(".search_user").select2();
    $(".search_plan").select2();
    $(".search_tags").select2();
    $(".search_location").select2();
    $(".search_product").select2();
});

$(document).on("change", ".search_plan", function () {
    var id = $(this).find(":selected").attr("data-id");

    var url = "/admin/subscriptions/get_data/" + id;
    var option = "";
    $("#plan_tenure_id").html(option);
    $.ajax({
        method: "GET",
        url: url,
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            var plans = JSON.parse(response);
            // console.log(plans);
            // console.log(data.type);
            plans.forEach((plan) => {
                // console.log(plan);
                option =
                    option +
                    `<option value="` +
                    plan.id +
                    `" data-price=` +
                    plan.price +
                    ` data-discounted_price=` +
                    plan.discounted_price +
                    ` data-months=` +
                    plan.months +
                    `>` +
                    plan.tenure_title +
                    `</option>`;
            });
            $("#plan_tenure_id").html(option);
        },
        fail: function (response) {
            toastr.success("Status not updated successfully");
            $("#table").bootstrapTable("refresh");
        },
    });
});
$(document).on("change", "#plan_tenure_id", function () {
    var price = $(this).find(":selected").attr("data-price");
    var months = $(this).find(":selected").attr("data-months");
    var discounted_price = $(this)
        .find(":selected")
        .attr("data-discounted_price");
    $("#tenure_price").val(price);
    // alert(price);x`
    $("#tenure_discounted_price").val(discounted_price);
    $("#months").val(months);
});

$(document).on("change", "#start_date", function () {
    var date = $("#start_date").val();
    // alert(date);
    var months = $("#months").val();
    // alert(months);
    $.ajax({
        type: "GET",
        url: "/admin/subscriptions/set_end_date",
        data: {
            start_date: date,
            months: months,
        },
        dataType: "JSON",
        success: function (response) {
            var end_date = response;
            $("#end_date").val(end_date);
        },
    });
});
$(document).on("change", ".payment_status", function (e, data) {
    e.preventDefault();
    var status_val = $(this).val();
    if (status_val == "partially_paid") {
        $(".amount_paid").removeClass("d-none");
    } else if (status_val == "fully_paid") {
        $(".amount_paid").addClass("d-none");
    } else if (status_val == "unpaid") {
        $(".amount_paid").addClass("d-none");
    } else {
        $(".amount_paid").addClass("d-none");
    }
});

$(document).on("change", ".payment_method", function (e, data) {
    e.preventDefault();
    var payment_method = $(this).val();
    // alert(payment_method);
    // if (payment_method == "wallet") {
    //     $(".transaction_id").removeClass("d-none");
    //     $(".other_payment_method").addClass("d-none");
    // } else if (payment_method == "card_payment") {
    //     $(".transaction_id").removeClass("d-none");
    //     $(".other_payment_method").addClass("d-none");
    // } else if (payment_method == "bar_code") {
    //     $(".transaction_id").removeClass("d-none");
    //     $(".other_payment_method").addClass("d-none");
    // } else if (payment_method == "net_banking") {
    //     $(".transaction_id").removeClass("d-none");
    //     $(".other_payment_method").addClass("d-none");
    // } else if (payment_method == "online_payment") {
    //     $(".transaction_id").removeClass("d-none");
    //     $(".other_payment_method").addClass("d-none");
    // } else if (payment_method == "") {
    //     $(".transaction_id").removeClass("d-none");
    //     $(".other_payment_method").removeClass("d-none");
    // } else {
    //     $(".transaction_id").addClass("d-none");
    //     $(".other_payment_method").addClass("d-none");
    // }
});
function transactionQueryParams(p) {
    return {
        // user_id: $("#user_id").val(),
        search: p.search,
        limit: p.limit,
        offset: p.offset,
        sort: p.sort,
        order: p.order,
    };
}
$(document).ready(function () {
    $("#change_status").bootstrapSwitch();

    $("#change_status").on("switchChange.bootstrapSwitch", function (e, data) {
        $("#showModal").modal("show");
    });

    $(".multiple_values").select2({
        // theme: "bootstrap4",
        width: $(this).data("width")
            ? $(this).data("width")
            : $(this).hasClass("w-100")
            ? "100%"
            : "style",
        placeholder: $(this).data("placeholder"),
        allowClear: Boolean($(this).data("allow-clear")),
    });
});

$(document).on("click", "#change_status", function () {
    Swal.fire({
        title: "Are You Want To update status ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    }).then((result) => {
        var id = $(this).data("id");
        var status = $(this).data("toggle-status");
        var url = $(this).data("url");
        if (result.value) {
            token = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                type: "GET",
                url: url,
                data: {
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
            }).done(function (response, textStatus) {
                if (response.error == false) {
                    Swal.fire("Oops...", response.message, "warning");
                    $("table").bootstrapTable("refresh");
                    _token: $('meta[name="csrf-token"]').attr("content");
                } else {
                    Swal.fire("Success!", response.message, "success");
                    $("table").bootstrapTable("refresh");
                    _token: $('meta[name="csrf-token"]').attr("content");
                }
            });
        }
    });
});

if ($("#attribute_values").length) {
    var tags_element = document.querySelector("input[name=value]");
    new Tagify(tags_element);
}

var attributes_values_selected = [];
var variant_values_selected = [];
var value_check_array = [];
var attributes_selected_variations = [];
var attributes_values = [];
var pre_selected_attr_values = [];
var current_attributes_selected = [];
var current_variants_selected = [];
var attribute_flag = 0;
var pre_selected_attributes_name = [];
var current_selected_image;
var attributes_values = [];
var all_attributes_values = [];
var counter = 0;
var variant_counter = 0;

// add - edit products

function containsAll(needles, haystack) {
    for (var i = 0; i < needles.length; i++) {
        if ($.inArray(needles[i], haystack) == -1) return false;
    }
    return true;
}

function getPermutation(args) {
    var r = [],
        max = args.length - 1;

    function helper(arr, i) {
        for (var j = 0, l = args[i].length; j < l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i == max) r.push(a);
            else helper(a, i + 1);
        }
    }
    helper([], 0);
    return r;
}

function save_attributes() {
    attributes_values = [];
    all_attributes_values = [];
    var tmp = $(".product-attr-selectbox");
    $.each(tmp, function (index) {
        var data = $(tmp[index])
            .closest(".row")
            .find(".multiple_values")
            .select2("data");
        var tmp_values = [];
        for (var i = 0; i < data.length; i++) {
            if (!$.isEmptyObject(data[i])) {
                tmp_values[i] = data[i].id;
            }
        }
        if (!$.isEmptyObject(data)) {
            all_attributes_values.push(tmp_values);
        }
        if ($(tmp[index]).find(".is_attribute_checked").is(":checked")) {
            if (!$.isEmptyObject(data)) {
                attributes_values.push(tmp_values);
            }
        }
    });
}

// function create_variants(preproccessed_permutation_result = false) {
//     var html = "";
//     var is_appendable = false;
//     var permutated_attribute_value = [];
//     if (preproccessed_permutation_result != false) {
//         // alert('here');
//         var response = preproccessed_permutation_result;
//         is_appendable = true;
//     } else {
//         // alert("here 2");
//         var response = getPermutation(attributes_values);
//         // console.log(response);
//     }
//     // alert(is_appendable)
//     var selected_variant_ids = JSON.stringify(response);

//     var selected_attributes_values = JSON.stringify(attributes_values);
//     // console.log(selected_attributes_values);

//     $(".no-variants-added").hide();
//     $.ajax({
//         type: "GET",
//         url: "/partner/products/get_variants_by_id",
//         data: {
//             variant_ids: selected_variant_ids,
//             attributes_values: selected_attributes_values,
//         },
//         dataType: "json",
//         success: function (data) {
//             var result = data["result"];
//             // console.log(result);
//             $.each(result, function (a, b) {
//                 variant_counter++;
//                 var attr_name = "pro_attr_" + variant_counter;
//                 html +=
//                     '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-variant-selectbox"><div class="col-1 text-center my-auto"><i class="fas fa-sort"></i></div>';
//                 var tmp_variant_value_id = " ";
//                 $.each(b, function (key, value) {
//                     // console.log(value)
//                     tmp_variant_value_id = tmp_variant_value_id + "" + value.id;
//                     // alert(tmp_variant_value_id);
//                     html +=
//                         '<div class="col-2"> <input type="text" class="col form-control" value="' +
//                         value.value +
//                         '" readonly></div>';
//                 });
//                 html +=
//                     '<input type="hidden" name="variants_ids[]" value="' +
//                     tmp_variant_value_id +
//                     '">' +
//                     "<div class='col-md-4 d-flex justify-content-end'>" +
//                     '<div class=""> <a data-bs-toggle="collapse" class="btn btn-tool text-primary" data-bs-target="#' +
//                     attr_name +
//                     '" aria-expanded="true"><i class="fas fa-angle-down fa-2x"></i> </a>' +
//                     '<button type="button" class="btn btn-tool remove_variants">' +
//                     '<i class="text-danger far fa-times-circle fa-2x "></i>' +
//                     "</button></div></div>" +
//                     '<div class="col-12" id="variant_stock_management_html">' +
//                     "<div id=" +
//                     attr_name +
//                     ' style="" class="collapse">';

//                 html +=
//                     '<div class="form-group row"><div class="col col-xs-12"><label class="control-label">Price :</label><input type="number" name="variant_price[]" class="col form-control price varaint-must-fill-field" min="0" step="0.01"></div><div class="col col-xs-12"><label class="control-label">Special Price :</label><input type="number" name="variant_special_price[]" class="col form-control discounted_price" min="0" step="0.01"></div>';

//                 html += "</div></div></div></div></div>";
//             });

//             if (is_appendable == false) {
//                 // alert("here");
//                 // console.log(html)
//                 $("#variants_process").append(html);
//                 // console.log(html);
//             } else {
//                 // alert("here 2");
//                 $("#variants_process").append(html);
//                 // console.log(html);
//             }
//             $("#variants_process").unblock();
//         },
//     });
// }

function create_variants(preproccessed_permutation_result = false, from) {
    var html = "";
    var is_appendable = false;
    var permutated_attribute_value = [];
    if (preproccessed_permutation_result != false) {
        var response = preproccessed_permutation_result;
        is_appendable = true;
    } else {
        var response = getPermutation(attributes_values);
    }
    var selected_variant_ids = JSON.stringify(response);
    var selected_attributes_values = JSON.stringify(attributes_values);

    $(".no-variants-added").hide();
    $.ajax({
        type: "GET",
        url: "/partner/products/get_variants_by_id",
        data: {
            variant_ids: selected_variant_ids,
            attributes_values: selected_attributes_values,
        },
        dataType: "json",
        success: function (data) {
            var result = data["result"];
            $.each(result, function (a, b) {
                variant_counter++;
                var attr_name = "pro_attr_" + variant_counter;
                html +=
                    '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-variant-selectbox"><div class="col-1 text-center my-auto"><i class="fas fa-sort"></i></div>';
                var tmp_variant_value_id = " ";
                $.each(b, function (key, value) {
                    tmp_variant_value_id =
                        tmp_variant_value_id + " " + value.id;
                    html +=
                        '<div class="col-2"> <input type="text" class="col form-control" value="' +
                        value.value +
                        '" readonly></div>';
                });
                html +=
                    '<input type="hidden" name="variants_ids[]" value="' +
                    tmp_variant_value_id +
                    '">' +
                    "<div class='col-md-4 d-flex justify-content-end'>" +
                    '<div class=""> <a data-bs-toggle="collapse" class="btn btn-tool text-primary" data-bs-target="#' +
                    attr_name +
                    '" aria-expanded="true"><i class="fas fa-angle-down fa-2x"></i> </a>' +
                    '<button type="button" class="btn btn-tool remove_variants">' +
                    '<i class="text-danger far fa-times-circle fa-2x "></i>' +
                    "</button></div></div>" +
                    '<div class="col-12" id="variant_stock_management_html">' +
                    "<div id=" +
                    attr_name +
                    ' style="" class="collapse">';
                html +=
                    '<div class="form-group row"><div class="col col-xs-12"><label class="control-label">Price :</label><input type="number" name="variant_price[]" class="col form-control price varaint-must-fill-field" min="0" step="0.01"></div><div class="col col-xs-12"><label class="control-label">Special Price :</label><input type="number" name="variant_special_price[]" class="col form-control discounted_price" min="0" step="0.01"></div>';

                html += "</div></div></div></div></div>";
            });

            if (is_appendable == false) {
                $("#variants_process").html(html);
            } else {
                $("#variants_process").append(html);
            }
            $("#variants_process").unblock();
        },
    });
}

function create_attributes(value, selected_attr) {
    // console.log(value);
    // console.log(selected_attr);
    counter++;
    var $attribute = $("#attributes_values_json_data").find(".select_single");
    var $options = $($attribute).clone().html();
    // console.log($options);
    var $selected_attrs = [];
    if (selected_attr) {
        $.each(selected_attr.split(","), function () {
            $selected_attrs.push($.trim(this));
        });
    }

    var attr_name = "pro_attr_" + counter;

    // product-attr-selectbox
    if ($("#product-type").val() == "simple_product") {
        var html =
            '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-attr-selectbox" id=' +
            attr_name +
            '><div class="col-md-1 col-sm-12 text-center my-auto"><i class="fas fa-sort"></i></div><div class="col-md-4 col-sm-12"> <select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes"><option value=""></option>' +
            $options +
            '</select></div><div class="col-md-4 col-sm-12"> <select name="attribute_value_ids[]" class="multiple_values" multiple="" data-placeholder=" Type to search and select attributes values"><option value=""></option> </select></div><div class="col-md-2 col-sm-6 text-center py-1 align-self-center"> <button type="button" class="btn btn-tool remove_attributes"> <i class="text-danger far fa-times-circle fa-2x "></i> </button></div></div>';
    } else {
        $("#note").removeClass("d-none");
        var html =
            '<div class="form-group row move my-auto p-2 border rounded bg-gray-light product-attr-selectbox" id=' +
            attr_name +
            ">" +
            '<div class="col-md-1 col-sm-12 text-center my-auto"><i class="fas fa-sort"></i></div><div class="col-md-4 col-sm-12">' +
            '<select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes"><option value=""></option>' +
            $options +
            "</select></div>" +
            '<div class="col-md-4 col-sm-12"> <select name="attribute_value_ids[]" class="multiple_values" multiple="" data-placeholder=" Type to search and select attributes values">' +
            '<option value=""></option> </select></div><div class="col-md-2 col-sm-6 text-center py-1 align-self-center"><input type="checkbox" name="variations[]" class="is_attribute_checked custom-checkbox mt-2">' +
            '</div><div class="col-md-1 col-sm-6 text-center py-1 align-self-center"> <button type="button" class="btn btn-tool remove_attributes"> <i class="text-danger far fa-times-circle fa-2x "></i> ' +
            "</button></div></div>";
    }
    $("#attributes_process").append(html);
    if (selected_attr) {
        if ($.inArray(value.name, $selected_attrs) > -1) {
            $("#attributes_process")
                .find(".product-attr-selectbox")
                .last()
                .find(".is_attribute_checked")
                .prop("checked", true)
                .addClass("custom-checkbox mt-2");
            $("#attributes_process")
                .find(".product-attr-selectbox")
                .last()
                .find(".remove_attributes")
                .addClass("remove_edit_attribute")
                .removeClass("remove_attributes");
        }
    }
    $("#attributes_process")
        .find(".product-attr-selectbox")
        .last()
        .find(".attributes")
        .select2({
            theme: "bootstrap4",
            width: $(this).data("width")
                ? $(this).data("width")
                : $(this).hasClass("w-100")
                ? "100%"
                : "style",
            placeholder: $(this).data("placeholder"),
            allowClear: Boolean($(this).data("allow-clear")),
        })
        .val(value.name);

    $("#attributes_process")
        .find(".product-attr-selectbox")
        .last()
        .find(".attributes")
        .trigger("change");
    $("#attributes_process")
        .find(".product-attr-selectbox")
        .last()
        .find(".select_single")
        .trigger("select2:select");

    var multiple_values = [];
    $.each(value.ids.split(","), function () {
        multiple_values.push($.trim(this));
    });

    $("#attributes_process")
        .find(".product-attr-selectbox")
        .last()
        .find(".multiple_values")
        .select2({
            // theme: "bootstrap4",
            width: $(this).data("width")
                ? $(this).data("width")
                : $(this).hasClass("w-100")
                ? "100%"
                : "style",
            placeholder: $(this).data("placeholder"),
            allowClear: Boolean($(this).data("allow-clear")),
        })
        .val(multiple_values);
    $("#attributes_process")
        .find(".product-attr-selectbox")
        .last()
        .find(".multiple_values")
        .trigger("change");
}

function create_fetched_attributes_html() {
    // alert("here");
    var edit_id = $('input[name="edit_product_id"]').val();
    // alert(edit_id);
    $.ajax({
        type: "GET",
        url: "/partner/products/fetch_attributes_by_id",
        data: {
            edit_id: edit_id,
            _token: $('meta[name="csrf-token"]').attr("content"),
        },
        dataType: "json",
        success: function (data) {
            _token = $('meta[name="csrf-token"]').attr("content");
            var result = data["result"];
            // console.log(result.attr_values);
            // console.log(result.pre_selected_variants_names);
            if (!$.isEmptyObject(result.attr_values)) {
                $.each(result.attr_values, function (key, value) {
                    // console.log(value);
                    create_attributes(
                        value,
                        result.pre_selected_variants_names
                    );
                });

                $.each(
                    result["pre_selected_variants_ids"],
                    function (key, val) {
                        var tempArray = [];
                        if (val.variant_ids) {
                            $.each(val.variant_ids.split(","), function (k, v) {
                                tempArray.push($.trim(v));
                            });
                            pre_selected_attr_values[key] = tempArray;
                        }
                    }
                );

                if (result.pre_selected_variants_names) {
                    $.each(
                        result.pre_selected_variants_names.split(","),
                        function (key, value) {
                            pre_selected_attributes_name.push($.trim(value));
                        }
                    );
                }
            } else {
                $(".no-attributes-added").show();
                $(".save_attributes").addClass("d-none");
            }
        },
    });
    return $.Deferred().resolve();
}

function save_product(form) {
    $('input[name="product_type"]').val($("#product-type").val());
    if ($(".simple_stock_management_status").is(":checked")) {
        $('input[name="simple_product_stock_status"]').val(
            $("#simple_product_stock_status").val()
        );
    } else {
        $('input[name="simple_product_stock_status"]').val("");
    }
    $("#product-type").prop("disabled", true);
    $(".product-attributes").removeClass("disabled");
    $(".product-variants").removeClass("disabled");
    $(".simple_stock_management_status").prop("disabled", true);

    // var catid = $("#product_category_tree_view_html").jstree("get_selected");
    var formData = new FormData(form);
    var submit_btn = $("#submit_btn");
    var btn_html = $("#submit_btn").html();
    var btn_val = $("#submit_btn").val();
    var button_text =
        btn_html != "" || btn_html != "undefined" ? btn_html : btn_val;
    save_attributes();
    token = $('meta[name="csrf-token"]').attr("content");
    formData.append("csrf-token", token);

    // formData.append("category_id", catid);
    formData.append("attribute_values", all_attributes_values);

    $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData,
        beforeSend: function () {
            submit_btn.html("Please Wait..");
            submit_btn.attr("disabled", true);
        },
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (result) {
            // console.log(result["message"]);
            // return;
            token = $('meta[name="csrf-token"]').attr("content");
            if (result["error"] == true) {
                submit_btn.html(button_text);
                submit_btn.attr("disabled", false);
                result["message"].forEach((message) => {
                    iziToast.error({
                        message: message,
                        position: "topRight",
                    });
                });
            } else {
                submit_btn.html(button_text);
                submit_btn.attr("disabled", false);
                iziToast.success({
                    message: result["message"],
                    position: "topRight",
                });
                setTimeout(function () {
                    location.reload();
                }, 600);
            }
        },
    });
}

function get_variants(edit_id) {
    // alert("here");
    return $.ajax({
        type: "GET",
        url: "/partner/products/fetch_variants_values_by_pid",
        data: {
            edit_id: edit_id,
        },
        dataType: "json",
    }).done(function (data) {
        return data.responseCode != 200 ? $.Deferred().reject(data) : data;
    });
}

var edit_id = $('input[name="edit_product_id"]').val();

$(document).ready(function () {
    get_variants(edit_id);
});

function create_fetched_variants_html(add_newly_created_variants = false) {
    // alert("here");
    var newArr1 = [];
    for (var i = 0; i < pre_selected_attr_values.length; i++) {
        var temp = newArr1.concat(pre_selected_attr_values[i]);
        newArr1 = [...new Set(temp)];
    }
    var newArr2 = [];
    for (var i = 0; i < attributes_values.length; i++) {
        newArr2 = newArr2.concat(attributes_values[i]);
    }

    current_attributes_selected = $.grep(newArr2, function (x) {
        return $.inArray(x, newArr1) < 0;
    });

    if (containsAll(newArr1, newArr2)) {
        var temp = [];
        if (!$.isEmptyObject(current_attributes_selected)) {
            $.ajax({
                type: "GET",
                url: "/partner/products/fetch_attribute_values_by_id",
                data: {
                    id: current_attributes_selected,
                },
                dataType: "json",
                success: function (result) {
                    // console.log(result)
                    temp = result;
                    $.each(result, function (key, value) {
                        if (
                            pre_selected_attributes_name.indexOf(
                                $.trim(value.name)
                            ) > -1
                        ) {
                            delete temp[key];
                        }
                    });
                    var resetArr = temp.filter(function () {
                        return true;
                    });
                    setTimeout(function () {
                        var edit_id = $('input[name="edit_product_id"]').val();
                        // alert(edit_id);
                        // alert("1");
                        get_variants(edit_id).done(function (data) {
                            create_editable_variants(
                                data.result,
                                resetArr,
                                add_newly_created_variants
                            );
                        });
                    }, 1000);
                },
            });
        } else {
            if (attribute_flag == 0) {
                var edit_id = $('input[name="edit_product_id"]').val();
                // alert("2");
                get_variants(edit_id).done(function (data) {
                    create_editable_variants(
                        data.result,
                        false,
                        add_newly_created_variants
                    );
                });
            }
        }
    } else {
        var edit_id = $('input[name="edit_product_id"]').val();
        // alert("3");
        get_variants(edit_id).done(function (data) {
            create_editable_variants(
                data.result,
                false,
                add_newly_created_variants
            );
        });
    }
}

$(document).ready(function () {
    create_fetched_variants_html(false);
});

function create_editable_variants(
    data,
    newly_selected_attr = false,
    add_newly_created_variants = false
) {
    // alert("here");
    // console.log(data);
    if (data.length > 0 && data[0].variant_ids) {
        $("#reset_variants").show();
        var html = "";

        if (
            !$.isEmptyObject(attributes_values) &&
            add_newly_created_variants == true
        ) {
            var permuted_value_result = getPermutation(attributes_values);
        }

        $.each(data, function (a, b) {
            if (
                !$.isEmptyObject(permuted_value_result) &&
                add_newly_created_variants == true
            ) {
                var permuted_value_result_temp = permuted_value_result;
                var varinat_ids = b.variant_ids.split(",");
                $.each(permuted_value_result_temp, function (index, value) {
                    if (containsAll(varinat_ids, value)) {
                        permuted_value_result.splice(index, 1);
                    }
                });
            }

            variant_counter++;
            var attr_name = "pro_attr_" + variant_counter;
            html +=
                '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-variant-selectbox"><div class="col-1 text-center my-auto"><i class="fas fa-sort"></i></div>';
            html +=
                '<input type="hidden" name="edit_variant_id[]" value=' +
                b.id +
                ">";
            var tmp_variant_value_id = "";
            var varaint_array = [];
            var varaint_ids_temp_array = [];
            var flag = 0;
            var variant_images = "";
            var image_html = "";
            if (b.images) {
                variant_images = JSON.parse(b.images);
            }

            $.each(b.variant_ids.split(","), function (key) {
                varaint_ids_temp_array[key] = $.trim(this);
            });

            $.each(b.variant_values.split(","), function (key) {
                varaint_array[key] = $.trim(this);
            });

            for (var i = 0; i < varaint_array.length; i++) {
                html +=
                    '<div class="col-2 variant_col"> <input type="hidden"  value="' +
                    varaint_ids_temp_array[i] +
                    '"><input type="text" class="col form-control" value="' +
                    varaint_array[i] +
                    '" readonly></div>';
            }
            if (
                newly_selected_attr != false &&
                newly_selected_attr.length > 0
            ) {
                for (var i = 0; i < newly_selected_attr.length; i++) {
                    var tempVariantsIds = [];
                    var tempVariantsValues = [];
                    $.each(
                        newly_selected_attr[i].attribute_values_id.split(","),
                        function () {
                            tempVariantsIds.push($.trim(this));
                        }
                    );
                    html +=
                        '<div class="col-2"><select class="col new-added-variant form-control" ><option value="">Select Attribute</option>';
                    $.each(
                        newly_selected_attr[i].attribute_values.split(","),
                        function (key) {
                            tempVariantsValues.push($.trim(this));
                            html +=
                                '<option value="' +
                                tempVariantsIds[key] +
                                '">' +
                                tempVariantsValues[key] +
                                "</option>";
                        }
                    );
                    html += "</select></div>";
                }
            }
            html +=
                '<input type="hidden" name="variants_ids[]" value="' +
                b.attribute_value_ids +
                '">' +
                '<div class="col-md-4 my-auto row justify-content-end">' +
                '<div class="btn-group" role="group">' +
                '<a data-bs-toggle="collapse" class="btn btn-tool text-primary" data-bs-target="#' +
                attr_name +
                '" aria-expanded="true">' +
                '<i class="fas fa-angle-down fa-2x"></i>' +
                "</a>" +
                '<button type="button" class="btn btn-tool remove_variants">' +
                '<i class="text-danger far fa-times-circle fa-2x"></i>' +
                "</button>" +
                "</div>" +
                "</div>" +
                '<div class="col-12" id="variant_stock_management_html">' +
                "<div id=" +
                attr_name +
                ' style="" class="collapse">';

            html +=
                '<div class="form-group row"><div class="col col-xs-12"><label class="control-label">Price :</label><input type="number" name="variant_price[]" class="col form-control price varaint-must-fill-field" value="' +
                b.price +
                '" min="0" step="0.01"></div><div class="col col-xs-12"><label class="control-label">Special Price :</label><input type="number" name="variant_special_price[]" class="col form-control discounted_price"  min="0" value="' +
                b.special_price +
                '" step="0.01"></div></div>';

            html +=
                '<div class="col-12 pt-3"><label class="control-label">Images :</label><div class="col-md-3"><a class="uploadFile img btn btn-primary text-white btn-sm"  data-input="variant_images[' +
                a +
                '][]" data-isremovable="1" data-is-multiple-uploads-allowed="1" data-bs-toggle="modal" data-bs-target="#media-upload-modal" value="Upload Photo"><i class="fa fa-upload"></i> Upload</a> </div><div class="container-fluid row image-upload-section"> ' +
                image_html +
                " </div></div>";
            html += "</div></div></div>";
            // console.log(html);
            $("#edit_variants_process").html(html);
        });

        if (
            !$.isEmptyObject(attributes_values) &&
            add_newly_created_variants == true
        ) {
            create_variants(permuted_value_result);
        }
    }
}

var edit_product_id = $("input[name=edit_product_id]").val();

if (edit_product_id) {
    // alert(edit_product_id);
    create_fetched_attributes_html(function () {
        $(".no-attributes-added").hide();
        $(".save_attributes").removeClass("d-none");
        $(".no-variants-added").hide();
        save_attributes();
        create_fetched_variants_html(false);
    });
}

// old

$(document).on("select2:select", ".select_single", function (e) {
    var select = $(this)
        .closest(".row")
        .find(".multiple_values")
        .text(null)
        .trigger("change");
    // $(".multiple_values");
    // console.log(select);
    select.empty();
    var data = $(this).select2().find(":selected").data("values");
    // console.log(data);
    if (data !== null && data !== undefined) {
        data = JSON.parse(data);
        // console.log(data);
        data.forEach((d) => {
            // console.log(d.value);
            $(select).append(`<option value="${d.id}">${d.value}</option>`);
        });
    }
});

//new

// $(document).on("select2:select", ".select_single", function (e) {
//     var text = this.className;
//     var type;
//     $(this)
//         .closest(".row")
//         .find(".multiple_values")
//         .text(null)
//         .trigger("change");
//     var data = $(this).select2().find(":selected").data("values");
//     if (text.search("attributes") != -1) {
//         value_check_array = attributes_values_selected.slice();
//         type = "attributes";
//     }

//     if (text.search("variant_attributes") != -1) {
//         value_check_array = variant_values_selected.slice();
//         type = "variant_attributes";
//     }

//     if (
//         $.inArray(
//             $(this).select2().find(":selected").val(),
//             value_check_array
//         ) > -1
//     ) {
//         iziToast.error({
//             message: "Attribute Already Selected",
//         });
//         $(this).val("").trigger("change");
//     } else {
//         value_check_array.push($(this).select2().find(":selected").val());
//     }
//     if (text.search("attributes") != -1) {
//         attributes_values_selected = value_check_array.slice();
//     }

//     if (text.search("variant_attributes") != -1) {
//         variant_values_selected = value_check_array.slice();
//     }
//     $(this)
//         .closest(".row")
//         .find("." + type)
//         .select2({
//             width: $(this).data("width")
//                 ? $(this).data("width")
//                 : $(this).hasClass("w-100")
//                 ? "100%"
//                 : "style",
//             placeholder: $(this).data("placeholder"),
//             allowClear: Boolean($(this).data("allow-clear")),
//         });
//     $(this)
//         .closest(".row")
//         .find(".multiple_values")
//         .select2({
//             width: $(this).data("width")
//                 ? $(this).data("width")
//                 : $(this).hasClass("w-100")
//                 ? "100%"
//                 : "style",
//             placeholder: $(this).data("placeholder"),
//             allowClear: Boolean($(this).data("allow-clear")),
//             data: data,
//         });
// });

$(".multiple_values").select2({
    width: $(this).data("width")
        ? $(this).data("width")
        : $(this).hasClass("w-100")
        ? "100%"
        : "style",
    placeholder: $(this).data("placeholder"),
    allowClear: Boolean($(this).data("allow-clear")),
});

var counter = 0;

var variantsCreated = false; // Add this variable to track if variants are already created

$(document).on("click", "#add_attributes, #tab-for-variations", function (e) {
    if (e.target.id == "add_attributes") {
        $(".no-attributes-added").hide();
        $(".save_attributes").removeClass("d-none");
        counter++;
        var $attribute = $("#attributes_values_json_data").find(
            ".select_single"
        );
        var $options = $($attribute).clone().html();
        var attr_name = "pro_attr_" + counter;

        if ($("#product-type").val() == "simple_product") {
            var html =
                '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-attr-selectbox" id=' +
                attr_name +
                '><div class="col-md-1 col-sm-12 text-center my-auto"><i class="fas fa-sort"></i></div><div class="col-md-4 col-sm-12"> <select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes"><option value=""></option>' +
                $options +
                '</select></div><div class="col-md-4 col-sm-12 "> <select name="attribute_value_ids[]" class="multiple_values" multiple="" data-placeholder=" Type to search and select attributes values"><option value=""></option> </select></div><div class="col-md-2 col-sm-6 text-center py-1 align-self-center"> <button type="button" class="btn btn-tool remove_attributes"> <i class="text-danger far fa-times-circle fa-2x "></i> </button></div></div>';
        } else {
            $("#note").removeClass("d-none");
            var html =
                '<div class="form-group row move my-auto p-2 border rounded bg-gray-light product-attr-selectbox" id=' +
                attr_name +
                ">" +
                '<div class="col-md-1 col-sm-12 text-center my-auto">' +
                '<i class="fas fa-sort"></i>' +
                "</div>" +
                '<div class="col-md-4 col-sm-12">' +
                '<select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes">' +
                '<option value=""></option>' +
                $options +
                "</select>" +
                "</div>" +
                '<div class="col-md-4 col-sm-12 ">' +
                '<select name="attribute_value_ids[]" class="multiple_values"  multiple="" data-placeholder=" Type to search and select attributes values">' +
                '<option value=""></option> ' +
                "</select>" +
                "</div>" +
                '<div class="col-md-2 col-sm-6 text-center py-1 align-self-center"><input type="checkbox" name="variations[]" class="is_attribute_checked custom-checkbox ">' +
                "</div>" +
                '<div class="col-md-1 col-sm-6 text-center py-1 align-self-center "> ' +
                '<button type="button" class="btn btn-tool remove_attributes"> ' +
                '<i class="text-danger far fa-times-circle fa-2x ">' +
                "</i> " +
                "</button>" +
                "</div>" +
                "</div>";
        }
        $("#attributes_process").append(html);
        $("#attributes_process")
            .last()
            .find(".attributes")
            .select2({
                width: $(this).data("width")
                    ? $(this).data("width")
                    : $(this).hasClass("w-100")
                    ? "100%"
                    : "style",
                placeholder: $(this).data("placeholder"),
                allowClear: Boolean($(this).data("allow-clear")),
            });

        $("#attributes_process")
            .last()
            .find(".multiple_values")
            .select2({
                width: $(this).data("width")
                    ? $(this).data("width")
                    : $(this).hasClass("w-100")
                    ? "100%"
                    : "style",
                placeholder: $(this).data("placeholder"),
                allowClear: Boolean($(this).data("allow-clear")),
            });
    }

    if (e.target.id == "tab-for-variations") {
        if (!variantsCreated) {
            $(".additional-info").block({
                message: "<h6>Loading Variations</h6>",
                css: { border: "3px solid #E7F3FE" },
            });
            if (attributes_values.length > 0) {
                $(".no-variants-added").hide();
                create_variants(false);
            }
            setTimeout(function () {
                $(".additional-info").unblock();
            }, 2000);

            variantsCreated = true;
        }
    }
});

function switchToAttributesTab() {
    $("#general-settings").removeClass("active show");
    $("#product-attributes").addClass("active show");
}

$(document).on("click", ".remove_edit_attribute", function (e) {
    $(this).closest(".row").remove();
});

$(document).on("click", ".remove_attributes , .remove_variants", function (e) {
    Swal.fire({
        title: "Are you sure want to delete!",
        text: "You won't be able to revert this after update!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    }).then((result) => {
        if (result.value) {
            var text = this.className;
            if (text.search("remove_attributes") != -1) {
                var edit_id = $("#edit_product_id").val();

                attributes_values_selected.splice(
                    attributes_values_selected.indexOf(
                        $(this).select2().find(":selected").val()
                    ),
                    1
                );
                $(this).closest(".row").remove();
                counter -= 1;
                var numItems = $(".product-attr-selectbox").length;
                if (numItems == 0) {
                    $(".no-attributes-added").show();
                    $(".save_attributes").addClass("d-none");
                    $("#note").addClass("d-none");
                }
            }
            if (text.search("remove_variants") != -1) {
                variant_values_selected.splice(
                    variant_values_selected.indexOf(
                        $(this).select2().find(":selected").val()
                    ),
                    1
                );
                $(this).closest(".form-group").remove();
                variant_counter -= 1;
                var numItems = $(".product-variant-selectbox").length;
                if (numItems == 0) {
                    $(".no-variants-added").show();
                }
            }
        }
    });
});

$(document).on("change", "#product-type", function () {
    var value = $(this).val();
    if ($.trim(value) != "") {
        if (value == "simple_product") {
            $("#variant_stock_level").hide(200);
            $("#general_price_section").show(200);
            $(".simple-product-save").show(700);
            $(".product-attributes").addClass("disabled");
            $(".product-variants").addClass("disabled");
        }
        if (value == "variable_product") {
            $("#general_price_section").hide(200);
            $(".simple-product-level-stock-management").hide(200);
            $(".simple-product-save").hide(200);
            $(".product-attributes").addClass("disabled");
            $(".product-variants").addClass("disabled");
            $("#variant_stock_level").show();
        }
    } else {
        $(".product-attributes").addClass("disabled");
        $(".product-variants").addClass("disabled");
        $("#general_price_section").hide(200);
        $(".simple-product-level-stock-management").hide(200);
        $(".simple-product-save").hide(200);
        $("#variant_stock_level").hide(200);
    }
});

$(document).on("change", ".variant_stock_status", function () {
    if ($(this).prop("checked") == true) {
        $(this).attr("checked", true);
        $("#stock_level").show(200);
    } else {
        $(this).attr("checked", false);
        $("#stock_level").hide(200);
    }
});

$(document).on("change", ".variant-stock-level-type", function () {
    if ($(".variant-stock-level-type").val() == "product_level") {
        $(".variant-product-level-stock-management").show();
    }
    if ($.trim($(".variant-stock-level-type").val()) != "product_level") {
        $(".variant-product-level-stock-management").hide();
    }
});

$(document).on("click", ".save_attributes", function () {
    Swal.fire({
        title: "Are you sure want to save changes!",
        text: "Do not save attributes if you made no changes! It will reset the variants if there are no changes in attributes or its values !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    }).then((result) => {
        if (result.value) {
            attribute_flag = 1;
            save_attributes();

            // comment because while edit variable product vaiants are not initialized properly

            create_fetched_variants_html(true);

            iziToast.success({
                message: "Attributes Saved Succesfully",
                position: "topRight",
            });
        }
    });
});

$(document).on("click", ".save-settings", function (e) {
    e.preventDefault();

    if ($(".simple_stock_management_status").is(":checked")) {
        var len = 0;
    } else {
        var len = 1;
    }

    if (
        $(".stock-simple-mustfill-field").filter(function () {
            return this.value === "";
        }).length === len
    ) {
        $(".additional-info").block({
            message: "<h6>Saving Settings</h6>",
            css: { border: "3px solid #E7F3FE" },
        });

        $('input[name="product_type"]').val($("#product-type").val());
        if ($(".simple_stock_management_status").is(":checked")) {
            $('input[name="simple_product_stock_status"]').val(
                $("#simple_product_stock_status").val()
            );
        } else {
            $('input[name="simple_product_stock_status"]').val("");
        }
        $("#product-type").prop("disabled", true);
        // $(".product-attributes").removeClass("disabled");
        // $(".product-variants").removeClass("disabled");
        $(".simple_stock_management_status").prop("disabled", true);
        setTimeout(function () {
            $(".additional-info").unblock();
        }, 2000);
    } else {
        iziToast.error({
            message: "Please Fill All The Fields",
            position: "topRight",
        });
    }
});

$(document).on("click", ".save-variant-general-settings", function (e) {
    e.preventDefault();
    var $saveButton = $(this);

    if ($(".variant_stock_status").is(":checked")) {
        // Check if the required fields are filled
        if (
            $(".variant-stock-level-type").filter(function () {
                return this.value === "";
            }).length === 0 &&
            $.trim($(".variant-stock-level-type").val()) != ""
        ) {
            if (
                $(".variant-stock-level-type").val() == "product_level" &&
                $(".variant-stock-mustfill-field").filter(function () {
                    return this.value === "";
                }).length !== 0
            ) {
                iziToast.error({
                    message: "Please Fill All The Fields",
                    position: "topRight",
                });
            } else {
                $('input[name="product_type"]').val($("#product-type").val());
                $('input[name="variant_stock_level_type"]').val(
                    $("#stock_level_type").val()
                );
                $('input[name="variant_stock_status"]').val("0");
                $("#product-type").prop("disabled", true);
                $("#stock_level_type").prop("disabled", true);
                $saveButton.removeClass("save-variant-general-settings");
                $(".product-attributes").removeClass("disabled");
                $(".product-variants").removeClass("disabled");
                $(".variant-stock-level-type").prop("readonly", true);
                $("#stock_status_variant_type").attr("readonly", true);
                $(".variant-product-level-stock-management")
                    .find("input,select")
                    .prop("readonly", true);
                $("#tab-for-variations").removeClass("d-none");
                $(".variant_stock_status").prop("disabled", true);
                $('#product-tab a[href="#product-attributes"]').tab("show");
                Swal.fire(
                    "Settings Saved !",
                    "Attributes & Variations Can Be Added Now",
                    "success"
                );
            }
        } else {
            iziToast.error({
                message: "Please Fill All The Fields",
                position: "topRight",
            });
        }
    } else {
        $('input[name="product_type"]').val($("#product-type").val());
        $('#product-tab a[href="#product-attributes"]').tab("show");
        $("#product-type").prop("disabled", true);
        $(".product-attributes").removeClass("disabled");
        $(".product-variants").removeClass("disabled");
        $("#tab-for-variations").removeClass("d-none");
        $saveButton.removeClass("save-variant-general-settings");
        Swal.fire(
            "Settings Saved !",
            "Attributes & Variations Can Be Added Now",
            "success"
        );
    }
});

$(document).on("change", ".new-added-variant", function () {
    var myOpts = $(this)
        .children()
        .map(function () {
            return $(this).val();
        })
        .get();
    var variant_id = $(this).val();
    var curr_vals = [];
    var $variant_ids = $(this)
        .closest(".product-variant-selectbox")
        .find('input[name="variants_ids[]"]')
        .val();
    $.each($variant_ids.split(","), function (key, val) {
        if (val != "") {
            curr_vals[key] = $.trim(val);
        }
    });
    var newvalues = curr_vals.filter((el) => !myOpts.includes(el));
    var len = newvalues.length;
    if (variant_id != "") {
        newvalues[len] = $.trim(variant_id);
    }
    $(this)
        .closest(".product-variant-selectbox")
        .find('input[name="variants_ids[]"]')
        .val(newvalues.toString());
});

$(document).on("submit", "#save-product", function (e) {
    e.preventDefault();
    var product_type = $("#product-type").val();
    var counter = 0;
    if (product_type != "undefined" && product_type != " ") {
        if ($.trim(product_type) == "simple_product") {
            if ($(".simple_stock_management_status").is(":checked")) {
                var len = 0;
            } else {
                var len = 1;
            }

            if (
                $(".stock-simple-mustfill-field").filter(function () {
                    return this.value === "";
                }).length === len
            ) {
                $('input[name="product_type"]').val($("#product-type").val());
                if ($(".simple_stock_management_status").is(":checked")) {
                    $('input[name="simple_product_stock_status"]').val(
                        $("#simple_product_stock_status").val()
                    );
                } else {
                    $('input[name="simple_product_stock_status"]').val("");
                }
                $("#product-type").prop("disabled", true);
                $(".product-attributes").removeClass("disabled");
                $(".product-variants").removeClass("disabled");
                $(".simple_stock_management_status").prop("disabled", true);

                save_product(this);
            } else {
                iziToast.error({
                    message: "Please fill all the fields like total stock etc.",
                    position: "topRight",
                });
            }
        }

        if ($.trim(product_type) == "variable_product") {
            if ($(".variant_stock_status").is(":checked")) {
                var variant_stock_level_type = $(
                    ".variant-stock-level-type"
                ).val();
                if (variant_stock_level_type == "product_level") {
                    if (
                        $(".variant-stock-level-type").filter(function () {
                            return this.value === "";
                        }).length === 0 &&
                        $.trim($(".variant-stock-level-type").val()) != ""
                    ) {
                        if (
                            $(".variant-stock-level-type").val() ==
                                "product_level" &&
                            $(".variant-stock-mustfill-field").filter(
                                function () {
                                    return this.value === "";
                                }
                            ).length !== 0
                        ) {
                            iziToast.error({
                                message: "Please Fill All The Fields",
                                position: "topRight",
                            });
                        } else {
                            var varinat_price = $(
                                'input[name="variant_price[]"]'
                            ).val();

                            if (
                                $('input[name="variant_price[]"]').length >= 1
                            ) {
                                if (
                                    $(".varaint-must-fill-field").filter(
                                        function () {
                                            return this.value === "";
                                        }
                                    ).length == 0
                                ) {
                                    $('input[name="product_type"]').val(
                                        $("#product-type").val()
                                    );
                                    $(
                                        'input[name="variant_stock_level_type"]'
                                    ).val($("#stock_level_type").val());
                                    $('input[name="varaint_stock_status"]').val(
                                        "0"
                                    );
                                    $("#product-type").prop("disabled", true);
                                    $("#stock_level_type").prop(
                                        "disabled",
                                        true
                                    );
                                    $(this).removeClass(
                                        "save-variant-general-settings"
                                    );
                                    $(".product-attributes").removeClass(
                                        "disabled"
                                    );
                                    $(".product-variants").removeClass(
                                        "disabled"
                                    );
                                    $(".variant-stock-level-type").prop(
                                        "readonly",
                                        true
                                    );
                                    $("#stock_status_variant_type").attr(
                                        "readonly",
                                        true
                                    );
                                    $(".variant-product-level-stock-management")
                                        .find("input,select")
                                        .prop("readonly", true);
                                    $("#tab-for-variations").removeClass(
                                        "d-none"
                                    );
                                    $(".variant_stock_status").prop(
                                        "disabled",
                                        true
                                    );
                                    $(
                                        '#product-tab a[href="#product-attributes"]'
                                    ).tab("show");
                                    save_product(this);
                                } else {
                                    $(".varaint-must-fill-field").each(
                                        function () {
                                            $(this).css("border", "");
                                            if ($(this).val() == "") {
                                                $(this).css(
                                                    "border",
                                                    "2px solid red"
                                                );
                                                $(this)
                                                    .closest(
                                                        "#variant_stock_management_html"
                                                    )
                                                    .find("div:first")
                                                    .addClass("show");
                                                $(
                                                    '#product-tab a[href="#product-variants"]'
                                                ).tab("show");
                                                counter++;
                                            }
                                        }
                                    );
                                }
                            } else {
                                Swal.fire(
                                    "Variation Needed !",
                                    "At least Add One Variation To Add The Product.",
                                    "warning"
                                );
                            }
                        }
                    } else {
                        iziToast.error({
                            message: "Please Fill All The Fields",
                            position: "topRight",
                        });
                    }
                } else {
                    if ($('input[name="variant_price[]"]').length >= 1) {
                        if (
                            $(".varaint-must-fill-field").filter(function () {
                                return this.value === "";
                            }).length == 0
                        ) {
                            $('input[name="product_type"]').val(
                                $("#product-type").val()
                            );
                            $(".variant_stock_status").prop("disabled", true);
                            $("#product-type").prop("disabled", true);
                            $(".product-attributes").removeClass("disabled");
                            $(".product-variants").removeClass("disabled");
                            $("#tab-for-variations").removeClass("d-none");
                            save_product(this);
                        } else {
                            $(".varaint-must-fill-field").each(function () {
                                $(this).css("border", "");
                                if ($(this).val() == "") {
                                    $(this).css("border", "2px solid red");
                                    $(this)
                                        .closest(
                                            "#variant_stock_management_html"
                                        )
                                        .find("div:first")
                                        .addClass("show");
                                    $(
                                        '#product-tab a[href="#product-variants"]'
                                    ).tab("show");
                                    counter++;
                                }
                            });
                        }
                    } else {
                        Swal.fire(
                            "Variation Needed !",
                            "Atleast Add One Variation To Add The Product.",
                            "warning"
                        );
                    }
                }
            } else {
                if ($('input[name="variant_price[]"]').length == 0) {
                    Swal.fire(
                        "Variation Needed !",
                        "Atleast Add One Variation To Add The Product.",
                        "warning"
                    );
                } else {
                    if (
                        $(".varaint-must-fill-field").filter(function () {
                            return this.value === "";
                        }).length == 0
                    ) {
                        save_product(this);
                    } else {
                        $(".varaint-must-fill-field").each(function () {
                            $(this).css("border", "");
                            if ($(this).val() == "") {
                                $(this).css("border", "2px solid red");
                                $(this)
                                    .closest("#variant_stock_management_html")
                                    .find("div:first")
                                    .addClass("show");
                                $(
                                    '#product-tab a[href="#product-variants"]'
                                ).tab("show");
                                counter++;
                            }
                        });
                    }
                }
            }
        }
    } else {
        iziToast.error({
            message: "Please Select Product Type !",
            position: "topRight",
        });
    }

    if (counter > 0) {
        iziToast.error({
            message:
                "Please fill all the required fields in the variation tab !",
            position: "topRight",
        });
    }
});

// Trigger change event on page load
$(document).ready(function () {
    $(".simple_stock_management_status").trigger("change");
});

$(document).on("change", "#add_on_snaps", function (e) {
    e.preventDefault();
    var price = $(this).find(":selected").data("price");
    var description = $(this).find(":selected").data("description");
    var calories = $(this).find(":selected").data("calories");
    // console.log(price);
    // console.log(description);
    // console.log(calories);
    $("#add_on_title").val(this.value);
    $("#add_on_description").val(description);
    $("#add_on_price").val(price);
    $("#add_on_calories").val(calories);
});

var add_on_data = [];
$("#save_add_ons").on("click", function (event) {
    var table_data = new Object();
    event.preventDefault();
    var title = $("#add_on_title").val();
    var des = $("#add_on_description").val();
    var price = $("#add_on_price").val();
    var calories = $("#add_on_calories").val();
    if (!title) {
        iziToast.error({
            message:
                '<span style="text-transform:capitalize">Please enter Title for Add Ons!</span> ',
            position: "topRight",
        });
        return false;
    }
    if (!price) {
        iziToast.error({
            message:
                '<span style="text-transform:capitalize">Please enter Price for Add Ons!</span> ',
            position: "topRight",
        });
        return false;
    }
    var is_exist = false;
    $.each(add_on_data, function (i, e) {
        if (e.title === title) {
            iziToast.error({
                message: `<span style="text-transform:capitalize">${title} is already in list!</span> `,
                position: "topRight",
            });
            is_exist = true;
            return false;
        }
    });
    if (is_exist === false) {
        add_on_data.push({
            title: $("#add_on_title").val(),
            description: des ? $("#add_on_description").val() : "",
            price: $("#add_on_price").val(),
            calories: calories ? $("#add_on_calories").val() : "0",
            status: 1,
        });
        table_data.title = $("#add_on_title").val();
        table_data.description = des ? $("#add_on_description").val() : "";
        table_data.price = $("#add_on_price").val();
        table_data.calories = calories ? $("#add_on_calories").val() : "0";

        $("#saved_add_ons_table").bootstrapTable("insertRow", {
            index: 0,
            row: table_data,
        });

        $("#add_on_title").val("");
        $("#add_on_description").val("");
        $("#add_on_price").val("");
        $("#add_on_calories").val("");
        $('input[name="product_add_ons"]').val(JSON.stringify(add_on_data));
        iziToast.success({
            message: "Add Ons Saved Successfully! ",
            position: "topRight",
        });
    }
});
$(document).on("click", ".remove-add-ons", function (event) {
    event.preventDefault();
    var save_data = [];
    var titles = $.map(
        $("#saved_add_ons_table").bootstrapTable("getSelections"),
        function (row) {
            return row.title;
        }
    );
    $("#saved_add_ons_table").bootstrapTable("remove", {
        field: "title",
        values: titles,
    });
    var final_data = $("#saved_add_ons_table").bootstrapTable("getData");
    $.each(final_data, function (i, e) {
        save_data.push({
            title: e.title,
            description: e.description ? e.description : "",
            price: e.price,
            calories: e.calories ? e.calories : "0",
            status: 1,
        });
    });
    $('input[name="product_add_ons"]').val(JSON.stringify(save_data));
});

// add-edit product endpoint

//order  type in POS
$('input[name="order_type"]').change(function () {
    if ($(this).val() == "walk_in" || $(this).val() == "dine_in") {
        $(".customer_registration").hide();
    } else {
        $(".customer_registration").show();
    }
});

//  console.log('sid');
// DINE -IN

$("#floor_dropdown").select2();

// Initialize the table dropdown
$("#table-dropdown").select2();

// $('#pos-layout').hide();
// Update the table dropdown when the floor dropdown changes
$("#floor_dropdown").on("change", function () {
    var floorId = $(this).val();
    $.ajax({
        url: "/partner/dine_in/getTablesByFloor/" + floorId,
        type: "GET",
        dataType: "json",
        success: function (response) {
            // Clear the existing options
            $("#table-dropdown").empty();
            $("#table-dropdown").append(
                '<option value="">' + "Select a table" + "</option>"
            );

            // Add the new options
            $.each(response, function (index, table) {
                if (table.availability === 1) {
                    var badge =
                        '<span class="badge badge-center rounded-pill bg-label-success"> </span>';
                } else {
                    var badge =
                        '<span class="badge badge-center rounded-pill bg-label-warning"> </span>';
                }

                $("#table-dropdown").append(
                    '<option value="' +
                        table.id +
                        '">' +
                        table.name +
                        badge +
                        "</option>"
                );
            });
            // Update the Select2 dropdown
        },
    });
});
$("#table-dropdown").on("change", function () {
    $("#pos-layout").removeClass("d-none");
});

$(document).ready(function () {
    const resetBtn = $(".reset-btn");
    const floorDropdown = $("#floor_dropdown");
    const tableDropdown = $("#table-dropdown");
    const posLayout = $("#pos-layout");

    resetBtn.on("click", function () {
        floorDropdown.val("");
        tableDropdown.val("");
        posLayout.addClass("d-none");
    });

    function checkDropdowns() {
        if (tableDropdown.val() === "") {
            posLayout.addClass("d-none");
        } else {
            posLayout.removeClass("d-none");
        }
        if (floorDropdown.val() === "") {
            posLayout.addClass("d-none");
        }
    }

    floorDropdown.on("change", function () {
        checkDropdowns();
    });

    tableDropdown.on("change", function () {
        $("#table_id").val($(this).val());
        checkDropdowns();
    });
});

//set location

$(document).ready(function () {
    // Handle location selection
    $("#location-dropdown").on("click", "li", function () {
        var location_id = $(this).data("location-id");
        var location_name = $(this).data("location-name");
        var location_icon = $(this).data("location-icon");
        token = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            type: "POST",
            url: "/set-location",
            data: {
                _token: token,
                location_id: location_id,
                location_name: location_name,
                location_icon: location_icon,
            },
            success: function (data) {
                // console.log(data);
                if (data) {
                    iziToast.success({
                        message: "Location Set Successfully",
                        position: "topRight",
                    });
                } else {
                    iziToast.error({
                        message: "Error In Setting Location",
                        position: "topRight",
                    });
                }
                location.reload();
            },
        });
    });
});

$(document).on("click", "#update_add_ons", function () {
    // alert("here");
    var add_on_id = $('input[name="add_on_id"]').val();
    var title = $("#add_on_title").val();
    var des = $("#add_on_description").val();
    var price = $("#add_on_price").val();
    var calories = $("#add_on_calories").val();
    var product_id = $(this).data("product_id");

    Swal.fire({
        title: "Are You Sure !",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/partner/products/update_add_ons",
                    type: "POST",
                    data: {
                        add_on_id: add_on_id,
                        title: title,
                        product_id: product_id,
                        description: des,
                        price: price,
                        calories: calories,
                        _token: $('meta[name="csrf-token"]').attr("content"),
                    },
                    dataType: "json",
                })
                    .done(function (response, textStatus) {
                        token = $('meta[name="csrf-token"]').attr("content");
                        if (response.error == false) {
                            Swal.fire("Done!", response.message, "success");
                            $("table").bootstrapTable("refresh");
                            $("#add_on_title").val("");
                            $("#add_on_description").val("");
                            $("#add_on_price").val("");
                            $("#add_on_calories").val("");
                        } else {
                            Swal.fire("Oops...", response.message, "warning");
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        Swal.fire(
                            "Oops...",
                            "Something went wrong with ajax !",
                            "error"
                        );
                    });
            });
        },
        allowOutsideClick: false,
    });
});
$(document).on("click", "#add_new_add_ons", function (e) {
    e.preventDefault();
    var title = $("#add_on_title").val();
    var des = $("#add_on_description").val();
    var price = $("#add_on_price").val();
    var calories = $("#add_on_calories").val();
    var product_id = $(this).data("product_id");

    Swal.fire({
        title: "Are You Sure !",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Insert it!",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/partner/products/update_add_ons",
                    type: "POST",
                    data: {
                        title: title,
                        product_id: product_id,
                        description: des,
                        price: price,
                        calories: calories,
                        _token: $('meta[name="csrf-token"]').attr("content"),
                    },
                    dataType: "json",
                })
                    .done(function (response, textStatus) {
                        token = $('meta[name="csrf-token"]').attr("content");
                        if (response.error == false) {
                            Swal.fire("Done!", response.message, "success");
                            $("table").bootstrapTable("refresh");
                            $("#add_on_title").val("");
                            $("#add_on_description").val("");
                            $("#add_on_price").val("");
                            $("#add_on_calories").val("");
                        } else {
                            Swal.fire("Oops...", response.message, "warning");
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        Swal.fire(
                            "Oops...",
                            "Something went wrong with ajax !",
                            "error"
                        );
                    });
            });
        },
        allowOutsideClick: false,
    });
});
$("#add_ons_table").on("check.bs.table", function (e, row) {
    $("#add_on_title").val(row.title);
    $("#add_on_description").val(row.description);
    $("#add_on_price").val(row.price);
    $("#add_on_calories").val(row.calories);
    $('input[name="add_on_id"]').val(row.id);
});
$(document).on("click", "#delete-add-ons", function () {
    var id = $(this).data("id");
    Swal.fire({
        title: "Are You Sure!",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "GET",
                    url: "/partner/products/delete_add_on",
                    data: {
                        id: id,
                    },
                    dataType: "json",
                })
                    .done(function (response, textStatus) {
                        if (response.error == false) {
                            Swal.fire("Deleted!", response.message, "success");
                        } else {
                            Swal.fire("Oops...", response.message, "error");
                        }
                        $("table").bootstrapTable("refresh");
                        token = $('meta[name="csrf-token"]').attr("content");
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        Swal.fire(
                            "Oops...",
                            "Something went wrong with ajax !",
                            "error"
                        );
                        token = $('meta[name="csrf-token"]').attr("content");
                    });
            });
        },
        allowOutsideClick: false,
    });
});
$(document).on("click", ".reset-settings", function (e) {
    // alert("here");
    Swal.fire({
        title: "Are You Sure To Reset!",
        text: "This will reset all attributes && variants too if added.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reset it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.value) {
            attributes_values_selected = [];
            value_check_array = [];
            pre_selected_attr_values = [];
            var html =
                '<input type="hidden" name="reset_settings" value="1">' +
                '<div class="row mt-4 col-md-12 ">' +
                '<nav class="w-100">' +
                '<div class="nav nav-tabs" id="product-tab" role="tablist">' +
                '<ul class="nav nav-pills mb-3" role="tablist">' +
                '<li class="nav-item">' +
                '<a class="nav-item nav-link active"' +
                'id="tab-for-general-price" data-bs-toggle="tab"' +
                ' href="#general-settings" role="tab"' +
                ' aria-controls="general-price"' +
                'aria-selected="true">General' +
                "</a>" +
                "</li>" +
                '<li class="nav-item">' +
                '<a class="nav-item nav-link disabled product-attributes"' +
                'id="tab-for-attributes" data-bs-toggle="tab"' +
                'href="#product-attributes" role="tab"' +
                'aria-controls="product-attributes"' +
                'aria-selected="false">Attributes' +
                "</a>" +
                "</li>" +
                '<li class="nav-item">' +
                '<a class="nav-item nav-link disabled product-variants d-none"' +
                'id="tab-for-variations" data-bs-toggle="tab"' +
                'href="#product-variants" role="tab"' +
                'aria-controls="product-variants"' +
                ' aria-selected="false">Variations' +
                "</a>" +
                "</li>" +
                "</ul>" +
                "</div>" +
                "</nav>" +
                '<div class="tab-content p-3 col-md-12" id="nav-tabContent">' +
                '<div class="tab-pane fade active show" id="general-settings"' +
                'role="tabpanel" aria-labelledby="general-settings-tab">' +
                '<div class="form-group mb-2">' +
                '<label for="type" class="col-md-12">Type Of Product' +
                ":</label>" +
                '<div class="col-md-12 mt-3">' +
                '<input type="hidden" name="product_type">' +
                '<select name="type" id="product-type"' +
                'class="form-control product-type"' +
                'data-placeholder=" Type to search and select type">' +
                '<option value=" ">Select Type</option>' +
                '<option value="simple_product">Simple Product</option>' +
                '<option value="variable_product">Variable Product' +
                "</option>" +
                "</select>" +
                " </div>" +
                "</div>" +
                '<div id="product-general-settings mb-2">' +
                '<div id="general_price_section" class="collapse">' +
                '<div class="form-group mt-3">' +
                '<label for="type" class="col-md-2">Price:</label>' +
                '<div class="col-md-12">' +
                '<input type="number" name="simple_price"' +
                'class="form-control stock-simple-mustfill-field price"' +
                'min="0" step="0.01">' +
                "</div>" +
                "</div>" +
                '<div class="form-group mt-3">' +
                '<label for="type" class="col-md-2">Special' +
                "Price:</label>" +
                '<div class="col-md-12">' +
                '<input type="number" name="simple_special_price"' +
                'class="form-control discounted_price"' +
                'min="0" step="0.01">' +
                "</div>" +
                "</div>" +
                '<div class="form-group mt-3">' +
                '<div class="col">' +
                '<input type="checkbox"' +
                'name="simple_stock_management_status"' +
                'class="align-middle simple_stock_management_status">' +
                '<span class="align-middle">Enable Stock' +
                "Management</span>" +
                "</div>" +
                "</div>" +
                "<div" +
                'class="form-group simple-product-level-stock-management mt-2">' +
                '<div class="col col-xs-12">' +
                '<label class="control-label">Total Stock :</label>' +
                '<input type="text" name="product_total_stock"' +
                'class="col form-control stock-simple-mustfill-field">' +
                "</div>" +
                '<div class="col col-xs-12 mt-2">' +
                '<label class="control-label">Stock Status :</label>' +
                '<select type="text"' +
                'class="col form-control stock-simple-mustfill-field"' +
                'id="simple_product_stock_status">' +
                '<option value="1">' +
                "In Stock" +
                "</option>" +
                '<option value="0">' +
                "Out Of Stock" +
                "</option>" +
                "</select>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="form-group mt-4 collapse simple-product-save">' +
                '<div class="col"> <a href="javascript:void(0);"' +
                'class="btn btn-info save-settings">Save' +
                "Settings</a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div id="variant_stock_level" class="form-group collapse">' +
                '<div class="form-group">' +
                '<div class="col">' +
                '<input type="checkbox"' +
                'name="variant_stock_management_status"' +
                'class="align-middle variant_stock_status"> <span' +
                'class="align-middle"> Enable Stock' +
                "Management</span>" +
                "</div>" +
                "</div>" +
                '<div class="form-group collapse mt-2" id="stock_level">' +
                '<label for="type" class="col-md-2">Choose Stock' +
                "Management Type:</label>" +
                '<div class="col-md-12">' +
                '<select id="stock_level_type"' +
                'class="form-control variant-stock-level-type"' +
                'data-placeholder=" Type to search and select type">' +
                '<option value=" ">Select Stock Type</option>' +
                '<option value="product_level">Product Level ( Stock' +
                "Will Be Managed Generally )" +
                "</option>" +
                "</select>" +
                "<div" +
                'class="form-group row variant-product-level-stock-management collapse mt-2">' +
                '<div class="col col-xs-12">' +
                '<label class="control-label">Total Stock' +
                ":</label>" +
                '<input type="text"' +
                'name="total_stock_variant_type"' +
                'class="col form-control variant-stock-mustfill-field">' +
                "</div>" +
                '<div class="col col-xs-12 mt-2">' +
                '<label class="control-label">Stock Status' +
                ":</label>" +
                '<select type="text"' +
                'id="stock_status_variant_type"' +
                'name="variant_status"' +
                'class="col form-control variant-stock-mustfill-field">' +
                '<option value="1">In Stock</option>' +
                '<option value="0">Out Of Stock' +
                "</option>" +
                "</select>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="form-group mt-4">' +
                '<div class="col"> <a href="javascript:void(0);"' +
                'class="btn btn-info save-variant-general-settings">Save' +
                "Settings</a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="tab-pane fade" id="product-attributes" role="tabpanel"' +
                'aria-labelledby="product-attributes-tab">' +
                '<div class="info col-12 p-3 d-none" id="note">' +
                '<div class=" col-12 d-flex align-center"> <strong' +
                'class="text text-dark">Note : </strong>' +
                '<input type="checkbox" checked="checked"' +
                'class="ml-3 my-auto custom-checkbox" disabled> <span' +
                'class="ml-3 text text-dark">check if the attribute is' +
                "to be used for variation </span>" +
                "</div>" +
                "</div>" +
                '<div class="col-md-12 d-flex justify-content-end">' +
                '<a href="javascript:void(0);" class="save_attributes" id=""' +
                'class="btn btn-block btn-outline-primary col-md-2 d-none m-2 btn-sm">Save' +
                "Attributes</a>" +
                '<a href="javascript:void(0);" id="add_attributes"' +
                'class="btn btn-block btn-outline-primary col-md-2  m-2 btn-sm">Add' +
                "Attributes</a>" +
                "</div>" +
                '<div class="clearfix"></div>' +
                '<div id="attributes_process">' +
                "<div" +
                ' class="form-group text-center row my-auto p-2 border rounded bg-gray-light col-md-12 no-attributes-added">' +
                '<div class="col-md-12 text-center">No Product Attribures' +
                "Were Added !" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="tab-pane fade" id="product-variants" role="tabpanel"' +
                'aria-labelledby="product-variants-tab">' +
                '<div class="clearfix"></div>' +
                "<div" +
                'class="form-group text-center row my-auto p-2 border rounded bg-gray-light col-md-12 no-variants-added">' +
                '<div class="col-md-12 text-center">No Product Variations Were' +
                "Added !" +
                "</div>" +
                "</div>" +
                '<div id="variants_process"></div>' +
                "</div>" +
                "</div>" +
                "</div>";
            $(".additional-info").html(html);
            $(".no-attributes-added").show();
            $("#product-type").each(function () {
                $(this).select2({
                    theme: "bootstrap4",
                    width: $(this).data("width")
                        ? $(this).data("width")
                        : $(this).hasClass("w-100")
                        ? "100%"
                        : "style",
                    placeholder: $(this).data("placeholder"),
                    allowClear: Boolean($(this).data("allow-clear")),
                });
            });
        }
    });
});
//order  type in POS
$('input[name="order_type"]').change(function () {
    if ($(this).val() == "walk_in" || $(this).val() == "dine_in") {
        $(".customer_registration").hide();
    } else {
        $(".customer_registration").show();
    }
});
//  console.log('sid');
// DINE -IN
$("#floor_dropdown").select2();
// Initialize the table dropdown
$("#table-dropdown").select2();
// $('#pos-layout').hide();
// Update the table dropdown when the floor dropdown changes
$("#floor_dropdown").on("change", function () {
    var floorId = $(this).val();
    $.ajax({
        url: "/partner/dine_in/getTablesByFloor/" + floorId,
        type: "GET",
        dataType: "json",
        success: function (response) {
            // Clear the existing options
            $("#table-dropdown").empty();
            $("#table-dropdown").append(
                '<option value="">' + "Select a table" + "</option>"
            );
            // Add the new options
            $.each(response, function (index, table) {
                if (table.availability === 1) {
                    var badge =
                        '<span class="badge badge-center rounded-pill bg-label-success"> </span>';
                } else {
                    var badge =
                        '<span class="badge badge-center rounded-pill bg-label-warning"> </span>';
                }
                $("#table-dropdown").append(
                    '<option value="' +
                        table.id +
                        '">' +
                        table.name +
                        badge +
                        "</option>"
                );
            });
            // Update the Select2 dropdown
        },
    });
});
$("#table-dropdown").on("change", function () {
    $("#pos-layout").removeClass("d-none");
});
$(document).ready(function () {
    const resetBtn = $(".reset-btn");
    const floorDropdown = $("#floor_dropdown");
    const tableDropdown = $("#table-dropdown");
    const posLayout = $("#pos-layout");
    resetBtn.on("click", function () {
        floorDropdown.val("").trigger("change"); // Reset the value and trigger change event
        tableDropdown.val("").trigger("change"); // Reset the value and trigger change event
        posLayout.addClass("d-none");
    });
    function checkDropdowns() {
        if (tableDropdown.val() === "") {
            posLayout.addClass("d-none");
        } else {
            posLayout.removeClass("d-none");
        }
        if (floorDropdown.val() === "") {
            posLayout.addClass("d-none");
        }
    }
    floorDropdown.on("change", function () {
        checkDropdowns();
    });
    tableDropdown.on("change", function () {
        $("#table_id").val($(this).val());
        checkDropdowns();
    });
});

function subscription_reminder(subscription_id) {
    var subscription_id = subscription_id;
    Swal.fire({
        title: "Send Reminder Message",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
    }).then((result) => {
        if (result.value == true) {
            $.ajax({
                type: "GET",
                url: "/admin/expire_plans/send",
                data: {
                    subscription_id: subscription_id,
                },
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        iziToast.success({
                            title: "Success",
                            message: "Email sent successfully!",
                            position: "topRight",
                        });
                    } else {
                        iziToast.error({
                            title: "Error",
                            message: "Error sending email: " + response.error,
                            position: "topRight",
                        });
                    }
                },
                error: function (xhr, status, error) {
                    iziToast.error({
                        title: "Error",
                        message: "Error sending email: " + error,
                        position: "topRight",
                    });
                },
            });
        }
    });
}

// Get the sidebar, half_logo, and store_logo elements
const sidebar = document.querySelector(".layout-menu-fixed");
const halfLogo = document.querySelector(".half_logo");
const storeLogo = document.querySelector(".store_logo");

// Add an event listener to the sidebar to toggle the logos
sidebar.addEventListener("click", function () {
    if (sidebar.classList.contains("layout-menu-collapsed")) {
        $(".half_logo").removeClass("d-none");
        halfLogo.style.display = "block";
        storeLogo.style.display = "none";
    } else {
        $(".store_logo").removeClass("d-none");
        $(".half_logo").addClass("d-none");
        halfLogo.style.display = "none";
        storeLogo.style.display = "block";
    }
});

// Create Payment Method

$(document).ready(function () {
    $(".create_payment_button").on("click", function () {
        var paymentMethodName = $(this)
            .closest(".modal-content")
            .find(".create_payment_method_name")
            .val();
        var paymentMethod = {
            payment_method_name: paymentMethodName,
            _token: $('meta[name="csrf-token"]').attr("content"),
        };

        $.ajax({
            url: "/partner/pos/create_payment_method",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(paymentMethod),
            success: function (response) {
                iziToast.success({
                    title: "Success",
                    message: "Payment method created successfully!",
                    position: "topRight",
                });
                $(this).closest(".modal").modal("hide");
                window.location.reload();
            },
            error: function (xhr, status, error) {
                console.log(error);
                iziToast.error({
                    title: "Error",
                    message:
                        "An error occurred while creating the payment method. Please try again.",
                    position: "topRight",
                });
            },
        });
    });
});

// Handle click event on "Add Another Payment Method" button
// Define the transactionCount variables for each tab
var productTransactionCount = 1;
var comboTransactionCount = 1;

$(".add_payment_method_btn").on("click", function () {
    var currentTab = $(this).closest(".tab-pane").attr("id");

    // Determine the transactionCount based on the current tab
    var transactionCount =
        currentTab === "nav-product"
            ? productTransactionCount
            : comboTransactionCount;
    console.log(transactionCount);
    // Check if a payment method has already been added

    // Clone the payment method template
    var paymentMethodRow = $(
        "#" + currentTab + " .payment_method_template .payment_method_row"
    ).clone();

    // Add click event listener to the remove button
    paymentMethodRow
        .find(".remove_payment_method_btn")
        .on("click", function () {
            $(this).closest(".payment_method_row").remove(); // Remove the parent row

            // Decrement the transactionCount based on the current tab
            if (currentTab === "nav-product") {
                productTransactionCount--;
            } else if (currentTab === "nav-combo-poduct") {
                comboTransactionCount--;
            }
        });

    // Append the cloned payment method row to the desired container
    $("#" + currentTab + " .additional_payment_methods_container").append(
        paymentMethodRow
    );

    // Increment the transactionCount based on the current tab
    if (currentTab === "nav-product") {
        productTransactionCount++;
    } else if (currentTab === "nav-combo-poduct") {
        comboTransactionCount++;
    }
});

// Add Another Payment Method
$(document).ready(function () {
    // Show/hide "Add Payment Method" button based on selected payment status
    $(".payment_status").change(function () {
        if ($(this).val() === "partially_paid") {
            $(".add_payment_method_btn").removeClass("d-none");
        } else {
            $(".add_payment_method_btn").addClass("d-none");
        }
    });

    // Handle change event on payment method dropdown
    $(document).on("change", ".payment_method", function () {
        var paymentMethod = $(this).val();
        var amountInput = $(this)
            .closest(".payment_method_row")
            .find(".amount");
        var transactionIdInput = $(this)
            .closest(".payment_method_row")
            .find(".transaction_id");

        if (paymentMethod == "COD" || paymentMethod == "cash_payment") {
            // Hide transaction ID input
            transactionIdInput.hide();
        } else {
            // Show transaction ID input
            transactionIdInput.show();
        }
    });

    // Handle payment method change
    $(document).on("change", ".payment_method", function () {
        var selectedPaymentMethods = $(".payment_method option:selected")
            .map(function () {
                return $(this).val();
            })
            .get();

        // console.log(selectedPaymentMethods);
    });
});
// Sending Print to kitchen
$(document).ready(function () {
    $(".send_to_kitchen").click(function () {
        // Retrieve the floor_id and table_id from the data attributes
        var floor_id = $("#floor_dropdown").val();
        var table_id = $("#table-dropdown").val();

        // Perform any necessary actions with the floor_id and table_id, such as AJAX request or form submission
        // ...

        // Redirect to the send_to_kitchen route with the floor_id and table_id
        var url =
            "/partner/dine_in/send_to_kitchen/" + floor_id + "/" + table_id;
        window.open(url, "_blank");
    });
});
$(document).on("change", "#category_parent", function () {
    $("#products_table").bootstrapTable("refresh");
});
$(document).on("change", "#status_filter", function () {
    $("#products_table").bootstrapTable("refresh");
});
$(document).on("change", "#product_type", function () {
    $("#products_table").bootstrapTable("refresh");
});

function product_query_params(p) {
    return {
        category_id: $("#category_parent").val(),
        partner_id: $("#restro_filter").val(),
        status: $("#status_filter").val(),
        product_type: $("#product_type").val(),
        limit: p.limit,
        sort: p.sort,
        order: p.order,
        offset: p.offset,
        search: p.search,
    };
}
$(document).ready(function () {
    if ($("#location_checkbox").is(":checked")) {
        $("#select_locations").hide();
    }

    // Listen for checkbox change event
    $("#location_checkbox").change(function () {
        if ($(this).is(":checked")) {
            $("#select_locations").hide(); // Hide the dropdown if checkbox is checked
        } else {
            $("#select_locations").show(); // Show the dropdown if checkbox is not checked
        }
    });
});

$(document).ready(function () {
    // Handle form submission
    var form = $("#create_transaction_form");
    var createBtn = $("#create_transaction_btn");
    createBtn.click(function () {
        // Perform AJAX request to submit the form data
        $.ajax({
            url: "/partner/orders/create_transaction",
            method: "POST",
            data: form.serialize(), // Serialize the form data
            success: function (response) {
                console.log(response);
                if (response.error == true) {
                    iziToast.error({
                        title: "Error",
                        message: response.message,
                        position: "topRight",
                    });
                } else {
                    iziToast.success({
                        title: "Success",
                        message: response.message,
                        position: "topRight",
                    });
                    window.location.reload();
                }
            },
            error: function (xhr, status, error) {
                // Handle error
                console.error(error);
            },
        });
    });
});

// Show/hide div-7 based on tab selection

// $(document).ready(function () {
//     $(document).ready(function () {
//         $('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
//             var targetTab = $(e.target).attr("href");
//             var otherTab =
//                 targetTab === "#nav-product"
//                     ? "#nav-combo-product"
//                     : "#nav-product";
//             $(otherTab).removeClass("active show");

//             if (targetTab === "#nav-product") {
//                 $("#common-column").removeClass("d-none");
//             } else {
//                 $("#common-column").addClass("d-none");
//             }
//         });
//     });
// });
// update order status in delivery boy

$("#order_update").on("click", function () {
    var status = $('select[name="status"] option:selected').val();
    var order_id = $("#order_id").val();
    var route = $(this).data("route");
    console.log(route);
    // return;
    $.ajax({
        type: "GET",
        url: route,
        data: {
            status: status,
            order_id: order_id,
        },
        dataType: "JSON",
        success: function (response) {
            if (response.status == "success") {
                iziToast.success({
                    message: response.message,
                    position: "topRight",
                });
            } else {
                iziToast.error({
                    message: "Error in Updating Order",
                    position: "topRight",
                });
            }

            window.location.reload();
        },
    });
});

// status filter
var status_filter = "";
$("#status_select").on("change", function () {
    status_filter = $(this).find("option:selected").val();
});
var payment_status_filter = "";
$("#payment_status_filter").on("change", function () {
    payment_status_filter = $(this).val();
});
var order_type_filter = "";
$("#order_type_filter").on("change", function () {
    order_type_filter = $(this).val();
});

function orders_query(p) {
    return {
        status_filter: status_filter,
        payment_status_filter: payment_status_filter,
        order_type_filter: order_type_filter,
    };
}
$("#status_filter_button").on("click", function (e) {
    $("#table").bootstrapTable("refresh");
});
