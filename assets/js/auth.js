/* ===================================================
   인증 - 로그인 / 로그아웃 (목업)
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorEl = document.getElementById('loginError');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.querySelector('[name="username"]').value.trim();
    const password = form.querySelector('[name="password"]').value.trim();

    // 간단한 목업 인증 (아이디/비밀번호 둘 다 입력 시 통과)
    if (!username || !password) {
      showError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // 목업 계정 검증
    const validAccounts = [
      { id: 'nainemedical', pw: '1234', name: '나인메디칼' },
      { id: 'admin', pw: 'admin', name: '관리자' },
      { id: 'test', pw: 'test', name: '테스트업체' }
    ];

    const account = validAccounts.find(a => a.id === username && a.pw === password);

    if (!account) {
      showError('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    // 세션 저장
    const session = {
      id: account.id,
      name: account.name,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem('dirams_session', JSON.stringify(session));

    // 대시보드로 이동
    window.location.href = 'pages/dashboard.html';
  });

  function showError(msg) {
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('show');
      setTimeout(() => errorEl.classList.remove('show'), 4000);
    }
  }
});

/* 로그아웃 */
function logout() {
  localStorage.removeItem('dirams_session');
  const isInPages = window.location.pathname.includes('/pages/');
  window.location.href = isInPages ? '../index.html' : 'index.html';
}
