(function extendExperienceScienceI18n(root){
  'use strict';
  const i18n=root.NULLA_I18N;
  if(!i18n)throw new Error('NULLA_I18N must load before experience-science-i18n.js');
  const keys=['mixButton','phaseModelDisabled','noFurtherTransition','qualitativeNotMd','outsideApplicability','mixtureTitle','mixtureNoFormula','mixtureCoexist','mixtureNoBonds','mixtureDisclaimer','selectTwoSpecies','massDerivedVerified','massDataIncomplete','xyzNuclearBlocked','xyzScaleBlocked'];
  const values={
    es:['◌ MEZCLAR','ILUSTRACIÓN DESACTIVADA','SIN OTRA TRANSICIÓN CATALOGADA','MOVIMIENTO CUALITATIVO; NO ES DINÁMICA MOLECULAR','ESTRUCTURA FUERA DE LA FASE APLICABLE','MEZCLA FÍSICA','SIN FÓRMULA DE PRODUCTO','ESPECIES COEXISTENTES','NO SE AFIRMAN ENLACES ENTRE ESPECIES','MEZCLAR NO ES REACCIONAR; la fase exige composición y condiciones','Selecciona al menos dos especies','Q VERIFICADO A PARTIR DE MASAS','Q REPRESENTATIVO; FALTAN MASAS DEL CANAL','XYZ BLOQUEADO: el esquema nuclear no se exportará como hidrógeno','XYZ BLOQUEADO: la geometría no tiene escala Å calibrada'],
    en:['◌ MIX','ILLUSTRATION DISABLED','NO FURTHER CATALOGUED TRANSITION','QUALITATIVE MOTION; NOT MOLECULAR DYNAMICS','STRUCTURE OUTSIDE APPLICABLE PHASE','PHYSICAL MIXTURE','NO PRODUCT FORMULA','COEXISTING SPECIES','NO INTER-SPECIES BONDS CLAIMED','MIXING IS NOT REACTION; phase needs composition and conditions','Select at least two species','MASS-DERIVED Q VERIFIED','REPRESENTATIVE Q; CHANNEL MASSES INCOMPLETE','XYZ BLOCKED: nuclear schema will not be exported as hydrogen','XYZ BLOCKED: geometry lacks a calibrated Å scale'],
    ja:['◌ 混合','図解を無効化','次の収録済み転移なし','定性的運動（分子動力学ではない）','構造は適用相の範囲外','物理混合物','生成物の式なし','共存する化学種','種間結合を主張しない','混合は反応ではなく、相には組成と条件が必要','2種以上を選択','質量から求めたQを検証','代表Q（経路質量が不完全）','XYZ停止：核スキーマを水素として出力しない','XYZ停止：Å尺度が未校正'],
    ru:['◌ СМЕШАТЬ','ИЛЛЮСТРАЦИЯ ОТКЛЮЧЕНА','НЕТ СЛЕДУЮЩЕГО ПЕРЕХОДА В КАТАЛОГЕ','КАЧЕСТВЕННОЕ ДВИЖЕНИЕ, НЕ МОЛЕКУЛЯРНАЯ ДИНАМИКА','СТРУКТУРА ВНЕ ПРИМЕНИМОЙ ФАЗЫ','ФИЗИЧЕСКАЯ СМЕСЬ','НЕТ ФОРМУЛЫ ПРОДУКТА','СОСУЩЕСТВУЮЩИЕ ВЕЩЕСТВА','МЕЖВИДОВЫЕ СВЯЗИ НЕ ЗАЯВЛЕНЫ','СМЕШЕНИЕ НЕ ЯВЛЯЕТСЯ РЕАКЦИЕЙ','Выберите не менее двух веществ','Q ПРОВЕРЕНО ПО МАССАМ','Q ПРЕДСТАВИТЕЛЬНОЕ; МАССЫ НЕПОЛНЫ','XYZ ЗАБЛОКИРОВАН: нуклоны не будут записаны как водород','XYZ ЗАБЛОКИРОВАН: нет калиброванной шкалы Å'],
    zh:['◌ 混合','示意运动已关闭','无后续已收录相变','定性运动；并非分子动力学','结构超出适用相态','物理混合物','无产物化学式','共存物种','不声称物种间成键','混合不是反应；相态还需组成与条件','请至少选择两种物种','由质量计算的Q已验证','代表性Q；通道质量数据不完整','XYZ已阻止：核子不会被导出为氢','XYZ已阻止：几何未校准Å尺度'],
    fr:['◌ MÉLANGER','ILLUSTRATION DÉSACTIVÉE','AUCUNE AUTRE TRANSITION CATALOGUÉE','MOUVEMENT QUALITATIF, PAS UNE DYNAMIQUE MOLÉCULAIRE','STRUCTURE HORS DE LA PHASE APPLICABLE','MÉLANGE PHYSIQUE','AUCUNE FORMULE DE PRODUIT','ESPÈCES COEXISTANTES','AUCUNE LIAISON INTERESPÈCE REVENDIQUÉE','MÉLANGER N’EST PAS RÉAGIR; la phase exige composition et conditions','Sélectionnez au moins deux espèces','Q CALCULÉ PAR MASSES VÉRIFIÉ','Q REPRÉSENTATIF; MASSES DU CANAL INCOMPLÈTES','XYZ BLOQUÉ : le schéma nucléaire ne sera pas exporté comme hydrogène','XYZ BLOQUÉ : échelle Å non calibrée'],
    it:['◌ MESCOLA','ILLUSTRAZIONE DISATTIVATA','NESSUN’ALTRA TRANSIZIONE CATALOGATA','MOTO QUALITATIVO, NON DINAMICA MOLECOLARE','STRUTTURA FUORI DALLA FASE APPLICABILE','MISCELA FISICA','NESSUNA FORMULA DI PRODOTTO','SPECIE COESISTENTI','NESSUN LEGAME TRA SPECIE DICHIARATO','MESCOLARE NON È REAGIRE; servono composizione e condizioni','Seleziona almeno due specie','Q DA MASSE VERIFICATO','Q RAPPRESENTATIVO; MASSE DEL CANALE INCOMPLETE','XYZ BLOCCATO: lo schema nucleare non sarà esportato come idrogeno','XYZ BLOCCATO: scala Å non calibrata'],
    de:['◌ MISCHEN','ILLUSTRATION DEAKTIVIERT','KEIN WEITERER KATALOGISIERTER ÜBERGANG','QUALITATIVE BEWEGUNG, KEINE MOLEKULARDYNAMIK','STRUKTUR AUSSERHALB DER ANWENDBAREN PHASE','PHYSIKALISCHES GEMISCH','KEINE PRODUKTFORMEL','KOEXISTIERENDE SPEZIES','KEINE BINDUNGEN ZWISCHEN SPEZIES BEHAUPTET','MISCHEN IST KEINE REAKTION; Phase braucht Zusammensetzung und Bedingungen','Mindestens zwei Spezies wählen','Q AUS MASSEN VERIFIZIERT','REPRÄSENTATIVES Q; KANALMASSEN UNVOLLSTÄNDIG','XYZ BLOCKIERT: Nukleonen werden nicht als Wasserstoff exportiert','XYZ BLOCKIERT: keine kalibrierte Å-Skala'],
    pt:['◌ MISTURAR','ILUSTRAÇÃO DESATIVADA','SEM OUTRA TRANSIÇÃO CATALOGADA','MOVIMENTO QUALITATIVO; NÃO É DINÂMICA MOLECULAR','ESTRUTURA FORA DA FASE APLICÁVEL','MISTURA FÍSICA','SEM FÓRMULA DE PRODUTO','ESPÉCIES COEXISTENTES','NÃO SE AFIRMAM LIGAÇÕES ENTRE ESPÉCIES','MISTURAR NÃO É REAGIR; a fase exige composição e condições','Selecione pelo menos duas espécies','Q DERIVADO DE MASSAS VERIFICADO','Q REPRESENTATIVO; MASSAS DO CANAL INCOMPLETAS','XYZ BLOQUEADO: o esquema nuclear não será exportado como hidrogênio','XYZ BLOQUEADO: escala Å não calibrada'],
    ko:['◌ 혼합','도해 비활성화','추가 등재 상전이 없음','정성적 운동이며 분자동역학이 아님','구조가 적용 가능한 상을 벗어남','물리 혼합물','생성물 화학식 없음','공존 종','종 사이 결합을 주장하지 않음','혼합은 반응이 아니며 상에는 조성과 조건이 필요함','두 종 이상 선택','질량 기반 Q 검증됨','대표 Q; 경로 질량 불완전','XYZ 차단: 핵자를 수소로 내보내지 않음','XYZ 차단: 보정된 Å 척도 없음'],
    ar:['خلط ◌','تم تعطيل الرسم التوضيحي','لا انتقال مفهرس لاحق','حركة نوعية وليست ديناميكا جزيئية','البنية خارج الطور القابل للتطبيق','خليط فيزيائي','لا صيغة لناتج','أنواع متعايشة','لا ادعاء بروابط بين الأنواع','الخلط ليس تفاعلاً؛ الطور يحتاج تركيباً وشروطاً','اختر نوعين على الأقل','تم التحقق من Q بواسطة الكتل','Q تمثيلي؛ كتل المسار غير مكتملة','حُظر XYZ: لن تُصدّر النيوكليونات كهيدروجين','حُظر XYZ: لا يوجد مقياس Å معاير']
  };
  const dynamicKeys=['transitionMelting','transitionBoiling','transitionSublimation','solidMotionModel','liquidMotionModel','gasMotionModel','nuclearThermalOutsideModel'];
  const dynamicValues={
    es:['FUSIÓN','EBULLICIÓN','SUBLIMACIÓN','VIBRACIÓN RETICULAR ILUSTRATIVA','MODELO DE MOVIMIENTO COHESIVO','MODELO CINÉTICO CONFINADO','N/A · E_cm / PLASMA FUERA DEL MODELO 0–5000 K'],
    en:['MELTING','BOILING','SUBLIMATION','ILLUSTRATIVE LATTICE VIBRATION','COHESIVE MOTION MODEL','CONFINED KINETIC MODEL','N/A · E_cm / PLASMA OUTSIDE THE 0–5000 K MODEL'],
    ja:['融解','沸騰','昇華','格子振動の模式図','凝集運動モデル','閉じ込め運動論モデル','N/A · E_cm / プラズマは0–5000 Kモデルの範囲外'],
    ru:['ПЛАВЛЕНИЕ','КИПЕНИЕ','СУБЛИМАЦИЯ','ИЛЛЮСТРАТИВНАЯ ВИБРАЦИЯ РЕШЁТКИ','МОДЕЛЬ КОГЕЗИОННОГО ДВИЖЕНИЯ','ОГРАНИЧЕННАЯ КИНЕТИЧЕСКАЯ МОДЕЛЬ','N/A · E_cm / ПЛАЗМА ВНЕ МОДЕЛИ 0–5000 K'],
    zh:['熔化','沸腾','升华','示意晶格振动','内聚运动模型','受限动力学模型','N/A · E_cm / 等离子体超出0–5000 K模型'],
    fr:['FUSION','ÉBULLITION','SUBLIMATION','VIBRATION RÉTICULAIRE ILLUSTRATIVE','MODÈLE DE MOUVEMENT COHÉSIF','MODÈLE CINÉTIQUE CONFINÉ','N/A · E_cm / PLASMA HORS DU MODÈLE 0–5000 K'],
    it:['FUSIONE','EBOLLIZIONE','SUBLIMAZIONE','VIBRAZIONE RETICOLARE ILLUSTRATIVA','MODELLO DI MOTO COESIVO','MODELLO CINETICO CONFINATO','N/A · E_cm / PLASMA FUORI DAL MODELLO 0–5000 K'],
    de:['SCHMELZEN','SIEDEN','SUBLIMATION','ILLUSTRATIVE GITTERSCHWINGUNG','KOHÄSIVES BEWEGUNGSMODELL','BEGRENZTES KINETISCHES MODELL','N/A · E_cm / PLASMA AUSSERHALB DES 0–5000-K-MODELLS'],
    pt:['FUSÃO','EBULIÇÃO','SUBLIMAÇÃO','VIBRAÇÃO RETICULAR ILUSTRATIVA','MODELO DE MOVIMENTO COESIVO','MODELO CINÉTICO CONFINADO','N/A · E_cm / PLASMA FORA DO MODELO 0–5000 K'],
    ko:['융해','끓음','승화','격자 진동 도해','응집 운동 모델','제한된 운동론 모델','N/A · E_cm / 플라즈마는 0–5000 K 모델 범위 밖'],
    ar:['الانصهار','الغليان','التسامي','اهتزاز شبكي توضيحي','نموذج حركة متماسكة','نموذج حركي محصور','N/A · E_cm / البلازما خارج نموذج 0–5000 K']
  };
  const criticalKeys=['schematicDnaNote','phaseBoundary','fusionRouteMismatch','fissionRouteMismatch','geometricAngle','exportNuclearBlocked','exportScaleBlocked'];
  const criticalValues={
    es:['Esquema didáctico B-DNA · motivo repetitivo de pares de bases · no es una secuencia TP53 · escala no calibrada.','LÍMITE DE FASE (CONVENCIÓN DE UMBRAL)','El canal seleccionado pertenece a FISIÓN; elige un canal de FUSIÓN o AUTO.','El canal seleccionado pertenece a FUSIÓN; elige un canal de FISIÓN o AUTO.','Ángulo geométrico','EXPORTACIÓN BLOQUEADA: un esquema de nucleones no es una geometría química.','EXPORTACIÓN BLOQUEADA: la geometría no tiene una escala calibrada.'],
    en:['B-DNA teaching schema · repeating base-pair motif · not a TP53 sequence · scale not calibrated.','PHASE BOUNDARY (THRESHOLD CONVENTION)','The selected route belongs to FISSION; choose a FUSION route or AUTO.','The selected route belongs to FUSION; choose a FISSION route or AUTO.','Geometric angle','EXPORT BLOCKED: a nucleon schema is not chemical geometry.','EXPORT BLOCKED: geometry has no calibrated scale.'],
    ja:['B-DNA教材スキーマ・反復塩基対モチーフ・TP53配列ではない・尺度未校正。','相境界（しきい値規約）','選択経路は核分裂です。核融合経路またはAUTOを選択してください。','選択経路は核融合です。核分裂経路またはAUTOを選択してください。','幾何学的角度','出力停止：核子スキーマは化学構造ではありません。','出力停止：幾何の尺度が校正されていません。'],
    ru:['Учебная схема B-ДНК · повторяющийся мотив пар оснований · не последовательность TP53 · шкала не калибрована.','ГРАНИЦА ФАЗ (ПОРОГОВАЯ КОНВЕНЦИЯ)','Выбран канал ДЕЛЕНИЯ; выберите канал СИНТЕЗА или AUTO.','Выбран канал СИНТЕЗА; выберите канал ДЕЛЕНИЯ или AUTO.','Геометрический угол','ЭКСПОРТ ЗАБЛОКИРОВАН: схема нуклонов не является химической геометрией.','ЭКСПОРТ ЗАБЛОКИРОВАН: шкала геометрии не калибрована.'],
    zh:['B-DNA教学示意图 · 重复碱基对基元 · 非TP53序列 · 尺度未校准。','相边界（阈值约定）','所选通道属于裂变；请选择聚变通道或AUTO。','所选通道属于聚变；请选择裂变通道或AUTO。','几何角','已阻止导出：核子示意图不是化学几何。','已阻止导出：几何尺度未校准。'],
    fr:['Schéma pédagogique B-ADN · motif répétitif de paires de bases · pas une séquence TP53 · échelle non calibrée.','LIMITE DE PHASE (CONVENTION DE SEUIL)','Le canal choisi appartient à la FISSION; choisissez une FUSION ou AUTO.','Le canal choisi appartient à la FUSION; choisissez une FISSION ou AUTO.','Angle géométrique','EXPORT BLOQUÉ : un schéma de nucléons n’est pas une géométrie chimique.','EXPORT BLOQUÉ : la géométrie n’a pas d’échelle calibrée.'],
    it:['Schema didattico B-DNA · motivo ripetuto di coppie di basi · non è una sequenza TP53 · scala non calibrata.','LIMITE DI FASE (CONVENZIONE DI SOGLIA)','Il canale selezionato è di FISSIONE; scegli FUSIONE o AUTO.','Il canale selezionato è di FUSIONE; scegli FISSIONE o AUTO.','Angolo geometrico','ESPORTAZIONE BLOCCATA: uno schema di nucleoni non è geometria chimica.','ESPORTAZIONE BLOCCATA: la geometria non ha una scala calibrata.'],
    de:['B-DNA-Lehrschema · wiederholtes Basenpaarmotiv · keine TP53-Sequenz · Maßstab nicht kalibriert.','PHASENGRENZE (SCHWELLENKONVENTION)','Der gewählte Kanal gehört zur SPALTUNG; FUSION oder AUTO wählen.','Der gewählte Kanal gehört zur FUSION; SPALTUNG oder AUTO wählen.','Geometrischer Winkel','EXPORT BLOCKIERT: Ein Nukleonenschema ist keine chemische Geometrie.','EXPORT BLOCKIERT: Die Geometrie hat keinen kalibrierten Maßstab.'],
    pt:['Esquema didático B-DNA · motivo repetido de pares de bases · não é sequência TP53 · escala não calibrada.','LIMITE DE FASE (CONVENÇÃO DE LIMIAR)','O canal selecionado pertence à FISSÃO; escolha FUSÃO ou AUTO.','O canal selecionado pertence à FUSÃO; escolha FISSÃO ou AUTO.','Ângulo geométrico','EXPORTAÇÃO BLOQUEADA: um esquema de núcleons não é geometria química.','EXPORTAÇÃO BLOQUEADA: a geometria não tem escala calibrada.'],
    ko:['B-DNA 교육 도식 · 반복 염기쌍 모티프 · TP53 서열 아님 · 척도 미보정.','상 경계(임계값 규약)','선택 경로는 핵분열입니다. 핵융합 경로 또는 AUTO를 선택하세요.','선택 경로는 핵융합입니다. 핵분열 경로 또는 AUTO를 선택하세요.','기하학적 각도','내보내기 차단: 핵자 도식은 화학 기하가 아닙니다.','내보내기 차단: 기하 척도가 보정되지 않았습니다.'],
    ar:['مخطط تعليمي لـ B-DNA · نمط أزواج قاعدية متكرر · ليس تسلسل TP53 · المقياس غير معاير.','حد الطور (اصطلاح العتبة)','المسار المحدد انشطار؛ اختر مسار اندماج أو AUTO.','المسار المحدد اندماج؛ اختر مسار انشطار أو AUTO.','زاوية هندسية','حُظر التصدير: مخطط النيوكليونات ليس هندسة كيميائية.','حُظر التصدير: لا يوجد مقياس معاير للهندسة.']
  };
  const accessibilityKeys=['nuclearReactionsLabel','nuclearRouteLabel','nuclearAutoRoute','fusionGroup','fissionGroup','sceneLabel','experienceLevelLabel','scientificTelemetryLabel'];
  const accessibilityValues={
    es:['Reacciones nucleares','Canal isotópico nuclear','CANAL: AUTO / BANDEJA','FUSIÓN','FISIÓN','Escena científica tridimensional interactiva','Nivel de experiencia','Telemetría científica'],
    en:['Nuclear reactions','Nuclear isotope route','ROUTE: AUTO / TRAY','FUSION','FISSION','Interactive three-dimensional scientific scene','Experience level','Scientific telemetry'],
    ja:['核反応','核同位体経路','経路：AUTO／トレイ','核融合','核分裂','対話型3次元科学シーン','体験レベル','科学テレメトリ'],
    ru:['Ядерные реакции','Канал изотопной реакции','КАНАЛ: AUTO / ЛОТОК','СИНТЕЗ','ДЕЛЕНИЕ','Интерактивная трёхмерная научная сцена','Уровень опыта','Научная телеметрия'],
    zh:['核反应','核同位素通道','通道：AUTO／托盘','聚变','裂变','交互式三维科学场景','体验级别','科学遥测'],
    fr:['Réactions nucléaires','Canal isotopique nucléaire','CANAL : AUTO / PLATEAU','FUSION','FISSION','Scène scientifique tridimensionnelle interactive','Niveau d’expérience','Télémétrie scientifique'],
    it:['Reazioni nucleari','Canale isotopico nucleare','CANALE: AUTO / VASSOIO','FUSIONE','FISSIONE','Scena scientifica tridimensionale interattiva','Livello di esperienza','Telemetria scientifica'],
    de:['Kernreaktionen','Nuklearer Isotopenkanal','KANAL: AUTO / ABLAGE','FUSION','SPALTUNG','Interaktive dreidimensionale Wissenschaftsszene','Erfahrungsstufe','Wissenschaftliche Telemetrie'],
    pt:['Reações nucleares','Canal isotópico nuclear','CANAL: AUTO / BANDEJA','FUSÃO','FISSÃO','Cena científica tridimensional interativa','Nível de experiência','Telemetria científica'],
    ko:['핵반응','핵 동위원소 경로','경로: AUTO / 트레이','핵융합','핵분열','대화형 3차원 과학 장면','경험 수준','과학 텔레메트리'],
    ar:['التفاعلات النووية','مسار النظائر النووية','المسار: AUTO / الصينية','الاندماج','الانشطار','مشهد علمي تفاعلي ثلاثي الأبعاد','مستوى الخبرة','القياس العلمي']
  };
  const controlKeys=['languageLabel','temperatureControlLabel','materialsBarLabel','closeSuggestionsLabel','closeDocsLabel','closeQuizLabel','elementAria','measurementSceneLabel'];
  const controlValues={
    es:['Idioma','Temperatura de la estructura en kelvin','Barra de materiales','Cerrar sugerencias','Cerrar documentación','Cerrar cuestionario','{name}, {symbol}, número atómico {z}','Modo de medición 3D. Pulsa Intro o Espacio para seleccionar el siguiente átomo.'],
    en:['Language','Structure temperature in kelvin','Materials bar','Close suggestions','Close documentation','Close quiz','{name}, {symbol}, atomic number {z}','3D measurement mode. Press Enter or Space to select the next atom.'],
    ja:['言語','構造温度（ケルビン）','材料バー','候補を閉じる','文書を閉じる','クイズを閉じる','{name}、{symbol}、原子番号 {z}','3D測定モード。EnterまたはSpaceで次の原子を選択します。'],
    ru:['Язык','Температура структуры в кельвинах','Панель материалов','Закрыть предложения','Закрыть документацию','Закрыть тест','{name}, {symbol}, атомный номер {z}','Режим измерения 3D. Нажмите Enter или пробел, чтобы выбрать следующий атом.'],
    zh:['语言','结构温度（开尔文）','材料栏','关闭建议','关闭文档','关闭测验','{name}，{symbol}，原子序数 {z}','三维测量模式。按回车键或空格键选择下一个原子。'],
    fr:['Langue','Température de la structure en kelvins','Barre des matériaux','Fermer les suggestions','Fermer la documentation','Fermer le quiz','{name}, {symbol}, numéro atomique {z}','Mode de mesure 3D. Appuyez sur Entrée ou Espace pour sélectionner l’atome suivant.'],
    it:['Lingua','Temperatura della struttura in kelvin','Barra dei materiali','Chiudi suggerimenti','Chiudi documentazione','Chiudi quiz','{name}, {symbol}, numero atomico {z}','Modalità di misura 3D. Premi Invio o Spazio per selezionare l’atomo successivo.'],
    de:['Sprache','Strukturtemperatur in Kelvin','Materialleiste','Vorschläge schließen','Dokumentation schließen','Quiz schließen','{name}, {symbol}, Ordnungszahl {z}','3D-Messmodus. Drücken Sie Eingabe oder Leertaste, um das nächste Atom auszuwählen.'],
    pt:['Idioma','Temperatura da estrutura em kelvin','Barra de materiais','Fechar sugestões','Fechar documentação','Fechar quiz','{name}, {symbol}, número atômico {z}','Modo de medição 3D. Pressione Enter ou Espaço para selecionar o próximo átomo.'],
    ko:['언어','구조 온도(켈빈)','재료 표시줄','제안 닫기','문서 닫기','퀴즈 닫기','{name}, {symbol}, 원자 번호 {z}','3D 측정 모드입니다. Enter 또는 Space를 눌러 다음 원자를 선택하세요.'],
    ar:['اللغة','درجة حرارة البنية بالكلفن','شريط المواد','إغلاق الاقتراحات','إغلاق التوثيق','إغلاق الاختبار','{name}، {symbol}، العدد الذري {z}','وضع القياس ثلاثي الأبعاد. اضغط Enter أو Space لاختيار الذرة التالية.']
  };
  for(const [locale,row] of Object.entries(values)){
    if(row.length!==keys.length)throw new Error(`Experience science label mismatch for ${locale}`);
    Object.assign(i18n.messages[locale],Object.fromEntries(keys.map((key,index)=>[key,row[index]])));
  }
  for(const [locale,row] of Object.entries(dynamicValues)){
    if(row.length!==dynamicKeys.length)throw new Error(`Dynamic science label mismatch for ${locale}`);
    Object.assign(i18n.messages[locale],Object.fromEntries(dynamicKeys.map((key,index)=>[key,row[index]])));
  }
  for(const [locale,row] of Object.entries(criticalValues)){
    if(row.length!==criticalKeys.length)throw new Error(`Critical science label mismatch for ${locale}`);
    Object.assign(i18n.messages[locale],Object.fromEntries(criticalKeys.map((key,index)=>[key,row[index]])));
  }
  for(const [locale,row] of Object.entries(accessibilityValues)){
    if(row.length!==accessibilityKeys.length)throw new Error(`Accessibility label mismatch for ${locale}`);
    Object.assign(i18n.messages[locale],Object.fromEntries(accessibilityKeys.map((key,index)=>[key,row[index]])));
  }
  for(const [locale,row] of Object.entries(controlValues)){
    if(row.length!==controlKeys.length)throw new Error(`Control label mismatch for ${locale}`);
    Object.assign(i18n.messages[locale],Object.fromEntries(controlKeys.map((key,index)=>[key,row[index]])));
  }
  root.NULLA_EXPERIENCE_SCIENCE_KEYS=Object.freeze([...keys,...dynamicKeys,...criticalKeys,...accessibilityKeys,...controlKeys]);
})(globalThis);
