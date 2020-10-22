const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const engineerQuestions = [
    {
    type: "input",
    name: "name",
    message: "what the name of the engineer?",
},
{
    type: "input",
    name: "id",
    message: "what's your id number?",
},
{
    type: "input",
    name: "email",
    message: "what's your email address?",
},
{
    type: "input",
    name: "gitHub",
    message: "what's your github?",
}
]

const ManagerQuestions = [
    {
    type: "input",
    name: "name",
    message: "what the name of the manager?",
},
{
    type: "input",
    name: "id",
    message: "what's your id number?",
},
{
    type: "input",
    name: "email",
    message: "what's your email address?",
},
{
    type: "input",
    name: "officeNumber",
    message: "what's your office number?",
}
]

const internQuestions = [
    {
    type: "input",
    name: "name",
    message: "what the name of the intern?",
},
{
    type: "input",
    name: "id",
    message: "what's your id number?",
},
{
    type: "input",
    name: "email",
    message: "what's your email address?",
},
{
    type: "input",
    name: "school",
    message: "where do you go to school?",
}
]

//create a variable for the team member array
const team = []


function build() {

    function teamBuilder (){
        inquirer.prompt([
            {
                type: "list",
                name: "position",
                message: "What team member position would you like to add?",
                choices: ["Engineer", "Intern", "all done"]
            }
        ]).then(choice =>{
            switch(choice.position){
                case "Intern":
                    intern();
                    break;
                    
                case "Engineer":
                    engineer();
                    break;
                default:
                    buildEngine();
            }
        })
    }

    function manager(){
        inquirer.prompt(ManagerQuestions).then( resp => {
            const newManager = new Manager(resp.name, resp.id, resp.email, resp.officeNumber)
            team.push(newManager)
            teamBuilder();
        })
    }

    function engineer(){
        inquirer.prompt(engineerQuestions).then( resp => {
            const newEngineer = new Engineer(resp.name, resp.id, resp.email, resp.gitHub)
            team.push(newEngineer)
            teamBuilder();
        })
    }

    function intern(){
        inquirer.prompt(internQuestions).then( resp => {
            const newIntern = new Intern(resp.name, resp.id, resp.email, resp.school)
            team.push(newIntern)
            teamBuilder();
        })
    }

    function buildEngine(){
        //! !means whatever follows doesn't happen
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), 'utf-8');
    }

    manager();
}

build();




//?you need to create a function with class potentiall to get information from the user.
//?then pair that to the parent function like in class with super. this way manager gets mer info than employee.
//?then you need a way to append everything back to the html pages.


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
// for the provided `render` function to work! \\
