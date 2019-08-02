// LISTEN FOR FORM SUBMIT
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// SAVE BOOKMARK
function saveBookmark(e){

    // PREVENT FORM FROM SUBMITING
    e.preventDefault();
    console.log('it works');

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    };
    
    // LOCAL STORAGE

    // TEST IF BOOKMARKED
    if(localStorage.getItem('bookmarks') === null){
        // INIT ARRAY
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // SET LOCAL STORAGE
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        // RE-FETCH BOOKMARKS
        fetchBookmarks();

        
    } else {
        // GET BOOKMARKS FROM LOCAL STORAGE
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // ADD BOOKMARK TO ARRAY
        bookmarks.push(bookmark);
        // RE-SET TO LOCAL STORAGE
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        // RE-FETCH BOOKMARKS
        fetchBookmarks();

        // CLEAR INPUTS
        document.getElementById('siteName').value = '';
        document.getElementById('siteUrl').value = '';
        
    }

    console.log(bookmark);

}

// DELETE BOOKMARK
function deleteBookmark(url){
    // GET BOOKMARKS FROM LOCAL STORAGE
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // LOOP THROUGH BOOKMARKS
    for(var i = 0;i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // REMOVE FROM ARRAY
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // RE-FETCH BOOKMARKS
    fetchBookmarks();
}


// FETCH BOOKMARKS
function fetchBookmarks(){
    // GET BOOKMARKS FROM LOCAL STORAGE
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // GET OUTPU ID
    var bookmarkResults = document.getElementById('bookmarkResults');

    // BUILD OUTPUT
    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML +=    '<div class="well">'+
                                            '<h3>'+name+'</h3>'+
                                            '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                        '</div>';
    }
}