document.getElementById("button").addEventListener('click',loadData);
document.getElementById("buttonMutantes").addEventListener('click',loadMutantes);

function loadData() {
    //Creamos una instancia de la API
    const xhr = new XMLHttpRequest();

    xhr.open("GET","mutante.json");
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log("Estado actual code: "+xhr.readyState);
        if(this.readyState===XMLHttpRequest.DONE ){
            if (this.status === 0 || (this.status >= 200 && this.status < 400)) {
                // The request has been completed successfully
                const mutante = JSON.parse(this.responseText);
                const mutante = JSON.parse(this.responseText);
                document.getElementById("mutantes").innerHTML="";
                document.getElementById("mutante").innerHTML=`
                <b>Nombre</b>: ${mutante.nombre}<br>
                <b>Pandilla</b>: ${mutante.pandilla}</br>
                <b>Mutacion</b>: ${mutante.mutacion}</br>
                <b>Enfadado</b>: ${mutante.enfadado}`;

                // como una lista
                let lista=`
                <ul>
                    <li><b>ID</b>: ${mutante.id}</li>
                    <li><b>Nombre</b>: ${mutante.nombre}</li>
                    <li><b>Pandilla</b>: ${mutante.pandilla}</li>
                    <li><b>Mutacion</b>: ${mutante.mutacion}</li>
                    <li><b>Estado</b>: ${mutante.enfadado?"Enfadado":"Tranquilo"}</li>
                </ul>`
                document.getElementById("mutante").innerHTML=lista;
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

function loadMutantes(){
    const xhr = new XMLHttpRequest();

    xhr.open("GET","mutantes.json");
    xhr.send();
    xhr.onload = function(){
        console.log("Operacion completada...");
        if (this.status === 0 || (this.status >= 200 && this.status < 400)){
            const mutantes = JSON.parse(this.responseText);
            document.getElementById("mutante").innerHTML="";
            const lista = document.getElementById("mutantes");
            lista.innerHTML=`
            <thead>
                    <tr>
                        <th>Orden</th>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Pandilla</th>
                        <th>Mutacion</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody id="listElement">
                </tbody>`
            // lee la lista de mutantes
            mutantes.forEach((mutante,orden) => {
                let row = document.createElement("tr");
                row.innerHTML=`
                    <td> ${orden+1}</td>
                    <td> ${mutante.id}</td>
                    <td>${mutante.nombre}</td>
                    <td>${mutante.pandilla}</td>
                    <td>${mutante.mutacion}</td>
                    <td>${mutante.enfadado?"Enfadado":"Tranquilo"}</td>`;
                document.getElementById("listElement").appendChild(row);
            });
        }
    }
}