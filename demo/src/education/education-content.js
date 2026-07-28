(function initEducationContent(root) {
  'use strict';
  const targets = ['pt-hud-panel','nuclear-mode-bar','molecular-hud'];
  const content = {
    es:{ui:{docs:'📖 GUÍA TÉCNICA Y DOCUMENTACIÓN IUPAC 3D',quiz:'🎓 MODO EDUCATIVO // QUIZ QUÍMICO',suggest:'💡 SUGERENCIAS VERIFICADAS',skip:'✕ OMITIR',next:'SIGUIENTE ➔',done:'¡ENTENDIDO! ✓',step:'PASO {n} / 3'},tutorial:[
      ['🚀 PASO 1/3: SELECCIÓN EN LA TABLA PERIÓDICA','Selecciona dos elementos de la tabla y colócalos en la bandeja de síntesis.'],
      ['🧪 PASO 2/3: QUÍMICA O REACCIÓN NUCLEAR','Usa COMBINAR para química catalogada, FUSIÓN NUCLEAR para núcleos ligeros o FISIÓN NUCLEAR para núcleos pesados.'],
      ['🔬 PASO 3/3: TELEMETRÍA Y MEDICIÓN','Revisa evidencia, compatibilidad y condiciones; ajusta la temperatura o usa MEDIR 3D para distancias y ángulos.']
    ],docs:[
      ['1. FASES Y TEMPERATURA','El perfil térmico de cada estructura determina sólido, líquido o gas. Las animaciones son modelos educativos y muestran sus condiciones.'],
      ['2. MEDICIÓN 3D','Dos átomos producen distancia en Å y pm; tres átomos producen un ángulo geométrico en grados.'],
      ['3. QUÍMICA, FUSIÓN Y FISIÓN','COMBINAR sólo forma productos catalogados. Fusión y fisión usan canales isotópicos separados y conservan A y Z.'],
      ['4. EVIDENCIA Y EXPORTACIÓN','Compatibilidad no significa reacción garantizada: consulta temperatura, presión, cinética e inestabilidad. Puedes grabar, compartir o exportar XYZ.']
    ]},
    en:{ui:{docs:'📖 IUPAC 3D TECHNICAL GUIDE',quiz:'🎓 EDUCATION MODE // CHEMISTRY QUIZ',suggest:'💡 VERIFIED SUGGESTIONS',skip:'✕ SKIP',next:'NEXT ➔',done:'GOT IT! ✓',step:'STEP {n} / 3'},tutorial:[
      ['🚀 STEP 1/3: PERIODIC TABLE SELECTION','Select two elements from the table and place them in the synthesis tray.'],
      ['🧪 STEP 2/3: CHEMISTRY OR NUCLEAR REACTION','Use COMBINE for catalogued chemistry, NUCLEAR FUSION for light nuclei, or NUCLEAR FISSION for heavy nuclei.'],
      ['🔬 STEP 3/3: TELEMETRY AND MEASUREMENT','Review evidence, compatibility, and conditions; adjust temperature or use MEASURE 3D for distances and angles.']
    ],docs:[
      ['1. PHASES AND TEMPERATURE','Each structure has a thermal profile that determines solid, liquid, or gas. Animations are educational models and display their conditions.'],
      ['2. 3D MEASUREMENT','Two atoms yield distance in Å and pm; three atoms yield a geometric angle in degrees.'],
      ['3. CHEMISTRY, FUSION, AND FISSION','COMBINE only forms catalogued products. Fusion and fission use separate isotope channels that conserve A and Z.'],
      ['4. EVIDENCE AND EXPORT','Compatibility does not guarantee a reaction: inspect temperature, pressure, kinetics, and instability. You can record, share, or export XYZ.']
    ]},
    ja:{ui:{docs:'📖 IUPAC 3D 技術ガイド',quiz:'🎓 学習モード // 化学クイズ',suggest:'💡 検証済み候補',skip:'✕ スキップ',next:'次へ ➔',done:'理解しました ✓',step:'ステップ {n} / 3'},tutorial:[
      ['🚀 ステップ1/3：周期表で選択','周期表から2元素を選び、合成トレイに置きます。'],
      ['🧪 ステップ2/3：化学または核反応','確認済み化学には結合、軽い核には核融合、重い核には核分裂を使用します。'],
      ['🔬 ステップ3/3：計測と測定','根拠、適合性、条件を確認し、温度または3D測定で距離と角度を調べます。']
    ],docs:[
      ['1. 相と温度','各構造の熱プロファイルが固体・液体・気体を決めます。アニメーションは条件を示す教育モデルです。'],
      ['2. 3D測定','2原子でÅとpmの距離、3原子で度単位の幾何角を測定します。'],
      ['3. 化学・核融合・核分裂','化学結合は登録製品だけを生成します。核融合と核分裂は別の同位体経路でAとZを保存します。'],
      ['4. 根拠と書き出し','適合性は反応保証ではありません。温度、圧力、速度論、不安定性を確認し、録画・共有・XYZ出力ができます。']
    ]},
    ru:{ui:{docs:'📖 ТЕХНИЧЕСКОЕ РУКОВОДСТВО IUPAC 3D',quiz:'🎓 УЧЕБНЫЙ РЕЖИМ // ХИМИЧЕСКИЙ ТЕСТ',suggest:'💡 ПРОВЕРЕННЫЕ ВАРИАНТЫ',skip:'✕ ПРОПУСТИТЬ',next:'ДАЛЕЕ ➔',done:'ПОНЯТНО ✓',step:'ШАГ {n} / 3'},tutorial:[
      ['🚀 ШАГ 1/3: ВЫБОР В ТАБЛИЦЕ','Выберите два элемента и поместите их в лоток синтеза.'],
      ['🧪 ШАГ 2/3: ХИМИЯ ИЛИ ЯДЕРНАЯ РЕАКЦИЯ','Для каталогизированной химии используйте объединение, для лёгких ядер — синтез, для тяжёлых — деление.'],
      ['🔬 ШАГ 3/3: ТЕЛЕМЕТРИЯ И ИЗМЕРЕНИЕ','Проверьте данные, совместимость и условия; меняйте температуру или измеряйте расстояния и углы в 3D.']
    ],docs:[
      ['1. ФАЗЫ И ТЕМПЕРАТУРА','Тепловой профиль структуры определяет твёрдую, жидкую или газовую фазу. Анимации являются учебными моделями.'],
      ['2. ИЗМЕРЕНИЕ 3D','Два атома дают расстояние в Å и пм; три атома — геометрический угол в градусах.'],
      ['3. ХИМИЯ, СИНТЕЗ И ДЕЛЕНИЕ','Химическое объединение создаёт только каталогизированные продукты. Ядерные каналы разделены и сохраняют A и Z.'],
      ['4. ДАННЫЕ И ЭКСПОРТ','Совместимость не гарантирует реакцию: учитывайте температуру, давление, кинетику и нестабильность. Доступны запись, ссылка и XYZ.']
    ]},
    zh:{ui:{docs:'📖 IUPAC 3D 技术指南',quiz:'🎓 教学模式 // 化学测验',suggest:'💡 已验证建议',skip:'✕ 跳过',next:'下一步 ➔',done:'明白了 ✓',step:'步骤 {n} / 3'},tutorial:[
      ['🚀 步骤1/3：周期表选择','从周期表选择两个元素并放入合成托盘。'],
      ['🧪 步骤2/3：化学或核反应','已收录化学使用组合；轻核使用核聚变；重核使用核裂变。'],
      ['🔬 步骤3/3：遥测与测量','检查证据、相容性和条件；调节温度或使用3D测量获取距离和角度。']
    ],docs:[
      ['1. 相态与温度','每种结构的热学配置决定固、液或气态。动画是会显示适用条件的教学模型。'],
      ['2. 3D测量','两个原子给出Å和pm距离；三个原子给出以度表示的几何角。'],
      ['3. 化学、聚变与裂变','化学组合只形成已收录产物。聚变和裂变使用独立同位素通道并守恒A与Z。'],
      ['4. 证据与导出','相容并不保证反应；请检查温度、压力、动力学和不稳定性。支持录制、分享和XYZ导出。']
    ]},
    fr:{ui:{docs:'📖 GUIDE TECHNIQUE IUPAC 3D',quiz:'🎓 MODE ÉDUCATIF // QUIZ CHIMIQUE',suggest:'💡 SUGGESTIONS VÉRIFIÉES',skip:'✕ PASSER',next:'SUIVANT ➔',done:'COMPRIS ✓',step:'ÉTAPE {n} / 3'},tutorial:[
      ['🚀 ÉTAPE 1/3 : SÉLECTION PÉRIODIQUE','Sélectionnez deux éléments du tableau et placez-les dans le plateau de synthèse.'],
      ['🧪 ÉTAPE 2/3 : CHIMIE OU RÉACTION NUCLÉAIRE','Utilisez COMBINER pour la chimie cataloguée, la fusion pour les noyaux légers et la fission pour les noyaux lourds.'],
      ['🔬 ÉTAPE 3/3 : TÉLÉMÉTRIE ET MESURE','Consultez preuves, compatibilité et conditions ; réglez la température ou mesurez distances et angles en 3D.']
    ],docs:[
      ['1. PHASES ET TEMPÉRATURE','Le profil thermique de chaque structure détermine solide, liquide ou gaz. Les animations sont des modèles pédagogiques conditionnels.'],
      ['2. MESURE 3D','Deux atomes donnent une distance en Å et pm ; trois atomes donnent un angle géométrique en degrés.'],
      ['3. CHIMIE, FUSION ET FISSION','COMBINER ne forme que des produits catalogués. Fusion et fission utilisent des voies isotopiques séparées conservant A et Z.'],
      ['4. PREUVES ET EXPORT','La compatibilité ne garantit pas une réaction : vérifiez température, pression, cinétique et instabilité. Enregistrement, partage et XYZ sont disponibles.']
    ]},
    it:{ui:{docs:'📖 GUIDA TECNICA IUPAC 3D',quiz:'🎓 MODALITÀ DIDATTICA // QUIZ CHIMICO',suggest:'💡 SUGGERIMENTI VERIFICATI',skip:'✕ SALTA',next:'AVANTI ➔',done:'CAPITO ✓',step:'PASSO {n} / 3'},tutorial:[
      ['🚀 PASSO 1/3: SELEZIONE PERIODICA','Seleziona due elementi dalla tavola e inseriscili nel vassoio di sintesi.'],
      ['🧪 PASSO 2/3: CHIMICA O REAZIONE NUCLEARE','Usa COMBINA per la chimica catalogata, la fusione per nuclei leggeri e la fissione per nuclei pesanti.'],
      ['🔬 PASSO 3/3: TELEMETRIA E MISURA','Controlla evidenze, compatibilità e condizioni; regola la temperatura o misura distanze e angoli in 3D.']
    ],docs:[
      ['1. FASI E TEMPERATURA','Il profilo termico di ogni struttura determina solido, liquido o gas. Le animazioni sono modelli didattici condizionati.'],
      ['2. MISURA 3D','Due atomi forniscono la distanza in Å e pm; tre atomi un angolo geometrico in gradi.'],
      ['3. CHIMICA, FUSIONE E FISSIONE','COMBINA forma solo prodotti catalogati. Fusione e fissione usano canali isotopici separati che conservano A e Z.'],
      ['4. EVIDENZE ED ESPORTAZIONE','La compatibilità non garantisce la reazione: considera temperatura, pressione, cinetica e instabilità. Puoi registrare, condividere o esportare XYZ.']
    ]},
    de:{ui:{docs:'📖 TECHNISCHER IUPAC-3D-LEITFADEN',quiz:'🎓 LERNMODUS // CHEMIEQUIZ',suggest:'💡 GEPRÜFTE VORSCHLÄGE',skip:'✕ ÜBERSPRINGEN',next:'WEITER ➔',done:'VERSTANDEN ✓',step:'SCHRITT {n} / 3'},tutorial:[
      ['🚀 SCHRITT 1/3: PERIODENSYSTEM','Wähle zwei Elemente aus und lege sie in die Syntheseablage.'],
      ['🧪 SCHRITT 2/3: CHEMIE ODER KERNREAKTION','Nutze KOMBINIEREN für katalogisierte Chemie, Kernfusion für leichte und Kernspaltung für schwere Kerne.'],
      ['🔬 SCHRITT 3/3: TELEMETRIE UND MESSUNG','Prüfe Evidenz, Kompatibilität und Bedingungen; ändere die Temperatur oder miss Abstände und Winkel in 3D.']
    ],docs:[
      ['1. PHASEN UND TEMPERATUR','Das Wärmeprofil jeder Struktur bestimmt fest, flüssig oder gasförmig. Animationen sind bedingte Lernmodelle.'],
      ['2. 3D-MESSUNG','Zwei Atome ergeben einen Abstand in Å und pm; drei Atome einen geometrischen Winkel in Grad.'],
      ['3. CHEMIE, FUSION UND SPALTUNG','KOMBINIEREN erzeugt nur katalogisierte Produkte. Fusion und Spaltung nutzen getrennte Isotopenkanäle mit Erhaltung von A und Z.'],
      ['4. EVIDENZ UND EXPORT','Kompatibilität garantiert keine Reaktion: Temperatur, Druck, Kinetik und Instabilität sind zu prüfen. Aufnahme, Teilen und XYZ sind verfügbar.']
    ]},
    pt:{ui:{docs:'📖 GUIA TÉCNICO IUPAC 3D',quiz:'🎓 MODO EDUCATIVO // QUIZ DE QUÍMICA',suggest:'💡 SUGESTÕES VERIFICADAS',skip:'✕ PULAR',next:'PRÓXIMO ➔',done:'ENTENDIDO ✓',step:'PASSO {n} / 3'},tutorial:[
      ['🚀 PASSO 1/3: SELEÇÃO PERIÓDICA','Selecione dois elementos da tabela e coloque-os na bandeja de síntese.'],
      ['🧪 PASSO 2/3: QUÍMICA OU REAÇÃO NUCLEAR','Use COMBINAR para química catalogada, fusão para núcleos leves e fissão para núcleos pesados.'],
      ['🔬 PASSO 3/3: TELEMETRIA E MEDIÇÃO','Revise evidências, compatibilidade e condições; ajuste a temperatura ou meça distâncias e ângulos em 3D.']
    ],docs:[
      ['1. FASES E TEMPERATURA','O perfil térmico de cada estrutura determina sólido, líquido ou gás. As animações são modelos educativos condicionais.'],
      ['2. MEDIÇÃO 3D','Dois átomos fornecem distância em Å e pm; três átomos fornecem um ângulo geométrico em graus.'],
      ['3. QUÍMICA, FUSÃO E FISSÃO','COMBINAR forma apenas produtos catalogados. Fusão e fissão usam canais isotópicos separados que conservam A e Z.'],
      ['4. EVIDÊNCIA E EXPORTAÇÃO','Compatibilidade não garante reação: verifique temperatura, pressão, cinética e instabilidade. É possível gravar, compartilhar ou exportar XYZ.']
    ]},
    ko:{ui:{docs:'📖 IUPAC 3D 기술 안내서',quiz:'🎓 교육 모드 // 화학 퀴즈',suggest:'💡 검증된 제안',skip:'✕ 건너뛰기',next:'다음 ➔',done:'이해했습니다 ✓',step:'단계 {n} / 3'},tutorial:[
      ['🚀 1/3단계: 주기율표 선택','주기율표에서 원소 두 개를 선택해 합성 트레이에 놓으세요.'],
      ['🧪 2/3단계: 화학 또는 핵반응','목록화된 화학은 결합, 가벼운 핵은 핵융합, 무거운 핵은 핵분열을 사용하세요.'],
      ['🔬 3/3단계: 텔레메트리와 측정','근거, 호환성, 조건을 확인하고 온도를 조절하거나 3D로 거리와 각도를 측정하세요.']
    ],docs:[
      ['1. 상과 온도','각 구조의 열 프로필이 고체, 액체, 기체를 결정합니다. 애니메이션은 조건을 표시하는 교육 모델입니다.'],
      ['2. 3D 측정','원자 두 개는 Å와 pm 거리, 세 개는 도 단위 기하학적 각도를 제공합니다.'],
      ['3. 화학, 핵융합, 핵분열','화학 결합은 목록화된 생성물만 만듭니다. 핵융합과 핵분열은 분리된 동위원소 경로에서 A와 Z를 보존합니다.'],
      ['4. 근거와 내보내기','호환성은 반응을 보장하지 않습니다. 온도, 압력, 동역학, 불안정성을 확인하고 녹화·공유·XYZ 출력이 가능합니다.']
    ]},
    ar:{ui:{docs:'📖 الدليل التقني IUPAC ثلاثي الأبعاد',quiz:'🎓 الوضع التعليمي // اختبار الكيمياء',suggest:'💡 اقتراحات موثقة',skip:'✕ تخطي',next:'التالي ➔',done:'فهمت ✓',step:'الخطوة {n} / 3'},tutorial:[
      ['🚀 الخطوة 1/3: اختيار الجدول الدوري','اختر عنصرين من الجدول وضعهما في صينية التخليق.'],
      ['🧪 الخطوة 2/3: كيمياء أو تفاعل نووي','استخدم الدمج للكيمياء المفهرسة، والاندماج للنوى الخفيفة، والانشطار للنوى الثقيلة.'],
      ['🔬 الخطوة 3/3: القياس والرصد','راجع الدليل والتوافق والشروط؛ اضبط الحرارة أو استخدم القياس ثلاثي الأبعاد للمسافات والزوايا.']
    ],docs:[
      ['1. الأطوار والحرارة','يحدد الملف الحراري لكل بنية الحالة الصلبة أو السائلة أو الغازية. الرسوم نماذج تعليمية تعرض شروطها.'],
      ['2. القياس ثلاثي الأبعاد','تعطي ذرتان مسافة بوحدتي Å وpm، وتعطي ثلاث ذرات زاوية هندسية بالدرجات.'],
      ['3. الكيمياء والاندماج والانشطار','الدمج الكيميائي ينتج مواد مفهرسة فقط. للاندماج والانشطار قنوات نظيرية منفصلة تحفظ A وZ.'],
      ['4. الدليل والتصدير','التوافق لا يضمن التفاعل؛ راجع الحرارة والضغط والحركية وعدم الاستقرار. تتوفر التسجيل والمشاركة وتصدير XYZ.']
    ]}
  };
  const normalize = locale => root.NULLA_I18N?.normalize(locale) || 'es';
  const get = locale => {
    const value = content[normalize(locale)] || content.es;
    return {
      ui:value.ui,
      tutorial:value.tutorial.map((step,index)=>({step:index+1,title:step[0],instruction:step[1],targetId:targets[index]})),
      docs:value.docs
    };
  };
  root.NULLA_EDUCATION = Object.freeze({locales:Object.freeze(Object.keys(content)),get});
})(globalThis);
