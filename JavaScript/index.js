
// content start 
var like_btns = document.querySelectorAll('.like');

function like_it(post) {

}


function unlike(post) {

}


function dislike_it(post) {

}


function undislike(post) {

}

like_btns.forEach(actions);

function actions(like_btn, value, obj) {
    var dislike_btn = document.querySelectorAll('.dislike')[value];
    var post_id = like_btn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];
    like_btn.parentElement.addEventListener('click', () => {
        like_btn.click();
    });
    dislike_btn.parentElement.addEventListener('click', () => {
        dislike_btn.click();
    });
    var liked = false;
    var disliked = false;
    like_btn.addEventListener('click', function () {
        
        if (liked) {
            like_btn.classList.remove('liked');
            liked = false;
            unlike(post_id);
        } else {
            like_btn.classList.add('liked');
            liked = true;
            like_it(post_id);
            if (disliked) {
                dislike_btn.classList.remove('disliked');
                disliked = false;
                undislike(post_id);
            }
        }

    });
    dislike_btn.addEventListener('click', function () {
        if (disliked) {
            dislike_btn.classList.remove('disliked');
            disliked = false;
            undislike(post_id);
        } else {
            dislike_btn.classList.add('disliked');
            disliked = true;
            like_it(post_id);
            if (liked) {
                like_btn.classList.remove('liked');
                liked = false;
                unlike(post_id);
            }
        }
    });
}

// for (let index = 0; index < actions.length; index++) {
//     const element = actions[index];
//     console.log(element)
// }

// content end