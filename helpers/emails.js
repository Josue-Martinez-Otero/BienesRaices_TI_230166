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
          <body style="font-family: Arial, sans-serif; background: url('https://i.imgur.com/dBhxl0q.png') no-repeat center center fixed; background-size: cover; margin: 0; padding: 0;">
    <div style="max-width: 525px; margin: 30px auto; background: #FFF19A; border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Cabecera -->
        <div style="background: #33c3f7; color: #FFFFFF; text-align: center; padding: 20px 10px;">
            <h1 style="margin: 0; font-size: 22px;">¡Confirma tu cuenta para finalizar el registro!</h1>
        </div>

        <!-- Logo -->
        <div style="text-align: center; font-size: 20px; padding: 10px; margin-top: 10px;">
            <b style="color: #5973BE; font-weight: 600;">Bienes</b><span style="color: #FFFFFF;">Raíces</span>
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

            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Si no reconoces este registro, puedes ignorar este mensaje. Si necesitas ayuda, no dudes en contactarnos en bienesraices_230166@gmail.com.</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">¡Estamos emocionados de acompañarte en tu viaje para encontrar la propiedad perfecta!</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Saludos cordiales por parte del CEO de BienesRaices:</p>
            <img src="https://i.imgur.com/zbHa3eP.png" width="150px">
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Josue Atlai Martinez Otero</p>
        </div>
    </div>
</body>
        `,
        attachments: [
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
             <body style="font-family: Arial, sans-serif; background: url('https://i.imgur.com/dBhxl0q.png') no-repeat center center fixed; background-size: cover; margin: 0; padding: 0;">
    <div style="max-width: 525px; margin: 30px auto; background: #FFF19A; border-radius: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Cabecera -->
        <div style="background: rgba(51, 195, 247, 0.9); color: #FFFFFF; text-align: center; padding: 20px 10px;">
            <h1 style="margin: 0; font-size: 22px;">Restablecer Contraseña</h1>
        </div>

        <!-- Logo -->
        <div style="text-align: center; font-size: 20px; padding: 10px; margin-top: 10px;">
            <b style="color: #5973BE; font-weight: 600;">Bienes</b><span style="color: #FFFFFF;">Raíces</span>
        </div>

        <!-- Contenido -->
        <div style="padding: 20px 40px;">
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">¡Hola ${nombre}!</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Para poder cambiar tu contraseña y seguir explorando las mejores oportunidades inmobiliarias, haz clic en el siguiente botón:</p>

            <!-- Botón -->
            <div style="text-align: center; margin: 20px 0;">
                <a href="${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/auth/olvide-password/${token}" 
                   style="background: #33c3f7; color: #FFFFFF; text-decoration: none; padding: 12px 20px; font-size: 16px; border-radius: 6px; display: inline-block;">
                   Restablecer Cuenta
                </a>
            </div>

            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Si no reconoces este correo, puedes ignorar este mensaje. Si necesitas ayuda, no dudes en contactarnos en bienesraices_230166t@gmail.com.</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">¡Estamos emocionados de acompañarte en tu viaje para encontrar la propiedad perfecta!</p>
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Saludos cordiales por parte del CEO de BienesRaices:</p>
            <img src="https://i.imgur.com/zbHa3eP.png" width="150px">
            <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">Josue Atlai Martinez Otero</p>
        </div>
    </div>
</body>

        `,
        attachments: [
            
            {
                filename: 'firma_electronica-512.png',
                path: './assets/images/firma_electronica-512.png',
                cid: 'firma'
            }
        ]
    });
}

export { emailRegistro, emailOlvidePassword }