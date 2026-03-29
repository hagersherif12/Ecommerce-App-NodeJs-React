const express = require('express');
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct,uploadProductImage} = require('../controllers/productsController');
const { authMiddleware, adminMiddleware } = require('../middelwares/authMiddelware'); 
// const {admin} = require("../middelwares/adminMiddelware");
const {uploadImage} = require('../middelwares/uploadImage');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id',getProductById);
router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.post('/:id/upload-image', authMiddleware, adminMiddleware, uploadImage, uploadProductImage);

module.exports = router;