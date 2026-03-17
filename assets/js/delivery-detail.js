/* ===================================================
   납품지시 상세 페이지 로직
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dirams_session')) {
    window.location.href = '../index.html';
    return;
  }

  const params = Utils.parseQueryParams();
  const id = params.id;

  const content = document.getElementById('detailContent');
  const loadingState = document.getElementById('loadingState');

  if (!id) {
    renderError('납품번호가 지정되지 않았습니다.');
    return;
  }

  const delivery = MOCK_DATA.getById(id);

  if (!delivery) {
    renderError('해당 납품지시를 찾을 수 없습니다.');
    return;
  }

  // 브레드크럼
  const breadEl = document.getElementById('breadcrumbId');
  if (breadEl) breadEl.textContent = delivery.id;

  // 인쇄 버튼
  document.getElementById('btnPrint')?.addEventListener('click', () => {
    window.location.href = `delivery-confirm.html?id=${delivery.id}`;
  });

  // 총합 계산
  const totalAmount = delivery.totalAmount;
  const totalOrderQty = delivery.items.reduce((s, i) => s + i.orderQty, 0);
  const totalDeliveredQty = delivery.items.reduce((s, i) => s + i.deliveredQty, 0);

  // 물품 테이블 행
  const itemRows = delivery.items.map((item, idx) => `
    <tr>
      <td class="no-col center" data-label="NO">${idx + 1}</td>
      <td data-label="물품코드" style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary);">${item.code}</td>
      <td data-label="물품명"><span style="font-weight: var(--font-medium);">${item.name}</span></td>
      <td class="center" data-label="규격">${item.spec || '-'}</td>
      <td class="center" data-label="단위">${item.unit}</td>
      <td class="center" data-label="발주단위">${item.orderUnit}</td>
      <td class="center" data-label="환산수량">${Utils.formatNumber(item.convertQty)}</td>
      <td class="center" data-label="발주수량"><strong>${Utils.formatNumber(item.orderQty)}</strong></td>
      <td class="center" data-label="입고수량">${Utils.formatNumber(item.receivedQty)}</td>
      <td class="center" data-label="반출수량">${Utils.formatNumber(item.returnedQty)}</td>
      <td class="center" data-label="납품수량">${Utils.formatNumber(item.deliveredQty)}</td>
      <td data-label="장소">${item.location}</td>
      <td class="right amount-cell" data-label="발주단가">${item.unitPrice ? Utils.formatCurrency(item.unitPrice) : '-'}</td>
      <td class="right amount-cell" data-label="금액">${item.amount ? Utils.formatCurrency(item.amount) : '-'}</td>
    </tr>
  `).join('');

  const html = `
    <!-- 정보 카드 -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <svg class="card-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          납품지시 정보
        </div>
        <div style="display:flex; gap: var(--space-2);">
          ${Utils.getStatusBadge(delivery.status)}
          ${delivery.isUrgent ? Utils.getUrgentBadge(true) : ''}
          ${delivery.type === 'additional' ? Utils.getTypeBadge('additional') : ''}
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-item-label">납품번호</div>
          <div class="info-item-value" style="font-family: var(--font-mono); font-size: var(--text-sm);">${delivery.id}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">요구부서</div>
          <div class="info-item-value">${delivery.requireDept}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">발행일자</div>
          <div class="info-item-value">${Utils.formatDate(delivery.issuedAt)}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">납품기한</div>
          <div class="info-item-value" style="${Utils.isOverdue(delivery.dueDate, delivery.status) ? 'color: var(--color-danger-500);' : ''}">${Utils.formatDate(delivery.dueDate)}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">납품예정일</div>
          <div class="info-item-value">${Utils.formatDate(delivery.scheduledDate)}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">납품일자</div>
          <div class="info-item-value">${Utils.formatDate(delivery.deliveredAt)}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">합계금액</div>
          <div class="info-item-value amount">${Utils.formatCurrency(totalAmount)}</div>
        </div>
        <div class="info-item">
          <div class="info-item-label">발주유형</div>
          <div class="info-item-value">${delivery.type === 'additional' ? '추가발주' : '정기발주'}</div>
        </div>
      </div>
    </div>

    <!-- 물품 상세 테이블 -->
    <div class="table-container">
      <div class="table-toolbar">
        <div class="card-title" style="font-size: var(--text-sm);">
          <svg style="width:16px;height:16px;color:var(--color-primary-500);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          물품 상세내역
        </div>
        <div class="table-count">총 <strong>${delivery.items.length}</strong>종</div>
      </div>
      <div class="table-wrapper">
        <table class="data-table" aria-label="물품 상세내역">
          <thead>
            <tr>
              <th class="center">NO</th>
              <th>물품코드</th>
              <th>물품명</th>
              <th class="center">규격</th>
              <th class="center">단위</th>
              <th class="center">발주단위</th>
              <th class="center">환산수량</th>
              <th class="center">발주수량</th>
              <th class="center">입고수량</th>
              <th class="center">반출수량</th>
              <th class="center">납품수량</th>
              <th>장소</th>
              <th class="right">발주단가</th>
              <th class="right">금액</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="7" class="sum-label">합 계</td>
              <td class="center" style="font-weight: var(--font-bold);">${Utils.formatNumber(totalOrderQty)}</td>
              <td colspan="2"></td>
              <td class="center" style="font-weight: var(--font-bold);">${Utils.formatNumber(totalDeliveredQty)}</td>
              <td></td>
              <td></td>
              <td class="right sum-value">${Utils.formatCurrency(totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- 하단 액션 -->
    <div style="display: flex; justify-content: flex-end; gap: var(--space-3); padding-bottom: var(--space-4);">
      <a href="delivery-list.html" class="btn btn-ghost">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        목록으로
      </a>
      <a href="delivery-confirm.html?id=${delivery.id}" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
        납품확인서 출력
      </a>
    </div>
  `;

  if (loadingState) loadingState.remove();
  content.insertAdjacentHTML('beforeend', html);

  function renderError(msg) {
    if (loadingState) loadingState.remove();
    content.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <div class="empty-state-title">${msg}</div>
        <div class="empty-state-desc"><a href="delivery-list.html" class="btn btn-outline btn-sm" style="margin-top:12px;">목록으로 돌아가기</a></div>
      </div>`;
  }
});
