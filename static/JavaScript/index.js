
// content start 
var like_btns = document.querySelectorAll('.like');
var post_txt = document.getElementById('post_txt');
var fbtn = document.getElementById('fbtn');
var post = document.getElementById('upload');
var file = document.getElementById('file');
var fd = new FormData();
var xhr = new XMLHttpRequest();

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
    var liked = Boolean('liked' in like_btn.classList || 'liked' == like_btn.classList[1]);
    var disliked = Boolean('disliked' in like_btn.classList || 'disliked' == like_btn.classList[1]);
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


var controls = document.querySelectorAll('.controls');
controls.forEach(change_width)
function change_width(items, value) {

    var juice = items.querySelector('.juice-container');
    var juice_con = juice.querySelector('.juice-width');
    var video = items.parentElement.querySelector('video');
    var playpause = items.querySelector('.playpause');
    var full_screen = items.querySelector('.fullscreen');

    video.parentElement.addEventListener('mouseover', () => {
        items.style.opacity = '100';
    });
    video.parentElement.addEventListener('mouseout', () => {
        items.style.opacity = '0';
    })

    items.addEventListener('mouseover', () => {
        items.style.opacity = '100';

    })
    juice.addEventListener('mousedown', (e) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var div_width = juice.offsetWidth;
        var width_percent = x / div_width * 100;
        video.currentTime = video.duration * (width_percent / 100);
    });
    juice.addEventListener('mouseup', (e) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var div_width = juice.offsetWidth;
        var width_percent = x / div_width * 100;
        video.currentTime = video.duration * (width_percent / 100);
    });
    var icon = playpause.querySelector('.fa');
    playpause.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            icon.classList.remove('fa-play')
            icon.classList.add('fa-pause')
        } else {
            video.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
    var timestamp = items.querySelector('.timestamp');

    video.addEventListener('timeupdate', () => {
        var percent = (video.currentTime / video.duration) * 100;
        juice_con.style.width = percent + "%";
        if (video.ended) {
            icon.classList.remove('fa-pause');
            icon.classList.remove('fa-play');
            icon.classList.add('fa-play');
        }
        var durmins = Math.floor(video.duration / 60);
        var dursec = Math.floor(video.duration - durmins * 60);
        var curmins = Math.floor(video.currentTime / 60);
        var cursec = Math.floor(video.currentTime - curmins * 60);
        if (durmins < 10) {
            durmins = "0" + durmins
        }

        if (dursec < 10) {
            dursec = "0" + dursec
        }
        if (curmins < 10) {
            curmins = "0" + curmins
        }

        if (cursec < 10) {
            cursec = "0" + cursec
        }
        timestamp.innerHTML = curmins + ':' + cursec + "/" + durmins + ":" + dursec;


    });
    video.addEventListener('click', () => {
        playpause.click();
    });
    video.addEventListener('dblclick', (e) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var div_width = video.offsetWidth;
        var width_percent = x / div_width * 100;
        if (width_percent >= 50) {
            video.currentTime = video.currentTime + 5;
        } else {
            video.currentTime = video.currentTime - 5;

        }
    });

    var fs = false;
    full_screen.addEventListener('click', () => {
        const element = items.parentElement;
        if (!fs) {
            fs = true;
            const v = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
            v.call(element);
            console.log(fs);
        } else {
            fs = false;
            const cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
            cancellFullScreen.call(document);
            console.log(fs);
        }
    });

}

fbtn.addEventListener('click', () => {
    file.click()
})

post.addEventListener('click', () => {

    fd.append('text', post_txt.value);
    if (file.files.length == 0) {
        fd.append('type', 'text');
        fd.append('file', 'None');
    } else {
        var file_type = file.files[0].name.split('.');
        file_type = file_type[file_type.length - 1].toLowerCase();
        var videos = ['mp4'];
        var pictures = ['png', 'jpg', 'jpeg'];
        console.log(file_type);
        if (videos.includes(file_type)) {
            fd.append('file', file.files[0]);
            fd.append('type', 'video');
        }
        else if (pictures.includes(file_type)) {
            fd.append('file', file.files[0]);
            fd.append('type', 'picture');
        }
        else {
            alert("File type not supported");
        }
    }
    xhr.open('POST', '/post');
    xhr.upload.addEventListener('progress', (e) => {
        var progress = Math.round((e.loaded / e.total) * 100);
        post.innerHTML = 'Uploading... ' + progress + '%';
        console.log(progress);

    });
    xhr.addEventListener('load', () => {
        alert('Uploaded')
        location.reload();
    })
    xhr.send(fd);
})


// content end