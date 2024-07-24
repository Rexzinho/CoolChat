const connect = require("../models/db");
const Room = require("../models/room");
const User = require("../models/user");

connect();

module.exports = class RoomController{

    static async create(req, res){
        const {name, type} = req.body;
        if(!name){
            return res.status(400).json({
                msg: "Necessário informar o nome da sala"
            });
        }
        try {
            await Room.create({name, type})
            return res.status(200).json({
                msg: "Sala criada com sucesso."
            })
        }
        catch (error) {
            return res.status(500).json({
                msg: "Erro ao criar sala. Tente novamente mais tarde."
            });
        }
    }

    static async list(req, res){
        try {
            const rooms = await Room.find();
            const resRooms = rooms.map(room => ({
                id: room._id,
                name: room.name,
                type: room.type,
            }));
            return res.status(200).json(resRooms);
        } 
        catch (error) {
            return res.status(500).json({
                msg: "Erro ao listar salas. Tente novamente mais tarde."
            });
        }
    }

    static async messages(req, res){

        const idRoom = req.params.idRoom;

        if(!idRoom || idRoom === ":idRoom"){
            return res.status(400).json({
                msg: "Necessário informar o id da sala."
            });
        }

        try {
            const room = await Room.findById(idRoom);
            if(!room){
                return res.status(404).json({
                    msg: "Sala não encontrada."
                })
            }
            const messages = await Promise.all(room.messages.map(async (message) => {
                const user = await User.findById(message.userId);
                const data = {
                    content: message.content,
                    nick: user.nick,
                    postedAt: message.postedAt,
                    updatedAt: message.updatedAt,
                };
                return data;
            }));
            return await res.status(200).json(messages);
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Erro ao listar mensagens. Tente novamente mais tarde."
            });
        }
    }

    static async sendMessage(req, res){
        const {roomId, userId, content} = req.body;
        if(!roomId || !userId || !content){
            return res.status(400).json({
                msg: "Dados incorretos ao enviar a mensagem."
            })
        }
        const room = await Room.findOne({_id: roomId});
        room.messages.push({content, userId});
        try {
            await Room.updateOne({_id: roomId}, room);
            return res.status(200).json({
                msg: "Mensagem enviada com sucesso!"
            });
        } 
        catch (error) {
            return res.status(500).json({
                msg: "Erro ao enviar mensagem. Tente novamente mais tarde."
            });
        }

    }
}