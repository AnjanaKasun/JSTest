//listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('url').value;
    var bookmark = {
        name : siteName,
        url : siteUrl
    }
    console.log(bookmark);
    if(localStorage.getItem("bookmarks")===null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }
    //localStorage.setItem('test','hello');
    //console.log(localStorage.getItem('test'));
     fetchBookmarks();
    e.preventDefault();
    
    
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //console.log(bookmarks);
    var bookmarkresults = document.getElementById("bookmarkResults");
    //build output
    bookmarkresults.innerHTML = ""; 
    for(var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarkresults.innerHTML += '<div class="well">'
        +'<h3>'+name
        +'</h3> ('+url+') '
        +'<a class="btn btn-default" target="_blank" href="'+url+'">visit</a> '
        +'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> '
        +'</div>';
    }

}


function deleteBookmark(url) {
    console.log(url); 
     var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
      for(var i=0; i<bookmarks.length; i++){
            if(bookmarks[i].url== url) {
                bookmarks.splice(i,1);

            }
    }
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    fetchBookmarks();
}