const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let responseQuantity;
const teamMembers = [];
const inquirer = require("inquirer");

function runApp() {
    writeDoc();
    addTeamMember();
}

runApp();

function addTeamMember() {
    inquirer
    .prompt([
        {
            type: 'name',
            name: 'name',
            message: 'Enter a team member\'s name.',
        },
        {
            type: 'rawlist',
            name: 'employeeRole',
            message: 'What is this team member\'s role?',
            choices: ['Intern', 'Engineer', 'Manager'],
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter this team member\'s ID.',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter this team member\'s email address.',
        },
    ])
    .then(function({name, employeeRole, id, email}) {
        let teamInfo = "";
        if (employeeRole === "Intern") {
            teamInfo = "school name.";
        } else if (employeeRole === "Engineer") {
            teamInfo = "GitHub username.";
        } else {
            teamInfo = "office or cell phone number.";
        }
        inquirer
        .prompt([
            {
                type: 'input',
                message: `Enter ${name}'s ${teamInfo}`,
                name: 'teamInfo',
            },
            {
                type: 'rawlist',
                name: 'addTeam',
                message: 'Do you want to add another team member?',
                choices: ['Yes', 'No'],
            }
        ])
        .then(function({teamInfo, addTeam}) {
            let newTeamMember;
            if (employeeRole === "Intern") {
                newTeamMember = new Intern(name, id, email, teamInfo);
            } else if (employeeRole === "Engineer") {
                newTeamMember = new Engineer(name, id, email, teamInfo);
            } else {
                newTeamMember = new Manager(name, id, email, teamInfo);
            }
            teamMembers.push(newTeamMember);
            addCodeSnippet(newTeamMember)
            .then(function() {
                if (addTeam === "Yes") {
                    addTeamMember();
                } else {
                    finishDoc();
                }
            });
        });
    });
}

function writeDoc() {
    const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Team Roster</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-xVVam1KS4+Qt2OrFa+VdRUoXygyKIuNWUUUBZYv+n27STsJ7oDOHJgfF0bNKLMJF" crossorigin="anonymous">
                </head>
                <body>
                    <nav class="navbar navbar-dark bg-dark">
                        <h3 style="color:white;">Team Roster</h3>
                    </nav>
                    <div class="container">
                        <div class="row">
                `
    fs.writeFile("teamRoster.html", html, function(error) {
        if (error) {
            console.log(error);
        }
    })
    console.log("testing");
}

function addCodeSnippet(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getTeamMembersName();
        const employeeRole = member.getTeamMembersRole();
        const id = member.getID();
        const email = member.getEmailAddress();
        let codeSnippet = "";
        if (employeeRole === "Intern") {
            const school = member.getSchool();
            codeSnippet = `
                            <div class="col-4">
                            <div class="card mx-auto mb-3" style="width: 18rem">
                            <h5 class="card-header" style="background-color: green; color: white;">${name}<br><i class="fas fa-graduation-cap"></i></i></i> Intern</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>ID:</b> ${id}</li>
                                <li class="list-group-item"><b>Email Address:</b> ${email}</li>
                                <li class="list-group-item"><b>School:</b> ${school}</li>
                            </ul>
                            </div>
                        </div>
                        `
        } else if (employeeRole === "Engineer") {
            const gitHubName = member.getGithub();
            codeSnippet = `
                            <div class="col-4">
                            <div class="card mx-auto mb-3" style="width: 18rem">
                            <h5 class="card-header" style="background-color: orange; color: white;">${name}<br><i class="fas fa-laptop-code"></i></i> Engineer</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>ID:</b> ${id}</li>
                                <li class="list-group-item"><b>Email Address:</b> ${email}</li>
                                <li class="list-group-item"><b>GitHub:</b> ${gitHubName}</li>
                            </ul>
                            </div>
                        </div>

                        `
        } else {
            const officeNumber = member.getOfficeNumber();
            codeSnippet = `
                            <div class="col-4">
                            <div class="card mx-auto mb-3" style="width: 18rem">
                            <h5 class="card-header" style="background-color: blue; color: white;">${name}<br><i class="fas fa-mug-hot"></i> Manager</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>ID:</b> ${id}</li>
                                <li class="list-group-item"><b>Email Address:</b> ${email}</li>
                                <li class="list-group-item"><b>Office Phone:</b> ${officeNumber}</li>
                            </ul>
                            </div>
                        </div>
                         `
        }
        console.log("adding...");
        fs.appendFile("teamRoster.html", codeSnippet, function(error) {
            if (error) {
                return reject(error);
            }
            return resolve();
        })
    })
}

function finishDoc() {
    const endCode = `
                        </div>
                        </div>
                        
                    </body>
                    </html>
    
                    `;

    fs.appendFile("teamRoster.html", endCode, function(error) {
        if(error) {
            console.log(error);
        }
    })
    console.log("complete!");
}


// function Questions(responseQuantity) {
//     let counter = 1;
//     console.log('HERE');
//     if (counter < responseQuantity) {
//         console.log('HERE AGAIN');
//         inquirer
//         .prompt([
//             {
//                 type: 'input',
//                 name: 'name',
//                 message: 'Enter the name of a person on your team.',
//             },
//             {
//                 type: 'rawlist',
//                 name: 'employeeType',
//                 message: 'What type of team member is this person?',
//                 choices: ['intern', 'engineer', 'manager'],
//             }
//         ]).then(answers => {
//             let type = answers.employeeType;     
//             if (type === 'intern') {
//                 inquirer
//                 .prompt([
//                     {
//                         type: 'input',
//                         name: 'name',
//                         message: 'testing.',
//                     }
//                 ])
//             } else if (type === 'engineer') {
//                 inquirer
//                 .prompt([
//                     {
//                         type: 'input',
//                         name: 'name',
//                         message: 'testing',
//                     }
//                 ])
//             } else {
//                 // questions
//             }
//         })

//         counter ++ 

//         Questions();
//     } else {
//         return;
//     }
// }


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
