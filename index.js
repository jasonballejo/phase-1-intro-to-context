function createEmployeeRecord([first, second, third, num]){
    return {
        firstName: first, 
        familyName: second, 
        title: third, 
        payRate: num,
        payPerHour: num,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(row => createEmployeeRecord(row));
}

function createTimeInEvent(employeeRec, dateStamp){

    employeeRec.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })

    return employeeRec
}

function createTimeOutEvent(employeeRec, dateStamp) {

    employeeRec.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })

    return employeeRec
}

function hoursWorkedOnDate(employeeRec, dateForm){
    let dateHoursIn = employeeRec.timeInEvents.find(function (e) {
        return e.date === dateForm
    })
    // console.log('HourIn:', dateHoursIn) // [ 900 ]

    let dateHoursOut = employeeRec.timeOutEvents.find(function (e) {
        return e.date === dateForm
    })
    // console.log('HourOut:', dateHoursOut) // [ 1100 ]

    return (dateHoursOut.hour - dateHoursIn.hour) / 100
}

function wagesEarnedOnDate(employeeRec, dateForm){
    // console.log('Records:', employeeRec.payRate,)
    // console.log('Form:', dateForm)

    return (hoursWorkedOnDate(employeeRec, dateForm) * employeeRec.payRate) // 2 * 27 = 54
}

function allWagesFor(employeeRec){
    let dates = employeeRec.timeInEvents.map(dates => dates.date)
    // console.log('Dates Mapped:', dates) // [ '2019-01-01', '2019-01-02' ]

    return (dates.reduce((previousValue, currentValue) => previousValue + wagesEarnedOnDate(employeeRec, currentValue),0)) // Total: 378
}

function calculatePayroll(employeeRec){
    // console.log('REDUCED:', employeeRec.reduce((previousValue, currentValue) => previousValue + allWagesFor(currentValue),0))

    return employeeRec.reduce((previousValue, currentValue) => previousValue + allWagesFor(currentValue),0)
}