
let usuarios = [];
let reservas= [];

console.log(usuarios);
console.log(reservas)


let proximoIdUsuario = 1;

class UsuarioPersona{
    constructor(pNombreUsuario, pPassword, pnombre) {
        this.nombreUsuario= pNombreUsuario;
        this.password= pPassword;
        this.nombre= pnombre;
        this.tipoDeUsuarioId= 1
        this.idUsuario= proximoIdUsuario;
    
        proximoIdUsuario++;
    }
}


class UsuarioLocal {
    constructor(pNombreUsuario, pPassword, pNombreLocal, pFotoLocal, pDireccionLocal) {
        this.nombreUsuario= pNombreUsuario;
        this.password= pPassword;
        this.nombreLocal= pNombreLocal;
        this.tipoDeUsuarioId= 2
        this.fotoLocal = pFotoLocal;
        this.direccion= pDireccionLocal;
        this.cupoMaximo= 100;
        this.lugaresOcupados = 0; 
        this.cantidadDeReservasTotales= 0;
        this.habilitado= true;
        this.idUsuario= proximoIdUsuario;
        this.reservasCalificadas= 0;
        this.totalPuntosCalificados= 0;

        proximoIdUsuario++;
    }
}

let proximoIdReserva = 1;

class Reservas {
    constructor(nombreUsuarioLogueado, idUsuarioLocal, cantidadLugaresIng, estado) {
        this.idReserva = proximoIdReserva;
        this.nombreUsuario = nombreUsuarioLogueado;
        this.idUsuarioLocal= idUsuarioLocal;
        this.cantidadLugares= cantidadLugaresIng;
        this.calificacion= null;
        this.estadoReserva= estado;
        
        proximoIdReserva++;
    }
}

