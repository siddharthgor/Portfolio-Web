"use strict";

$(document).on("submit", "#register_form", function (e) {
    e.preventDefault();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var mobile = $("#mobile").val();
    var formData = new FormData(this);
    formData.append("_token", $('meta[name="csrf-token"]').attr("content")); // add the CSRF token

    $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,

        beforeSend: function () {
            $("#save-register-result-btn").html("Please Wait..");
            $("#save-register-result-btn").attr("disabled", true);
        },
        success: function (result) {
            if (result.error == false) {
                iziToast.success({
                    message: result.message,
                    position: "topRight",
                });
                $("#register_form")[0].reset();
            } else {
                result.message.forEach((message) => {
                    iziToast.error({
                        message: message,
                        position: "topRight",
                    });
                });
            }
            $("#save-register-result-btn")
                .html("Register")
                .attr("disabled", false);
        },
    });
});

$(document).ready(function () {
    $(".select_pos_user").select2();
    // $(".transaction_id").hide();
    $(".payment_method_name").hide();
    display_cart();
    display_combo_cart();
});

$(".payment_method").on("click", function () {
    var payment_method = $(this).val();
    var exclude_txn_id = ["COD"];
    var include_payment_method_name = ["other"];

    // if (exclude_txn_id.includes(payment_method)) {
    //     $(".transaction_id").hide();
    // } else {
    //     $(".transaction_id").show();
    // }

    if (include_payment_method_name.includes(payment_method)) {
        // alert("here");
        $(".payment_method_name").show();
        // $(".transaction_id").show();
    } else {
        $(".payment_method_name").hide();
    }
});

var pos_user_id = 0;
$("#select_user_id").on("change", function () {
    pos_user_id = $("#select_user_id").val();
    // alert(pos_user_id);
});

var combo_user_id = 0;
$("#combo_user_id").on("change", function () {
    combo_user_id = $("#combo_user_id").val();
    // alert(combo_user_id);
});

$(document).ready(function () {
    $(".select_pos_user").select2({
        ajax: {
            url: "/partner/pos/get_users",
            type: "GET",
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    search: params.term, // search term
                };
            },
            processResults: function (response) {
                return {
                    results: response,
                };
            },
            cache: true,
        },
        minimumInputLength: 1,
        placeholder: "Search for user",
    });
});

// clear selected values in select2

$(".clear_user_search").on("click", function () {
    $(".select_pos_user").empty();
});

$(document).ready(function () {
    var category_id = $("#product_categories").val();
    var limit = $("#limit").val();
    var offset = $("#offset").val();
    get_products(category_id, limit, offset);
    get_combo_products(category_id, limit, offset);
});

$("#product_categories").on("change", function () {
    var category_id = $("#product_categories").val();
    var limit = $("#limit").val();
    $("#current_page").val("0");
    get_products(category_id, limit, 0);
});

function paginate(total, current_page, limit) {
    var number_of_pages = total / limit;
    var i = 0;
    var pagination = `<div class="row p-2">
    <div class="col-12">
        <div class="d-flex justify-content-center">
            <ul class="pagination mb-0">`;
    pagination += `<li class="page-item"><a class="page-link" href="javascript:prev_page()" >Previous</a></li>`;
    var active = "";
    while (i < number_of_pages) {
        active = current_page == i ? "active" : "";
        pagination += `<li class="page-item ${active}"><a class="page-link" href="javascript:go_to_page(${limit},${i})" >${++i}</a></li>`;
    }
    pagination += `<li class="page-item"><a class="page-link" href="javascript:next_page()">Next</a></li>
                </ul>
            </div>
        </div>
    </div>`;
    $(".pagination-container").html(pagination);
}

function get_products(
    category_id = "",
    limit = 2,
    offset = 0,
    search_parameter = ""
) {
    $.ajax({
        type: "GET",
        url: `/partner/pos/get_products?category_id=${category_id}&limit=${limit}&offset=${offset}&search=${search_parameter}`,
        dataType: "json",
        beforeSend: function () {
            $("#get_products").html(
                `<div class="text-center" style='min-height:450px;' ><h4>Please wait.. . loading products..</h4></div>`
            );
        },
        success: function (data) {
            if (data.error == "false") {
                $("#total_products").val(data.products.total);
                $("#get_products").empty();
                display_products(data.products);
                var total = $("#total_products").val();
                var current_page = $("#current_page").val();
                var limit = $("#limit").val();
                var search_parameter = $("#search_products").val();
                paginate(total, current_page, limit, search_parameter);
            } else {
                $("#get_products").html(data.message);
                $("#get_products").empty();
            }
        },
    });
}

function get_combo_products(
    category_id = "",
    limit = 2,
    offset = 0,
    search_parameter = ""
) {
    $.ajax({
        type: "GET",
        url: `/partner/pos/get_combo_products?category_id=${category_id}&limit=${limit}&offset=${offset}&search=${search_parameter}`,
        dataType: "json",
        beforeSend: function () {
            $("#get_combo_products").html(
                `<div class="text-center" style='min-height:450px;' ><h4>Please wait.. . loading products..</h4></div>`
            );
        },
        success: function (data) {
            if (data.error == "false") {
                $("#total_combo_products").val(data.combo_data.total);
                $("#get_combo_products").empty();
                display_combo_data(data.combo_data);
                var total = $("#total_combo_products").val();
                var current_page = $("#combo_product_current_page").val();
                var limit = $("#combo_products_limit").val();
                var search_parameter = $("#search_products").val();
                paginate(total, current_page, limit, search_parameter);
            } else {
                $("#get_combo_products").html(data.message);
                $("#get_combo_products").empty();
            }
        },
    });
}

$("#search_products").on("keyup", function (e) {
    e.preventDefault();
    var search = $(this).val();
    get_products("", 25, 0, search);
});

$("#search_combo_products").on("keyup", function (e) {
    e.preventDefault();
    var search = $(this).val();
    get_combo_products("", 25, 0, search);
});

var prod_id = "";

function display_products(products = "") {
    var display_products = "";
    //   var modal = "";
    var i;
    var j;
    var k;
    var product_id;
    var products = products.product;

    if (products !== null && products.length > 0) {
        for (i = 0; i < products.length; i++) {
            display_products +=
                '<div class="text-center col-lg-4">' +
                '<div class="shop-item m-3">' +
                '<span class="d-none shop-item-id">' +
                " <b>" +
                products[i].id +
                "</b>" +
                " </span>" +
                '<span class="shop-item-title ">' +
                products[i].name +
                " </span>" +
                '<div class="shop-item-image d-flex justify-content-center align-item-center">' +
                '  <img class="item-image" src="' +
                window.location.origin +
                "/storage/" +
                products[i].image +
                '" />' +
                "</div>" +
                '<span class="d-none shop-item-partner-id">' +
                products[i].partner_id +
                "</span>" +
                '<select class="form-control mt-4 product-variants variant_value" id="change">';
            var total_price = document.getElementById("cart-total-price");
            prod_id = products[i].partner_id;
            var currency = "";
            if ($("#cart-total-price").length) {
                currency = total_price.getAttribute("data-currency");
            }
            var variants = products[i]["variants"];
            for (j = 0; j < variants.length; j++) {
                var variant_values = variants[j]["variant_values"]
                    ? variants[j]["variant_values"] + " - "
                    : "";

                var variant_price =
                    variants[j]["special_price"] > 0
                        ? variants[j]["special_price"]
                        : variants[j]["price"];
                display_products +=
                    '<option data-variant_values="' +
                    variants[j]["variant_values"] +
                    '" data-price="' +
                    variants[j]["price"] +
                    '" data-special_price="' +
                    variants[j]["special_price"] +
                    '" data-variant_id="' +
                    variants[j]["id"] +
                    '" value="' +
                    variant_price +
                    " " +
                    '" class="shop-item-price" > ' +
                    variant_values +
                    currency +
                    " " +
                    parseFloat(variant_price).toLocaleString() +
                    "</option > ";
            }
            display_products +=
                "</select></div>" +
                ' <div class ="shop-item-details justify-content-center">' +
                // ' <button class ="btn btn-xs btn-info shop-item-button p-2" onclick="add_to_cart(event)" type ="button">Add to Cart</button>' +
                '<button class ="btn btn-xs btn-info shop-item-button p-2 modal-trigger" data-bs-toggle="modal" data-id="' +
                products[i].id +
                '"onclick="add_items(event)" type ="button" data-bs-target="#add_to_cart_model">Add to Cart</button>' +
                "</div>";
            display_products += "</div>" + "</div>" + "</div>";
        }
        $("#get_products").append(display_products);
    } else {
        $("#get_products").html(
            `<div class="text-center" style='min-height:450px;' ><h4> No products available...</h4></div>`
        );
    }
}

function display_combo_data(data = "", groupName = "") {
    var display_combo_data = "";
    var i;
    var j;
    var k;
    var product_id;
    var data = data;
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            // console.log(data);
            var productsJson = JSON.stringify(data[i].products);
            // console.log(data[i]);
            // Check if the current group name matches the desired group name
            display_combo_data +=
                '<div class="text-center col-lg-4">' +
                '<div class="shop-item m-3">' +
                '<span class="d-none shop-item-id">' +
                " <b>" +
                data[i].id +
                "</b>" +
                " </span>" +
                '<span class="shop-item-title ">' +
                data[i].title +
                " </span>" +
                '<div class="shop-item-image d-flex justify-content-center align-item-center">' +
                '  <img class="item-image" src="' +
                window.location.origin +
                "/storage/combo_products/" +
                data[i].image +
                '" />' +
                "</div>" +
                '<span class="d-none shop-item-partner-id">' +
                data[i].partner_id +
                "</span>" +
                '<span class="d-none combo_price">' +
                data[i].price +
                "</span>" +
                '<input type="hidden" class="products-data" value=\'' +
                productsJson +
                "'>" +
                '<div class="shop-item-details justify-content-center">' +
                '<button class="btn btn-primary btn-show-combo-modal btn-sm mt-4" data-bs-toggle="modal" data-id="' +
                data[i].id +
                '" onclick="add_combo_item(event)" data-bs-target="#combo_modal">Show Products</button>' +
                "</div>" +
                "</div>" +
                "</div>";
        }
        $("#get_combo_products").append(display_combo_data);
    } else {
        $("#get_combo_products").html(
            `<div class="text-center" style='min-height:450px;' ><h4> No products available...</h4></div>`
        );
    }
}

$(".btn-show-combo-modal").click(function () {
    $("#combo_modal").modal("show");
});

var add_ons_items = [];
$(document).on("click", ".modal-trigger", function () {
    add_ons_items = [];
    var id = "";
    id = $(this).data("id");
    $("#product_id").val(id);

    $.ajax({
        type: "GET",
        url: `/partner/pos/add_ons_list?product_id=${id}`,
        dataType: "json",

        success: function (data) {
            $("#add_ons_check").empty();
            $("#addon").empty();

            add_ons_items = [];
            var currency = $(".cart-total-price").attr("data-currency");
            var products = "";
            var i;
            if (data.error == false) {
                var product_add_ons = data.add_ons;

                document.getElementById("addon").innerHTML =
                    product_add_ons.length > 0 ? "AddOn" : "";

                for (i = 0; i < product_add_ons.length; i++) {
                    var add_ons = "";
                    var add_ons_price = "";
                    var add_ons_id = "";
                    var calories = "";
                    var description = "";
                    var status = "";

                    add_ons = `${product_add_ons[i].title}`;
                    add_ons_price = `${product_add_ons[i].price}`;
                    add_ons_id = `${product_add_ons[i].id}`;
                    calories = `${product_add_ons[i].calories}`;
                    description = `${product_add_ons[i].description}`;
                    status = `${product_add_ons[i].status}`;

                    document.getElementById("add_ons_check").innerHTML +=
                        '<div class="form-check p-1" id="add_on">' +
                        '<input class="btn-check addon-chek" type="checkbox" id="' +
                        add_ons_id +
                        '" onchange="" name="add_on" data-price="' +
                        add_ons_price +
                        '" data-calories="' +
                        calories +
                        '" data-description="' +
                        description +
                        '" data-status="' +
                        status +
                        '" data-add_ons_id="' +
                        add_ons_id +
                        '" data-title="' +
                        add_ons +
                        '" value = "' +
                        add_ons +
                        " " +
                        currency +
                        add_ons_price +
                        '" autocomplete="off">' +
                        '<label class="d-flex align-items-center btn btn-sm check-label addon-input mb-0 h-100 break-all" for="' +
                        add_ons_id +
                        '">' +
                        add_ons +
                        "<br>" +
                        add_ons_price +
                        "</label></div>";
                }
            }
        },
    });
});

var cart_item = [];
function add_items(e) {
    $("#product_detail").empty();
    //   var cart_item = [];

    var button = e.target;
    var shopItem = button.parentElement.parentElement;

    var variant_dropdown = shopItem.children[0].children[4];

    var display_price = variant_dropdown.value;
    var product_id =
        shopItem.getElementsByClassName("shop-item-id")[0].innerText;
    var variant_id =
        variant_dropdown.options[variant_dropdown.selectedIndex].dataset
            .variant_id;
    var partner_id = shopItem.getElementsByClassName("shop-item-partner-id")[0]
        .innerText;
    var product_data = shopItem.getElementsByClassName("combo-product-data");
    // console.log(product_data);
    var variant_values =
        variant_dropdown.options[variant_dropdown.selectedIndex].dataset
            .variant_values;

    var special_price =
        variant_dropdown.options[variant_dropdown.selectedIndex].dataset
            .special_price;
    var price =
        variant_dropdown.options[variant_dropdown.selectedIndex].dataset.price;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;

    var image = shopItem.getElementsByClassName("item-image")[0].src;
    var currency = $(".cart-total-price").attr("data-currency");

    document.getElementById("product_detail").innerHTML =
        '<div class="d-flex align-items-center justify-content-center active">' +
        '<img class="img-responsive rounded" width="160" src="' +
        image +
        '" data-zoom="" alt="Product image">' +
        '<div class="cz-image-zoom-pane"></div>' +
        "</div>" +
        '<div class="details p-4">' +
        '<div class="break-all">' +
        '<p class="d-block mb-2 product-title text-sm-right">' +
        title +
        "</p>" +
        "</div>" +
        '<div class="mb-2 text-dark d-flex align-items-baseline gap-2">' +
        '<h4 class="font-weight-normal text-accent mb-0 text-end">' +
        currency +
        display_price +
        "</h4>" +
        "</div>" +
        "</div>";

    cart_item = {
        product_id: product_id,
        partner_id: partner_id,
        variant_id: variant_id,
        title: title,
        variant: variant_values,
        image: image,
        display_price: display_price,
        quantity: 1,
        special_price: special_price,
        price: price,
    };

    add_ons_items = [];
    $("#add_ons_check").empty();
}
//  old

// function add_combo_item(e) {
//     $("#combo_data_detail").empty();
//     $("#combo_id").val(e.target.dataset.id);
//     var button = e.target;
//     var shopItem = button.parentElement.parentElement;

//     var partner_id = shopItem.getElementsByClassName("shop-item-partner-id")[0]
//         .innerText;
//     var combo_item_id =
//         shopItem.getElementsByClassName("shop-item-id")[0].innerText;
//     var display_price = shopItem
//         .getElementsByClassName("combo_price")[0]
//         .innerText.trim();
//     var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
//     var currency = $(".cart-total-price").attr("data-currency");
//     var image = shopItem.getElementsByClassName("item-image")[0].src;
//     var productsData = JSON.parse($(shopItem).find(".products-data").val());

//     document.getElementById("combo_data_detail").innerHTML =
//         '<div class="row">' +
//         '<div class="col-md-4">' +
//         '<div class="d-flex align-items-center justify-content-start active">' +
//         '<img class="img-responsive rounded" width="160" src="' +
//         image +
//         '" data-zoom="" alt="Product image">' +
//         '<div class="cz-image-zoom-pane"></div>' +
//         "</div>" +
//         "</div>" +
//         '<div class="col-md-8">' +
//         '<div class="details p-4">' +
//         '<div class="d-flex align-items-baseline gap-2">' +
//         '<div class="flex-grow-1">' +
//         '<p class="d-block mb-2 product-title">' +
//         title +
//         "</p>" +
//         '<h3 class="font-weight-normal text-accent mb-0">' +
//         currency +
//         display_price +
//         "</h3>" +
//         "</div>" +
//         "</div>" +
//         "</div>" +
//         "</div>" +
//         "</div>";

//     var productContainer = '<div class="product-container d-flex flex-wrap">';
//     var groupedProducts = {};
//     var selectedProducts = {};

//     for (var i = 0; i < productsData.length; i++) {
//         var product = productsData[i];
//         var group = product.group_name;
//         var groupType = product.group_type;

//         if (!groupedProducts[group]) {
//             groupedProducts[group] = [];
//         }

//         groupedProducts[group].push(product);
//     }

//     var groupNames = Object.keys(groupedProducts);
//     var numGroups = groupNames.length;

//     productContainer += '<div class="col-md-12">';

//     for (var i = 0; i < numGroups; i++) {
//         var group = groupNames[i];
//         var groupProducts = groupedProducts[group];

//         productContainer += "<h4>" + group + "</h4>";

//         for (var j = 0; j < groupProducts.length; j++) {
//             var product = groupProducts[j];
//             // console.log(product);
//             var product_id = product.id;
//             var productName = product.name;
//             var productImage = product.image;
//             var productPrice = product.variants[0].special_price;

//             if (j % 4 === 0) {
//                 productContainer += '<div class="row mb-4">';
//             }

//             productContainer += '<div class="col-md-3">';
//             // console.log(product.group_name);
//             var card =
//                 '<label for="' +
//                 group +
//                 "-" +
//                 product_id +
//                 '">' +
//                 '<div class="card mt-2' +
//                 (selectedProducts[productName]
//                     ? "selected bg-dark text-white"
//                     : "") +
//                 '" data-product-id="' + // Added the data-product-id attribute with product_id value
//                 product_id +
//                 '">' +
//                 '<div class="d-flex justify-content-center justify-content-start active">' +
//                 '<img class="img-responsive rounded combo-product-image" src="' +
//                 window.location.origin +
//                 "/storage/" +
//                 productImage +
//                 '" data-zoom="" alt="Product image">' +
//                 '<div class="cz-image-zoom-pane"></div>' +
//                 "</div>" +
//                 '<div class="card-body text-center">' +
//                 '<h5 class="card-title text-info">' +
//                 productName +
//                 "</h5>" +
//                 '<input type="radio" id="' +
//                 group +
//                 "-" +
//                 product_id +
//                 '" name="starter[]">' +
//                 "</div>" +
//                 "</div>" +
//                 "</label>";
//             productContainer += card;
//             productContainer += "</div>";

//             if (j % 4 === 3 || j === groupProducts.length - 1) {
//                 productContainer += "</div>";
//             }
//         }
//     }

//     productContainer += "</div>";
//     productContainer += "</div>";

//     $("#combo_data_detail").append(productContainer);

//     $("#combo_data_detail").on("click", ".card", function () {
//         var productName = $(this).find(".card-title").text();
//         var productId = $(this).attr("data-product-id");

//         if (groupType === 1) {
//             for (var key in selectedProducts) {
//                 if (
//                     selectedProducts.hasOwnProperty(key) &&
//                     groupedProducts[group].includes(selectedProducts[key])
//                 ) {
//                     delete selectedProducts[key];
//                 }
//             }
//         }

//         if (selectedProducts[productName]) {
//             delete selectedProducts[productName];
//             $(this).removeClass("selected bg-dark text-white");
//         } else {
//             selectedProducts[productName] = {
//                 product_id: productId,
//                 name: productName,
//                 // Rest of the properties...
//             };
//             $(this).addClass("selected bg-dark text-white");
//         }
//     });

//     $(".add_combo_button").one("click", function () {
//         var selectedCard = $(".card.selected");
//         if (selectedCard.length > 0) {
//             var combo_item_id = $("#combo_id").val();

//             var combo_items =
//                 JSON.parse(localStorage.getItem("combo_product_cart")) || [];

//             var existingItemIndex = combo_items.findIndex(function (item) {
//                 return item.id === combo_item_id.trim();
//             });

//             if (existingItemIndex > -1) {
//                 iziToast.error({
//                     message: ["Combo item is already added to cart"],
//                     position: "topRight",
//                 });
//                 $("#combo_modal").modal("hide");
//                 return false;
//             }

//             var productName = selectedCard.find(".card-title").text();
//             var title = $(".product-title").text();
//             var image = shopItem.getElementsByClassName("item-image")[0].src;
//             var comboPrice = display_price;
//             var selectedProductsString = productName;

//             var selected_product_names =
//                 Object.keys(selectedProducts).join(", ");
//             var selected_product_ids = Object.values(selectedProducts)
//                 .map(function (product) {
//                     return product.product_id;
//                 })
//                 .join(", ");

//             var combo_item = {
//                 id: combo_item_id.trim(),
//                 title: title,
//                 price: comboPrice,
//                 image: image,
//                 selectedProducts: selected_product_names,
//                 selectedProductIds: selected_product_ids,
//                 quantity: 1,
//             };

//             combo_items.push(combo_item);

//             localStorage.setItem(
//                 "combo_product_cart",
//                 JSON.stringify(combo_items)
//             );

//             iziToast.success({
//                 message: ["Combo item added to cart"],
//                 position: "topRight",
//             });

//             var currentURL = window.location.href;
//             if (currentURL.includes("dine_in")) {
//                 set_cart(combo_items, "combo_products");
//             }
//             display_combo_cart();
//             $("#combo_modal").modal("hide");
//         }
//     });
// }

// working selections

function add_combo_item(e) {
    $("#combo_data_detail").empty();
    $("#combo_id").val(e.target.dataset.id);
    var button = e.target;
    var shopItem = button.parentElement.parentElement;

    var partner_id = shopItem.getElementsByClassName("shop-item-partner-id")[0]
        .innerText;
    var combo_item_id =
        shopItem.getElementsByClassName("shop-item-id")[0].innerText;
    var display_price = shopItem
        .getElementsByClassName("combo_price")[0]
        .innerText.trim();
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var currency = $(".cart-total-price").attr("data-currency");
    var image = shopItem.getElementsByClassName("item-image")[0].src;
    var productsData = JSON.parse($(shopItem).find(".products-data").val());

    document.getElementById("combo_data_detail").innerHTML =
        '<div class="row col-md-12">' +
        "<div>" +
        '<div class="d-flex align-items-center justify-content-start active">' +
        '<div class="mb-2 row"><div class="col-md-3 align-items-center d-flex justify-content-center justify-content-start"><div class=""><img class="img-responsive rounded" width="100%" src="' +
        image +
        '" data-zoom="" alt="Product image"></div></div>' +
        '<div class="col-md-4"><div class="details p-2"><div class="d-flex align-items-baseline gap-2"><div class="flex-grow-1"><p class="d-block mb-2 product-title">' +
        title +
        "</p>" +
        '<h4 class="font-weight-normal text-accent mb-0">' +
        currency +
        display_price +
        "</h4>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

    var productContainer = '<div class="product-container d-flex flex-wrap">';
    var groupedProducts = {};
    var groupedtype = {};
    var selectedProducts = {};

    for (var i = 0; i < productsData.length; i++) {
        var product = productsData[i];
        // console.log(product);
        var group = product.group_name;
        var groupType = product.group_type;

        if (!groupedProducts[group]) {
            groupedProducts[group] = [];
        }

        if (!groupedtype[groupType]) {
            groupedtype[group] = [];
        }

        groupedProducts[group].push(product);
        groupedtype[group].push(groupType);
    }
    // console.log(groupedProducts);
    // console.log(groupedtype);
    var groupNames = Object.keys(groupedProducts);
    var numGroups = groupNames.length;

    productContainer += '<div class="col-md-12">';

    for (var i = 0; i < numGroups; i++) {
        var group = groupNames[i];
        var groupProducts = groupedProducts[group];

        productContainer += "<h4>" + group + "</h4>";

        for (var j = 0; j < groupProducts.length; j++) {
            var product = groupProducts[j];
            // console.log(product);
            var product_id = product.id;
            var productName = product.name;
            var productImage = product.image;
            var productPrice = product.variants[0].special_price;

            if (j % 4 === 0) {
                productContainer += '<div class="row mb-4">';
            }

            productContainer += '<div class="col-md-3">';
            // console.log(product.group_name);
            var card =
                '<label for="' +
                group +
                "-" +
                product_id +
                '">' +
                '<div class="card mt-2' +
                (selectedProducts[productName] ? "selected text-white" : "") +
                '" data-product-id="' +
                product_id +
                '">' +
                '<div class="d-flex justify-content-center justify-content-start active">' +
                '<img class="img-responsive rounded combo-product-image" src="' +
                window.location.origin +
                "/storage/" +
                productImage +
                '" data-zoom="" alt="Product image">' +
                '<div class="cz-image-zoom-pane"></div>' +
                "</div>" +
                '<div class="card-body text-center">' +
                '<h5 class="card-title text-info">' +
                productName +
                "</h5>" +
                // console.log(groupType);
                '<input type="' +
                (product.group_type === "1" ? "radio" : "checkbox") +
                '" id="' +
                group +
                "-" +
                product_id +
                '" name="' +
                group +
                '[]">' +
                '<input type="hidden" class="product_group_type" value = ' +
                product.group_type +
                " >" +
                "</div>" +
                "</div>" +
                "</label>";

            productContainer += card;
            productContainer += "</div>";

            if (j % 4 === 3 || j === groupProducts.length - 1) {
                productContainer += "</div>";
            }
        }
    }

    productContainer += "</div>";
    productContainer += "</div>";

    $("#combo_data_detail").append(productContainer);

    $("#combo_data_detail").on("click", ".card", function (e) {
        var label = $(this).closest("label");
        var checkbox = label.find("input[type='checkbox']");
        var radio = label.find("input[type='radio']");

        checkbox.prop("checked", !checkbox.prop("checked")).trigger("change");
        radio.prop("checked", !radio.prop("checked")).trigger("change");

        var productName = $(this).find(".card-title").text();
        var productId = $(this).attr("data-product-id");
        var group_type = $(this).find(".product_group_type").val();

        if (group_type === "1") {
            var groupId = radio.attr("id").split("-")[0];

            var selectedRadio = $("input[name='" + groupId + "']:checked");
            if (selectedRadio.length > 0) {
                var selectedProductName = selectedRadio
                    .closest(".card")
                    .find(".card-title")
                    .text();
                delete selectedProducts[selectedProductName];
                selectedRadio
                    .prop("checked", false)
                    .closest(".card")
                    .removeClass("selected text-white");
            }
        } else if (group_type === "2") {
            var groupId = checkbox.attr("id").split("-")[0];

            var selectedCheckbox = $("input[name='" + groupId + "']:checked");
            if (selectedCheckbox.length > 0) {
                var selectedProductName = selectedCheckbox
                    .closest(".card")
                    .find(".card-title")
                    .text();
                delete selectedProducts[selectedProductName];
                selectedCheckbox
                    .prop("checked", false)
                    .closest(".card")
                    .removeClass("selected text-white");
            }
        }

        if ($(this).hasClass("selected")) {
            delete selectedProducts[productName];
            $(this).removeClass("selected text-white");
            checkbox.prop("checked", false);
            radio.prop("checked", false);
        } else {
            selectedProducts[productName] = {
                product_id: productId,
                name: productName,
                // Rest of the properties...
            };
            $(this).addClass("selected text-white");
            checkbox.prop("checked", true);
            radio.prop("checked", true);
        }
    });

    $(".add_combo_button").one("click", function () {
        // alert("Are you sure you want to add these items?");
        var selectedCard = $(".card.selected");
        // console.log(selectedCard);
        if (selectedCard.length > 0) {
            var combo_item_id = $("#combo_id").val();

            var combo_items =
                JSON.parse(localStorage.getItem("combo_product_cart")) || [];

            var existingItemIndex = combo_items.findIndex(function (item) {
                return item.id === combo_item_id;
            });

            if (existingItemIndex > -1) {
                iziToast.error({
                    message: ["Combo item is already added to cart"],
                    position: "topRight",
                });
                $("#combo_modal").modal("hide");
                return false;
            }

            var productName = selectedCard.find(".card-title").text();
            var title = $(".product-title").text();
            var image = shopItem.getElementsByClassName("item-image")[0].src;
            var comboPrice = display_price;
            var selectedProductsString = productName;

            var selected_product_names =
                Object.keys(selectedProducts).join(", ");
            // console.log(selected_product_names);
            var selected_product_ids = Object.values(selectedProducts)
                .map(function (product) {
                    return product.product_id;
                })
                .join(", ");

            var combo_item = {
                id: combo_item_id,
                title: title,
                price: comboPrice,
                image: image,
                selectedProducts: selected_product_names,
                selectedProductIds: selected_product_ids,
                quantity: 1,
            };
            // console.log(combo_item);
            combo_items.push(combo_item);

            localStorage.setItem(
                "combo_product_cart",
                JSON.stringify(combo_items)
            );

            iziToast.success({
                message: ["Combo item added to cart"],
                position: "topRight",
            });

            var currentURL = window.location.href;
            if (currentURL.includes("dine_in")) {
                set_cart(combo_items, "combo_products");
            }
            display_combo_cart();
            $("#combo_modal").modal("hide");
        }
    });
}
function display_combo_cart() {
    var combo_items =
        JSON.parse(localStorage.getItem("combo_product_cart")) || [];
    // console.log(combo_items);
    // return;
    // Clear the existing cart items before displaying the updated items
    $(".combo-cart-items").empty();

    combo_items.forEach(function (combo_item) {
        var id = combo_item.id;

        // Check if the item with the same ID is already displayed in the cart
        if ($(".cart-row[data-id='" + id + "']").length > 0) {
            return; // Skip adding the duplicate item
        }

        var title = combo_item.title;
        var image = combo_item.image;
        var price = combo_item.price;
        var selectedProductNames = combo_item.selectedProducts;
        var quantity = combo_item.quantity;

        var cartItem =
            '<div class="row cart-row mb-2" data-id="' +
            id +
            '">' +
            '<div class="col-md-2">' +
            '<img class="img-fluid cart-image" src="' +
            image +
            '" alt="Product image">' +
            "</div>" +
            '<div class="col-md-4">' +
            '<p class="cart-item-title text-info">' +
            title +
            "</p>" +
            '<p class="cart-item-products">' +
            selectedProductNames +
            "</p>" +
            "</div>" +
            '<div class="col-md-2">' +
            '<p class="cart-item-price">' +
            price +
            "</p>" +
            "</div>" +
            '<div class="col-md-2">' +
            '<div class="quantity d-flex">' +
            '<button type="button" class="combo_cart-quantity-input btn btn-xs btn-secondary" data-operation="plus">+</button>' +
            '<input type="text" min="1" class="combo_cart-quantity-input-new form-control text-center p-0" value=' +
            quantity +
            ">" +
            '<button type="button" min="1" class="combo_cart-quantity-input btn btn-xs btn-secondary" data-operation="minus">-</button>' +
            "</div>" +
            "</div>" +
            '<div class="col-md-1 px-4">' +
            '<button class="btn btn-sm btn-danger remove-combo-cart-item"  data-id=' +
            id +
            '><i class="fas fa-trash"></i></button>' +
            "</div>" +
            "</div>";

        $(".combo-cart-items").append(cartItem);
    });

    var currency = $("#combo-cart-total-price").data("currency");
    var totalPrice = calculate_combo_total(combo_items, currency);
    $("#combo-cart-total-price").text(totalPrice);
    update_combo_cart_quantity();
}

$(document).on("click", ".remove-combo-cart-item", function (e) {
    e.preventDefault();
    iziToast.error({
        message: ["Product removed from cart"],
        position: "topRight",
    });
    var id = $(this).data("id");
    $(this).parent().parent().remove();
    var combo_product_cart = localStorage.getItem("combo_product_cart");
    combo_product_cart =
        localStorage.getItem("combo_product_cart") !== null
            ? JSON.parse(combo_product_cart)
            : null;
    if (combo_product_cart) {
        var new_cart = combo_product_cart.filter(function (item) {
            return item.id != id;
        });
        localStorage.setItem("combo_product_cart", JSON.stringify(new_cart));
        display_combo_cart();
        $.ajax({
            type: "POST",
            url: "/partner/dine_in/delete_combo_from_cart", // Corrected route URL
            data: {
                _token: $('meta[name="csrf-token"]').attr("content"),
                item: JSON.stringify(combo_product_cart),
                table_id: $("#table-dropdown").val(),
                floor_id: $("#floor_dropdown").val(),
            },
            dataType: "json", // Corrected dataType to "json"
            success: function (response) { },
        });
        console.log(combo_product_cart);
        return;
    }
});

$(".combo_delivery_charge").on("keyup", function () {
    var combo_items =
        JSON.parse(localStorage.getItem("combo_product_cart")) || [];
    var currency = $("#combo-cart-total-price").data("currency");
    var combo_total_price = calculate_combo_total(combo_items, currency);
    $("#combo-cart-total-price").text(combo_total_price);
});

// Event listener for discount input field
$(".combo_discount").on("keyup", function () {
    var combo_items =
        JSON.parse(localStorage.getItem("combo_product_cart")) || [];
    var currency = $("#combo-cart-total-price").data("currency");
    var combo_total_price = calculate_combo_total(combo_items, currency);
    $("#combo-cart-total-price").text(combo_total_price);
});

function update_combo_cart_quantity() {
    $(".combo-cart-items")
        .off("click", ".combo_cart-quantity-input")
        .on("click", ".combo_cart-quantity-input", function () {
            var operation = $(this).data("operation");
            var inputElement = $(this).siblings(
                ".combo_cart-quantity-input-new"
            );
            var quantity = parseInt(inputElement.val());

            if (operation === "plus") {
                quantity = quantity + 1; // Increase quantity by 1
            } else if (operation === "minus" && quantity > 1) {
                quantity = quantity - 1; // Decrease quantity by 1
            }

            inputElement.val(quantity);

            // Update the quantity in the local storage
            var cartIndex = $(this).closest(".cart-row").index();
            var combo_items =
                JSON.parse(localStorage.getItem("combo_product_cart")) || [];

            if (cartIndex >= 0 && cartIndex < combo_items.length) {
                combo_items[cartIndex].quantity = quantity;
                localStorage.setItem(
                    "combo_product_cart",
                    JSON.stringify(combo_items)
                );
            }

            // Calculate total price and update the display
            var currency = $("#combo-cart-total-price").data("currency");
            var combo_total_price = calculate_combo_total(
                combo_items,
                currency
            );
            $("#combo-cart-total-price").text(combo_total_price);
        });
}

function calculate_combo_total(combo_items, currency) {
    var deliveryCharge = $(".combo_delivery_charge").val();
    var discount = $(".combo_discount").val();

    // console.log(deliveryCharge);
    // console.log(discount);

    var final_total = 0;

    if (Array.isArray(combo_items)) {
        combo_items.forEach(function (combo_item) {
            var price = parseFloat(combo_item.price);
            var quantity = parseInt(combo_item.quantity);
            final_total += price * quantity;
        });
    }

    if (deliveryCharge != 0 && deliveryCharge != null) {
        final_total = parseFloat(final_total) + parseFloat(deliveryCharge);
    }
    // console.log(final_total);
    if (discount != 0 && discount != null) {
        final_total = parseFloat(final_total) - parseFloat(discount);
    }
    $(".combo_total_price").val(final_total);
    return currency + final_total; // Format the total price with currency symbol and 2 decimal places
}

$(document).on("click", ".btn-clear_combo_cart", function (e) {
    e.preventDefault();
    delete_combo_cart_items();
});

function delete_combo_cart_items() {
    localStorage.removeItem("combo_product_cart");
    display_combo_cart();
}

$("#add_add_ons_button").on("click", function () {
    if ($(this).attr("data-type")) {
        var type = $(this).data("type");
    } else {
        var type = "pos";
    }

    add_to_cart(cart_item, type);
});

function add_to_cart(cart_item, type = "pos") {
    var display_price = cart_item.display_price;
    var product_id = cart_item.product_id;
    var partner_id = cart_item.partner_id;
    var variant_id = cart_item.variant_id;
    var title = cart_item.title;
    var variant = cart_item.variant;
    var image = cart_item.image;
    var display_price = cart_item.display_price;
    var quantity = 1;
    var special_price = cart_item.special_price;
    var price = cart_item.price;

    var grid = document.getElementById("add_ons_check");
    var checkBoxes = grid.getElementsByTagName("INPUT");
    var add_ons = [];
    var add_ons_price = [];
    var add_ons_calories = [];
    var add_ons_description = [];
    var add_ons_status = [];
    var add_ons_title = [];
    var add_ons_id = [];
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            add_ons.push(checkBoxes[i].value);
            add_ons_price.push(checkBoxes[i].dataset.price);
            add_ons_calories.push(checkBoxes[i].dataset.calories);
            add_ons_description.push(checkBoxes[i].dataset.description);
            add_ons_status.push(checkBoxes[i].dataset.status);
            add_ons_title.push(checkBoxes[i].dataset.title);
            add_ons_id.push(checkBoxes[i].dataset.add_ons_id);
        }
    }
    // Check if the variable is defined before calling the trim method

    if (typeof product_id !== "undefined") {
        var product_id = product_id.trim();
    }
    if (typeof partner_id !== "undefined") {
        var partner_id = partner_id.trim();
    }
    if (typeof display_price !== "undefined") {
        var display_price = display_price.trim();
    }

    var items = {
        product_id: product_id,
        partner_id: partner_id,
        variant_id: variant_id,
        title: title,
        variant: variant,
        image: image,
        display_price: display_price,
        quantity: 1,
        special_price: special_price,
        price: price,
        add_ons: add_ons,
        add_ons_price: add_ons_price,
        add_ons_calories: add_ons_calories,
        add_ons_description: add_ons_description,
        add_ons_status: add_ons_status,
        add_ons_title: add_ons_title,
        add_ons_id: add_ons_id,
    };

    var cart = localStorage.getItem("cart");

    cart = localStorage.getItem("cart") !== null ? JSON.parse(cart) : null;

    if (cart !== null && cart !== undefined) {
        if (cart.find((item) => item.variant_id === variant_id)) {
            alert("This item is already present in your cart");
            return;
        } else {
            iziToast.success({
                message: ["Product added to cart"],
                position: "topRight",
            });
            if (type == "dine_in") {
                set_cart(items, "products");
            }
        }
        cart.push(items);
    } else {
        cart = [items];
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    display_cart();
}

// $(document).on("click", ".cart-quantity-input", function (e) {
//     var operation = $(this).data("operation");
//     var variant_id = $(this).siblings().val();
//     var input =
//         operation == "plus" ? $(this).siblings()[1] : $(this).siblings()[2];
//     var qty = $(this)
//         .parent()
//         .siblings(".item-quantity")
//         .find(".cart-quantity-input")
//         .val();
//     var qty = parseInt(input.value, 10);
//     var data = (input.value = operation == "minus" ? qty - 1 : qty + 1);

//     update_quantity(data, variant_id);
// });

// debounce in quantity
$(document).on(
    "click",
    ".cart-quantity-input",
    $.debounce(500, function (e) {
        var operation = $(this).data("operation");
        var variant_id = $(this).siblings().val();
        var input =
            operation == "plus" ? $(this).siblings()[1] : $(this).siblings()[2];
        var qty = $(this)
            .parent()
            .siblings(".item-quantity")
            .find(".cart-quantity-input")
            .val();
        var qty = parseInt(input.value, 10);
        var data = (input.value = operation == "minus" ? qty - 1 : qty + 1);

        update_quantity(data, variant_id);
    })
);

$(document).on("change", ".cart-quantity-input-new", function (e) {
    var variant_id = $(this).siblings().val();
    var quantity = $(this).val();
    var data = quantity;

    update_quantity(data, variant_id);
});

function update_quantity(data, variant_id) {
    if (isNaN(data) || data <= 0) {
        data = 1;
    }
    var cart = localStorage.getItem("cart");
    cart = localStorage.getItem("cart") !== null ? JSON.parse(cart) : null;
    if (cart) {
        var i = cart.map((i) => i.variant_id).indexOf(variant_id);
        cart[i].quantity = data;
        //    console.log(cart[i]);
        // return;
        var currentURL = window.location.href;
        if (currentURL.includes("dine_in")) {
            set_cart(cart[i], "products");
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        display_cart();
    }
}

function display_cart() {
    var cart = localStorage.getItem("cart");

    cart = localStorage.getItem("cart") !== null ? JSON.parse(cart) : null;

    var currency = $(".cart-total-price").attr("data-currency");
    var cartRowContents = "";
    var display_add_ons = "";

    if (cart !== null && cart.length > 0) {
        cart.forEach((item) => {
            if (item.modifier_texts && item.modifier_texts.length > 0) {
                // Append modifierTexts to the cartItemTitle
                // console.log(item.modifier_texts);
                var modifier = item.modifier_texts;
            } else {
                var modifier = "";
            }
            var currentUrl = window.location.href;
            var isDineIn = currentUrl.includes("dine_in");

            // Check the state of the toggle button
            var isToggleButtonOn = isDineIn ? true : false;

            // Generate the text based on the toggle button state
            if (item.is_printed == 1) {
                //is_printed == 1 means it is printed
                var color = "success";
                var title = "Printed";
                var checked = "checked";
            } else {
                var color = "warning";
                var title = "Not Printed";
                var checked = "";
            }
            // Toggle button HTML based on the condition
            var toggleButtonHtml = isDineIn
                ? `<br><small class="align-items-baseline d-flex gap-2 text-${color}" title='${title}'><i class="fa fa-print"></i><a class="form-switch change_print_status" data-id='${item.variant_id}' data-toggle-status='${item.is_printed}' data-url ="/partner/dine_in/is_printed/${item.variant_id}">
                    <input class="form-check-input " type="checkbox" role="switch" ${checked}  ></a></small>`
                : "";

            cartRowContents += `<div class="container mb-2">
                <div class="row">
                    <div class="col-md-6 d-flex">
                        <div class="cart-image">
                            <img class="mr-0 rounded" src="${item.image}">
                        </div>
                        <p class="cart-item-title m-2 mb-2">${item.title}<br>
                            <small class="text-info">${modifier}</small>
                            <button type="button" class="btn btn-xs btn-info edit_modifiers" data-variant_id="${item.variant_id
                }">
                                <i class="fas fa-edit"></i>
                            </button>
                            ${toggleButtonHtml}

                        </p>
                    </div>
                                      <div class="col-md-2">
                        <span class="cart-price">${currency +
                parseFloat(item.display_price).toLocaleString()
                }</span>
                    </div>
                    <div class="col-md-3">
                    <div class="input-group">
                        <input type="hidden" class="product-variant" name="variant_ids[]" type="number" value=${item.variant_id
                }>
                        <button type="button" class="cart-quantity-input btn btn-xs btn-secondary" data-operation="plus">+</button>
                            <input class="cart-quantity-input-new form-control text-center p-0" name="quantity[]"value="${item.quantity
                }">
                        <button type="button" class="cart-quantity-input btn btn-xs btn-secondary" data-operation="minus">-</button>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-sm btn-danger remove-cart-item"  data-variant_id=${item.variant_id
                }><i class="fas fa-trash"></i></button>
                <button class="btn btn-sm btn-info add_modifiers" data-variant_id = ${item.variant_id
                }><i class ="fas fa-edit"></i></button>
                    </div>
                </div>
            </div><div></div>`;
            var add_ons_items = item.add_ons;

            if (add_ons_items.length > 0) {
                cartRowContents += `<input type="hidden" class="add_ons_calories" name="add_ons_calories[]" value=${item.add_ons_calories}>
        <input type="hidden" class="add_ons_date_created" name="add_ons_date_created[]" value=${item.add_ons_date_created}>
        <input type="hidden" class="add_ons_description" name="add_ons_description[]" value=${item.add_ons_description}>
        <input type="hidden" class="add_ons_status" name="add_ons_status[]" value=${item.add_ons_status}>
        <input type="hidden" class="add_ons_title" name="add_ons_title[]" value=${item.add_ons_title}>
        <input type="hidden" class="display_price" name="display_price[]" value=${item.display_price}>
        <input type="hidden" class="add_ons_id" name="add_ons_id[]" value=${item.add_ons_id}>
        <small class="d-block"><strong><u>Addons: </u></strong>`;
                for (var j = 0; j < add_ons_items.length; j++) {
                    cartRowContents +=
                        `<div class="font-size-sm text-body">
                                    <span>` +
                        add_ons_items[j] +
                        `</span>
                                    <span class="font-weight-bold"></span>
                                </div>`;
                }
                cartRowContents += `</small><br>`;
            }
        });
    } else {
        cartRowContents += `
        <div class="container">
            <div class="row">
                <div class="col mt-4 d-flex justify-content-center text-primary h5">Your cart is empty</div>
            </div>
        </div>`;
    }
    $(".cart-items").html(cartRowContents);
    update_cart_total();
}

$(document).on("click", ".edit_modifiers", function (e) {
    // Rest of the code

    e.preventDefault();

    var variantId = $(this).data("variant_id");

    // Retrieve and process the cart items from localStorage
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(function (item) {
        if (item.variant_id == variantId) {
            $(".product_name").val(item.title + "-" + item.variant);
            $(".modifier_variant_id").val(item.variant_id);

            // Set modifiers value if it exists
            if (item.modifiers && item.modifiers.length > 0) {
                $(".search_modifiers").val(item.modifiers).trigger("change");
            }

            // Set notes value if it exists
            if (item.notes) {
                $(".modifier_notes").val(item.notes);
            }
        }
    });
    $(".search_modifiers").select2({
        dropdownParent: $(".add_product_modifiers"),
    });

    $(".add_product_modifiers").modal("show");
});

$(document).on("click", ".add_modifiers", function (e) {
    $(document).ready(function () {
        $(".search_modifiers").select2({
            dropdownParent: $(".add_product_modifiers"),
        });
    });
    e.preventDefault();
    var variant_id = $(this).data("variant_id");
    var cart = localStorage.getItem("cart");
    cart = JSON.parse(cart); // Assign the parsed value back to 'cart'
    cart.forEach((item) => {
        if (item.variant_id == variant_id) {
            $(".product_name").val(item.title + "-" + item.variant);
            $(".modifier_variant_id").val(item.variant_id);
        }
    });
    $(".add_product_modifiers").modal("toggle");
});

$(".add_modifier_button").on("click", function () {
    var variant_id = $(".modifier_variant_id").val();
    var cart = localStorage.getItem("cart");
    var modifierTexts = $(".modifiers option:selected")
        .map(function () {
            return $(this).text();
        })
        .get();
    cart = JSON.parse(cart); // Assign the parsed value back to 'cart'
    var modifiers = $(".modifiers").val();
    var notes = $(".modifier_notes").val();

    cart.forEach((item) => {
        if (item.variant_id == variant_id) {
            item.modifiers = modifiers;
            item.notes = notes;
            item.modifier_texts = modifierTexts;
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    var currentURL = window.location.href;
    if (currentURL.includes("dine_in")) {
        var data = {
            cart: cart,
            _token: $('input[name="_token"]').val(),
            table_id: $("#table-dropdown").val(),
            floor_id: $("#floor_dropdown").val(),
            variant_id: variant_id,
        };
        $.ajax({
            type: "POST",
            url: "/partner/dine_in/update_cart",
            data: data,
            dataType: "dataType",
            success: function (response) { },
        });
        // return;
    } else {
    }
    window.location.reload();
});

$(document).on("click", ".remove-cart-item", function (e) {
    e.preventDefault();
    iziToast.error({
        message: ["Product removed from cart"],
        position: "topRight",
    });
    var variant_id = $(this).data("variant_id");
    $(this).parent().parent().remove();
    var cart = localStorage.getItem("cart");
    cart = localStorage.getItem("cart") !== null ? JSON.parse(cart) : null;
    if (cart) {
        var new_cart = cart.filter(function (item) {
            return item.variant_id != variant_id;
        });
        localStorage.setItem("cart", JSON.stringify(new_cart));
        display_cart();
    }
    $.ajax({
        type: "POST",
        url: "/partner/dine_in/delete_from_cart",
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
            variant_id: variant_id,
            table_id: $("#table-dropdown").val(),
            floor_id: $("#floor_dropdown").val(),
        },
        dataType: "dataType",
        success: function (response) { },
    });
});

function get_cart_total() {
    var cart = localStorage.getItem("cart");
    var cart = cart !== null && cart !== undefined ? JSON.parse(cart) : null;

    var cart_total = 0;
    if (cart !== null && cart !== undefined) {
        cart_total = cart.reduce(
            (cart_total, item) =>
                cart_total +
                parseFloat(item.display_price) * parseFloat(item.quantity),
            0
        );
    }
    var currency = $("#cart-total-price").attr("data-currency");
    var total = {
        currency: currency,
        cart_total: cart_total,
        cart_total_formated: parseFloat(cart_total).toLocaleString(),
    };
    return total;
}

function update_cart_total() {
    var cart = localStorage.getItem("cart");
    var cart = cart !== null && cart !== undefined ? JSON.parse(cart) : null;
    var sum = 0;
    var test = [];
    var qty = 0;
    if (cart !== null && cart !== undefined) {
        cart.forEach((item) => {
            test = item.add_ons_price;
            qty = item.quantity;
            for (let i = 0; i < test.length; i++) {
                sum += test[i] << 0;
            }
        });
    }
    var total = get_cart_total();
    const add_ons = parseFloat(sum) * parseFloat(qty);
    const add_ons_total =
        parseFloat(total.cart_total_formated) + parseFloat(add_ons);

    $("#cart-total-price").html(total.currency + "" + add_ons_total);
    return;
}

function show_message(prefix = "Great!", message, type = "success") {
    Swal.fire(prefix, message, type);
}

$("#pos_form").on("submit", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to check out?")) {
        var cart = localStorage.getItem("cart");

        if (cart == null || !cart) {
            var message = "Please add items to the cart";
            show_message("Oops!", message, "error");
            return;
        }

        // Collect payment details
        var payment_methods = [];
        var amounts = [];
        var transaction_ids = [];

        $("#payment_method_container")
            .find(".payment_method option:selected")
            .each(function () {
                payment_methods.push($(this).val());
            });

        $(".amount").each(function () {
            amounts.push($(this).val());
        });

        $(".transaction_id").each(function () {
            var transaction_id = $(this).val();
            transaction_ids.push(transaction_id ? transaction_id : "-");
        });

        // Validate payment details
        if (payment_methods.length === 0) {
            var message = "Please choose at least one payment method";
            show_message("Oops!", message, "error");
            return;
        }

        for (var i = 0; i < payment_methods.length; i++) {
            if (!amounts[i]) {
                var message = "Please enter the amount for all payment methods";
                show_message("Oops!", message, "error");
                return;
            }

            if (payment_methods[i] !== "COD" && !transaction_ids[i]) {
                var message =
                    "Please enter the transaction ID for non-COD payment methods";
                show_message("Oops!", message, "error");
                return;
            }
        }

        var delivery_charge = $("#delivery_charge_service").val() || 0;
        var discount = $("#discount_service").val() || 0;

        const orderTypeRadios = document.getElementsByName("order_type");
        let selectedOrderType = "";
        for (const radio of orderTypeRadios) {
            if (radio.checked) {
                selectedOrderType = radio.value;
                break;
            }
        }

        const request_body = {
            _token: $('meta[name="csrf-token"]').attr("content"),
            data: cart,
            payment_methods: payment_methods,
            amounts: amounts,
            transaction_ids: transaction_ids,
            user_id: pos_user_id,
            order_type: selectedOrderType,
            discount: discount,
            delivery_charge: delivery_charge,
            table_id: $("#table_id").val(),
            payment_status: $(".payment_status").val(),
            delivery_boy_id: $(".delivery_boy_id").val(),
        };

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: request_body,
            dataType: "json",
            success: function (result) {
                "_token", $('meta[name="csrf-token"]').attr("content"); // add the CSRF token
                if (result.error == true) {
                    iziToast.error({
                        message: "<span>" + result.message + "</span> ",
                        position: "topRight",
                    });
                } else {
                    iziToast.success({
                        message:
                            '<span style="text-transform:capitalize">' +
                            result.message +
                            "</span> ",
                        position: "topRight",
                    });
                    delete_cart_items();
                    setTimeout(function () {
                        location.reload();
                    }, 600);
                }
            },
        });
    }
});

$("#combo_product_form").on("submit", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to check out?")) {
        var combo_product_cart = localStorage.getItem("combo_product_cart");

        if (combo_product_cart == null || !combo_product_cart) {
            var message = "Please add items to the cart";
            show_message("Oops!", message, "error");
            return;
        }

        // Collect payment details
        var payment_methods = [];
        var amounts = [];
        var transaction_ids = [];

        $("#combo_payment_method_container")
            .find(".payment_method option:selected")
            .each(function () {
                payment_methods.push($(this).val());
            });
        $(".amount").each(function () {
            amounts.push($(this).val());
        });

        $(".transaction_id").each(function () {
            var transaction_id = $(this).val();
            transaction_ids.push(transaction_id ? transaction_id : "-");
        });

        // Validate payment details
        if (payment_methods.length === 0) {
            var message = "Please choose at least one payment method";
            show_message("Oops!", message, "error");
            return;
        }

        // if i choose cod and try to check out this error occurs

        // for (var i = 0; i < payment_methods.length; i++) {
        //     if (!amounts[i]) {
        //         var message = "Please enter the amount for all payment methods";
        //         show_message("Oops!", message, "error");
        //         return;
        //     }

        //     if (payment_methods[i] !== "COD" && !transaction_ids[i]) {
        //         var message =
        //             "Please enter the transaction ID for non-COD payment methods";
        //         show_message("Oops!", message, "error");
        //         return;
        //     }
        // }

        var delivery_charge = $(".combo_delivery_charge").val() || 0;
        var discount = $(".combo_discount").val() || 0;
        var final_total = $(".combo_total_price").val() || 0;
        console.log(final_total);

        const orderTypeRadios = document.getElementsByName("combo_order_type");
        let selectedOrderType = "";
        for (const radio of orderTypeRadios) {
            if (radio.checked) {
                selectedOrderType = radio.value;
                break;
            }
        }

        const request_body = {
            _token: $('meta[name="csrf-token"]').attr("content"),
            data: combo_product_cart,
            payment_methods: payment_methods,
            amounts: amounts,
            transaction_ids: transaction_ids,
            user_id: combo_user_id,
            order_type: selectedOrderType,
            discount: discount,
            delivery_charge: delivery_charge,
            final_total: final_total,
            table_id: $("#table_id").val(),
            payment_status: $(".payment_status").val(),
            delivery_boy_id: $(".delivery_boy_id").val(),
        };
        // console.log(request_body);
        // return;

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: request_body,
            dataType: "json",
            success: function (result) {
                "_token", $('meta[name="csrf-token"]').attr("content"); // add the CSRF token
                if (result.error == true) {
                    iziToast.error({
                        message: "<span>" + result.message + "</span> ",
                        position: "topRight",
                    });
                } else {
                    iziToast.success({
                        message:
                            '<span style="text-transform:capitalize">' +
                            result.message +
                            "</span> ",
                        position: "topRight",
                    });
                    delete_combo_cart_items();
                    setTimeout(function () {
                        location.reload();
                    }, 600);
                }
            },
        });
    }
});

$(document).on("keyup", ".discount_service", function (e) {
    update_final_cart_total();
    return;
});
$(document).on("keyup", ".delivery_charge_service", function (e) {
    update_final_cart_total();
    return;
});

$(document).on("click", ".btn-clear_cart", function (e) {
    e.preventDefault();
    delete_cart_items();
});

function delete_cart_items() {
    localStorage.removeItem("cart");
    display_cart();
}

function delete_combo_cart_items() {
    localStorage.removeItem("combo_product_cart");
    display_combo_cart();
}

function update_final_cart_total() {
    var cart = get_cart_total();
    var sub_total = cart.cart_total;
    var delivery_charges = $(".delivery_charge_service").val();
    var discount = $("#discount_service").val();
    var final_total = sub_total;
    var currency = $("#cart-total-price").attr("data-currency");

    if (delivery_charges != 0 && delivery_charges != null) {
        final_total = parseFloat(final_total) + parseFloat(delivery_charges);
    }

    if (discount != 0 && discount != null) {
        final_total = parseFloat(final_total) - parseFloat(discount);
    }

    var res = {
        currency: currency,
        total: final_total,
        cart_total: parseFloat(final_total).toLocaleString(),
    };
    $("#cart-total-price").html(
        final_total.currency + "" + final_total.cart_total_formated
    );
    $("#cart-total-price").html(res.currency + "" + res.cart_total);
    return;
}

/// Fetch Cart Details for Dine In page
$("#table-dropdown").on("change", function () {
    if (window.location.pathname === "/partner/dine_in") {
        fetchCartDetails();
    }
});

function fetchCartDetails() {
    $(document).ready(function () {
        var table_id = $("#table-dropdown").val();
        var floor_id = $("#floor_dropdown").val();
        $(".cart-items").empty();
        $(".combo-cart-items").empty();
        // Make an AJAX request to fetch cart details based on selected table and floor
        $.ajax({
            url:
                "/partner/dine_in/fetchCartDetails/" +
                floor_id +
                "/" +
                table_id,
            type: "GET",
            dataType: "json",
            success: function (response) {
                // Clear previous cart items from local storage
                localStorage.removeItem("combo_product_cart");
                localStorage.removeItem("cart");
                if (response.carts.length > 0) {
                    var cart = response.carts;
                    // Separate the cart items into regular products and combo products
                    var regularProducts = [];
                    var comboProductCart = [];
                    for (var i = 0; i < cart.length; i++) {
                        var cartItems = JSON.parse(cart[i].items);
                        var isPrinted = JSON.parse(cart[i].isPrinted);
                        cartItems.is_printed = isPrinted;
                        if (cart[i].product_type === "products") {
                            regularProducts.push(cartItems);
                        } else if (cart[i].product_type === "combo_products") {
                            var comboProductItem = JSON.parse(cart[i].items);
                            comboProductItem[0].quantity = parseInt(
                                comboProductItem[0].quantity
                            ); // Convert quantity to a number
                            comboProductCart.push(comboProductItem[0]);
                        }
                    }
                    // Store the regular products and combo products in local storage
                    localStorage.setItem(
                        "cart",
                        JSON.stringify(regularProducts)
                    );
                    localStorage.setItem(
                        "combo_product_cart",
                        JSON.stringify(comboProductCart)
                    );
                    // Call the display functions to show the cart items in the UI
                    display_cart();
                    display_combo_cart();
                } else {
                    // Handle the case when no cart items are available
                    console.log("No cart items found.");
                }
            },
            error: function (xhr, status, error) {
                // Handle the AJAX error
                console.log("AJAX request error:", error);
            },
        });
    });
}

function set_cart(items, type = "products") {
    if (type === "products") {
        var id = items.variant_id;
    } else {
        var id = items[0].id;
    }
    var floorID = $("#floor_dropdown").val();
    var tableID = $("#table-dropdown").val();
    var locationID = $("#location_id").val();
    const orderTypeRadios = document.getElementsByName("order_type");
    let selectedOrderType = "";
    for (const radio of orderTypeRadios) {
        if (radio.checked) {
            selectedOrderType = radio.value;
            break;
        }
    }
    const request_body = {
        _token: $('meta[name="csrf-token"]').attr("content"),
        data: items,
        locationID: locationID,
        user_id: pos_user_id,
        order_type: selectedOrderType,
        floorID: floorID,
        tableID: tableID,
        product_variant_id: id,
        type: type,
    };
    $.ajax({
        type: "POST",
        url: "/partner/dine_in",
        data: request_body,
        dataType: "json",
        success: function (result) { },
    });
}

$("#product_tab").on("click", function () {
    if (localStorage.getItem("cart")) {
    } else {
        $(".cart-items").empty();
    }
    // fetchCartDetails();
});
$("#combo_product_tab").on("click", function () {
    if (localStorage.getItem("combo_product_cart")) {
    } else {
        $(".combo-cart-items").empty();
    }
    // fetchCartDetails();
});
