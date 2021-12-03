/**
 * Simula los retrasos del servidor en responder
 */

const posts = [
    {titulo:'Post 1', texto:'Esto es el post 1'},
    {titulo:'Post 2', texto:'Esto es el post 2'}
]

// function createPost(post) {
//     setTimeout(function(){
//       posts.push(post); 
//       getPosts(); 
//     },3000);
    
// }

// function getPosts() {
//     setTimeout(function() {
//         let lista = '';
//         posts.forEach(function(post){
//             lista += `<li>${post.titulo}</li>`;
//         })
//         document.getElementById("post").innerHTML=lista;
//     },2000)

// }

// createPost({titulo:'Post 3', texto:'Esto es el post 3'});

/**
 * Solucion con callbacks
 */

 function createPost(post, callback) {
    setTimeout(function(){
      posts.push(post); 
      callback(); 
    },3000);
    
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

createPost({titulo:'Post 3', texto:'Esto es el post 3'},getPosts);