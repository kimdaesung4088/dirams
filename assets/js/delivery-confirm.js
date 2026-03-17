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

  // 뒤로 가기 링크
  if (btnBack) btnBack.href = `delivery-detail.html?id=${id}`;

  const totalAmount = d.totalAmount;
  const totalQty = d.items.reduce((s, i) => s + i.orderQty, 0);

  // 분할: 서명 부서 (1~16번 물품)
  const groupedSigns = [
    { dept: '중앙창고', rows: d.items.filter(i => i.location === '중앙창고') },
    { dept: '방사선과창고', rows: d.items.filter(i => i.location !== '중앙창고') }
  ].filter(g => g.rows.length > 0);

  const itemRows = d.items.map((item, idx) => `
    <tr>
      <td style="text-align:center; border:1px solid #999; padding: 2mm 2mm;">${idx+1}</td>
      <td style="border:1px solid #999; padding: 2mm 2mm;">${item.code}</td>
      <td style="border:1px solid #999; padding: 2mm 2mm;">${item.name}</td>
      <td style="text-align:center; border:1px solid #999; padding: 2mm 2mm;">${item.unit}</td>
      <td style="text-align:center; border:1px solid #999; padding: 2mm 2mm;">${Utils.formatNumber(item.orderQty)}</td>
      <td style="text-align:center; border:1px solid #999; padding: 2mm 2mm;">${item.location}</td>
      <td style="text-align:center; border:1px solid #999; padding: 2mm 2mm;"></td>
    </tr>
  `).join('');

  // 서명란 (장소별 그룹)
  const signRows = groupedSigns.map(g => `
    <tr>
      <td style="text-align:center; border:1px solid #aaa; padding: 3mm; background:#f5f5f5; font-weight:bold;">${g.rows.map(r => r.no || d.items.indexOf(r)+1).join(', ')}</td>
      <td style="border:1px solid #aaa; padding: 3mm; text-align:center;">${g.dept}</td>
      <td style="border:1px solid #aaa; padding: 3mm; min-width: 50px;"></td>
      <td style="border:1px solid #aaa; padding: 3mm; min-width: 50px;"></td>
      <td style="border:1px solid #aaa; padding: 3mm; min-width: 30px;"></td>
      <td style="border:1px solid #aaa; padding: 3mm; text-align:center;">${g.dept}</td>
      <td style="border:1px solid #aaa; padding: 3mm; min-width: 50px;"></td>
      <td style="border:1px solid #aaa; padding: 3mm; min-width: 50px;"></td>
      <td style="border:1px solid #aaa; padding: 3mm; min-width: 30px;"></td>
    </tr>
  `).join('');

  printDoc.innerHTML = `
    <div style="font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; color: #000;">

      <!-- 제목 -->
      <h1 style="font-size: 20pt; font-weight: bold; text-align: center; letter-spacing: 0.5em; margin-bottom: 8mm;">납 품 확 인 서</h1>

      <!-- 기본 정보 테이블 -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:6mm; font-size:9pt;">
        <tr>
          <td style="border:1px solid #333; padding:2mm 3mm; background:#f0f0f0; font-weight:bold; width:80pt;">납품일자</td>
          <td style="border:1px solid #333; padding:2mm 3mm;">${Utils.formatDate(d.deliveredAt || d.scheduledDate || d.dueDate)}</td>
          <td rowspan="3" style="border:1px solid #333; padding:2mm; width:120pt;">
            <div style="font-size:8pt; font-weight:bold; margin-bottom:2mm;">공급자</div>
            <table style="width:100%; font-size:7.5pt; border-collapse:collapse;">
              <tr>
                <td style="padding:1mm; color:#555;">상 호</td>
                <td style="padding:1mm; border-bottom:1px solid #ccc;">${Utils.getUserName() || '나인메디칼'}</td>
              </tr>
              <tr>
                <td style="padding:1mm; color:#555;">사업자주소</td>
                <td style="padding:1mm; border-bottom:1px solid #ccc;">부산광역시 기장군 장안읍 좌동길 40</td>
              </tr>
              <tr>
                <td style="padding:1mm; color:#555;">업 태</td>
                <td style="padding:1mm;">병원</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="border:1px solid #333; padding:2mm 3mm; background:#f0f0f0; font-weight:bold;">수 요 처</td>
          <td style="border:1px solid #333; padding:2mm 3mm;">동남권원자력의학원 귀하</td>
        </tr>
        <tr>
          <td style="border:1px solid #333; padding:2mm 3mm; background:#f0f0f0; font-weight:bold;">발주번호</td>
          <td style="border:1px solid #333; padding:2mm 3mm; font-family: monospace;">${d.id}</td>
        </tr>
      </table>

      <!-- 합계금액 -->
      <div style="margin-bottom:4mm; font-size:10pt;">
        <span style="font-weight:bold;">합계금액 : </span>
        <span style="font-size:12pt; font-weight:bold;">${Utils.formatCurrency(totalAmount)}</span>
      </div>

      <!-- 검체명 (업체명) -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:4mm; font-size:9pt;">
        <tr>
          <td style="border:1px solid #333; padding:2mm 3mm; background:#f0f0f0; font-weight:bold; width:70pt;">검체명</td>
          <td style="border:1px solid #333; padding:2mm 3mm; font-weight:bold;">${Utils.getUserName() || '나인메디칼'}</td>
        </tr>
      </table>

      <!-- 물품 목록 테이블 -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:6mm; font-size:8pt;">
        <thead>
          <tr style="background:#e8e8e8;">
            <th style="border:1px solid #333; padding:2mm; text-align:center; width:20pt;">순번</th>
            <th style="border:1px solid #333; padding:2mm; text-align:center; width:55pt;">표시 물품코드</th>
            <th style="border:1px solid #333; padding:2mm; text-align:center;">품명</th>
            <th style="border:1px solid #333; padding:2mm; text-align:center; width:25pt;">단위</th>
            <th style="border:1px solid #333; padding:2mm; text-align:center; width:25pt;">수량</th>
            <th style="border:1px solid #333; padding:2mm; text-align:center; width:45pt;">장소</th>
            <th style="border:1px solid #333; padding:2mm; text-align:center; width:30pt;">반출</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr style="background:#f5f5f5; font-weight:bold;">
            <td colspan="4" style="border:1px solid #333; padding:2mm 3mm; text-align:right;">합 계</td>
            <td style="border:1px solid #333; padding:2mm; text-align:center;">${Utils.formatNumber(totalQty)}</td>
            <td colspan="2" style="border:1px solid #333; padding:2mm;"></td>
          </tr>
        </tfoot>
      </table>

      <!-- 검수자 서명 -->
      <div style="margin-bottom:4mm; font-size:9pt;">
        <span style="font-weight:bold;">검 수 자 : 김진우</span>
        <span style="margin-left:20mm; color:#555;">(인)</span>
        <span style="margin-left:20mm; font-weight:bold;">검수담당부서장 : 최문창</span>
        <span style="margin-left:10mm; color:#555;">(인)</span>
      </div>

      <!-- 서명란 테이블 -->
      <table style="width:100%; border-collapse:collapse; font-size:8pt; margin-bottom:6mm;">
        <thead>
          <tr style="background:#e8e8e8;">
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;" colspan="5">검수자 확인</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;" colspan="4">부서장 확인</th>
          </tr>
          <tr style="background:#f0f0f0; font-size:7.5pt;">
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">순번</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">부서명</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령일</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령자</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">인</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">순번</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령일</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">수령자</th>
            <th style="border:1px solid #aaa; padding:2mm; text-align:center;">인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #aaa; padding:3mm; text-align:center;">1-${d.items.length}</td>
            <td style="border:1px solid #aaa; padding:3mm; text-align:center;">중앙창고</td>
            <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
            <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
            <td style="border:1px solid #aaa; padding:3mm; min-width:25px;"></td>
            <td style="border:1px solid #aaa; padding:3mm; text-align:center;">중앙창고</td>
            <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
            <td style="border:1px solid #aaa; padding:3mm; min-width:45px;"></td>
            <td style="border:1px solid #aaa; padding:3mm; min-width:25px;"></td>
          </tr>
        </tbody>
      </table>

      <!-- 주의사항 -->
      <div style="font-size:7.5pt; color:#555; border-top:1px solid #ccc; padding-top:3mm; line-height:1.6;">
        ※ 납품확인서를 출력하기 위해서는 아크로뱃리더를 설치하셔야 합니다.<br>
        ※ 검수서 제출 1부 [검수관], 검수서 보관 1부 [납품업체]
      </div>
    </div>
  `;
});
