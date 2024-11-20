function mostrarDatoEnId(valor, idElemento){

    let idElemento = document.getElementById(id);
    idElemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){

    let divIdElemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

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
    
    for(let etiqueta of gasto) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        spanEtiqueta.textContent = etiqueta + ",";

        divEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divEtiquetas);
    divIdElemento.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divIdElemento = document.getElementById(idElemento);
    let divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion");

    let h1=document.createElement("h1");
    h1.textContent = "Gastos agrupados por "+ periodo;
    divAgrup.appendChild(h1);

    for(let [clave, valor] of Object.entries(agrup)){
        let divAgrupDato = document.createElement("div");
        divAgrupDato.classList.add("agrupacion-dato");

        let spanDatoClave = document.createElement("span");
        spanDatoClave.classList.add("agrupacion-dato-clave");
        divAgrupDato.appendChild(spanDatoClave);

        let spanDatoValor = document.createElement("span");
        spanDatoValor.classList.add("agrupacion-dato-valor");
        divAgrup.appendChild(spanDatoValor);

        divAgrup.appendChild(divAgrupDato);
    }
    divIdElemento.appendChild(divAgrup);
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
};