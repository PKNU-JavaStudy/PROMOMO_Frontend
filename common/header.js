const renderHeader = () => {
  const header = document.createElement("header");
  header.innerHTML = `
  <div class="header-in">
    <nav>
      <a href="#">
        <img src="./img/logo.png" alt="logo" />
      </a>
      <ul class="menu">
        <li><a href="#">멤버 모집</a></li>
        <li><a href="#">프로젝트 자랑</a></li>
      </ul>
    </nav>
    <ul class="member">
      <li><a href="#">로그인</a></li>
      <li><a href="#">회원가입</a></li>
    </ul>
  </div>
  `;
  return header;
};
document.body.prepend(renderHeader());
