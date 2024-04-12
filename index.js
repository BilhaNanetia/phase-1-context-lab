 //Creates a function called createEmloyeeRecord
 function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

 //Creates a function called createEmloyeeRecords
 function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
 }

 //Creates a function called timeInEvent
 function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
 }

 //Creates a function called createTimeOutEvent
 function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour:parseInt(hour, 10),
        date: date
    });
    return this;
 }

 //Create a function called hoursWorkedOnDate
 function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        let timeIn = parseInt(timeInEvent.hour, 10);
        let timeOut = parseInt(timeOutEvent.hour, 10);
        return (timeOut - timeIn) / 100;
    } else {
        return 0;
    }
 }

  //Create a function called wagesEarnedOnDate
  function wagesEarnedOnDate(date) {

    //Calculate the hours worked on the given date
    const hoursWorked = hoursWorkedOnDate.call(this, date);

    //Multiply the hours worked by the employee's pay rate
    return hoursWorked * this.payPerHour;
  }

  //Create a function findEmployeeByFirstName
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }

  //Function  calculatePayRoll
  function calculatePayroll(employeeRecords) {
    //Initialize a variable to accumulate the total payroll
    let totalPayroll = 0;

    //Use forEach to iterate over each employee record
    employeeRecords.forEach((employeeRecord) => {
         
    //Calculate the wages for the current employee using the allWagesFor function
    const employeeWages = allWagesFor.call(employeeRecord);

    //Add the employee's wages to the total payroll
    totalPayroll += employeeWages;
    });
    
    //Return the total payroll
    return totalPayroll;
  }

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

