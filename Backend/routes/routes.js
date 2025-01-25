const express = require('express')
const router = express.Router()
const schemas = require('../models/Account')


router.post('/contact/:a', async (req,res) =>{ //:a is passing in a parameter
  //comst email = req.body.email 
    const {name,email,website,message} = req.body
    const action = req.params.a

    switch(action){
      case "send":
        const contactData = {name: name, email: email, website: website, message: message}
        const newContact = new schemas.Contact(contactData)
        const saveContact = await newContact.save()
        if(saveContact){
          res.send('Message sent.Thank You!')
        }
        else{
          res.send('Message failed to send')
        }
        break;

      default:
        res.send("Invalid response")
        break;
    }

    res.end()
})

router.get('/users:a/id',(req,res)=>{ //passing in param a and looking for id elements
})

router.get('/users', async (req,res)=>{
  const users = schemas.Accounts
  const userData = await users.find({}).exec() //find({}) searches the collects for everything
  //.exec exceutes the function

  if(userData){
    res.send(JSON.stringify(userData)) //pulls all webiste data
  }
})

// router.get('/users', (req,res) =>{
//     const userData = [
//         {
//           "id": 1,
//           "name": "Leanne Graham",
//           "username": "Bret",
//           "email": "Sincere@april.biz",
//           "address": {
//             "street": "Kulas Light",
//             "suite": "Apt. 556",
//             "city": "Gwenborough",
//             "zipcode": "92998-3874",
//             "geo": {
//               "lat": "-37.3159",
//               "lng": "81.1496"
//             }
//           },
//           "phone": "1-770-736-8031 x56442",
//           "website": "hildegard.org",
//           "company": {
//             "name": "Romaguera-Crona",
//             "catchPhrase": "Multi-layered client-server neural-net",
//             "bs": "harness real-time e-markets"
//           }
//         },
//         {
//           "id": 2,
//           "name": "Ervin Howell",
//           "username": "Antonette",
//           "email": "Shanna@melissa.tv",
//           "address": {
//             "street": "Victor Plains",
//             "suite": "Suite 879",
//             "city": "Wisokyburgh",
//             "zipcode": "90566-7771",
//             "geo": {
//               "lat": "-43.9509",
//               "lng": "-34.4618"
//             }
//           },
//           "phone": "010-692-6593 x09125",
//           "website": "anastasia.net",
//           "company": {
//             "name": "Deckow-Crist",
//             "catchPhrase": "Proactive didactic contingency",
//             "bs": "synergize scalable supply-chains"
//           }
//         },
//         {
//           "id": 3,
//           "name": "Clementine Bauch",
//           "username": "Samantha",
//           "email": "Nathan@yesenia.net",
//           "address": {
//             "street": "Douglas Extension",
//             "suite": "Suite 847",
//             "city": "McKenziehaven",
//             "zipcode": "59590-4157",
//             "geo": {
//               "lat": "-68.6102",
//               "lng": "-47.0653"
//             }
//           },
//           "phone": "1-463-123-4447",
//           "website": "ramiro.info",
//           "company": {
//             "name": "Romaguera-Jacobson",
//             "catchPhrase": "Face to face bifurcated interface",
//             "bs": "e-enable strategic applications"
//           }
//         }
//       ]
//       res.send(userData)
// })




router.post('/signup', async(req,res) =>{
    const {name, email, password} = req.body

    const accountData = {name:name, email:email, password:password}
    const newAccount = new schemas.Account(accountData)
    const saveAccount = await newAccount.save()

    if(saveAccount){
        console.log("Account made!")
    }

})

module.exports = router;