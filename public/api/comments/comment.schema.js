import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: { type: String, required: true },
    author: String,
    date: { type: Date, default: Date.now },
    content: { type: String, required: true},
    upvotes: Number
});

export default mongoose.model('comments', CommentSchema);
