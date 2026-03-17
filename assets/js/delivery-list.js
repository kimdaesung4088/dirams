/* ===================================================
   납품지시 목록 페이지 로직
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 인증 확인
  if (!localStorage.getItem('dirams_session')) {
    window.location.href = '../index.html';
    return;
  }

  const params = Utils.parseQueryParams();
  const initialStatus = params.status || 'all';

  // 날짜 기본값
  const today = new Date();
  const from = new Date(); from.setDate(today.getDate() - 60);
  document.getElementById('filterDateFrom').value = from.toISOString().slice(0,10);
  document.getElementById('filterDateTo').value   = today.toISOString().slice(0,10);

  // 상태 필터 초기화
  const statusSelect = document.getElementById('filterStatus');
  if (statusSelect && initialStatus !== 'all') {
    statusSelect.value = initialStatus;
  }

  // 페이지 타이틀 업데이트
  const titleMap = { waiting: '납품지시 - 미접수', received: '납품지시 - 접수', done: '납품지시 - 납품완료', all: '납품지시 - 전체' };
  const breadMap = { waiting: '미접수', received: '접수', done: '납품완료', all: '전체' };
  const pageTitle = document.getElementById('pageTitle');
  const breadCurrent = document.getElementById('breadcrumbCurrent');
  if (pageTitle) pageTitle.textContent = titleMap[initialStatus] || '납품지시';
  if (breadCurrent) breadCurrent.textContent = breadMap[initialStatus] || '전체';

  // TableFilter 인스턴스
  const tf = new TableFilter(MOCK_DATA.deliveries, {
    perPage: 10,
    onRender: (rows, inst) => renderTable(rows, inst)
  });

  function getCurrentCriteria() {
    return {
      status:   document.getElementById('filterStatus')?.value || 'all',
      dateFrom: document.getElementById('filterDateFrom')?.value || '',
      dateTo:   document.getElementById('filterDateTo')?.value   || ''
    };
  }

  function renderTable(rows, inst) {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const totalCount = document.getElementById('totalCount');

    if (totalCount) totalCount.textContent = inst.totalCount;

    if (rows.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      document.getElementById('pagination').innerHTML = '';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';

    const startNo = (inst.currentPage - 1) * inst.options.perPage + 1;

    tbody.innerHTML = rows.map((d, i) => {
      const overdue = Utils.isOverdue(d.dueDate, d.status);
      return `
        <tr>
          <td class="no-col center" data-label="NO">${startNo + i}</td>
          <td data-label="납품번호">
            <a href="delivery-detail.html?id=${d.id}" class="delivery-link">${d.id}</a>
          </td>
          <td data-label="요구부서">${d.requireDept}</td>
          <td class="date-cell" data-label="발행일자">${Utils.formatDate(d.issuedAt)}</td>
          <td class="date-cell ${overdue ? 'overdue' : ''}" data-label="납품기한">${Utils.formatDate(d.dueDate)}</td>
          <td class="date-cell" data-label="납품예정일">${Utils.formatDate(d.scheduledDate)}</td>
          <td class="date-cell" data-label="납품일자">${Utils.formatDate(d.deliveredAt)}</td>
          <td class="center" data-label="긴급">${d.isUrgent ? Utils.getUrgentBadge(true) : ''}</td>
          <td class="amount-cell" data-label="금액">${Utils.formatCurrency(d.totalAmount)}</td>
          <td class="center" data-label="상태">${Utils.getStatusBadge(d.status)}</td>
          <td class="items-cell" data-label="물품내역" title="${d.itemSummary}">${d.itemSummary}</td>
        </tr>`;
    }).join('');

    tf.renderPagination('pagination');
  }

  function search() {
    const criteria = getCurrentCriteria();
    tf.applyFilter(criteria);
    renderTable(tf.getPage(), tf);
  }

  document.getElementById('btnSearch')?.addEventListener('click', search);

  document.getElementById('btnReset')?.addEventListener('click', () => {
    const today = new Date();
    const from = new Date(); from.setDate(today.getDate() - 60);
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterDateFrom').value = from.toISOString().slice(0,10);
    document.getElementById('filterDateTo').value   = today.toISOString().slice(0,10);
    search();
  });

  // 초기 렌더링
  search();
});
