import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  FullName: { type: String, required: true,},
  Email: { type: String, required: true, unique: true, },
  Phone: { type: String, required: true, default:'0000000000' },
  Password: { type: String, required: true, },
});

const User = mongoose.model('User', userSchema);
export default User;
