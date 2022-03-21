const Markers = require("./markers");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.markers = new Markers();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            //? Marcadores Activos
            socket.emit('marcadores-activos', this.markers.activos);

            //?Marcador Nuevo
            socket.on('nuevo-marcador', (marker) => { //id, lng, lng
                console.log('marcador-nuevo', {marker});
                this.markers.addMarker(marker);
                //Vuelvo a enviar a todas menos que desde donde se envia
                socket.broadcast.emit('nuevo-marcador',marker);
            })

            //? Actualizar marcador

            socket.on('marcador-actualizado', (marker) => {
                this.markers.updateMarker(marker);
                socket.broadcast.emit('marcador-actualizado', marker);
            })


            
        
        });
    }


}


module.exports = Sockets;