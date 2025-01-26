const mongoose = require('mongoose')
const Schema = mongoose.Schema



const accountSchema = new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    id:{type:Number, required:true},
    entryDate: {type:Date, default:Date.now}
})

const postSchema = new Schema({
    text:{type:String,required:true},
    date:{type:String,required:true},
    authorId:{type:String,required:true},
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
const Post = mongoose.model('Post',postSchema,'posts')

const mySchemas = {'Account':Account, 'Contact':Contact, 'Post':Post}
module.exports = mySchemas