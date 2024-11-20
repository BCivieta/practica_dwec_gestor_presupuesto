function mostrarDatoEnId(valor, idElemento){

    let idElemento = document.getElementById(id);
    idElemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){

    let idElemento = document.getElementById(id);
    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add ("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;

    let divFecha = document.createElement("div");
    divFecha.classList.add("gasto-fecha");
    divFecha.textContent = new Date (gasto.fecha).toLocaleDateString();

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    
    for(let etiqueta of gasto) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        spanEtiqueta.textContent = etiqueta + ",";
    }

    let







}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
};