(function initI18n(root) {
  'use strict';
  const languages = {
    es:{name:'Español',dir:'ltr'}, en:{name:'English',dir:'ltr'}, ja:{name:'日本語',dir:'ltr'},
    ru:{name:'Русский',dir:'ltr'}, zh:{name:'中文',dir:'ltr'}, fr:{name:'Français',dir:'ltr'},
    it:{name:'Italiano',dir:'ltr'}, de:{name:'Deutsch',dir:'ltr'}, pt:{name:'Português',dir:'ltr'},
    ko:{name:'한국어',dir:'ltr'}, ar:{name:'العربية',dir:'rtl'}
  };
  const messages = {
    es:{title:'NULLA-LABS // SÍNTESIS IUPAC 3D',tutorial:'🚀 TUTORIAL',docs:'📖 DOCUMENTACIÓN',quiz:'🎓 QUIZ EDUCATIVO',share:'🔗 COMPARTIR',telemetry:'◆ TELEMETRÍA MOLECULAR',dna:'🧬 ADN',orbitals:'⚛️ ORBITALES',measure:'📏 MEDIR 3D',materials:'◆ LABORATORIO DE MATERIALES',record:'🎥 GRABAR HD',controller:'CONTROLADOR DE SÍNTESIS',tray:'BANDEJA:',combine:'🧪 COMBINAR',suggest:'💡 SUGERIR',random:'🔀 ALEATORIO',undo:'↩ DESHACER',clear:'✕ LIMPIAR',fusion:'☀ FUSIÓN NUCLEAR',fission:'☢ FISIÓN NUCLEAR'},
    en:{title:'NULLA-LABS // IUPAC 3D SYNTHESIS',tutorial:'🚀 TUTORIAL',docs:'📖 DOCUMENTATION',quiz:'🎓 EDUCATIONAL QUIZ',share:'🔗 SHARE',telemetry:'◆ MOLECULAR TELEMETRY',dna:'🧬 DNA',orbitals:'⚛️ ORBITALS',measure:'📏 MEASURE 3D',materials:'◆ MATERIALS LAB',record:'🎥 RECORD HD',controller:'SYNTHESIS CONTROLLER',tray:'TRAY:',combine:'🧪 COMBINE',suggest:'💡 SUGGEST',random:'🔀 RANDOM',undo:'↩ UNDO',clear:'✕ CLEAR',fusion:'☀ NUCLEAR FUSION',fission:'☢ NUCLEAR FISSION'},
    ja:{title:'NULLA-LABS // IUPAC 3D 合成',tutorial:'🚀 チュートリアル',docs:'📖 ドキュメント',quiz:'🎓 学習クイズ',share:'🔗 共有',telemetry:'◆ 分子テレメトリ',dna:'🧬 DNA',orbitals:'⚛️ 軌道',measure:'📏 3D測定',materials:'◆ 材料ラボ',record:'🎥 HD録画',controller:'合成コントローラー',tray:'トレイ:',combine:'🧪 化学結合',suggest:'💡 提案',random:'🔀 ランダム',undo:'↩ 元に戻す',clear:'✕ クリア',fusion:'☀ 核融合',fission:'☢ 核分裂'},
    ru:{title:'NULLA-LABS // 3D-СИНТЕЗ IUPAC',tutorial:'🚀 ОБУЧЕНИЕ',docs:'📖 ДОКУМЕНТАЦИЯ',quiz:'🎓 УЧЕБНЫЙ ТЕСТ',share:'🔗 ПОДЕЛИТЬСЯ',telemetry:'◆ МОЛЕКУЛЯРНАЯ ТЕЛЕМЕТРИЯ',dna:'🧬 ДНК',orbitals:'⚛️ ОРБИТАЛИ',measure:'📏 ИЗМЕРИТЬ 3D',materials:'◆ ЛАБОРАТОРИЯ МАТЕРИАЛОВ',record:'🎥 ЗАПИСЬ HD',controller:'КОНТРОЛЛЕР СИНТЕЗА',tray:'ЛОТОК:',combine:'🧪 СОЕДИНИТЬ',suggest:'💡 ПРЕДЛОЖИТЬ',random:'🔀 СЛУЧАЙНО',undo:'↩ ОТМЕНА',clear:'✕ ОЧИСТИТЬ',fusion:'☀ ЯДЕРНЫЙ СИНТЕЗ',fission:'☢ ЯДЕРНОЕ ДЕЛЕНИЕ'},
    zh:{title:'NULLA-LABS // IUPAC 3D 合成',tutorial:'🚀 教程',docs:'📖 文档',quiz:'🎓 教育测验',share:'🔗 分享',telemetry:'◆ 分子遥测',dna:'🧬 DNA',orbitals:'⚛️ 轨道',measure:'📏 3D测量',materials:'◆ 材料实验室',record:'🎥 高清录制',controller:'合成控制器',tray:'托盘:',combine:'🧪 化学组合',suggest:'💡 建议',random:'🔀 随机',undo:'↩ 撤销',clear:'✕ 清除',fusion:'☀ 核聚变',fission:'☢ 核裂变'},
    fr:{title:'NULLA-LABS // SYNTHÈSE IUPAC 3D',tutorial:'🚀 TUTORIEL',docs:'📖 DOCUMENTATION',quiz:'🎓 QUIZ ÉDUCATIF',share:'🔗 PARTAGER',telemetry:'◆ TÉLÉMÉTRIE MOLÉCULAIRE',dna:'🧬 ADN',orbitals:'⚛️ ORBITALES',measure:'📏 MESURER 3D',materials:'◆ LABORATOIRE DES MATÉRIAUX',record:'🎥 ENREGISTRER HD',controller:'CONTRÔLEUR DE SYNTHÈSE',tray:'PLATEAU :',combine:'🧪 COMBINER',suggest:'💡 SUGGÉRER',random:'🔀 ALÉATOIRE',undo:'↩ ANNULER',clear:'✕ EFFACER',fusion:'☀ FUSION NUCLÉAIRE',fission:'☢ FISSION NUCLÉAIRE'},
    it:{title:'NULLA-LABS // SINTESI IUPAC 3D',tutorial:'🚀 TUTORIAL',docs:'📖 DOCUMENTAZIONE',quiz:'🎓 QUIZ EDUCATIVO',share:'🔗 CONDIVIDI',telemetry:'◆ TELEMETRIA MOLECOLARE',dna:'🧬 DNA',orbitals:'⚛️ ORBITALI',measure:'📏 MISURA 3D',materials:'◆ LABORATORIO MATERIALI',record:'🎥 REGISTRA HD',controller:'CONTROLLO SINTESI',tray:'VASSOIO:',combine:'🧪 COMBINA',suggest:'💡 SUGGERISCI',random:'🔀 CASUALE',undo:'↩ ANNULLA',clear:'✕ PULISCI',fusion:'☀ FUSIONE NUCLEARE',fission:'☢ FISSIONE NUCLEARE'},
    de:{title:'NULLA-LABS // IUPAC-3D-SYNTHESE',tutorial:'🚀 TUTORIAL',docs:'📖 DOKUMENTATION',quiz:'🎓 LERNQUIZ',share:'🔗 TEILEN',telemetry:'◆ MOLEKULARE TELEMETRIE',dna:'🧬 DNA',orbitals:'⚛️ ORBITALE',measure:'📏 3D MESSEN',materials:'◆ MATERIAL-LABOR',record:'🎥 HD AUFNEHMEN',controller:'SYNTHESESTEUERUNG',tray:'ABLAGE:',combine:'🧪 KOMBINIEREN',suggest:'💡 VORSCHLAGEN',random:'🔀 ZUFALL',undo:'↩ RÜCKGÄNGIG',clear:'✕ LEEREN',fusion:'☀ KERNFUSION',fission:'☢ KERNSPALTUNG'},
    pt:{title:'NULLA-LABS // SÍNTESE IUPAC 3D',tutorial:'🚀 TUTORIAL',docs:'📖 DOCUMENTAÇÃO',quiz:'🎓 QUIZ EDUCATIVO',share:'🔗 COMPARTILHAR',telemetry:'◆ TELEMETRIA MOLECULAR',dna:'🧬 DNA',orbitals:'⚛️ ORBITAIS',measure:'📏 MEDIR 3D',materials:'◆ LABORATÓRIO DE MATERIAIS',record:'🎥 GRAVAR HD',controller:'CONTROLADOR DE SÍNTESE',tray:'BANDEJA:',combine:'🧪 COMBINAR',suggest:'💡 SUGERIR',random:'🔀 ALEATÓRIO',undo:'↩ DESFAZER',clear:'✕ LIMPAR',fusion:'☀ FUSÃO NUCLEAR',fission:'☢ FISSÃO NUCLEAR'},
    ko:{title:'NULLA-LABS // IUPAC 3D 합성',tutorial:'🚀 튜토리얼',docs:'📖 문서',quiz:'🎓 교육 퀴즈',share:'🔗 공유',telemetry:'◆ 분자 텔레메트리',dna:'🧬 DNA',orbitals:'⚛️ 오비탈',measure:'📏 3D 측정',materials:'◆ 재료 연구실',record:'🎥 HD 녹화',controller:'합성 컨트롤러',tray:'트레이:',combine:'🧪 결합',suggest:'💡 제안',random:'🔀 무작위',undo:'↩ 실행 취소',clear:'✕ 지우기',fusion:'☀ 핵융합',fission:'☢ 핵분열'},
    ar:{title:'NULLA-LABS // تخليق IUPAC ثلاثي الأبعاد',tutorial:'🚀 البرنامج التعليمي',docs:'📖 التوثيق',quiz:'🎓 اختبار تعليمي',share:'🔗 مشاركة',telemetry:'◆ القياس الجزيئي',dna:'🧬 الحمض النووي',orbitals:'⚛️ المدارات',measure:'📏 قياس ثلاثي الأبعاد',materials:'◆ مختبر المواد',record:'🎥 تسجيل عالي الدقة',controller:'وحدة التحكم بالتخليق',tray:'الصينية:',combine:'🧪 دمج كيميائي',suggest:'💡 اقتراح',random:'🔀 عشوائي',undo:'↩ تراجع',clear:'✕ مسح',fusion:'☀ الاندماج النووي',fission:'☢ الانشطار النووي'}
  };
  const storageKey='nulla-labs-locale';
  const bindings={'.hud-title':'title','#btn-tutorial':'tutorial','#btn-docs':'docs','#btn-quiz':'quiz','#btn-share-url':'share','#molecular-hud h3':'telemetry','#btn-reassemble':'dna','#btn-orbitals':'orbitals','#btn-measure':'measure','.material-lab-title':'materials','#btn-record':'record','.pt-panel-title':'controller','.fusion-label':'tray','#btn-fuse':'combine','#btn-suggest':'suggest','#btn-random':'random','#btn-undo':'undo','#btn-clear':'clear','#btn-nuclear-fusion':'fusion','#btn-nuclear-fission':'fission'};
  const normalize=value=>{const code=String(value||'').toLowerCase().split('-')[0];return messages[code]?code:'es';};
  function apply(locale) {
    const code=normalize(locale);
    document.documentElement.lang=code; document.documentElement.dir=languages[code].dir;
    document.querySelectorAll('[data-i18n]').forEach(node=>{const value=messages[code][node.dataset.i18n];if(value)node.textContent=value;});
    document.querySelectorAll('[data-i18n-aria-label]').forEach(node=>{const value=messages[code][node.dataset.i18nAriaLabel];if(value)node.setAttribute('aria-label',value);});
    document.querySelectorAll('[data-i18n-label]').forEach(node=>{const value=messages[code][node.dataset.i18nLabel];if(value)node.label=value;});
    Object.entries(bindings).forEach(([selector,key])=>{const node=document.querySelector(selector);if(node)node.textContent=messages[code][key];});
    const selector=document.getElementById('language-selector'); if(selector)selector.value=code;
    try{localStorage.setItem(storageKey,code);}catch(_){}
    root.dispatchEvent(new CustomEvent('nulla:locale',{detail:{locale:code}})); return code;
  }
  function boot() {
    const selector=document.getElementById('language-selector');
    if(selector&&!selector.options.length){Object.entries(languages).forEach(([code,meta])=>selector.add(new Option(meta.name,code)));selector.addEventListener('change',event=>apply(event.target.value));}
    let saved='';try{saved=localStorage.getItem(storageKey)||'';}catch(_){}
    apply(saved||navigator.language||'es');
  }
  root.NULLA_I18N=Object.freeze({languages,messages,apply,normalize});
  document.addEventListener('DOMContentLoaded',boot);
})(globalThis);
