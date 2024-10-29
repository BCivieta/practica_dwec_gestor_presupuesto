"use strict"

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos=[];
let idGastos=0;


function actualizarPresupuesto(nuevoPresupuesto) {
    
    if(isNaN (nuevoPresupuesto) || nuevoPresupuesto <0) {
        return -1;
    }else {
        presupuesto=nuevoPresupuesto;
        return presupuesto;
    }
    
}

function mostrarPresupuesto() {
    
   return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha,...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (isNaN(valor)||valor<0) ? 0 : valor;
    this.fecha = (!fecha || isNaN(Date.parse(fecha))) ? Date.now() : Date.parse(fecha);
    this.etiquetas= (!etiquetas)? [] : etiquetas;

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
   this.mostrarGastoCompleto = function(){
        
        let texto= this.mostrarGasto ()+`.\nFecha: ${new Date (this.fecha).toLocaleString()}\nEtiquetas:\n`;
        this.etiquetas.forEach(etiqueta => {
            texto+=`- ${etiqueta}\n`;
        });
        return texto;
   }
    this.actualizarDescripcion = function (nuevaDescripcion){
        this.descripcion=nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor){
        if(!isNaN(nuevoValor) & nuevoValor >= 0){
            this.valor=nuevoValor;
        }  
    }
    this.actualizarFecha = function (fecha){
        this.fecha= Date.parse(fecha) || this.fecha;
    }
    this.anyadirEtiquetas = function (...etiquetasNuevas){
        etiquetasNuevas.forEach(etiquetaNueva => {
            if( ! this.etiquetas.includes(etiquetaNueva)){
                this.etiquetas.push(etiquetaNueva)
            }       
        }) 
    }
    this.borrarEtiquetas = function (...etiquetasBorrar){
        this.etiquetas=this.etiquetas.filter(etiqueta =>
            !etiquetasBorrar.includes(etiqueta))
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gastoNuevo){
    gastoNuevo.id=idGastos;
    idGastos++;
    gastos.push(gastoNuevo)
}

function borrarGasto(idBuscado){
    let idIndicado = gastos.findIndex (gasto => gasto.id===idBuscado);
    if(idIndicado !== -1){
        gastos.splice(idIndicado,1);
    }
}

function calcularTotalGastos(){
    let suma= gastos.reduce((total, gasto) => total + gasto.valor, 0)
    return suma;
}

function calcularBalance(){
    let balance= presupuesto - calcularTotalGastos();
    return balance;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
