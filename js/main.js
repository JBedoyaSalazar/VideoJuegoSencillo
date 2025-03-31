function aleatorio() {
    return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
}

function eleccion(jugada){
    let resultado = ""
    switch(String(jugada)){
        case "1":
            resultado = "Eligio piedra";
            break
        case "2":
            resultado = "Eligio papel";
            break
        case "3":
            resultado = "Eligio tijera";
            break
        default:
            resultado = "Opción no válida";
            break
    }
    return resultado
}

let jugador = 0
let pc = 0
let win = 0, lost = 0


while(win<3 && lost<3){
    pc = aleatorio()
    jugador = prompt("Elige una opción:\n1. Piedra\n2. Papel\n3. Tijera")

    alert("EL jugador : "+eleccion(jugador));
    alert("El PC : "+eleccion(pc));

    if(pc==jugador){
        alert("Empate 😠")
    }else if(jugador==1 && pc==3 || jugador==2 && pc==1 || jugador==3 && pc==2){
        alert("Ganaste 😎")
        win++
    }else{
        alert("Perdiste 😭")
        lost++
    }
}

alert("Ganaste " + win + " veces y perdiste " + lost + " veces")
if(win>lost){
    alert("Eres el mejor jugador del mundo")
}else if(win<lost){
    alert("Eres el peor jugador del mundo")    
}    
