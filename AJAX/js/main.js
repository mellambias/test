document.getElementById("button").addEventListener('click',loadData);

function loadData() {
    //Creamos una instancia de la API
    const xhr = new XMLHttpRequest();

    xhr.open("GET","data.txt");
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log("Estado actual code: "+xhr.readyState);
        if(this.readyState===XMLHttpRequest.DONE ){
            if (this.status === 0 || (this.status >= 200 && this.status < 400)) {
                // The request has been completed successfully
                console.log(xhr.responseText);
                document.getElementById("salida").innerHTML=this.responseText;
              } else {
                console.error("Oh no! There has been an error with the request!")
              }
        }
    }
    /** 
     * Se lanza cuando el readyState es LOADING
        xhr.onprogress = function(){
            console.log("Procesando...")
        }
    */

    /** 
     * Se lanza cuando el readyState es DONE
        xhr.onload = function(){
            console.log("Operacion completada...")
        }
    */

    /** 
     * Se lanza cuando se produce un error
        xhr.onerror = function(){
            console.error("Operacion erronea...");
        }
    */
}

    
    /**
     * Codigos de readyState
     * 
     *  0	UNSENT	            Client has been created. open() not called yet.
     *  1	OPENED	            open() has been called.
     *  2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
     *  3	LOADING	            Downloading; responseText holds partial data.
     *  4	DONE	            The operation is complete.
     */