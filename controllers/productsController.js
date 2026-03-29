//todo validation on file 
// !

const Product = require("../models/Product");
const Category = require("../models/Category");
const { createProductSchema, updateProductSchema } = require("./validators/productsValidatores");

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate('categoryId', 'name')
            .populate('createdBy', 'name email role');
        return res.status(200).json({ msg: "Products fetched successfully", products });
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("categoryId", "name description")
            .populate("createdBy", "name email role");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { error, value } = createProductSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        const { name, description, price, categoryId } = value;

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ msg: "Invalid category" });
        }

        // Create product (image will be added via separate upload endpoint)
        const product = await Product.create({
            name,
            description,
            price,
            image: "", // Initialize empty, will be updated when uploading image
            categoryId,
            createdBy: req.user.id
        });

        return res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { error, value } = updateProductSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        // Check if category exists if being updated
        if (value.categoryId) {
            const category = await Category.findById(value.categoryId);
            if (!category) {
                return res.status(400).json({ msg: "Invalid category" });
            }
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            value, 
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const uploadProductImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Save the image path
        product.image = req.file.path;
        await product.save();

        return res.status(200).json({
            message: "Image uploaded successfully",
            imagePath: product.image,
            product
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
};