import { Router } from 'express';
const router = Router();


router.post('/', (req, res) => {
    const userData = req.body;
    console.log('Datos de usuario recibidos para crear:', userData);
    
    
    if (userData) {
        res.status(201).send({
            message: 'Usuario creado exitosamente',
            user: userData
        });
    } else {
        res.status(400).send({ message: 'No se recibieron datos de usuario' });
    }
});


router.get('/', (req, res) => {
    
    res.send('Este endpoint devolverá todos los usuarios');
});



router.put('/:uid', (req, res) => {
    const userId = req.params.uid; 
    const updateData = req.body; 
    
    console.log(`Actualizando usuario con ID: ${userId}`);
    console.log('Datos recibidos para actualizar:', updateData);

    
    res.status(200).send({
        message: `Usuario con ID ${userId} actualizado exitosamente`,
        data: updateData
    });
});



router.delete('/:uid', (req, res) => {
    const userId = req.params.uid; 
    
    console.log(`Eliminando usuario con ID: ${userId}`);
    
    
    res.status(200).send({
        message: `Usuario con ID ${userId} eliminado exitosamente`
    });
});

export default router;