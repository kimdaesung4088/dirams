/* ===================================================
   사이드바 토글 & 활성화 표시
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const sidebar   = document.getElementById('sidebar');
  const toggle    = document.getElementById('sidebarToggle');
  const overlay   = document.getElementById('sidebarOverlay');
  const userNameEl = document.getElementById('headerUserName');

  /* 사용자 이름 표시 */
  if (userNameEl) {
    const name = Utils.getUserName();
    if (name) userNameEl.textContent = name + '님 환영합니다';
  }

  /* 사이드바 토글 */
  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', () => {
    sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  /* 현재 페이지 활성화 */
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.split('?')[0];
    const linkSearch = href.includes('?') ? href.slice(href.indexOf('?')) : '';

    let isActive = false;

    if (linkPath && currentPath.endsWith(linkPath.replace('../', '').replace('./', ''))) {
      if (linkSearch) {
        // 쿼리파라미터가 있는 링크: 쿼리파라미터까지 정확히 일치해야 함
        isActive = currentSearch === linkSearch;
      } else {
        // 쿼리파라미터가 없는 링크(전체): 현재 URL도 쿼리파라미터가 없어야 함
        isActive = currentSearch === '';
      }
    }

    if (isActive) {
      link.classList.add('active');
    }
  });

  /* 로그아웃 버튼 */
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  });
});
