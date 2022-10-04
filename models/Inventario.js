const {Schema,model} = require("mongoose");

const InventarioSchema= Schema ({

    
    serial: {
        type:String,
        required: true,
        Unique:true,
    },

    modelo: {
        type:String,
        required: true,
    },

    descripcion: {
        type:String,
        required: true,
    },

    color: {
        type:String,
        required: true,
    },

    foto: {
        type:String,
        required: true,
    },

    fechaCompra: {
        type:String,
        required: true,
    },

    
    precio:{ // independientemente sie es 12500.50  o es entrero
        type:Number,
        required: true,
    },
//pk y 
    
usuario:{
    type:Schema.Types.ObjectId,
    ref:"Usuario",
    required:false,
},




marca:{
    type:Schema.Types.ObjectId,
    ref:"Marca",
    required:true,
},

tipoEquipo:{
    type:Schema.Types.ObjectId,
    ref:"TipoEquipo",
    required:true,
},

estadoEquipo:{
    type:Schema.Types.ObjectId,
    ref:"EstadoEquipo",
    required:false,
},

fechaCreacion:{

    type:Date,
    required:true,
},
fechaActualizacion:{
    type:Date,
    required:true,  
}




});

module.exports = model("Inventario",InventarioSchema);