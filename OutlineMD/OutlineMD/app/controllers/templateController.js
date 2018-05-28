const model = require('../models/models.js');
const Template = model.Template;


//Create and save new Template
exports.create = (req, res) => {
    //Validating request
    if (!req.body) {
        return res.status(400).send({
            Message: "Template content can not be empty."
        });
    }


    //Create a template
    const template = new Template({
        semester_id: req.body.semester_id,
        user_id: req.body.user_id,
        creator: req.body.creator,
        category: req.body.category,
        section: req.body.section

    });

    //save template into the database
    template.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

};

//Retrieve and return all templates from database
exports.findAll = (req, res) => {
    Template.find().then(templates => {
        res.send(templates);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retriving templates."
        });
    });
};


//Find a single template with templateId
exports.findOne = (req, res) => {
    Template.findById(req.params.templateId).then(template => {
        if (!template) {
            return res.status(404).send({
                message: "Template is not found with ID " + req.params.templateId
            });
        }
        res.send(template);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Template not found with ID" + req.params.templateId
            });

        }
        return res.status(500).send({
            message: "Error retriving template with ID" + req.params.templateId
        });
    });

};

//Update a template identified by the templateId in the user request
exports.update = (req, res) => {
    //validating request
    if (!req.body) {
        return res.status(400).send({
            message: "template can not be empty."
        });
    }

    //Find template and update with the requested body content
    Template.findByIdAndUpdate(req.params.templateId, {
        semester_id: req.body.semester_id,
        user_id: req.body.user_id,
        creator: req.body.creator,
        category: req.body.category,
        section: req.body.section
    }, { new: true }).then(template => {
        if (!template) {
            return res.status(404).send({
                message: "Template not found with ID " + req.body.templateId
            });
        }
        res.send(template);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Template not found with ID " + req.params.templateId
            });
        }
        return res.status(500).send({
            message: "Error updating note with ID " + req.params.templateId
        });
    });
};


//Delete a template with the specified templateId in the user request
exports.delete = (req, res) => {

    Template.findByIdAndRemove(req.params.templateId).then(template => {
        if (!template) {
            return res.status(404).send({
                message: "Template note found with ID " + req.params.templateId
            });
        }
        res.send({ message: "Template deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Template not found with ID " + req.params.templateId
            });
        }
        return res.status(500).send({
            message: "Could not delete template with ID " + req.params.templateId
        });
    });

};

//find
exports.findSome = (req, res) => {
    if (req.body) {
        var opt = req.body.query
        var opt1 = { $regex: new RegExp(".*" + opt.toLowerCase() + ".*", "i") }
        Template.find({
            $or: [{ creator: opt1 }, { name: opt1 }]

        }).then(templates => {
            res.send(templates);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriving templates."
            });
        });

    } else {
        //do nothing
    }
};
