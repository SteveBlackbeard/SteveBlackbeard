(function extendUiLabels(root) {
  'use strict';
  const i18n=root.NULLA_I18N;
  if(!i18n)throw new Error('NULLA_I18N must load before ui-labels.js');
  const keys=['assembly','formulaLabel','classLabel','bonding','enthalpy','dipole','stabilityLabel','spectrum','irStretch','stateLabel','compatibilityLabel','conditions','thermalTemp','explanation','exportGltf','exportUsda','exportXyz','diamond','nanotube','graphene','solvation','audioOn','audioOff','capture'];
  const values={
    es:['ENSAMBLAJE','FÓRMULA','CLASE','ENLACES','ENTALPÍA','DIPOLO (μ)','ESTABILIDAD','ESPECTRO','ESTIRAMIENTO IR','ESTADO','COMPATIBILIDAD','CONDICIONES','TEMPERATURA (T):','NOTA EXPLICATIVA:','📱 COORD. GLTF',' FUENTE USDA','💾 EXPORTAR COORDENADAS .XYZ','💎 DIAMANTE','🧬 NANOTUBO','🧊 GRAFENO','💧 SOLVATACIÓN','🔊 AUDIO: ON','🔇 AUDIO: OFF','📸 CAPTURA HD'],
    en:['ASSEMBLY','FORMULA','CLASS','BONDING','ENTHALPY','DIPOLE (μ)','STABILITY','SPECTRUM','IR STRETCH','STATE','COMPATIBILITY','CONDITIONS','TEMPERATURE (T):','EXPLANATION NOTE:','📱 GLTF COORDS',' USDA SOURCE','💾 EXPORT .XYZ COORDINATES','💎 DIAMOND','🧬 NANOTUBE','🧊 GRAPHENE','💧 SOLVATION','🔊 AUDIO: ON','🔇 AUDIO: OFF','📸 HD CAPTURE'],
    ja:['構造','化学式','分類','結合','エンタルピー','双極子 (μ)','安定性','スペクトル','IR伸縮','状態','適合性','条件','温度 (T):','説明:','📱 GLTF座標',' USDAソース','💾 .XYZ座標を書き出す','💎 ダイヤモンド','🧬 ナノチューブ','🧊 グラフェン','💧 溶媒和','🔊 音声: オン','🔇 音声: オフ','📸 HD撮影'],
    ru:['СТРУКТУРА','ФОРМУЛА','КЛАСС','СВЯЗИ','ЭНТАЛЬПИЯ','ДИПОЛЬ (μ)','СТАБИЛЬНОСТЬ','СПЕКТР','ИК-КОЛЕБАНИЕ','СОСТОЯНИЕ','СОВМЕСТИМОСТЬ','УСЛОВИЯ','ТЕМПЕРАТУРА (T):','ПОЯСНЕНИЕ:','📱 КООРД. GLTF',' ИСХОДНИК USDA','💾 ЭКСПОРТ КООРДИНАТ .XYZ','💎 АЛМАЗ','🧬 НАНОТРУБКА','🧊 ГРАФЕН','💧 СОЛЬВАТАЦИЯ','🔊 ЗВУК: ВКЛ','🔇 ЗВУК: ВЫКЛ','📸 СНИМОК HD'],
    zh:['结构','化学式','类别','成键','焓','偶极矩 (μ)','稳定性','光谱','红外伸缩','状态','相容性','条件','温度 (T):','说明：','📱 GLTF坐标',' USDA源码','💾 导出 .XYZ 坐标','💎 金刚石','🧬 纳米管','🧊 石墨烯','💧 溶剂化','🔊 音频：开','🔇 音频：关','📸 高清截图'],
    fr:['ASSEMBLAGE','FORMULE','CLASSE','LIAISONS','ENTHALPIE','DIPÔLE (μ)','STABILITÉ','SPECTRE','ÉTIREMENT IR','ÉTAT','COMPATIBILITÉ','CONDITIONS','TEMPÉRATURE (T) :','NOTE EXPLICATIVE :','📱 COORD. GLTF',' SOURCE USDA','💾 EXPORTER LES COORD. .XYZ','💎 DIAMANT','🧬 NANOTUBE','🧊 GRAPHÈNE','💧 SOLVATATION','🔊 AUDIO : OUI','🔇 AUDIO : NON','📸 CAPTURE HD'],
    it:['STRUTTURA','FORMULA','CLASSE','LEGAMI','ENTALPIA','DIPOLO (μ)','STABILITÀ','SPETTRO','STIRAMENTO IR','STATO','COMPATIBILITÀ','CONDIZIONI','TEMPERATURA (T):','NOTA ESPLICATIVA:','📱 COORD. GLTF',' SORGENTE USDA','💾 ESPORTA COORDINATE .XYZ','💎 DIAMANTE','🧬 NANOTUBO','🧊 GRAFENE','💧 SOLVATAZIONE','🔊 AUDIO: ON','🔇 AUDIO: OFF','📸 CATTURA HD'],
    de:['STRUKTUR','FORMEL','KLASSE','BINDUNGEN','ENTHALPIE','DIPOL (μ)','STABILITÄT','SPEKTRUM','IR-STRECKUNG','ZUSTAND','KOMPATIBILITÄT','BEDINGUNGEN','TEMPERATUR (T):','ERKLÄRUNG:','📱 GLTF-KOORD.',' USDA-QUELLE','💾 .XYZ-KOORD. EXPORTIEREN','💎 DIAMANT','🧬 NANORÖHRE','🧊 GRAPHEN','💧 SOLVATATION','🔊 AUDIO: AN','🔇 AUDIO: AUS','📸 HD-AUFNAHME'],
    pt:['ESTRUTURA','FÓRMULA','CLASSE','LIGAÇÕES','ENTALPIA','DIPOLO (μ)','ESTABILIDADE','ESPECTRO','ESTIRAMENTO IR','ESTADO','COMPATIBILIDADE','CONDIÇÕES','TEMPERATURA (T):','NOTA EXPLICATIVA:','📱 COORD. GLTF',' FONTE USDA','💾 EXPORTAR COORDENADAS .XYZ','💎 DIAMANTE','🧬 NANOTUBO','🧊 GRAFENO','💧 SOLVATAÇÃO','🔊 ÁUDIO: ON','🔇 ÁUDIO: OFF','📸 CAPTURA HD'],
    ko:['구조','화학식','분류','결합','엔탈피','쌍극자 (μ)','안정성','스펙트럼','IR 신축','상태','호환성','조건','온도 (T):','설명:','📱 GLTF 좌표',' USDA 소스','💾 .XYZ 좌표 내보내기','💎 다이아몬드','🧬 나노튜브','🧊 그래핀','💧 용매화','🔊 오디오: 켬','🔇 오디오: 끔','📸 HD 캡처'],
    ar:['البنية','الصيغة','الفئة','الروابط','الإنثالبي','العزم ثنائي القطب (μ)','الاستقرار','الطيف','اهتزاز IR','الحالة','التوافق','الشروط','درجة الحرارة (T):','ملاحظة توضيحية:','📱 إحداثيات GLTF',' مصدر USDA','💾 تصدير إحداثيات .XYZ','💎 ألماس','🧬 أنبوب نانوي','🧊 غرافين','💧 إماهة','🔊 الصوت: تشغيل','🔇 الصوت: إيقاف','📸 التقاط HD']
  };
  for(const [locale,labels] of Object.entries(values)){
    if(labels.length!==keys.length)throw new Error(`UI label count mismatch for ${locale}`);
    Object.assign(i18n.messages[locale],Object.fromEntries(keys.map((key,index)=>[key,labels[index]])));
  }
  root.NULLA_UI_LABEL_KEYS=Object.freeze(keys);
})(globalThis);
