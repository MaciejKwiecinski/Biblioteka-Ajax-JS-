$(document).ready(function () {
    $.ajax({
       method: 'GET',
       url:'http://127.0.0.1:8000/book/'
    }).done(function(result){
      setBooks(result);
    });
    function setBooks(result) {
        for(var i = 0; i<result.length;i++){
            $('.booksList').append('<li><span>'+ result[i].title+'</span><div></div></li>');
        }
    }






})