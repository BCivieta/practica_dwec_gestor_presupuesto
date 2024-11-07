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

    this.obtenerPeriodoAgrupacion = function (periodo){
        let fecha = new Date (this.fecha).toISOString()

        if(periodo==`dia`)
        {
            return fecha.substring(0,10);
        }
        if(periodo==`mes`)
        {
            return fecha.substring(0,7);
        }
        if(periodo==`anyo`)
        {
            return fecha.substring(0,4);
        }
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
//CODIGO QUE PASA EL TEST PERO QUE NO ASEGURA QUE SOLO LOS GASTOS QUE PASEN TODOS LOS FILTROS ESTEN DENTRO DEL NUEVO ARRAY
/*function filtrarGastos(filtro){
   
    return gastos.filter(function(gasto){

        let dentro = true;
        if(filtro.fechaDesde!=undefined) 
        {
            if(gasto.fecha < Date.parse(filtro.fechaDesde)) dentro= false;
            //}else dentro=false;
        }
        if(filtro.fechaHasta != undefined)
        {
            if(gasto.fecha > Date.parse(filtro.fechaHasta)) dentro = false;
           // }else dentro=false;
        }   
        if (filtro.valorMinimo!= undefined)
        {
            if(gasto.valor < filtro.valorMinimo) dentro = false;
        }
        if(filtro.valorMaximo != undefined )
        {
            if( gasto.valor > filtro.valorMaximo) dentro= false;
        }
        if(filtro.descripcionContiene != undefined)
        {
            if (!gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) dentro = false;
        }
        if(filtro.etiquetasTiene != undefined)
        {
            let etiquetasGastoMinus= gasto.etiquetas.map(elemento=> elemento.toLowerCase());        //Itera sobre cada elemento y ejecuta la funcion (que convierte en minúsculas)
            let etiquetasFiltroMinus= filtro.etiquetasTiene.map(elemento=> elemento.toLowerCase()); //sobre cada uno. Devulve el nuevo array.
            if(!etiquetasGastoMinus.some(elemento=>etiquetasFiltroMinus.includes(elemento))) //Itera sobre cada elemento para ver si alguno cumple con una condicion dada. 
            {                                                                                //devuelve true o false. Se detiene con el primero que cumpla
                    dentro = false;
            }
        }
        return dentro;//devolvemos si el gasto esta dentro del nuevo array o no.
    });
}*/
function filtrarGastos(filtro){
   
    return gastos.filter(function(gasto){

        if(!filtro) return true//si no exixte parametro filtro, el gasto entra en el array filtrado.
        let dentro = true; // establecemos la entrada en el nuevo array como true, y pasaremos a false si no cumple con algun parametro de filtrado que exista.
        if(filtro.fechaDesde!=undefined && gasto.fecha < Date.parse(filtro.fechaDesde))//comenzamos a comprobar si el gasto pasa los filtros
        {                                                                              //si existe este filtro y lo pasa, no entra en el if y pasa a la siguiente condicion de filtrado
            dentro = false;                                                            //si no pasa el filtro entra en el if, decuelve false y ya 
        }                                                                              //no entrará en a siguiente condición. finalmente dentro valdra false y no entrara en el nuevo array.
        else if (filtro.fechaHasta != undefined && gasto.fecha > Date.parse(filtro.fechaHasta))
        {
            dentro = false;
        } 
        else if (filtro.valorMinimo!= undefined && gasto.valor < filtro.valorMinimo)
        {
            dentro = false;
        }
        else if(filtro.valorMaximo != undefined && gasto.valor > filtro.valorMaximo)
        {
            dentro= false;
        } 
        else if(filtro.descripcionContiene != undefined && !gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) 
        {
            dentro = false;
        }
        else if(filtro.etiquetasTiene != undefined)
        {
            let etiquetasGastoMinus= gasto.etiquetas.map(elemento=> elemento.toLowerCase());        //Itera sobre cada elemento y ejecuta la funcion (que convierte en minúsculas)
            let etiquetasFiltroMinus= filtro.etiquetasTiene.map(elemento=> elemento.toLowerCase()); //sobre cada uno. Devulve el nuevo array.
            if(!etiquetasGastoMinus.some(elemento=>etiquetasFiltroMinus.includes(elemento))) //Itera sobre cada elemento para ver si alguno cumple con una condicion dada. 
            {                                                                                //devuelve true o false. Se detiene con el primero que cumpla
                    dentro = false;
            }
        }
        return dentro;//si el gasto no ha entrado en ninguna condicion porque pasaba todos los filtros, dentro no se modifica y se devuelve true. El gasto fomará parte del nuevo array.
    });
}

function agruparGastos(periodo, fechaDesde, fechaHasta, etiquetas){
    
    let agruparGastosEn={ 
        fechaDesde : fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas
    };
    let gastosFiltrados = filtrarGastos(agruparGastosEn);
    
    let gastosPorPeriodo = gastosFiltrados.reduce(function(acumulador, gasto){

        let periodoElegido = gasto.obtenerPeriodoAgrupacion(periodo);

        acumulador[periodoElegido] = acumulador[periodoElegido] || 0;
        acumulador[periodoElegido] += gasto.valor;

        return acumulador;
    },{})
    return gastosPorPeriodo;
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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
}
