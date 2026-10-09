/**
 * Dövme bakım rehberi ve SSS içeriği. Genel bilgilendirme amaçlıdır; sanatçının
 * seans sonunda verdiği talimatlar her zaman önceliklidir. İşletmeye özgü bir
 * politika (kapora, iptal süresi vb.) burada bilerek yer almaz.
 */
export const CARE_STEPS: { title: string; body: string }[] = [
  {
    title: "İlk saatler",
    body: "Seans sonunda yapılan kapamayı, sanatçının söylediği süre boyunca çıkarma. Çıkardıktan sonra elini yıkayarak dövmeyi ılık su ve kokusuz, yumuşak bir sabunla nazikçe temizle; tahriş etmeden temiz bir kâğıt havluyla kurula.",
  },
  {
    title: "İlk günler",
    body: "Bölgeyi temiz ve kuru tut. Sanatçının önerdiği bakım ürününü çok ince bir tabaka hâlinde, yalnızca gerektiği kadar uygula. Kalın krem tabakası cildin nefes almasını zorlaştırabilir.",
  },
  {
    title: "Kabuklanma ve kaşıntı",
    body: "Kabuklanma ve hafif kaşıntı iyileşmenin parçası olabilir. Kabukları koparma, kaşıma. Kaşıntı rahatsız ediyorsa bölgeye temiz elle hafifçe dokunmak yeterli.",
  },
  {
    title: "Kaçınılması gerekenler",
    body: "İyileşme sürecinde havuz, deniz, sauna, uzun banyo ve doğrudan güneşten uzak dur. Bölgeyi sıkan, sürtünen kıyafetler yerine bol ve temiz kumaşlar tercih et.",
  },
  {
    title: "Uzun vadede",
    body: "İyileşme tamamlandıktan sonra güneş, dövmenin en büyük düşmanıdır. Güneşe çıkarken yüksek korumalı güneş kremi kullanmak çizgilerin ve tonların uzun süre net kalmasına yardımcı olur.",
  },
  {
    title: "Ne zaman destek almalı?",
    body: "Artan kızarıklık, şişlik, ısı, akıntı, ateş ya da geçmeyen ağrı gibi durumlarda vakit kaybetmeden bir sağlık profesyoneline başvur. Bu rehber tıbbi tavsiye yerine geçmez.",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Randevu talebi kesin randevu anlamına mı geliyor?",
    a: "Hayır. Form bir taleptir. Fikrini inceledikten sonra tarih, süre ve detaylar için seninle iletişime geçeriz; randevu bu görüşmeyle netleşir.",
  },
  {
    q: "Referans görsel göndermem gerekiyor mu?",
    a: "Zorunlu değil, ama faydalı. Beğendiğin bir stil, kompozisyon ya da his varsa görsel eklemek fikrini daha iyi anlamamızı sağlar. Başka sanatçıların çalışmaları yalnızca referans olarak kullanılır; birebir kopyalanmaz.",
  },
  {
    q: "Fake skin eser nedir?",
    a: "Fake skin, dövme için geliştirilmiş sentetik bir deri yüzeyidir. Store’daki eserler bu yüzeye, tende kullanılan makine, iğne ve mürekkeple elle işlenir. Baskı, çıkartma ya da geçici dövme değildir.",
  },
  {
    q: "“Tek Eser” ne demek?",
    a: "1/1 olarak işaretlenen eserlerden yalnızca bir tane vardır. Satıldığında yeniden üretilmez; sayfası arşivde kayıt olarak kalır.",
  },
  {
    q: "Bir eser “Şu an rezerve” görünüyor. Ne anlama geliyor?",
    a: "Başka bir ziyaretçi o eserin ödeme adımında. Ödeme kısa süre içinde tamamlanmazsa eser kendiliğinden yeniden satışa açılır.",
  },
  {
    q: "Satın almak için üye olmam gerekiyor mu?",
    a: "Hayır. Misafir olarak sipariş verebilirsin. Kart bilgilerin bu sitede saklanmaz; ödeme, ödeme kuruluşunun güvenli sayfasında alınır.",
  },
  {
    q: "Eserim ne zaman gönderilir?",
    a: "Teslimat bilgisi her eserin kendi sayfasında yer alır. Belirtilmemişse sipariş öncesinde ya da sonrasında bize yazarak öğrenebilirsin.",
  },
];
