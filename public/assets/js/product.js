"use strict";

var from = "admin";
if (window.location.href.indexOf("partner/") > -1) {
    from = "partner";
}

iziToast.settings({
    position: "topRight",
});

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

//-------------
//- CATEGORY EISE PRODUCT SALE CHART -
//-------------
// Get context with jQuery - using jQuery's .get() method.

var url = window.location.origin + window.location.pathname;
var $selector = $('.sidebar a[href="' + url + '"]');
$($selector).addClass("active");
$($selector).closest("ul").closest("li").addClass("menu-open");
$($selector).closest("ul").removeAttr("style");
$($selector).closest("ul").closest("li").find('a[href*="#"').addClass("active");

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

// function save_attributes() {
//     attributes_values = [];
//     all_attributes_values = [];
//     var tmp = $(".product-attr-selectbox");
//     $.each(tmp, function (index) {
//         var data = $(tmp[index])
//             .closest(".row")
//             .find(".multiple_values")
//             .select2("data");
//         var tmp_values = [];
//         for (var i = 0; i < data.length; i++) {
//             if (!$.isEmptyObject(data[i])) {
//                 tmp_values[i] = data[i].id;
//             }
//         }
//         if (!$.isEmptyObject(data)) {
//             all_attributes_values.push(tmp_values);
//         }
//         if ($(tmp[index]).find(".is_attribute_checked").is(":checked")) {
//             if (!$.isEmptyObject(data)) {
//                 attributes_values.push(tmp_values);
//             }
//         }
//     });
// }

// function create_variants(preproccessed_permutation_result = false, from) {
//     var html = "";
//     var is_appendable = false;
//     var permutated_attribute_value = [];
//     if (preproccessed_permutation_result != false) {
//         var response = preproccessed_permutation_result;
//         is_appendable = true;
//     } else {
//         var response = getPermutation(attributes_values);
//     }
//     var selected_variant_ids = JSON.stringify(response);
//     var selected_attributes_values = JSON.stringify(attributes_values);

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
//             $.each(result, function (a, b) {
//                 variant_counter++;
//                 var attr_name = "pro_attr_" + variant_counter;
//                 html +=
//                     '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-variant-selectbox"><div class="col-1 text-center my-auto"><i class="fas fa-sort"></i></div>';
//                 var tmp_variant_value_id = " ";
//                 $.each(b, function (key, value) {
//                     tmp_variant_value_id =
//                         tmp_variant_value_id + " " + value.id;
//                     html +=
//                         '<div class="col-2"> <input type="text" class="col form-control" value="' +
//                         value.value +
//                         '" readonly></div>';
//                 });
//                 html +=
//                     '<input type="hidden" name="variants_ids[]" value="' +
//                     tmp_variant_value_id +
//                     '"><div class="col my-auto row justify-content-center"> <a data-bs-toggle="collapse" class="btn btn-tool text-primary" data-bs-target="#' +
//                     attr_name +
//                     '" aria-expanded="true"><i class="fas fa-angle-down fa-2x"></i> </a> <button type="button" class="btn btn-tool remove_variants"> <i class="text-danger far fa-times-circle fa-2x "></i> </button></div><div class="col-12" id="variant_stock_management_html"><div id=' +
//                     attr_name +
//                     ' style="" class="collapse">';

//                 html +=
//                     '<div class="form-group row"><div class="col col-xs-12"><label class="control-label">Price :</label><input type="number" name="variant_price[]" class="col form-control price varaint-must-fill-field" min="0" step="0.01"></div><div class="col col-xs-12"><label class="control-label">Special Price :</label><input type="number" name="variant_special_price[]" class="col form-control discounted_price" min="0" step="0.01"></div>';

//                 html += "</div></div></div></div></div>";
//             });

//             if (is_appendable == false) {
//                 $("#variants_process").html(html);
//             } else {
//                 $("#variants_process").append(html);
//             }
//             $("#variants_process").unblock();
//         },
//     });
// }

// function create_attributes(value, selected_attr) {
//     counter++;
//     var $attribute = $("#attributes_values_json_data").find(".select_single");
//     var $options = $($attribute).clone().html();
//     var $selected_attrs = [];
//     if (selected_attr) {
//         $.each(selected_attr.split(","), function () {
//             $selected_attrs.push($.trim(this));
//         });
//     }

//     var attr_name = "pro_attr_" + counter;

//     // product-attr-selectbox
//     if ($("#product-type").val() == "simple_product") {
//         var html =
//             '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-attr-selectbox" id=' +
//             attr_name +
//             '><div class="col-md-1 col-sm-12 text-center my-auto"><i class="fas fa-sort"></i></div><div class="col-md-4 col-sm-12"> <select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes"><option value=""></option>' +
//             $options +
//             '</select></div><div class="col-md-4 col-sm-12"> <select name="attribute_value_ids[]" class="multiple_values" multiple="" data-placeholder=" Type to search and select attributes values"><option value=""></option> </select></div><div class="col-md-2 col-sm-6 text-center py-1 align-self-center"> <button type="button" class="btn btn-tool remove_attributes"> <i class="text-danger far fa-times-circle fa-2x "></i> </button></div></div>';
//     } else {
//         $("#note").removeClass("d-none");
//         var html =
//             '<div class="form-group row move my-auto p-2 border rounded bg-gray-light product-attr-selectbox" id=' +
//             attr_name +
//             ">" +
//             '<div class="col-md-1 col-sm-12 text-center my-auto"><i class="fas fa-sort"></i></div><div class="col-md-4 col-sm-12">' +
//             '<select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes"><option value=""></option>' +
//             $options +
//             "</select></div>" +
//             '<div class="col-md-4 col-sm-12"> <select name="attribute_value_ids[]" class="multiple_values" multiple="" data-placeholder=" Type to search and select attributes values">' +
//             '<option value=""></option> </select></div><div class="col-md-2 col-sm-6 text-center py-1 align-self-center"><input type="checkbox" name="variations[]" class="is_attribute_checked custom-checkbox mt-2">' +
//             '</div><div class="col-md-1 col-sm-6 text-center py-1 align-self-center"> <button type="button" class="btn btn-tool remove_attributes"> <i class="text-danger far fa-times-circle fa-2x "></i> ' +
//             "</button></div></div>";
//     }
//     $("#attributes_process").append(html);
//     if (selected_attr) {
//         if ($.inArray(value.name, $selected_attrs) > -1) {
//             $("#attributes_process")
//                 .find(".product-attr-selectbox")
//                 .last()
//                 .find(".is_attribute_checked")
//                 .prop("checked", true)
//                 .addClass("custom-checkbox mt-2");
//             $("#attributes_process")
//                 .find(".product-attr-selectbox")
//                 .last()
//                 .find(".remove_attributes")
//                 .addClass("remove_edit_attribute")
//                 .removeClass("remove_attributes");
//         }
//     }
//     $("#attributes_process")
//         .find(".product-attr-selectbox")
//         .last()
//         .find(".attributes")
//         .select2({
//             theme: "bootstrap4",
//             width: $(this).data("width")
//                 ? $(this).data("width")
//                 : $(this).hasClass("w-100")
//                 ? "100%"
//                 : "style",
//             placeholder: $(this).data("placeholder"),
//             allowClear: Boolean($(this).data("allow-clear")),
//         })
//         .val(value.name);

//     $("#attributes_process")
//         .find(".product-attr-selectbox")
//         .last()
//         .find(".attributes")
//         .trigger("change");
//     $("#attributes_process")
//         .find(".product-attr-selectbox")
//         .last()
//         .find(".select_single")
//         .trigger("select2:select");

//     var multiple_values = [];
//     $.each(value.ids.split(","), function () {
//         multiple_values.push($.trim(this));
//     });

//     $("#attributes_process")
//         .find(".product-attr-selectbox")
//         .last()
//         .find(".multiple_values")
//         .select2({
//             theme: "bootstrap4",
//             width: $(this).data("width")
//                 ? $(this).data("width")
//                 : $(this).hasClass("w-100")
//                 ? "100%"
//                 : "style",
//             placeholder: $(this).data("placeholder"),
//             allowClear: Boolean($(this).data("allow-clear")),
//         })
//         .val(multiple_values);
//     $("#attributes_process")
//         .find(".product-attr-selectbox")
//         .last()
//         .find(".multiple_values")
//         .trigger("change");
// }

// function create_fetched_attributes_html(from) {
//     var edit_id = $('input[name="edit_product_id"]').val();
//     $.ajax({
//         type: "GET",
//         url: "/partner/products/fetch_attributes_by_id",
//         data: {
//             edit_id: edit_id,
//             _token: $('meta[name="csrf-token"]').attr("content"),
//         },
//         dataType: "json",
//         success: function (data) {
//             // _token = $('meta[name="csrf-token"]').attr("content");
//             var result = data["result"];

//             if (!$.isEmptyObject(result.attr_values)) {
//                 $.each(result.attr_values, function (key, value) {
//                     create_attributes(
//                         value,
//                         result.pre_selected_variants_names
//                     );
//                 });

//                 $.each(
//                     result["pre_selected_variants_ids"],
//                     function (key, val) {
//                         var tempArray = [];
//                         if (val.variant_ids) {
//                             $.each(val.variant_ids.split(","), function (k, v) {
//                                 tempArray.push($.trim(v));
//                             });
//                             pre_selected_attr_values[key] = tempArray;
//                         }
//                     }
//                 );

//                 if (result.pre_selected_variants_names) {
//                     $.each(
//                         result.pre_selected_variants_names.split(","),
//                         function (key, value) {
//                             pre_selected_attributes_name.push($.trim(value));
//                         }
//                     );
//                 }
//             } else {
//                 $(".no-attributes-added").show();
//                 $("#save_attributes").addClass("d-none");
//             }
//         },
//     });
//     return $.Deferred().resolve();
// }

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

    var catid = $("#product_category_tree_view_html").jstree("get_selected");
    var formData = new FormData(form);
    var submit_btn = $("#submit_btn");
    var btn_html = $("#submit_btn").html();
    var btn_val = $("#submit_btn").val();
    var button_text =
        btn_html != "" || btn_html != "undefined" ? btn_html : btn_val;
    save_attributes();
    formData.append(csrfName, csrfHash);

    formData.append("category_id", catid);
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
            csrfName = result["csrfName"];
            csrfHash = result["csrfHash"];

            if (result["error"] == true) {
                submit_btn.html(button_text);
                submit_btn.attr("disabled", false);
                iziToast.error({
                    message: result["message"],
                });
            } else {
                submit_btn.html(button_text);
                submit_btn.attr("disabled", false);
                iziToast.success({
                    message: result["message"],
                });
                setTimeout(function () {
                    location.reload();
                }, 600);
            }
        },
    });
}

function get_variants(edit_id, from) {
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

function create_fetched_variants_html(
    add_newly_created_variants = false,
    from
) {
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
                        get_variants(edit_id, from).done(function (data) {
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
                get_variants(edit_id, from).done(function (data) {
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
        get_variants(edit_id, from).done(function (data) {
            create_editable_variants(
                data.result,
                false,
                add_newly_created_variants
            );
        });
    }
}

// function create_editable_variants(
//     data,
//     newly_selected_attr = false,
//     add_newly_created_variants = false
// ) {
//     alert("here");
//     console.log(data);
//     if (data[0].variant_ids) {
//         $("#reset_variants").show();
//         var html = "";

//         if (
//             !$.isEmptyObject(attributes_values) &&
//             add_newly_created_variants == true
//         ) {
//             var permuted_value_result = getPermutation(attributes_values);
//         }

//         $.each(data, function (a, b) {
//             if (
//                 !$.isEmptyObject(permuted_value_result) &&
//                 add_newly_created_variants == true
//             ) {
//                 var permuted_value_result_temp = permuted_value_result;
//                 var varinat_ids = b.variant_ids.split(",");
//                 $.each(permuted_value_result_temp, function (index, value) {
//                     if (containsAll(varinat_ids, value)) {
//                         permuted_value_result.splice(index, 1);
//                     }
//                 });
//             }

//             variant_counter++;
//             var attr_name = "pro_attr_" + variant_counter;
//             html +=
//                 '<div class="form-group move row my-auto p-2 border rounded bg-gray-light product-variant-selectbox"><div class="col-1 text-center my-auto"><i class="fas fa-sort"></i></div>';
//             html +=
//                 '<input type="hidden" name="edit_variant_id[]" value=' +
//                 b.id +
//                 ">";
//             var tmp_variant_value_id = "";
//             var varaint_array = [];
//             var varaint_ids_temp_array = [];
//             var flag = 0;
//             var variant_images = "";
//             var image_html = "";
//             if (b.images) {
//                 variant_images = JSON.parse(b.images);
//             }

//             $.each(b.variant_ids.split(","), function (key) {
//                 varaint_ids_temp_array[key] = $.trim(this);
//             });

//             $.each(b.variant_values.split(","), function (key) {
//                 varaint_array[key] = $.trim(this);
//             });

//             if (variant_images) {
//                 $.each(variant_images, function (img_key, img_value) {
//                     image_html +=
//                         '<div class="col-md-3 col-sm-12 shadow bg-white rounded m-3 p-3 text-center grow"><div class="image-upload-div"><img src=' +
//                         base_url +
//                         img_value +
//                         ' alt="Image Not Found"></div> <a href="javascript:void(0)" class="delete-img m-3" data-id="' +
//                         b.id +
//                         '" data-field="images" data-img=' +
//                         img_value +
//                         ' data-table="product_variants" data-path="uploads/media/" data-isjson="true"> <span class="btn btn-block bg-gradient-danger btn-xs"><i class="far fa-trash-alt "></i> Delete</span></a> <input type="hidden" name="variant_images[' +
//                         a +
//                         '][]"  value=' +
//                         img_value +
//                         "></div>";
//                 });
//             }

//             for (var i = 0; i < varaint_array.length; i++) {
//                 html +=
//                     '<div class="col-2 variant_col"> <input type="hidden"  value="' +
//                     varaint_ids_temp_array[i] +
//                     '"><input type="text" class="col form-control" value="' +
//                     varaint_array[i] +
//                     '" readonly></div>';
//             }
//             if (
//                 newly_selected_attr != false &&
//                 newly_selected_attr.length > 0
//             ) {
//                 for (var i = 0; i < newly_selected_attr.length; i++) {
//                     var tempVariantsIds = [];
//                     var tempVariantsValues = [];
//                     $.each(
//                         newly_selected_attr[i].attribute_values_id.split(","),
//                         function () {
//                             tempVariantsIds.push($.trim(this));
//                         }
//                     );
//                     html +=
//                         '<div class="col-2"><select class="col new-added-variant form-control" ><option value="">Select Attribute</option>';
//                     $.each(
//                         newly_selected_attr[i].attribute_values.split(","),
//                         function (key) {
//                             tempVariantsValues.push($.trim(this));
//                             html +=
//                                 '<option value="' +
//                                 tempVariantsIds[key] +
//                                 '">' +
//                                 tempVariantsValues[key] +
//                                 "</option>";
//                         }
//                     );
//                     html += "</select></div>";
//                 }
//             }
//             html +=
//                 '<input type="hidden" name="variants_ids[]" value="' +
//                 b.attribute_value_ids +
//                 '"><div class="col my-auto row justify-content-center"> <a data-bs-toggle="collapse" class="btn btn-tool text-primary" data-bs-target="#' +
//                 attr_name +
//                 '" aria-expanded="true"><i class="fas fa-angle-down fa-2x"></i> </a> <button type="button" class="btn btn-tool remove_variants"> <i class="text-danger far fa-times-circle fa-2x "></i> </button></div><div class="col-12" id="variant_stock_management_html"><div id=' +
//                 attr_name +
//                 ' style="" class="collapse">';
//             console.log(b.price);
//             console.log(b.special_price);
//             if (
//                 $(".variant_stock_status").is(":checked") &&
//                 $(".variant-stock-level-type").val() == "variable_level"
//             ) {
//                 var selected = b.availability == "0" ? "selected" : " ";
//                 html +=
//                     '<div class="form-group row"><div class="col col-xs-12"><label class="control-label">Price :</label><input type="number" name="variant_price[]" class="col form-control price varaint-must-fill-field" value="' +
//                     b.price +
//                     '" min="0" step="0.01"></div><div class="col col-xs-12"><label class="control-label">Special Price :</label><input type="number" name="variant_special_price[]" class="col form-control main_discounted_price discounted_price" min="0" value="' +
//                     b.special_price +
//                     '" step="0.01"></div><div class="col col-xs-12"> <label class="control-label">Sku :</label> <input type="text" name="variant_sku[]" class="col form-control varaint-must-fill-field"  value="' +
//                     b.sku +
//                     '" ></div><div class="col col-xs-12"> <label class="control-label">Total Stock :</label> <input type="text" name="variant_total_stock[]" class="col form-control varaint-must-fill-field" value="' +
//                     b.stock +
//                     '"></div><div class="col col-xs-12"> <label class="control-label">Stock Status :</label> <select type="text" name="variant_level_stock_status[]" class="col form-control varaint-must-fill-field"><option value="1">In Stock</option><option value="0"  ' +
//                     selected +
//                     "  >Out Of Stock</option> </select></div></div>";
//             } else {
//                 html +=
//                     '<div class="form-group row"><div class="col col-xs-12"><label class="control-label">Price :</label><input type="number" name="variant_price[]" class="col form-control price varaint-must-fill-field" value="' +
//                     b.price +
//                     '" min="0" step="0.01"></div><div class="col col-xs-12"><label class="control-label">Special Price :</label><input type="number" name="variant_special_price[]" class="col form-control discounted_price"  min="0" value="' +
//                     b.special_price +
//                     '" step="0.01"></div></div>';
//             }
//             html +=
//                 '<div class="col-12 pt-3"><label class="control-label">Images :</label><div class="col-md-3"><a class="uploadFile img btn btn-primary text-white btn-sm"  data-input="variant_images[' +
//                 a +
//                 '][]" data-isremovable="1" data-is-multiple-uploads-allowed="1" data-bs-toggle="modal" data-bs-target="#media-upload-modal" value="Upload Photo"><i class="fa fa-upload"></i> Upload</a> </div><div class="container-fluid row image-upload-section"> ' +
//                 image_html +
//                 " </div></div>";
//             html += "</div></div></div>";

//             $("#edit_variants_process").html(html);
//         });

//         if (
//             !$.isEmptyObject(attributes_values) &&
//             add_newly_created_variants == true
//         ) {
//             create_variants(permuted_value_result, from);
//         }
//     }
// }

//2.Product-Module
var edit_product_id = $("input[name=edit_product_id]").val();

// if (edit_product_id) {
//     create_fetched_attributes_html(from).done(function () {
//         $(".no-attributes-added").hide();
//         $("#save_attributes").removeClass("d-none");
//         $(".no-variants-added").hide();
//         save_attributes();
//         create_fetched_variants_html(false, from);
//     });
// }

//form-submit-event
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
                                    "Atleast Add One Variation To Add The Product.",
                                    "warning"
                                );
                            }
                        }
                    } else {
                        iziToast.error({
                            message: "Please Fill All The Fields",
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
        });
    }

    if (counter > 0) {
        iziToast.error({
            message:
                "Please fill all the required fields in the variation tab !",
        });
    }
});

// multiple_values
$(".select_single , .multiple_values , #product-type").each(function () {
    $(this).select2({
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

$(document).on("select2:selecting", ".select_single", function (e) {
    if ($.inArray($(this).val(), attributes_values_selected) > -1) {
        //Remove value if further selected
        attributes_values_selected.splice(
            attributes_values_selected.indexOf(
                $(this).select2().find(":selected").val()
            ),
            1
        );
    }
});

$(document).on(
    "select2:selecting",
    ".select_single .variant_attributes",
    function (e) {
        if ($.inArray($(this).val(), variant_values_selected) > -1) {
            //Remove value if further selected
            variant_values_selected.splice(
                variant_values_selected.indexOf(
                    $(this).select2().find(":selected").val()
                ),
                1
            );
        }
    }
);

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
//             theme: "bootstrap4",
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
//             theme: "bootstrap4",
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

$(document).on("click", " #add_attributes , #tab-for-variations", function (e) {
    if (e.target.id == "add_attributes") {
        $(".no-attributes-added").hide();
        $("#save_attributes").removeClass("d-none");
        counter++;
        var $attribute = $("#attributes_values_json_data").find(
            ".select_single"
        );
        var $options = $($attribute).clone().html();
        var attr_name = "pro_attr_" + counter;
        // product-attr-selectbox
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
                '><div class="col-md-1 col-sm-12 text-center my-auto"><i class="fas fa-sort"></i></div><div class="col-md-4 col-sm-12"> <select name="attribute_id[]" class="attributes select_single" data-placeholder=" Type to search and select attributes"><option value=""></option>' +
                $options +
                '</select></div><div class="col-md-4 col-sm-12 "> <select name="attribute_value_ids[]" class="multiple_values" multiple="" data-placeholder=" Type to search and select attributes values"><option value=""></option> </select></div><div class="col-md-2 col-sm-6 text-center py-1 align-self-center"><input type="checkbox" name="variations[]" class="is_attribute_checked custom-checkbox "></div><div class="col-md-1 col-sm-6 text-center py-1 align-self-center "> <button type="button" class="btn btn-tool remove_attributes"> <i class="text-danger far fa-times-circle fa-2x "></i> </button></div></div>';
        }
        $("#attributes_process").append(html);

        $("#attributes_process")
            .last()
            .find(".attributes")
            .select2({
                // theme: "bootstrap4",
                width: $(this).data("width")
                    ? $(this).data("width")
                    : $(this).hasClass("w-100")
                    ? "100%"
                    : "style",
                placeholder: $(this).data("placeholder"),
                allowClear: Boolean($(this).data("allow-clear")),
            });

        // $("#attributes_process").last().find(".attributes").trigger('change');

        $("#attributes_process")
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
            });
    }

    if (e.target.id == "tab-for-variations") {
        $(".additional-info").block({
            message: "<h6>Loading Variations</h6>",
            css: { border: "3px solid #E7F3FE" },
        });
        if (attributes_values.length > 0) {
            $(".no-variants-added").hide();
            create_variants(false, from);
        }
        setTimeout(function () {
            $(".additional-info").unblock();
        }, 3000);
    }
});

$(document).on("click", "#reset_variants", function () {
    Swal.fire({
        title: "Are You Sure To Reset!",
        text: "You won't be able to revert this after update!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reset it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.value) {
            $(".additional-info").block({
                message: "<h6>Reseting Variations</h6>",
                css: { border: "3px solid #E7F3FE" },
            });
            if (attributes_values.length > 0) {
                $(".no-variants-added").hide();
                create_variants(false, from);
            }
            setTimeout(function () {
                $(".additional-info").unblock();
            }, 2000);
        }
    });
});

$(document).on("click", ".remove_edit_attribute", function (e) {
    $(this).closest(".row").remove();
});

$(document).on("click", ".remove_attributes , .remove_variants", function (e) {
    Swal.fire({
        title: "Are you sure want to delete!",
        text: "You won't be able to revert this after update!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
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
                    $("#save_attributes").addClass("d-none");
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

$(document).on("select2:select", "#product-type", function () {
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

$(document).on("change", ".simple_stock_management_status", function () {
    if ($(this).prop("checked") == true) {
        $(this).attr("checked", true);
        $(".simple-product-level-stock-management").show(200);
    } else {
        $(this).attr("checked", false);
        $(".simple-product-level-stock-management").hide(200);
        $(".simple-product-level-stock-management").find("input").val("");
    }
});

$(document).on("click", "#save_attributes", function () {
    Swal.fire({
        title: "Are you sure want to save changes!",
        text: "Do not save attributes if you made no changes! It will reset the variants if there are no changes in attributes or its values !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
    }).then((result) => {
        if (result.value) {
            attribute_flag = 1;
            save_attributes();
            create_fetched_variants_html(true, from);
            iziToast.success({
                message: "Attributes Saved Succesfully",
            });
        }
    });
});

$(document).on("click", ".reset-settings", function (e) {
    Swal.fire({
        title: "Are You Sure To Reset!",
        text: "This will reset all attributes && variants too if added.",
        type: "warning",
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
                ' <input type="hidden" name="reset_settings" value="1"><div class="row mt-4 col-md-12 "> <nav class="w-100"><div class="nav nav-tabs" id="product-tab" role="tablist"> <a class="nav-item nav-link active" id="tab-for-general-price" data-bs-toggle="tab" href="#general-settings" role="tab" aria-controls="general-price" aria-selected="true">General</a> <a class="nav-item nav-link disabled product-attributes" id="tab-for-attributes" data-bs-toggle="tab" href="#product-attributes" role="tab" aria-controls="product-attributes" aria-selected="false">Attributes</a> <a class="nav-item nav-link disabled product-variants d-none" id="tab-for-variations" data-bs-toggle="tab" href="#product-variants" role="tab" aria-controls="product-variants" aria-selected="false">Variations</a></div> </nav><div class="tab-content p-3 col-md-12" id="nav-tabContent"><div class="tab-pane fade active show" id="general-settings" role="tabpanel" aria-labelledby="general-settings-tab"><div class="form-group"> <label for="type" class="col-md-2">Type Of Product :</label><div class="col-md-12"> <input type="hidden" name="product_type"> <input type="hidden" name="simple_product_stock_status"> <input type="hidden" name="variant_stock_level_type"> <input type="hidden" name="variant_stock_status"> <select name="type" id="product-type" class="form-control product-type" data-placeholder=" Type to search and select type"><option value=" ">Select Type</option><option value="simple_product">Simple Product</option><option value="variable_product">Variable Product</option> </select></div></div><div id="product-general-settings"><div id="general_price_section" class="collapse"><div class="form-group"> <label for="type" class="col-md-2">Price:</label><div class="col-md-12"> <input type="number" name="simple_price" class="form-control stock-simple-mustfill-field price" min="0"></div></div><div class="form-group"> <label for="type" class="col-md-2">Special Price:</label><div class="col-md-12"> <input type="number" name="simple_special_price" class="form-control discounted_price" min="0"></div></div><div class="form-group"><div class="col"> <input type="checkbox" name="simple_stock_management_status" class="align-middle simple_stock_management_status"> <span class="align-middle">Enable Stock Management</span></div></div></div><div class="form-group simple-product-level-stock-management collapse"><div class="col col-xs-12"> <label class="control-label">SKU :</label> <input type="text" name="product_sku" class="col form-control simple-pro-sku"></div><div class="col col-xs-12"> <label class="control-label">Total Stock :</label> <input type="text" name="product_total_stock" class="col form-control stock-simple-mustfill-field"></div><div class="col col-xs-12"> <label class="control-label">Stock Status :</label> <select type="text" class="col form-control stock-simple-mustfill-field" id="simple_product_stock_status"><option value="1">In Stock</option><option value="0">Out Of Stock</option> </select></div></div><div class="form-group collapse simple-product-save"><div class="col"> <a href="javascript:void(0);" class="btn btn-primary save-settings">Save Settings</a></div></div></div><div id="variant_stock_level" class="collapse"><div class="form-group"><div class="col"> <input type="checkbox" name="variant_stock_management_status" class="align-middle variant_stock_status"> <span class="align-middle"> Enable Stock Management</span></div></div><div class="form-group collapse" id="stock_level"> <label for="type" class="col-md-2">Choose Stock Management Type:</label><div class="col-md-12"> <select id="stock_level_type" class="form-control variant-stock-level-type" data-placeholder=" Type to search and select type"><option value=" ">Select Stock Type</option><option value="product_level">Product Level ( Stock Will Be Managed Generally )</option><option value="variable_level">Variable Level ( Stock Will Be Managed Variant Wise )</option> </select><div class="form-group row variant-product-level-stock-management collapse"><div class="col col-xs-12"> <label class="control-label">SKU :</label> <input type="text" name="sku_variant_type" class="col form-control"></div><div class="col col-xs-12"> <label class="control-label">Total Stock :</label> <input type="text" name="total_stock_variant_type" class="col form-control variant-stock-mustfill-field"></div><div class="col col-xs-12"> <label class="control-label">Stock Status :</label> <select type="text" id="stock_status_variant_type" name="variant_status" class="col form-control variant-stock-mustfill-field"><option value="1">In Stock</option><option value="0">Out Of Stock</option> </select></div></div></div></div><div class="form-group"><div class="col"> <a href="javascript:void(0);" class="btn btn-primary save-variant-general-settings">Save Settings</a></div></div></div></div><div class="tab-pane fade" id="product-attributes" role="tabpanel" aria-labelledby="product-attributes-tab"><div class="info col-12 p-3 d-none" id="note"><div class=" col-12 d-flex align-center"> <strong>Note : </strong> <input type="checkbox" checked="checked" class="ml-3 my-auto custom-checkbox" disabled> <span class="ml-3">check if the attribute is to be used for variation </span></div></div><div class="col-md-12"> <a href="javascript:void(0);" id="add_attributes" class="btn btn-block btn-outline-primary col-md-2 float-right m-2 btn-sm">Add Attributes</a> <a href="javascript:void(0);" id="save_attributes" class="btn btn-block btn-outline-primary col-md-2 float-right m-2 btn-sm d-none">Save Attributes</a></div><div class="clearfix"></div><div id="attributes_process"><div class="form-group text-center row my-auto p-2 border rounded bg-gray-light col-md-12 no-attributes-added"><div class="col-md-12 text-center">No Product Attribures Are Added !</div></div></div></div><div class="tab-pane fade" id="product-variants" role="tabpanel" aria-labelledby="product-variants-tab"><div class="clearfix"></div><div class="form-group text-center row my-auto p-2 border rounded bg-gray-light col-md-12 no-variants-added"><div class="col-md-12 text-center">No Product Variations Are Added !</div></div><div id="variants_process" class="ui-sortable"></div></div></div></div>';
            $(".additional-info").html(html);
            $(".no-attributes-added").show();
            $("#product-type").each(function () {
                $(this).select2({
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
        $(".product-attributes").removeClass("disabled");
        $(".product-variants").removeClass("disabled");
        $(".simple_stock_management_status").prop("disabled", true);
        setTimeout(function () {
            $(".additional-info").unblock();
        }, 2000);
    } else {
        iziToast.error({
            message: "Please Fill All The Fields",
        });
    }
});

$(document).on("click", ".save-variant-general-settings", function (e) {
    e.preventDefault();
    if ($(".variant_stock_status").is(":checked")) {
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
                });
            } else {
                $('input[name="product_type"]').val($("#product-type").val());
                $('input[name="variant_stock_level_type"]').val(
                    $("#stock_level_type").val()
                );
                $('input[name="variant_stock_status"]').val("0");
                $("#product-type").prop("disabled", true);
                $("#stock_level_type").prop("disabled", true);
                $(this).removeClass("save-variant-general-settings");
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
            });
        }
    } else {
        $('input[name="product_type"]').val($("#product-type").val());
        $('input[name="variant_stock_status"]').val("");
        $('input[name="variant_stock_level_type"]').val("");
        $('#product-tab a[href="#product-attributes"]').tab("show");
        $(".variant_stock_status").prop("disabled", true);
        $("#product-type").prop("disabled", true);
        $(".product-attributes").removeClass("disabled");
        $(".product-variants").removeClass("disabled");
        $("#tab-for-variations").removeClass("d-none");
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

if ($("#attribute_values").length) {
    var attr_val_element = document.querySelector(
        "input[name=attribute_values]"
    );
    new Tagify(attr_val_element);
}

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
                '<span style="text-transform:capitalize">Please, enter Title for Add Ons!</span> ',
        });
        return false;
    }
    if (!price) {
        iziToast.error({
            message:
                '<span style="text-transform:capitalize">Please, enter Price for Add Ons!</span> ',
        });
        return false;
    }
    var is_exist = false;
    $.each(add_on_data, function (i, e) {
        if (e.title === title) {
            iziToast.error({
                message: `<span style="text-transform:capitalize">${title} is already in list!</span> `,
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
            message:
                '<span style="text-transform:capitalize">Add Ons Saved Successfully!</span> ',
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

$("#add_ons_table").on("check.bs.table", function (e, row) {
    $("#add_on_title").val(row.title);
    $("#add_on_description").val(row.description);
    $("#add_on_price").val(row.price);
    $("#add_on_calories").val(row.calories);
    $('input[name="add_on_id"]').val(row.id);
});

$(document).on("click", "#update_add_ons", function () {
    var add_on_id = $('input[name="add_on_id"]').val();
    var title = $("#add_on_title").val();
    var des = $("#add_on_description").val();
    var price = $("#add_on_price").val();
    var calories = $("#add_on_calories").val();
    var product_id = $(this).data("product_id");

    Swal.fire({
        title: "Are You Sure !",
        text: "You won't be able to revert this!",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: base_url + from + "/product/update_add_ons",
                    type: "POST",
                    data: {
                        add_on_id: add_on_id,
                        title: title,
                        product_id: product_id,
                        description: des,
                        price: price,
                        calories: calories,
                        [csrfName]: csrfHash,
                    },
                    dataType: "json",
                })
                    .done(function (response, textStatus) {
                        csrfName = response["csrfName"];
                        csrfHash = response["csrfHash"];
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
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Insert it!",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: base_url + from + "/product/update_add_ons",
                    type: "POST",
                    data: {
                        title: title,
                        product_id: product_id,
                        description: des,
                        price: price,
                        calories: calories,
                        [csrfName]: csrfHash,
                    },
                    dataType: "json",
                })
                    .done(function (response, textStatus) {
                        csrfName = response["csrfName"];
                        csrfHash = response["csrfHash"];
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

$(document).on("click", ".edit_attribute", function (e, rows) {
    e.preventDefault();
    var attribute_value_ids = $(this).data("attribute_value_ids");
    var attribute_values = $(this).data("attribute_values");
    $("#name").val($(this).data("name"));
    $('input[name="edit_attribute_id"]').val($(this).data("id"));
    $("#attribute_value").val(attribute_values);
    $('input[name="attribute_value_ids"]').val(attribute_value_ids);

    if (attribute_values.search(",") > 0) {
        var attribute_values = attribute_values.split(",");
        var attribute_value_ids = attribute_value_ids.split(",");
    } else {
        var attribute_values = [attribute_values];
        var attribute_value_ids = [attribute_value_ids];
    }
    if (attribute_values.length == attribute_value_ids.length) {
        $("#attribute_values_html").html("");
        show_attribute_values(attribute_values, attribute_value_ids);
    } else {
        iziToast.error({
            message:
                '<span style="text-transform:capitalize">Something went wrong!</span> ',
        });
    }
});

$(document).on("click", "#add_attribute_val", function (e) {
    e.preventDefault();
    show_attribute_values();
});

function show_attribute_values(
    attribute_values = [],
    attribute_value_ids = []
) {
    var html = "";

    if (attribute_values.length > 0) {
        $.each(attribute_values, function (key, val) {
            html += `<div class="form-group row">
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Values Name" name="value_name[]" value="${val}">
                            <input type="hidden" class="form-control" name="value_id[]" value="${attribute_value_ids[key]}">
                        </div>
                        <div class="col-sm-2">
                        <button type="button" class="btn btn-tool update_attribute_values_status " data-id="${attribute_value_ids[key]}" data-table="attribute_values" > <i class="text-danger far fa-times-circle fa-2x "></i> </button>
                        </div>
                    </div>`;
        });
    } else {
        html = `<div class="form-group row">
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="Values Name" name="value_name[]" value="">
                        <input type="hidden" class="form-control" name="value_id[]" value="">
                    </div>
                    <div class="col-sm-2">
                    <button type="button" class="btn btn-tool " > <i class="text-danger far fa-times-circle fa-2x "></i> </button>
                    </div>
                </div>`;
    }
    $("#attribute_values_html").append(html);
}

$(document).on("click", ".update_attribute_values_status", function () {
    var cat_id = $(this).data("id");
    $(this).closest(".row").remove();
    Swal.fire({
        title: "Are You Sure!",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "GET",
                    url:
                        base_url +
                        from +
                        "/attributes/update_attribute_values_status",
                    data: { id: cat_id },
                    dataType: "json",
                })
                    .done(function (response, textStatus) {
                        if (response.error == false) {
                            Swal.fire("Deleted!", response.message, "success");
                            $("table").bootstrapTable("refresh");
                            csrfName = response["csrfName"];
                            csrfHash = response["csrfHash"];
                        } else {
                            Swal.fire("Oops...", response.message, "warning");
                            $("table").bootstrapTable("refresh");
                            csrfName = response["csrfName"];
                            csrfHash = response["csrfHash"];
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        Swal.fire(
                            "Oops...",
                            "Something went wrong with ajax !",
                            "error"
                        );
                        csrfName = response["csrfName"];
                        csrfHash = response["csrfHash"];
                    });
            });
        },
        allowOutsideClick: false,
    });
});

$("#edit-attributes-form").on("submit", function (e) {
    e.preventDefault();
    var formdata = new FormData(this);
    formdata.append(csrfName, csrfHash);

    $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: formdata,
        beforeSend: function () {
            $("#edit_attribute_val")
                .html("Please Wait..")
                .attr("disabled", true);
        },
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (result) {
            csrfHash = result.csrfHash;
            $("#edit_attribute_val")
                .html("Update Attribute")
                .attr("disabled", false);
            $("table").bootstrapTable("refresh");
            if (result.error == false) {
                iziToast.success({
                    message:
                        '<span style="text-transform:capitalize">' +
                        result.message +
                        "</span> ",
                });
            } else {
                iziToast.error({
                    message: "<span>" + result.message + "</span> ",
                });
            }
        },
    });
});

$(document).on("change", "#add_on_snaps", function (e) {
    e.preventDefault();
    var price = $(this).find(":selected").data("price");
    var description = $(this).find(":selected").data("description");
    var calories = $(this).find(":selected").data("calories");
    $("#add_on_title").val(this.value);
    $("#add_on_description").val(description);
    $("#add_on_price").val(price);
    $("#add_on_calories").val(calories);
});
