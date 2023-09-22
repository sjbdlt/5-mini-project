
var projDisplay = $('#project-display');
var submitproject = $('#btnsubmitproject');

var today = dayjs();
$('#time-display').text(today.format('MMM D, YYYY h:mm:ss A'));


function getprojects(){
    projDisplay.empty();

    var project = localStorage.getItem('projects');

    if (project) {
        project = JSON.parse(project);
    } else {
        project = [];
        return;
    }

    for (var i = 0; i < project.length; i+= 1){

        var projDate = dayjs(project[i].projectdate);
        var today = dayjs().startOf('day');
    
        var rowID = $('<tr>');
        var nameLbl = $('<td>').text(project[i].projectname);
        var typeLbl = $('<td>').text(project[i].projectscope);
        var dateLbl = $('<td>').text(projDate.format('MM/DD/YYYY'));
    
      
        var deletebtn = $(
          '<td><button class="btn btn-sm btn-delete-project" data-index="' + i + '">Delete</button></td>' );
    
        if (projDate.isBefore(today)) {
            rowID.addClass('project-late');
        } else if (projDate.isSame(today)) {
            rowID.addClass('project-today');
        }
    
        rowID.append(nameLbl, typeLbl, dateLbl, deletebtn);
        projDisplay.append(rowID);

    }

}



function saveproject(event) {

    event.preventDefault();

    var pname = $('#project-name-input').val().trim();
    var pscope = $('#project-type-input').val();
    var pdate = $('#project-date-input').val();

    var proj = { projectname: pname, projectscope: pscope, projectdate: pdate }

    var project = localStorage.getItem('projects');

    if (project) {
        project = JSON.parse(project);
    } else {
        project = [];
    }

    project.push(proj);

    localStorage.setItem("projects",  JSON.stringify(project));

    $('#project-type-input').val('');
    $('#project-name-input').val('');
    $('#project-date-input').val('');

    getprojects();
}


function DeleteProject() {
    var projectIndex = parseInt($(this).attr('data-index'));
    
    
    var project = localStorage.getItem('projects');

    if (project) {
        project = JSON.parse(project);
    } else {
        project = [];
    }
    

    project.splice(projectIndex, 1);

    localStorage.setItem("projects",  JSON.stringify(project));


    getprojects();
  }

submitproject.on('click', saveproject);

projDisplay.on('click', '.btn-delete-project', DeleteProject);

getprojects();
