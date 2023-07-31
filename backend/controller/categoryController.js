const Category = require("../models/category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        message: "No categories were found :/",
      });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch categories.",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "No category was found :/",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch category by ID.",
    });
  }
};

const createCategory = async (req, res) => {
  const { name, categoryType } = req.body;

  try {
    const category = new Category({
      name: name,
      categoryType: categoryType,
    });

    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create category.",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        categoryType: req.body.categoryType,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "No category was found :/",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update category.",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found :/",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete category.",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
