import pkg from 'mongoose';
const {Schema, model} = pkg;

import bcrypt from 'bcryptjs'

const userSchemma = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }
},{
    timestamps:true
});

userSchemma.methods.encryptPassword = async password =>{
    const Salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,Salt)
}

userSchemma.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password );
}


export default model('user', userSchemma)