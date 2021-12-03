document.querySelector('#button1').addEventListener('click',getText);
document.querySelector('#button2').addEventListener('click',getJson);
document.querySelector('#button3').addEventListener('click',getData);
const salida=document.getElementById("salida");

/**
 * desde un archivo de texto
 */

function getText(){
    fetch('data.txt')
    .then(function(respuesta){
        return respuesta.text();    // respuesta.text() es una Promise
    })
    .then(function(data){
        console.log(data);
        salida.innerHTML=data;
    })
    .catch(err=>{
        console.error(err);
    })
}

/**
 * Desde un archivo JSON
 */

function getJson(){
    fetch('posts.json')
    .then(res=>res.json())  // devuelve un objeto JSON
    .then(list=>{
        let elements="";
        list.forEach(element => {
            elements+=`<li>`;
            for(let campo in element){
                elements+=`<b>${campo}</b> = ${element[campo]} `
            }
            elements+=`</li>`;
        });
        salida.innerHTML=`<ul>${elements}</ul>`;
    },err=>console.error(err))
}
/**
 * Desde una API externa
 */

function getData(){
    fetch('https://api.github.com/users')
    .then(res=>res.json())  // devuelve un objeto JSON
    .then(list=>{
        let elements="";
        list.forEach(element => {
            elements+=`<li>Usuario: <ul>`;
            for(let campo in element){
                if(campo=="avatar_url"){
                    elements+=`<li><b>${campo}</b> = <img src="${element[campo]}" width="100"></li> `;
                }else if(element[campo].toString().includes('http')){
                    elements+=`<li><b>${campo}</b> = <a href="${element[campo]}" target="_blank">${element[campo]}</a></li> `;
                }else{
                    elements+=`<li><b>${campo}</b> = ${element[campo]}</li> `    
                }
                
            }
            elements+=`</ul></li>`;
        });
        salida.innerHTML=`<ul>${elements}</ul>`;
    },err=>console.error(err))
}