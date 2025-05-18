import MenuItem from '../models/MenuItems.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';

export const addMenuItem = async (req, res) => {
  let result = null;
  try {
    const { itemname, description, price, category } = req.body;

    // Basic field validation
    if (!itemname || !description || !price || !category || !req.file) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Validate price
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid price value' });
    }

    // Check for duplicate item
    const existing = await MenuItem.findOne({ itemname });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Item already exists' });
    }

    // Upload image to Cloudinary
    result = await cloudinary.uploader.upload(req.file.path, { folder: 'items' });

    // Delete local file
    await fs.unlink(req.file.path);

    // Create new item
    const menuitem = new MenuItem({
      itemname,
      description,
      price,
      category,
      image: result.secure_url,
    });

    await menuitem.save();

    res.status(201).json({ success: true, message: 'Item added to menu', menuitem });

  } catch (error) {
    // Clean up Cloudinary and local file if error
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    if (result?.public_id) {
      await cloudinary.uploader.destroy(result.public_id).catch(() => {});
    }

    console.error('Error adding menu item:', error.message);
    res.status(500).json({ success: false, message: 'Failed to add item', error: error.message });
  }
};

export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.json({ success: true, message: 'Deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { itemname, description, price, category } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        itemname,
        description,
        price,
        category,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Update failed', error: error.message });
  }
};
