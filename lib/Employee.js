// TODO: Write code to define and export the Employee class
class Employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getTeamMembersName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmailAddress() {
        return this.email;
    }
    getTeamMembersRole() {
        return "Employee";
    }
}

module.exports = Employee;