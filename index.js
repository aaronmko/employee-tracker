require('dotenv').config();
const mysql = require('mysql');
const inquier = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_DB',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    figlet('Employee tracker', function(err, data) {
      if (err) {
        console.log('ascii art not loaded');
      } else {
        console.log(data);
      }  
      startPrompt();
    });
  });

  function startPrompt() {
    const startQuestion = [{
      type: "list",
      name: "action",
      message: "what would you like to do?",
      loop: false,
      choices: ["View all employees", "View all roles", "View all departments", "add an employee", "add a role", "add a department", "update role for an employee", "update employee's manager", "view employees by manager", "delete a department", "delete a role", "delete an employee", "View the total utilized budget of a department", "quit"]
    }]

    inquier.prompt(startQuestion)
    .then(response => {
      switch (response.action) {
        case "View all employees":
          viewAll("EMPLOYEE");
          break;
        case "View all roles":
          viewAll("ROLE");
          break;
        case "View all departments":
          viewAll("DEPARTMENT");
          break;
        case "add a department":
          addNewDepartment();
          break;
        case "add a role":
          addNewRole();
          break;
        case "add an employee":
          addNewEmployee();
          break;
        case "update role for an employee":
          updateRole();
          break;
        case "view employees by manager":
          viewEmployeeByManager();
          break;
        case "update employee's manager":
          updateManager();
          break;
        case "delete a department":
          deleteDepartment();
          break;
        case "delete a role":
          deleteRole();
          break;
        case "delete an employee":
          deleteEmployee();
          break;
        case "View the total utilized budget of a department":
          viewBudget();
          break;
        default:
          connection.end();
      }
    })
    .catch(err => {
      console.error(err);
    });
  }