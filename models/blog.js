const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        coverImageURL: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    }, 
    {timestamps: true}
);

const Blog = model('blog',blogSchema);

module.exports = Blog;