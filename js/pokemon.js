const sectionSeleccionarAtaque = document.getElementById("seleccionarAtaque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("botonMascota")

const botonReiniciar = document.getElementById("botonReiniciar")

const spanMascotaJugador = document.getElementById("nombreMascotaJugador")

const spanMascotaEnemigo = document.getElementById("nombreMascotaEnemigo")
const sectionSeleccionarMascota = document.getElementById("seleccionarMascota")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
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
    {nombre: "💧", id: "botonAgua",},
    {nombre: "💧", id: "botonAgua",},
    {nombre: "💧", id: "botonAgua",},
    {nombre: "🔥", id: "botonFuego",},
    {nombre: "🌱", id: "botonTierra",}
)

capipepo.ataques.push(
    {nombre: "🌱", id: "botonTierra"},
    {nombre: "🌱", id: "botonTierra"},
    {nombre: "🌱", id: "botonTierra"},
    {nombre: "💧", id: "botonAgua"},
    {nombre: "🔥", id: "botonFuego"}
)    

ratigueya.ataques.push(
    {nombre: "🔥", id: "botonFuego"},
    {nombre: "🔥", id: "botonFuego"},
    {nombre: "🔥", id: "botonFuego"},
    {nombre: "💧", id: "botonAgua"},
    {nombre: "🌱", id: "botonTierra"}
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} >
            <label class="tarjetaMokepon" for=${mokepon.nombre}>
                <!--<p>${mokepon.nombre}</p>-->
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")

    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaJugador(){

    sectionSeleccionarAtaque.style.display = "flex"

    if(inputHipodoge.checked){
        alert("Seleccionaste a: "+ inputHipodoge.id)
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        alert("Seleccionaste a: " + inputCapipepo.id)
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        alert("Seleccionaste a: " + inputRatigueya.id)
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert("No has seleccionado nunguna mascota, ERROR!!")
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){

    let random = aleatorio(0, (mokepones.length -1))

    alert("El enemigo eligió a: " + mokepones[random].nombre)
    spanMascotaEnemigo.innerHTML = mokepones[random].nombre

    sectionSeleccionarMascota.style.display = "none"
}

function extraerAtaques(mascotaJugador){
    let ataques
    for(let i = 0; i < mokepones.length; i++){
        if(mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon= `
            <button id=${ataque.id} class="botonDeAtaque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("botonFuego")
    botonAgua = document.getElementById("botonAgua")
    botonTierra = document.getElementById("botonTierra")

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
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