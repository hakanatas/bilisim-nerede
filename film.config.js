/* ─────────────────────────────────────────────────────────────
   FİLM KİMLİĞİ / Film identity — başlık, öğrenme çıktısı, sahneler.

   İki zaman var:
   • hikâye zamanı (STORY): sahne kodu (scenes/film.js) bu saniyelerle yazılır;
   • film zamanı: izlenen süre = STORY × TEMPO. Tempo büyüdükçe film yavaşlar,
     her altyazı ekranda daha uzun kalır. Göz kırpma, nefes, dönen makaralar
     gibi "ortam" hareketleri gerçek zamanla akar, yavaşlamaz.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const STORY = 92;          // sahnelerin yazıldığı süre (sn)
  const DURATION = 150;      // izlenen süre (sn) ≈ 2,5 dk
  const TEMPO = DURATION / STORY;

  const META = {
    slug: 'bilisim-nerede',
    title: 'Bilişim Nerede?',
    titleEn: 'Where Is IT?',
    grade: 5,
    theme: 'Bilişim Teknolojilerinin Hayatımızdaki Yeri',
    code: 'BTY.5.1.1',
    outcome: 'Günlük yaşamda kullanılan bilişim teknolojilerini sınıflandırabilme',
    outcomeEn: 'Classifying the information technologies used in daily life',
    story: STORY,
    duration: DURATION,
    tempo: TEMPO,
  };
  // s0/s1: hikâye zamanı; t0/t1: film zamanı (hesaplanır)
  const SCENES = [
    { id: 'gunaydin', s0: 0, s1: 10, name: 'Günaydın', en: 'Good morning', concept: 'Bilişim her yerde', noHeader: true },
    { id: 'kavramlar', s0: 10, s1: 28, name: 'Kavramlar', en: 'Key ideas', concept: 'Bilgi, iletişim, teknoloji, bilişim' },
    { id: 'dunbugun', s0: 28, s1: 46, name: 'Dün ve bugün', en: 'Then and now', concept: 'Benzerlik ve farklılık' },
    { id: 'alanlar', s0: 46, s1: 64, name: 'Kullanım alanları', en: 'Areas of use', concept: 'Gruplandırma' },
    { id: 'yeniraf', s0: 64, s1: 80, name: 'Yeni bir grup', en: 'A new group', concept: 'Gruplar genişler' },
    { id: 'akilda', s0: 80, s1: 92, name: 'Aklında kalsın', en: 'Remember', concept: 'Özet' },
  ].map((s) => Object.assign(s, { t0: +(s.s0 * TEMPO).toFixed(3), t1: +(s.s1 * TEMPO).toFixed(3) }));

  if (typeof module !== 'undefined' && module.exports) module.exports = { META, SCENES };
  else { root.BF = root.BF || {}; root.BF.META = META; root.BF.SCENES = SCENES; }
})(typeof window !== 'undefined' ? window : globalThis);
