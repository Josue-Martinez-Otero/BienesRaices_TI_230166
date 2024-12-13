import bcrypt from 'bcrypt'
const usuarios = [
    {
        nombre: 'Esperanza',
        email: '',
        birthdate: '2024-11-08',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios