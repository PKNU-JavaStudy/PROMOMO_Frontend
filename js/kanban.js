<<<<<<< HEAD
const create = document.getElementsByClassName(".add");
const firstlist = document.getElementById("create");

create.addEventListener("click", () => {
  const inputDiv = document.createElement("div");
  const input = document.createElement("input");
  const deleteBtn = document.createElement("button");

  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "x";

  firstlist.appendChild(inputDiv);
  inputDiv.setAttribute("id", "draggable");
  inputDiv.setAttribute("draggable", "true");
  inputDiv.appendChild(input);
  inputDiv.appendChild(deleteBtn);
  firstlist.appendChild(create);

  deleteBtn.addEventListener("click", () => {
    inputDiv.remove();
  });
});

let dragged;

/* 드래그 가능한 대상에서 발생하는 이벤트 */
document.addEventListener("drag", (event) => {
  console.log("dragging");
});

document.addEventListener("dragstart", (event) => {
  // 드래그한 요소에 대한 참조 저장
  dragged = event.target;
  // 반투명하게 만들기
  event.target.classList.add("dragging");
});

document.addEventListener("dragend", (event) => {
  // 투명도 초기화
  event.target.classList.remove("dragging");
});

/* 드롭 대상에서 발생하는 이벤트 */
document.addEventListener(
  "dragover",
  (event) => {
    // 드롭을 허용하기 위해 기본 동작 취소
    event.preventDefault();
  },
  false
);

document.addEventListener("dragenter", (event) => {
  // 드래그 가능한 요소가 대상 위로 오면 강조
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.add("dragover");
  }
});

document.addEventListener("dragleave", (event) => {
  // 드래그 가능한 요소가 대상 밖으로 나가면 강조 제거
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
  }
});

document.addEventListener("drop", (event) => {
  // 일부 요소의 링크 열기와 같은 기본 동작 취소
  event.preventDefault();
  // 드래그한 요소를 선택한 드롭 대상으로 이동
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});
=======
// 칸반보드 daterange 함수
$(function () {
  // 현재 날짜를 구합니다.
  var today = moment();
  // 오늘 날짜부터 7일 후의 날짜를 구합니다.
  var endDate = moment().add(7, "days");
  // Date Range Picker를 초기화합니다.
  $('input[name="daterange"]').daterangepicker({
    startDate: today,
    endDate: endDate,
    locale: {
      format: "YYYY.MM.DD",
    },
    opens: "left",
  });

  // 기본 값으로 오늘 날짜부터 7일 후의 날짜를 설정합니다.
  $('input[name="daterange"]').val(
    today.format("YYYY.MM.DD") + " ~ " + endDate.format("YYYY.MM.DD")
  );
});

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
  document
    .querySelectorAll('#responsible input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      const resName = checkbox.nextElementSibling.textContent;
      responsibleHTML += `<li class="responsible">${resName}</li>`;
    });

  card.innerHTML = `
    <h4>${title}</h4>
    <p>📆 ${daterange}</p>
    <ul>🧑‍💼 ${responsibleHTML}</ul>
    <button class="delete-btn"><i class="fa-solid fa-xmark"></i></button>`;

  if (category === "Todo 📃") {
    document.getElementById("todo").appendChild(card);
  } else if (category === "In Progress 🚀") {
    document.getElementById("inProgress").appendChild(card);
  } else if (category === "Done ✅") {
    document.getElementById("done").appendChild(card);
  }

  card.querySelector(".delete-btn").addEventListener("click", function () {
    card.remove();
  });

  document.querySelector(".modal-bg").classList.remove("visible");
  document.querySelector(".modal").classList.remove("visible");
  resetModal();
});

function resetModal() {
  document.querySelector('input[name="title"]').value = "";
  document
    .querySelectorAll('#responsible input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
}
>>>>>>> origin/dev
