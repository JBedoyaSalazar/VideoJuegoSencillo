const express = require('express')

const app = express()

const jugadores = []

class jugador{
    constructor(id){
        this.id = id
    }
}

app.get("/unirse", (req, res)=>{

    const id = `${Math.random()}`

    const nuevoJugador = new jugador(id)

    jugadores.push(nuevoJugador)

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

app.listen(8080, () =>{
    console.log('server is running on port 8080')
})