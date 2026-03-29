const Category = require("../models/Category");
const { createCategorySchema, updateCategorySchema } = require("./validators/categoryValidatores");

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        
        if (categories.length === 0) {
            return res.status(404).json({ msg: "Categories is empty" });
        }
        
        return res.status(200).json({
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        return res.status(200).json({
            message: "Category fetched successfully",
            category
        });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { error, value } = createCategorySchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        const { name, description } = value;

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ msg: "Category already exists" });
        }

        const category = await Category.create({ name, description });
        
        return res.status(201).json({
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { error, value } = updateCategorySchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            });
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            value,  
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};