import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  itemname: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
}, { collection: 'menuitems' }); // explicit collection

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
export default MenuItem;
