$(document).ready(function() {

    function getBooks() {
        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/book/"
        }).done(function(result) {
            setBooks(result);
        });
    }

    getBooks();

    function setBooks(result) {
        $('.booksList').empty();

        for (var i = 0; i < result.length; i++) {
            $(".booksList")
            .append("<li><span class='title' data-id='" + result[i].id + "'>" + result[i].title + "</span><div class='details'></div><button class='btn btn-outline-danger' data-id='" + result[i].id + "'>Usuń</button></li>");
            var bookDetails = {
                author: result[i].author,
                isbn: result[i].isbn,
                publisher: result[i].publisher,
                genre: result[i].genre,
            }

            for (var property in bookDetails) {
                $(".booksList .details").eq(i).append("<p>" + property.toUpperCase() + ': ' + bookDetails[property] + "</p>");
            }

        };

        $(".title").click(function(event) {
            if ($(this).next().css("display") === "none") {
                $(this).next().css("display", "block");
            } else {
                $(this).next().css("display", "none");
            }
        });
        $('.btn btn-outline-danger').click(function (event) {
            console.log('cycki');
            deleteBook($(event.target).data("id")); // albo zamiast this event.target
        });

        $(".add-btn").click(function(event) {
            var inputs = $("form input");

            var newBook = {
                "author": $(inputs).eq(1).val(),
                "title": $(inputs).eq(0).val(),
                "isbn": Number($(inputs).eq(2).val()),
                "publisher": $(inputs).eq(3).val(),
                "genre": Number($(inputs).eq(4).val())
            }

            addBook(newBook);

        });
    }

    function addBook(book) {
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8000/book/",
            data: book,
            dataType: "json"
        }).done(function(result) {
            getBooks();
        }).fail(function(error) {
            console.log(error);
        })
    }
     function deleteBook(id) {
        $.ajax({
            method: "DELETE",
            url: "http://127.0.0.1:8000/book/" + id, // nie wiem czy tu na koncu nie musi tez byc / - sprawdz jak wyglada endpoint wg. dokumentacji / prezentacji bo to ma znaczenie
            dataType: "json"
        }).done(function(result) {
            getBooks();
			console.log(result);
        }).fail(function(error) {
            console.log(error);
        })
    }

})
