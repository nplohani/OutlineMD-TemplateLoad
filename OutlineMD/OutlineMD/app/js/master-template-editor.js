var templateObject = {
    Name: String,
    Status: String,
    Creator: String,
    Semester_Id : 0x00,
    Category : [],
    Section: [],
    user_id : 0x00
};

var EditorFunc = {

    addNewEditorBlock: function () {

        var editorHtmlTemplate = '<div id="learningOutcome-_IDX_" class="content">' +
            '<div class="row blockLearningOutcome">' +
            '<div class="col-md-12 pb-md-2">' +
            '<textarea class="form-control textarea-LO" id="taLearningOutcome-_IDX_" rows="1"></textarea>' +
            '</div>' +
            '<div class="col-md-12 pb-md-2">' +
            '<a class="btn btn-editor-remove" href="#" id="btnRemove-_IDX_" onClick="EditorFunc.removeEditorBlock(\'_IDX_\');">Remove</a>' +
            '</div>' +
            '</div>' +
            '</div>';
        var timestamp = (new Date).getTime(); //Math.round((new Date()).getTime() / 1000);
        var editorHtml = editorHtmlTemplate.replace(/_IDX_/gi, timestamp);
        //--# append the html into div
        $('#editors-wrapper').append(editorHtml);
    },

    removeEditorBlock: function (idx) {

        //--# pass the dynamic block(div) id of learning outcome to the onclick function to be delete. 
        $('#learningOutcome-' + idx).click(function () {
            $("#learningOutcome-" + idx).remove();
        });

        // alert(idx);
    }
};

