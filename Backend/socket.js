module.exports = (io) => {
    const sendMessage = function(message, room) {
        const socket = this;
        socket.to(room).emit("receive-message", message);
        console.log(`Mensagem: ${message.content} enviada para a sala ${room}`);
    }
    const joinRoom = function(room) {
        const socket = this;
        socket.join(room);
        console.log(`Conectado na sala ${room}`);
    }
    return {
        sendMessage, 
        joinRoom
    }
}