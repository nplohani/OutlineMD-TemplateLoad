
//publish the list of master templates into master template list page.

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const table = document.getElementById('masterTemplateList');
const url = 'http://localhost:3000/templates';

fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        let masterTemplateList = data;
        console.log(masterTemplateList)
        return masterTemplateList.map(function (templateList) {
            let tr = createNode('tr');

            let td = createNode('td');
            let version = createNode('version');
            version.innerHTML = `${templateList.__v}`;
            append(td, version);
            console.log(tr);
            append(tr, td);
            td = createNode('td');
            let name = createNode('name');
            name.innerHTML = `${templateList.name}`;
            append(td, name)
            append(tr, td);
            td = createNode('td');
            let dateCreated = createNode('dateCreated');
            dateCreated.innerHTML = `${templateList.createdAt}`;
            append(td, dateCreated)
            append(tr, td);
            td = createNode('td');
            let status = createNode('status');
            status.innerHTML = `${templateList.status}`;
            append(td, status)
            append(tr, td);
            td = createNode('td');
            let a = createNode('a');
            a.innerHTML = "Edit";
            a.href="/views/master-template-editor.html?id=" + templateList._id;

            append(td, a)
            append(tr, td);

            append(table, tr);
        })
    })
    .catch(function (error) {
        console.log(error);
    });