(function extendTelemetryI18n(root) {
  'use strict';
  const i18n = root.NULLA_I18N;
  if (!i18n) throw new Error('NULLA_I18N must load before telemetry-i18n.js');
  const keys = [
    'completed','cataloguedCompound','chemicalCombination','bringingReactants',
    'chemicalVisualization','cataloguedBonding','cataloguedPath','conservationVerified',
    'evaluatedChannel','visualDisclaimer','energyRelease','nuclearReaction',
    'noAnimation','reactionRejected','datasetError'
  ];
  const values = {
    es:['COMPLETADA','COMPUESTO CATALOGADO','Combinación química','Acercando reactivos…','MODO DE VISUALIZACIÓN QUÍMICA','Modelo de enlace catalogado','Ruta de compuesto catalogada','CONSERVACIÓN VERIFICADA','CANAL EDUCATIVO EVALUADO','La escala y el tiempo visuales son ilustrativos; no es una simulación de reactor.','Liberación de energía','Reacción nuclear','No se ejecutó ninguna animación','Reacción rechazada','Error del conjunto de datos'],
    en:['COMPLETED','CATALOGUED COMPOUND','Chemical combination','Bringing reactants together…','CHEMICAL VISUALIZATION MODE','Catalogued bonding model','Catalogued compound path','CONSERVATION VERIFIED','EVALUATED EDUCATIONAL CHANNEL','Visual scale and timing are illustrative; this is not a reactor simulation.','Energy release','Nuclear reaction','No animation was executed','Reaction rejected','Dataset error'],
    ja:['完了','登録済み化合物','化学結合','反応物を接近中…','化学可視化モード','登録済み結合モデル','登録済み化合物経路','保存則を検証済み','評価済み教育チャンネル','視覚的な尺度と時間は説明用であり、原子炉シミュレーションではありません。','エネルギー放出','核反応','アニメーションは実行されませんでした','反応は拒否されました','データセットエラー'],
    ru:['ЗАВЕРШЕНО','КАТАЛОГИЗИРОВАННОЕ СОЕДИНЕНИЕ','Химическая комбинация','Сближение реагентов…','РЕЖИМ ХИМИЧЕСКОЙ ВИЗУАЛИЗАЦИИ','Каталогизированная модель связей','Каталогизированный путь соединения','СОХРАНЕНИЕ ПРОВЕРЕНО','ОЦЕНЁННЫЙ УЧЕБНЫЙ КАНАЛ','Визуальные масштаб и время иллюстративны; это не симуляция реактора.','Выделение энергии','Ядерная реакция','Анимация не выполнена','Реакция отклонена','Ошибка набора данных'],
    zh:['已完成','已编目化合物','化学组合','正在接近反应物…','化学可视化模式','已编目成键模型','已编目化合物路径','守恒已验证','已评估教学通道','视觉尺度和时间仅用于说明，并非反应堆模拟。','能量释放','核反应','未执行动画','反应已拒绝','数据集错误'],
    fr:['TERMINÉE','COMPOSÉ CATALOGUÉ','Combinaison chimique','Rapprochement des réactifs…','MODE DE VISUALISATION CHIMIQUE','Modèle de liaison catalogué','Voie de composé cataloguée','CONSERVATION VÉRIFIÉE','CANAL PÉDAGOGIQUE ÉVALUÉ','L’échelle et le temps visuels sont illustratifs ; ce n’est pas une simulation de réacteur.','Libération d’énergie','Réaction nucléaire','Aucune animation exécutée','Réaction rejetée','Erreur de jeu de données'],
    it:['COMPLETATA','COMPOSTO CATALOGATO','Combinazione chimica','Avvicinamento dei reagenti…','MODALITÀ DI VISUALIZZAZIONE CHIMICA','Modello di legame catalogato','Percorso del composto catalogato','CONSERVAZIONE VERIFICATA','CANALE DIDATTICO VALUTATO','Scala e tempi visivi sono illustrativi; non è una simulazione di reattore.','Rilascio di energia','Reazione nucleare','Nessuna animazione eseguita','Reazione rifiutata','Errore del set di dati'],
    de:['ABGESCHLOSSEN','KATALOGISIERTE VERBINDUNG','Chemische Kombination','Reaktanten werden angenähert…','CHEMISCHER VISUALISIERUNGSMODUS','Katalogisiertes Bindungsmodell','Katalogisierter Verbindungspfad','ERHALTUNG BESTÄTIGT','AUSGEWERTETER LERNKANAL','Visueller Maßstab und Ablauf sind illustrativ; dies ist keine Reaktorsimulation.','Energiefreisetzung','Kernreaktion','Keine Animation ausgeführt','Reaktion abgelehnt','Datensatzfehler'],
    pt:['CONCLUÍDA','COMPOSTO CATALOGADO','Combinação química','Aproximando reagentes…','MODO DE VISUALIZAÇÃO QUÍMICA','Modelo de ligação catalogado','Rota de composto catalogada','CONSERVAÇÃO VERIFICADA','CANAL EDUCACIONAL AVALIADO','Escala e tempo visuais são ilustrativos; não é uma simulação de reator.','Liberação de energia','Reação nuclear','Nenhuma animação executada','Reação rejeitada','Erro do conjunto de dados'],
    ko:['완료','목록화된 화합물','화학 결합','반응물을 접근시키는 중…','화학 시각화 모드','목록화된 결합 모델','목록화된 화합물 경로','보존 검증 완료','평가된 교육 채널','시각적 규모와 시간은 설명용이며 원자로 시뮬레이션이 아닙니다.','에너지 방출','핵반응','애니메이션이 실행되지 않았습니다','반응이 거부되었습니다','데이터세트 오류'],
    ar:['مكتمل','مركّب مفهرس','اتحاد كيميائي','تقريب المتفاعلات…','وضع التصور الكيميائي','نموذج روابط مفهرس','مسار مركّب مفهرس','تم التحقق من الانحفاظ','قناة تعليمية مقيّمة','المقياس والزمن البصريان توضيحيان؛ وليسا محاكاة لمفاعل.','تحرر الطاقة','تفاعل نووي','لم يُنفذ أي تحريك','رُفض التفاعل','خطأ في مجموعة البيانات']
  };
  for (const [locale, translations] of Object.entries(values)) {
    if (translations.length !== keys.length) throw new Error(`Telemetry translation count mismatch for ${locale}`);
    Object.assign(i18n.messages[locale], Object.fromEntries(keys.map((key, index) => [key, translations[index]])));
  }
  root.NULLA_TELEMETRY_I18N_KEYS = Object.freeze(keys);
})(globalThis);
