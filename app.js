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

// content start 
var like = document.querySelectorAll('.like');
var dislike = document.querySelectorAll('.dislike');
var share = document.querySelectorAll('.share');

function like_it(post) {

}


function unlike(post) {

}


function dislike_it(post) {

}


function undislike(post) {

}

for (let i = 0; i < like.length; i++) {
    const like_btn = like[i];
    const post_id = like_btn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];

    like_btn.parentElement.addEventListener('click', function () {
        like_btn.click();
    });
    var liked = false;
    like_btn.addEventListener('click', function () {
        var dislike = Boolean('disliked' == like_btn.parentElement.parentElement.childNodes[3].childNodes[0].classList[1] || 'disliked' in disbtn.parentElement.parentElement.childNodes[3].childNodes[0].classList);
        var disbtn = like_btn.parentElement.parentElement.childNodes[3].childNodes[0];
        
        if (liked) {
            like_btn.classList.remove('liked');
            liked = false;
            unlike(post_id);
        } else {
            like_btn.classList.add('liked');
            liked = true;
            like_it(post_id);
            if (dislike) {
                disbtn.click();
            }
        }
    });
}

for (let index = 0; index < dislike.length; index++) {
    const disbtn = dislike[index];
    const post_id = disbtn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];
    var liked = Boolean('liked' == disbtn.parentElement.parentElement.childNodes[1].childNodes[0].classList[1] || 'liked' in disbtn.parentElement.parentElement.childNodes[1].childNodes[0].classList);
    var likebtn = disbtn.parentElement.parentElement.childNodes[1].childNodes[0];
    var disliked = false;

    disbtn.parentElement.addEventListener('click', function () {
        disbtn.click();
    });

    disbtn.addEventListener('click', function () {
        if (disliked) {
            disbtn.classList.remove('disliked');
            undislike(post_id)
            disliked = false;
        } else {
            disbtn.classList.add('disliked');
            dislike_it(post_id);
            disliked = true;
            if (liked) {
                likebtn.click();
            }
        }
    });
}
// content end