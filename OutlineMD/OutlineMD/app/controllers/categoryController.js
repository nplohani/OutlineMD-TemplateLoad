const model = require('../models/models.js');
const Category = model.Category;


//Create and save new Category
exports.create = (req, res)=> {
    //Validating request
    if(!req.body) {
        return res.status(400).send({
            Message: "Category content can not be empty."
        });
    }

    
    //Create a Category
    const category = new Category({
        heading: req.body.heading
      
    });

    //save category into the database
    category.save().then(category=> {
        res.send(category);
    }).catch(err=> {
        res.status(500).send({
            message: err.message 
        });
    });

};

//Retrive and return all categories from database
exports.findAll = (req, res)=> {
    Category.find().then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retriving categories."
        });
    });
};


//Find a single category with categoryId
exports.findOne = (req, res)=> {
    Category.findById(req.params.categoryId).then(category => {
        if(!category){
            return res.status(404).send({
                message: "Category is not found with ID " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Category not found with ID" + req.params.categoryId
            });

        }
        return res.status(500).send({
            message: "Error retriving category with ID" + req.params.categoryId
        });
    });

};

//Update a category identified by the categoryId in the user request
exports.update = (req, res)=> {
    //validating request
    if(!req.body){
        return res.status(400).send({
            message: "category can not be empty."
        });
    }

    //Find category and update with the requested body content
    Category.findByIdAndUpdate(req.params.categoryId, {
        heading: req.body.heading

    }, {new: true}).then(category => {
        if(!category){
            return res.status(404).send({
                message: "Category not found with ID " + req.body.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with ID " + req.params.categoryId
            });
        }
        return res.status(500).send({
            message: "Error updating category with ID " + req.params.categoryId
        });
    });
};


//Delete a category with the specified categoryId in the user request
exports.delete = (req, res)=> {

    Category.findByIdAndRemove(req.params.categoryId).then(category => {
        if(!category) {
            return res.status(404).send ({
                message: "Category not found with ID " + req.params.categoryId
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with ID " + req.params.categoryId
            });            
        }
        return res.status(500).send({
            message: "Could not delete category with ID " + req.params.categoryId
        });
    });

};

