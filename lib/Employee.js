// TODO: Write code to define and export the Employee class
class Employee {
    constructor (teamMembersName, id, emailAddress) {
        this.teamMembersName = teamMembersName;
        this.id = id;
        this.emailAddress = emailAddress;
    }
    getTeamMembersName() {
        return this.teamMembersName;
    }
    getID() {
        return this.id;
    }
    getEmailAddress() {
        return this.emailAddress;
    }
    getTeamMembersRole() {
        return "Employee";
    }
}

module.exports = Employee;