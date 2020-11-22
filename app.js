var search_toggler = document.getElementById('toggler');
var search_icon = document.querySelector('.search-btn');
var navitems = document.querySelector('.navitem');

search_icon.addEventListener('click', function(){
    search_icon.style.display = 'none';
    search.classList.remove('d-none');
    search.focus()
    navitems.style.left = '17.2%';
});

var search = document.getElementById('search');

search.addEventListener('focusout', function(){
    search.classList.add('d-none');
    search_icon.style.display = 'block';
    navitems.style.left = '30%';
});