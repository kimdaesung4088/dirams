/* ===================================================
   납품확인서 페이지 로직
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dirams_session')) {
    window.location.href = '../index.html';
    return;
  }

  const params = Utils.parseQueryParams();
  const id = params.id;
  const printDoc = document.getElementById('printDocument');
  const btnBack = document.getElementById('btnBack');

  if (!id) {
    printDoc.innerHTML = '<p style="padding:40px; text-align:center; color:#666;">납품번호가 지정되지 않았습니다.</p>';
    return;
  }

  const d = MOCK_DATA.getById(id);
  if (!d) {
    printDoc.innerHTML = '<p style="padding:40px; text-align:center; color:#666;">해당 납품지시를 찾을 수 없습니다.</p>';
    return;
  }

  if (btnBack) btnBack.href = `delivery-detail.html?id=${id}`;

  const totalAmount = d.totalAmount;
  const totalQty = d.items.reduce((s, i) => s + i.orderQty, 0);

  /* 금액 한글 변환 */
  function toKoreanAmount(num) {
    if (!num || num === 0) return '일금영원';
    const digits  = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const units   = ['', '십', '백', '천'];
    const bigUnits = ['', '만', '억', '조'];
    let result = '';
    let bigIdx = 0;
    while (num > 0) {
      const chunk = num % 10000;
      if (chunk > 0) {
        let chunkStr = '';
        for (let i = 3; i >= 0; i--) {
          const d = Math.floor(chunk / Math.pow(10, i)) % 10;
          if (d > 0) {
            chunkStr += (d === 1 && i > 0 ? '' : digits[d]) + units[i];
          }
        }
        result = chunkStr + bigUnits[bigIdx] + result;
      }
      num = Math.floor(num / 10000);
      bigIdx++;
    }
    return '일금' + result + '원';
  }

  /* 장소별 서명행 그룹 */
  const locationGroups = d.items.reduce((acc, item, idx) => {
    const loc = item.location || '중앙창고';
    if (!acc[loc]) acc[loc] = { nos: [], dept: loc };
    acc[loc].nos.push(idx + 1);
    return acc;
  }, {});

  const signRowsHtml = Object.values(locationGroups).map(g => {
    const nosStr = g.nos.length > 1
      ? `${g.nos[0]}~${g.nos[g.nos.length - 1]}`
      : `${g.nos[0]}`;
    return `
      <tr>
        <td style="border:1px solid #aaa; padding:3mm; text-align:center;">${nosStr}</td>
        <td style="border:1px solid #aaa; padding:3mm; text-align:center;">${g.dept}</td>
        <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
        <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
        <td style="border:1px solid #aaa; padding:3mm; min-width:25px;"></td>
        <td style="border:1px solid #aaa; padding:3mm; text-align:center;"></td>
        <td style="border:1px solid #aaa; padding:3mm; text-align:center;"></td>
        <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
        <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
        <td style="border:1px solid #aaa; padding:3mm; min-width:25px;"></td>
      </tr>`;
  }).join('');

  /* 빈 서명행 추가 (최소 4행) */
  const signCount = Object.keys(locationGroups).length;
  const emptySignRows = Array.from({ length: Math.max(0, 4 - signCount) }).map(() => `
    <tr>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
      <td style="border:1px solid #aaa; padding:5mm;"></td>
    </tr>`).join('');

  const itemRows = d.items.map((item, idx) => `
    <tr>
      <td style="text-align:center; border:1px solid #aaa; padding:2mm;">${idx + 1}</td>
      <td style="text-align:center; border:1px solid #aaa; padding:2mm;"></td>
      <td style="border:1px solid #aaa; padding:2mm; font-size:7.5pt;">${item.code}</td>
      <td style="border:1px solid #aaa; padding:2mm;">${item.name}</td>
      <td style="text-align:center; border:1px solid #aaa; padding:2mm;">${item.unit}</td>
      <td style="text-align:center; border:1px solid #aaa; padding:2mm;">${Utils.formatNumber(item.orderQty)}</td>
      <td style="text-align:center; border:1px solid #aaa; padding:2mm;">${item.location}</td>
      <td style="text-align:center; border:1px solid #aaa; padding:2mm;"></td>
      <td style="border:1px solid #aaa; padding:2mm;"></td>
    </tr>
  `).join('');

  const supplierName = Utils.getUserName() || '(주)동남엠디';

  const T = (s) => `font-family:'Malgun Gothic','맑은 고딕',sans-serif;${s}`;

  printDoc.innerHTML = `
    <div style="${T('color:#000; font-size:9pt; display:flex; flex-direction:column; min-height:267mm;')}">

      <!-- 제목 -->
      <h1 style="font-size:18pt; font-weight:bold; text-align:center; letter-spacing:0.4em; margin-bottom:6mm;">납품확인서</h1>

      <!-- 상단 정보 + 공급자 테이블 -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:4mm; font-size:9pt;">
        <tr>
          <td style="vertical-align:top; padding:0; width:45%;">
            <div style="line-height:2;">
              <div>납품기한 &nbsp;: &nbsp;${Utils.formatDate(d.dueDate)}</div>
              <div>납품예정 &nbsp;: &nbsp;${Utils.formatDate(d.scheduledDate)}</div>
              <div>동남권원자력의학원 귀하</div>
              <div>발주번호 &nbsp;: &nbsp;${d.id}</div>
            </div>
          </td>
          <td style="vertical-align:top; padding:0;">
            <table style="width:100%; border-collapse:collapse; font-size:8.5pt;">
              <tr>
                <td rowspan="4" style="border:1px solid #666; padding:2mm; text-align:center; vertical-align:middle; width:14pt; writing-mode:vertical-rl; letter-spacing:0.3em; font-weight:bold; background:#f5f5f5;">공<br>급<br>자</td>
                <td style="border:1px solid #666; padding:2mm; background:#f5f5f5; font-weight:bold; width:50pt;">등록번호</td>
                <td colspan="3" style="border:1px solid #666; padding:2mm; text-align:center; letter-spacing:0.1em;">621-82-11241</td>
              </tr>
              <tr>
                <td style="border:1px solid #666; padding:2mm; background:#f5f5f5; font-weight:bold;">상 호</td>
                <td style="border:1px solid #666; padding:2mm;">동남권원자력의학원</td>
                <td style="border:1px solid #666; padding:2mm; background:#f5f5f5; font-weight:bold; text-align:center;">대표자</td>
                <td style="border:1px solid #666; padding:2mm; text-align:center;">정승필</td>
              </tr>
              <tr>
                <td style="border:1px solid #666; padding:2mm; background:#f5f5f5; font-weight:bold;">사업자주소</td>
                <td colspan="3" style="border:1px solid #666; padding:2mm;">부산광역시 기장군 장안읍 좌동길 40</td>
              </tr>
              <tr>
                <td style="border:1px solid #666; padding:2mm; background:#f5f5f5; font-weight:bold;">업 태</td>
                <td style="border:1px solid #666; padding:2mm; text-align:center;">병원</td>
                <td style="border:1px solid #666; padding:2mm; background:#f5f5f5; font-weight:bold; text-align:center;">종 목</td>
                <td style="border:1px solid #666; padding:2mm; text-align:center;">보건업</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- 합계금액 -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:2mm; font-size:9pt;">
        <tr>
          <td style="border:1px solid #666; padding:2mm 4mm; width:70pt; font-weight:bold; background:#f5f5f5;">합계금액 :</td>
          <td style="border:1px solid #666; padding:2mm 4mm; text-align:center; font-weight:bold;">
            ${toKoreanAmount(totalAmount)}(${Number(totalAmount).toLocaleString('ko-KR')})
          </td>
        </tr>
      </table>

      <!-- 업체명 -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:4mm; font-size:9pt;">
        <tr>
          <td style="border:1px solid #666; padding:2mm 4mm; width:70pt; font-weight:bold; background:#f5f5f5;">업체명</td>
          <td style="border:1px solid #666; padding:2mm 4mm;">${supplierName}</td>
        </tr>
      </table>

      <!-- 물품 목록 테이블 -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:6mm; font-size:8.5pt;">
        <thead>
          <tr style="background:#e8e8e8;">
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:18pt;">순번</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:18pt;">표시</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:55pt;">물품코드</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center;">품명</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:25pt;">단위</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:25pt;">수량</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:45pt;">장소</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:25pt;">반출</th>
            <th style="border:1px solid #666; padding:2mm; text-align:center; width:40pt;">비고</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <!-- 여백 자동 확장 -->
      <div style="flex:1;"></div>

      <!-- 검수자 서명 (우측 정렬) -->
      <div style="text-align:right; margin-bottom:4mm; font-size:9pt; line-height:2;">
        <div>검 수 자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;조현옥 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (인)</div>
        <div>검수담당부서장 : &nbsp;한지훈 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (인)</div>
      </div>

      <!-- 하단 서명란 -->
      <table style="width:100%; border-collapse:collapse; font-size:8pt;">
        <thead>
          <tr style="background:#e8e8e8;">
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">순번</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">부서명</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령일</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령자</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">인</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">순번</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">부서명</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령일</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령자</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">인</th>
          </tr>
        </thead>
        <tbody>
          ${signRowsHtml}
          ${emptySignRows}
        </tbody>
      </table>

    </div>
  `;
});
