/* ===================================================
   월별물품계약현황 리스트 로직
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dirams_session')) {
    window.location.href = '../index.html';
    return;
  }

  const filterMonth = document.getElementById('filterMonth');
  const btnSearch   = document.getElementById('btnSearch');
  const btnPrint    = document.getElementById('btnPrint');
  const tableBody   = document.getElementById('tableBody');
  const totalCount  = document.getElementById('totalCount');
  const totalAmount = document.getElementById('totalAmount');
  const emptyState  = document.getElementById('emptyState');

  function renderTable(ym) {
    const items = MOCK_CONTRACT.searchItems(ym);
    tableBody.innerHTML = '';

    if (!items || items.length === 0) {
      emptyState.style.display = '';
      totalCount.textContent  = '0';
      totalAmount.textContent = '-';
      return;
    }

    emptyState.style.display = 'none';
    let sumAmount = 0;

    items.forEach(item => {
      sumAmount += item.amount;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="center">${item.no}</td>
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td class="right">${Utils.formatNumber(item.unitPrice)}</td>
        <td class="right">${Utils.formatNumber(item.qty)}</td>
        <td class="right">${Utils.formatNumber(item.amount)}</td>
        <td class="center" style="white-space:nowrap;">${item.location}</td>
        <td class="center" style="white-space:nowrap;">${item.issuedAt || ''}</td>
        <td class="center" style="white-space:nowrap;">${item.deliveredAt || ''}</td>
        <td class="center">${item.reqDate || ''}</td>
        <td class="center">${item.contractDate || ''}</td>
        <td class="center">${item.payDate || ''}</td>
        <td class="center">${item.payStatus || ''}</td>
      `;
      tableBody.appendChild(tr);
    });

    totalCount.textContent  = items.length;
    totalAmount.textContent = Utils.formatNumber(sumAmount);
  }

  function doSearch() {
    const ym = (filterMonth.value || '').trim();
    if (!ym) {
      alert('납품월을 입력해주세요. (예: 202603)');
      return;
    }
    renderTable(ym);
  }

  btnSearch.addEventListener('click', doSearch);
  filterMonth.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // 페이지 진입 시 최신 월 자동 로드
  const latestYm = Object.keys(MOCK_CONTRACT.months).sort().reverse()[0];
  if (latestYm) {
    filterMonth.value = latestYm;
    renderTable(latestYm);
  }

  btnPrint.addEventListener('click', () => {
    const ym = (filterMonth.value || '').trim();
    if (!ym) {
      alert('납품월을 입력하고 검색 후 출력하세요.');
      return;
    }
    const data = MOCK_CONTRACT.getByMonth(ym);
    if (!data) {
      alert('해당 월의 데이터가 없습니다.');
      return;
    }
    window.location.href = `contract-monthly-print.html?ym=${ym}`;
  });
});
