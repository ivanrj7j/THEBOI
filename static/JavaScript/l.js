var email = document.getElementById('email');
var password = document.getElementById('password');
var signup = document.getElementById('signup');
var w = document.querySelector('.w');


function reset() {
    w.innerHTML = 'Fillout The form';
    w.classList.remove('danger');
    w.classList.remove('warning')
}

signup.addEventListener('click', ()=>{
    reset()
    if (email.value != '' && password.value !='') {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();

        fd.append('email', email.value);
        fd.append('password', password.value);

        xhr.open('POST', '/chk');
        xhr.send(fd)
        xhr.upload.addEventListener('progress', ()=>{
            reset();
            w.innerHTML = 'Checking...';
        });
        xhr.addEventListener('load', ()=>{
            reset();
            if (xhr.response == 'ok') {
                window.open('/', '_self')
            } else {
                w.innerHTML = 'Check you email and password again';
                w.classList.add('danger');
                
            }
        });
    } else {
        w.innerHTML = 'Please fill out the form';
        w.classList.add('danger');
    }
});