

document.addEventListener('DOMContentLoaded', function() {
  // 현재 활성 탭의 URL 가져오기
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];
      const currentUrl = activeTab.url;
      // url input에 현재 탭의 URL 기본값 세팅
      document.getElementById('url').value = currentUrl;
  });
});

document.getElementById('dataForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const urlValue = document.getElementById('url').value;
  const categoryValue = document.getElementById('category').value;
  const contentsValue = document.getElementById('contents').value;
  const memoValue = document.getElementById('memo').value;

  const data = {
    "category": categoryValue,
    "url": urlValue,
    "contents": contentsValue,
    "memo": memoValue
  };

  fetch(posturl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => {
      console.log('Success:', json);
      alert('데이터 추가 완료!');
      window.close(); // 팝업 종료
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
