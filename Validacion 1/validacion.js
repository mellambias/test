
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit',e => {
    e.preventDefault();
    validateInputs();
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    // valida que el campo usuario no este vacio

    if(usernameValue === '') {
        setError(username, 'Username es necesario');
    } else {
        setSuccess(username);
    }
    /** valida el correo electronico  exista y sea valido*/
    if(emailValue === '') {
        setError(email, 'Email es neceasario');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Proporcione un correo valido');
    } else {
        setSuccess(email);
    }
    // valida el campo password, que exista y su longitud sea mayor que 7
    if(passwordValue === '') {
        setError(password, 'Password es necesario');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'El Password debe tener una longitud de 8 o más caracteres')
    } else {
        setSuccess(password);
    }
    // valida la existencia e igualdad del segundo password
    if(password2Value === '') {
        setError(password2, 'Por favor confirme su password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }
}