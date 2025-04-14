const sectionSeleccionarAtaque = document.getElementById("seleccionarAtaque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("botonMascota")
const botonFuego = document.getElementById("botonFuego")
const botonAgua = document.getElementById("botonAgua")
const botonTierra = document.getElementById("botonTierra")
const botonReiniciar = document.getElementById("botonReiniciar")

const inputHipodoge = document.getElementById("hipodoge")
const inputCapipepo = document.getElementById("capipepo")
const inputRatigueya = document.getElementById("ratigueya")
const spanMascotaJugador = document.getElementById("nombreMascotaJugador")

const spanMascotaEnemigo = document.getElementById("nombreMascotaEnemigo")
const sectionSeleccionarMascota = document.getElementById("seleccionarMascota")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3


class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "/images/dragon.jpg", 5)
let capipepo = new Mokepon("Capipepo", "/images/patito.jpg", 5)
let ratigueya = new Mokepon("Ratigueya", "/images/phoenix.jpg", 5)

hipodoge.ataques.push(
    {nombre: "💧", id: "botonAgua", class: "botonDeAtaque"},
    {nombre: "💧", id: "botonAgua", class: "botonDeAtaque"},
    {nombre: "💧", id: "botonAgua", class: "botonDeAtaque"},
    {nombre: "🔥", id: "botonFuego", class: "botonDeAtaque"},
    {nombre: "🌱", id: "botonTierra", class: "botonDeAtaque"}
)

capipepo.ataques.push(
    {nombre: "🌱", id: "botonTierra", class: "botonDeAtaque"},
    {nombre: "🌱", id: "botonTierra", class: "botonDeAtaque"},
    {nombre: "🌱", id: "botonTierra", class: "botonDeAtaque"},
    {nombre: "💧", id: "botonAgua", class: "botonDeAtaque"},
    {nombre: "🔥", id: "botonFuego", class: "botonDeAtaque"}
)    

ratigueya.ataques.push(
    {nombre: "🔥", id: "botonFuego", class: "botonDeAtaque"},
    {nombre: "🔥", id: "botonFuego", class: "botonDeAtaque"},
    {nombre: "🔥", id: "botonFuego", class: "botonDeAtaque"},
    {nombre: "💧", id: "botonAgua", class: "botonDeAtaque"},
    {nombre: "🌱", id: "botonTierra", class: "botonDeAtaque"}
)

mokepones.push(hipodoge, capipepo, ratigueya)



function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre}>
            <label class="tarjetaMokepon" for=${mokepon.nombre}>
                <!--<p>${mokepon.nombre}</p>-->
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)

    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador(){

    sectionSeleccionarAtaque.style.display = "flex"

    if(inputHipodoge.checked){
        alert("Seleccionaste a Hipodoge")
        spanMascotaJugador.innerHTML = "Hipodoge"
    }else if(inputCapipepo.checked){
        alert("Seleccionaste a Capipepo")
        spanMascotaJugador.innerHTML = "Capipepo"
    }else if(inputRatigueya.checked){
        alert("Seleccionaste a Ratigueya")
        spanMascotaJugador.innerHTML = "Ratigueya"
    }else{
        alert("No has seleccionado nunguna mascota, ERROR!!")
    }

    seleccionarMascotaEnemigo()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(){

    let random = aleatorio(1, 3)

    if(random == 1){
        alert("El enemigo seleccionó a Hipodoge")
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    }else if(random == 2){
        alert("El enemigo seleccionó a Capipepo")
        spanMascotaEnemigo.innerHTML = "Capipepo"
    }else{
        alert("El enemigo seleccionó a Ratigueya")
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }
    sectionSeleccionarMascota.style.display = "none"
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

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = combate()
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    
}

function combate(){

    

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
        document.getElementById("botonFuego").disabled = true
        document.getElementById("botonAgua").disabled = true
        document.getElementById("botonTierra").disabled = true
        sectionReiniciar.style.display = "block"
    }else if(vidasJugador == 0){
        alert("Perdiste el juego")
        document.getElementById("botonFuego").disabled = true
        document.getElementById("botonAgua").disabled = true
        document.getElementById("botonTierra").disabled = true
        sectionReiniciar.style.display = "block"
    }
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener("load", iniciarJuego)   