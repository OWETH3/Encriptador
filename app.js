//Funcion para obtener elementos del HTML
const $ = element => document.querySelector(element);

//Elementos del DOM
const encriptador = $('#btn-encriptar');
const desencriptar = $("#btn-desencriptar");
const imputText = $("#entrada-texto");
const outText = $(".salida-texto");
const aside = $(".container");
const parrafoSalida = $("#parrafo-salida");
const copiar = $(".copiar");

//**********Funciones****************

function encriptarTexto(texto){
    const vocales = {
        'a' : "a%",
        'e': "enter",
        'i': "imes",
        'o': "ober",
        'u': "ufat"
    }
    for (const vocal in vocales) {
        texto = texto.replace(RegExp(vocal, 'g'), vocales[vocal]);
    }

    return texto;
}
function desencriptarTexto(texto) {

    texto = texto.replace(/a%/g,"a");
    texto = texto.replace(/enter/g ,"e");
    texto = texto.replace(/imes/g ,"i");
    texto = texto.replace(/ober/g ,"o");
    texto = texto.replace(/ufat/g ,"u");
    
    // const palabras = {
    //     'a%' : "a",
    //     'enter': "e",
    //     'imes': "i",
    //     'ober': "o",
    //     'ufat': "u"
    // }
    // for (const palabra in palabras) {
    //     const expresionRegular = new RegExp(`/\b(${palabra})\b/`, 'g');
    //     texto = texto.replace(expresionRegular, palabras[palabra]);
    // }
    return texto;
} 

function estadoBotones(bool){
    if (bool) {
        encriptador.removeAttribute("disabled", "disabled");
        desencriptar.removeAttribute("disabled", "disabled");
    }else{
        encriptador.setAttribute("disabled", "disabled");
        desencriptar.setAttribute("disabled", "disabled");
    }
}
function escribirTexto(texto) {
    let arrayTexto = texto.split("");
    let contador = 0;
    let intervalos;

    if (contador < arrayTexto.length) {
        estadoBotones(false)

        intervalos = setInterval(() => {
            parrafoSalida.textContent += arrayTexto[contador];
            contador++;
            
            if (contador >= arrayTexto.length) {
                clearInterval(intervalos);
                contador=0;

                estadoBotones(true);

                copiar.style.display='inline-block';
            }
    }, 5);
    } else{
        alert('Ha ocurrido un error en nuesto sistema, intentalo mas tarde.');
    }
}
function btnuniversal(texto, funcion){

    if(!imputText.value){
        alert('Por favor ingresa una frase o palabra para continuar.')
    }
    else{
        imputText.value = "";

        aside.style.display = "none";
        outText.style.display = "block";

        let msj=funcion(texto);
        parrafoSalida.textContent="";

        return escribirTexto(msj);
    }
};
function Copiar(){
    const imgcopiar='<img src="Recursos/Icon/Sin título-1.png" alt="Botoncopiar">';
    const imgcopiado='<img src="Recursos/Icon/Sin título-2.png" alt="Botoncopiado">';

    let texto = outText.textContent.trim().replace(/\s+/g, ' ');

    navigator.clipboard.writeText(texto);
    copiar.innerHTML=imgcopiado;
    copiar.style.backgroundColor="rgba(183, 187, 187, 0.867)";

    setTimeout(() => {
        copiar.innerHTML=imgcopiar;
        copiar.style.backgroundColor="white";
    }, 3000);
}

//Eventos
encriptador.addEventListener("click", ()=>{
    btnuniversal(imputText.value, encriptarTexto);
});
desencriptar.addEventListener("click", ()=>{
    btnuniversal(imputText.value, desencriptarTexto);
});
copiar.addEventListener("click", ()=>{
    Copiar();
});
