// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor (teamMembersName, id, emailAddress, school) {
        super (teamMembersName, id, emailAddress);
        this.school = school;
    }
    getTeamMembersRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;