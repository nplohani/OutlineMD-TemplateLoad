var templateObject = {
    name: String,
    status: String,
    creator: String,
    semester_id: 0x00,
    category: [],
    section: [],
    user_id: 0x00
};

//load template into tabs and sections
function loadTemplate(template){
    if(template != null)
    {
        //push the template from DB into local object
        templateObject = template;
        console.log(templateObject);
        for(var i = 0; i < templateObject.category.length; i++)
        {
            console.log(templateObject.category[i].title + ' : '+ templateObject.category[i].category_id)
            //adding tabs with ID's from the DB
            $('div#myTab a').before('<button class="tablinks" id ="' + (templateObject.category[i].category_id) + '"onclick="openTab(event, \'Tab' + (templateObject.category[i].category_id) + '\')" draggable = "true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)">' + (templateObject.category[i].title) + '</button>');
            var contents = document.createElement("div");
            contents.id = "Tab" + (templateObject.category[i].category_id);
            contents.className = "tabcontent";
            $(contents).appendTo('div#here');
            //so this is where the hamburger is being added to the created tab it is calling this when pressed subSectionMenu(5afedd329cf23a2b48546087) but im getting an error and no behavior
            document.getElementById('Tab' + (templateObject.category[i].category_id)).innerHTML = ' <div class="dropdown"><button onclick="subSectionMenu(\'' + (templateObject.category[i].category_id) + '\')" style="background: url(/assets/img/menuIcon.png)" class="dropbtn"></button> <div id="myDropdown' + (templateObject.category[i].category_id) + '" class="dropdown-content"> <a onclick="addSubSection(\'' + (templateObject.category[i].category_id) + '\')" href="#subSectionModal"> Add </a><a onclick="editSection(\'' + (templateObject.category[i].category_id) + '\')" href="#editSectionModal"> Edit </a> <a href="#"> Delete </a></div></div>';
            for(var j = 0; j < templateObject.section.length; j++){
                if (templateObject.section[j].Parent == templateObject.category[i].category_id){
                    console.log('-->' + templateObject.section[j].Title + ' : ' + templateObject.section[j].Parent);
                    // addSubSection(templateObject.category[i].category_id);
                }
            }
        }
    }
};


//User presses the Save button in the popup view when entering a tab name
document.getElementById('changeSectionName').addEventListener('click', function () {
    var nbrButtonElem = ($('div#myTab button').length) - 1;
    var value = document.getElementById('inputSectionName').value;
    document.getElementById(nbrButtonElem).innerHTML = value;

    //Code to update the array for the correct index
    templateObject.category[(nbrButtonElem - 1)].title = value;

    document.getElementById('inputSectionName').value = "";
    document.getElementById('openModal').className = "hidden";
    $(this).attr("href", "?#");
});

//User presses the cancel button in the popup view when entering a tab name
document.getElementById('cancelSectionName').addEventListener('click', function () {
    var nbrButtonElem2 = ($('div#myTab button').length) - 1;
    document.getElementById('inputSectionName').value = "";
    document.getElementById('openModal').className = "hidden";
    var deletable = document.getElementById(nbrButtonElem2);
    var deletable2 = document.getElementById('Tab' + nbrButtonElem2);
    deletable.remove();

    //Leaves the tab contents in place for the first tab so that it all runs
    if (nbrButtonElem2 > 1) {
        deletable2.remove();
    }
    templateObject.category.pop();
    $(this).attr("href", "?#");
});

//User presses the Save button in the popup view when entering a subsection name name
document.getElementById('changeSubSectionName').addEventListener('click', function () {
    var acc = document.getElementsByClassName("accordion");
    var accNum = acc.length;
    var value = document.getElementById('inputSubSectionName').value;
    templateObject.section[accNum - 1].Title = value;
    document.getElementById("acc" + accNum).innerHTML = value;
    //document.getElementById("acc" + accNum).innerHTML = document.getElementById("acc" + accNum).innerHTML + " <div class="dropdown">  <button onclick="#" style="background: url(/assets/img/menuIcon.png)" class="dropbtn"></button><div id="subSectionDropdown' + accNum + '" class="dropdown-content"><a href="#">Edit</a>";
    document.getElementById('inputSubSectionName').value = "";
    document.getElementById('subSectionModal').className = "hidden";
    $(this).attr("href", "?#");
});

//User presses the cancel button in the popup view when entering a tab name
document.getElementById('cancelSubSectionName').addEventListener('click', function () {
    var acc = document.getElementsByClassName("accordion");
    var accNum = acc.length;
    var div = document.getElementById("container" + accNum);
    document.getElementById('inputSubSectionName').value = "";
    document.getElementById('subSectionModal').className = "hidden";
    div.remove();
    templateObject.section.pop();
    $(this).attr("href", "?#");
});


function addSubSection(number) {
    var acc = document.getElementsByClassName("accordion");
    var accNum = acc.length + 1;
    var container = document.createElement("div");
    var buttonAcc = document.createElement("button");
    var dropdownDiv = document.createElement("div");
    var dropButton = document.createElement("button"); //Edit subsection header dropdown
    dropdownDiv.className = "dropdown";
    dropdownDiv.id = "dd" + accNum;
    dropButton.className = "dropbtn";
    dropButton.style = "background: url(/assets/img/menuIcon.png)";
    dropButton.setAttribute("onclick", "functionhere();");
    var dropDiv = document.createElement("div");
    dropDiv.className = "dropdown-content";
    dropDiv.id = "subSectionDropdown" + accNum;
    var edit = document.createElement("a");
    edit.setAttribute("onclick", "#"); //need to change to modal function


    buttonAcc.className = "accordion";
    buttonAcc.innerHTML = "Section " + accNum;
    buttonAcc.id = "acc" + accNum;
    buttonAcc.setAttribute("onclick", "accClicked();");
    container.id = "container" + accNum;

    //Anna to work on Draggable stuff, currently not working
    container.setAttribute("ondragstart", "dragStarted(event)");
    container.setAttribute("ondragover", "draggingOver(event)");
    container.setAttribute("ondrop", "dropped(event)");
    container.setAttribute('draggable', true);

    //end draggable
    var panelDiv = document.createElement("div");
    panelDiv.className = "subSection";
    panelDiv.id = "panel" + accNum;
    var placeholder = document.createElement("textArea");
    //dynamically add the accordion to the tab

    $('div#Tab' + number).append(container);
    $(container).append(buttonAcc);


    $(panelDiv).insertAfter("#acc" + accNum);
    $("#panel" + accNum).append(placeholder);
    document.getElementById('subSectionModal').className = "modalDialog2";

    var parent = ('Tab' + number);

    var subSection = { __id: accNum, Parent: parent, Type: "", Title: "Section" + accNum, Content: "", Permission: 0 };

    templateObject.section.push(subSection);
    $(this).attr("href", "?#");
}

//User presses the Save button in the popup view when entering a new tab name
document.getElementById('changeNewSectionName').addEventListener('click', function () {
    var value = document.getElementById('inputNewSectionName').value;
    var currentTab = $('.tablinks.active').attr('id');
    document.getElementById(currentTab).innerHTML = value;

    //Code to update the array for the correct index
    templateObject.category[currentTab - 1].Title = value;

    document.getElementById('inputNewSectionName').value = "";
    document.getElementById('editSectionModal').className = "hidden";
    $(this).attr("href", "?#");
});

//User presses the cancel button in the popup view when entering a new tab name
document.getElementById('cancelNewSectionName').addEventListener('click', function () {
    document.getElementById('inputNewSectionName').value = "";
    document.getElementById('editSectionModal').className = "hidden";
    $(this).attr("href", "?#");
});


function editSection(number) {
    document.getElementById('editSectionModal').className = "modalDialog3";
}


//User presses the add tab button
function reply_click() {
    var nbrLiElem = ($('div#myTab button').length) - 1;
    if (nbrLiElem != 0) {
        $('div#myTab a').before('<button class="tablinks" id ="' + (nbrLiElem + 1) + '"onclick="openTab(event, Tab' + (nbrLiElem + 1) + ')" draggable = "true" ondragstart="dragStarted(event)" ondragover="draggingOver(event)" ondrop="dropped(event)">Tab' + (nbrLiElem + 1) + '</button>');
        var contents = document.createElement("div");
        contents.id = "Tab" + (nbrLiElem + 1);
        contents.className = "tabcontent";
        $(contents).appendTo('div#here');
        document.getElementById('Tab' + (nbrLiElem + 1)).innerHTML = ' <div class="dropdown"><button onclick="subSectionMenu(' + (nbrLiElem + 1) + ')" style="background: url(/assets/img/menuIcon.png)" class="dropbtn"></button> <div id="myDropdown' + (nbrLiElem + 1) + '" class="dropdown-content"> <a onclick="addSubSection(' + (nbrLiElem + 1) + ')" href="#subSectionModal"> Add </a><a onclick="editSection(' + (nbrLiElem + 1) + ')" href="#editSectionModal"> Edit </a> <a href="#"> Delete </a></div></div>'; //Might be able to put all your code here in one go :)
        document.getElementById('openModal').className = "modalDialog";

        //Trying to add an array for the tab
        var aTab = { __id: (nbrLiElem + 1), Title: "Tab" + (nbrLiElem + 1) };
        templateObject.category.push(aTab);
    }
    else {
        var firstButton = document.createElement("button");
        firstButton.className = "tablinks";
        firstButton.innerHTML = "Tab1";
        firstButton.setAttribute("onclick", "openTab(event, Tab1)");
        firstButton.setAttribute("ondragstart", "dragStarted(event)");
        firstButton.setAttribute("ondragover", "draggingOver(event)");
        firstButton.setAttribute("ondrop", "dropped(event)");
        firstButton.setAttribute('draggable', true);
        firstButton.id = "1";
        $(firstButton).prependTo('div#myTab');
        document.getElementById('openModal').className = "modalDialog";

        //Trying to add an array for the tab
        var aTab = { __id: (nbrLiElem + 1), Title: "Tab" + (nbrLiElem + 1) };
        templateObject.category.push(aTab);
    }
}

/* Functions that allow
 * items to be dragged
 * and dropped in the interface.
 * */

function dragStarted(evt) {
    //start drag
    source = evt.target;
    //set data
    evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
    //specify allowed transfer
    evt.dataTransfer.effectAllowed = "move";
}

function draggingOver(evt) {
    //drag over
    evt.preventDefault();
    //specify operation
    evt.dataTransfer.dropEffect = "move";
}

function dropped(evt) {
    //drop
    evt.preventDefault();
    evt.stopPropagation();
    //update text in dragged item
    source.innerHTML = evt.target.innerHTML;
    //update text in drop target
    evt.target.innerHTML = evt.dataTransfer.getData("text/plain");

    //Get the id for the tab we're moving
    var firstMoved = evt.target.id;
    //  alert(firstMoved);

    //Get the id for the tab that we're moving to
    var secondMoved = source.id;
    //  alert(secondMoved);

    //Temp variable for updating the array
    var tempMoved = allTabs[evt.target.id - 1];

    //Get the Tab(id) aka the contents that we're moving
    var tabContentsMoved = document.getElementById('Tab' + firstMoved).innerHTML;

    //When dropping, get the Tab(id) of the tab contents we're moving to
    var oldTabContentsMoved = document.getElementById('Tab' + secondMoved).innerHTML;

    //Update the array appropriately NOT FINISHED yet
    tempMoved = templateObject.category[firstMoved - 1];
    templateObject.category[firstMoved - 1] = templateObject.category[secondMoved - 1];

    //Update both locations to represent the moved items
    var temp = document.getElementById('Tab' + firstMoved).innerHTML;

    document.getElementById('Tab' + firstMoved).innerHTML = oldTabContentsMoved;
    document.getElementById('Tab' + secondMoved).innerHTML = temp;
}

//Dropped function for the accordion movement
function dropped2(evt) {
    //drop
    evt.preventDefault();
    evt.stopPropagation();
    //update text in dragged item
    source.innerHTML = evt.target.innerHTML;
    //update text in drop target
    evt.target.innerHTML = evt.dataTransfer.getData("text/plain");

    //Get the id for the tab we're moving
    var firstMoved = evt.target.id;
    //  alert(firstMoved);

    //Get the id for the tab that we're moving to
    var secondMoved = source.id;
    //  alert(secondMoved);

    //Temp variable for updating the array
    var tempMoved = allSubSections[evt.target.id - 1];

    //Get the SubSection(id) aka the contents that we're moving
    var subSectionsContentsMoved = document.getElementById('container' + firstMoved).innerHTML;

    //When dropping, get the SubSection(id) of the tab contents we're moving to
    var oldSubSectionsContentsMoved = document.getElementById('container' + secondMoved).innerHTML;


    //Update both locations to represent the moved items
    var temp = document.getElementById('container' + firstMoved).innerHTML;

    document.getElementById('container' + firstMoved).innerHTML = oldSubSectionsContentsMoved;
    document.getElementById('container' + secondMoved).innerHTML = temp;
}

//When a tab is clicked, this allows the contents to be displayed

//Code that allows a tab's content to be displayed
function openTab(evt, Name) {
    var i, tabcontent, tablinks;
    var id = Name.id;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    if (id == null) {
        //Click on every other tab
        document.getElementById(Name).style.display = "block";
        evt.currentTarget.className += " active";

    }
    else {
        //Click on the first tab
        document.getElementById(id).style.display = "block";
        evt.currentTarget.className += " active";
    }


}


function subSectionMenu(x) {
    console.log(x);
    document.getElementById('myDropdown' + x).style.display = "block";
}

//Close SubSection DropDown if clicked away from menu
window.onclick = function (event) {
    var hopeful = $('.tablinks.active').attr('id');
    if (!event.target.matches('.dropbtn')) {
        document.getElementById('myDropdown' + hopeful).style.display = "none";
    }
}


function accClicked() {
    var i = event.target.id;
    var x = document.getElementById(i);
    /* Toggle the class to trigger action */
    x.classList.toggle("active");
    /* Toggle between hiding and showing the active panel */
    var panel = x.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}