document.querySelector('.share_Btn').addEventListener('click', function() {
    var currentPageUrl = window.location.href;
    
    navigator.clipboard.writeText(currentPageUrl).then(function() {
      // 클립보드 복사 성공 시 처리
      var copyMessage = document.getElementById('copyMessage');
      copyMessage.style.display = 'block';
  
      // 2초 후 메시지 숨김
      setTimeout(function() {
        copyMessage.style.display = 'none';
      }, 2000);
    }).catch(function(err) {
      // 클립보드 복사 실패 시 처리
      console.error('클립보드 복사 실패: ', err);
    });
  });
  