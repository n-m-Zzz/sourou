'use strict';

/* ============================================================
   早漏タイプ診断 app-pe.js
   ============================================================ */

// ---------- 商品URL（実装時に差し替え） ----------
const PRODUCT_URLS = {
  poxet:         'https://modelab.store/product/poxet/',
  supertadarise: 'https://modelab.store/product/super-tadarise/',
  valif:         'https://modelab.store/ed-medicine-ranking/',
  compare:       'https://modelab.store/ed-medicine-ranking/',
};

// ---------- 年齢スコア ----------
const AGE_SCORES = {
  '20-29': 0,
  '30-39': 0,
  '40-49': 1,
  '50+':   2,
};

// ---------- タイプ別コンテンツ ----------
const PE_TYPE_CONTENT = {
  tension: {
    name: '緊張・心理型',
    heroSummary: '自慰では問題ないのに本番で早くなる、緊張やプレッシャーが影響しているタイプです。',
    peBadge: '早漏傾向：緊張型',
    stateTitle: '本番の場面でだけ射精が早まりやすいタイプ',
    stateBody: 'パートナーへの気遣い、失敗への不安、過度な興奮などが交感神経を刺激し、射精反射を早めています。身体の問題というより、心理的な要因が大きく影響している状態です。',
    mechanismTitle: 'なぜ本番でだけ早くなるのか',
    mechanismBody: '脳が「本番」という状況を感知すると、交感神経が強く活性化されます。この時、射精をコントロールする神経系の閾値が下がり、少ない刺激でも射精しやすくなります。自慰では問題ないのは、リラックスした状態で副交感神経が優位に保たれているためです。',
    approachTitle: 'ポゼットがどう効くのか',
    approachBody: 'ダポキセチンは脳内のセロトニン濃度を適切に保つことで、緊張や興奮による射精反射の暴走を抑制します。意識的な我慢に頼らず、神経系レベルで安定したコントロールが得られるため、本番でも自然な持続時間を実現できます。',
    cardDuration: '本番では比較的早くなりやすい傾向があります',
    cardFrequency: '場面によって差が出やすい頻度です',
    cardControl: '緊張時にコントロール感が低下しやすい状態です',
    cardDistress: '本番への不安がストレスになっています',
  },
  sensitivity: {
    name: '感度・習慣型',
    heroSummary: '自慰でも本番でも射精が早い、感覚の過敏さや習慣が影響しているタイプです。',
    peBadge: '早漏傾向：感度型',
    stateTitle: '刺激に対する反応が過敏になっているタイプ',
    stateBody: '感覚神経そのものが過敏な状態、または自慰での強い刺激・速いペースに身体が慣れすぎることで、少ない刺激でも強く反応しやすくなっています。場面に関係なく早くなりやすいのが特徴です。',
    mechanismTitle: 'なぜ刺激に敏感になるのか',
    mechanismBody: '自慰での強い刺激や速いペースに慣れると、感覚神経の閾値が下がり「少ない刺激でも強く反応する」状態が定着します。また、先天的に感度が高い場合もこのタイプに分類されます。急いで処理する習慣も影響します。',
    approachTitle: 'ポゼットの効果的な作用',
    approachBody: '感度過敏型には、射精反射の閾値そのものを引き上げるダポキセチンの作用が直接的に効きます。感覚神経の過敏な反応を落ち着かせ、刺激に対してより安定した反応を作ることで、自然なコントロール感を取り戻せます。',
    cardDuration: '自慰でも本番でも早くなりやすい傾向があります',
    cardFrequency: '場面を問わず高い頻度で起きています',
    cardControl: '刺激が加わると反射的に射精しやすい状態です',
    cardDistress: '慢性的な困り感があります',
  },
  acquired: {
    name: '後天性・悪化型',
    heroSummary: '以前は問題なかったのに最近悪化した、年齢や生活環境の変化が影響しているタイプです。',
    peBadge: '早漏傾向：後天性',
    stateTitle: '変化のタイミングが明確なタイプ',
    stateBody: '若い頃や数年前まで問題なかったのに、最近になって早漏を意識するようになった場合です。加齢による神経系の変化、慢性的な疲労・睡眠不足・ストレスの蓄積が複合的に影響しています。',
    mechanismTitle: 'なぜ後から悪化するのか',
    mechanismBody: '年齢とともに射精反射に関わる神経系の感度が変化します。また慢性的なストレスや睡眠不足は自律神経のバランスを崩し、交感神経優位の状態が続くことで射精反射が早まります。以前との明確な変化があるのがこのタイプの特徴です。',
    approachTitle: '変化に対応するアプローチ',
    approachBody: '後天性の変化には、神経系の変化を薬でサポートしながら、生活習慣の見直しも並行して行うのが効果的です。ダポキセチンで射精コントロールを安定させつつ、睡眠やストレス管理を改善することで、総合的な回復を目指せます。',
    cardDuration: '以前と比べて短くなっている傾向があります',
    cardFrequency: '最近になって頻度が増しています',
    cardControl: '以前はできていたコントロールが難しくなっています',
    cardDistress: '変化に伴う不安や困り感があります',
  },
  chronic: {
    name: '慢性・重度型',
    heroSummary: '長期間にわたって早漏が続いており、複数の要因が絡み合っているタイプです。',
    peBadge: '早漏傾向：重度',
    stateTitle: '複合的な要因が重なっているタイプ',
    stateBody: '感度過敏・緊張・心理的プレッシャー・体質的要因などが複数重なり合い、長期間にわたって早漏が続いている状態です。単一の原因ではないため、包括的なアプローチが必要になります。',
    mechanismTitle: 'なぜ複合化・慢性化するのか',
    mechanismBody: '慢性化した早漏は、身体的な感度過敏・神経反射の亢進・心理的プレッシャーが相互に影響し合っている状態です。一つの要因を改善しても他の要因が残るため、「なかなか改善しない」という経験がさらなる不安を生む悪循環に入りやすいタイプです。',
    approachTitle: '複合要因への対応',
    approachBody: '慢性・重度型には、射精反射の根本的な改善が最も重要です。ダポキセチンで神経系レベルでの安定化を図りつつ、成功体験を積み重ねることで心理的な悪循環を断ち切ります。複合的な要因に対して最も包括的にアプローチできる方法です。',
    cardDuration: 'かなり短い時間での射精が続いています',
    cardFrequency: 'ほぼ毎回早い状態が続いています',
    cardControl: 'コントロール感がほとんど持てない状態です',
    cardDistress: '強い困り感・ストレスを抱えています',
  },
};

// ---------- 診断ロジック ----------
function calculatePEType(data) {
  const peMainScore = ['duration', 'frequency', 'control', 'distress']
    .reduce((sum, key) => sum + Number(data[key] || 0), 0);

  const edScore = ['hardness', 'maintenance']
    .reduce((sum, key) => sum + Number(data[key] || 0), 0);

  const ageScore = AGE_SCORES[data.age_group] ?? 0;
  const finalPeScore = peMainScore + ageScore;

  const soloPattern   = data.solo_pattern   || 'unknown';
  const onset         = data.onset          || 'recent';
  const anxietyLevel  = data.anxiety_level  || 'low';

  let peType = 'normal';

  if (finalPeScore >= 12) {
    peType = 'chronic';
  } else if (onset === 'long' && finalPeScore >= 8) {
    peType = 'chronic';
  } else if (onset === 'recent' && ageScore >= 1 && finalPeScore >= 6) {
    peType = 'acquired';
  } else if (soloPattern === 'fast' && finalPeScore >= 6) {
    peType = 'sensitivity';
  } else if (soloPattern === 'same' && finalPeScore >= 6) {
    peType = 'sensitivity';
  } else if ((soloPattern === 'normal' || soloPattern === 'unknown') && anxietyLevel === 'high') {
    peType = 'tension';
  } else if (finalPeScore >= 8) {
    peType = 'chronic';
  } else if (finalPeScore >= 6) {
    peType = 'sensitivity';
  }

  const hasED = edScore >= 3;

  return { peType, hasED, peScore: finalPeScore, edScore };
}

// ---------- 商品推薦 ----------
function getProductRecommendation(result) {
  const { peType, hasED, peScore } = result;

  if (peScore < 6) {
    return {
      key: 'valif',
      name: 'バリフ',
      badge: hasED ? 'ED改善' : 'パフォーマンス向上',
      image: 'med-valif.jpg',
      description: hasED
        ? 'バルデナフィル20mg配合。勃起力改善に特化したED治療薬。'
        : '深刻な悩みがなくても、より硬く長く楽しみたい人向け。',
      primaryLabel: hasED ? 'バリフでED改善する' : 'バリフでパフォーマンスを向上する',
      primaryUrl: PRODUCT_URLS.valif,
      ctaLead: '今すぐ深刻な早漏の悩みというより、夜の営みの満足度をさらに高めたい段階です。バリフは勃起力・維持力を高め、より自信を持って楽しむためのサポートをします。',
      ctaSub: '初めて使う場合は、まず比較ページで各商品の違いを確認してみましょう。',
    };
  }

  if (hasED) {
    return {
      key: 'supertadarise',
      name: 'スーパータダライズ',
      badge: '早漏＋ED対応',
      image: 'med-supertadarise.jpg',
      description: 'ダポキセチン＋タダラフィル配合。早漏と勃起力の両方に同時対応する複合薬。',
      primaryLabel: 'スーパータダライズの詳細を見る',
      primaryUrl: PRODUCT_URLS.supertadarise,
      ctaLead: '今回の診断では早漏とED傾向の両方が見られます。スーパータダライズは1錠で両方にアプローチできる唯一の選択肢です。一度ED治療薬を試しに服用してみることをおすすめします。',
      ctaSub: '早漏専用のポゼットとED専用のバリフを別々に使う方法もありますが、スーパータダライズなら1錠で対応できます。',
    };
  }

  return {
    key: 'poxet',
    name: 'ポゼット',
    badge: '早漏専用',
    image: 'med-poxet.jpg',
    description: 'ダポキセチン60mg配合。射精コントロールに特化した早漏防止薬。',
    primaryLabel: 'ポゼットの詳細を見る',
    primaryUrl: PRODUCT_URLS.poxet,
    ctaLead: '早漏の悩みが続いているなら、一度ポゼットを試しに服用してみることをおすすめします。ダポキセチンは神経系レベルで射精コントロールをサポートし、意識的な我慢に頼らない持続時間の改善が期待できます。',
    ctaSub: 'はじめての場合は比較ページで各商品の違いも確認してみてください。',
  };
}

// ---------- GA4カスタムイベント計測 ----------
function trackDiagnosisStart() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'diagnosis_start', {
    event_category: 'engagement',
    event_label: 'check_page_loaded',
  });
}

function trackDiagnosisComplete(peType, hasED) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'diagnosis_complete', {
    event_category: 'conversion',
    pe_type: peType,
    has_ed: hasED,
    event_label: 'diagnosis_finished',
  });
}

function trackCTAClick(productName, productUrl) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'cta_click', {
    event_category: 'conversion',
    product_name: productName,
    product_url: productUrl,
    event_label: 'product_link_clicked',
  });
}

function trackECTransition(productName) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'ec_transition', {
    event_category: 'conversion',
    product_name: productName,
    event_label: 'external_site_transition',
  });
}

// ---------- ユーティリティ ----------
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}
function showEl(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
function hideEl(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

// ---------- 診断データの保存/取得 ----------
function savePEDiagnosis(data) {
  const result = calculatePEType(data);
  const full = { ...data, ...result, checkedAt: new Date().toISOString() };
  sessionStorage.setItem('pe_check_data', JSON.stringify(full));
  trackDiagnosisComplete(full.peType, full.hasED);
  return full;
}

function getPEDiagnosis() {
  try {
    const raw = sessionStorage.getItem('pe_check_data');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function clearPEDiagnosis() {
  sessionStorage.removeItem('pe_check_data');
}

// ---------- 診断ページ ----------
function initCheckPage() {
  const form    = document.getElementById('peCheckForm');
  if (!form) return;
  trackDiagnosisStart();

  const cards        = Array.from(form.querySelectorAll('.question-card'));
  const progressBar  = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  let currentIndex   = 0;
  const answers      = {};

  function updateProgress() {
    const pct = ((currentIndex + 1) / cards.length) * 100;
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${currentIndex + 1} / ${cards.length}`;
  }

  function showCard(idx) {
    cards.forEach((c, i) => {
      c.classList.toggle('is-active', i === idx);
    });
    currentIndex = idx;
    updateProgress();
    // 保存済み選択を復元
    const card = cards[idx];
    const name = card.dataset.name;
    if (answers[name] !== undefined) {
      card.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.toggle('is-selected', btn.dataset.value === String(answers[name]));
      });
    }
  }

  // 選択肢クリック
  form.addEventListener('click', e => {
    const btn = e.target.closest('.option-btn');
    if (!btn) return;
    const name  = btn.dataset.name;
    const value = btn.dataset.value;
    answers[name] = value;
    btn.closest('.option-list').querySelectorAll('.option-btn')
      .forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
  });

  // 次へ/前へ
  form.addEventListener('click', e => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'next') {
      const card = cards[currentIndex];
      const name = card.dataset.name;
      const required = card.dataset.required === 'true';
      if (required && answers[name] === undefined) {
        // バリデーション：簡易インライン表示
        card.querySelectorAll('.option-btn').forEach(b => {
          b.style.animation = 'none';
        });
        card.style.outline = '2px solid #e67e22';
        setTimeout(() => { card.style.outline = ''; }, 800);
        return;
      }
      if (currentIndex < cards.length - 1) {
        showCard(currentIndex + 1);
      }
    }
    if (action === 'prev') {
      if (currentIndex > 0) showCard(currentIndex - 1);
    }
  });

  // 送信
  form.addEventListener('submit', e => {
    e.preventDefault();
    const full = savePEDiagnosis(answers);
    const url  = full.peType === 'normal' ? 'result-normal.html' : 'result-pe.html';
    window.location.href = url;
  });

  // 初期化
  updateProgress();
}

// ---------- 結果ページ（早漏タイプ） ----------
function renderPEResultPage() {
  const data = getPEDiagnosis();
  if (!data) { showFallback(); return; }

  const typeContent = PE_TYPE_CONTENT[data.peType];
  if (!typeContent) { showFallback(); return; }

  const product = getProductRecommendation(data);

  // ヒーロー画像
  const heroImage = document.getElementById('heroImage');
  if (heroImage) heroImage.src = `result-${data.peType}.png`;

  // テキスト
  setText('typeChip', typeContent.name);
  setText('peBadge', typeContent.peBadge);
  setText('heroSummary', typeContent.heroSummary);
  setText('stateTitle', typeContent.stateTitle);
  setText('stateBody', typeContent.stateBody);
  setText('mechanismTitle', typeContent.mechanismTitle);
  setText('mechanismBody', typeContent.mechanismBody);
  setText('approachTitle', typeContent.approachTitle);
  setText('approachBody', typeContent.approachBody);

  // 4項目カード
  setText('cardDuration',  typeContent.cardDuration);
  setText('cardFrequency', typeContent.cardFrequency);
  setText('cardControl',   typeContent.cardControl);
  setText('cardDistress',  typeContent.cardDistress);

  // ED注記
  if (data.hasED) {
    const notice = document.getElementById('edNotice');
    if (notice) notice.style.display = 'block';
    setText('edNoticeText', 'この診断結果では、勃起力や維持力への不安も見受けられます。勃起への不安が焦りを生み、早漏を悪化させる悪循環に陥っている可能性があります。');
    const edBadge = document.getElementById('edBadge');
    if (edBadge) edBadge.style.display = '';
  }

  // 商品
  const productImg = document.getElementById('productImg');
  if (productImg) productImg.src = product.image;
  setText('productBadge', product.badge);
  setText('productName',  product.name);
  setText('productDesc',  product.description);
  setText('ctaLead',      product.ctaLead);
  setText('ctaSubcopy',   product.ctaSub);

  const ctaPrimary = document.getElementById('ctaPrimary');
  if (ctaPrimary) {
    ctaPrimary.textContent = product.primaryLabel;
    ctaPrimary.href = product.primaryUrl;
    ctaPrimary.addEventListener('click', () => {
      trackCTAClick(product.name, product.primaryUrl);
      trackECTransition(product.name);
    });
  }
  const ctaSecondary = document.getElementById('ctaSecondary');
  if (ctaSecondary) {
    ctaSecondary.href = PRODUCT_URLS.compare;
    ctaSecondary.addEventListener('click', () => {
      trackCTAClick('治療薬比較', PRODUCT_URLS.compare);
      trackECTransition('治療薬比較');
    });
  }
}

// ---------- 結果ページ（normal） ----------
function renderNormalResultPage() {
  const data = getPEDiagnosis();
  if (!data) { showFallback(); return; }

  const hasED = data.hasED || (data.edScore >= 3);
  if (hasED) {
    const edBadge = document.getElementById('edBadge');
    if (edBadge) edBadge.style.display = '';
    const notice = document.getElementById('edNotice');
    if (notice) notice.style.display = 'block';
    setText('edNoticeText', '勃起力への不安も見られます。バリフは勃起力改善とパフォーマンス向上の両方に対応しています。');
  }

  // 4項目
  const durMap  = ['5分以上続く','3〜5分程度','1〜3分程度','1分以内が多い','ほぼ挿入直後'];
  const freqMap = ['ほとんどない','たまにある','半々くらい','よくある','ほぼ毎回'];
  const ctrlMap = ['十分コントロールできる','だいたいできる','どちらともいえない','あまりできない','ほとんどできない'];
  const distMap = ['ほとんど困っていない','少し気になる','そこそこ困っている','かなり困っている','強く悩んでいる'];

  setText('cardDuration',  durMap[data.duration]   ?? '—');
  setText('cardFrequency', freqMap[data.frequency]  ?? '—');
  setText('cardControl',   ctrlMap[data.control]    ?? '—');
  setText('cardDistress',  distMap[data.distress]   ?? '—');

  setText('stateTitle', 'いまのところ、深刻な早漏の傾向は見られません');
  setText('stateBody',  '今回の回答では、射精時間・頻度・コントロール感・困り感のどれも比較的落ち着いた状態です。ただし、より充実した夜の営みを目指したい場合は、パフォーマンス向上のアプローチも選択肢のひとつです。');

  const ctaPrimary = document.getElementById('ctaPrimary');
  if (ctaPrimary) {
    ctaPrimary.href = PRODUCT_URLS.valif;
    ctaPrimary.addEventListener('click', () => {
      trackCTAClick('バリフ', PRODUCT_URLS.valif);
      trackECTransition('バリフ');
    });
  }
}

// ---------- Fallback ----------
function showFallback() {
  document.getElementById('resultFallback')?.classList.remove('is-hidden');
  document.getElementById('resultContent')?.classList.add('is-hidden');
}

// ---------- clear result ----------
document.querySelectorAll('[data-clear-result]').forEach(el => {
  el.addEventListener('click', clearPEDiagnosis);
});

// ---------- ページ振り分け ----------
const page = document.body.dataset.page;
if (page === 'check')         initCheckPage();
if (page === 'result-pe')     renderPEResultPage();
if (page === 'result-normal') renderNormalResultPage();
