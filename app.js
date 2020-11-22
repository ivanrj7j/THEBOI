var search_toggler = document.getElementById('toggler');
var search_icon = document.querySelector('.search-btn');
var navitems = document.querySelector('#navitem');
var navtoggle = document.querySelector('#barsline');

search_icon.addEventListener('click', function () {
    search_icon.style.display = 'none';
    search.classList.remove('d-none');
    search.focus()
    navitems.style.left = '17.2%';
});

var search = document.getElementById('search');

search.addEventListener('focusout', function () {
    search.classList.add('d-none');
    search_icon.style.display = 'block';
    navitems.style.left = '30%';
});

var toggled = false;
navtoggle.addEventListener('click', function () {
    if (toggled) {
        navtoggle.classList.add('fa-bars');
        navtoggle.classList.remove('fa-times');
        toggled = false;
        navitems.classList.remove('navitem-t');
        navitems.classList.add('navitem')
    } else {
        navtoggle.classList.remove('fa-bars');
        navtoggle.classList.add('fa-times');
        toggled = true;
        navitems.classList.remove('navitem');
        navitems.classList.add('navitem-t')
    }
});

window.addEventListener('resize', () => {

    navitems.classList.remove('navitem-t');
    navitems.classList.add('navitem');
    navtoggle.classList.add('fa-bars');
    navtoggle.classList.remove('fa-times');

});

// Navbar JavaScript top 