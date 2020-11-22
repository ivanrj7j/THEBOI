
// content start 
var actions = document.querySelectorAll('.action_list');

function like_it(post) {

}


function unlike(post) {

}


function dislike_it(post) {

}


function undislike(post) {

}

for (let index = 0; index < actions.length; index++) {
    var element = actions[index];
    var like_btn = element.querySelector('.like');
    var dislike_btn = element.querySelector('.dislike');
    var share_btn = element.querySelector('.share');
    var liked = false;
    var disliked = false;
    var post_id = element.parentElement.parentElement.parentElement.classList[1];
    console.log(like_btn);
    like_btn.parentElement.addEventListener('click', function(){
        like_btn.click()
    });
    like_btn.addEventListener('click', function () {
        console.log("Hi")
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
                undislike(post_id)
            }
        }
    });
    dislike_btn.parentElement.addEventListener('click', function(){
        dislike_btn.click()
    });
    dislike_btn.addEventListener('click', function () {
        if (disliked) {
            dislike_btn.classList.remove('disliked');
            disliked = false;
            undislike(post_id);
        } else {
            dislike_btn.classList.add('disliked');
            disliked = true;
            dislike_it(post_id);
            if (liked) {
                like_btn.classList.remove('liked');
                liked = false;
                unlike(post_id)
            }
        }
    });
}

// for (let index = 0; index < actions.length; index++) {
//     const element = actions[index];
//     console.log(element)
// }

// content end