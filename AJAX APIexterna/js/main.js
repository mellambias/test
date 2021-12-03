
document.getElementById("buttonImagenes").addEventListener('click',loadImagenes);
document.getElementById("pagina").addEventListener('change',loadImagenes);
document.getElementById("gray").addEventListener('change',loadImagenes);
document.getElementById("blur").addEventListener('change',loadImagenes);


function loadImagenes(){
    const isGray = document.getElementById("gray").checked;
    const isBlur = document.getElementById("blur").checked;
    const pagina = document.getElementById("pagina").value;
    const xhr = new XMLHttpRequest();

    xhr.open("GET",`https://picsum.photos/v2/list?${pagina>1?"page="+pagina:""}&limit=10`);
    xhr.send();
    xhr.onload = function(){
        console.log("Operacion completada...");
        if (this.status === 0 || (this.status >= 200 && this.status < 400)){
            const imagenes = JSON.parse(this.responseText);
            const lista = document.getElementById("imagenes");
            lista.innerHTML=`
            <thead>
                    <tr>
                        <th>id</th>
                        <th>Autor</th>
                        <th>Ancho</th>
                        <th>Alto</th>
                        <th>Url</th>
                        <th>Descarga</th>
                    </tr>
                </thead>
                <tbody id="listElement">
                </tbody>`
            // lee la lista de mutantes
            let mod="";
            let blurNumber=0;
            if(isGray || isBlur){
                mod = `?`;
            }
            if(isBlur){
                blurNumber= document.getElementById("blurNumber").value;
            }
            if(isGray && isBlur){
                mod += `grayscale&blur=${blurNumber}`;
            }else{
                mod+=`${isGray?"grayscale":""}${isBlur?"blur="+blurNumber:""}`;
            }
            console.log(mod);
            imagenes.forEach(imagen => {
                let row = document.createElement("tr");
                row.innerHTML+=`<td>${imagen.id}</td>`;
                row.innerHTML+=`<td>${imagen.author}</td>`;
                row.innerHTML+=`<td>${imagen.width}</td>`;
                row.innerHTML+=`<td>${imagen.height}</td>`;
                row.innerHTML+=`<td><a href="${imagen.url}" target="_blank">Portfolio</a></td>`;
                row.innerHTML+=`<td><a href="${imagen.download_url}${mod}" target="_blank"><img id="${imagen.id}" src="${imagen.download_url}${mod}" width="100"></a></td>`;
                document.getElementById("listElement").appendChild(row);
                document.getElementById(imagen.id).addEventListener('mouseover',function(){
                    console.log(this)
                })
            });
        }
    }
}