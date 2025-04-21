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

const sectionVerMapa = document.getElementById("verMapa")
const mapa = document.getElementById("mapa")

let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
let ataqueMokepon
let ataqueMokeponEmemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let botones = []
let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador =0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
//mapaBackground.src =

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x =20
        this.y = 30
        this.ancho =80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
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
    sectionVerMapa.style.display = "none"

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

    sectionSeleccionarMascota.style.display = "none"
    //sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "flex"
    iniciarMapa()

    
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
        spanMascotaJugador.innerHTML = inputRatigueya.id
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
    ataqueMokeponEmemigo = mokepones[random].ataques
    secuenciaAtaque()
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

    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) =>{
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("Fuego")
                boton.style.width = "50px"
                boton.style.height = "50px"
                boton.disabled = true
                console.log(ataqueJugador)
            }else if(e.target.textContent === "💧"){
                ataqueJugador.push("Agua")
                boton.style.width = "50px"
                boton.style.height = "50px"
                console.log(ataqueJugador)
                boton.disabled = true
            }else{
                ataqueJugador.push("Tierra")
                boton.style.width = "50px"
                boton.style.height = "50px"
                console.log(ataqueJugador)
                boton.disabled = true
            }
            ataqueEnemigoAleatorio()
        })   
    }) 
}

function ataqueEnemigoAleatorio(){
    let random = aleatorio(0, ataqueMokeponEmemigo.length -1)

    if(random == 0 || random == 1){
        ataqueEnemigo.push("Fuego")
    }else if(random == 3 || random == 4){
        ataqueEnemigo.push("Agua")
    }else{
        ataqueEnemigo.push("Tierra")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        console.log("Iniciando la pelea")
        combate()
    }
}


function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    
    

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] === 'Tierra') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='Agua' && ataqueEnemigo[index] === 'Fuego') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas(){

    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("Has empatado")
        document.getElementById("botonFuego").disabled = true
        document.getElementById("botonAgua").disabled = true
        document.getElementById("botonTierra").disabled = true
        sectionReiniciar.style.display = "block"
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Ganaste el juego")
        document.getElementById("botonFuego").disabled = true
        document.getElementById("botonAgua").disabled = true
        document.getElementById("botonTierra").disabled = true
        sectionReiniciar.style.display = "block"
    }else{
        crearMensajeFinal("Perdiste el juego")
        document.getElementById("botonFuego").disabled = true
        document.getElementById("botonAgua").disabled = true
        document.getElementById("botonTierra").disabled = true
        sectionReiniciar.style.display = "block"
    }
}

function crearMensaje(resultado) {
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}


function reiniciarJuego(){
    location.reload()
    ataqueJugador = [];
    ataqueEnemigo = [];
    victoriasJugador = victoriasEnemigo = 0;
}

function iniciarMapa(){
    mapa.width = 800
    mapa.height = 600
    intervalo = setInterval(pintarPersonaje, 50)

    window.addEventListener('keydown', presionarTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarPersonaje(){
    capipepo.x += capipepo.velocidadX
    capipepo.y += capipepo.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(capipepo.mapaFoto, capipepo.x, capipepo.y, capipepo.ancho, capipepo.alto)
}

function moverDerecha(){
    capipepo.velocidadX = 5
}

function moverArriba(){
    capipepo.velocidadY = -5
}

function moverAbajo(){
    capipepo.velocidadY = 5
}

function moverIzquierda(){ 
    capipepo.velocidadX = -5
}

function detenerMovimiento(){
    capipepo.velocidadX = 0
    capipepo.velocidadY = 0
}

function presionarTecla(event){
    switch(event.key){
        case "a" || "A":
            moverIzquierda()
            break
        case "d" || "D":
            moverDerecha()
            break
        case "w" || "W":
            moverArriba()
            break
        case "s" || "S":
            moverAbajo()
            break
    }
}

window.addEventListener("load", iniciarJuego)   