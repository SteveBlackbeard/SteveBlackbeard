(function extendScientificI18n(root) {
  'use strict';
  const i18n = root.NULLA_I18N;
  if (!i18n) throw new Error('NULLA_I18N must load before scientific-i18n.js');
  const keys = [
    'referenceModel','dataUnavailable','dataCoverage','instability','noAdditionalConditions',
    'statusNoCataloguedPath','statusCataloguedFavorable','statusConditionDependent',
    'statusIncompleteData','statusNoEvaluatedChannel','statusExoenergetic','statusEnergyInput','statusReferenceModel'
  ];
  const values = {
    es:['REFERENCIA ILUSTRATIVA','DATOS NO CATALOGADOS','COBERTURA DE DATOS','INESTABILIDAD','Sin condiciones adicionales del modelo','RUTA NO CATALOGADA','CATALOGADA · FAVORABLE','CATALOGADA · DEPENDE DE CONDICIONES','CATALOGADA · DATOS INCOMPLETOS','CANAL ISOTÓPICO NO EVALUADO','CANAL EXOENERGÉTICO EVALUADO','REQUIERE APORTE DE ENERGÍA','MODELO DE REFERENCIA · DATOS INCOMPLETOS'],
    en:['ILLUSTRATIVE REFERENCE','DATA NOT CATALOGUED','DATA COVERAGE','INSTABILITY','No additional model conditions','PATH NOT CATALOGUED','CATALOGUED · FAVORABLE','CATALOGUED · CONDITION DEPENDENT','CATALOGUED · INCOMPLETE DATA','ISOTOPE CHANNEL NOT EVALUATED','EVALUATED EXOENERGETIC CHANNEL','ENERGY INPUT REQUIRED','REFERENCE MODEL · INCOMPLETE DATA'],
    ja:['説明用参照値','未収録データ','データ充足率','不安定性','追加モデル条件なし','未収録経路','収録済み・有利','収録済み・条件依存','収録済み・データ不足','未評価の同位体経路','評価済み発熱経路','エネルギー入力が必要','参考モデル・データ不足'],
    ru:['ИЛЛЮСТРАТИВНЫЙ ОРИЕНТИР','ДАННЫЕ НЕ КАТАЛОГИЗИРОВАНЫ','ПОКРЫТИЕ ДАННЫХ','НЕСТАБИЛЬНОСТЬ','Дополнительных условий модели нет','ПУТЬ НЕ КАТАЛОГИЗИРОВАН','КАТАЛОГИЗИРОВАНО · БЛАГОПРИЯТНО','КАТАЛОГИЗИРОВАНО · ЗАВИСИТ ОТ УСЛОВИЙ','КАТАЛОГИЗИРОВАНО · НЕПОЛНЫЕ ДАННЫЕ','ИЗОТОПНЫЙ КАНАЛ НЕ ОЦЕНЁН','ОЦЕНЁННЫЙ ЭКЗОЭНЕРГЕТИЧЕСКИЙ КАНАЛ','ТРЕБУЕТСЯ ПОДВОД ЭНЕРГИИ','ЭТАЛОННАЯ МОДЕЛЬ · НЕПОЛНЫЕ ДАННЫЕ'],
    zh:['示意参考值','数据未收录','数据覆盖率','不稳定性','无其他模型条件','路径未收录','已收录·有利','已收录·取决于条件','已收录·数据不完整','同位素通道未评估','已评估放能通道','需要能量输入','参考模型·数据不完整'],
    fr:['RÉFÉRENCE ILLUSTRATIVE','DONNÉES NON CATALOGUÉES','COUVERTURE DES DONNÉES','INSTABILITÉ','Aucune condition de modèle supplémentaire','VOIE NON CATALOGUÉE','CATALOGUÉE · FAVORABLE','CATALOGUÉE · DÉPEND DES CONDITIONS','CATALOGUÉE · DONNÉES INCOMPLÈTES','VOIE ISOTOPIQUE NON ÉVALUÉE','VOIE EXOÉNERGÉTIQUE ÉVALUÉE','APPORT D’ÉNERGIE REQUIS','MODÈLE DE RÉFÉRENCE · DONNÉES INCOMPLÈTES'],
    it:['RIFERIMENTO ILLUSTRATIVO','DATI NON CATALOGATI','COPERTURA DEI DATI','INSTABILITÀ','Nessuna condizione aggiuntiva del modello','PERCORSO NON CATALOGATO','CATALOGATO · FAVOREVOLE','CATALOGATO · DIPENDE DALLE CONDIZIONI','CATALOGATO · DATI INCOMPLETI','CANALE ISOTOPICO NON VALUTATO','CANALE ESOENERGETICO VALUTATO','RICHIESTO APPORTO DI ENERGIA','MODELLO DI RIFERIMENTO · DATI INCOMPLETI'],
    de:['ILLUSTRATIVER REFERENZWERT','DATEN NICHT KATALOGISIERT','DATENABDECKUNG','INSTABILITÄT','Keine zusätzlichen Modellbedingungen','PFAD NICHT KATALOGISIERT','KATALOGISIERT · GÜNSTIG','KATALOGISIERT · BEDINGUNGSABHÄNGIG','KATALOGISIERT · UNVOLLSTÄNDIGE DATEN','ISOTOPENKANAL NICHT BEWERTET','BEWERTETER EXOENERGETISCHER KANAL','ENERGIEZUFUHR ERFORDERLICH','REFERENZMODELL · UNVOLLSTÄNDIGE DATEN'],
    pt:['REFERÊNCIA ILUSTRATIVA','DADOS NÃO CATALOGADOS','COBERTURA DE DADOS','INSTABILIDADE','Sem condições adicionais do modelo','ROTA NÃO CATALOGADA','CATALOGADA · FAVORÁVEL','CATALOGADA · DEPENDE DAS CONDIÇÕES','CATALOGADA · DADOS INCOMPLETOS','CANAL ISOTÓPICO NÃO AVALIADO','CANAL EXOENERGÉTICO AVALIADO','REQUER APORTE DE ENERGIA','MODELO DE REFERÊNCIA · DADOS INCOMPLETOS'],
    ko:['설명용 기준값','미수록 데이터','데이터 충족률','불안정성','추가 모델 조건 없음','미수록 경로','수록됨 · 유리','수록됨 · 조건 의존','수록됨 · 데이터 불완전','미평가 동위원소 채널','평가된 발열 채널','에너지 입력 필요','참조 모델 · 데이터 불완전'],
    ar:['مرجع توضيحي','بيانات غير مفهرسة','تغطية البيانات','عدم الاستقرار','لا شروط إضافية للنموذج','مسار غير مفهرس','مفهرس · ملائم','مفهرس · يعتمد على الشروط','مفهرس · بيانات غير مكتملة','قناة نظيرية غير مقيّمة','قناة طاردة للطاقة مقيّمة','يلزم إدخال طاقة','نموذج مرجعي · بيانات غير مكتملة']
  };
  for (const [locale, translations] of Object.entries(values)) {
    if (translations.length !== keys.length) throw new Error(`Scientific translation count mismatch for ${locale}`);
    Object.assign(i18n.messages[locale], Object.fromEntries(keys.map((key, index) => [key, translations[index]])));
  }
  root.NULLA_SCIENTIFIC_I18N_KEYS = Object.freeze(keys);
})(globalThis);
