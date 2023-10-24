import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: { type: String, default: v4 },
    firstName: {type: String, required: true },
    lastName: {type: String, required : true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    phone: {type: String, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false },
    is_active: {type: Boolean, default: false }
});

const User = mongoose.model('user', userSchema,'user');

export async function findByEmail(email) {
    return await User.find({email,is_deleted: false}).exec();
}

export async function findById(id) {
    return await User.findById(id);
}

export async function createUser(userData) {
    const user = new User(userData);
    const result = await user.save();
    return result;
}


// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.user_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

export async function activeUser({user_id}) {
    const exUser = await User.findById(user_id);
    exUser.is_active = true;
    const user = new User(exUser);
    const result = await user.save();
    return result;
}

export async function updateUser(user) {
    const updatedUser = new User(user);
    const result = await updatedUser.save();
    return result;
}

export async function updateUserPassword({email, password}) {
    const exUserArray = await User.find({email, is_deleted: false}).exec();
    const exUser = exUserArray[0];
    exUser.password = password;
    const user = new User(exUser);
    const result = await user.save();
    return result;
}

export async function list(perPage, page) {
    const total = await User.count({ is_deleted: false });
    const users = await User.find({ is_deleted: false }, {'password' : 0, 'is_deleted' : 0 }).limit(perPage).skip(perPage * page).exec();
    return { total, users };
}
