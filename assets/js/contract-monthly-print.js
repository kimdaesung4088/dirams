/* ===================================================
   거래명세서 출력 로직
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('dirams_session')) {
    window.location.href = '../index.html';
    return;
  }

  const params    = Utils.parseQueryParams();
  const ym        = params.ym;
  const printDoc  = document.getElementById('printDocument');

  if (!ym) {
    printDoc.innerHTML = '<p style="padding:40px;text-align:center;color:#666;">납품월이 지정되지 않았습니다.</p>';
    return;
  }

  const data = MOCK_CONTRACT.getByMonth(ym);
  if (!data) {
    printDoc.innerHTML = '<p style="padding:40px;text-align:center;color:#666;">해당 월의 데이터가 없습니다.</p>';
    return;
  }

  const s   = MOCK_CONTRACT.supplier;
  const b   = MOCK_CONTRACT.buyer;
  const items = data.items;

  /* 금액 한글 변환 */
  function toKorean(num) {
    if (!num) return '일금영원';
    const digits   = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const units    = ['', '십', '백', '천'];
    const bigUnits = ['', '만', '억', '조'];
    let result = ''; let bigIdx = 0; let n = num;
    while (n > 0) {
      const chunk = n % 10000;
      if (chunk > 0) {
        let cs = '';
        for (let i = 3; i >= 0; i--) {
          const d = Math.floor(chunk / Math.pow(10, i)) % 10;
          if (d > 0) cs += (d === 1 && i > 0 ? '' : digits[d]) + units[i];
        }
        result = cs + bigUnits[bigIdx] + result;
      }
      bigIdx++; n = Math.floor(n / 10000);
    }
    return '일금' + result + '원정';
  }

  const T = s => s; /* style passthrough */

  /* 항목 행 생성 */
  const itemRows = items.map(item => `
    <tr>
      <td style="border:1px solid #999; padding:1.5mm 2mm;">${item.no}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm;">${item.name}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm; text-align:center;">${item.spec}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm; text-align:center;">${item.unit}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm; text-align:right;">${Utils.formatNumber(item.qty)}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm; text-align:right;">${Utils.formatNumber(item.unitPrice)}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm; text-align:right;">${Utils.formatNumber(item.amount)}</td>
      <td style="border:1px solid #999; padding:1.5mm 2mm;"></td>
    </tr>
  `).join('');

  printDoc.innerHTML = `
  <div style="color:#000; font-size:9pt; font-family:'Pretendard Variable', sans-serif;">

    <!-- 제목 -->
    <h1 style="font-size:18pt; font-weight:bold; text-align:center; letter-spacing:0.4em; margin-bottom:6mm; border:2px solid #000; padding:3mm 0;">거래명세서</h1>

    <!-- 공급받는자 + 공급자 -->
    <table style="width:100%; border-collapse:collapse; margin-bottom:0; font-size:9pt; border:1px solid #000;">
      <tr>
        <!-- 공급받는자 (좌) -->
        <td style="width:46%; vertical-align:top; padding:0; border-right:1px solid #000;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td rowspan="3" style="writing-mode:vertical-rl; text-orientation:mixed; text-align:center; padding:2mm; border-right:1px solid #000; font-weight:bold; font-size:8pt; white-space:nowrap;">공<br>급<br>받<br>는<br>자</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; white-space:nowrap; font-size:8pt; width:18mm;">상호<br>(법인명)</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; font-size:9pt;" colspan="2">${b.name}&nbsp;&nbsp;<strong>귀하</strong></td>
            </tr>
            <tr>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">사업장<br>주소</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; font-size:8.5pt;" colspan="2">${b.address}</td>
            </tr>
            <tr>
              <td style="padding:1.5mm 2mm; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">거래일자</td>
              <td style="padding:1.5mm 2mm; font-size:9pt; text-align:center;" colspan="2">${data.tradeDate}</td>
            </tr>
            <tr>
              <td colspan="4" style="padding:1.5mm 2mm; border-top:1px solid #ccc; font-size:8.5pt; text-align:center;">아래와 같이 계산 합니다.</td>
            </tr>
          </table>
        </td>
        <!-- 공급자 (우) -->
        <td style="width:54%; vertical-align:top; padding:0;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td rowspan="4" style="writing-mode:vertical-rl; text-orientation:mixed; text-align:center; padding:2mm; border-right:1px solid #000; font-weight:bold; font-size:8pt; white-space:nowrap;">공<br>급<br>자</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; white-space:nowrap; font-size:8pt; width:16mm;">사업자<br>등록번호</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; font-size:9pt;" colspan="3">${s.bizNo}</td>
            </tr>
            <tr>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">상호<br>(법인명)</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; font-size:9pt;">${s.name}</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">성명</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; font-size:9pt;">${s.ceo}</td>
            </tr>
            <tr>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">사업장<br>주소</td>
              <td style="padding:1.5mm 2mm; border-bottom:1px solid #ccc; font-size:8pt;" colspan="3">${s.address}</td>
            </tr>
            <tr>
              <td style="padding:1.5mm 2mm; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">전화</td>
              <td style="padding:1.5mm 2mm; border-right:1px solid #000; font-size:8.5pt;">${s.tel}</td>
              <td style="padding:1.5mm 2mm; border-right:1px solid #000; white-space:nowrap; font-size:8pt;">팩스</td>
              <td style="padding:1.5mm 2mm; font-size:8.5pt;">${s.fax}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- 합계금액 -->
    <table style="width:100%; border-collapse:collapse; border:1px solid #000; border-top:none; margin-bottom:0;">
      <tr>
        <td style="padding:1.5mm 3mm; border-right:1px solid #000; white-space:nowrap; font-size:8pt; width:30mm;">합계금액<br>(공급가액+세액)</td>
        <td style="padding:1.5mm 3mm; font-size:9pt;">
          일금 ${toKorean(data.totalAmount).replace('일금','').replace('원정','')} 원정 &nbsp;（&nbsp;${Utils.formatNumber(data.totalAmount)}&nbsp;원&nbsp;）
        </td>
      </tr>
    </table>

    <!-- 품목 테이블 -->
    <table style="width:100%; border-collapse:collapse; border:1px solid #000; border-top:none; font-size:8.5pt; margin-bottom:4mm;">
      <thead>
        <tr style="background:#f0f0f0;">
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:8mm;">순번</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center;">품명</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:14mm;">규격</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:12mm;">단위</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:14mm;">수량</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:18mm;">단가</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:22mm;">금액</th>
          <th style="border:1px solid #999; padding:1.5mm 2mm; text-align:center; width:16mm;">비고</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>

  </div>
  `;
});
