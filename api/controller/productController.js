const Products = require("../model/productSchema");
const multer = require("multer");

const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./upload/product");
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadImg = multer({ storage: storage }).single("image");

const addproducts = (req, res) => {
  const products = new Products({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    id: req.body.id,
    price: req.body.price,
    description: req.body.description,
    quantity:req.body.quantity,
    productImage: req.file.path,
  });

  products
    .save()
    .then((result) => {
      res.status(200).json({
        success:true,
        data:result
      });
    })
    .catch((err) => {
      res.status(500).json({
        success:false,
        error: err,
        data:{}
      });
    });
};

const listOfProduct = ()=>{
 
  Products.find({})

  .then(function (products) {
    res.status(200).send({
      success:true,
      msg:"fetched the list of products",
      data:products
    })
    .catch((err) => {
      res.status(500).json({
        success:false,
        error: err,
        data:{}
      });
    });
  });
}

const updateProduct=(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.productImage = req.file.path;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(500).send({ message: 'Error in updaing product' });
    }
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})


module.exports = {
  addproducts,
  uploadImg,
  updateProduct,
  listOfProduct
};
