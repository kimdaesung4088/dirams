/* ===================================================
   공통 유틸리티 함수
   =================================================== */
const Utils = {
  /* 날짜 포맷 (YYYY-MM-DD → YYYY.MM.DD) */
  formatDate(dateStr) {
    if (!dateStr) return '-';
    return dateStr.replace(/-/g, '.');
  },

  /* 날짜 포맷 (YYYY-MM-DD → MM/DD) */
  formatDateShort(dateStr) {
    if (!dateStr) return '-';
    const [,m,d] = dateStr.split('-');
    return `${m}/${d}`;
  },

  /* 금액 포맷 */
  formatCurrency(amount) {
    if (amount === null || amount === undefined) return '-';
    return '₩ ' + Number(amount).toLocaleString('ko-KR');
  },

  /* 숫자 포맷 */
  formatNumber(num) {
    return Number(num).toLocaleString('ko-KR');
  },

  /* 상태 배지 HTML */
  getStatusBadge(status) {
    const map = {
      waiting:    { cls: 'badge-waiting',  label: '미접수' },
      received:   { cls: 'badge-received', label: '접수' },
      done:       { cls: 'badge-done',     label: '납품완료' },
      additional: { cls: 'badge-additional', label: '추가발주' }
    };
    const s = map[status] || { cls: 'badge-waiting', label: status };
    return `<span class="badge ${s.cls}">${s.label}</span>`;
  },

  /* 긴급 배지 HTML */
  getUrgentBadge(isUrgent) {
    if (isUrgent) return `<span class="badge badge-urgent">긴급</span>`;
    return `<span class="badge badge-normal">일반</span>`;
  },

  /* 발주 유형 배지 */
  getTypeBadge(type) {
    if (type === 'additional') {
      return `<span class="badge badge-additional">추가</span>`;
    }
    return `<span class="badge badge-received">정기</span>`;
  },

  /* URL 쿼리 파라미터 파싱 */
  parseQueryParams() {
    const params = {};
    const search = window.location.search.slice(1);
    if (!search) return params;
    search.split('&').forEach(pair => {
      const [k, v] = pair.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    return params;
  },

  /* 오늘 날짜 (YYYY-MM-DD) */
  today() {
    return new Date().toISOString().slice(0, 10);
  },

  /* N일 전 날짜 */
  daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
  },

  /* 기한 초과 여부 */
  isOverdue(dueDate, status) {
    if (status === 'done') return false;
    return dueDate && dueDate < this.today();
  },

  /* debounce */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /* 토스트 알림 */
  showToast(message, type = 'default') {
    const container = document.getElementById('toastContainer')
      || (() => {
        const el = document.createElement('div');
        el.id = 'toastContainer';
        el.className = 'toast-container';
        document.body.appendChild(el);
        return el;
      })();

    const icons = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };

    const toast = document.createElement('div');
    toast.className = `toast${type !== 'default' ? ` toast-${type}` : ''}`;
    toast.innerHTML = `${icons[type] || icons.default}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /* 로그인 세션 확인 */
  checkAuth() {
    const session = localStorage.getItem('dirams_session');
    if (!session && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
      window.location.href = '../index.html';
    }
    return session ? JSON.parse(session) : null;
  },

  /* 사용자 이름 가져오기 */
  getUserName() {
    const session = localStorage.getItem('dirams_session');
    if (!session) return '';
    return JSON.parse(session).name || '';
  }
};
