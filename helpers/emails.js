import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
		}
	});

	const { email, nombre, token } = datos

	//Enviar el email
	await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: '¡Verifica tu cuenta en BienesRaices.com!',
        text: 'Confirma tu cuenta en nuestra plataforma',
        html: `
            <body style="font-family: Arial, sans-serif; background: linear-gradient(65deg, #33c3f7, #fff19a); margin: 0; padding: 0;">
    <div style="max-width: 525px; margin: 30px auto; background: #FFFFFF; border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Cabecera -->
        <div style="background: #33c3f7; color: #FFFFFF; text-align: center; padding: 20px 10px;">
            <h1 style="margin: 0; font-size: 22px;">¡Confirma tu cuenta para finalizar el registro!</h1>
            <img src="cid:icon_casa" width="35px" style="margin-top: 20px;">
        </div>

        <!-- Logo -->
        <div style="text-align: center; font-size: 20px; padding: 10px; margin-top: 10px;">
            <b style="color: #33c3f7; font-weight: 600;">Bienes</b><span style="color: #5973be;">Raíces</span>
        </div>

        <!-- Contenido -->
        <div style="padding: 20px 40px;">
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">¡Hola ${nombre}!</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Para completar tu registro y empezar a explorar las mejores oportunidades inmobiliarias, confirma tu correo electrónico haciendo clic en el siguiente botón:</p>
            
            <!-- Botón -->
            <div style="text-align: center; margin: 20px 0;">
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3001}/auth/confirmar/${token}" 
                   style="background: #33c3f7; color: #FFFFFF; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 6px; display: inline-block;">
                   ¡Confirmar mi cuenta ahora!
                </a>
            </div>

            
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Si no reconoces este registro, puedes ignorar este mensaje. Si necesitas ayuda, no dudes en contactarnos en bienesraices_support@gmail.com.</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">¡Estamos emocionados de acompañarte en tu viaje para encontrar la propiedad perfecta!</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Saludos cordiales por parte del CEO de BienesRaices:</p>
            <img src="https://i.imgur.com/zbHa3eP.png" width="150px">
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Josue Atlai Martinez Otero</p>
        </div>
        <div>
            <p style="color: #000000; text-align: center; font-size: 14px; padding: 10px; border-top: 1px solid #eaeaea;">© 2024 BienesRaices Todos los derechos reservados.</p>
        </div>
    </div>
</body>

        `,
        attachments: [
            {
                filename: 'icon_casa_w.png',
                path: './assets/icons/icon_casa_w.png',
                cid: 'icon_casa'
            },
            {
                filename: 'icon_facebook.png',
                path: './assets/icons/icon_facebook.png',
                cid: 'icon_facebook'
            },
            {
                filename: 'icon_instagram.png',
                path: './assets/icons/icon_instagram.png',
                cid: 'icon_instagram'
            },
            {
                filename: 'icon_x.png',
                path: './assets/icons/icon_x.png',
                cid: 'icon_x'
            },
            {
                filename: 'firma_electronica-512.png',
                path: './assets/images/firma_electronica-512.png',
                cid: 'firma'
            }
        ]
    });
}

const emailOlvidePassword = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
		}
	});

	const { email, nombre, token } = datos

	//Enviar el email
	await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Solicitud de cambio de contraseña en BienesRaices.com!',
        text: 'Por favor actualiza tu contraseña para seguir navegando en la plataforma',
        html: `
            <body style="font-family: Arial, sans-serif; background: linear-gradient(65deg, #f0f9ff, #e5e7eb); margin: 0; padding: 0;">
                <div style="max-width: 525px; margin: 30px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    <div style="background: #ff1b3a; color: #fff; text-align: center; padding: 20px 10px;">
                        <h1 style="margin: 0; font-size: 22px;">Reestablecer contraseña</h1>
                        <img src="cid:icon_casa" width="35px" class="margin-top: 20px">
                    </div>
                    <div style="text-align: center; font-size: 20px; padding: 10px; margin-top: 10px;"">
                        <b style="color: #ff1b3a; font-weight: 600;">Bienes</b><span>Raíces</span>
                    </div>
                    <div style="padding: 20px 40px;">
                        <p style="font-size: 14px; line-height: 1.5; margin: 10px 0">¡Hola ${nombre}!</p>
                        <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Para poder cambiar tu contraseña y seguir explorar las mejores oportunidades inmobiliarias, haz clic en el siguiente botón:</p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/auth/olvide-password/${token}" style="background: #ff1b3a; color: #ffffff; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 6px; display: inline-block;">Cambiar contraseña ahora</a>
                        </div>
                        <p style="font-size: 14px; line-height: 1.5; margin: 10px 0">Si no reconoces este correo, puedes ignorar este mensaje. Si necesitas ayuda, no dudes en contactarnos en bienesraices_support@gmail.com.</p>
                        <p style="font-size: 14px; line-height: 1.5; margin: 10px 0">¡Estamos emocionados de acompañarte en tu viaje para encontrar la propiedad perfecta!</p>
                        <p style="font-size: 14px; line-height: 1.5; margin: 10px 0">Saludos cordiales por parte del CEO de BienesRaices:</p>
                        <img src="https://i.imgur.com/zbHa3eP.png" width="150px">
                        <p style="font-size: 14px; line-height: 1.5; margin: 10px 0">Josue Atlai Martinez Otero</p>
                    </div>
                    <div>
                        <p style="color: #585858; text-align: center; font-size: 14px; padding: 10px; border-top: 1px solid #eaeaea;">© 2024 BienesRaices Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
        `,
        attachments: [
            {
                filename: 'icon_casa_w.png',
                path: './assets/icons/icon_casa_w.png',
                cid: 'icon_casa'
            },
            {
                filename: 'icon_facebook.png',
                path: './assets/icons/icon_facebook.png',
                cid: 'icon_facebook'
            },
            {
                filename: 'icon_instagram.png',
                path: './assets/icons/icon_instagram.png',
                cid: 'icon_instagram'
            },
            {
                filename: 'icon_x.png',
                path: './assets/icons/icon_x.png',
                cid: 'icon_x'
            },
            {
                filename: 'firma_electronica-512.png',
                path: './assets/images/firma_electronica-512.png',
                cid: 'firma'
            }
        ]
    });
}

export { emailRegistro, emailOlvidePassword }