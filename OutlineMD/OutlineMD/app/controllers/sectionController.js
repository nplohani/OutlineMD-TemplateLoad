const model = require('../models/models.js');
const Section = model.Section;

//Create and save new section
exports.create = (req, res)=> {
    //Validating request
    if(!req.body) {
        return res.status(400).send({
            Message: "section content can not be empty."
        });
    }

    
    //Create a section
    const section = new Section({
        parent: req.body.parent,
        title: req.body.title,
        type: req.body.type,
        content: req.body.content,
        permission: req.body.permission
      
    });

    //save section into the database
    section.save().then(section=> {
        res.send(section);
    }).catch(err=> {
        res.status(500).send({
            message: err.message 
        });
    });

};

//Retrieve and return all sections from database
exports.findAll = (req, res)=> {
    Section.find().then(sections => {
        res.send(sections);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retriving sections."
        });
    });
};


//Find a single section with sectionId
exports.findOne = (req, res)=> {
    Section.findById(req.params.sectionId).then(section => {
        if(!section){
            return res.status(404).send({
                message: "section is not found with ID " + req.params.sectionId
            });
        }
        res.send(section);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "section not found with ID" + req.params.sectionId
            });

        }
        return res.status(500).send({
            message: "Error retriving section with ID" + req.params.sectionId
        });
    });

};

//Update a section identified by the sectionId in the user request
exports.update = (req, res)=> {
    //validating request
    if(!req.body){
        return res.status(400).send({
            message: "section can not be empty."
        });
    }

    //Find section and update with the requested body content
    Section.findByIdAndUpdate(req.params.sectionId, {
        heading: req.body.heading

    }, {new: true}).then(section => {
        if(!section){
            return res.status(404).send({
                message: "section not found with ID " + req.body.sectionId
            });
        }
        res.send(section);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "section not found with ID " + req.params.sectionId
            });
        }
        return res.status(500).send({
            message: "Error updating section with ID " + req.params.sectionId
        });
    });
};


//Delete a section with the specified sectionId in the user request
exports.delete = (req, res)=> {

    Section.findByIdAndRemove(req.params.sectionId).then(section => {
        if(!section) {
            return res.status(404).send ({
                message: "section not found with ID " + req.params.sectionId
            });
        }
        res.send({message: "section deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "section not found with ID " + req.params.sectionId
            });            
        }
        return res.status(500).send({
            message: "Could not delete section with ID " + req.params.sectionId
        });
    });

};

