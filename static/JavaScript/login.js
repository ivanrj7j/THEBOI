var email = document.getElementById('email');
var name = document.getElementById('name');
var password = document.getElementById('password');
var rp = document.getElementById('rp');
var un = document.getElementById('un');
var gender = document.getElementById('gender');
var dob = document.getElementById('dob');
var signup = document.querySelector('.signup');
var w = document.querySelector('.w');

function reset() {
    w.innerHTML = 'Fillout The form';
    w.classList.remove('danger');
    w.classList.remove('warning')
}

email.addEventListener('input', ()=>{
    reset()
    if (!email.value.includes('@')) {
        w.innerHTML = "Include a '@' in the email";
        w.classList.add('danger');
    }
});