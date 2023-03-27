import bcrypt from 'bcryptjs'

const users=[
    {
        name:"Admin User",
        email:"admin@gmail.com",
        password:bcrypt.hashSync('12345',10),
        isAdmin:true
    },
    {
        name:"Vijay",
        email:"vijay@gmail.com",
        password:bcrypt.hashSync('12345',10)
    },
    {
        name:"Gurur",
        email:"guru@gmail.com",
        password:bcrypt.hashSync('12345',10)
    }
]

export default users