module.exports = (app) => {
    const templates = require('../controllers/templateController.js');
    const categories = require('../controllers/categoryController.js');
    const sections = require('../controllers/sectionController.js');

    //create a new template
    app.post('/templates', templates.create);

    //retrieve all templates
    app.get('/templates', templates.findAll);

    //retrieve a single template with templateID
    app.get('/templates/:templateId', templates.findOne);

    //find some templates matching search parameter
    app.post('/templates/search', templates.findSome);

    //Update a template with templateID
    app.put('/templates/:templateId', templates.update);

    //Delete a template with templateID
    app.delete('/templates/:templateId', templates.delete);

    //create a new category
    app.post('/categories', categories.create);

    //retrieve all categories
    app.get('/categories', categories.findAll);

    //retrieve a single categories with categoriyID
    app.get('/categories/:categoryId', categories.findOne);

    //Update a category with categoryID
    app.put('/categories/:categoryId', categories.update);

    //Delete a category with categoryID
    app.delete('/categories/:categoryId', categories.delete);

    //create a new section
    app.post('/sections', sections.create);

    //retrieve all sections
    app.get('/sections', sections.findAll);

    //retrieve a single section with sectionID
    app.get('/sections/:sectionId', sections.findOne);

    //Update a section with sectionID
    app.put('/sections/:sectionId', sections.update);

    //Delete a section with sectionID
    app.delete('/sections/:sectionId', sections.delete);
}