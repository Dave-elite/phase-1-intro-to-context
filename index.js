// Function to create a single employee record
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

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Function to create a time-in event for an employee record
function createTimeInEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

// Function to create a time-out event for an employee record
function createTimeOutEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
  let timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  let timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  if (!timeInEvent || !timeOutEvent) return 0;
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * 27;
}

// Function to calculate all wages for an employee record
function allWagesFor(employeeRecord) {
  let totalPay = 0;
  for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    let date = employeeRecord.timeInEvents[i].date;
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    totalPay += hoursWorked * employeeRecord.payPerHour;
  }
  return totalPay;
}

// Function to calculate total payroll for an array of employee records
function calculatePayroll(employeeRecords) {
  let overall = 0;
  for (let i = 0; i < employeeRecords.length; i++) {
    let employeeWages = allWagesFor(employeeRecords[i]);
    overall += employeeWages;
  }
  return overall;
}
