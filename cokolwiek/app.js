$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8000/book/"
    }).done(function(result) {
        setBooks(result);
    });

    function setBooks(result) {
        for (var i = 0; i < result.length; i++) {
            $(".booksList")
            .append("<li><span class='title' data-id='" + result[i].id + "'>" + result[i].title + "</span><div class='details'></div></li>");
        };

        $(".title").click(function(event) {
            if ($(this).next().css("display") === "none") {
                $(this).next().css("display", "block");
            } else {
                $(this).next().css("display", "none");
            }
        });
    }

});



