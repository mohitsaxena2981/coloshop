// const User = require('../models/users');
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// router.get('/', async (req,res)=>{
//     const users = await User.find();

//     if(!users){
//         res.status(400).send("No users found :/");
//     }

//     res.send(users);
// })

// router.get('/:id', async (req,res)=>{
//     const user = await User.findById(req.params.id).select("-passwordHash");

//     if(!user){
//         res.status(400).send("No user found :/");
//     }

//     res.send(user);
// })

// // router.post('/register', async (req,res)=>{
// //     let user = new User({
// //         name:req.body.name,
// //         email:req.body.email,
// //         passwordHash: bcrypt.hashSync(req.body.password),
// //         address:req.body.address,
// //         isAdmin:req.body.isAdmin===false
// //     })

// //     user = await user.save();

// //     if(!user){
// //         return res.status(400).send("User cannot be created :/");
// //     }

// //     res.send(user);
// // })

// // router.post('/register', async (req, res) => {
// //     const existingUser = await User.findOne({ email: req.body.email });
  
// //     if (existingUser) {
// //       return res.status(400).send('Email already registered');
// //     }
  
// //     let user = new User({
// //       name: req.body.name,
// //       email: req.body.email,
// //       passwordHash: bcrypt.hashSync(req.body.password),
// //       address: req.body.address,
// //       isAdmin: req.body.isAdmin === false
// //     });
  
// //     user = await user.save();
  
// //     if (!user) {
// //       return res.status(400).send('User cannot be created :/');
// //     }
  
// //     res.send(user);
// //   });
  



// router.post('/register', async (req, res) => {
//     const existingUser = await User.findOne({ email: req.body.email });
  
//     if (existingUser) {
//       return res.status(409).send('User with this email already exists');
//     }
  
//     let user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       passwordHash: bcrypt.hashSync(req.body.password),
//       address: req.body.address,
//       answer: req.body.answer,
//       isAdmin: req.body.isAdmin === false
//     });
  
//     user = await user.save();
  
//     if (!user) {
//       return res.status(400).send('User cannot be created');
//     }
  
//     res.send(user);
//   });
  

// router.put('/:id', async (req,res)=>{

//     const userInfo = await User.findById(req.params.id);

//     let newPassword;
//     if(req.body.password){
//         newPassword = bcrypt.hashSync(req.body.password);
//     }else{
//         newPassword = userInfo.passwordHash;
//     }

//     const user = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//             name:req.body.name,
//             email:req.body.email,
//             passwordHash:newPassword,
//             address:req.body.address,
//             answer: req.body.answer,
//             isAdmin:req.body.isAdmin
//         },
//         {
//             new:true
//         }
//     )

//     if(!user){
//         return res.status(400).send("No user found :/");
//     }

//     res.send(user)
// })

// router.post('/login', async (req,res)=>{

//     const user = await User.findOne({email:req.body.email});

//     if(!user){
//         return res.status(400).send("Invalid email");
//     }

//     if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
//         const token = jwt.sign({
//             userId:user._id,
//             isAdmin:user.isAdmin
//         }, process.env.secret, 
//         {expiresIn: '1d'});

//         return res.status(200).json({
//             user:user._id,
//             isAdmin:user.isAdmin,
//             token:token
//         })
//     }else{
//         return res.status(400).send("Invalid email or password :/");
//     }
// })

// router.delete('/:id', async (req,res)=>{
//      const user = await User.findByIdAndRemove(req.params.id).then((user)=>{
//         if(user){
//             return res.status(200).send(user);
//         }
//         else{
//             return res.status(400).send("User not found :/");
//         }
//     })
//     .catch((err)=>{
//         return res.status(500).json({
//             success:false,
//             error:err
//         })
//     })

// })

// module.exports = router;













const User = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400).send("No users found :/");
  }

  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res.status(400).send("No user found :/");
  }

  res.send(user);
});

router.post('/register', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(409).send('User with this email already exists');
  }

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password),
    address: req.body.address,
    answer: req.body.answer,
    isAdmin: req.body.isAdmin === false
  });

  user = await user.save();

  if (!user) {
    return res.status(400).send('User cannot be created');
  }

  res.send(user);
});

router.put('/:id', async (req, res) => {
  const userInfo = await User.findById(req.params.id);

  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password);
  } else {
    newPassword = userInfo.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      address: req.body.address,
      answer: req.body.answer,
      isAdmin: req.body.isAdmin
    },
    {
      new: true
    }
  );

  if (!user) {
    return res.status(400).send("No user found :/");
  }

  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid email");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign({
      userId: user._id,
      isAdmin: user.isAdmin
    }, process.env.secret,
      { expiresIn: '1d' });

    return res.status(200).json({
      user: user._id,
      isAdmin: user.isAdmin,
      token: token
    });
  } else {
    return res.status(400).send("Invalid email or password :/");
  }
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id).then((user) => {
    if (user) {
      return res.status(200).send(user);
    }
    else {
      return res.status(400).send("User not found :/");
    }
  })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: err
      });
    });
});


// router.post('/reset-password', async (req, res) => {
//     const { email, securityAnswer, newPassword } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
  
//       // Check if the user exists
//       if (!user) {
//         return res.status(400).send('User not found');
//       }
  
//       // Validate the security answer
//       if (securityAnswer !== user.answer) {
//         return res.status(400).send('Invalid security answer');
//       }
  
//       console.log('Resetting password...');
//       console.log('New password:', newPassword);
  
//       // Generate a new password hash
//       const newPasswordHash = bcrypt.hashSync(newPassword);
  
//       console.log('New password hash:', newPasswordHash);
  
//       // Update the user's password hash
//       await User.findByIdAndUpdate(user._id, { passwordHash: newPasswordHash });
  
//       console.log('Password reset successful');
  
//       return res.sendStatus(200);
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       return res.status(500).send('Error resetting password');
//     }
//   });
  

//   router.post('/security-answer', async (req, res) => {
//     const { email, securityAnswer } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
  
//       // Check if the user exists
//       if (!user) {
//         return res.status(400).send('User not found');
//       }
  
//       // Validate the security answer
//       if (securityAnswer !== user.answer) {
//         return res.status(400).send('Invalid security answer');
//       }
  
//       // Security answer is correct
//       return res.sendStatus(200);
//     } catch (error) {
//       return res.status(500).send('Error checking security answer');
//     }
//   });
  




// router.post('/reset-password', async (req, res) => {
//     const { email, securityAnswer, newPassword } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
  
//       // Check if the user exists
//       if (!user) {
//         return res.status(400).send('User not found');
//       }
  
//       // Validate the security answer
//       if (securityAnswer !== user.answer) {
//         return res.status(400).send('Invalid security answer');
//       }
  
//       console.log('Resetting password...');
//       console.log('New password:', newPassword);
  
//       // Generate a new password hash
//       const newPasswordHash = bcrypt.hashSync(newPassword);
  
//       console.log('New password hash:', newPasswordHash);
  
//       // Update the user's password hash
//       user.passwordHash = newPasswordHash;
//       await user.save();
  
//       console.log('Password reset successful');
  
//       return res.sendStatus(200);
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       return res.status(500).send('Error resetting password');
//     }
//   });
  
//   router.post('/security-answer', async (req, res) => {
//     const { email, securityAnswer } = req.body;
  
//     try {
//       // Find the user by email
//       const user = await User.findOne({ email });
  
//       // Check if the user exists
//       if (!user) {
//         return res.status(400).send('User not found');
//       }
  
//       // Validate the security answer
//       if (securityAnswer !== user.answer) {
//         return res.status(400).send('Invalid security answer');
//       }
  
//       // Security answer is correct
//       return res.sendStatus(200);
//     } catch (error) {
//       console.error('Error checking security answer:', error);
//       return res.status(500).send('Error checking security answer');
//     }
//   });


// router.post('/security-answer', async (req, res) => {
//   const { email, securityAnswer } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     // Check if the user exists
//     if (!user) {
//       return res.status(400).send('User not found');
//     }

//     // Validate the security answer
//     if (securityAnswer !== user.answer) {
//       return res.status(401).send('Invalid security answer');
//     }

//     // Security answer is correct
//     return res.sendStatus(200);
//   } catch (error) {
//     console.error('Error checking security answer:', error);
//     return res.status(500).send('Error checking security answer');
//   }
// });





router.post('/reset-password', async (req, res) => {
    const { email, securityAnswer, newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Validate the security answer
      if (securityAnswer !== user.answer) {
        return res.status(400).send('Invalid security answer');
      }
  
      console.log('Resetting password...');
      console.log('New password:', newPassword);
  
      // Generate a new password hash
      const newPasswordHash = bcrypt.hashSync(newPassword);
  
      console.log('New password hash:', newPasswordHash);
  
      // Update the user's password hash
      user.passwordHash = newPasswordHash;
      await user.save();
  
      console.log('Password reset successful');
  
      return res.sendStatus(200);
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).send('Error resetting password');
    }
  });
  
  router.post('/security-answer', async (req, res) => {
    const { email, securityAnswer } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Validate the security answer
      if (securityAnswer !== user.answer) {
        return res.status(401).send('Invalid security answer');
      }
  
      // Security answer is correct
      return res.sendStatus(200);
    } catch (error) {
      console.error('Error checking security answer:', error);
      return res.status(500).send('Error checking security answer');
    }
  });
  
  module.exports = router;
  

  

module.exports = router;
