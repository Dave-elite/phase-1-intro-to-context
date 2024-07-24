// Your code here

// sayHello('DAvid')
// function sayHello(name){
//     console.log('hello'+ name)
// }

// if(2 === '2'){
//     console.log('This is true');
// }
// const myName = "David"

// if(myName === window.myName){
//     console.log("this is a true statement")
// }
///Excecution context is how js knows things like what variables are in scope, what methods are available
//Excecution context is the sapce set aside in js engine memory containing references to the variables and methods that re curreently in scope.
//THIS: refers to as a special object that is part of the current exceution context
//CALL: This is a methosd on a function that calls the function
//APPLY: method of function that calls the functions just like ()
//BIND: method that returns a copy of the function it's calles on
//MapReduce is a programming model and an associated implementtaion for processing and generatinf big data sets with a parallel, distributed alogorithm on a cluster

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}
const employeeArray = [
    ["John", "Doe", "Manager", 30],
    ["Jane", "Smith", "Developer", 25],
    ["Emily", "Jones", "Designer", 20]
]
const employeeRecords = createEmployeeRecords(employeeArray)
// console.log(employeeRecords);

function createTimeInEvent(employeeRecord, dateTimeString){
    const [date, hour] = dateTimeString.split(' ')
    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    };
     employeeRecord.timeInEvents.push(timeInEvent)

     return employeeRecord

}
// const employee = {
//     firstName: "John",
//     familyName: "Doe",
//     title: "Manager",
//     payRatePerHour: 30,
//     timeInEvents: [],
//     timeOutEvents: []
// };


// console.log(employee,'2024-07-24 0900')
function createTimeOutEvent(employeeRecord, dateTimeString){
    const [date, hour] = dateTimeString.split(' ')
    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date

    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord

}
// const employees = {
//     firstName: "John",
//     familyName: "Doe",
//     title: "Manager",
//     payRatePerHour: 30,
//     timeInEvents: [],
//     timeOutEvents: []
// };
// console.log(employees, '2024-07-09, 0800');

function hoursWorkedOnDate(employeeRecord, date) {
    // Find the timeInEvent for the given date
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);

    // Find the timeOutEvent for the given date
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    // Calculate the hours worked
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

// const employee = {
//     firstName: "John",
//     familyName: "Doe",
//     title: "Manager",
//     payRatePerHour: 30,
//     timeInEvents: [
//         { type: "TimeIn", hour: 900, date: "2024-07-24" }
//     ],
//     timeOutEvents: [
//         { type: "TimeOut", hour: 1700, date: "2024-07-24" }
//     ]
// };
// console.log((hoursWorkedOnDate(employee, "2024-07-24")));

function wagesEarnedOnDate(employeeRecord, date) {
    // Find the number of hours worked on the given date
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    
    // Calculate the pay owed for the given date
    let pay = hoursWorked * 27;
    
    // Return the calculated pay
    return pay;
}
function allWagesFor(employeeRecord) {
    let totalPay = 0;
    // Loop through each timeInEvent
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
        // Get the date for the current timeInEvent
        let date = employeeRecord.timeInEvents[i].date;
        
        // Calculate hours worked on the current date
        let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        
        // Add the pay for the current date to the total pay
        totalPay += hoursWorked * 27; 
    }
    
    return totalPay;
}

function calculatePayroll(employeeRecords) {
    let overall = 0;

    // Iterate over each employee record
    for (let i = 0; i < employeeRecords.length; i++) {
        // Calculate wages for the current employee
        let employeeWages = allWagesFor(employeeRecords[i]);

        // Accumulate the total pay
        overall += employeeWages;
    }

    return overall;
}

