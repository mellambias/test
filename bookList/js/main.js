/**
 * Constructor de libros
 */

// constructor libro


function Book(titulo, autor, isbn){
    this.titulo=titulo;
    this.autor=autor;
    this.isbn=isbn;
}

// Constructor GUI con los metodos de la parte grafica

function GUI(){}
// Metodos comunes al GUI
GUI.prototype.addBookToList = function(book){
    const list = document.getElementById("book-list");
    existe = document.getElementById(book.isbn)
    if(existe){
        // actualiza libro
        const libro=existe.children;
        libro[0].innerHTML= document.getElementById("title").value;
        libro[1].innerHTML=document.getElementById("autor").value;
        //libro[2].innerHTML=document.getElementById("isbn").value;
    }else{

        // Cear un nuevo elemento
        const row = document.createElement("tr");
        row.className="lista-row"
        row.id=book.isbn;
        row.innerHTML = `
        <td>${book.titulo}</td>
        <td>${book.autor}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" title="eliminar '${book.titulo}'"}>X</a></td>
        `;
        list.appendChild(row);
    }
}

GUI.prototype.clearFields = function(){
    document.getElementById('book-form').reset();
}

GUI.prototype.showAlert= function(msg, className){
    // crea un div para los mensajes
    const div = document.createElement("div");
    div.innerHTML=msg;
    div.className = className;
    div.id="alert";

    const form = document.querySelector('#book-form');
    const contenedor = document.querySelector('.container');
    contenedor.insertBefore(div,form);

    // eliminar el mensaje
    setTimeout(()=>{
        document.getElementById('alert').remove();
    },2000)
}

GUI.prototype.deleteBook= function(book){
    book.parentElement.parentElement.remove();
}

GUI.prototype.loadBook = function(book){
    const libro=book.parentElement.children
    document.getElementById("title").value=libro[0].innerHTML;
    document.getElementById("autor").value=libro[1].innerHTML;
    document.getElementById("isbn").value=libro[2].innerHTML;
}
const form = document.getElementById('book-form');

form.addEventListener('submit',function(e){
    e.preventDefault();
    const titulo = document.getElementById("title").value;
    const autor = document.getElementById("autor").value;
    const isbn = document.getElementById("isbn").value;

     // instanciamos la GUI
     const gui = new GUI();

    if(titulo.length>0 && autor.length>0 && isbn.length>0){

        // instanciar un libro
        const book = new Book(titulo,autor,isbn);
        gui.addBookToList(book);
        gui.showAlert("El Libro ha sido añadido","success");
        //Limpiar campos
        gui.clearFields();
    }else{
        gui.showAlert("Todos los campos son obrigatorios","error");
    }
})

//Evento para eliminar

// delegación de eventos 
const tabla = document.getElementById("tabla-lista");
    const gui = new GUI();  
tabla.addEventListener("click",function(e){
    if(e.target.className === "delete"){
        gui.deleteBook(e.target);
        gui.showAlert("El libro se ha eliminado","success");
    }else{
        gui.loadBook(e.target);
    }
});