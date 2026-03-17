/* ===================================================
   테이블 필터링 / 정렬 / 페이지네이션 엔진
   =================================================== */
class TableFilter {
  constructor(data, options = {}) {
    this.originalData = [...data];
    this.filteredData = [...data];
    this.options = {
      perPage: options.perPage || 10,
      onRender: options.onRender || null
    };
    this.currentPage = 1;
    this.sortKey = null;
    this.sortDir = 'asc';
  }

  /* 필터 적용 */
  applyFilter(criteria = {}) {
    let result = [...this.originalData];

    if (criteria.status && criteria.status !== 'all') {
      result = result.filter(d => d.status === criteria.status);
    }
    if (criteria.dateFrom) {
      result = result.filter(d => d.issuedAt >= criteria.dateFrom);
    }
    if (criteria.dateTo) {
      result = result.filter(d => d.issuedAt <= criteria.dateTo);
    }
    if (criteria.keyword) {
      const kw = criteria.keyword.toLowerCase();
      result = result.filter(d =>
        d.id.toLowerCase().includes(kw) ||
        d.requireDept.includes(kw) ||
        d.itemSummary.toLowerCase().includes(kw)
      );
    }

    this.filteredData = result;
    this.currentPage = 1;
    return this;
  }

  /* 정렬 */
  sort(key) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
    this.filteredData.sort((a, b) => {
      const va = a[key] || '';
      const vb = b[key] || '';
      const cmp = String(va).localeCompare(String(vb), 'ko');
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
    return this;
  }

  /* 현재 페이지 데이터 */
  getPage(page) {
    if (page !== undefined) this.currentPage = page;
    const start = (this.currentPage - 1) * this.options.perPage;
    return this.filteredData.slice(start, start + this.options.perPage);
  }

  /* 전체 페이지 수 */
  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredData.length / this.options.perPage));
  }

  /* 전체 건수 */
  get totalCount() {
    return this.filteredData.length;
  }

  /* 페이지네이션 HTML 렌더링 */
  renderPagination(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = this.totalPages;
    const cur = this.currentPage;

    if (total <= 1) { container.innerHTML = ''; return; }

    let html = '';

    // 이전 버튼
    html += `<button class="pagination-btn" ${cur===1?'disabled':''} data-page="${cur-1}" aria-label="이전 페이지">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>`;

    // 페이지 번호
    const range = this.pageRange(cur, total);
    range.forEach(p => {
      if (p === '...') {
        html += `<span class="pagination-btn" style="cursor:default">···</span>`;
      } else {
        html += `<button class="pagination-btn ${p===cur?'active':''}" data-page="${p}">${p}</button>`;
      }
    });

    // 다음 버튼
    html += `<button class="pagination-btn" ${cur===total?'disabled':''} data-page="${cur+1}" aria-label="다음 페이지">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;

    container.innerHTML = html;

    container.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        if (!isNaN(page) && page >= 1 && page <= total) {
          this.currentPage = page;
          if (typeof this.options.onRender === 'function') {
            this.options.onRender(this.getPage(), this);
          }
        }
      });
    });
  }

  pageRange(cur, total) {
    if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
    if (cur <= 4) return [1,2,3,4,5,'...',total];
    if (cur >= total - 3) return [1,'...',total-4,total-3,total-2,total-1,total];
    return [1,'...',cur-1,cur,cur+1,'...',total];
  }
}
