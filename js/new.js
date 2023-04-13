
//........................................................Section : 1 : all class related to Input and Output Property.........................................
//combining all properties related to input section
class Input {
  constructor() {
    this.pid = [];  
    this.arrivalTime = [];  
    this.burstTime = [];  
    this.priority = [];   
    this.timeQuantum = 0; 
    this.algorithm = "";  
  }
}


class Output {
  constructor() {
    this.o_pid = [];
    this.o_arrivaltime = [];
    this.o_bursttime = [];
    this.o_priority = [];
    this.completionTime = [];
    this.turnAroundTime = [];
    this.waitingTime = [];
  }
}

let process = 3;

let mainInput = new Input();
let mainOutput = new Output();
var table = document.getElementById("inputTable");
var total = 10;
var qu = 0;
var flag = 0;



var chartdiv = document.getElementById('chartdiv');
chartdiv.style.display = "none";

document.querySelector(".minusbtn").onclick = () => {
  process = process - 1;
  flag = 1;
}

document.querySelector(".plusbtn").onclick = () => {
  process = process + 1;
}


const run = () => {

  var runbtn = document.getElementById('runBtn');
  runbtn.disabled = true;
  runbtn.style.background = 'grey';
  runbtn.style.cursor = 'not-allowed';

  mainOutput.o_bursttime.length = 0;
  mainOutput.o_arrivaltime.length = 0;
  mainOutput.o_pid.length = 0;

  for (let i = 0; i < total; i++) {

    let at = document.getElementById(`arrive_${i + 1}`).value;
    let bt = document.getElementById(`burst_${i + 1}`).value;
    let id = i + 1;
    let prior = document.getElementById(`priority_${i + 1}`).value;

    if (at < 0 && bt < 0)
      alert("Please enter valid Input...");
    else if (bt > 0) {

      mainInput.arrivalTime.push(parseInt(at));
      mainInput.burstTime.push(parseInt(bt));
      mainInput.pid.push(parseInt(id));
      mainInput.priority.push(parseInt(prior));
    }
  }
  if (flag == 1) {
    mainInput.burstTime.splice(-1);
    mainInput.pid.splice(-1);
    mainInput.arrivalTime.splice(-1);
  }
  chartdiv.style.display = "flex";
  const fc = new sjf();
 
  var final_table = document.getElementById('outputTable');

  for (let j = 0; j < mainInput.pid.length; j++) {

    var row = final_table.insertRow(-1);
    var cell2 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = mainOutput.o_arrivaltime[j];
    cell2.innerHTML = `P${mainOutput.o_pid[j]}`;
    cell3.innerHTML = mainOutput.o_bursttime[j];
    cell4.innerHTML = mainOutput.completionTime[j];
    cell5.innerHTML = mainOutput.turnAroundTime[j];
    cell6.innerHTML = mainOutput.waitingTime[j];
  }


  var myChartLabelArray = mainOutput.o_pid;
  myChartLabelArray = myChartLabelArray.map(i => 'P' + i);


  const myBarChart = new Chart(
    document.getElementById('myBarChart'), {
    type: 'bar',
    data: {
      labels: myChartLabelArray,
      datasets: [{
        label: 'burst time',
        data: mainOutput.o_bursttime,
        backgroundColor: [
          '#58508d',
        ],
        borderColor: [
          'rgba(176,162,247,1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Waiting Time',
        data: mainOutput.waitingTime,
        backgroundColor: [
          '#ff6361',
        ],
        borderColor: [
          'rgba(176,162,247,1)',
        ],
        borderWidth: 1
      },
      {
        label: 'turn around time',
        data: mainOutput.turnAroundTime,
        backgroundColor: [
          '#ffa600',
        ],
        borderColor: [
          'rgba(176,162,247,1)',
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  }
  );
  const myChart = new Chart(
    document.getElementById('myChart'), {
    type: 'pie',
    data: {
      labels: myChartLabelArray,
      datasets: [{
        label: 'Waiting Time',
        data: mainOutput.waitingTime,
        backgroundColor: [
          '#003f5c',
          '#58508d',
          '#ff6361',
          '#ffa600',
          '#77C2FE',
          '#bc5090',
          '#0b9a8d',
          '#E65F8E',
          '#323B81',
          '#9c2162',

        ],
        borderColor: [
          'rgba(176,162,247,1)',
          'rgba(55,227,128,1)',
          'rgba(255, 26, 104, 1)',
          'rgba(0,207,255,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: 'white',
        }
      }
    },
    plugins: [ChartDataLabels],
  }
  );



  const mytatChart = new Chart(
    document.getElementById('mytatChart'), {
    type: 'pie',
    data: {
      labels: myChartLabelArray,
      datasets: [{
        label: 'Turn around Time',
        data: mainOutput.turnAroundTime,
        backgroundColor: [
          '#003f5c',
          '#58508d',
          '#ff6361',
          '#ffa600',
          '#77C2FE',
          '#bc5090',
          '#0b9a8d',
          '#E65F8E',
          '#323B81',
          '#9c2162',
        ],
        borderColor: [
          'rgba(176,162,247,1)',
          'rgba(55,227,128,1)',
          'rgba(255, 26, 104, 1)',
          'rgba(0,207,255,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: 'white',
        }
      }
    },
    plugins: [ChartDataLabels],
  }
  );


}


function deleterow() {
  var final_table = document.getElementById('outputTable');

  var rowCount = final_table.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    final_table.deleteRow(i);
  }
}



function FCFS(arrivalTime, burstTime, processID) {

  let objCollection = [];

  for (var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x], C: processID[x] });


  objCollection.sort(function (a, b) {
    return a.A - b.A;
  });


  for (var x = 0; x < objCollection.length; x++) {

    mainOutput.o_arrivaltime.push(objCollection[x].A);
    mainOutput.o_bursttime.push(objCollection[x].B);
    mainOutput.o_pid.push(objCollection[x].C);

    findWaitingTime(mainInput, mainOutput);
    findTurnAroundTime(mainInput, mainOutput);
    averagetime();
  }


}


function findWaitingTime() {

  var service_time = Array.from({ length: mainInput.arrivalTime.length }, (_, i) => 0);
  service_time[0] = mainOutput.o_arrivaltime[0];
  mainOutput.waitingTime[0] = 0;

  
  for (var i = 1; i < mainInput.arrivalTime.length; i++) {
    
    var wasted = 0;
    
    service_time[i] = service_time[i - 1] + mainOutput.o_bursttime[i - 1];

   
    mainOutput.waitingTime[i] = service_time[i] - mainOutput.o_arrivaltime[i];

    
    if (mainOutput.waitingTime[i] < 0) {
      wasted = Math.abs(mainOutput.waitingTime[i]);
      mainOutput.waitingTime[i] = 0;
    }

    service_time[i] = service_time[i] + wasted;
  }
}



function findTurnAroundTime() {

  for (var i = 0; i < mainInput.arrivalTime.length; i++) {
    mainOutput.turnAroundTime[i] = mainOutput.o_bursttime[i] + mainOutput.waitingTime[i];
    mainOutput.completionTime[i] = mainOutput.turnAroundTime[i] + mainOutput.o_arrivaltime[i];
  }
}


var avg_waitingtime = 0;
var avg_tat = 0;
function averagetime() {
  for (let i = 0; i < mainOutput.waitingTime.length; i++) {
    avg_waitingtime = + mainOutput.waitingTime[i];
    avg_tat = + mainOutput.turnAroundTime[i];
  }
  let avgwt = document.getElementById("avgwt");
  avgwt.innerHTML = avg_waitingtime;

  let avgtat = document.getElementById("avgtat");
  avgtat.innerHTML = avg_tat;
}


function sjf() {

  let objCollection = [];

  for (var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x], C: processID[x] });

  objCollection.sort(function (a, b) {
    return a.A - b.A;
  });



  for (let i = 0; i < n; i++) {  
    pos = i;
    for (let j = i + 1; j < n; j++) {  
      if (burstTime[j] < burstTime[pos]) {
        pos = j;
      }
    }

    temp = burstTime[i];
    burstTime[i] = burstTime[pos];
    burstTime[pos] = temp;

    temp = p[i];
    p[i] = p[pos];
    p[pos] = temp;

  }
 
  findWaitingTime();
  findTurnAroundTime();
  averagetime();
}

function priority(arrivalTime, burstTime, processID, priority) {


  let objCollection = [];

  for (var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x], C: processID[x], D: priority[x] });

  objCollection.sort(function (a, b) {
    return a.A - b.A;
  });

  for (let i = 0; i < n; i++) {  
    pos = i;
    for (let j = i + 1; j < n; j++) {  
      if (priority[j] < priority[pos]) {
        pos = j;
      }
    }

    temp = priority[i];
    priority[i] = priority[pos];
    priority[pos] = temp;


    temp = burstTime[i];
    burstTime[i] = burstTime[pos];
    burstTime[pos] = temp;

    temp = arrivalTime[i];
    arrivalTime[i] = arrivalTime[pos];
    arrivalTime[pos] = temp;

    temp = p[i];
    p[i] = p[pos];
    p[pos] = temp;


    mainOutput.o_arrivaltime = objCollection.arrivalTime;
    mainOutput.o_bursttime = objCollection.burstTime;
    mainOutput.o_pid = objCollection.processID;
    mainOutput.o_priority = objCollection.priority;
  }

  findWaitingTime();
  findTurnAroundTime();
  averagetime();

}