const express = require('express')
const app = express()
const SocketIO = require('socket.io')


// DEFINIMOS EL PUERTO A USAR
app.set('port',process.env.PORT || 3000)


const server = app.listen(app.get('port'),() =>{
    console.log("Servidor iniciado correctamente en el puerto",app.get('port'))
})


//Web sockets
const io = SocketIO(server)

io.on('connection',(socket) =>{
    console.log("conexion realizada del cliente correctamente")

    //Eventos


    socket.on('chat:message',(data) =>{
        io.sockets.emit('chat:message',data)
    })

    socket.on('chat:file',(img) =>{
        console.log(img)
        io.sockets.emit('chat:file',img)
    })

    socket.on('screen:share',(imgStr) =>{
        socket.broadcast.emit('screen-data',imgStr)
    })



    // perifericos


    socket.on('tools:shutdown',()=>{
        console.log("Apagando equipo remoto")
        socket.broadcast.emit('tools:shutdown')
    })
    socket.on("tools:teclado-apagar",() =>{
        socket.broadcast.emit('tools:teclado-apagar')
    })
    socket.on("tools:teclado-encender",() =>{
        socket.broadcast.emit('tools:teclado-encender')
    })
    socket.on("tools:mouse-apagar",() =>{
        socket.broadcast.emit('tools:mouse-apagar')
    })
    socket.on("tools:mouse-encender",() =>{
        socket.broadcast.emit('tools:mouse-encender')
    })
})
