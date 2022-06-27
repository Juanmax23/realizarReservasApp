/* GUÍA DE CÓDIGO
    - ESCONDER Y MOSTRAR MENU NAV
    - ESCONDER Y MOSTRAR PANTALLAS
    - REGISTRO DEL USUARIO
    - INICIO DE SESIÓN
    -CREAR PANTALLAS DINAMICAMENTE
    -FUNCIONES
*/

inicializar();

function inicializar() {
    mostrarDivLoginUsuario();
    actualizarMenuPorTipoDeUsuario();
    agregarEventosEnButtons();
    precargarDatos();
}

function agregarEventosEnButtons() {
    document.querySelector('#btnIniciarSesion').addEventListener('click', btnIniciarSesionHandler);
    document.querySelector('#btnRegistro').addEventListener('click', btnRegistroHandler);

    document.querySelector('#btnMenuInicioDeSesion').addEventListener('click', btnMenuInicioDeSesionHandler);
    document.querySelector('#btnMenuRegistrarUsuario').addEventListener('click', btnMenuRegistrarUsuarioHandler);
    document.querySelector('#btnMenuCerrarSesion').addEventListener('click', btnMenuCerrarSesionHandler);
    document.querySelector('#btnMenuMisReservas').addEventListener('click', btnMenuMisReservasHandler);
    document.querySelector('#btnMenuMiLocal').addEventListener('click', btnMenuMiLocalHandler);
    document.querySelector("#btnMenuGoHome").addEventListener('click', btnMenuGoHomeHandler);
}

/***************************
ESCONDER Y MOSTRAR MENU NAV
****************************/

function btnMenuInicioDeSesionHandler() {
    mostrarDivLoginUsuario();
}
function btnMenuRegistrarUsuarioHandler() {
    mostrardivRegistrarUsuario();
}
function btnMenuGoHomeHandler(){ 
    mostrarDivHome();
}
function btnMenuCerrarSesionHandler() {
    mostrarDivLoginUsuario();
    actualizarMenuPorTipoDeUsuario();
}

function ocultarOpcionesMenu() {
    document.querySelector("#btnMenuInicioDeSesion").style.display = "none";
    document.querySelector("#btnMenuRegistrarUsuario").style.display = "none";
    document.querySelector("#btnMenuCerrarSesion").style.display = "none";
    document.querySelector("#btnMenuGoHome").style.display = "none";
    document.querySelector("#btnMenuMiLocal").style.display = "none";
    document.querySelector("#btnMenuMisReservas").style.display = "none";

}

function mostrarMenuUsuarioNoLogueado() {
    ocultarOpcionesMenu();
    document.querySelector("#btnMenuInicioDeSesion").style.display = "inline";
    document.querySelector("#btnMenuRegistrarUsuario").style.display = "inline";
}

function mostrarMenuDeUsuarioPersona () {
    ocultarOpcionesMenu();
    document.querySelector("#btnMenuGoHome").style.display = "inline";
    document.querySelector("#btnMenuCerrarSesion").style.display = "inline";
    document.querySelector("#btnMenuMisReservas").style.display = "inline";

}
function mostrarMenuDeUsuarioLocal () {
    ocultarOpcionesMenu();
    // document.querySelector("#btnMenuGoHome").style.display = "inline";
    document.querySelector("#btnMenuCerrarSesion").style.display = "inline";
    document.querySelector("#btnMenuMiLocal").style.display = "inline";

}

/***************************
ESCONDER Y MOSTRAR PANTALLAS
****************************/

function ocultarPantallas() {
    vaciarCampos();
    vaciarMensajes();
    document.querySelector("#divLoginUsuario").style.display = "none";
    document.querySelector("#divRegistrarUsuario").style.display = "none";
    document.querySelector("#divHome").style.display = "none";
    document.querySelector("#divMisReservas").style.display = "none";
    document.querySelector("#divMiLocal").style.display = "none";
    document.querySelector("#divRestaurantes").innerHTML = "";
}

function vaciarCampos() {
    document.querySelector('#txtNombreUsuario').value = "Juanma23";
    document.querySelector('#txtContrasenaUsuario').value = "Hola1234";
    document.querySelector('#txtNombreARegistrar').value = "";
    document.querySelector('#txtNombreUsuarioARegistrar').value = "";
    document.querySelector('#txtContrasenaUsuarioARegistrar').value = "";
}

function vaciarMensajes() {
    document.querySelector('#pMensajeLogin').innerHTML = "";
    document.querySelector('#pMensajeRegistro').innerHTML = "";
}

// Iniciar Sesion
function mostrarDivLoginUsuario() {
    ocultarPantallas();
    document.querySelector('#divLoginUsuario').style.display = "block";

}
// Registrarse en la app
function mostrardivRegistrarUsuario() {
    ocultarPantallas();
    document.querySelector('#divRegistrarUsuario').style.display = "block";

}
// El usuario logra Iniciar Sesion
function mostrarDivHome() {
    ocultarPantallas();
    crearDivHome();
    document.querySelector('#divHome').style.display = "block";

}
// Informacion estadistica del usuario Persona
function btnMenuMisReservasHandler() {
    ocultarPantallas();
    crearListadoReservasSinCalificar();
    crearListadoDeReservasPendientes();
    crearInformacionEstadisticaUsuarioPersona();
    document.querySelector('#divMisReservas').style.display = "block";
    
}
//  Informacion estadistica del usuario Local
function btnMenuMiLocalHandler() {
    ocultarPantallas();
    crearDivMiLocal();
    document.querySelector('#divMiLocal').style.display = "block";
}


/********************
REGISTRO DEL USUARIO
*********************/

function btnRegistroHandler() {

    let nombreIngresado = document.querySelector('#txtNombreARegistrar').value;
    let nombreDeUsuarioIngresado = document.querySelector('#txtNombreUsuarioARegistrar').value;
    let contraseñaIngresada = document.querySelector('#txtContrasenaUsuarioARegistrar').value;
    let mensaje = "";

    let nombreDeUsuarioIngresadoMin = nombreDeUsuarioIngresado.toLowerCase();
    let usuarioEncontrado = buscarUsuarioPorNombre(usuarios, nombreDeUsuarioIngresadoMin);
   
    if (nombreIngresado != "" && nombreDeUsuarioIngresado != "" && contraseñaIngresada != "") {
        // si == null quiere decir que no se encontro el nombreDeUsuarioIngresado en usuarios.
        if (usuarioEncontrado == null) {

            if (contraseñaValida(contraseñaIngresada)) {
                
                
                ingresarUsuarioPersona(nombreDeUsuarioIngresadoMin, contraseñaIngresada, nombreIngresado);

                mensaje = "Usuario registrado";
                

                vaciarCampos();

            } else {
                mensaje = "Contraseña no válida. Debe contener una mayúscula, una minúscula, un número y al menos 6 caracteres.";
            }

        } else {
            mensaje = "El nombre de usuario ya existe.";
        }

    } else {
        mensaje = "Todos los datos son obligatorios";
    }

    document.querySelector('#pMensajeRegistro').innerHTML = mensaje;

}


/****************
INICIO DE SESIÓN
*****************/
//nombre usuario variable global 
let usuarioActualEnLaApp = "";

function btnIniciarSesionHandler() {
    let nombreUsuarioIngresado = (document.querySelector('#txtNombreUsuario').value);
    let contraseñaIngresada = document.querySelector('#txtContrasenaUsuario').value;
    let mensaje = "";
    let nombreDeUsuario= nombreUsuarioIngresado.toLowerCase();
    
    let usuarioLogueado = buscarUsuarioPorNombre(usuarios, nombreDeUsuario);

    usuarioActualEnLaApp = usuarioLogueado;
    // != null significa que encontro el nombreUsuarioIngresado en el array de usuarios.
    if (usuarioLogueado != null) {

        let passwordCorrecto = usuarioLogueado.password == contraseñaIngresada;
        // si la contra coincide con el usuario logra iniciar sesion.
        if (passwordCorrecto) {
           
            actualizarMenuPorTipoDeUsuario(usuarioLogueado);

        } else {
            mensaje = "Contraseña incorrecta."
        }

    } else {
        mensaje = "Nombre de usuario o contraseña no validos"
    }

    
    document.querySelector('#pMensajeLogin').innerHTML = mensaje;
}



/*******************************
   CREAR CONTENIDO DINAMICO.
********************************/

function crearDivHome(){
    //vacio el innerHTML porque si no se multiplican los locales cada vez que vas al home
    document.querySelector("#divHome").innerHTML = "";

    for(let i= 0; i < usuarios.length; i++){

        usuarioActual = usuarios[i];
        // los usuarioLocal tienen tipoDeUsuarioId 2. mustro todos los locales
        if(usuarioActual.tipoDeUsuarioId == 2 && usuarioActual.habilitado == true){

            document.querySelector("#divHome").innerHTML+= `
                <h2>${usuarioActual.nombreLocal}<h2>
                ${usuarioActual.fotoLocal}
                <br><br>
                <input type="button" data-id=${usuarioActual.idUsuario} class="btnEntrarLocal" value="Ir a ${usuarioActual.nombreLocal}">
                <br>
                <hr>                
            `;
        }            
    }

    agregarEventosDeClickEnButtonsDinamicos(".btnEntrarLocal",btnCrearDivLocal)

}


let localEnElQueEstaElUsuario;

function btnCrearDivLocal(){
    // Obtengo el valor de data-id del local que disparó el botón .
    let localPorID = this.getAttribute("data-id");
    let localEncontrado= buscarUsuarioPorID(usuarios, localPorID);
    //guaro el local al que ingreso el usuario como variable global
    localEnElQueEstaElUsuario = localEncontrado;

    let lugaresDisponibles = obtenerLugaresDisponibles(localEncontrado);

    ocultarPantallas();
    //muestro el local que ingreso el usuario
    document.querySelector("#divRestaurantes").innerHTML= `
        <br>
        <h2> Bienvenido ${usuarioActualEnLaApp.nombre} a "${localEncontrado.nombreLocal}" <h2>
        ${localEncontrado.fotoLocal}
        <br>
        <hr>
        <p id="pLugaresDisponibles"> Lugares disponibles: ${lugaresDisponibles}</p>
        <hr>
        <label for="numLugaresReservas">Ingrese lugares a reservar: </label>
        <br><br>
        <input type="number" id="numLugaresAReservas" placeholder="cantidad de lugares">
        <br><br>
        <input type="button" data-id=${usuarioActualEnLaApp.idUsuario} class="btnReservarEnElLocal" value="Reservar" >
        <br>
        <p id="mostrarMensajeDeReserva"></p>
        <hr>
    `;
        
    agregarEventosDeClickEnButtonsDinamicos(".btnReservarEnElLocal",realizarUnaReserva)
 
}


//Reservas
function realizarUnaReserva() {
    let local  = localEnElQueEstaElUsuario;
    let persona = usuarioActualEnLaApp;
    let numIngresados = document.querySelector('#numLugaresAReservas').value;
    let mensaje = "";

    if(!isNaN(numIngresados) && numIngresados != "" && numIngresados > 0) {
        //Valido que exista el local y la persona.
        if(local != null && persona != null ) {
            // que no tenga mas de una reserva pendiente en un local
            if(personaSinReservasPendientesEnMismoLocal(persona.nombreUsuario,local.idUsuario)) {
                let lugaresAReservar = parseInt(numIngresados);
                let lugaresDisponibles = obtenerLugaresDisponibles(local);
                //restricciones del usuario Local cupo y estado 
                if(lugaresDisponibles >= lugaresAReservar && local.habilitado == true){
                    ingresarReservaAlArray(persona.nombreUsuario, local.idUsuario, lugaresAReservar,"Pendiente");
                    //actualizo los lugares disponibles 
                    lugaresDisponibles = local.cupoMaximo - local.lugaresOcupados;
                    mensaje = "Reserva realizada con éxito"
                    document.querySelector('#numLugaresAReservas').value = "";
                    document.querySelector('#pLugaresDisponibles').innerHTML = `Lugares disponibles: ${lugaresDisponibles}`
                    
                } else {
                    mensaje= "No hay lugares disponibles";
                    document.querySelector('#numLugaresAReservas').value = "";
                }

            } else {
                mensaje = "Para reservar cancele su reserva Pendiente";
            }

        } 
            
       
    } else {
        mensaje = "Ingrese la cantidad de lugares";
    }

    document.querySelector('#mostrarMensajeDeReserva').innerHTML = mensaje;
    
}




/********************************************
    CONTENIDO DINAMICO USUARIO PERSONA
*********************************************/

function crearListadoReservasSinCalificar() {

    let tBody = "";

    for(let i = 0; i < reservas.length; i++) {

        reservaActual = reservas[i];

        let local = buscarUsuarioPorID(usuarios,reservaActual.idUsuarioLocal)
        //Muestro las reservas del usuario logueado que esten Finalizadas y que no esten Calificadas.
        if(reservaActual.nombreUsuario == usuarioActualEnLaApp.nombreUsuario && reservaActual.estadoReserva == "Finalizada" && reservaActual.calificacion == null) {
            tBody += `
                <tr>
                    <td>
                     ${local.fotoLocal}
                    </td>
                    <td>
                     Finalizada
                    </td>
                    <td>
                        <select id="selectCalificacionReserva_${reservaActual.idReserva}" placeholder="Califique su reserva">
                         <option value=""></option>
                         <option value="1"> 1</option>
                         <option value="2"> 2</option>
                         <option value="3"> 3</option>
                         <option value="4"> 4</option>
                         <option value="5"> 5</option>
                        </select>
                    </td>
                    <td>
                     <input type="button" data-id=${reservaActual.idReserva} class="btnGuardarCalificación" value="Guardar">
                    </td>
                </tr> 

            `;
        }
    }
    
    document.querySelector('#tBodyReservasSinCalificar').innerHTML = tBody;

    agregarEventosDeClickEnButtonsDinamicos(".btnGuardarCalificación", btnGuardarCalificaciónHandler);
}

function btnGuardarCalificaciónHandler() {
    let idReserva = this.getAttribute("data-id");
    let puntuacion = document.querySelector("#selectCalificacionReserva_"+ idReserva).value;
    calificarUnaReserva(puntuacion,idReserva);

    btnMenuMisReservasHandler();
}

function calificarUnaReserva(puntuacion,idReserva) {
   
    let reserva = buscarReservaPorId(reservas,idReserva);
    
    //controlo que ingrese un numero del 1 al 5 y que este Finalzada
    if(!isNaN(puntuacion) && puntuacion != "" && puntuacion > 0 && puntuacion <= 5 && reserva.estadoReserva == "Finalizada") {

        let ptos = parseInt(puntuacion);

        reserva.calificacion = ptos;

        let local = buscarUsuarioPorID(usuarios, reserva.idUsuarioLocal);
        local.reservasCalificadas+= 1;
        local.totalPuntosCalificados+= ptos;
    }
}


function crearListadoDeReservasPendientes() {

    let tBody = ""

    for(let i = 0; i < reservas.length; i++) {

        reservaActual = reservas[i];

        let local = buscarUsuarioPorID(usuarios,reservaActual.idUsuarioLocal)
        //muestro las reservas pendientes del usuario que inicio sesion
        if(reservaActual.nombreUsuario == usuarioActualEnLaApp.nombreUsuario && reservaActual.estadoReserva == "Pendiente") {
            tBody += `
                <tr>
                    <td>
                     ${local.fotoLocal}
                    </td>
                    <td>
                      ${local.nombreLocal}
                    </td>
                    <td class="numCantidadLugares">
                     <p>${reservaActual.cantidadLugares}</p>
                    </td>
                    <td>
                    <input type="button" data-id=${reservaActual.idReserva} class="btnCancelarReserva" value="Cancelar">
                   </td>
                </tr>
            `;
        }
    }

    document.querySelector('#TbodyReservasPendientes').innerHTML = tBody;

    agregarEventosDeClickEnButtonsDinamicos(".btnCancelarReserva", btnCancelarReservaHandler);

}

//Cancelo la reserva selecionada de la lista de reservas Pendientes del usuario.
function btnCancelarReservaHandler() {
    let idReserva = this.getAttribute("data-id");
    cancelarReserva(idReserva);
    btnMenuMisReservasHandler();
}

function cancelarReserva(id) {
    let reserva = buscarReservaPorId(reservas,id);
    reserva.estadoReserva = "Cancelado";

    let local = buscarUsuarioPorID(usuarios,reserva.idUsuarioLocal)
    local.lugaresOcupados-= reserva.cantidadLugares;

}

//Estadisticas 
function crearInformacionEstadisticaUsuarioPersona() {
    let localDestacado;

    let tBody = "";
    let idLocalesYaPrecargados = [];
    let maximoDestacado = Number.NEGATIVE_INFINITY;

    for(let i = 0; i < reservas.length; i++) {
        reservaActual = reservas[i];
        let local = buscarUsuarioPorID(usuarios,reservaActual.idUsuarioLocal);
        //En las reservas finalizadas del usuario
        if(reservaActual.nombreUsuario == usuarioActualEnLaApp.nombreUsuario && reservaActual.estadoReserva == "Finalizada") {
            //valido que no se repita la info del local
            if (elLocalNoEstaEnElArray(idLocalesYaPrecargados, local.idUsuario)){
                //retorna cuantas reservas finalizadas tiene la persona en ese local
                let vecesQueEstuvoEnElLocal= vecesQueElUsuarioPersonaEstuvoEnUnLocal(usuarioActualEnLaApp.nombreUsuario, local);
                //realiza el porcentaje entre las veces que estuvo y la cantidad de reservas totales del local
                let porcentajeReservas= parseInt(porcentajeReservasUsuarioLocal(vecesQueEstuvoEnElLocal, local.cantidadDeReservasTotales));

                tBody += `     
                    <tr>
                        <td>
                        ${local.nombreLocal}
                        </td>
                        <td> 
                            ${vecesQueEstuvoEnElLocal} veces.
                        </td>
                        <td>
                        <p>${local.cantidadDeReservasTotales}</p>
                        </td>
                        <td>
                            <p>% ${porcentajeReservas} de reservas del local.</p>
                         </td>
                    </tr>
                `;
                
                idLocalesYaPrecargados.push(local.idUsuario);
            

                if (vecesQueEstuvoEnElLocal > maximoDestacado ){
                    localDestacado= local;
                    maximoDestacado = vecesQueEstuvoEnElLocal
                    document.querySelector('#h1LocalDestacado').innerHTML = "Local /es en el que ha reservado más veces: " + localDestacado.nombreLocal;
                } else if (vecesQueEstuvoEnElLocal == maximoDestacado){
                    document.querySelector('#h1LocalDestacado').innerHTML += " y " + local.nombreLocal;
                }
            } 
        }
    }

    document.querySelector('#tBodyInformacionEstadisticaUsuarioPersona').innerHTML = tBody;

}


    
function elLocalNoEstaEnElArray(array,idLocal){

    let retorno= true;

    for(let i= 0; i < array.length; i++){
        idActual= array[i];
        if(idActual == idLocal){
            retorno= false;
        }
    }

    return retorno;
}



    
/********************************************
    CONTENIDO DINAMICO USUARIO LOCAL
*********************************************/

function crearDivMiLocal() {
    precargarCalificaciones();
    crearTablaReservasPendientesMiLocal();
    crearCupoMaximoMiLocal();
    crearTablaInfoEstadisticaMiLocal();
    crearTablaDePromedios();
    crearBotonDeshabilitarLocal();

    agregarEventosDeClickEnButtonsDinamicos(".btnFinalizarReserva", btnFinalizarReservaHandler);
    agregarEventosDeClickEnButtonsDinamicos(".btnCambioCupoMaximo", btnCambioCupoMaximoHandler);
    agregarEventosDeClickEnButtonsDinamicos(".btnHabilitarLocal", btnHabilitarLocalHandler);
    agregarEventosDeClickEnButtonsDinamicos("#btnBuscarReservaPendiente", btnBuscarReservaPendienteHandler);

}


function crearTablaReservasPendientesMiLocal(){ 

    let localACrear = usuarioActualEnLaApp;

    //Thead de reservas Pendientes
    document.querySelector("#divRestaurantes").innerHTML= `
        <h3> Reservas Pendientes en ${localACrear.nombreLocal} </h3>
        <input type="text" id="buscarReservaPendiente" placeholder="Buscar por nombre de usuario">
        <input type="button" id="btnBuscarReservaPendiente" value="Buscar">
        <br><br>
        <table>
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Cantidad de Lugares</th>
                    <th>Estado</th>
                    <th>Finalizar reserva</th>
                </tr>
            </thead>
            <tbody id="bodyReservasPendLocal"></tbody>
            <p id="pMensajeBusquedaDeUnaReserva"></p>
        </table>
    `;
    
    //Muestro todas las reservas Pendientes del local.
    for (let i= 0; i< reservas.length; i++){
        reservaActual= reservas[i];
        if(reservaActual.idUsuarioLocal == localACrear.idUsuario){
            if(reservaActual.estadoReserva == "Pendiente"){
                document.querySelector("#bodyReservasPendLocal").innerHTML += `
                    <tr>
                        <td> ${reservaActual.nombreUsuario} </td>
                        <td> ${reservaActual.cantidadLugares} </td>
                        <td> ${reservaActual.estadoReserva} </td>
                        <td> <input type="button" class="btnFinalizarReserva" data-id=${reservaActual.idReserva} value="Finalizar"> </td>
                    </tr>
                `;              
            }
        }
    }
}
//Busqueda
function btnBuscarReservaPendienteHandler(){
    let nombreABuscar = document.querySelector('#buscarReservaPendiente').value;
    let mensaje = "";
    //si el contador sigue en 0 el nombreABuscar no es subcadena de los nombres de reservas pendientes
    let contador = 0;
    //controlo que no se repita la tabla ya creada.
    document.querySelector("#bodyReservasPendLocal").innerHTML = "";
    //Busco solo en las reservas Pendientes que sean subCadena del nombre y muestro la nueva tabla
    for (let i= 0; i< reservas.length; i++){
        reservaActual= reservas[i];
        if(reservaActual.idUsuarioLocal == usuarioActualEnLaApp.idUsuario){
            if(reservaActual.estadoReserva == "Pendiente"){
                if(encontrarSubCadenaEnTexto(reservaActual.nombreUsuario,nombreABuscar)) {

                    document.querySelector("#bodyReservasPendLocal").innerHTML += `
                        <tr>
                            <td> ${reservaActual.nombreUsuario} </td>
                            <td> ${reservaActual.cantidadLugares} </td>
                            <td> ${reservaActual.estadoReserva} </td>
                            <td> <input type="button" class="btnFinalizarReserva" data-id=${reservaActual.idReserva} value="Finalizar"> </td>
                        </tr>
                    `;
                    contador++;    
                } 
               
            }
        }
    }
    //Mensaje de error si no hay coincidencias
    if(contador == 0) {
        mensaje = `No se encontro reserva Pendiente con ese nombre`
    }

    document.querySelector('#pMensajeBusquedaDeUnaReserva').innerHTML = mensaje;

    agregarEventosDeClickEnButtonsDinamicos(".btnFinalizarReserva", btnFinalizarReservaHandler);

}

//Cambiar a finalizada
function btnFinalizarReservaHandler(){
    let reservaPorID= this.getAttribute("data-id");
    let mensaje = "";
    for (let i= 0; i< reservas.length; i++){
        reservaActual= reservas[i];
        if(reservaActual.idReserva == reservaPorID){

            reservaActual.estadoReserva= "Finalizada";

            let local= buscarUsuarioPorID(usuarios, reservaActual.idUsuarioLocal);
            local.lugaresOcupados-= reservaActual.cantidadLugares;

            mensaje = `La reserva de ${reservaActual.nombreUsuario} fue finalizada con exito.`;

            crearDivMiLocal();
        }
    }
    
    document.querySelector('#pMensajeBusquedaDeUnaReserva').innerHTML = mensaje;

}


function finalizarReserva() {

}


function crearCupoMaximoMiLocal(){ 
    let localACrear= usuarioActualEnLaApp;
    document.querySelector("#divRestaurantes").innerHTML+=`
        <br><br><hr>
        <div id="divCupoMaximo">
            <h3>Cupo Máximo del Local = ${localACrear.cupoMaximo} </h3> 
        </div>
        <br>
        <label for="txtCambioCupoMaximo">Modificar cupo máximo: </label>
        <br>
        <input type="number" id="txtCambioCupoMaximo" placeholder="Ingrese el nuevo cupo max">
        <input type="button" data-id=${localACrear.idUsuario} class="btnCambioCupoMaximo" value="Modificar">
        <p id="mensajeDeCambioCupoMaximo"></p>
        <hr>
    `;
    
}


//Cupo maximo
function btnCambioCupoMaximoHandler(){
    let nuevoCupoMax = document.querySelector("#txtCambioCupoMaximo").value;
    let mensaje = "";

    if(queElLocalNoTengaReservaPendiente(usuarioActualEnLaApp)) {

        if(!isNaN(nuevoCupoMax) && nuevoCupoMax > 0 ) {
            nuevoCupoMax = parseInt(nuevoCupoMax);
            usuarioActualEnLaApp.cupoMaximo = nuevoCupoMax ;
            document.querySelector("#divCupoMaximo").innerHTML= `<h3>Cupo Máximo del Local = ${usuarioActualEnLaApp.cupoMaximo} <h3> `;
            crearDivMiLocal();
        }

    } else {
        mensaje = "No pude cambiar el cupo maximo si tiene reservas Pendentes"
    }

    document.querySelector('#mensajeDeCambioCupoMaximo').innerHTML = mensaje;

    
}
    
//Estadisticas 
function crearTablaInfoEstadisticaMiLocal(){ 

    let localACrear = usuarioActualEnLaApp;
   
    let porcentajeOcupacion= (localACrear.lugaresOcupados * 100) / localACrear.cupoMaximo;

    let reservasFinalizadasLocal= 0;
    let reservasPendientesLocal= 0;

    let reservasCalificadas= 0;
    let totalPuntosCalificados= 0;
    
   
    for (let i= 0; i< reservas.length; i++){
        reservaActual= reservas[i];
        if(reservaActual.idUsuarioLocal == localACrear.idUsuario){
            //Cuento las finalizadas y pendientes
            if(reservaActual.estadoReserva == "Finalizada"){
                reservasFinalizadasLocal+= 1;
    
                //Si está calificada sumo los puntos de las calificaciones para luego hacer su promedio
                if(reservaActual.calificacion != null){
                    totalPuntosCalificados += reservaActual.calificacion;
                    reservasCalificadas += 1;
                }
                    
            } else if(reservaActual.estadoReserva == "Pendiente") {
                reservasPendientesLocal+= 1;
            }          
        }
       
    }

    let promedioDeCalificacionLocal = parseInt(totalPuntosCalificados / reservasCalificadas);

    if(isNaN(promedioDeCalificacionLocal)) {
        promedioDeCalificacionLocal = 0;
    }
 
   
    document.querySelector("#divRestaurantes").innerHTML+= `
            <h3>Información estadística de Mi Local</h3>
            <table>
              <thead>
                    <tr>
                        <th>Cupo Máximo</th>
                        <th>Lugares Ocupados</th>
                        <th>% de Ocupación</th>
                    </tr>
                </thead>
                <tbody id="bodyTablaInfoLocal1">
                    <tr>
                        <td> ${localACrear.cupoMaximo} </td>
                        <td> ${localACrear.lugaresOcupados} </td>
                        <td> ${parseInt(porcentajeOcupacion)}%</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>Total Reservas</th>
                        <th>Reservas Finalizadas</th>
                        <th>Reservas Pendientes</th>
                    </tr>
                </thead>
                <tbody id="bodyTablaInfoLocal2">
                <td> ${localACrear.cantidadDeReservasTotales} </td>
                <td> ${reservasFinalizadasLocal} </td>
                <td> ${reservasPendientesLocal} </td>
                </tbody>
            </table>
            <br>
            <hr>
            <br>

            <table>
                <thead>
                    <tr>
                        <th>Promedio de calificaciones de mi local</th>   
                    </tr>
                </thead>
                <tbody id="bodyTablaInfoLocal3">
                    <tr>
                        <td> ${promedioDeCalificacionLocal} </td>
                </tbody>
            </table> 
            <br>
            <hr>
    `;
        
}

//Promedio de  calificacion de todos los locales
function crearTablaDePromedios(){
    document.querySelector("#divRestaurantes").innerHTML+= `
        <table>
            <thead>
                <tr>
                    <th>Local</th>
                    <th>Promedio de calificaciones</th>
                </tr>
            </thead>
            <tbody id="bodyPromedioCalificaciones"></tbody>
        </table>
    `;

    for (let i=0 ; i<usuarios.length; i++){
        let usuarioActual= usuarios[i];
        if (usuarioActual.tipoDeUsuarioId == 2 && usuarioActual.idUsuario != usuarioActualEnLaApp.idUsuario){
            document.querySelector("#bodyPromedioCalificaciones").innerHTML+= `
                <tr>
                    <td> ${usuarioActual.nombreLocal} </td>
                    <td> ${parseInt(usuarioActual.totalPuntosCalificados/usuarioActual.reservasCalificadas)} </td>
                <tr>    
            `;
        }
    }
}



function crearBotonDeshabilitarLocal(){   
    let localACrear= usuarioActualEnLaApp;

    let textoBotonHabilitarLocal = "Deshabilitar local";
    let textopLocalHabilitado= "Local habilitado";
   
    if(!localACrear.habilitado){
        textoBotonHabilitarLocal= "Habilitar local";
        textopLocalHabilitado= "Local deshabilitado";
    }
   
    document.querySelector("#divRestaurantes").innerHTML+= `
        <br>
        <hr>
        <h3>Habilitar o deshabilitar local</h3>
        <p id="pLocalHabilitado">${textopLocalHabilitado}</p>
        <input type="button" data-id=${localACrear.idUsuario} class="btnHabilitarLocal" value=${textoBotonHabilitarLocal}>
    `;

}

//Disponibilidad
function btnHabilitarLocalHandler(){
    let localPorID = this.getAttribute("data-id");
    let localEncontrado= buscarUsuarioPorID(usuarios, localPorID);
    
    if(localEncontrado.habilitado == false){
        localEncontrado.habilitado = true;
        document.querySelector("#pLocalHabilitado").innerHTML = "Local habilitado";        
    } else {
        localEncontrado.habilitado = false;
        document.querySelector("#pLocalHabilitado").innerHTML= "Local deshabilitado";
    }

    crearDivMiLocal();
}

/***********************
  FUNCIONES IMPORTANTES
************************/

function actualizarMenuPorTipoDeUsuario(usuLogeado) {
    if (usuLogeado) {
        switch (usuLogeado.tipoDeUsuarioId) {
            case 1:
                mostrarDivHome();
                mostrarMenuDeUsuarioPersona();
                break;
            case 2:
                btnMenuMiLocalHandler();
                mostrarMenuDeUsuarioLocal();
                break;
            default:
                mostrarMenuUsuarioNoLogueado();
                break;
        }
    } else {
        mostrarMenuUsuarioNoLogueado();
    }
}


function buscarUsuarioPorNombre(array, nombre) {

    let resultado = null;

    let i = 0;
    while (resultado == null && i < array.length) {

        let usuarioActual = array[i];

        if (usuarioActual.nombreUsuario == nombre) {

            resultado = usuarioActual;

        }

        i++;
    }

    return resultado;
}

function buscarReservaPorId(array, id) {

    let resultado = null;

    let i = 0;
    while (resultado == null && i < array.length) {

        let usuarioActual = array[i];

        if (usuarioActual.idReserva == id) {

            resultado = usuarioActual;

        }

        i++;
    }

    return resultado;
}


function buscarUsuarioPorID(array, id) {

    let resultado = null;

    let i = 0;
    while (resultado == null && i < array.length) {

        let usuarioActual = array[i];

        if (usuarioActual.idUsuario == id) {

            resultado = usuarioActual;

        }

        i++;
    }

    return resultado;
}

function agregarEventosDeClickEnButtonsDinamicos(clase,funcion) {
    // obtengo todos los bottones con esa class
    let arrayDeBotones = document.querySelectorAll(`${clase}`);
    //le agrego evento de click a todos los bottones
    for(let i = 0; i < arrayDeBotones.length; i++){
        botonActual = arrayDeBotones[i];
        botonActual.addEventListener("click", funcion);
    }
}

function validarIngresoDeUsuario(nombreUsu,contra,nombre) {
    let retorno = false;
    //si el nombre de usuario esta disponible, password con todos los requisitos, e ingreso el nombre. 
    if(buscarUsuarioPorNombre(usuarios,nombreUsu) == null && contraseñaValida(contra) && nombre != "") {
        retorno = true;
    } 

    return retorno;
}


function ingresarUsuarioPersona(nombreDeUsuario, password, nombre) {
    if(validarIngresoDeUsuario(nombreDeUsuario,password,nombre)) {
        let nombreUsu = nombreDeUsuario.toLowerCase();
        let nuevoUsuario = new UsuarioPersona(nombreUsu, password, nombre)
        usuarios.push(nuevoUsuario);
    } else {
        console.log("Error usuario no valido -" + nombreDeUsuario)
    }
  
}

function ingresarUsuarioLocal(nombreDeUsuario, password, nombre, imagenLocal, direccionLocal) {
    if(validarIngresoDeUsuario(nombreDeUsuario,password,nombre) && imagenLocal!= null && direccionLocal != null) {
        let nombreUsu = nombreDeUsuario.toLowerCase();
        let nuevoUsuarioLocal = new UsuarioLocal(nombreUsu, password, nombre,imagenLocal, direccionLocal)
        usuarios.push(nuevoUsuarioLocal);
    } else {
        console.log(`Error: ${nombre} no cumple con los datos`)
    }
}


function ingresarReservaAlArray(nombreUsuarioLogueado, idUsuarioLocal, cantidadLugaresIng, estadoIng) {
    // Valido que el usuario y el local a reservar existan 
    if(verificarQueLaPersonaYLocalExistan(nombreUsuarioLogueado,idUsuarioLocal)){
        //valido que el usuario no tenga mas de una reserva pendiente en un local.
        if(personaSinReservasPendientesEnMismoLocal(nombreUsuarioLogueado,idUsuarioLocal)) {
            let nuevaReserva = new Reservas(nombreUsuarioLogueado, idUsuarioLocal, cantidadLugaresIng, estadoIng)
            reservas.push(nuevaReserva);

            //actualizo info para Estadisticas
            let local = buscarUsuarioPorID(usuarios,idUsuarioLocal)
            local.cantidadDeReservasTotales+= 1;

            local.lugaresOcupados += cantidadLugaresIng;
        
            if(estadoIng == "Finalizada"){
                local.lugaresOcupados -= cantidadLugaresIng;
            }

            deshabilitacionAutomaticaAlLlenarse(local);

        } 
    
    } 
   
}


//Precarga de datos
function precargarDatos() {
    precargarUsuarios();
    precargarReservas();
}

function precargarUsuarios() {
    ingresarUsuarioLocal("pasiva","Hola1234", "Restaurante La Pasiva", "<img src= 'imagenes/foto4.jpg'>", "Av. Italia 1298");
    ingresarUsuarioLocal("continental", "Hola1234", "Restaurante El Continental", "<img src= 'imagenes/foto5.jpg'>", "Gral.Flores 7777");
    ingresarUsuarioLocal("donosvaldo", "Hola1234", "Restaurante Don Osvaldo", "<img src= 'imagenes/foto6.jpg'>", "Gallinal 2323");
    ingresarUsuarioLocal("artesvisuales", "Hola1234", "Museo de Artes Visuales", "<img src= 'imagenes/foto2.jpg'>", "Garzón 1231");
    ingresarUsuarioLocal("museocontemporaneo", "Hola1234", "Museo Contemporáneo"," <img src= 'imagenes/foto7.jpg'>", "Cuareim 4444");
    ingresarUsuarioLocal("elgalpon", "Hola1234", "Teatro El Galpón", "<img src= 'imagenes/foto8.jpg'>", "Sarmiento 1215");
    ingresarUsuarioLocal("europa", "12Hola123434", "Teatro Europa", "<img src= 'imagenes/foto9.jpg'>","Durán 2666");   
    ingresarUsuarioPersona("juanma23", "Hola1234", "Juan Manuel");
    ingresarUsuarioPersona("bruno24", "Hola1234", "Bruno");
    ingresarUsuarioPersona("diego33", "Hola1234", "Atajo");
    ingresarUsuarioPersona("pepito22", "Hola1234", "Pepito");
    ingresarUsuarioPersona("isabel44", "Hola1234", "Isabel");
    ingresarUsuarioPersona("batman", "Hola1234", "Bruno");
    ingresarUsuarioPersona("daddyyankee", "Gasolina123", "Daddy");
    ingresarUsuarioPersona("javier2", "Hola1234", "Javier");
    ingresarUsuarioPersona("clara56", "Hola1234", "Clara");

   
}

function precargarReservas(){  
    //Reserva Para todos los locales 
                              //idLocal,lugares
    ingresarReservaAlArray("diego33", 1, 2, "Finalizada"); 
    ingresarReservaAlArray("diego33", 1, 4, "Finalizada"); 
    ingresarReservaAlArray("diego33", 2, 6, "Finalizada"); 
    ingresarReservaAlArray("diego33", 3, 18, "Finalizada"); 
    ingresarReservaAlArray("diego33", 3, 4, "Finalizada"); 
    ingresarReservaAlArray("diego33", 7, 4, "Finalizada"); 

    
    ingresarReservaAlArray("bruno24", 4, 7, "Finalizada");
    ingresarReservaAlArray("bruno24", 5, 2, "Finalizada"); 
    ingresarReservaAlArray("bruno24", 6, 12, "Finalizada"); 
    
    ingresarReservaAlArray("juanma23", 1, 2, "Finalizada"); 
    ingresarReservaAlArray("juanma23", 1, 2, "Finalizada"); 
    //3 usuarios persona con reservas pendientes
    ingresarReservaAlArray("batman", 6, 2, "Pendiente"); 
    ingresarReservaAlArray("isabel44", 3, 4, "Pendiente");
    ingresarReservaAlArray("daddyyankee", 5, 6, "Pendiente");  
    //3 usuarios persona con reservas pendientes y finalizadas
    ingresarReservaAlArray("bruno24", 1, 6, "Finalizada");
    ingresarReservaAlArray("juanma23", 2, 3, "Finalizada"); 
    ingresarReservaAlArray("pepito22", 3, 5, "Finalizada");
    ingresarReservaAlArray("bruno24", 1, 4,  "Pendiente");
    ingresarReservaAlArray("juanma23",2, 12, "Pendiente");
    ingresarReservaAlArray("pepito22", 3, 5, "Pendiente"); 

    //3 usuarios persona sin reserva



    ingresarReservaAlArray("juanma23", 7, 12, "Pendiente");
    ingresarReservaAlArray("juanma23", 1, 12, "Finalizada");


}

function precargarCalificaciones(){
                    //ptos,idReserva
    calificarUnaReserva(2, 1);
    calificarUnaReserva(2, 2);
    calificarUnaReserva(2, 3);
    calificarUnaReserva(5, 4);
    calificarUnaReserva(5, 5);
    calificarUnaReserva(2, 6);
    calificarUnaReserva(1, 7);
    calificarUnaReserva(3, 8);
    calificarUnaReserva(3, 9);
}





function elementoUnico(arrayElementos, elemento) {

    let retorno = true;
 
    for(let i = 0; i < arrayElementos.length; i++) {
 
        let elementoActual = arrayElementos[i];
 
        if(elementoActual == elemento ) {
            retorno = false;
        }
    }
 
    return retorno;
}


function vecesQueElUsuarioPersonaEstuvoEnUnLocal(nombreDeUsuario, local){

    let vecesQueEstuvo = 0;

    for (let i = 0; i < reservas.length; i++){

        reservaActual = reservas[i];
        
        if(reservaActual.nombreUsuario == nombreDeUsuario && reservaActual.estadoReserva == "Finalizada"){

            if(reservaActual.idUsuarioLocal == local.idUsuario) {
                vecesQueEstuvo += 1;
            }
        }

    }

    return vecesQueEstuvo;

}

function obtenerLugaresDisponibles(uLocal) {
    return (uLocal.cupoMaximo - uLocal.lugaresOcupados);
}

function verificarQueLaPersonaYLocalExistan(nombreUsu,idLocal) {
    return buscarUsuarioPorNombre(usuarios,nombreUsu) != null && buscarUsuarioPorID(usuarios,idLocal) != null;

}

function personaSinReservasPendientesEnMismoLocal(nUsuario,idLocal) {
    
    let retorno = true;

    for(let i = 0; i < reservas.length; i++) {
        reservaActual = reservas[i];
        if(reservaActual.nombreUsuario == nUsuario) {
            if(reservaActual.idUsuarioLocal == idLocal && reservaActual.estadoReserva == "Pendiente") {
                retorno = false;
            }
        }
    }

    return retorno;

}
//Cupo maximo
function deshabilitacionAutomaticaAlLlenarse(pLocal) {
    if(pLocal.lugaresOcupados == pLocal.cupoMaximo) {
        pLocal.habilitado = false;
    }

}

function queElLocalNoTengaReservaPendiente(local) {

    let retorno = true;

    for(let i = 0; i < reservas.length; i++) {
        let reservaActual = reservas[i];
        if(reservaActual.idUsuarioLocal == local.idUsuario && reservaActual.estadoReserva == "Pendiente") {
            return false;
        }
    }

    return retorno;
}

function porcentajeReservasUsuarioLocal(vecesQueEstuvo, cantidadDeReservasLocal){
    let porcentajeReservaUsuarioLocal= (vecesQueEstuvo * 100) / cantidadDeReservasLocal;
        
    return porcentajeReservaUsuarioLocal;
}


function encontrarSubCadenaEnTexto(texto,subCadena){
    let retorno = false;
    let j = 0;  
    let i = 0;

    while(i < texto.length && j < subCadena.length){

        if(texto[i] == subCadena[j]){
            j++;

        } else {
            j = 0;
        }

        i++;
    }
    
    if(j == subCadena.length) {
        retorno = true;
    }

    return retorno;
}


// validacion que pide la letra.
function contraseñaValida(contraseña) {
    let mayusculas = 0;
    let minusculas = 0;
    let contadorNumeros = 0;

    let retorno = false;

    if (contraseña.length >= 6) {


        for (let i = 0; i < contraseña.length; i++) {

            let caracterActual = contraseña[i];

            if (isNaN(caracterActual)) {

                if (caracterActual == caracterActual.toLowerCase()) {
                    minusculas++;
                }
                if (caracterActual == caracterActual.toUpperCase()) {
                    mayusculas++;
                }


            } else {
                contadorNumeros++;
            }

        }

        if (mayusculas > 0 && minusculas > 0 && contadorNumeros > 0) {

            retorno = true;

        }

        return retorno;
    }


}