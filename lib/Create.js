const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');
const inquirer = require('inquirer');
const fs = require('fs');

class Create {
    //create constructor to initialize the employees array, set the role to Manager at the start
    constructor() {
        this.employees = [];
        this.role = 'Manager';
    }
    //get employee info and add to the employees array, call init to get the role specific info
    async html() {
        const { name, id, email } = await this.getEmployeeInfo(this.role);
        this.init(name, id, email, this.role);
    }
    //get the role, if user wants to add another employee, call html again, if they don't, call writeFile 
    async getRole() {
        const { role } = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What type of team member would you like to add?',
                choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members']
            }
        ]);
    
        if (role === 'I don\'t want to add any more team members') {
            this.writeFile();
        } else {
            this.role = role;
            this.html();
        }
    }
    //get the role specific info and add to the employees array, then call getRole to get the next role.
    async init(name, id, email, role) {
        switch (role) {
            case 'Manager':                
                const { officeNumber } = await this.getManagerInfo();
                this.employees.push(new Manager(name, id, email, officeNumber));
                this.getRole();
                break;
            case 'Engineer':
                const { github } = await this.getEngineerInfo();
                this.employees.push(new Engineer(name, id, email, github));
                this.getRole();
                break;
            case 'Intern':
                const { school } = await this.getInternInfo();
                this.employees.push(new Intern(name, id, email, school));
                this.getRole(); 
                break;           
        }
    }
    // get the employee info and return it as an object
    async getEmployeeInfo(role) {
        const { name, id, email } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: `What is the ${role}\'s name?`
            },
            {
                type: 'input',
                name: 'id',
                message: `What is the ${role}\'s ID?`
            },
            {
                type: 'input',
                name: 'email',
                message: `What is the ${role}\'s email?`
            }
        ]);
        return { name, id, email };
    }
    //get the manager info and return it as an object
    async getManagerInfo() {
        const managerInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the team manager\'s office number?'
            }
        ]);
        return managerInfo;
    }
    //get the engineer info and return it as an object
    async getEngineerInfo() {
        const engineerInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'github',
                message: 'What is the engineer\'s github?'
            }
        ]);
        return engineerInfo;
    }
    //get the intern info and return it as an object
    async getInternInfo() {
        const internInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'school',
                message: 'What is the intern\'s school?'
            }
        ]);
        return internInfo;
    }
    //write the employees array to the team.html file, create css const, and write the css file
    writeFile() {
        const html = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>My team</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 jumbotron mb-3 team-heading">
                        <h1 class="text-center">My Team</h1>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="team-area col-12 d-flex justify-content-center">
                    ${this.employees.map(employee => `
                        <div class="card employee-card">
                            <div class="header">
                                <h2 class="card-title">${employee.getName()}</h2>
                                ${employee.getRole() ==='Manager' ? `<h3 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-watch" viewBox="0 0 16 16">
                                <path d="M8.5 5a.5.5 0 0 0-1 0v2.5H6a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V5z"/>
                                <path d="M5.667 16C4.747 16 4 15.254 4 14.333v-1.86A5.985 5.985 0 0 1 2 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86a5.99 5.99 0 0 1 1.918 3.48.502.502 0 0 1 .582.493v1a.5.5 0 0 1-.582.493A5.99 5.99 0 0 1 12 12.473v1.86c0 .92-.746 1.667-1.667 1.667H5.667zM13 8A5 5 0 1 0 3 8a5 5 0 0 0 10 0z"/>
                                </svg> Manager</h3>` : ''}
                                ${employee.getRole() ==='Engineer' ? `<h3 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                                <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                                </svg> Engineer</h3>` : ''}
                                ${employee.getRole() ==='Intern' ? `<h3 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                </svg> Intern</h3>` : ''}
                            </div>
                            <div class="body">
                                <ul class="list-group">
                                    <li class="list-group-item">ID: ${employee.getId()}</li>
                                    <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                                    ${employee.getRole() === 'Manager' ? `<li class="list-group-item">Office Number: ${employee.getOfficeNumber()}</li>` : ''}
                                    ${employee.getRole() === 'Engineer' ? `<li class="list-group-item">Github: ${employee.getGithub()}</li>` : ''}
                                    ${employee.getRole() === 'Intern' ? `<li class="list-group-item">School: ${employee.getSchool()}</li>` : ''}
                                </ul>
                            </div>
                        </div>    
                    `).join('')}
                    </div>
                </div>
            </div>
        </body>
        </html>`;
        const css = 
        `.team-heading {
            background-color: rgb(97, 97, 177);
            padding: 20px;
            border-bottom: 1px solid #e5e5e5;
            color: #e5e5e5;
        }
        .team-area {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        .employee-card {
            width: 300px;
            margin: 20px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
        }
        .employee-card .header {
            padding: 10px;
        }
        .employee-card .body {
            padding: 10px;
        }
        .employee-card .body ul {
            list-style: none;
            padding: 0;
        }
        .employee-card .body li {
            padding: 5px;
            font-weight: bold;
        }
        .header{
            background-color: rgb(97, 97, 177);
            padding: 0;
            border-bottom: 1px solid #e5e5e5;
            color: #e5e5e5;
        }
        `;
        fs.writeFileSync('./dist/team.html', html);
        fs.writeFileSync('./dist/style.css', css);
    }
}


module.exports = Create;