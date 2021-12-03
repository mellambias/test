/**
 * Simula los retrasos del servidor en responder
 */

const posts = [
    {titulo:'Post 1', texto:'Esto es el post 1'},
    {titulo:'Post 2', texto:'Esto es el post 2'}
]

function createPost(post) {
    console.log("Ejecuta la funcion");
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            posts.push(post);
            const error = false;    // simula el resultado del servidor
            if(!error){
                resolve();  // Llama al callback en caso correcto
            }else{
                reject("Algo no ha ido bien");    // llama al callback en caso de error
            }
        }, 3000);
    });
}

function getPosts() {
    setTimeout(function() {
        let lista = '';
        posts.forEach(function(post){
            lista += `<li>${post.titulo}</li>`;
        })
        document.getElementById("post").innerHTML=lista;
    },2000)

}

createPost({titulo:'Post 3', texto:'Esto es el post 3'})
.then(getPosts)
.catch(function(e){
    console.error(e);
});