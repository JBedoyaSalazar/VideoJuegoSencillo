function iniciarJuego(){
    let botonMascotaJugador = document.getElementById("botonMascota")

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador())
}

function seleccionarMascotaJugador(){
    alert("Tu mascota sera:")
}

window.addEventListener("load", iniciarJuego)