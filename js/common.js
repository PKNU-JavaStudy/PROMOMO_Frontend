document.addEventListener("DOMContentLoaded", function () {
  // 모달창
  document.querySelector(".open-modal").addEventListener("click", function () {
    document.querySelector(".modal-bg").classList.add("visible");
    document.querySelector(".modal").classList.add("visible");
  });

  document.querySelector(".close-modal").addEventListener("click", function () {
    document.querySelector(".modal-bg").classList.remove("visible");
    document.querySelector(".modal").classList.remove("visible");
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".modal, .open-modal")) {
      document.querySelector(".modal").classList.remove("visible");
      document.querySelector(".modal-bg").classList.remove("visible");
      document.body.classList.remove("modal-open");
    }
  });

  const header = document.querySelector("header");

  // top 버튼 애니메이션
  const scrollTopBtn = () => {
    const topBtn = document.querySelector(".top-btn");
    topBtn.className = "top-btn";
    topBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return topBtn;
  };

  document.body.append(scrollTopBtn());

  // 스크롤시 헤더 고정 이벤트
  topBtn.style.display = "none";
  header.style.boxShadow = "none";

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollOffset = 300; // 요소의 높이를 직접 지정

    if (scrollTop < scrollOffset) {
      topBtn.style.display = "none";
      header.style.boxShadow = "none";
    } else {
      topBtn.style.display = "block";
      header.style.boxShadow = "0px 0px 5px 3px rgba(0, 0, 0, 0.16)";
    }
  });

});
