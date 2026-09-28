/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end film saniyesi (izlenen süre; SRT ile aynı).
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 2.3, end: 7.5, tr: 'Alarm çaldı. Günaydın, Karo!', en: 'The alarm rings. Good morning, Karo!',
      note: 'Sabah oldu, telefonun alarmı çaldı. Günaydın Karo! Daha gözünü açar açmaz bir bilişim teknolojisi kullandı bile.' },
    { scene: 1, start: 8.2, end: 16.0, tr: 'Bugün kaç bilişim teknolojisi kullanacaksın?', en: 'How many IT tools will you use today?',
      note: 'Tablet, akıllı tahta, ulaşım kartı, navigasyon... Sence bugün kaç bilişim teknolojisi kullanacaksın? Bu filmde onları tanıyıp gruplara ayıracağız.' },
    { scene: 2, start: 17.6, end: 25.1, tr: 'Bilgi: işimize yarayan, anlamlı haber', en: 'Information: meaningful news we can use',
      note: 'Önce dört kavram. Bilgi, işimize yarayan anlamlı haberdir: “Bugün hava 18 derece” bir bilgidir; ceketini ona göre seçersin.' },
    { scene: 2, start: 25.8, end: 32.9, tr: 'İletişim: bilginin birinden diğerine ulaşması', en: 'Communication: information reaching someone else',
      note: 'İletişim, bilginin bir kişiden ya da yerden diğerine ulaşmasıdır. Arkadaşına mesaj attığında iletişim kurarsın.' },
    { scene: 2, start: 33.6, end: 39.1, tr: 'Teknoloji: işi kolaylaştıran araç ve yöntemler', en: 'Technology: tools and methods that make work easier',
      note: 'Teknoloji, işimizi kolaylaştıran araçlar ve yöntemlerdir.' },
    { scene: 2, start: 39.8, end: 45.3, tr: 'Bilişim: bilgiyi teknolojiyle işlemek ve iletmek', en: 'IT: handling and sharing information with technology',
      note: 'Bu üçü birleşince bilişim olur: bilgiyi teknolojiyle toplamak, işlemek, saklamak ve iletmek. Bu araçlara bilgi ve iletişim teknolojileri, kısaca BİT denir.' },
    { scene: 3, start: 47.0, end: 55.8, tr: 'Daktilo ve dizüstü: ikisi de yazı yazar', en: 'Typewriter and laptop: both are for writing',
      note: 'Geçmişle bugünü karşılaştıralım. Daktilo ile dizüstü bilgisayar aynı işi yapar: yazı yazmak. Ama bilgisayarda yazıyı silip düzeltebilir, kaydedip paylaşabilirsin.' },
    { scene: 3, start: 56.7, end: 65.2, tr: 'Teyp ve telefon: ikisi de müzik çalar', en: 'Tape player and phone: both play music',
      note: 'Teyp de akıllı telefon da müzik çalar. Kasete birkaç şarkı sığardı; telefon ise binlerce şarkıyı cebinde taşır.' },
    { scene: 3, start: 65.9, end: 74.7, tr: 'Aynı iş, ama daha küçük, hızlı ve bağlantılı', en: 'Same job, but smaller, faster and connected',
      note: 'İlk bilgisayarlar bir odayı dolduruyordu. Bugün avucumuzdaki telefon aynı işi milyonlarca kat hızlı yapıyor. Benzerlik: iş aynı. Farklılık: boyut, hız ve bağlantı.' },
    { scene: 4, start: 76.3, end: 85.4, tr: 'Her teknolojiyi kullanıldığı alana göre grupla', en: 'Group each technology by where it is used',
      note: 'Şimdi gruplandıralım. Her teknolojiyi en çok kullanıldığı alana koyalım: eğitim, sağlık, ulaşım ve eğlence.' },
    { scene: 4, start: 86.1, end: 94.9, tr: 'Akıllı tahta: eğitim. Hasta monitörü: sağlık.', en: 'Smart board: education. Patient monitor: health.',
      note: 'Akıllı tahta ve çevrim içi ders eğitim rafına; hasta monitörü ve MR cihazı sağlık rafına gider.' },
    { scene: 4, start: 95.5, end: 103.7, tr: 'Navigasyon: ulaşım. Yeşil ekran: eğlence.', en: 'Navigation: transport. Green screen: entertainment.',
      note: 'Navigasyon ve toplu taşıma kartı ulaşım rafına; filmlerde kullanılan yeşil ekran ve oyun konsolu eğlence rafına gider.' },
    { scene: 5, start: 105.7, end: 116.7, tr: 'Tarım dronu nereye? Yeni bir grup açılır: Tarım', en: 'Where does a farm drone go? A new group: Farming',
      note: 'Tarlayı ilaçlayan dron ve topraktaki nem sensörü hiçbir rafa uymuyor. O zaman yeni bir grup açarız: tarım. Gruplar, yeni teknolojiler geldikçe genişler.' },
    { scene: 5, start: 117.7, end: 129.8, tr: 'Akıllı telefon birçok alanda kullanılır', en: 'A smartphone is used in many areas',
      note: 'Bazı teknolojiler tek bir rafa sığmaz. Akıllı telefonla ödev yaparsın, randevu alırsın, yol bulursun, müzik dinlersin, hava durumuna bakarsın.' },
    { scene: 6, start: 131.7, end: 140.2, tr: 'Bilişim: bilgi, iletişim ve teknoloji bir arada', en: 'IT: information, communication and technology together',
      note: 'Aklında kalsın: bilişim, bilgi, iletişim ve teknolojinin bir araya gelmesidir.' },
    { scene: 6, start: 140.9, end: 149.0, tr: 'Dünü bugünle karşılaştır, kullanım alanına göre grupla!', en: 'Compare then and now, group by use!',
      note: 'Geçmişteki ve bugünkü teknolojileri karşılaştır; benzerliklerini ve farklılıklarını bul. Sonra onları kullanım alanlarına göre grupla!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.BF = root.BF || {}; root.BF.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
