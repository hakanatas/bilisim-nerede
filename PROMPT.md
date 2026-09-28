# Prompt · İstem

Bu animasyonu üretmek için Claude'a verilen istem, hiç değiştirilmeden.
The prompt given to Claude to produce this animation, unedited.

## Bağlam / Context

Serinin ilk filmi. İstemin ardından Claude iki soru sordu; yanıtlar: önce bir pilot film (motor, karakter, ilk film, hub sayfası ve yayın betiği) yapılıp görsel dil onaylandıktan sonra müfredat sırasıyla devam edilecek; hub sayfasında FTC 24230 AG Robotik takım atfı ve logosu yer alacak. Öğrenme çıktısı ve alt maddeleri MEB'in resmî öğretim programı PDF'inden (tymm.meb.gov.tr, Eylül 2025) birebir alındı.

This is the first film of the series. After the prompt, Claude asked two questions; the answers: first make a pilot (engine, character, first film, hub page and publishing script) and continue in curriculum order once the visual language is approved; the hub page credits the FTC 24230 AG Robotik team with its logo. The learning outcome and its sub-items were copied verbatim from MEB's official curriculum PDF (tymm.meb.gov.tr, September 2025).

```text
# Bilişim Filmleri — seri özeti

Ben Hakan Ataş (GitHub: hakanatas), matematik ve bilişim öğretmeniyim. Daha önce "Nokta'nın Filmleri" serisini yaptık: ortaokul matematiğin her öğrenme çıktısı için JavaScript ile prosedürel çizilen 92 saniyelik animasyonlar (https://hakanatas.github.io/nokta-filmleri). Şimdi aynı üretim düzeniyle ama yepyeni bir görsel dil ve karakterle ortaokul Bilişim Teknolojileri ve Yazılım dersi için bir seri istiyorum.

## İçerik
- Kaynak: MEB Türkiye Yüzyılı Maarif Modeli, ortaokul Bilişim Teknolojileri ve Yazılım öğretim programı (tymm.meb.gov.tr). Öğrenme çıktılarını ve alt maddelerini oradan birebir al; özetleme, uydurma.
- Her öğrenme çıktısı için bir film; müfredat sırasıyla, sınıf sınıf.
- Öğrencinin takip etmesi kolay olsun: sahne başına tek fikir, kısa cümleler, somut ve öğrencinin hayatından örnekler, sonda "aklında kalsın" özeti.

## Görsel dil (Nokta serisinden bilerek farklı)
- Nokta serisinin krem kâğıt, siyah mürekkep, tek amber vurgu ve el çizimi çizgi estetiğini tekrar etme.
- Bu seri renkli olsun: kendine özgü, tutarlı bir palet (token olarak tanımlanmış), net şekiller. Bilişime uygun ama klişe olmayan tek bir estetik yön seç ve tutarlı kullan.
- Karakter yeni ve özgün olsun; bilinen bir maskota, robota ya da çizgi film karakterine benzemesin. Konuşmadan, jest ve yüz ifadesiyle anlatabilsin. Pozları ve ifadeleri zamanın fonksiyonu olarak çizilsin.
- Font: Türkçe karakterleri tam destekleyen, karakterli bir yazı tipi; Inter, Roboto, Arial gibi jenerik fontlar olmasın.

## Teknik düzen (Nokta serisinde işe yarayan)
- Her film tek HTML sayfası ve saf JavaScript, Canvas 2D. Her kare renderFrame(t) ile zamanın saf fonksiyonu, rastgelelik tohumlu; ekran kaydı yok.
- 92 saniye, 6 sahne (yaklaşık 10 sn giriş, 3–4 ana sahne, özet). 16:9 ve 9:16 düzen.
- Altyazılar Türkçe, İngilizce ya da ikisi birlikte seçilebilsin; captions.js'de öğretmen için seslendirme notları olsun.
- Playwright ile kare kare MP4 (yatay ve dikey) ve SRT dışa aktarımı.
- Her film ayrı bir GitHub deposu ve GitHub Pages sayfası. README'de TR özet, birebir öğrenme çıktısı, sahne tablosu ve çalıştırma bilgisi olsun; PROMPT.md verilen istemi birebir içersin. v1.0 sürümünde 6 dosya: yatay ve dikey 720p MP4, TR SRT, EN SRT, iki dilli SRT, seslendirme notları.
- Bütün filmleri toplayan, sınıf seçicili bir hub sayfası (ayrı depo).
- Lisans: CC BY-NC 4.0 (atıf zorunlu, ticari olmayan kullanım). README'de iki dilli lisans bölümü ve hazır atıf metni olsun.

## Yayınlama (öğrendiklerimiz)
- Yükleme Chrome ile değil, Mac'imdeki gh ile yapılsın (kurulu ve girişli). Sen depoları ve bir betiği bağlı klasöre koy, ben Terminal'de tek komutla çalıştırayım. Betikler tekrar çalıştırılabilir olsun, biten işleri atlasın.
- MP4 üretimi Mac'te yapılsın: Playwright yüklü Google Chrome'u channel: 'chrome' ile kullansın (kendi Chromium indirmesi Mac'imde takılıyor), ffmpeg -nostdin ile çalışsın, komut caffeinate -dis ile başlasın.
- Her filmde yatay ve dikey önizleme karelerini üret ve kendin bak: üst üste binen yazı, kenardan taşan metin, okunmayan küçük yazı kalmasın.
```

## Sonraki istem / Follow-up prompt

Pilot izlendikten sonra verilen istem, hiç değiştirilmeden. Ardından Claude iki soru sordu; yanıtlar: film yaklaşık 2,5 dakikaya (150 sn) yavaşlatılsın; ses olarak efektler ve hafif bir fon müziği olsun.

The follow-up prompt after the pilot was watched, unedited. Claude then asked two questions; the answers: slow the film down to about 2.5 minutes (150 s); add sound effects and a quiet background tune.

```text
videolar çok hızlı çocuklar bunları okuyamaz daha yavaş hale getirelim videoyu . Ayrıca hiç ses yok sanki efektler olsa çok güzel olur gibi.
```
