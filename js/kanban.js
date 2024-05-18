// 선택된 담당자 정보를 저장하는 배열
let selectedResponsibles = [];
// 담당자 선택 시 선택된 담당자를 옆에 표시
document.getElementById("responsible").addEventListener("change", function () {
  const selected = document.getElementById("responsible").value;
  const displayArea = document.getElementById("selectedResponsible");
  // 이미 선택된 담당자는 추가하지 않음
  if (!selectedResponsibles.some((res) => res.name === selected)) {
    selectedResponsibles.push({
      name: selected,
      index: selectedResponsibles.length,
    });
    const span = document.createElement("span");
    span.textContent = selected;
    span.style.marginRight = "10px";
    span.classList.add(`responsible-${selectedResponsibles.length - 1}`); // 고유 클래스 추가
    displayArea.appendChild(span);
  }
});

document.getElementById("createBtn").addEventListener("click", function () {
  const category = document.getElementById("category").value;
  const title = document.querySelector('input[name="title"]').value;
  const daterange = document.querySelector('input[name="daterange"]').value;
  const card = document.createElement("div");
  card.className = "card";

  let responsibleHTML = "";
  selectedResponsibles.forEach((res) => {
    responsibleHTML += `<span class="responsible-${res.index}">${res.name}</span>`;
  });

  card.innerHTML = `
  <h4>${title}</h4>
  <p>📆 ${daterange}</p>
  <p>${responsibleHTML}</p>`;

  if (category === "Todo 📃") {
    document.getElementById("todo").appendChild(card);
  } else if (category === "In Progress 🚀") {
    document.getElementById("inProgress").appendChild(card);
  } else if (category === "Done ✅") {
    document.getElementById("done").appendChild(card);
  }

  document.querySelector(".modal-bg").classList.remove("visible");
  document.querySelector(".modal").classList.remove("visible");
});

// 간트차트
document.getElementById("planBtn").addEventListener("click", function () {
  document.querySelector(".bg02").classList.add("visible");
  document.querySelector(".modal02").classList.add("visible");
});

google.charts.load("current", { packages: ["gantt"] });
google.charts.setOnLoadCallback(drawChart);

var chart;
var data;
var options;

function drawChart() {
  data = new google.visualization.DataTable();
  data.addColumn("string", "Task ID");
  data.addColumn("string", "Task Name");
  data.addColumn("string", "Resource");
  data.addColumn("date", "Start Date");
  data.addColumn("date", "End Date");
  data.addColumn("number", "Duration");
  data.addColumn("number", "Percent Complete");
  data.addColumn("string", "Dependencies");

  // 초기데이터
  data.addRows([[" ", " ", " ", new Date(), new Date(), null, 100, null]]);

  options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
    hAxis: {
      format: "d MMM yyyy",
      minValue: new Date(data.getValue(0, 3)),
      maxValue: new Date(data.getValue(0, 4)),
    },
  };

  chart = new google.visualization.Gantt(document.getElementById("chart_div"));
  chart.draw(data, options);
  updateTaskList();
}

function taskValidation(taskName) {
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    if (data.getValue(i, 1) === " ") data.removeRow(i);
    if (data.getValue(i, 1) === taskName) return false;
  }
  return true;
}

function addTask() {
  let taskId = document.getElementById("taskId").value;
  let taskName = document.getElementById("taskName").value;
  if (!taskValidation(taskName)) {
    alert("작업이 중복됩니다!");
    return;
  }
  let resource = document.getElementById("resource").value;
  let startDate = new Date(document.getElementById("startDate").value);
  let endDate = new Date(document.getElementById("endDate").value);
  let dependencies = null;

  if (data.bf.length > 8) {
    options.height = options.height + 100;
  }
  if (confirm("작업을 추가하시겠습니까?") == true) {
    data.addRows([
      [
        taskId,
        taskName,
        resource,
        startDate,
        endDate,
        null,
        null,
        dependencies,
      ],
    ]);
  }

  var minDate = options.hAxis.minValue;
  var maxDate = options.hAxis.maxValue;
  if (startDate < minDate) options.hAxis.minValue = startDate;
  if (endDate > maxDate) options.hAxis.maxValue = endDate;
  chart.draw(data, options);
  updateTaskList();
}

function updateTaskList() {
  let select = document.getElementById("deleteTaskName");
  select.innerHTML = "";
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    let taskName = data.getValue(i, 1);
    if (taskName !== " ") {
      let option = document.createElement("option");
      option.value = taskName;
      option.textContent = taskName;
      select.appendChild(option);
    }
  }
}

function deleteTask() {
  let deleteTaskName = document.getElementById("deleteTaskName").value;
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    if (data.getValue(i, 1) === deleteTaskName) {
      if (confirm(`${data.getValue(i, 1)} 작업을 삭제하시겠습니까?`) == true) {
        data.removeRow(i);
        chart.draw(data, options);
        updateTaskList();
        break;
      }
    }
  }
}
