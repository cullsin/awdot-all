import mongoose  from '../../common/services/mongoose.service.js';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    _id: { type: String, default: v4 },
    user_id: {type: String, required: true },
    last_4: {type: String, required: true },
    gender: {type: String, required: true },
    gov_id: {type: String, required: true },
    dateOfBirth: {type: Date, required: true },
    line1: {type: String, required : true },
    line2: {type: String, required : true },
    city: {type: String, required : true },
    state: {type: String, required : true },
    country: {type: String, required : true },
    postal_code: {type: String, required : true },
    web3_wallet: {type: String, required : true }, 
    wallet_key: {type: String, required : true }, 
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    is_deleted: {type: Boolean, default: false }
});

const Profile = mongoose.model('profile', profileSchema,'profile');

export async function findByUser(user_id) {
    return await Profile.find({user_id, is_deleted: false}).exec();
}

export async function createProfile(profileData) {
    const profile = new Profile(profileData);
    const result = await profile.save();
    return result;
}

// Ensure virtual fields are serialised.
profileSchema.set('toJSON', {
    virtuals: true
});

profileSchema.options.toJSON.transform = function (doc, ret, options) {
    ret.profile_id = ret._id;
    delete ret._id;
    delete ret.__v;
}

export async function updateProfile(profile) {
    const updatedProfile = await Profile.findById(profile.profile_id);
    await updatedProfile.updateOne({...profile});
    return await Profile.findById(profile.profile_id);
}
