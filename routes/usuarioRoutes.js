import express from "express";
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword, autenticar, cerrarSesion, agregarFotoPerfil } from "../controllers/usuarioController.js";
import upload from '../middleware/subirFotoPerfil.js'
import Usuario from '../models/Usuario.js'

const router = express.Router();
//Routing
router.get('/login', formularioLogin);
router.post('/login', autenticar);

//cerrar sesión 
router.post('/cerrar-sesion', cerrarSesion)

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.post('/agregar-imagen', upload.single('fotoperfil'), agregarFotoPerfil);
router.get('/confirmar/:token', confirmar)

router.get('/olvide-password', formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

//Almacena el nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
// Ruta para responder mensaje
//router.post('/responder-mensaje/:id', responderMensaje);


router.get('/mensaje', async (req, res) => {
    const { usuarioId } = req.query;
    try {
        const usuario = await Usuario.findByPk(usuarioId);
        res.render('templates/message', {
            page: 'Cuenta creada correctamente',
            confirmacion: true,
            msg: usuario.email
        });
    } catch (error) {
        console.log(error)
    }
});


export default router