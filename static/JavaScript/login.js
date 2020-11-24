var email = document.getElementById('email');
var n = document.getElementById('name');
var password = document.getElementById('password');
var rp = document.getElementById('rp');
var un = document.getElementById('un');
var gender = document.getElementById('gender');
var dob = document.getElementById('dob');
var signup = document.querySelector('.signup');
var w = document.querySelector('.w');
var uniqee = false;
var uniqueun = false;
var age_requirement = false;

function reset() {
    w.innerHTML = 'Fillout The form';
    w.classList.remove('danger');
    w.classList.remove('warning')
}

email.addEventListener('input', () => {
    reset()
    if (!email.value.includes('@')) {
        w.innerHTML = "Include a '@' in the email";
        w.classList.add('danger');
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/check_email')
        xhr.upload.addEventListener('progress', () => {
            reset()
            w.innerHTML = "Checking...";
            w.classList.add('warning');
        });
        xhr.addEventListener('load', () => {
            reset();
            w.innerHTML = xhr.response;
            uniqee = false;
            if (xhr.response == 'Ok') {
                uniqee = true;
            }
            w.classList.add('warning');
        })
        var fd = new FormData();
        fd.append('email', email.value)
        xhr.send(fd);
    }

});

un.addEventListener('input', () => {
    reset()
    if (un.value == '') {
        w.innerHTML = "Please have a username";
        w.classList.add('danger')
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/check_un')
        xhr.upload.addEventListener('progress', () => {
            reset()
            w.innerHTML = "Checking...";
            w.classList.add('warning');
        });
        xhr.addEventListener('load', () => {
            reset();
            w.innerHTML = xhr.response;
            uniqueun = false;
            if (xhr.response == 'Ok') {
                uniqueun = true;
            }
            w.classList.add('warning');
        })
        var fd = new FormData();
        fd.append('un', un.value)
        xhr.send(fd);

    }
});

rp.addEventListener('input', () => {
    if (password.value != rp.value) {
        reset()
        w.innerHTML = 'Passwords not matching'
        w.classList.add('danger')
    } else {
        reset()
    }
})

signup.addEventListener('click', () => {
    var empty_feild = Boolean(email.value != '' && password.value != '' && rp.value == password.value && n!='' && un.value!='' && dob.value != '');
    if (empty_feild && uniqueun && uniqee && age_requirement) {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();

        fd.append('email', email.value);
        fd.append('name', n.value);
        fd.append('ps', password.value);
        fd.append('un', un.value);
        fd.append('gender', gender.value);
        fd.append('dob', dob.value);

        xhr.open('POST', '/insert')
        xhr.send(fd)
        xhr.upload.addEventListener('progress', ()=>{

        });
        xhr.addEventListener('load', ()=>{
            window.open('/', '_self')
        })
    }else{
        reset()
        w.innerHTML = "Please Check the Form again or your age is less than 13"
        w.classList.add('danger')
    }
});



dob.addEventListener('input', ()=>{
    var d1 = new Date(dob.value);
    var d2 = new Date();
    var difference = d1.getTime() - d2.getTime();
    var Difference_In_Days = Math.abs(Math.round(difference / (1000 * 3600 * 24))); 
    if (Difference_In_Days >= 4379.5) {
        reset()
        age_requirement = true;
    }else{
        reset()
        w.innerHTML = 'You are not able to use this website yet... Sorry'
        w.classList.add('danger')
    }
})