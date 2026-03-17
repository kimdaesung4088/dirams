/* ===================================================
   DIRAMS 목업 데이터
   =================================================== */
const MOCK_DATA = {
  user: {
    id: 'nainemedical',
    name: '나인메디칼',
    department: '납품업체',
    role: 'supplier'
  },

  deliveries: [
    {
      id: '20130015A2502',
      requireDept: '50300',
      issuedAt: '2013-03-18',
      dueDate: '2013-03-24',
      scheduledDate: null,
      deliveredAt: '2013-03-19',
      isUrgent: false,
      type: 'regular',
      status: 'done',
      totalAmount: 3123670,
      itemSummary: '소변기 (남,플라스틱) 외 15건',
      items: [
        { no:1, code:'AKD0003', name:'소변기 (남,플라스틱)',           spec:'',  unit:'EA',  orderUnit:'EA',  convertQty:1, orderQty:40,  receivedQty:40,  returnedQty:0, deliveredQty:40,  location:'중앙창고', unitPrice:0,    amount:0 },
        { no:2, code:'AKE0018', name:'Suction catheter/흡인용카테터 (pvc,14Fr,tip)', spec:'', unit:'EA', orderUnit:'EA', convertQty:1, orderQty:100, receivedQty:100, returnedQty:0, deliveredQty:100, location:'중앙창고', unitPrice:0, amount:0 },
        { no:3, code:'AKE0157', name:'Rubber suction catheter/흡인용카테터 (14fFr)', spec:'', unit:'EA', orderUnit:'EA', convertQty:1, orderQty:400, receivedQty:400, returnedQty:0, deliveredQty:400, location:'중앙창고', unitPrice:0, amount:0 },
        { no:4, code:'AKQ0016', name:'면봉 (200s)',                    spec:'',  unit:'PKG', orderUnit:'PKG', convertQty:1, orderQty:10,  receivedQty:10,  returnedQty:0, deliveredQty:10,  location:'중앙창고', unitPrice:0, amount:0 },
        { no:5, code:'AKQ0021', name:'Sterile bag/멸균백 (7.5x100cm)', spec:'',  unit:'ROL', orderUnit:'ROL', convertQty:1, orderQty:2,   receivedQty:2,   returnedQty:0, deliveredQty:2,   location:'중앙창고', unitPrice:0, amount:0 },
        { no:6, code:'AKQ0036', name:'Alcohol swab/알콜솜 (비멸균스킨봉,4x4cm,400매)', spec:'', unit:'PKG', orderUnit:'PKG', convertQty:1, orderQty:96, receivedQty:96, returnedQty:0, deliveredQty:96, location:'중앙창고', unitPrice:0, amount:0 },
        { no:7, code:'AKQ0222', name:'Poly glove/장갑 (1회용,비닐,KR-2,100조)', spec:'', unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:10, receivedQty:10, returnedQty:0, deliveredQty:10, location:'중앙창고', unitPrice:0, amount:0 },
        { no:8, code:'AKQ0299', name:'P/F glove (size-6.5)',           spec:'',  unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:6,   receivedQty:6,   returnedQty:0, deliveredQty:6,   location:'중앙창고', unitPrice:0, amount:0 },
        { no:9, code:'AKQ0300', name:'P/F glove (size-7)',             spec:'',  unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:6,   receivedQty:6,   returnedQty:0, deliveredQty:6,   location:'중앙창고', unitPrice:0, amount:0 },
        { no:10, code:'AMA0062', name:'Slide glass (76x26x1mm,50s)',   spec:'',  unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:10,  receivedQty:10,  returnedQty:0, deliveredQty:10,  location:'중앙창고', unitPrice:0, amount:0 },
        { no:11, code:'AMC0038', name:'Glove (L,비멸균,50조)/의료용장갑', spec:'', unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:4,   receivedQty:4,   returnedQty:0, deliveredQty:4,   location:'중앙창고', unitPrice:0, amount:0 },
        { no:12, code:'AMC0039', name:'Glove (M,비멸균,50조)/의료용장갑', spec:'', unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:20,  receivedQty:20,  returnedQty:0, deliveredQty:20,  location:'중앙창고', unitPrice:0, amount:0 },
        { no:13, code:'AMC0040', name:'Glove (S,비멸균,50조)/의료용장갑', spec:'', unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:50,  receivedQty:50,  returnedQty:0, deliveredQty:50,  location:'중앙창고', unitPrice:0, amount:0 },
        { no:14, code:'AMD0015', name:'Allevyn adhesive (12.5cmx12.5cm,10s,Smith)', spec:'', unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:1, receivedQty:1, returnedQty:0, deliveredQty:1, location:'중앙창고', unitPrice:0, amount:0 },
        { no:15, code:'AMD0041', name:'EIKA care (12x15cm,Smith nephew)', spec:'', unit:'EA', orderUnit:'EA', convertQty:1, orderQty:2, receivedQty:2, returnedQty:0, deliveredQty:2, location:'중앙창고', unitPrice:0, amount:0 },
        { no:16, code:'AMD0104', name:'Allevyn thin (10cmx10cm,5s,Smith nephew)', spec:'', unit:'BOX', orderUnit:'BOX', convertQty:1, orderQty:30, receivedQty:30, returnedQty:0, deliveredQty:30, location:'중앙창고', unitPrice:0, amount:0 }
      ]
    },
    {
      id: '20130011A2502',
      requireDept: '50300',
      issuedAt: '2013-03-11',
      dueDate: '2013-03-17',
      scheduledDate: '2013-03-13',
      deliveredAt: '2013-03-12',
      isUrgent: false,
      type: 'regular',
      status: 'done',
      totalAmount: 1996784,
      itemSummary: '소변기 (남,플라스틱) 외 17건',
      items: [
        { no:1, code:'AKD0003', name:'소변기 (남,플라스틱)',           spec:'', unit:'EA',  orderUnit:'EA',  convertQty:1, orderQty:30, receivedQty:30, returnedQty:0, deliveredQty:30, location:'중앙창고', unitPrice:0, amount:0 },
        { no:2, code:'AKE0018', name:'Suction catheter/흡인용카테터',  spec:'', unit:'EA',  orderUnit:'EA',  convertQty:1, orderQty:80, receivedQty:80, returnedQty:0, deliveredQty:80, location:'중앙창고', unitPrice:0, amount:0 },
        { no:3, code:'AKQ0016', name:'면봉 (200s)',                   spec:'', unit:'PKG', orderUnit:'PKG', convertQty:1, orderQty:8,  receivedQty:8,  returnedQty:0, deliveredQty:8,  location:'중앙창고', unitPrice:0, amount:0 }
      ]
    },
    {
      id: '20130001A2502',
      requireDept: '50300',
      issuedAt: '2013-03-04',
      dueDate: '2013-03-10',
      scheduledDate: '2013-03-07',
      deliveredAt: '2013-03-07',
      isUrgent: false,
      type: 'regular',
      status: 'done',
      totalAmount: 1904808,
      itemSummary: '소변기 (남,플라스틱) 외 13건',
      items: [
        { no:1, code:'AKD0003', name:'소변기 (남,플라스틱)', spec:'', unit:'EA', orderUnit:'EA', convertQty:1, orderQty:25, receivedQty:25, returnedQty:0, deliveredQty:25, location:'중앙창고', unitPrice:0, amount:0 }
      ]
    },
    {
      id: '20130018A2502',
      requireDept: '50300',
      issuedAt: '2013-03-18',
      dueDate: '2013-03-22',
      scheduledDate: '2013-03-21',
      deliveredAt: null,
      isUrgent: true,
      type: 'additional',
      status: 'received',
      totalAmount: 850000,
      itemSummary: '방사선 차폐 장갑 외 3건',
      items: [
        { no:1, code:'RAD0001', name:'방사선 차폐 장갑 (L)',  spec:'L size', unit:'쌍', orderUnit:'BOX', convertQty:10, orderQty:2, receivedQty:2, returnedQty:0, deliveredQty:0, location:'방사선과창고', unitPrice:125000, amount:250000 },
        { no:2, code:'RAD0002', name:'납앞치마 (0.25mmPb)', spec:'성인용', unit:'EA', orderUnit:'EA', convertQty:1, orderQty:1, receivedQty:1, returnedQty:0, deliveredQty:0, location:'방사선과창고', unitPrice:600000, amount:600000 }
      ]
    },
    {
      id: '20260317A2502',
      requireDept: '50300',
      issuedAt: '2026-03-17',
      dueDate: '2026-03-21',
      scheduledDate: null,
      deliveredAt: null,
      isUrgent: false,
      type: 'regular',
      status: 'waiting',
      totalAmount: 876000,
      itemSummary: '소변기 (남,플라스틱) 외 4건',
      items: [
        { no:1, code:'AKD0003', name:'소변기 (남,플라스틱)',           spec:'',     unit:'EA',  orderUnit:'EA',  convertQty:1,   orderQty:40, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:0,      amount:0 },
        { no:2, code:'AKE0018', name:'Suction catheter/흡인용카테터 (pvc,14Fr,tip)', spec:'', unit:'EA', orderUnit:'EA', convertQty:1, orderQty:100, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:0, amount:0 },
        { no:3, code:'AKQ0016', name:'면봉 (200s)',                    spec:'',     unit:'PKG', orderUnit:'PKG', convertQty:1,   orderQty:10, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:0,      amount:0 },
        { no:4, code:'AKQ0036', name:'Alcohol swab/알콜솜 (비멸균,4x4cm,400매)', spec:'', unit:'PKG', orderUnit:'PKG', convertQty:1, orderQty:48, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:0, amount:0 },
        { no:5, code:'AMC0039', name:'Glove (M,비멸균,50조)/의료용장갑', spec:'',  unit:'BOX', orderUnit:'BOX', convertQty:1,   orderQty:20, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:0,      amount:0 }
      ]
    },
    {
      id: '20260314A2502',
      requireDept: '50400',
      issuedAt: '2026-03-14',
      dueDate: '2026-03-19',
      scheduledDate: null,
      deliveredAt: null,
      isUrgent: true,
      type: 'additional',
      status: 'waiting',
      totalAmount: 1240000,
      itemSummary: '혈액투석 튜브 (성인용) 외 2건',
      items: [
        { no:1, code:'HD0001', name:'혈액투석 튜브 (성인용)',  spec:'성인용', unit:'EA',  orderUnit:'BOX', convertQty:10, orderQty:5,  receivedQty:0, returnedQty:0, deliveredQty:0, location:'투석실창고', unitPrice:185000, amount:925000 },
        { no:2, code:'HD0002', name:'혈액투석 필터 (F6)',      spec:'F6',     unit:'EA',  orderUnit:'BOX', convertQty:10, orderQty:2,  receivedQty:0, returnedQty:0, deliveredQty:0, location:'투석실창고', unitPrice:0,      amount:0 },
        { no:3, code:'HD0005', name:'혈액투석 바늘 (16G)',     spec:'16G',    unit:'EA',  orderUnit:'BOX', convertQty:100,orderQty:1,  receivedQty:0, returnedQty:0, deliveredQty:0, location:'투석실창고', unitPrice:315000, amount:315000 }
      ]
    },
    {
      id: '20130020A2502',
      requireDept: '50200',
      issuedAt: '2013-03-19',
      dueDate: '2013-03-25',
      scheduledDate: null,
      deliveredAt: null,
      isUrgent: false,
      type: 'regular',
      status: 'waiting',
      totalAmount: 432000,
      itemSummary: '주사기 (5ml) 외 2건',
      items: [
        { no:1, code:'INJ0001', name:'주사기 (5ml)',  spec:'5cc', unit:'EA', orderUnit:'BOX', convertQty:100, orderQty:3, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:144000, amount:432000 }
      ]
    },
    {
      id: '20130021A2502',
      requireDept: '50100',
      issuedAt: '2013-03-19',
      dueDate: '2013-03-26',
      scheduledDate: null,
      deliveredAt: null,
      isUrgent: false,
      type: 'regular',
      status: 'waiting',
      totalAmount: 720000,
      itemSummary: '거즈 (4x4,12겹) 외 4건',
      items: [
        { no:1, code:'GZE0001', name:'거즈 (4x4,12겹,100매)', spec:'4x4', unit:'PKG', orderUnit:'BOX', convertQty:20, orderQty:2, receivedQty:0, returnedQty:0, deliveredQty:0, location:'중앙창고', unitPrice:360000, amount:720000 }
      ]
    }
  ]
};

/* 통계 계산 */
MOCK_DATA.getStats = function() {
  const d = this.deliveries;
  return {
    waiting:  d.filter(x => x.status === 'waiting').length,
    received: d.filter(x => x.status === 'received').length,
    done:     d.filter(x => x.status === 'done').length,
    urgent:   d.filter(x => x.isUrgent).length,
    total:    d.length
  };
};

/* ID로 조회 */
MOCK_DATA.getById = function(id) {
  return this.deliveries.find(d => d.id === id) || null;
};

/* 필터 조회 */
MOCK_DATA.filter = function({ status, dateFrom, dateTo } = {}) {
  let result = [...this.deliveries];
  if (status && status !== 'all') result = result.filter(d => d.status === status);
  if (dateFrom) result = result.filter(d => d.issuedAt >= dateFrom);
  if (dateTo)   result = result.filter(d => d.issuedAt <= dateTo);
  return result;
};
