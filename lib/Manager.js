// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
var Employee = require("./Employee")


class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email)
        this.officeNumber = officeNumber;
    }
    getRole(){
        //overwritten to return Manager.
        return "Manager";
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
//const e = new Manager("Foo", 1, "test@test.com", testValue);


module.exports = Manager;