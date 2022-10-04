const {Router} = require("express");
const { validarestadoEquipo } = require("../helpers/valiadar-estadoEquipo");
const EstadoEquipo = require("../models/EstadoEquipo");

const router = Router();

router.get("/", async function(req, res){
    try{
        const tipos = await EstadoEquipo.find();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.send("Ocurio un error");

    }
});


router.post("/", async function(req, res){
    try{

        const validaciones = validarestadoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre =req.body.nombre;
        estadoEquipo.estado =req.body.estado;
        estadoEquipo.fechaCreacion =new Date();
        estadoEquipo.fechaActualizacion =new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);


    } catch (error) {
        console.log(error);
        res.send("Ocurio un error");
    }
   




});

router.put("/:estadoEquipoId", async function(req, res){

    try{
        const validaciones = validarestadoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo){

            return res.send("No existado estado");

        }
        estadoEquipo.nombre =req.body.nombre;
        estadoEquipo.estado =req.body.estado;
        estadoEquipo.fechaActualizacion =new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);


    } catch (error) {
        console.log(error);
        res.send("Ocurio un error");
    }

});

module.exports = router;