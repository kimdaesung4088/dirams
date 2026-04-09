/* ===================================================
   월별물품계약현황 목업 데이터
   =================================================== */
const MOCK_CONTRACT = {
  supplier: {
    bizNo: '603-81-80025',
    name: '(주)동남엠디',
    ceo: '이성욱',
    address: '부산광역시 강서구 대저로221번나길 77, 1층 102호(대저1동)',
    tel: '010-4569-5318 / 051-204-7043',
    fax: ''
  },
  buyer: {
    name: '동남권원자력의학원',
    address: '부산광역시 기장군 장안읍 좌동길 40'
  },

  months: {
    '202603': {
      tradeDate: '2026년 03월 31일',
      totalAmount: 22505495,
      items: [
        { no:1,  date:'26.03.03', code:'AKG0006', name:'Gauze/멸균 Y 부직패드 (5x5cm,4겹,2입)',             spec:'PKG', unit:'PKG', qty:20,   unitPrice:55,    amount:1100  },
        { no:2,  date:'26.03.03', code:'AKG0008', name:'Gauze/멸균부직포 (10x7.5cm,4겹 10입)',              spec:'PKG', unit:'PKG', qty:15,   unitPrice:293,   amount:4395  },
        { no:3,  date:'26.03.03', code:'AKG0009', name:'Gauze/비멸균부직포 (10x7.5cm,200s)',                spec:'PKG', unit:'PKG', qty:6,    unitPrice:3786,  amount:22716 },
        { no:4,  date:'26.03.03', code:'AKG0014', name:'Gauze X-ray/엑스레이용거즈 (7x9cm,8겹,200매)',       spec:'PKG', unit:'PKG', qty:5,    unitPrice:12420, amount:62100 },
        { no:5,  date:'26.03.03', code:'AKG0027', name:'Gauze/거즈 (22x18cm 50매)',                         spec:'PKG', unit:'PKG', qty:2000, unitPrice:2200,  amount:4400000 },
        { no:6,  date:'26.03.03', code:'AKG0028', name:'Gauze/거즈 (5x5cm,8겹,200매)',                      spec:'PKG', unit:'PKG', qty:5,    unitPrice:3400,  amount:17000 },
        { no:7,  date:'26.03.03', code:'AKH0064', name:'Elastic bandage (4inch)(12ea/1pack)',               spec:'EA',  unit:'EA',  qty:12,   unitPrice:489,   amount:5868  },
        { no:8,  date:'26.03.03', code:'AKH0065', name:'Elastic bandage (6inch)(12ea/1pack)',               spec:'EA',  unit:'EA',  qty:24,   unitPrice:662,   amount:15888 },
        { no:9,  date:'26.03.10', code:'AKQ0313', name:'멸균 Y-부직포/Y자부직포 (2x2,4p)',                   spec:'PACK',unit:'PACK',qty:170,  unitPrice:1700,  amount:289000 },
        { no:10, date:'26.03.10', code:'AKQ0520', name:'알콜솜 (4x4cm,100매)',                               spec:'PKG', unit:'PKG', qty:540,  unitPrice:990,   amount:534600 },
        { no:11, date:'26.03.10', code:'AKQ0521', name:'알콜솜 (4x4cm,200매)',                               spec:'PKG', unit:'PKG', qty:315,  unitPrice:1390,  amount:437850 },
        { no:12, date:'26.03.10', code:'AKQ0522', name:'알콜솜 (4x4cm,400매)',                               spec:'PKG', unit:'PKG', qty:570,  unitPrice:2250,  amount:1282500 },
        { no:13, date:'26.03.10', code:'AMB0008', name:'Angio catheter (20G,1.16inch,BD)/정맥내유치침',       spec:'EA',  unit:'EA',  qty:400,  unitPrice:358,   amount:143200 },
        { no:14, date:'26.03.10', code:'AMB0009', name:'Angio catheter (22G,BD)/정맥내유치침',                spec:'EA',  unit:'EA',  qty:1600, unitPrice:358,   amount:572800 },
        { no:15, date:'26.03.10', code:'AMB0010', name:'Angio catheter (24G,BD)/정맥내유치침',                spec:'EA',  unit:'EA',  qty:1200, unitPrice:358,   amount:429600 },
        { no:16, date:'26.03.17', code:'AMB0038', name:'Scalp needle (23G)/나비침(100ea/box)',               spec:'EA',  unit:'EA',  qty:3000, unitPrice:206,   amount:618000 },
        { no:17, date:'26.03.17', code:'AMB0085', name:'Syringe (1cc,1회용,100s)/주사기/신창',               spec:'BOX', unit:'BOX', qty:30,   unitPrice:4850,  amount:145500 },
        { no:18, date:'26.03.17', code:'AMB0087', name:'Syringe (5cc,1회용,100s)/주사기/신창',               spec:'BOX', unit:'BOX', qty:48,   unitPrice:5580,  amount:267840 },
        { no:19, date:'26.03.17', code:'AMB0088', name:'Syringe (10cc,1회용,100s)/주사기/신창',              spec:'BOX', unit:'BOX', qty:348,  unitPrice:7870,  amount:2738760 },
        { no:20, date:'26.03.17', code:'AMB0089', name:'Syringe (20cc,1회용,100s)/주사기/신창',              spec:'BOX', unit:'BOX', qty:120,  unitPrice:9200,  amount:1104000 },
        { no:21, date:'26.03.17', code:'AMB0090', name:'Syringe (30cc,1회용,50s)/주사기/신창',               spec:'BOX', unit:'BOX', qty:80,   unitPrice:10200, amount:816000 },
        { no:22, date:'26.03.17', code:'AMB0091', name:'Syringe (50cc,1회용,25s)/주사기/신창',               spec:'BOX', unit:'BOX', qty:24,   unitPrice:5900,  amount:141600 },
        { no:23, date:'26.03.19', code:'AMB0092', name:'Syringe (leur-lok,1회용,3ml)/주사기',               spec:'EA',  unit:'EA',  qty:100,  unitPrice:75,    amount:7500  },
        { no:24, date:'26.03.19', code:'AMB0093', name:'Syringe (leur-lok,1회용,10ml)',                     spec:'EA',  unit:'EA',  qty:200,  unitPrice:315,   amount:63000 },
        { no:25, date:'26.03.19', code:'AMB0094', name:'Syringe (leur-lok,1회용,50ml)/주사기',              spec:'EA',  unit:'EA',  qty:400,  unitPrice:850,   amount:340000 },
        { no:26, date:'26.03.19', code:'AMB0095', name:'Syringe (1ml,Leur-lok,1회용)/주사기',               spec:'EA',  unit:'EA',  qty:100,  unitPrice:500,   amount:50000 },
        { no:27, date:'26.03.19', code:'AKQ0316', name:'Alchol swab/알콜솜 (100ea/1Box)',                   spec:'PACK',unit:'PACK',qty:60,   unitPrice:1500,  amount:90000 },
        { no:28, date:'26.03.24', code:'AMT0017', name:'물티슈(초음파용)',                                    spec:'PACK',unit:'PACK',qty:40,   unitPrice:1870,  amount:74800 },
        { no:29, date:'26.03.24', code:'AKQ0523', name:'알콜솜 (4x4cm,25매X4)',                              spec:'PACK',unit:'PACK',qty:257,  unitPrice:1050,  amount:269850 },
        { no:30, date:'26.03.24', code:'AMB0008I',name:'Angio catheter (18G,1.16inch,BD)/정맥내유치침',      spec:'EA',  unit:'EA',  qty:2000, unitPrice:358,   amount:716000 },
        { no:31, date:'26.03.24', code:'AKG0027B',name:'Gauze/거즈 (22.5x22.5cm,절단 200매)',               spec:'PKG', unit:'PKG', qty:20,   unitPrice:5650,  amount:113000 },
        { no:32, date:'26.03.24', code:'AKQ0520B',name:'Alchol swab/알콜솜 (4x4cm, 일반)',                  spec:'PKG', unit:'PKG', qty:390,  unitPrice:55,    amount:21450   },
        { no:33, date:'26.03.24', code:'AMB0091B',name:'Syringe (50cc,1회용,25s)/주사기/신창',              spec:'BOX', unit:'BOX', qty:60,   unitPrice:5900,  amount:354000  },
        { no:34, date:'26.03.24', code:'AMB0090B',name:'Syringe (1회용,20cc,50s)/주사기/신창',              spec:'BOX', unit:'BOX', qty:48,   unitPrice:6600,  amount:316800  },
        { no:35, date:'26.03.24', code:'AMB0088B',name:'Syringe (10cc,22G,1회용,100s)/주사기/신창',         spec:'BOX', unit:'BOX', qty:12,   unitPrice:7860,  amount:94320   },
        { no:36, date:'26.03.31', code:'AMN0031', name:'PEN NEEDLE 31G 8MM(100s)',                          spec:'BOX', unit:'BOX', qty:1,    unitPrice:8900,  amount:8900    },
        { no:37, date:'26.03.31', code:'AMN0018', name:'Needle (1회용,18G,100s)',                            spec:'BOX', unit:'BOX', qty:16,   unitPrice:2700,  amount:43200   },
        { no:38, date:'26.03.31', code:'AMN0021', name:'Needle (1회용,21G,100s)',                            spec:'BOX', unit:'BOX', qty:2,    unitPrice:2420,  amount:4840    },
        { no:39, date:'26.03.31', code:'AMN0023', name:'Needle (1회용,23G,100s)',                            spec:'BOX', unit:'BOX', qty:3,    unitPrice:2420,  amount:7260    },
        { no:40, date:'26.03.31', code:'AMN0025', name:'Needle (1회용,25G,100s)',                            spec:'BOX', unit:'BOX', qty:2,    unitPrice:2420,  amount:4840    },
        { no:41, date:'26.03.31', code:'AMN0026', name:'Needle (1회용,26G,100s)',                            spec:'BOX', unit:'BOX', qty:4,    unitPrice:2420,  amount:9680    },
        { no:42, date:'26.03.31', code:'AKQ0201', name:'Cotton ball (2호,450g)/코튼볼',                      spec:'PKG', unit:'PKG', qty:100,  unitPrice:7800,  amount:780000  },
        { no:43, date:'26.03.31', code:'AKQ0202', name:'Cotton ball (4호,450g)/코튼볼',                      spec:'PKG', unit:'PKG', qty:20,   unitPrice:7300,  amount:146000  },
        { no:44, date:'26.03.31', code:'AKD0099', name:'드레싱키트',                                          spec:'EA',  unit:'EA',  qty:3600, unitPrice:1540,  amount:5544000 }
      ]
    },

    '202602': {
      tradeDate: '2026년 02월 28일',
      totalAmount: 18340200,
      items: [
        { no:1,  code:'AKG0006', name:'Gauze/멸균 Y 부직패드 (5x5cm,4겹,2입)',         spec:'PKG', unit:'PKG', qty:15,   unitPrice:55,    amount:825   },
        { no:2,  code:'AKG0027', name:'Gauze/거즈 (22x18cm 50매)',                     spec:'PKG', unit:'PKG', qty:1800, unitPrice:2200,  amount:3960000 },
        { no:3,  code:'AKQ0520', name:'알콜솜 (4x4cm,100매)',                           spec:'PKG', unit:'PKG', qty:480, unitPrice:990,   amount:475200 },
        { no:4,  code:'AKQ0521', name:'알콜솜 (4x4cm,200매)',                           spec:'PKG', unit:'PKG', qty:300, unitPrice:1390,  amount:417000 },
        { no:5,  code:'AMB0008', name:'Angio catheter (20G,1.16inch,BD)/정맥내유치침', spec:'EA',  unit:'EA',  qty:350, unitPrice:358,   amount:125300 },
        { no:6,  code:'AMB0009', name:'Angio catheter (22G,BD)/정맥내유치침',           spec:'EA',  unit:'EA',  qty:1400,unitPrice:358,   amount:501200 },
        { no:7,  code:'AMB0010', name:'Angio catheter (24G,BD)/정맥내유치침',           spec:'EA',  unit:'EA',  qty:1000,unitPrice:358,   amount:358000 },
        { no:8,  code:'AMB0038', name:'Scalp needle (23G)/나비침(100ea/box)',           spec:'EA',  unit:'EA',  qty:2500,unitPrice:206,   amount:515000 },
        { no:9,  code:'AMB0085', name:'Syringe (1cc,1회용,100s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:25,  unitPrice:4850,  amount:121250 },
        { no:10, code:'AMB0088', name:'Syringe (10cc,1회용,100s)/주사기/신창',          spec:'BOX', unit:'BOX', qty:300, unitPrice:7870,  amount:2361000 },
        { no:11, code:'AMB0089', name:'Syringe (20cc,1회용,100s)/주사기/신창',          spec:'BOX', unit:'BOX', qty:100, unitPrice:9200,  amount:920000 },
        { no:12, code:'AMB0090', name:'Syringe (30cc,1회용,50s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:60,  unitPrice:10200, amount:612000 },
        { no:13, code:'AKQ0522', name:'알콜솜 (4x4cm,400매)',                           spec:'PKG', unit:'PKG', qty:500, unitPrice:2250,  amount:1125000 },
        { no:14, code:'AKH0064', name:'Elastic bandage (4inch)(12ea/1pack)',           spec:'EA',  unit:'EA',  qty:10,  unitPrice:489,   amount:4890  },
        { no:15, code:'AKH0065', name:'Elastic bandage (6inch)(12ea/1pack)',           spec:'EA',  unit:'EA',  qty:20,  unitPrice:662,   amount:13240 },
        { no:16, code:'AKQ0313', name:'멸균 Y-부직포/Y자부직포 (2x2,4p)',               spec:'PACK',unit:'PACK',qty:150, unitPrice:1700,  amount:255000 },
        { no:17, code:'AMB0091', name:'Syringe (50cc,1회용,25s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:20,  unitPrice:5900,  amount:118000 },
        { no:18, code:'AMB0095', name:'Syringe (1ml,Leur-lok,1회용)/주사기',           spec:'EA',  unit:'EA',  qty:80,  unitPrice:500,   amount:40000 },
        { no:19, code:'AKQ0316', name:'Alchol swab/알콜솜 (100ea/1Box)',               spec:'PACK',unit:'PACK',qty:50,  unitPrice:1500,  amount:75000 },
        { no:20, code:'AMT0017', name:'물티슈(초음파용)',                                spec:'PACK',unit:'PACK',qty:35,  unitPrice:1870,  amount:65450 }
      ]
    },

    '202601': {
      tradeDate: '2026년 01월 31일',
      totalAmount: 15876500,
      items: [
        { no:1,  code:'AKG0027', name:'Gauze/거즈 (22x18cm 50매)',                     spec:'PKG', unit:'PKG', qty:1500,unitPrice:2200,  amount:3300000 },
        { no:2,  code:'AKG0028', name:'Gauze/거즈 (5x5cm,8겹,200매)',                  spec:'PKG', unit:'PKG', qty:4,   unitPrice:3400,  amount:13600 },
        { no:3,  code:'AKQ0520', name:'알콜솜 (4x4cm,100매)',                           spec:'PKG', unit:'PKG', qty:400, unitPrice:990,   amount:396000 },
        { no:4,  code:'AKQ0521', name:'알콜솜 (4x4cm,200매)',                           spec:'PKG', unit:'PKG', qty:250, unitPrice:1390,  amount:347500 },
        { no:5,  code:'AKQ0522', name:'알콜솜 (4x4cm,400매)',                           spec:'PKG', unit:'PKG', qty:450, unitPrice:2250,  amount:1012500 },
        { no:6,  code:'AMB0008', name:'Angio catheter (20G,1.16inch,BD)/정맥내유치침', spec:'EA',  unit:'EA',  qty:300, unitPrice:358,   amount:107400 },
        { no:7,  code:'AMB0009', name:'Angio catheter (22G,BD)/정맥내유치침',           spec:'EA',  unit:'EA',  qty:1200,unitPrice:358,   amount:429600 },
        { no:8,  code:'AMB0010', name:'Angio catheter (24G,BD)/정맥내유치침',           spec:'EA',  unit:'EA',  qty:900, unitPrice:358,   amount:322200 },
        { no:9,  code:'AMB0038', name:'Scalp needle (23G)/나비침(100ea/box)',           spec:'EA',  unit:'EA',  qty:2000,unitPrice:206,   amount:412000 },
        { no:10, code:'AMB0085', name:'Syringe (1cc,1회용,100s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:20,  unitPrice:4850,  amount:97000 },
        { no:11, code:'AMB0087', name:'Syringe (5cc,1회용,100s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:40,  unitPrice:5580,  amount:223200 },
        { no:12, code:'AMB0088', name:'Syringe (10cc,1회용,100s)/주사기/신창',          spec:'BOX', unit:'BOX', qty:280, unitPrice:7870,  amount:2203600 },
        { no:13, code:'AMB0089', name:'Syringe (20cc,1회용,100s)/주사기/신창',          spec:'BOX', unit:'BOX', qty:90,  unitPrice:9200,  amount:828000 },
        { no:14, code:'AMB0090', name:'Syringe (30cc,1회용,50s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:50,  unitPrice:10200, amount:510000 },
        { no:15, code:'AMB0091', name:'Syringe (50cc,1회용,25s)/주사기/신창',           spec:'BOX', unit:'BOX', qty:18,  unitPrice:5900,  amount:106200 },
        { no:16, code:'AKQ0313', name:'멸균 Y-부직포/Y자부직포 (2x2,4p)',               spec:'PACK',unit:'PACK',qty:130, unitPrice:1700,  amount:221000 },
        { no:17, code:'AKQ0316', name:'Alchol swab/알콜솜 (100ea/1Box)',               spec:'PACK',unit:'PACK',qty:45,  unitPrice:1500,  amount:67500 },
        { no:18, code:'AMT0017', name:'물티슈(초음파용)',                                spec:'PACK',unit:'PACK',qty:30,  unitPrice:1870,  amount:56100 }
      ]
    }
  },

  getByMonth(ym) {
    return this.months[ym] || null;
  },

  searchItems(ym) {
    const m = this.months[ym];
    if (!m) return [];
    const issuedDate = ym.slice(0,4) + '-' + ym.slice(4,6) + '-03';
    const delivDate  = ym.slice(0,4) + '-' + ym.slice(4,6) + '-03';
    return m.items.map(item => ({
      ...item,
      location: '중앙창고',
      issuedAt: issuedDate,
      deliveredAt: delivDate,
      reqDate: '',
      contractDate: '',
      payDate: '',
      payStatus: ''
    }));
  }
};
