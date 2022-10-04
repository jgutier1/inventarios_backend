const {Router} = require("express");
const{validartipoEquipo} =require("../helpers/validar-tipoEquipo");
const TipoEquipo =require("../models/TipoEquipo");

const router = Router();


router.get("/", async function(req, res){

    try {
        const tipos = await TipoEquipo.find();
        res.send(tipos);
        
    } catch (error) {
        console.log(error);
        res.send("Ocurio un error");
        
    }
    

});

router.post("/", async function(req, res){

    try {

        const validaciones = validartipoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }


        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

        
    } catch (error) {
        console.log(error);
        res.send("Ocurio un error");
        
    }
});



router.put("/:tipoEquipo", async function(req, res){
    try {

        const validaciones = validartipoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipo);
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    } catch (error) {
        console.log(error);
        res.send("Ocurio un error");
        
    }
});

module.exports = router;