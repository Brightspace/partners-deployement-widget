// JavaScript Document

CSVal.devMode = false;
var ouNUM = parent.orgUnitId;
//console.log(ouNUM);

var availableTemplates = [];

// template id = 2

ps.subscribe('csval/get_org_structure', function () {
	showTemplates();
});

CSVal.get_org_structure(2); 

function showTemplates() {
	for (var i = 0; i < CSVal.org_structure.length; i++) {
		//console.log(CSVal.org_structure[i].Identifier);
		$('#templates').append('<option value="'+ CSVal.org_structure[i].Identifier +'">'+ CSVal.org_structure[i].Name +'</option>')
	}
} 



function createCourses(){
    //Reset the status flag text area from any previous runs
    document.getElementById('creationStatusFlag').innerHTML = "";
    document.getElementById('courseCreationLinks').innerHTML = "";
    var linkOutput = ''; //concatonated string of all course links, global
    window.index = 0; //the current course # we are on in terms of creation

    var courseNum = $("#courseNum").val();
    console.log(courseNum);

    var templateChoice = $("#templates").val();
    var templateInt = parseInt(templateChoice);
    console.log(templateInt);

    var prefix = $("#prefix").val();
    console.log(prefix);

    if(courseNum > 5)
    {
        console.log("ERROR: Number of courses too many");
        document.getElementById('creationStatusFlag').style.color = "Red";
        document.getElementById('creationStatusFlag').innerHTML = "Max 5 courses accepted";
    }
    else 
    {
        console.log("INFO: Course request is < 5");
        for(x = 0; x < courseNum; x++){
            window.index = x + 1;

            var courseName = prefix + (x + 1);
            console.log(courseName);

            var d = new Date();
            var n = d.toUTCString(); 

            var data = {
                Name: courseName,
                Code: courseName,
                Path: "",
                CourseTemplateId: templateInt,
                SemesterId: 6712,
                StartDate: n,
                EndDate: null,
                LocaleId: null,
                ForceLocale: false,
                ShowAddressBook: false
            };
            console.log(data);

            CSVal.put_course(courseName, courseName, "", templateInt, null, null, null, null, false, false);
        }
    }
   

}

            

