(function initExperienceMode(root) {
  'use strict';

  const storageKey = 'nulla-experience-mode-v1';
  const validModes = new Set(['basic','lab','science']);
  const copy = {
    es:['MODO BÁSICO','LABORATORIO','DATOS','Explora estructuras, materiales y temperatura con la información esencial.','Opera química, mezclas y reacciones nucleares con controles contextuales.','Audita evidencia, condiciones, medidas, espectros y exportaciones.'],
    en:['BASIC MODE','LABORATORY','DATA','Explore structures, materials, and temperature with essential information.','Operate chemistry, mixtures, and nuclear reactions with contextual controls.','Audit evidence, conditions, measurements, spectra, and exports.'],
    ja:['基本モード','ラボ','科学データ','構造・材料・温度を必要な情報だけで探索します。','化学・混合物・核反応を状況に応じた操作で実行します。','根拠・条件・測定・スペクトル・出力を検証します。'],
    ru:['БАЗОВЫЙ РЕЖИМ','ЛАБОРАТОРИЯ','ДАННЫЕ','Исследуйте структуры, материалы и температуру с основной информацией.','Управляйте химией, смесями и ядерными реакциями.','Проверяйте данные, условия, измерения, спектры и экспорт.'],
    zh:['基础模式','实验室','科学数据','用核心信息探索结构、材料和温度。','通过情境控件操作化学、混合物和核反应。','核查证据、条件、测量、光谱与导出。'],
    fr:['MODE DE BASE','LABORATOIRE','DONNÉES','Explorez structures, matériaux et température avec les informations essentielles.','Manipulez chimie, mélanges et réactions nucléaires avec des contrôles contextuels.','Auditez preuves, conditions, mesures, spectres et exports.'],
    it:['MODALITÀ BASE','LABORATORIO','DATI','Esplora strutture, materiali e temperatura con le informazioni essenziali.','Gestisci chimica, miscele e reazioni nucleari con controlli contestuali.','Verifica evidenze, condizioni, misure, spettri ed esportazioni.'],
    de:['BASISMODUS','LABOR','DATEN','Erkunde Strukturen, Materialien und Temperatur mit den wesentlichen Angaben.','Steuere Chemie, Gemische und Kernreaktionen mit kontextbezogenen Werkzeugen.','Prüfe Evidenz, Bedingungen, Messungen, Spektren und Exporte.'],
    pt:['MODO BÁSICO','LABORATÓRIO','DADOS','Explore estruturas, materiais e temperatura com a informação essencial.','Opere química, misturas e reações nucleares com controles contextuais.','Audite evidências, condições, medições, espectros e exportações.'],
    ko:['기본 모드','실험실','과학 데이터','핵심 정보로 구조, 재료, 온도를 탐색합니다.','상황별 제어로 화학, 혼합물, 핵반응을 실행합니다.','근거, 조건, 측정, 스펙트럼, 내보내기를 검토합니다.'],
    ar:['الوضع الأساسي','المختبر','البيانات العلمية','استكشف البنى والمواد ودرجة الحرارة بالمعلومات الأساسية.','شغّل الكيمياء والمخاليط والتفاعلات النووية بأدوات سياقية.','دقّق الأدلة والشروط والقياسات والأطياف والتصدير.']
  };

  let mode = 'basic';

  function locale() {
    const current = root.NULLA_I18N?.locale || document.documentElement.lang || 'es';
    return copy[current] ? current : 'es';
  }

  function updateCopy() {
    const values = copy[locale()];
    const buttons = [...document.querySelectorAll('[data-experience-mode]')];
    buttons.forEach((button,index) => { button.textContent = values[index]; });
    const description = document.getElementById('experience-mode-description');
    const descriptionByMode = {basic:values[3],lab:values[4],science:values[5]};
    if (description) description.textContent = descriptionByMode[mode];
  }

  function updateAccessibility() {
    document.querySelectorAll('.experience-lab, .experience-science').forEach(section => {
      const labOnly = section.classList.contains('experience-lab');
      const scienceOnly = section.classList.contains('experience-science');
      const hidden = mode === 'basic' ? labOnly || scienceOnly : mode === 'lab' ? scienceOnly : false;
      section.setAttribute('aria-hidden', String(hidden));
      if ('inert' in section) section.inert = hidden;
    });
  }

  function set(nextMode, options = {}) {
    mode = validModes.has(nextMode) ? nextMode : 'basic';
    document.body.dataset.experience = mode;
    document.querySelectorAll('[data-experience-mode]').forEach(button => {
      const selected = button.dataset.experienceMode === mode;
      button.setAttribute('aria-checked', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    updateCopy();
    updateAccessibility();
    if (options.persist !== false) {
      try { localStorage.setItem(storageKey,mode); } catch (_) {}
    }
    root.dispatchEvent(new CustomEvent('nulla:experience',{detail:{mode}}));
    return mode;
  }

  function initialMode() {
    try {
      const shared = new URLSearchParams(location.hash.slice(1)).get('mode');
      if (validModes.has(shared)) return shared;
      const saved = localStorage.getItem(storageKey);
      if (validModes.has(saved)) return saved;
    } catch (_) {}
    return 'basic';
  }

  function init() {
    const tabs = [...document.querySelectorAll('[data-experience-mode]')];
    tabs.forEach((button,index) => {
      button.addEventListener('click', () => set(button.dataset.experienceMode));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        event.preventDefault();
        const targetIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        set(tabs[targetIndex].dataset.experienceMode);
        tabs[targetIndex].focus();
      });
    });
    set(initialMode(),{persist:false});
    root.addEventListener('nulla:locale',updateCopy);
  }

  root.NULLA_EXPERIENCE = Object.freeze({
    get mode() { return mode; },
    set,
    modes:Object.freeze([...validModes]),
    locales:Object.freeze(Object.keys(copy))
  });
  document.addEventListener('DOMContentLoaded',init,{once:true});
})(globalThis);
