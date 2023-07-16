// const express = require('express');
// const router = express.Router();
// const Item = require('../models/items');
// const uploads = require('../management/multer');
// const { default: mongoose } = require('mongoose');

// router.get('/', async (req,res)=>{
//     const items = await Item.find().populate('category');

//     if(!items){
//         res.status(404).json({
//             message:"No items found :/"
//         })
//     }

//     res.status(200).json(items);
    
// });

// router.get('/:id', async (req,res)=>{
//     const item = await Item.findById(req.params.id).populate('category');

//     if(!item){
//         res.status(404).json({
//             message:"No Item was found :/"
//         })
//     }

//     res.status(200).send(item);
// })


// router.post('/', uploads.single('image'),  async (req,res)=>{

//     const category = await Category.findById(req.body.category);

//     if(!category){
//         return res.status(400).send('Invalid Category');
//     }

//     const file = req.file;

//     if(!file){
//         return res.status(400).send('No image in request :/')
//     }

//     const fileName = req.file.filename;
//     const path = `${req.protocol}://${req.get('host')}/public/images/`
    
//     let item = new Item({
//        name:req.body.name,
//        description:req.body.description,
//        price:req.body.price,
//        image:`${path}${fileName}`,
//        category:req.body.category

//     })

//     item = await item.save()
//     .then(()=>{
//         res.status(201).json("Created successfully !")
//     })
//     .catch((err)=>{
//         res.status(500).json({
//             error:err,
//             message:"Creation failed :/"
//         })
//     })
// })

// router.put('/:id', uploads.single('image'), async (req,res)=>{
//     if(!mongoose.isValidObjectId(req.params.id)){
//         return res.status(400).send('Invalid Id');
//     }

//     const category = await Category.findById(req.body.category);

//     if(!category){
//         return res.status(400).send('Invalid Category Id')
//     }

//     const item = await Item.findById(req.params.id);

//     if(!item){
//         return res.status(400).send('Invalid item Id');
//     }

//     const file = req.file;
//     let image;

//     if(file){
//         const fileName = file.filename;
//         const path = `${req.protocol}://${req.get('host')}/public/images/`;
//         image = `${path}${fileName}`
//     }else{
//         image = item.image;
//     }


//     const modifiedItem = await Item.findByIdAndUpdate(
//         req.params.id,
//         {
//             name:req.body.name,
//             description:req.body.description,
//             price:req.body.price,
//             image:image,
//             category:req.body.category  
//         },
//         {new:true}
//     )

//     if(!modifiedItem){
//         return res.status(500).send('The item cannot be updated');
//     }

//     res.send(modifiedItem);
// })

// router.delete('/:id', async (req,res)=>{
//    await  Item.findByIdAndRemove(req.params.id)
//     .then((item)=>{
//         if(item){
//             return res.status(200).send(item);
//         }
//         else{
//             return res.status(400).send("Item not found :/");
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





// const express = require('express');
// const router = express.Router();
// const Item = require('../models/items');
// const uploads = require('../management/multer');
// const { default: mongoose } = require('mongoose');

// router.get('/', async (req, res) => {
//   const { newArrival } = req.query;

//   let items;
//   if (newArrival === 'true') {
//     // Retrieve only new arrival items
//     items = await Item.find({ newArrival: true }).populate('category');
//   } else {
//     // Retrieve all items
//     items = await Item.find().populate('category');
//   }

//   if (!items) {
//     return res.status(404).json({
//       message: 'No items found :/'
//     });
//   }

//   res.status(200).json(items);
// });

// router.get('/:id', async (req, res) => {
//   const item = await Item.findById(req.params.id).populate('category');

//   if (!item) {
//     return res.status(404).json({
//       message: 'No Item was found :/'
//     });
//   }

//   res.status(200).send(item);
// });

// router.post('/', uploads.single('image'), async (req, res) => {
//   const { name, description, price, category, newArrival } = req.body;

//   const file = req.file;

//   if (!file) {
//     return res.status(400).send('No image in request :/');
//   }

//   const fileName = req.file.filename;
//   const path = `${req.protocol}://${req.get('host')}/public/images/`;

//   let item = new Item({
//     name: name,
//     description: description,
//     price: price,
//     image: `${path}${fileName}`,
//     category: category,
//     newArrival: newArrival // Convert string to boolean
//   });

//   item = await item
//     .save()
//     .then(() => {
//       res.status(201).json('Created successfully!');
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//         message: 'Creation failed :/'
//       });
//     });
// });

// router.put('/:id', uploads.single('image'), async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).send('Invalid Id');
//   }

//   const { name, description, price, category, newArrival } = req.body;

//   const item = await Item.findById(req.params.id);

//   if (!item) {
//     return res.status(400).send('Invalid item Id');
//   }

//   const file = req.file;
//   let image;

//   if (file) {
//     const fileName = file.filename;
//     const path = `${req.protocol}://${req.get('host')}/public/images/`;
//     image = `${path}${fileName}`;
//   } else {
//     image = item.image;
//   }

//   const modifiedItem = await Item.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: name,
//       description: description,
//       price: price,
//       image: image,
//       category: category,
//       newArrival: newArrival // Convert string to boolean
//     },
//     { new: true }
//   );

//   if (!modifiedItem) {
//     return res.status(500).send('The item cannot be updated');
//   }

//   res.send(modifiedItem);
// });

// router.delete('/:id', async (req, res) => {
//   await Item.findByIdAndRemove(req.params.id)
//     .then((item) => {
//       if (item) {
//         return res.status(200).send(item);
//       } else {
//         return res.status(400).send('Item not found :/');
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         success: false,
//         error: err
//       });
//     });
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const uploads = require('../management/multer');
const { default: mongoose } = require('mongoose');

router.get('/', async (req, res) => {
  const { newArrival } = req.query;

  let items;
  if (newArrival === 'true') {
    // Retrieve only new arrival items
    items = await Item.find({ newArrival: true }).populate('category');
  } else {
    // Retrieve all items
    items = await Item.find().populate('category');
  }

  if (!items) {
    return res.status(404).json({
      message: 'No items found :/'
    });
  }

  res.status(200).json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id).populate('category');

  if (!item) {
    return res.status(404).json({
      message: 'No Item was found :/'
    });
  }

  res.status(200).send(item);
});

router.post('/', uploads.single('image'), async (req, res) => {
  const { name, description, price, category, newArrival } = req.body;

  const file = req.file;

  if (!file) {
    return res.status(400).send('No image in request :/');
  }

  const fileName = req.file.filename;
  const path = `${req.protocol}://${req.get('host')}/public/images/`;

  let item = new Item({
    name: name,
    description: description,
    price: price,
    image: `${path}${fileName}`,
    category: category,
    newArrival: newArrival // Convert string to boolean
  });

  try {
    item = await item.save();
    res.status(201).json('Created successfully!');
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Creation failed :/'
    });
  }
});

router.put('/:id', uploads.single('image'), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid Id');
  }

  const { name, description, price, category, newArrival } = req.body;

  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(400).send('Invalid item Id');
  }

  const file = req.file;
  let image;

  if (file) {
    const fileName = file.filename;
    const path = `${req.protocol}://${req.get('host')}/public/images/`;
    image = `${path}${fileName}`;
  } else {
    image = item.image;
  }

  const modifiedItem = await Item.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      description: description,
      price: price,
      image: image,
      category: category,
      newArrival: newArrival // Convert string to boolean
    },
    { new: true }
  );

  if (!modifiedItem) {
    return res.status(500).send('The item cannot be updated');
  }

  res.send(modifiedItem);
});

router.delete('/:id', async (req, res) => {
  await Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (item) {
        return res.status(200).send(item);
      } else {
        return res.status(400).send('Item not found :/');
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: err
      });
    });
});

module.exports = router;










// const express = require('express');
// const router = express.Router();
// const Item = require('../models/items');
// const uploads = require('../management/multer');
// const { default: mongoose } = require('mongoose');
// const Category = require('../models/category');

// router.get('/', async (req, res) => {
//   const items = await Item.find().populate('category');

//   if (!items) {
//     return res.status(404).json({
//       message: 'No items found :/'
//     });
//   }

//   res.status(200).json(items);
// });

// router.get('/:id', async (req, res) => {
//   const item = await Item.findById(req.params.id).populate('category');

//   if (!item) {
//     return res.status(404).json({
//       message: 'No Item was found :/'
//     });
//   }

//   res.status(200).send(item);
// });

// router.post('/', uploads.single('image'), async (req, res) => {
//   const { name, description, price, category, newArrival } = req.body;

//   let categoryObject;

//   if (newArrival === 'true') {
//     const newArrivalName = `${name} (New Arrival)`;
//     categoryObject = new Category({ name: newArrivalName });

//     try {
//       await categoryObject.save();
//     } catch (error) {
//       return res.status(500).json({
//         error,
//         message: 'Category creation failed :/'
//       });
//     }
//   } else {
//     categoryObject = await Category.findById(category);

//     if (!categoryObject) {
//       return res.status(400).send('Invalid Category');
//     }
//   }

//   const file = req.file;

//   if (!file) {
//     return res.status(400).send('No image in request :/');
//   }

//   const fileName = req.file.filename;
//   const path = `${req.protocol}://${req.get('host')}/public/images/`;

//   const item = new Item({
//     name: name,
//     description: description,
//     price: price,
//     image: `${path}${fileName}`,
//     category: categoryObject._id,
//     newArrival: newArrival === 'true'
//   });

//   try {
//     await item.save();
//     res.status(201).json('Created successfully!');
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//       message: 'Creation failed :/'
//     });
//   }
// });

// router.put('/:id', uploads.single('image'), async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).send('Invalid Id');
//   }

//   const { name, description, price, category, newArrival } = req.body;

//   let categoryObject;

//   if (newArrival === 'true') {
//     const newArrivalName = `${name} (New Arrival)`;
//     categoryObject = new Category({ name: newArrivalName });

//     try {
//       await categoryObject.save();
//     } catch (error) {
//       return res.status(500).json({
//         error,
//         message: 'Category creation failed :/'
//       });
//     }
//   } else {
//     categoryObject = await Category.findById(category);

//     if (!categoryObject) {
//       return res.status(400).send('Invalid Category');
//     }
//   }

//   const item = await Item.findById(req.params.id);

//   if (!item) {
//     return res.status(400).send('Invalid item Id');
//   }

//   const file = req.file;
//   let image;

//   if (file) {
//     const fileName = file.filename;
//     const path = `${req.protocol}://${req.get('host')}/public/images/`;
//     image = `${path}${fileName}`;
//   } else {
//     image = item.image;
//   }

//   item.name = name;
//   item.description = description;
//   item.price = price;
//   item.image = image;
//   item.category = categoryObject._id;
//   item.newArrival = newArrival === 'true';

//   try {
//     const modifiedItem = await item.save();
//     res.send(modifiedItem);
//   } catch (err) {
//     return res.status(500).send('The item cannot be updated');
//   }
// });

// router.delete('/:id', async (req, res) => {
//   await Item.findByIdAndRemove(req.params.id)
//     .then((item) => {
//       if (item) {
//         return res.status(200).send(item);
//       } else {
//         return res.status(400).send('Item not found :/');
//       }
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         success: false,
//         error: err
//       });
//     });
// });

// module.exports = router;
