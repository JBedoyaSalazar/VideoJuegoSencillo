let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego(){
    let botonMascotaJugador = document.getElementById("botonMascota")

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    let botonFuego = document.getElementById("botonFuego")
    let botonAgua = document.getElementById("botonAgua")
    let botonTierra = document.getElementById("botonTierra")

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
}

function seleccionarMascotaJugador(){

    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let inputLangostelvis = document.getElementById("langostelvis")
    let inputTucapalma = document.getElementById("tucapalma")
    let inputPydos = document.getElementById("pydos")
    let spanMascotaJugador = document.getElementById("nombreMascotaJugador")

    if(inputHipodoge.checked){
        alert("Seleccionaste a Hipodoge")
        spanMascotaJugador.innerHTML = "Hipodoge"
    }else if(inputCapipepo.checked){
        alert("Seleccionaste a Capipepo")
        spanMascotaJugador.innerHTML = "Capipepo"
    }else if(inputRatigueya.checked){
        alert("Seleccionaste a Ratigueya")
        spanMascotaJugador.innerHTML = "Ratigueya"
    }else if(inputLangostelvis.checked){
        alert("Seleccionaste a Langostelvis")
        spanMascotaJugador.innerHTML = "Langostelvis"
    }else if(inputTucapalma.checked){
        alert("Seleccionaste a Tucapalma")
        spanMascotaJugador.innerHTML = "Tucapalma"
    }else if(inputPydos.checked){
        alert("Seleccionaste a Pydos")
        spanMascotaJugador.innerHTML = "Pydos"
    }else{
        alert("No has seleccionado nunguna mascota, ERROR!!")
    }

    seleccionarMascotaEnemigo()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(){

    let spanMascotaEnemigo = document.getElementById("nombreMascotaEnemigo")
    let random = aleatorio(1, 6)

    if(random == 1){
        alert("El enemigo seleccionó a Hipodoge")
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    }else if(random == 2){
        alert("El enemigo seleccionó a Capipepo")
        spanMascotaEnemigo.innerHTML = "Capipepo"
    }else if(random == 3){
        alert("El enemigo seleccionó a Ratigueya")
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }else if(random == 4){
        alert("El enemigo seleccionó a Langostelvis")
        spanMascotaEnemigo.innerHTML = "Langostelvis"
    }else if(random == 5){
        alert("El enemigo seleccionó a Tucapalma")
        spanMascotaEnemigo.innerHTML = "Tucapalma"
    }else{
        alert("El enemigo seleccionó a Pydos")
        spanMascotaEnemigo.innerHTML = "Pydos"
    }
}

function ataqueFuego(){
    ataqueJugador = "Fuego"
    ataqueEnemigoAleatorio()
}

function ataqueAgua(){
    ataqueJugador = "Agua"
    ataqueEnemigoAleatorio()
}

function ataqueTierra(){   
    ataqueJugador= "Tierra"
    ataqueEnemigoAleatorio()
}

function ataqueEnemigoAleatorio(){
    let random = aleatorio(1, 3)
    if(random == 1){
        ataqueEnemigo = "Fuego"
    }else if(random == 2){
        ataqueEnemigo = "Agua"
    }else{
        ataqueEnemigo = "Tierra"
    }

    crearMensaje()
}


function crearMensaje(){

    let sectionMensajes = document.getElementById("mensajes")
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu mascota ataco con "+ataqueJugador+" y el enemigo ataco con "+ataqueEnemigo+" - "+ combate()

    sectionMensajes.appendChild(parrafo)
}

function combate(){

    let spanVidasJugador = document.getElementById("vidasJugador")
    let spanVidasEnemigo = document.getElementById("vidasEnemigo")

    let mensaje =""

    if(ataqueJugador == ataqueEnemigo){
        mensaje = "Empate"
    }else if(ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra"){
        mensaje = "Ganaste"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(ataqueJugador == "Agua" && ataqueEnemigo == "Fuego"){
        mensaje = "Ganaste"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if(ataqueJugador == "Tierra" && ataqueEnemigo == "Agua"){
        mensaje = "Ganaste"
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        mensaje = "Perdiste"
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
    
    return mensaje
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        alert("Ganaste el juego")
    }else if(vidasJugador == 0){
        alert("Perdiste el juego")
    }
}

window.addEventListener("load", iniciarJuego)   