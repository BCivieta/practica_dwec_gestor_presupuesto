import * as gesPres from "./gestionPresupuesto.js";
function mostrarDatoEnId(idElemento, valor){

    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){

    let divIdElemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");
    if (divIdElemento){
        divIdElemento.appendChild(divGasto);
    }
    

    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add ("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = new Date (gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    
    for(let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        spanEtiqueta.textContent = etiqueta + ",";

        let etiquetaEvento= new BorrarEtiquetasHandle(gasto,etiqueta);
        spanEtiqueta.addEventListener("click", etiquetaEvento);

        divEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divEtiquetas);

    let botonEditar = document.createElement("button");
    botonEditar.classList.add("gasto-editar");
    botonEditar.setAttribute("type","button");
    botonEditar.textContent= "Editar";

    let eventoEditar= new EditarHandle(gasto);

    botonEditar.addEventListener("click", eventoEditar);
    divGasto.appendChild(botonEditar);

    let botonBorrar= document.createElement("button");
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.setAttribute("type","button");

    let eventoBorrar= new BorrarHandle(gasto);
    botonBorrar.addEventListener("click", eventoBorrar);
    botonBorrar.textContent="Borrar";
    divGasto.appendChild(botonBorrar);

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divIdElemento = document.getElementById(idElemento);
    let divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion");
    divIdElemento.appendChild(divAgrup);


    let titulo=document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrup.appendChild(titulo);

    for(let [clave, valor] of Object.entries(agrup)){
        let divAgrupDato = document.createElement("div");
        divAgrupDato.classList.add("agrupacion-dato");

        let spanDatoClave = document.createElement("span");
        spanDatoClave.classList.add("agrupacion-dato-clave");
        spanDatoClave.textContent= clave;
        divAgrupDato.appendChild(spanDatoClave);

        let spanDatoValor = document.createElement("span");
        spanDatoValor.classList.add("agrupacion-dato-valor");
        spanDatoValor.textContent=valor;
        divAgrupDato.appendChild(spanDatoValor);

        divAgrup.appendChild(divAgrupDato);
    }
}
function repintar(){
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "";
    for(let gasto of gesPres.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",gasto);
    }
}
function actualizarPresupuestoWeb(){
    let nuevoPresupuestoString = prompt("Introduce un presupuesto");
    let nuevoPresupuestoNumbre = parseFloat(nuevoPresupuestoString);
    gesPres.actualizarPresupuesto(nuevoPresupuestoNumbre);
    repintar();

}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb)//Se pasa solo la eferencia referencia ala funcion(sin parametros)

function nuevoGastoWeb(){
    let descripcion = prompt("Introduce la descripción del gasto");
    let valorString = prompt ("Introduce un valor");
    let valorNumber = parseFloat(valorString);
    let fecha = prompt ("Introduce una fecha. Formato yyyy-mm-dd ");
    let etiquetasString = prompt("Introduce las etiquetas separadas por comas");
    let etiquetasArray = etiquetasString.split(",");

    let gasto = new gesPres.CrearGasto(descripcion, valorNumber, fecha, ...etiquetasArray);
    gesPres.anyadirGasto(gasto);

    repintar();
}

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(gasto){
    this.handleEvent = function (event){
        this.gasto=gasto;
        let descripcion = prompt("Introduce la nueva descripción");
        let valorString= prompt ("introduce un nuevo valor");
        let valor= parseFloat(valorString);
        let fecha = prompt("Introduce una nueva fecha. Formato yyyy-mm-dd ")
        let etiquetasString = prompt("Introduce las nuevas etiquetas separadas por comas");
        let etiquetas=etiquetasString.split(",");

        gasto.actualizarDescripcion(descripcion)
        gasto.actualizarValor(valor);
        gasto.actualizarFecha(fecha);
        gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}
 function BorrarHandle(gasto){
    this.handleEvent= function (event){
        this.gasto=gasto;
        gesPres.borrarGasto(gasto.id);
        repintar();
    }
 }

function BorrarEtiquetasHandle(gasto, etiqueta){
    this.handleEvent = function(){
        this.gasto= gasto;
        this.etiqueta= etiqueta;
        gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
};