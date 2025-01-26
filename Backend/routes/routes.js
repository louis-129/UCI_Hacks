const express = require('express')
const router = express.Router()
const schemas = require('../models/Account')


router.get('/checkSession', (req, res) => {
  if (req.session.user) {
      console.log(req.session.user)
      res.status(200).send(req.session.user);  // Return session data
  } else {
      res.status(401).send('Not logged in');
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send("Error logging out");
      }
      res.status(200).send("Logged out successfully");
  });
});

router.post('/save-note', async (req, res) => {
  const {text,date} = req.body;
  if (!req.session.user) {
    return res.status(401).send('User not logged in');
  }

  const userId = req.session.user.id;
  const posts = schemas.Post;

  console.log("THE DATE: " + date)

  try {
    const existingPost = await posts.findOne({ authorId: userId, date }).exec();

    if (existingPost) {
      existingPost.text = text;
      const updatedPost = await existingPost.save();
      if (updatedPost) {
        console.log('Post updated!');
        return res.status(200).send('Post updated successfully!');
      } else {
        return res.status(400).send('Error updating post!');
      }
    } else {
      const newPost = new posts({ text, date, authorId: userId });
      const savePost = await newPost.save();
      if (savePost) {
        console.log('Post created!');
        return res.status(200).send('Post created successfully!');
      } else {
        return res.status(400).send('Error creating post!');
      }
    }
  } catch (error) {
    console.error('Error saving post:', error);
    return res.status(500).send('Server error while saving post');
  }
});

router.get('/load-note', async (req, res) => {
  const { date } = req.query; // Use `req.query` for query parameters in GET requests
  console.log("THE DATE FROM QUERY: ", date); // Log the date received from the client

  
  if (!req.session.user) {
    return res.status(401).send('User not logged in');
  }

  const userId = req.session.user.id;
  const posts = schemas.Post;
  console.log("THE DATE: " + date);

  try {
    const existingPost = await posts.findOne({ authorId: userId, date }).exec();
    if (existingPost) {
      return res.send(existingPost.text);
    } else {
      return res.status(400).send('Error loading post!');
    }
  } catch (error) {
    console.error('Error loading post (aka no post avaliable):', error);
    return res.status(500).send('Server error while loading post');
  }
});


router.post('/signUp', async(req,res) =>{
  const {firstName,lastName, email, username, password} = req.body

  const id = (new Date()).getTime();

  console.log(id)

  const accountData = {firstName:firstName, lastName:lastName, email:email, username:username, password:password, id:id}
  const newAccount = new schemas.Account(accountData)
  const saveAccount = await newAccount.save()

  if(saveAccount){
      console.log("Account made!")
      res.status(200).send('Success!');
  }else{
    res.status(400).send('Error in creating account!');
  }

})


router.post('/signIn', async (req, res) => {
  const { username, password } = req.body;
  const users = schemas.Account;
  const userData = await users.findOne({ username }).exec();
  if(userData!=null){
    if(userData.password === password){
      req.session.user = {
        id: userData._id, 
        username: userData.username,
      }; // Store user data in the session
      console.log("User logged in successfully", req.session);
      res.status(200).send('Login successful');
      return
    }else{
      res.status(400).send('Login failed');
    }
  }else{
    res.status(400).send('Login failed');
  }
});





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



module.exports = router;