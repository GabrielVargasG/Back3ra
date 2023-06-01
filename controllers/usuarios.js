const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers');
const { Nivel } = require('../models');


const registarNiveles = async(req, res = response) => {
    
    const { usuario, ...body } = req.body;

    const docs = [
        //Niveles de primer grado
        {  nombre: "Nivel 1", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel1"},
        {  nombre: "Nivel 2", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel2"},
        {  nombre: "Nivel 3", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel3"},
        {  nombre: "Nivel 4", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel4"},
        {  nombre: "Nivel 5", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel5"},
        {  nombre: "Nivel 6", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel6"},
        {  nombre: "Nivel 7", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel7"},
        {  nombre: "Nivel 8", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel8"},
        {  nombre: "Nivel 9", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel9"},
        {  nombre: "Nivel 10", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel10"},
        {  nombre: "Nivel 11", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel11"},
        {  nombre: "Nivel 12", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel12"},
        {  nombre: "Nivel 13", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel13"},
        {  nombre: "Nivel 14", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel14"},
        {  nombre: "Nivel 15", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel15"},
        {  nombre: "Nivel 16", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel16"},
        {  nombre: "Nivel 17", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel17"},
        {  nombre: "Nivel 18", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel18"},
        {  nombre: "Nivel 19", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel19"},
        {  nombre: "Nivel 20", completo: "false", usuario:req.usuario._id, valor: 0, grado: "1",action:"Nivel20"},
        
        // Niveles de segundo grado
        {  nombre: "Nivel 1", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel1"},
        {  nombre: "Nivel 2", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel2"},
        {  nombre: "Nivel 3", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel3"},
        {  nombre: "Nivel 4", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel4"},
        {  nombre: "Nivel 5", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel5"},
        {  nombre: "Nivel 6", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel6"},
        {  nombre: "Nivel 7", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel7"},
        {  nombre: "Nivel 8", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel8"},
        {  nombre: "Nivel 9", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel9"},
        {  nombre: "Nivel 10", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel10"},
        {  nombre: "Nivel 11", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel11"},
        {  nombre: "Nivel 12", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel12"},
        {  nombre: "Nivel 13", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel13"},
        {  nombre: "Nivel 14", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel14"},
        {  nombre: "Nivel 15", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel15"},
        {  nombre: "Nivel 16", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel16"},
        {  nombre: "Nivel 17", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel17"},
        {  nombre: "Nivel 18", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel18"},
        {  nombre: "Nivel 19", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel19"},
        {  nombre: "Nivel 20", completo: "false", usuario:req.usuario._id, valor: 0, grado: "2",action:"Nivel20"},
    ];
    // Guardar DB
    const nuevoNivel = await Nivel.insertMany(docs);

    res.status(201).json( nuevoNivel );
}

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    // Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true } );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}

module.exports = {
    registarNiveles,
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}