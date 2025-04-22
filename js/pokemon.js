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
const maxAncho = 800;
const maxAlto = 600;

let jugadorId = null
let enemigoId = null
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
let mascotaJugadorObjeto
let ataqueMokepon
let ataqueMokeponEmemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let botones = []
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador =0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "/assets/mokemap.png"
let alturaBuscada
let AnchoDelMapa = window.innerWidth - 20


if (AnchoDelMapa > maxAncho) {
    AnchoDelMapa = maxAncho;
}

alturaBuscada = (AnchoDelMapa * maxAlto) / maxAncho;

if (alturaBuscada > maxAlto) {
    alturaBuscada = maxAlto;
    AnchoDelMapa = (alturaBuscada * maxAncho) / maxAlto;
}

mapa.width = AnchoDelMapa;
mapa.height = alturaBuscada;

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho =40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto)
    }
}

let hipodoge = new Mokepon("Hipodoge", "/assets/mokepons_mokepon_hipodoge_attack.png", 5, "/assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "/assets/mokepons_mokepon_capipepo_attack.png", 5, "/assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "/assets/mokepons_mokepon_ratigueya_attack.png", 5, "/assets/ratigueya.png")

const hipodogeAtaques = [
    {nombre: "💧", id: "botonAgua",},
    {nombre: "💧", id: "botonAgua",},
    {nombre: "💧", id: "botonAgua",},
    {nombre: "🔥", id: "botonFuego",},
    {nombre: "🌱", id: "botonTierra",}
]

const capipepoAtaques = [
    {nombre: "🌱", id: "botonTierra"},
    {nombre: "🌱", id: "botonTierra"},
    {nombre: "🌱", id: "botonTierra"},
    {nombre: "💧", id: "botonAgua"},
    {nombre: "🔥", id: "botonFuego"}
]

const ratigueyaAtaques = [
    {nombre: "🔥", id: "botonFuego"},
    {nombre: "🔥", id: "botonFuego"},
    {nombre: "🔥", id: "botonFuego"},
    {nombre: "💧", id: "botonAgua"},
    {nombre: "🌱", id: "botonTierra"}
]

hipodoge.ataques.push(...hipodogeAtaques)
capipepo.ataques.push(...capipepoAtaques) 
ratigueya.ataques.push(...ratigueyaAtaques)

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

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
    .then(function(res){
        if(res.ok){
            res.text()
            .then(function(respuesta){
                console.log(respuesta)
                jugadorId = respuesta
            })
        }
    })
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaJugador(){

    sectionSeleccionarMascota.style.display = "none"

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

    seleccionarMokepon(mascotaJugador)

    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    extraerAtaques(mascotaJugador)
    
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataqueMokeponEmemigo = enemigo.ataques
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

            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
            
        })   
    }) 
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 1000)

}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({ ataques }){
                if(ataques.length === 5){
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}

function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

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

    mascotaJugadorObjeto = obtenerMascota()
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', presionarTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(enemigo){
        enemigo.pintarMokepon()
        revisarColision(enemigo)
    })
}

function enviarPosicion(x, y) {
    if (!jugadorId) {
        console.error("jugadorId no está definido")
        return
    }

    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ x, y })
    })
    .then(function (res){
        if(res.ok){
            return res.json()
        } else {
            throw new Error("No se pudo obtener la respuesta del servidor")
        }
    })
    .then(function({ enemigos }) {
        console.log(enemigos)
        mokeponesEnemigos = enemigos.map(function(enemigo) {
            let mokeponEnemigo = null
            const mokeponNombre = enemigo.mokepon?.nombre || ""

            if(mokeponNombre === "Hipodoge") {
                mokeponEnemigo = new Mokepon("Hipodoge", "/assets/mokepons_mokepon_hipodoge_attack.png", 5, "/assets/hipodoge.png", enemigo.id)
            } else if(mokeponNombre === "Capipepo") {
                mokeponEnemigo = new Mokepon("Capipepo", "/assets/mokepons_mokepon_capipepo_attack.png", 5, "/assets/capipepo.png", enemigo.id)
            } else if(mokeponNombre === "Ratigueya") {
                mokeponEnemigo = new Mokepon("Ratigueya", "/assets/mokepons_mokepon_ratigueya_attack.png", 5, "/assets/ratigueya.png", enemigo.id)
            }

            if (mokeponEnemigo) {
                mokeponEnemigo.x = enemigo.x
                mokeponEnemigo.y = enemigo.y
            }

            return mokeponEnemigo
        }).filter(e => e !== null) // Por si acaso alguno falló
    })
    .catch(err => {
        console.error("Error en la petición de posición:", err)
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverIzquierda(){ 
    mascotaJugadorObjeto.velocidadX = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
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

function obtenerMascota(){
    for(let i = 0; i < mokepones.length; i++){
        if(mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho

    if(abajoMascota<arribaEnemigo || arribaMascota>abajoEnemigo || derechaMascota<izquierdaEnemigo || izquierdaMascota>derechaEnemigo){
        return
    }else{
        detenerMovimiento()
        clearInterval(intervalo)
        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
        seleccionarMascotaEnemigo(enemigo)
    }
}

window.addEventListener("load", iniciarJuego)   