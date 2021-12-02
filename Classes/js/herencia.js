class Persona{
    constructor(nombre,apellido){
        this.nombre=nombre;
        this.apellido=apellido
    }

    saludar(){
        return `Hola, me llamo ${this.nombre} ${this.apellido}`
    }
}

class Mutante extends Persona{
    constructor(nombre,apellidos,nick,superPoder){
        super(nombre,apellidos);
        this.nick = nick;
        this.superPoder = superPoder;
    }

}

const lobexno = new Mutante('Logan', 'Martinez','Lobezno','Garras de acero');
console.log(lobexno);
console.log(lobexno.saludar());