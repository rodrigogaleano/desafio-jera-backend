const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports = {
    async registrar(req, res) {
        try {

            const { nome, email, senha, dataNascimento } = req.body; //Pega os dados do body

            //Verifica se a senha é menor que 6 caracteres
            if (senha.length < 6) {
                return res.status(400).json({
                    sucess: false,
                    message: "A senha deve ter no mínimo 6 caracteres."
                })
            }

            //Passa o email para minúsculo
            const emailLowerCase = email.toLowerCase();

            //Verifica se o email já está cadastrado
            const userExistente = await User.findOne({ email: emailLowerCase });

            //Se o email já estiver cadastrado
            if (userExistente) {
                return res.status(400).json({
                    sucess: false,
                    message: "Este email já está sendo usado."
                })
            }

            //Criptografa a senha
            const hashSenha = await bcrypt.hash(senha, 12);

            //Cria um novo usuário
            const user = await User.create({
                nome,
                email: emailLowerCase,
                senha: hashSenha,
                dataNascimento
            });

            //Cria um token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            //Retorna o token
            return res.status(201).json({
                sucess: true,
                result: { id, nome, email, dataNascimento, token },
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucess: false,
                message: "Erro ao registrar usuário."
            })
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body; //Pega os dados do body
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucess: false,
                message: "Erro ao efetuar login."
            })
        }

    }
}