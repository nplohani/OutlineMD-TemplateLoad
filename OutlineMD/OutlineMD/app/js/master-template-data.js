
//function to allow user to edit master template from master template list.
$(document).ready(function(){
    getData();
})

function getData(){
    let id = getParameterByName('id')
    //send the id of the template with url to another page
    const url = 'http://localhost:3000/templates/' + id;

    //fetch the data of the template.
    fetch(url)
        .then((resp) => resp.json())
        .then(function (masterTemplate) {
        /* return masterTemplateList.map(function (templateList) {
            })*/
            //call the function to load tabs I had a quick look and couldn't find a way to move the template out of the promise
            loadTemplate(masterTemplate);
        })
        .catch(function (error) {
            console.log(error);
        });

}


//function to extract templateId from url.
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

