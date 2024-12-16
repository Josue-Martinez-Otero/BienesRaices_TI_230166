import { validationResult } from 'express-validator'
import { Precio, Categoria, Propiedad, Mensaje, Usuario } from '../models/index.js'
import { unlink } from 'node:fs/promises'
import { esVendedor, formatearFecha } from '../helpers/index.js'



const admin = async (req, res) => {
    //! IMPORTANTE: Leer QueryString
    const { pagina: paginaActual } = req.query
    const expresion = /^[0-9]$/
    if (!expresion.test(paginaActual)) {
        return res.redirect('/mis-propiedades?pagina=1')
    }
    try {
        const { id } = req.usuario
        // Limites y Dffset para el paginador
        const limit = 10;
        const offset = ((paginaActual * limit) - limit)
        const [propiedades, total] = await Promise.all([
            Propiedad.findAll({
                limit,
                offset,
                where: {
                    usuarioID: id
                },
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Precio, as: 'precio' },
                    { model: Mensaje, as: 'mensajes' }
                ],
            }),
            Propiedad.count({
                where: {
                    usuarioID: id
                }
            })
        ])
        res.render('propiedades/admin', {
            page: 'Mis propiedades',
            propiedades,
            csrfToken: req.csrfToken(),
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit,
        })
    } catch (error) {
        console.log(error)
    }

}



//? Formulario para crear una nueva propiedad
const crear = async (req, res) => {
    // Consultar Modelo de Precio y Categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/crear', {
        page: 'Crear propiedad',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
}



const guardar = async (req, res) => {
    // Validacion
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/crear', {
            page: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }

    // Crear registro
    const { titulo, descripcion, habitaciones, estacionamiento, wc, renta=false, venta=false, calle, lat, lng, precio: precioID, categoria: categoriaID } = req.body
    const { id: usuarioID } = req.usuario
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            renta,
            venta,
            calle,
            lat,
            lng,
            precioID,
            categoriaID,
            usuarioID,
            imagen: ''
        })
        const { id } = propiedadGuardada
        res.redirect(`/propiedades/agregar-imagen/${id}`)
    } catch (error) {
        console.log(error)
    }
}



const agregarImagen = async (req, res) => {
    const { id } = req.params
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    // Validar que la propiedD NO ESTE PUBLICADA
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades')
    }
    // Validar que la propiedad  pertenece a quien visita esta pagina
    if (req.usuario.id.toString() !== propiedad.usuarioID.toString()) {
        return res.redirect('/mis-propiedades')
    }
    return res.render('propiedades/agregar-imagen', {
        page: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    })
}



const almacenarImagen = async (req, res, next) => {
    const { id } = req.params
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    // Validar que la propiedad NO ESTÉ PUBLICADA
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades')
    }
    // Validar que la propiedad pertenezca a quien visita esta página

    if (req.usuario.id.toString() !== propiedad.usuarioID.toString()) {
        return res.redirect('/mis-propiedades')
    }

    try {
        // Almacenar propiedad y publicarla
        propiedad.imagen = req.file.filename
        propiedad.publicado = 1
        await propiedad.save();

        // Si todo es exitoso, pasar al siguiente middleware o función
        next();

    } catch (error) {
        console.log(error);
        // Manejar errores aquí
        // Puedes redirigir a una página de error o hacer algo más según tus necesidades
        res.redirect('/mis-propiedades');
    }
}



const editar = async (req, res) => {
    // Validaciones
    const { id } = req.params
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    // Revisar quin visita la URL sea dueño de la propeidd
    if (propiedad.usuarioID.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }
    // Consultar el precio y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/editar', {
        page: `Editar propiedad: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    })

}



const guardarCambios = async (req, res) => {
    // Verificcar la Validacion
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/editar', {
            page: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }
    const { id } = req.params
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    // Revisar quin visita la URL sea dueño de la propeidd
    if (propiedad.usuarioID.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }
    // Rescribir el objeto y actualizar la bd
    try {
        const { titulo, descripcion, habitaciones, estacionamiento, wc, renta=false, venta=false, calle, lat, lng, precio: precioID, categoria: categoriaID } = req.body

        propiedad.set({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            renta,
            venta,
            calle,
            lat,
            lng,
            precioID,
            categoriaID
        })
        await propiedad.save();
        res.redirect('/mis-propiedades')
    } catch (error) {
        console.log(error)
    }
}



const eliminar = async (req, res) => {
    const { id } = req.params
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    // Revisar quin visita la URL sea dueño de la propeidd
    if (propiedad.usuarioID.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }
    // Elminar la imagen
    await unlink(`public/uploads/${propiedad.imagen}`)
    console.log(`se elimino la imagen ${propiedad.imagen}`)
    // Eliminar la propiedad
    await propiedad.destroy()
    res.redirect('/mis-propiedades')
}



// Modificar el estado de la propiedad
const cambiarEstado = async (req, res) => {
    const { id } = req.params
    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    // Revisar quin visita la URL sea dueño de la propeidd
    if (propiedad.usuarioID.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }
    // Actualizar 
    propiedad.publicado = !propiedad.publicado
    await propiedad.save()
    res.json({
        resultado: 'true'
    })
}



const mostrarPropiedad = async (req, res) => {
    const { id } = req.params
    // Comprobar que la propieadad exista
    const propiedad = await Propiedad.findByPk(id, {
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' },
            { model: Usuario, as: 'usuario' }
        ]
    })
    if (!propiedad  || !propiedad.publicado) {
        return res.redirect('/404')
    }
    res.render('propiedades/mostrar', {
        propiedad,
        page: propiedad.titulo,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioID)
    })
}



const enviarMensaje = async (req, res) => {
    const { id } = req.params
    // Comprobar que la propieadad exista
    const propiedad = await Propiedad.findByPk(id, {
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' }
        ]
    })
    if (!propiedad) {
        return res.redirect('/404')
    }
    // Renderizar errores
    
    // Validacion
    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {

        return res.render('propiedades/mostrar', {
            propiedad,
            page: propiedad.titulo,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioID),
            errores: resultado.array()
        })
    }


    const { mensaje } = req.body
    const { id: propiedadID } = req.params
    const { id: usuarioID } = req.usuario
    //Almacenar el mensaje

    await Mensaje.create({
        mensaje,
        propiedadID,
        usuarioID
    })

    res.redirect('/')
}

//Leer mensajes recibidos

const verMensajes = async (req, res) => {
    const { id } = req.params

    //validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id, {
        include: [
            {
                model: Mensaje, as: 'mensajes',
                include: [
                    { model: Usuario.scope('eliminarPassword'), as: 'usuario' }
                    //{ model: Categoria, as: 'usuario' }
                ]
            },
        ],
    })

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }

    //Revisar quin visita la URL sea dueño de la propeidd
    if (propiedad.usuarioID.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }

    res.render('propiedades/mensajes', {
        page: 'Mensajes',
        mensajes: propiedad.mensajes,
        formatearFecha
    })
}

const responderMensaje = async (req, res) => {
    const { id } = req.params;

    if (req.method === 'GET') {
        try {
            // Busca el mensaje en la base de datos (reemplaza con tu modelo)
            const mensaje = await Mensaje.findByPk(id);

            if (!mensaje) {
                return res.status(404).send('Mensaje no encontrado');
            }

            // Renderiza la vista para responder el mensaje
            res.render('responder-mensaje', {
                pagina: 'Responder Mensaje',
                mensaje,
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error del servidor');
        }
    } else if (req.method === 'POST') {
        try {
            const { respuesta } = req.body; // Obtienes la respuesta enviada en el formulario

            // Aquí procesas la respuesta y la guardas en la base de datos
            const mensaje = await Mensaje.findByPk(id); // Encuentra el mensaje por su ID

            if (!mensaje) {
                return res.status(404).send('Mensaje no encontrado');
            }

            // Guarda la respuesta en el mensaje
            mensaje.respuesta = respuesta; // Asume que tienes un campo 'respuesta' en el modelo
            mensaje.estado = 'respondido'; // Cambia el estado si es necesario

            // Guarda el mensaje actualizado
            await mensaje.save();

            console.log(`Respuesta enviada al mensaje ${id}: ${respuesta}`);

            // Redirige después de guardar la respuesta
            res.redirect('/mis-propiedades');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error del servidor');
        }
    }
};




export {
    admin,
    crear,
    guardar,
    editar,
    agregarImagen,
    almacenarImagen,
    guardarCambios,
    eliminar,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes,
    cambiarEstado,
    responderMensaje
}

