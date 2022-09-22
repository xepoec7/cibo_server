$(document).ready(function () {
    getData(1);
});

$('.menu-link').click(function(e) {
    e.preventDefault();
    var cat_id = $(this).attr('href');
    $('.menu-link.active').removeClass('active');
    $(this).addClass('active');
    getData(cat_id);
});

function getData(cat_id) {
    $.ajax({
        dataType: "json",
        url: "/api/products/by_category/" + cat_id,
        success: function(result) {
            $('.menu-body').fadeOut("slow");
            $('.menu-body').empty();
            $(".menu-body").fadeIn("slow");
            for(item of result) {
                drawMenuBody(item);
            }
        }
    });
}

function drawMenuBody(item) {
    $(".menu-body").append(
        '<div class="col-12 col-sm-12 col-md-12 col-lg-6">' +
        '<div class="card bg-dark">' +
        '<div class="row g-0">' +
        '<div class="col-8">' +
        '<div class="card-body">' +
        '<h5 class="card-title">'+ item.name +'</h5>' +
        '<p class="card-text">' + item.ingredient + '</p>' +
        '</div></div>' +
        '<div class="col-4">' +
        '<div class="card-body float-end">' +
        '<p class="card-price">' + item.price + ' €</p>' +
        '</div></div></div></div></div>'
    );
}