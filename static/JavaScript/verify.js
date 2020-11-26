var v = document.getElementById('v');
var b = document.getElementById('b');
var xhr = new XMLHttpRequest();
var fd = new FormData();
b.addEventListener('click', () => {

    fd.append('v', v.value);
    xhr.open("POST", '/veri');
    xhr.send(fd);
    xhr.upload.addEventListener('progress', () => {
        b.innerHTML == 'Verifying...';
    });
    xhr.addEventListener('load', () => {
        if (xhr.response == 'o') {
            window.open('/', '_self');
        } else {
            alert("OTP you entered is wrong");
            location.reload();
        }
    })
})