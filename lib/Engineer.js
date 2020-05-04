// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (teamMembersName, id, emailAddress, gitHubName) {
        super (teamMembersName, id, emailAddress);
        this.gitHubName = gitHubName;
    }
    getTeamMembersRole() {
        return "Engineer";
    }
    getGithub() {
        return this.gitHubName;
    }
}

module.exports = Engineer;