const {Router} = require("express");
const{validarusuario} =require("../helpers/validar-usuario");
const Usuario = require("../models/Usuario");
const router = Router();

const usuario = require("../models/Usuario");

router.post("/",async function(req, res){

    try{

        const validaciones = validarusuario(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }


        console.log("objeto recibido",req.body);

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        console.log("Respuesta existeUsuario", existeUsuario);
        if(existeUsuario) {

            return res.send("email ya existe");
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();
    
        usuario = await usuario.save();

        res.send(usuario);
        

    } catch(error) {
        console.log(error);
        res.send("ocurio un error");
    }
});



router.get("/", async function(req, res){
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch(error) {
        console.log(error);
        res.send("Ocurio un error");
    }

});



router.put("/:usuarioId",async function(req, res){

    try{
        
        const validaciones = validarusuario(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }



        console.log("objeto recibido",req.body,req.params);

        let usuario = await Usuario.findById(req.params.usuarioId);

        if(!usuario){
            return res.send("Usuario no esxiste");
        }


        const existeUsuario = await Usuario
               .findOne({email: req.body.email,_id:{$ne: usuario._id  }});

        console.log("Respuesta existeUsuario", existeUsuario);

        if (existeUsuario) {
            return res.send("Email ya existe");
        }

        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();


        usuario = await usuario.save();

        res.send(usuario);
        

    } catch(error) {
        console.log(error);
        res.send("ocurio un error");
    }


});

module.exports = router;