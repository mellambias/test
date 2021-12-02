/**
 * Clases 
 */

// clase libro


class Book{
    constructor(titulo, autor, isbn){
        this.titulo=titulo;
        this.autor=autor;
        this.isbn=isbn;
    }

}
// CLase GUI con los metodos de la parte grafica

class GUI{
    // Metodos comunes al GUI
    static addBookToList(book){
        const list = document.getElementById("book-list");
        let existe = document.getElementById(book.isbn);

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


    static clearFields(){
        document.getElementById('book-form').reset();
    }

    static showAlert(msg, className){
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

    static deleteBook= function(book){
        book.parentElement.parentElement.remove();
    }

    static loadBook(book){
        const libro=book.parentElement.children
        document.getElementById("title").value=libro[0].innerHTML;
        document.getElementById("autor").value=libro[1].innerHTML;
        document.getElementById("isbn").value=libro[2].innerHTML;
    }
}

const form = document.getElementById('book-form');

form.addEventListener('submit',function(e){
    e.preventDefault();
    const titulo = document.getElementById("title").value;
    const autor = document.getElementById("autor").value;
    const isbn = document.getElementById("isbn").value;


    if(titulo.length>0 && autor.length>0 && isbn.length>0){

        // instanciar un libro
        const book = new Book(titulo,autor,isbn);
        GUI.addBookToList(book);
        Store.addBook(book);
        GUI.showAlert("El Libro ha sido añadido","success");
        //Limpiar campos
        GUI.clearFields();
    }else{
        GUI.showAlert("Todos los campos son obrigatorios","error");
    }
})

//Evento para eliminar

// delegación de eventos 
const tabla = document.getElementById("tabla-lista");

tabla.addEventListener("click",function(e){
    if(e.target.className === "delete"){
        GUI.deleteBook(e.target);
        Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
        GUI.showAlert("El libro se ha eliminado","success");
    }else{
        GUI.loadBook(e.target);
    }
});

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

if (storageAvailable('localStorage')) {
    console.log("Yippee! We can use localStorage awesomeness");
  }
  else {
    console.log("Too bad, no localStorage for us");
  }


  // local Store

  class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = new Array();
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books= Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(book => {
            GUI.addBookToList(book);
        });
    }

    static deleteBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,indice) => {
            if(book.isbn === isbn){
                books.splice(indice, 1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
  }
  // al cargarse el DOM se muestra la lista de libros
document.addEventListener("DOMContentLoaded",Store.displayBooks);