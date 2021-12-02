class Persona {
    //Propiedad privada precedida por #
    #privateField =12;

    //Propiedades de instancia
    local ="propiedades";

    constructor(nombre, apellidos, cumple){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.cumple=cumple;
    }

    // son metodos publicos
    saludar(){
        return `hola me llamo ${this.nombre} ${this.apellidos}`;
    }

    // metodos privados precedidos por #
    #private(){
        return "El campo privado vale: "+this.#privateField;
    }

    // metodo de asignación de valores a propiedades
    set acceso(value){
        this.#privateField=value*2;
    }

    // metodo de obtencion de valores
    get acceso(){
        return this.#private();
    }

    get localValue(){
        return "El valor de 'local' es: "+this.local;
    }

    //Metodo estatico

    static metodoEstatico(a,b){
        return "La suma es : "+a+b;
    }

}

const alumno = new Persona("Pablo","Marmol","10 11 1902");
const alumno1 = new Persona("Pedro","Picapiedra","10 11 1902");
console.log(alumno.acceso);
// asignación de valores usando metodo set
alumno.acceso=40;

console.log(alumno);
console.log(alumno.acceso);
console.log(alumno.localValue);

console.log(alumno1);

// para saber si es de una clase instanceOf()

console.log(Persona.metodoEstatico(2,3));