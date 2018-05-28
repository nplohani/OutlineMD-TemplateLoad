const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create schema for template

//before creating schema for template, create schema of category
const categorySchema = new Schema({
    heading: String
});

//create schema for section
const sectionSchema = new Schema({
    parent: Schema.Types.ObjectId,
    title: String,
    type: Number,
    content: String,
    permission: Number
});

//combine category and section schema into template schema
const templateSchema = new Schema({
 semester_id: Schema.Types.ObjectId,
 user_id: Schema.Types.ObjectId,
 creator: String,
 category: [categorySchema],
 section: [sectionSchema]
}, {
    timestamps: true
});


module.exports = {
    Template: mongoose.model('Template',templateSchema),
    Category: mongoose.model('Category', categorySchema),
    Section: mongoose.model('Section', sectionSchema)
};