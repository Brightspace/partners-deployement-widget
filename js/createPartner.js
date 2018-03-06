//This app should live at the department-level
var APIVersion = '1.12';
//Route used to create a new course
CSVal.routes.courses = '/d2l/api/lp/' + APIVersion + '/courses/';
//Route to pull children of current department--if department level
CSVal.routes.org_structure = '/d2l/api/lp/' + APIVersion + '/orgstructure/ORGID/children/';


ps.subscribe('csval/init', function () {
	//		org_structure	- get org structure
	CSVal.org_structure = CSVal.org_structure || {};
	CSVal.t_org_structure = new CSVal.init_tracking();
	var context = CSVal.t_org_structure.OuID;
});

/*
	Create a new course department
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/*
	Create a new course template
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/*
	CSVal.put_course: Create a mew course iteratively within a loop for 10 courses total
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
CSVal.put_course = function (c_name, c_code, c_path, c_template, c_semester, c_start, c_end, c_locale, c_forceLocale, c_addressBook) {
    //Variable to set the link text of the created courses
    var linkText = ""; //text for a specific course link at one point in time
	var route = CSVal.routes.courses;

	var courseInfo = {
		Name: c_name,
		Code: c_code,
		Path: c_path,
		CourseTemplateId: c_template,
		SemesterId: c_semester,
		StartDate: c_start,
		EndDate: c_end,
		LocaleId: c_locale,
		ForceLocale: c_forceLocale,
		ShowAddressBook: c_addressBook
	};

	valence_req
		.post(route)
		.send(courseInfo)
		.use(valence_auth)
		.end(function (err, response) {
			if (err != null) {
				console.log('csval.put_course error:');
				console.log(response);
				//Output the message of failure to the UI + change to red
				document.getElementById('creationStatusFlag').style.color = "Red";
				document.getElementById('creationStatusFlag').innerHTML = "Course creation(s) failed";
				return false;
			}
			else {
				//Output the message of success to the UI + change to blue
				document.getElementById('creationStatusFlag').style.color = "#006fbf";
				document.getElementById('creationStatusFlag').innerHTML = "Course creation(s) successful";
			}
			ps.publish('csval/put_course', response.body);

			//Parse body and create links to the courses created
			var responseObject = response.body;

			//After course was created, set linkText for this specific course
    		linkText = '<a href="' + window.location.protocol + '//' + window.location.hostname + '/d2l/home/' + responseObject['Identifier'] + '" target="_blank">Course Link</a> for: ' + responseObject['Name'];
    		//If the string is empty, make it the just created course link
    		if (window.linkOutput == undefined) {
    			window.linkOutput = linkText;
    		}
    		//if not empty, previous string values plus new course string
    		else {
    			window.linkOutput = window.linkOutput + '<br>' + linkText;
    		}
    		//console.log(window.linkOutput);
    		document.getElementById('courseCreationLinks').innerHTML = linkOutput;
		});
};
/*
	Create a new students
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/*
	Create a new instructors
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/*
	Create a new admins
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/*
	Enroll users
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
//1. Enroll all users at department. Admins as PartnerAdmin, students/instructors respectively.
//2. Enroll admins in demo courses
//3. Enroll instructors/students in newly created courses
/*
	Output logins and details for the distribution
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/