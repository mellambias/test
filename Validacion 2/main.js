const id = id => document.getElementById(id);
const clases = clase => document.getElementsByClassName(clase);

let formulario = id("formulario");
let nombreDeUsuario = {
    elemento:id("nombreDeUsuario"),
    valida:e=>{ 
        return (e.elemento.value.trim()!="")
    }
}
let email = {
    elemento:id("correoElectronico"),
    valida:e => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(e.elemento.value.trim()).toLowerCase());
    }
}
let contrasenya = {
    elemento:id("contrasenya"),
    valida:e=> {return (e.elemento.value.trim()!="") && (e.elemento.value.length>7)}
}

let msjError = clases("error");
let iconoExito = clases("success-icon");
let failureIcon = clases("failure-icon");

formulario.addEventListener("submit", e => {
    e.preventDefault();
    motor(nombreDeUsuario, 0, "El nombre de usuario no puede estar en blanco");
    motor(email, 1, "El correo electrónico no puede estar en blanco");
    motor(contrasenya, 2, "La contraseña ha de ser de 8 o más");
});

let motor = (elemento,serial,mensaje) =>{

    if (!elemento.valida(elemento)){
        msjError[serial].innerHTML = mensaje;
        elemento.elemento.style.border = "2px solid red";
        // iconos
        failureIcon[serial].style.opacity = "1";
        iconoExito[serial].style.opacity = "0";
    }else{
        msjError[serial].innerHTML = "";
        elemento.elemento.style.border = "2px solid green";
        // iconos
        failureIcon[serial].style.opacity = "0";
        iconoExito[serial].style.opacity = "1";
    }
}