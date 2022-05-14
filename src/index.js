require("dotenv").config(); //Importa o dotenv
PORT = process.env.PORT || 5000; //Define a porta
const express = require('express'); //Importa o express
const cors = require('cors'); //Importa o cors
const mongoose = require("mongoose"); //Importa o mongoose
const userRouter = require('./routes/userRouter'); //Importa o userRouter
const app = express(); //Cria a aplicação

app.use(cors()); //Permite que o express entenda json
app.use(express.json()); //Permite que o express entenda json

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT); //Conecta ao mongo
        app.listen(PORT, () => {
            console.log(`O servidor está rodando na porta ${PORT}`); //Exibe uma mensagem na tela para informar que o servidor está rodando  
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();