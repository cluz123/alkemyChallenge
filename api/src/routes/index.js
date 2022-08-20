const { Router } = require('express');
const { Ingresos, Egresos } = require('../db');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getIngresosInfo = async () => {
    return await Ingresos.findAll({
            through: {
                attributes: []
            }
        }
    )
}


const getEgresosInfo = async () => {
    return await Egresos.findAll({
            through: {
                attributes: []
            }
        }
    )
}

const getTotalInfo = async () => {
    let ingresos = await getIngresosInfo();
    let egresos = await getEgresosInfo();
    return {ingresos, egresos};
}

router.get('/challenge', async (req, res) => {

    let infoTotal = await getTotalInfo();
    res.send(infoTotal);        
    
})


router.post('/challenge', async (req, res) => {
    const { concept, amount, date, type, id, destroy } = req.body;

    if(destroy && type == 'ingreso'){
        const count = await Ingresos.destroy({ where: { id } });
        res.send('deleted!')
    }else if(destroy && type == 'egreso'){
        const count = await Egresos.destroy({ where: { id } });
        res.send('deleted!')
    }else if(type == 'ingreso'){
        if(id){
            let operation = await Ingresos.findOne({ where: { id } });
            operation.concept = concept;
            operation.amount = amount;
            operation.date = date;
            operation.type = type;
            await operation.save();
        }else {
            const info = await Ingresos.create({
                concept,
                amount,
                date
            })            
        }
        res.send('All Ok!');
    }else {
        if(id){
            console.log('aquii');
            let operation = await Egresos.findOne({ where: { id } });
            operation.concept = concept;
            operation.amount = amount;
            operation.date = date;
            operation.type = type;
            await operation.save();
        }else {
            const info = await Egresos.create({
                concept,
                amount,
                date
            })
            res.send('All Ok!');            
        }
    }     
})


module.exports = router;
