﻿import {isEqual} from "./object-compare";
import {JsonObject, JsonMember, TypedJSON} from "../typed-json";

@JsonObject()
class Person {
    @JsonMember()
    public firstName: string;

    @JsonMember()
    public lastName: string;

    constructor();
    constructor(firstName: string, lastName: string);
    constructor(firstName?: string, lastName?: string) {
        if (firstName && lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
}

@JsonObject()
class Employee extends Person {
    @JsonMember()
    public salary: number;

    @JsonMember()
    public joined: Date;

    constructor();
    constructor(firstName: string, lastName: string);
    constructor(firstName: string, lastName: string, salary: number, joined: Date);
    constructor(firstName?: string, lastName?: string, salary?: number, joined?: Date) {
        super(firstName, lastName);

        if (salary && joined) {
            this.salary = salary;
            this.joined = joined;
        }
    }
}

@JsonObject()
class PartTimeEmployee extends Employee {
    @JsonMember()
    public workHours: number;

    constructor();
    constructor(firstName: string, lastName: string, salary: number, joined: Date);
    constructor(firstName?: string, lastName?: string, salary?: number, joined?: Date) {
        super(firstName, lastName);

        if (salary && joined) {
            this.salary = salary;
            this.joined = joined;
        }
    }
}

@JsonObject()
class Investor extends Person {
    @JsonMember()
    public investAmount: number;

    constructor();
    constructor(firstName: string, lastName: string);
    constructor(firstName: string, lastName: string, investAmount: number);
    constructor(firstName?: string, lastName?: string, investAmount?: number) {
        super(firstName, lastName);

        this.investAmount = investAmount || 0;
    }
}

@JsonObject({ name: "company", knownTypes: [PartTimeEmployee, Investor] })
class Company {
    @JsonMember()
    public name: string;

    @JsonMember({ elementType: Employee })
    public employees: Array<Employee>;

    @JsonMember()
    public owner: Person;

    constructor() {
        this.employees = [];
    }
}

// Create a Company.
var company = new Company();
company.name = "Json Types";

switch (Math.floor(Math.random() * 4)) {
    case 0:
        company.owner = new Employee("John", "White", 240000, new Date(1992, 5, 27));
        break;

    case 1:
        company.owner = new Investor("John", "White", 1700000);
        break;

    case 2:
        company.owner = new PartTimeEmployee("John", "White", 160000, new Date(1992, 5, 27));
        break;

    default:
        company.owner = new Person("John", "White");
        break;
}

// Add employees.
for (var j = 0; j < 20; j++) {
    if (Math.random() < 0.2) {
        var newPartTimeEmployee = new PartTimeEmployee(
            `firstname_${j}`,
            `lastname_${j}`,
            Math.floor(Math.random() * 80000),
            new Date(Date.now() - Math.floor(Math.random() * 80000))
        );

        newPartTimeEmployee.workHours = Math.floor(Math.random() * 40);

        company.employees.push(newPartTimeEmployee);
    } else {
        company.employees.push(new Employee(
            `firstname_${j}`,
            `lastname_${j}`,
            Math.floor(Math.random() * 80000),
            new Date(Date.now() - Math.floor(Math.random() * 80000))
        ));
    }
}

var json = TypedJSON.stringify(company);
var reparsed = TypedJSON.parse(json, Company);

console.log("Test 1: @JsonObject extending @JsonObject with initializer.");
console.log(company);
console.log(TypedJSON.parse(json)); // Will parse using 'JSON.parse'.
console.log(reparsed);
console.log("Match: " + isEqual(company, reparsed));