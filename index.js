 //Function to create an emloyee record
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

 //Function to create emloyee records from arrays of employee data
 function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
 }

 //Function to create a timeIn event for an employee record
 function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
 }

 //Function create a timeOut event for an employee record
 function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour:parseInt(hour, 10),
        date: date
    });
    return this;
 }

 //Function to calculate hours worked on a specific date 
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

  //Function to calculate wages earned on a specific date 
    function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);

    return hoursWorked * this.payPerHour;
  }

  //Function to find an employee by their first name in an array of employee records
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }

  //Function  to calculate the total payroll for an array of employee records
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    employeeRecords.forEach((employeeRecord) => {
         
    //Calculate the wages for the current employee using the allWagesFor function
    const employeeWages = allWagesFor.call(employeeRecord);

    //Add the employee's wages to the total payroll
    totalPayroll += employeeWages;
    });
    
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

