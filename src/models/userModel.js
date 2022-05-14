const express = require('express');
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nome: {
        type: String, 
        required: true, 
        min: 3, 
        max: 50
    },
    email: {
        type: String, 
        required: true, 
        min: 5, 
        max: 50, 
        unique: true
    },
    senha: {
        type: String, 
        required: true,
    },
    dataNascimento:{
        type: Date,
        required: true
    },
    favoritos: {
        type: Array,
        default: []
    },
})

const User = mongoose.model("users", userSchema);
module.exports = User;