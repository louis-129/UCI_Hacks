const mongoose = require('mongoose')
const Schema = mongoose.Schema



const accountSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    entryDate: {type:Date, default:Date.now}
})

const contactSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    website:{type:String, required:true},
    message:{type:String, required:true},
    entryDate: {type:Date, default:Date.now}

})

const Account = mongoose.model('Accounts',accountSchema,'users');
const Contact = mongoose.model('Contact',contactSchema, 'contact-form')

const mySchemas = {'Accounts':Account, 'Contact':Contact}
module.exports = mySchemas