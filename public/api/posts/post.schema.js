import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    heading: { type: String, required: true },
    link: String,
    author: { type: String, required: true },
    comments: Array,
    date: { type: Date, default: Date.now },
    content: { type: String, required: true},
    upvotes: Number
});

export default mongoose.model('posts', PostSchema);