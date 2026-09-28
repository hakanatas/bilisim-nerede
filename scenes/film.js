/* ─────────────────────────────────────────────────────────────
   BİLİŞİM NEREDE? — sahneler (BTY.5.1.1)
   Her sahne fonksiyonu (ctx, L, lt, t): lt sahne içi zaman, t film zamanı.
   L.pick(yatay, dikey) iki düzen arasında seçer.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const BF = (root.BF = root.BF || {});
  const { M, P, S, T } = BF;
  const { E, seg, pop, win, go, lerp, clamp, track } = M;

  const K = (ctx, st, t) => BF.drawKaro(ctx, st, t);
  const tile = (ctx, x, y, s, icon, color, t, o = {}) => S.tile(ctx, x, y, s, Object.assign({ icon, color, t }, o));
  const name = (ctx, str, x, y, o = {}) => T.text(ctx, str, x, y, Object.assign({ size: 30, weight: 800, color: P.sir, maxW: 200, minSize: 26 }, o));

  // ═══ 1 · GÜNAYDIN ═══════════════════════════════════════════
  const INTRO = [
    { icon: 'tablet', c: P.kobalt }, { icon: 'laptop', c: P.turkuaz }, { icon: 'smartboard', c: P.kobalt },
    { icon: 'headphones', c: P.mercan }, { icon: 'gamepad', c: P.mor },
    { icon: 'busCard', c: P.safran }, { icon: 'navigation', c: P.safran }, { icon: 'cloud', c: P.turkuaz },
    { icon: 'monitor', c: P.mercan }, { icon: 'alarm', c: P.turkuaz, phone: true },
  ];
  function introSlots(L) {
    if (!L.v) return [[300, 560], [500, 560], [700, 560], [470, 760], [670, 760], [1220, 560], [1420, 560], [1620, 560], [1450, 760], [1250, 760]];
    return [[140, 790], [340, 790], [540, 790], [740, 790], [940, 790], [140, 1340], [340, 1340], [540, 1340], [940, 1340], [740, 1340]];
  }

  function gunaydin(ctx, L, lt, t) {
    // başlık — harf harf düşer
    const title = BF.META.title;
    const tsz = L.pick(118, 124);
    const lines = L.v ? ['Bilişim', 'Nerede?'] : [title];
    const g = ++BF.CHECK.group;
    lines.forEach((ln, li) => {
      const y = L.pick(250, 300 + li * 140);
      const w = T.measure(ctx, ln, tsz, 'display', 800);
      let x = L.cx - w / 2;
      [...ln].forEach((ch, i) => {
        const k = i + li * 7;
        const p = E.back(seg(lt, 0.3 + k * 0.045, 0.75 + k * 0.045));
        const cw = T.measure(ctx, ch, tsz, 'display', 800);
        const col = ch === '?' ? P.safran : P.sir;
        T.text(ctx, ch, x + cw / 2, y - (1 - p) * 60, { size: tsz, fam: 'display', color: col, alpha: clamp(p * 1.5), group: g });
        x += cw;
      });
    });
    const subA = go(lt, 1.0, 1.6);
    if (L.v) {
      T.text(ctx, `${BF.META.code} · ${BF.META.grade}. sınıf`, L.cx, 545, { size: 34, fam: 'display', weight: 600, color: P.turkuazA, alpha: subA });
      T.text(ctx, 'Bilişim Teknolojileri ve Yazılım', L.cx, 605, { size: 34, weight: 600, color: P.turkuazA, alpha: subA });
    } else {
      T.text(ctx, `${BF.META.code}  ·  ${BF.META.grade}. sınıf  ·  Bilişim Teknolojileri ve Yazılım`, L.cx, 360, { size: 32, weight: 600, color: P.turkuazA, alpha: subA });
    }

    // karolar etrafa dizilir
    const slots = introSlots(L);
    INTRO.forEach((it, i) => {
      const [x, y] = slots[i];
      let a, sc;
      if (it.phone) { a = go(lt, 0.2, 0.6); sc = 1; }
      else { const p0 = 3.3 + i * 0.3; sc = pop(lt, p0, 0.5); a = clamp(sc * 2); }
      const ring = it.phone && lt > 0.5 && lt < 2.6;
      const rot = ring ? Math.sin(lt * 42) * 0.07 : 0;
      tile(ctx, x, y, 150 * sc, it.phone ? 'phone' : it.icon, it.c, t, { alpha: a, rot, glow: it.phone ? 0.9 * win(lt, 0.6, 2.8, 0.2) : 0 });
      if (ring) {
        for (let k = 0; k < 3; k++) {
          const ph = ((lt * 1.6 + k / 3) % 1);
          ctx.save(); ctx.globalAlpha = (1 - ph) * 0.8; ctx.strokeStyle = P.safran; ctx.lineWidth = 6;
          S.rrect(ctx, x - 75 - ph * 50, y - 75 - ph * 50, 150 + ph * 100, 150 + ph * 100, 30); ctx.stroke(); ctx.restore();
        }
      }
    });

    // Karo uyanır
    const gy = L.pick(800, 1180), s = 170;
    const jump = Math.sin(clamp((lt - 1.75) / 0.5) * Math.PI) * 50;
    const mood = lt < 1.7 ? 'sleep' : lt < 2.6 ? 'surprised' : 'happy';
    const caret = lt < 1.7 ? 'z' : lt < 2.9 ? '!' : lt < 6.8 ? 'bar' : '?';
    const lookX = lt < 2.6 ? 0.9 : Math.sin(lt * 1.3) * 0.9;
    K(ctx, {
      x: L.cx, y: gy - jump, s, mood, caret, look: [lookX, lt < 2.6 ? 0.3 : -0.3],
      armL: lt < 1.7 ? 0.2 : lt < 2.6 ? 2.6 : 0.4 + 0.2 * Math.sin(lt * 3), armR: lt < 1.7 ? 0.2 : lt < 2.6 ? 2.6 : lt > 7 ? 2.2 : 0.5,
      squash: lt > 2.2 && lt < 2.45 ? 0.85 : 1, seed: 2,
    }, t);
  }

  // ═══ 2 · KAVRAMLAR ══════════════════════════════════════════
  const CONCEPTS = [
    { word: 'BİLGİ', def: 'İşimize yarayan, anlamlı haber', icon: 'info', c: P.kobalt, at: 0.6 },
    { word: 'İLETİŞİM', def: 'Bilginin birinden diğerine ulaşması', icon: 'chat', c: P.mercan, at: 5.8 },
    { word: 'TEKNOLOJİ', def: 'İşi kolaylaştıran araç ve yöntemler', icon: 'gear', c: P.safran, at: 10.6 },
  ];
  const VERBS = [['toplamak', P.kobalt], ['işlemek', P.mercan], ['saklamak', P.safran], ['iletmek', P.zumrut]];

  function kavramlar(ctx, L, lt, t) {
    const MERGE = 14.2;
    const mA = go(lt, MERGE, MERGE + 0.6);
    // kartlar
    CONCEPTS.forEach((c, i) => {
      const p = pop(lt, c.at, 0.55);
      const a = clamp(p * 2) * (1 - mA);
      if (a <= 0.01) return;
      const active = lt >= c.at && (i === 2 || lt < CONCEPTS[i + 1].at) && lt < MERGE;
      const dim = active ? 1 : 0.55;
      if (!L.v) {
        const x = [400, 960, 1520][i];
        tile(ctx, x, 360, 210 * p, c.icon, c.c, t, { alpha: a, glow: active ? 0.7 : 0 });
        T.text(ctx, c.word, x, 530, { size: 50, fam: 'display', color: c.c === P.kobalt ? '#7F9BFF' : c.c, alpha: a * clamp(dim + 0.2) });
        T.para(ctx, c.def, x, 600, { size: 36, maxW: 470, color: P.sir, alpha: a * dim, weight: 800 });
      } else {
        const y = [380, 700, 1020][i];
        tile(ctx, 210, y, 200 * p, c.icon, c.c, t, { alpha: a, glow: active ? 0.7 : 0 });
        T.text(ctx, c.word, 360, y - 50, { size: 50, fam: 'display', align: 'left', color: c.c === P.kobalt ? '#7F9BFF' : c.c, alpha: a * clamp(dim + 0.2) });
        T.para(ctx, c.def, 360, y + 22, { size: 36, maxW: 660, align: 'left', color: P.sir, alpha: a * dim });
      }
    });

    // birleşme: çipler + BİLİŞİM
    if (lt > MERGE - 0.1) {
      const cy = L.pick(200, 250), size = L.pick(34, 30);
      const words = CONCEPTS.map((c) => c.word);
      const ws = words.map((w) => T.measure(ctx, w, size, 'display', 800) + size * 1.2);
      const plus = L.pick(70, 56);
      const total = ws.reduce((a, b) => a + b, 0) + plus * 2;
      let x = L.cx - total / 2;
      words.forEach((w, i) => {
        const sc = pop(lt, MERGE + 0.2 + i * 0.15, 0.45);
        S.chip(ctx, w, x + ws[i] / 2, cy, { size, bg: CONCEPTS[i].c, color: i === 2 ? P.murekkep : P.sir, alpha: clamp(sc * 2), scale: sc });
        x += ws[i];
        if (i < 2) { T.text(ctx, '+', x + plus / 2, cy, { size: 44, fam: 'display', color: P.sir, alpha: go(lt, MERGE + 0.5, MERGE + 0.8) }); x += plus; }
      });
      // ok
      const ty = L.pick(430, 480), tw = L.pick(580, 660), th = L.pick(160, 170);
      S.arrow(ctx, L.cx, cy + 45, L.cx, ty - th / 2 - 18, { p: go(lt, MERGE + 0.7, MERGE + 1.1), lw: 8, color: P.safran });
      // BİLİŞİM karosu
      const bp = pop(lt, MERGE + 1.0, 0.6);
      if (bp > 0.01) {
        ctx.save(); ctx.translate(L.cx, ty); ctx.scale(bp, bp);
        ctx.fillStyle = 'rgba(3,6,20,0.35)'; S.rrect(ctx, -tw / 2 + 8, -th / 2 + 12, tw, th, 34); ctx.fill();
        ctx.fillStyle = P.turkuaz; S.rrect(ctx, -tw / 2, -th / 2, tw, th, 34); ctx.fill();
        ctx.strokeStyle = P.sir; ctx.lineWidth = 5; S.rrect(ctx, -tw / 2 + 14, -th / 2 + 14, tw - 28, th - 28, 24); ctx.stroke();
        ctx.fillStyle = P.safran;
        for (const sx of [-1, 1]) { S.star8(ctx, sx * (tw / 2 - 44), 0, 16); ctx.fill(); }
        T.text(ctx, 'BİLİŞİM', 0, 0, { size: L.pick(76, 80), fam: 'display', color: P.murekkep });
        ctx.restore();
      }
      // fiiller
      VERBS.forEach(([v, c], i) => {
        const sc = pop(lt, MERGE + 1.6 + i * 0.25, 0.45);
        let x, y;
        if (!L.v) { x = 600 + i * 240; y = 600; }
        else { x = i % 2 ? 790 : 290; y = 680 + Math.floor(i / 2) * 110; }
        S.chip(ctx, v, x, y, { size: 36, fam: 'body', bg: P.gece2, stroke: c, lw: 4, alpha: clamp(sc * 2), scale: sc });
        ctx.save(); ctx.globalAlpha = clamp(sc * 2) * 0.8; ctx.fillStyle = c;
        S.star8(ctx, x, y - 44, 9); ctx.fill(); ctx.restore();
      });
      // BİT
      const ba = go(lt, MERGE + 2.6, MERGE + 3.0);
      S.chip(ctx, 'BİT = Bilgi ve İletişim Teknolojileri', L.cx, L.pick(730, 930), { size: L.pick(36, 34), fam: 'body', bg: 'rgba(255,188,58,0.14)', stroke: P.safran, lw: 3, alpha: ba, maxW: L.W - 140 });
    }

    // Karo: aktif kartın altına yuvarlanır (yatay) / aşağıda izler (dikey)
    if (!L.v) {
      const s = 110;
      const keys = [{ t: 0, x: 400 }, { t: 5.2, x: 400 }, { t: 6.2, x: 960 }, { t: 10.0, x: 960 }, { t: 11.0, x: 1520 }, { t: 14.0, x: 1520 }, { t: 15.0, x: 1700 }];
      const k = track(keys, lt);
      K(ctx, { x: k.x, y: 860, s, roll: BF.rollFor(k.x, 400, s), mood: lt > MERGE + 1.2 ? 'proud' : 'happy', look: [lt > 14 ? -0.9 : 0, -0.9], caret: lt > MERGE + 1.2 ? 'ok' : 'bar', armL: lt > MERGE + 1.2 ? 2.4 : 0.3, armR: 0.3, seed: 3 }, t);
    } else {
      const act = lt < 5.8 ? 0 : lt < 10.6 ? 1 : lt < MERGE ? 2 : -1;
      K(ctx, { x: L.pick(0, 540), y: 1340, s: 120, mood: lt > MERGE + 1.2 ? 'proud' : 'happy', look: [-0.6, act === -1 ? -1 : -1], caret: lt > MERGE + 1.2 ? 'ok' : 'bar', armL: lt > MERGE + 1.2 ? 2.4 : 0.3, armR: act >= 0 ? 2.3 : 0.3, seed: 3 }, t);
    }
  }

  // ═══ 3 · DÜN VE BUGÜN ═══════════════════════════════════════
  const PAIRS = [
    { old: ['typewriter', 'Daktilo', "1870'ler"], now: ['laptop', 'Dizüstü bilgisayar'], job: 'yazı yazmak', diff: ['silinip düzeltilebilir', 'kaydedilip paylaşılır'] },
    { old: ['tape', 'Teyp', "1970'ler"], now: ['phone', 'Akıllı telefon'], job: 'müzik dinlemek', diff: ['binlerce şarkı taşır', 'cebe sığar'] },
    { old: ['mainframe', 'İlk bilgisayarlar', "1940'lar"], now: ['cloud', 'Bulut bilişim'], job: 'hesaplamak, saklamak', diff: ['internetle çalışır', 'her yerden erişilir'] },
  ];

  function dunbugun(ctx, L, lt, t) {
    const hdrA = go(lt, 0.2, 0.6);
    const oldX = L.pick(520, 540), nowX = L.pick(1400, 540);
    const oldY = L.pick(430, 410), nowY = L.pick(430, 1010);
    S.chip(ctx, 'DÜN', oldX, L.pick(170, 200), { size: 32, bg: P.sir2, color: P.murekkep, alpha: hdrA });
    S.chip(ctx, 'BUGÜN', nowX, L.pick(170, 815), { size: 32, bg: P.turkuaz, color: P.murekkep, alpha: hdrA });

    const idx = clamp(Math.floor((lt - 0.6) / 5.9), 0, 2);
    const P0 = 0.6 + idx * 5.9;
    const pr = PAIRS[idx];
    const pl = lt - P0;
    const out = idx < 2 ? go(pl, 5.3, 5.8) : 0; // karolar dönerek çıkar
    const cs = L.pick(300, 270);
    // eski
    const po = pop(pl, 0, 0.5);
    const flipO = 1 - out * 2;
    tile(ctx, oldX, oldY, cs * po, pr.old[0], P.mercan, t, { alpha: clamp(po * 2) * (out < 0.5 ? 1 : 0), flip: out ? flipO : null, ground: '#F6E9D0' });
    const nA = clamp(po * 2) * (1 - out);
    name(ctx, pr.old[1], oldX, oldY + cs / 2 + 40, { size: 36, maxW: 440, alpha: nA });
    S.chip(ctx, pr.old[2], oldX + cs / 2 - 10, oldY - cs / 2 + 10, { size: 26, fam: 'body', bg: P.mercan, color: P.sir, alpha: nA, h: 44 });
    // yeni
    const pn = pop(pl, 0.5, 0.5);
    tile(ctx, nowX, nowY, cs * pn, pr.now[0], P.turkuaz, t, { alpha: clamp(pn * 2) * (out < 0.5 ? 1 : 0), flip: out ? flipO : null });
    name(ctx, pr.now[1], nowX, nowY + cs / 2 + 40, { size: 36, maxW: 440, alpha: clamp(pn * 2) * (1 - out) });

    // = aynı iş
    const eq = pop(pl, 1.1, 0.5);
    const eqA = clamp(eq * 2) * (1 - out);
    const ex = L.pick(960, 180), ey = L.pick(400, 705);
    ctx.save(); ctx.globalAlpha *= eqA;
    ctx.translate(ex, ey); ctx.scale(eq, eq);
    ctx.fillStyle = P.turkuaz; ctx.beginPath(); ctx.arc(0, 0, 46, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = P.murekkep; S.rrect(ctx, -22, -14, 44, 9, 4); ctx.fill(); S.rrect(ctx, -22, 5, 44, 9, 4); ctx.fill();
    ctx.restore();
    if (!L.v) {
      T.text(ctx, 'aynı iş', ex, ey + 85, { size: 30, weight: 600, color: P.turkuazA, alpha: eqA });
      T.para(ctx, pr.job, ex, ey + 135, { size: 40, maxW: 480, color: P.sir, alpha: eqA });
    } else {
      T.text(ctx, 'aynı iş', ex + 75, ey - 26, { size: 30, weight: 600, align: 'left', color: P.turkuazA, alpha: eqA });
      T.text(ctx, pr.job, ex + 75, ey + 22, { size: 40, align: 'left', color: P.sir, alpha: eqA, maxW: 560 });
    }

    // farklılıklar
    const fA = go(pl, 2.1, 2.4) * (1 - out);
    if (!L.v) {
      const y = 770;
      const items = ['farklı', ...pr.diff];
      const ws = items.map((w, i) => T.measure(ctx, w, i ? 34 : 28, i ? 'body' : 'display', 800) + (i ? 34 : 28) * 1.4);
      const gap = 22, total = ws.reduce((a, b) => a + b, 0) + gap * 2;
      let x = L.cx - total / 2;
      items.forEach((w, i) => {
        const sc = pop(pl, 2.1 + i * 0.35, 0.4);
        S.chip(ctx, w, x + ws[i] / 2, y, i ? { size: 34, fam: 'body', bg: P.gece2, stroke: P.mercan, lw: 3, alpha: clamp(sc * 2) * (1 - out), scale: sc } : { size: 28, bg: P.mercan, alpha: fA });
        x += ws[i] + gap;
      });
    } else {
      S.chip(ctx, 'farklı', L.cx, 1262, { size: 26, bg: P.mercan, alpha: fA });
      pr.diff.forEach((w, i) => {
        const sc = pop(pl, 2.45 + i * 0.35, 0.4);
        S.chip(ctx, w, L.cx, 1335 + i * 78, { size: 34, fam: 'body', bg: P.gece2, stroke: P.mercan, lw: 3, alpha: clamp(sc * 2) * (1 - out), scale: sc });
      });
    }

    // Karo karşılaştırır
    const think = pl < 2.2;
    const lookSide = Math.sin(pl * 2.2) > 0 ? 1 : -1;
    K(ctx, {
      x: L.pick(170, 900), y: L.pick(860, 770), s: L.pick(115, 100),
      mood: think ? 'thinking' : 'happy', caret: think ? '?' : '!',
      look: L.v ? [-0.3, lookSide * 0.9] : [0.9, lookSide * 0.2 - 0.4],
      armL: 0.3, armR: think ? 2.0 : 2.6, seed: 4,
    }, t);
  }

  // ═══ 4 · KULLANIM ALANLARI ══════════════════════════════════
  const AREAS = [['EĞİTİM', 'egitim'], ['SAĞLIK', 'saglik'], ['ULAŞIM', 'ulasim'], ['EĞLENCE', 'eglence'], ['TARIM', 'tarim']];
  const SORT = [
    { icon: 'smartboard', name: 'Akıllı tahta', a: 0 }, { icon: 'tablet', name: 'Çevrim içi ders', a: 0 },
    { icon: 'monitor', name: 'Hasta monitörü', a: 1 }, { icon: 'mri', name: 'MR cihazı', a: 1 },
    { icon: 'navigation', name: 'Navigasyon', a: 2 }, { icon: 'busCard', name: 'Ulaşım kartı', a: 2 },
    { icon: 'greenscreen', name: 'Yeşil ekran', a: 3 }, { icon: 'gamepad', name: 'Oyun konsolu', a: 3 },
  ];
  const PILE_ORDER = [5, 2, 7, 0, 4, 1, 6, 3]; // yığındaki karışık sıra

  function shelves(L, n) {
    if (!L.v) {
      const w = n === 4 ? 420 : 336, gap = n === 4 ? 30 : 24, tot = n * w + (n - 1) * gap, x0 = (L.W - tot) / 2 + w / 2;
      return Array.from({ length: n }, (_, i) => ({ x: x0 + i * (w + gap), y: 140, w, h: 330, ts: n === 4 ? 150 : 124, dx: n === 4 ? 105 : 78, ty: n === 4 ? 160 : 160 }));
    }
    if (n === 4) return [0, 1, 2, 3].map((i) => ({ x: i % 2 ? 795 : 285, y: i < 2 ? 170 : 590, w: 470, h: 380, ts: 150, dx: 110, ty: 175 }));
    return [0, 1, 2, 3, 4].map((i) => ({ x: i === 4 ? 540 : i % 2 ? 795 : 285, y: [160, 520, 880][Math.floor(i / 2)], w: 470, h: 320, ts: 128, dx: 100, ty: 150 }));
  }
  function slot(sh, j) { return [sh.x + (j ? sh.dx : -sh.dx), sh.y + sh.ty]; }
  function pileSlot(L, k) {
    if (!L.v) return [330 + k * 180, 690];
    return [[150, 390, 690, 930][k % 4], k < 4 ? 1100 : 1270];
  }
  const SORT_T0 = 3.0, SORT_DT = 1.7, FLY = 0.9;

  function drawShelves(ctx, L, sh, lt, n, o = {}) {
    sh.forEach((r, i) => {
      if (i >= n) return;
      const a = o.alpha ? o.alpha(i) : 1;
      const wig = o.wiggle ? o.wiggle(i) : 0;
      ctx.save(); ctx.translate(Math.sin(wig * Math.PI * 6) * 12 * wig, 0);
      S.shelf(ctx, r, { label: AREAS[i][0], color: P.alan[AREAS[i][1]], alpha: a, size: L.pick(n === 4 ? 30 : 28, 30), labelColor: AREAS[i][1] === 'ulasim' ? P.murekkep : P.sir });
      ctx.restore();
    });
  }

  function alanlar(ctx, L, lt, t) {
    const sh = shelves(L, 4);
    drawShelves(ctx, L, sh, lt, 4, { alpha: (i) => clamp(pop(lt, 0.4 + i * 0.15, 0.5) * 2) });
    // karolar: yığından raflara
    SORT.forEach((it, k) => {
      const pk = PILE_ORDER.indexOf(k);
      const [px, py] = pileSlot(L, pk);
      const rot0 = (M.hash(k, 9) - 0.5) * 0.5;
      const t0 = SORT_T0 + k * SORT_DT;
      const f = seg(lt, t0, t0 + FLY);
      const j = SORT.filter((s, q) => s.a === it.a && q < k).length;
      const [sx, sy] = slot(sh[it.a], j);
      const ef = E.inOut(f);
      const x = lerp(px, sx, ef), y = lerp(py, sy, ef) - Math.sin(f * Math.PI) * 160;
      const s0 = L.pick(130, 140), s1 = sh[it.a].ts;
      const ap = pop(lt, 1.0 + pk * 0.1, 0.45);
      const land = f >= 1 ? Math.sin(clamp((lt - t0 - FLY) / 0.3) * Math.PI) : 0;
      tile(ctx, x, y, lerp(s0, s1, ef) * (f > 0 ? 1 : ap) * (1 - land * 0.08), it.icon, P.alan[AREAS[it.a][1]], t, { alpha: clamp(ap * 2), rot: rot0 * (1 - ef) + Math.sin(f * Math.PI) * 0.4, glow: f > 0 && f < 1 ? 0.8 : land * 0.8 });
      // ad: rafta
      const nA = go(lt, t0 + FLY, t0 + FLY + 0.3);
      if (nA > 0) name(ctx, it.name, sx, sh[it.a].y + L.pick(282, 318), { size: 28, maxW: L.pick(200, 210), alpha: nA * (1 - go(lt, 17.2, 17.6)) });
    });
    // Karo sıralar
    const cur = clamp(Math.floor((lt - SORT_T0) / SORT_DT), -1, 7);
    const inThrow = cur >= 0 && lt - (SORT_T0 + cur * SORT_DT) < 0.5;
    const target = cur >= 0 ? sh[SORT[cur].a] : null;
    const kx = L.pick(140, 540), ky = L.pick(830, 1450), ks = L.pick(110, 82);
    const done = lt > SORT_T0 + 7 * SORT_DT + FLY + 0.2;
    K(ctx, {
      x: kx, y: ky, s: ks,
      mood: done ? 'proud' : cur < 0 ? 'thinking' : 'happy',
      caret: done ? 'ok' : cur < 0 ? '?' : 'dots',
      look: target ? [clamp((target.x - kx) / 500, -1, 1), -0.8] : [0.8, 0],
      armL: done ? 2.5 : 0.3, armR: inThrow ? 2.8 : done ? 2.5 : 0.6, squash: inThrow ? 1.06 : 1, seed: 5,
    }, t);
  }

  // ═══ 5 · YENİ BİR GRUP ══════════════════════════════════════
  const NEW = [{ icon: 'drone', name: 'Tarım dronu' }, { icon: 'soilSensor', name: 'Toprak sensörü' }];
  const USES = ['ödev', 'randevu', 'yol bulma', 'müzik', 'hava durumu'];

  function yeniraf(ctx, L, lt, t) {
    const REFLOW = 4.4, INTO = 5.6, PHONE = 8.0;
    const rf = go(lt, REFLOW, REFLOW + 0.8);
    const s4 = shelves(L, 4), s5 = shelves(L, 5);
    const sh = s5.map((r, i) => (i < 4 ? { x: lerp(s4[i].x, r.x, rf), y: lerp(s4[i].y, r.y, rf), w: lerp(s4[i].w, r.w, rf), h: lerp(s4[i].h, r.h, rf), ts: lerp(s4[i].ts, r.ts, rf), dx: lerp(s4[i].dx, r.dx, rf), ty: lerp(s4[i].ty, r.ty, rf) } : r));
    // dron rafları dener: 1.3 + i*0.6
    const tryT = (i) => 1.4 + i * 0.6;
    const wig = (i) => (i < 4 ? Math.max(0, 1 - Math.abs(lt - tryT(i) - 0.25) / 0.3) : 0);
    // telefon her alanda — önce çizgiler (rafların arkasında kalsın)
    const ph = pop(lt, PHONE, 0.6);
    const phx = L.pick(960, 540), phy = L.pick(700, 1300), phs = L.pick(150, 160);
    const useY = (r) => r.y + r.h - L.pick(60, 52);
    const useT = (i) => PHONE + 0.6 + i * 0.45;
    if (ph > 0.01) USES.forEach((u, i) => {
      const r = sh[i];
      S.arrow(ctx, phx, phy - phs / 2 - 10, r.x, useY(r) + 20, { p: go(lt, useT(i), useT(i) + 0.45), lw: 5, color: P.alan[AREAS[i][1]], dash: [4, 14], dashOffset: t * 40, head: false });
    });
    const p5 = pop(lt, REFLOW + 0.5, 0.6);
    drawShelves(ctx, L, sh, lt, 5, { alpha: (i) => (i < 4 ? 1 : clamp(p5 * 2)), wiggle: wig });
    // raflardaki karolar
    SORT.forEach((it, k) => {
      const j = SORT.filter((s, q) => s.a === it.a && q < k).length;
      const [x, y] = slot(sh[it.a], j);
      tile(ctx, x, y, sh[it.a].ts, it.icon, P.alan[AREAS[it.a][1]], t);
    });
    // yeni karolar
    NEW.forEach((it, j) => {
      const start = L.v ? [[380, 1180], [700, 1180]][j] : [[1420, 690], [1700, 690]][j];
      const enter = go(lt, 0.4 + j * 0.3, 1.2 + j * 0.3, E.out);
      let x = lerp(L.v ? start[0] : 2150, start[0], enter), y = lerp(L.v ? 2100 : start[1], start[1], enter);
      const ts = L.pick(130, 140);
      let s = ts;
      // dron rafların üstünden geçer
      if (j === 0 && lt > 1.2 && lt < INTO) {
        const hy = (i) => sh[i].y + sh[i].ty;
        const keys = [{ t: 1.2, x: start[0], y: start[1] }];
        for (let i = 0; i < 4; i++) keys.push({ t: tryT(i), x: sh[i].x, y: hy(i) }, { t: tryT(i) + 0.35, x: sh[i].x, y: hy(i) });
        keys.push({ t: tryT(3) + 0.9, x: start[0], y: start[1] });
        const k = track(keys, lt);
        x = k.x; y = k.y + Math.sin(lt * 9) * 6; s = ts * 0.85;
      }
      // tarım rafına
      const f = go(lt, INTO + j * 0.35, INTO + 0.9 + j * 0.35);
      if (f > 0) { const [sx, sy] = slot(sh[4], j); x = lerp(x, sx, f); y = lerp(y, sy, f) - Math.sin(f * Math.PI) * 120; s = lerp(s, sh[4].ts, f); }
      tile(ctx, x, y, s, it.icon, P.zumrut, t, { glow: lt > 1.2 && lt < INTO + 1.2 && j === 0 ? 0.6 : 0 });
      if (j === 0) {
        const no = Math.max(...[0, 1, 2, 3].map(wig));
        if (no > 0.05) {
          const bx = x + s * 0.48, by = y - s * 0.48, r = 26 * no;
          ctx.fillStyle = P.mercan; ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = P.sir; ctx.lineWidth = 6 * no; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(bx - r * 0.4, by - r * 0.4); ctx.lineTo(bx + r * 0.4, by + r * 0.4); ctx.moveTo(bx + r * 0.4, by - r * 0.4); ctx.lineTo(bx - r * 0.4, by + r * 0.4); ctx.stroke();
        }
      }
      const moving = j === 0 && lt > 1.15 && lt < tryT(3) + 0.9;
      const nA = (1 - go(lt, INTO - 0.4, INTO)) * (moving ? 0 : 1);
      name(ctx, it.name, x, y + s / 2 + 34, { size: 30, maxW: 220, alpha: nA * go(enter, 0.85, 1) });
    });

    if (ph > 0.01) {
      USES.forEach((u, i) => {
        const r = sh[i];
        const sc = pop(lt, useT(i) + 0.35, 0.4);
        S.chip(ctx, u, r.x, useY(r), { size: 28, fam: 'body', bg: P.alan[AREAS[i][1]], color: i === 2 ? P.murekkep : P.sir, alpha: clamp(sc * 2), scale: sc, maxW: r.w - 30, h: 48 });
      });
      tile(ctx, phx, phy, phs * ph, 'phone', P.turkuaz, t, { alpha: clamp(ph * 2), glow: 0.8 });
    }

    // Karo
    const worried = lt > 1.3 && lt < REFLOW;
    const kx = L.pick(150, 860), ky = L.pick(840, 1450), ks = L.pick(110, 86);
    K(ctx, {
      x: kx, y: ky, s: ks,
      mood: worried ? 'worried' : lt < REFLOW + 1.8 ? 'surprised' : 'proud',
      caret: worried ? '?' : lt < PHONE ? '!' : 'heart',
      look: lt > PHONE ? [clamp((phx - kx) / 400, -1, 1), 0] : [0.7, -0.8],
      armL: lt > REFLOW && lt < REFLOW + 1.6 ? 2.7 : 0.3, armR: lt > REFLOW && lt < REFLOW + 1.6 ? 2.7 : lt > PHONE ? 2.2 : 0.4, seed: 6,
    }, t);
  }

  // ═══ 6 · AKLINDA KALSIN ═════════════════════════════════════
  const SUM = [
    { icon: 'info', c: P.kobalt, s: 'Bilişim = bilgi + iletişim + teknoloji', at: 0.6 },
    { icon: 'typewriter', c: P.mercan, s: 'Dün ve bugün: aynı iş, farklı güç', at: 3.0 },
    { icon: 'smartboard', c: P.safran, s: 'Kullanım alanına göre grupla', at: 6.4 },
  ];
  function akilda(ctx, L, lt, t) {
    T.text(ctx, 'Aklında kalsın', L.pick(330, 70), L.pick(150, 270), { size: L.pick(52, 60), fam: 'display', align: 'left', color: P.safran, alpha: go(lt, 0.1, 0.5) });
    SUM.forEach((it, i) => {
      const p = pop(lt, it.at, 0.55);
      const a = clamp(p * 2);
      const y = L.pick(300 + i * 175, 470 + i * 270);
      const tx = L.pick(330, 150);
      ctx.save(); ctx.globalAlpha *= a;
      ctx.fillStyle = 'rgba(28,42,92,0.85)';
      S.rrect(ctx, tx - 20 + (1 - p) * 60, y - L.pick(72, 110), L.pick(1250, 900), L.pick(144, 220), 30); ctx.fill();
      ctx.restore();
      tile(ctx, tx + L.pick(50, 55), y, L.pick(110, 140) * p, it.icon, it.c, t, { alpha: a });
      T.para(ctx, it.s, tx + L.pick(140, 170), y, { size: L.pick(44, 48), maxW: L.pick(1040, 640), align: 'left', vcenter: true, color: P.sir, alpha: a });
    });
    K(ctx, { x: L.pick(1720, 540), y: L.pick(800, 1340), s: L.pick(140, 130), mood: 'proud', caret: lt > 8.5 ? 'heart' : 'ok', look: [L.pick(-0.8, 0), -0.4], armL: 2.6 + Math.sin(lt * 4) * 0.2, armR: 0.4, seed: 7 }, t);
    const ea = go(lt, 8.6, 9.2);
    T.text(ctx, 'Bilişim Filmleri  ·  Hakan Ataş  ·  CC BY-NC 4.0', L.pick(L.cx - 100, L.cx), L.pick(820, 1425), { size: 28, weight: 600, color: P.turkuazA, alpha: ea, maxW: L.W - 140 });
  }


  // ═══ SES OLAYLARI / Sound cues (hikâye zamanı, sahne içi) ═══════
  // at: sahnenin başından hikâye saniyesi; sfx: src/audio/synth.js'teki efekt adı.
  // Zamanlar yukarıdaki animasyon sabitlerinden hesaplanır, görüntüyle birlikte kayar.
  (function cues() {
    const pentaUp = (i) => Math.pow(2, [0, 2, 4, 7, 9, 12, 14, 16, 19, 21][i % 10] / 12);
    // yuvarlanma: her 90°'de bir "tok" (inOut kolaylaştırmanın tersi ikiye bölmeyle)
    const rolls = (a, b, dist, s, pan) => {
      const n = Math.floor(Math.abs(dist) / s), out = [];
      for (let j = 1; j <= n; j++) {
        let lo = 0, hi = 1;
        for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; if (E.inOut(m) < j / (Math.abs(dist) / s)) lo = m; else hi = m; }
        out.push({ at: a + lo * (b - a), sfx: 'roll', pan });
      }
      return out;
    };
    const C = {};
    C.gunaydin = [
      { at: 0.05, sfx: 'karo', mood: 'snore' }, { at: 0.55, sfx: 'alarm', dur: 2.0 },
      { at: 0.3, sfx: 'whoosh', dur: 0.8, gain: 0.5 },
      { at: 1.75, sfx: 'karo', mood: 'surprised' }, { at: 2.25, sfx: 'land' },
      { at: 2.9, sfx: 'karo', mood: 'happy' },
      ...INTRO.map((it, i) => (it.phone ? null : { at: 3.3 + i * 0.3, sfx: 'pop', pitch: pentaUp(i), pan: i < 5 ? -0.5 : 0.5 })).filter(Boolean),
      { at: 6.8, sfx: 'karo', mood: 'question' },
    ];
    C.kavramlar = [
      ...CONCEPTS.map((c, i) => ({ at: c.at, sfx: 'ding', f: [784, 988, 1175][i], pan: (i - 1) * 0.5 })),
      ...rolls(5.2, 6.2, 560, 110, -0.3), ...rolls(10.0, 11.0, 560, 110, 0.3), ...rolls(14.0, 15.0, 180, 110, 0.6),
      { at: 14.4, sfx: 'pop', pitch: 1 }, { at: 14.55, sfx: 'pop', pitch: 1.12 }, { at: 14.7, sfx: 'pop', pitch: 1.26 },
      { at: 14.9, sfx: 'whoosh', dur: 0.35, gain: 0.6 },
      { at: 15.2, sfx: 'chord', root: 60 }, { at: 15.4, sfx: 'karo', mood: 'proud', pan: 0.6 },
      ...VERBS.map((v, i) => ({ at: 15.8 + i * 0.25, sfx: 'pop', pitch: pentaUp(i + 2), gain: 0.8 })),
      { at: 16.8, sfx: 'pop', pitch: 0.8 },
    ];
    C.dunbugun = [];
    PAIRS.forEach((pr, i) => {
      const P0 = 0.6 + i * 5.9;
      C.dunbugun.push(
        { at: P0, sfx: 'pop', pitch: 0.85, pan: -0.5 }, { at: P0 + 0.2, sfx: 'karo', mood: 'question', pan: -0.7 },
        { at: P0 + 0.5, sfx: 'pop', pitch: 1.1, pan: 0.5 }, { at: P0 + 1.1, sfx: 'ding', f: 880 },
        { at: P0 + 2.1, sfx: 'pop', pitch: 0.75, gain: 0.7 }, { at: P0 + 2.45, sfx: 'pop', pitch: 0.9, gain: 0.7 }, { at: P0 + 2.8, sfx: 'pop', pitch: 1.0, gain: 0.7 },
        { at: P0 + 2.3, sfx: 'karo', mood: 'happy', pan: -0.7 },
      );
      if (i < 2) C.dunbugun.push({ at: P0 + 5.3, sfx: 'whoosh', dur: 0.45, up: false, gain: 0.6 });
    });
    C.alanlar = [
      ...[0, 1, 2, 3].map((i) => ({ at: 0.4 + i * 0.15, sfx: 'pop', pitch: 0.6 + i * 0.08, pan: (i - 1.5) * 0.5 })),
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((k) => ({ at: 1.0 + k * 0.1, sfx: 'pop', pitch: 1.2 + k * 0.05, gain: 0.5 })),
      { at: 1.6, sfx: 'karo', mood: 'question', pan: -0.8 },
    ];
    SORT.forEach((it, k) => {
      const t0 = SORT_T0 + k * SORT_DT, pan = (it.a - 1.5) * 0.45;
      C.alanlar.push({ at: t0, sfx: 'whoosh', dur: FLY, pan, gain: 0.7 }, { at: t0 + FLY, sfx: 'land', pitch: [1, 1.12, 1.26, 1.5][it.a], pan });
    });
    C.alanlar.push({ at: SORT_T0 + 7 * SORT_DT + FLY + 0.25, sfx: 'karo', mood: 'proud', pan: -0.8 }, { at: SORT_T0 + 7 * SORT_DT + FLY + 0.3, sfx: 'sparkle' });
    C.yeniraf = [
      { at: 0.4, sfx: 'whoosh', dur: 0.8, up: false, pan: 0.7 }, { at: 0.7, sfx: 'whoosh', dur: 0.8, up: false, pan: 0.8 },
      { at: 1.4, sfx: 'karo', mood: 'worried', pan: -0.8 },
      ...[0, 1, 2, 3].map((i) => ({ at: 1.4 + i * 0.6 + 0.2, sfx: 'no', pan: (i - 1.5) * 0.45 })),
      { at: 4.4, sfx: 'whoosh', dur: 0.8, gain: 0.6 }, { at: 4.9, sfx: 'chord', root: 67 }, { at: 5.0, sfx: 'karo', mood: 'surprised', pan: -0.8 },
      { at: 5.6, sfx: 'whoosh', dur: 0.9, pan: 0.5 }, { at: 6.5, sfx: 'land', pitch: 1.6, pan: 0.7 }, { at: 6.85, sfx: 'land', pitch: 1.8, pan: 0.7 },
      { at: 7.0, sfx: 'karo', mood: 'happy', pan: -0.8 },
      { at: 8.0, sfx: 'pop', pitch: 0.7, gain: 1.2 }, { at: 8.2, sfx: 'ding', f: 1319 },
      ...USES.map((u, i) => ({ at: 8.6 + i * 0.45 + 0.35, sfx: 'pop', pitch: pentaUp(i + 3), gain: 0.8, pan: (i - 2) * 0.35 })),
      { at: 9.2, sfx: 'karo', mood: 'heart', pan: -0.8 },
    ];
    C.akilda = [
      { at: 0.1, sfx: 'whoosh', dur: 0.5, gain: 0.5 },
      ...SUM.map((it, i) => ({ at: it.at, sfx: 'ding', f: [784, 988, 1175][i] })),
      { at: 7.2, sfx: 'karo', mood: 'proud', pan: 0.6 }, { at: 7.3, sfx: 'sparkle' },
      { at: 8.5, sfx: 'karo', mood: 'heart', pan: 0.6 },
    ];
    BF.CUES = C;
  })();

  BF.scenes = { gunaydin, kavramlar, dunbugun, alanlar, yeniraf, akilda };
})(typeof window !== 'undefined' ? window : globalThis);
