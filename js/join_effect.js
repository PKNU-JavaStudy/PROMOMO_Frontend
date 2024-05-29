// 변수 선언
const form = document.getElementById("checkForm");  // 전체 폼
const submit = document.getElementById("submit");   // 회원가입 버튼
const requiredCheckBoxes = Array.from(document.querySelectorAll('.required'));  // 모든 필수 체크박스
const agreeAllCheckBox = document.getElementById("agreeAll");   // 모두 동의 체크박스
const phoneNumberPattern = /^010\d{8}$/;    // 휴대폰 번호 정규식

// 모두 동의 체크박스
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
    });
    checkSubmitState();
}

// 모든 필수 박스가 선택되었는지 확인
function checkSubmitState() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const password = document.getElementById('password').value.trim();
    const checkPassword = document.getElementById('checkPassword').value.trim();

    // 모든 필수 입력 필드가 채워져 있는지 확인
    const allFieldsFilled = name && email && phoneNumber && password && checkPassword;

    submit.disabled = !(allChecked && allFieldsFilled);
}

// 필수 체크박스 변경 시 이벤트 리스너
requiredCheckBoxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkSubmitState);
});

// 입력 필드 변경 시 이벤트 리스너
document.querySelectorAll('#name, #email, #phone-number, #password, #checkPassword').forEach(input => {
    input.addEventListener('input', checkSubmitState);
});

// 폼 제출 이벤트 리스너
submit.addEventListener('click', function () {
    // 입력 필드 확인
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const password = document.getElementById('password').value.trim();
    const checkPassword = document.getElementById('checkPassword').value.trim();
    const allChecked = requiredCheckBoxes.every(checkbox => checkbox.checked);

    if (!name || !email || !phoneNumber || !password || !checkPassword) {
        alert("모든 입력 칸을 작성해 주세요.");
        return;
    }
    if (!phoneNumberPattern.test(phoneNumber)) {
        alert("유효한 전화번호를 입력해 주세요.");
        return;
    }
    if (password !== checkPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }
    if (!allChecked) {
        alert("필수 이용약관 동의를 해주세요.");
        return;
    }
    alert("회원가입이 완료되었습니다. 마이페이지로 이동합니다.");
    window.location.href = "mypage.html";
});

// 초기 상태에서 제출 버튼 비활성화
checkSubmitState();

