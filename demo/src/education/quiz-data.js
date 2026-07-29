(function initQuizData(root) {
  'use strict';
  const quiz = {
    es:[
      {question:'¿Cuál es el enlace dominante en el cloruro de sodio (NaCl)?',options:['Covalente no polar','Iónico cristalino','Metálico','Puente de hidrógeno'],correct:1,explanation:'La diferencia de electronegatividad favorece la transferencia electrónica y una red iónica.'},
      {question:'¿Qué geometría VSEPR presenta el agua (H₂O)?',options:['Lineal, 180°','Tetraédrica, 109.5°','Angular, 104.5°','Trigonal plana'],correct:2,explanation:'Los dos pares libres del oxígeno comprimen el ángulo H–O–H hasta aproximadamente 104.5°.'},
      {question:'¿Qué indica ΔHf = −285.8 kJ/mol para la formación de H₂O(l)?',options:['Absorbe calor','Libera calor','No cambia la energía','Es energía de ionización'],correct:1,explanation:'Una entalpía de formación negativa describe un proceso exotérmico bajo las condiciones de referencia.'}
    ],
    en:[
      {question:'What is the dominant bonding in sodium chloride (NaCl)?',options:['Nonpolar covalent','Crystalline ionic','Metallic','Hydrogen bond'],correct:1,explanation:'The electronegativity difference favors electron transfer and an ionic lattice.'},
      {question:'What VSEPR geometry does water (H₂O) have?',options:['Linear, 180°','Tetrahedral, 109.5°','Bent, 104.5°','Trigonal planar'],correct:2,explanation:'Two oxygen lone pairs compress the H–O–H angle to about 104.5°.'},
      {question:'What does ΔHf = −285.8 kJ/mol for H₂O(l) formation indicate?',options:['Heat is absorbed','Heat is released','No energy change','Ionization energy'],correct:1,explanation:'A negative formation enthalpy describes an exothermic process under reference conditions.'}
    ],
    ja:[
      {question:'塩化ナトリウム（NaCl）の主な結合は？',options:['無極性共有結合','結晶性イオン結合','金属結合','水素結合'],correct:1,explanation:'電気陰性度差により電子移動とイオン格子が形成されます。'},
      {question:'水（H₂O）のVSEPR形状は？',options:['直線形 180°','正四面体形 109.5°','折れ線形 104.5°','平面三角形'],correct:2,explanation:'酸素の2つの孤立電子対がH–O–H角を約104.5°に縮めます。'},
      {question:'H₂O(l)生成のΔHf = −285.8 kJ/molは何を示す？',options:['吸熱','放熱','エネルギー変化なし','イオン化エネルギー'],correct:1,explanation:'負の生成エンタルピーは標準条件で発熱過程であることを示します。'}
    ],
    ru:[
      {question:'Какой тип связи преобладает в NaCl?',options:['Неполярная ковалентная','Ионная кристаллическая','Металлическая','Водородная'],correct:1,explanation:'Разность электроотрицательностей способствует переносу электрона и образованию ионной решётки.'},
      {question:'Какова геометрия VSEPR молекулы H₂O?',options:['Линейная, 180°','Тетраэдрическая, 109,5°','Угловая, 104,5°','Треугольная плоская'],correct:2,explanation:'Две неподелённые пары кислорода уменьшают угол H–O–H примерно до 104,5°.'},
      {question:'Что означает ΔHf = −285,8 кДж/моль для образования H₂O(l)?',options:['Тепло поглощается','Тепло выделяется','Энергия не меняется','Это энергия ионизации'],correct:1,explanation:'Отрицательная энтальпия образования означает экзотермический процесс при стандартных условиях.'}
    ],
    zh:[
      {question:'氯化钠（NaCl）中的主要成键类型是什么？',options:['非极性共价键','离子晶体键','金属键','氢键'],correct:1,explanation:'电负性差异有利于电子转移并形成离子晶格。'},
      {question:'水（H₂O）的VSEPR构型是什么？',options:['直线形 180°','四面体形 109.5°','折线形 104.5°','平面三角形'],correct:2,explanation:'氧的两对孤电子对将H–O–H键角压缩到约104.5°。'},
      {question:'H₂O(l)生成时ΔHf = −285.8 kJ/mol表示什么？',options:['吸收热量','释放热量','能量不变','电离能'],correct:1,explanation:'负的生成焓表示标准条件下的放热过程。'}
    ],
    fr:[
      {question:'Quelle liaison domine dans le chlorure de sodium (NaCl) ?',options:['Covalente apolaire','Ionique cristalline','Métallique','Liaison hydrogène'],correct:1,explanation:'La différence d’électronégativité favorise le transfert électronique et un réseau ionique.'},
      {question:'Quelle géométrie VSEPR possède l’eau (H₂O) ?',options:['Linéaire, 180°','Tétraédrique, 109,5°','Coudée, 104,5°','Trigonale plane'],correct:2,explanation:'Deux doublets libres de l’oxygène réduisent l’angle H–O–H à environ 104,5°.'},
      {question:'Que signifie ΔHf = −285,8 kJ/mol pour la formation de H₂O(l) ?',options:['Chaleur absorbée','Chaleur libérée','Aucun changement','Énergie d’ionisation'],correct:1,explanation:'Une enthalpie de formation négative décrit un processus exothermique aux conditions de référence.'}
    ],
    it:[
      {question:'Quale legame domina nel cloruro di sodio (NaCl)?',options:['Covalente apolare','Ionico cristallino','Metallico','Legame a idrogeno'],correct:1,explanation:'La differenza di elettronegatività favorisce il trasferimento elettronico e un reticolo ionico.'},
      {question:'Qual è la geometria VSEPR dell’acqua (H₂O)?',options:['Lineare, 180°','Tetraedrica, 109,5°','Angolare, 104,5°','Trigonale planare'],correct:2,explanation:'Le due coppie solitarie dell’ossigeno comprimono l’angolo H–O–H a circa 104,5°.'},
      {question:'Cosa indica ΔHf = −285,8 kJ/mol per la formazione di H₂O(l)?',options:['Assorbimento di calore','Rilascio di calore','Nessuna variazione','Energia di ionizzazione'],correct:1,explanation:'Un’entalpia di formazione negativa descrive un processo esotermico in condizioni di riferimento.'}
    ],
    de:[
      {question:'Welche Bindung dominiert in Natriumchlorid (NaCl)?',options:['Unpolare kovalente','Kristallin ionische','Metallische','Wasserstoffbrücke'],correct:1,explanation:'Die Elektronegativitätsdifferenz begünstigt Elektronenübertragung und ein Ionengitter.'},
      {question:'Welche VSEPR-Geometrie besitzt Wasser (H₂O)?',options:['Linear, 180°','Tetraedrisch, 109,5°','Gewinkelt, 104,5°','Trigonal-planar'],correct:2,explanation:'Zwei freie Elektronenpaare am Sauerstoff verkleinern den H–O–H-Winkel auf etwa 104,5°.'},
      {question:'Was bedeutet ΔHf = −285,8 kJ/mol für die Bildung von H₂O(l)?',options:['Wärmeaufnahme','Wärmefreisetzung','Keine Änderung','Ionisierungsenergie'],correct:1,explanation:'Eine negative Bildungsenthalpie beschreibt unter Referenzbedingungen einen exothermen Prozess.'}
    ],
    pt:[
      {question:'Qual ligação predomina no cloreto de sódio (NaCl)?',options:['Covalente apolar','Iônica cristalina','Metálica','Ligação de hidrogênio'],correct:1,explanation:'A diferença de eletronegatividade favorece a transferência eletrônica e uma rede iônica.'},
      {question:'Qual é a geometria VSEPR da água (H₂O)?',options:['Linear, 180°','Tetraédrica, 109,5°','Angular, 104,5°','Trigonal plana'],correct:2,explanation:'Dois pares isolados do oxigênio comprimem o ângulo H–O–H para cerca de 104,5°.'},
      {question:'O que indica ΔHf = −285,8 kJ/mol para a formação de H₂O(l)?',options:['Absorção de calor','Liberação de calor','Nenhuma mudança','Energia de ionização'],correct:1,explanation:'Uma entalpia de formação negativa descreve um processo exotérmico nas condições de referência.'}
    ],
    ko:[
      {question:'염화나트륨(NaCl)의 주된 결합은?',options:['무극성 공유 결합','결정성 이온 결합','금속 결합','수소 결합'],correct:1,explanation:'전기음성도 차이는 전자 이동과 이온 격자 형성을 유도합니다.'},
      {question:'물(H₂O)의 VSEPR 구조는?',options:['선형 180°','정사면체형 109.5°','굽은형 104.5°','평면 삼각형'],correct:2,explanation:'산소의 두 비공유 전자쌍이 H–O–H 각을 약 104.5°로 줄입니다.'},
      {question:'H₂O(l) 생성의 ΔHf = −285.8 kJ/mol은 무엇을 뜻하나?',options:['열 흡수','열 방출','에너지 변화 없음','이온화 에너지'],correct:1,explanation:'음의 생성 엔탈피는 기준 조건에서 발열 과정임을 뜻합니다.'}
    ],
    ar:[
      {question:'ما نوع الرابطة السائد في كلوريد الصوديوم (NaCl)؟',options:['تساهمية غير قطبية','أيونية بلورية','فلزية','هيدروجينية'],correct:1,explanation:'يفضّل فرق الكهروسالبية انتقال الإلكترون وتكوين شبكة أيونية.'},
      {question:'ما هندسة VSEPR للماء (H₂O)؟',options:['خطية 180°','رباعية السطوح 109.5°','منحنية 104.5°','مثلثية مستوية'],correct:2,explanation:'يضغط زوجا الإلكترونات المنفردان على الأكسجين زاوية H–O–H إلى نحو 104.5°.'},
      {question:'ماذا تعني ΔHf = −285.8 kJ/mol لتكوين H₂O(l)؟',options:['امتصاص حرارة','إطلاق حرارة','لا تغير في الطاقة','طاقة تأين'],correct:1,explanation:'إنثالبي التكوين السالب يصف عملية طاردة للحرارة في الشروط المرجعية.'}
    ]
  };
  const get = locale => quiz[root.NULLA_I18N?.normalize(locale) || 'es'] || quiz.es;
  root.NULLA_QUIZ = Object.freeze({locales:Object.freeze(Object.keys(quiz)),get});
})(globalThis);
