import fs from 'node:fs';
import sharp from 'sharp';
const dir = 'public/yeni görsel';
const files = fs.readdirSync(dir).sort();
// Source photo index, descriptive title, style, placement.
const selected = [
  [1, 'Kol boyunca siyah ve gri kompozisyon', 'Realism', 'Kol'],
  [6, 'Portre ve yazı kompozisyonu', 'Realism', 'Üst kol'],
  [9, 'Güneş ve bulutlar', 'Blackwork', 'Ön kol'],
  [23, 'Dallanan çizgiler', 'Blackwork', 'El ve ön kol'],
  [31, 'Geometrik desen', 'Ornamental', 'Baldır'],
  [38, 'Ejderha kompozisyonu', 'Realism', 'Kol'],
  [0, 'Küçük figür ve örümcek ağı', 'Illustrative', 'Ön kol'],
  [2, 'Örümcek ağı', 'Blackwork', 'Dirsek'],
  [3, 'Figür ve kırlangıç', 'Illustrative', 'Ön kol'],
  [4, '81', 'Lettering', 'Üst kol'],
  [5, 'İskelet figürü', 'Illustrative', 'Ön kol'],
  [7, 'El üzerinde figür kompozisyonu', 'Illustrative', 'El'],
  [8, 'Mitolojik figür', 'Illustrative', 'Üst kol'],
  [10, 'Küçük figür çalışması', 'Illustrative', 'Kol'],
  [11, 'Figürlerle kol kompozisyonu', 'Illustrative', 'Kol'],
  [12, 'Miğfer', 'Blackwork', 'Üst kol'],
  [13, 'Portre ve yazı', 'Realism', 'Üst kol'],
  [16, 'Portre kompozisyonu', 'Realism', 'Ön kol'],
  [17, 'El üzerinde yazı', 'Lettering', 'El'],
  [18, 'İnce çizgili dallar', 'Fine Line', 'Üst kol'],
  [19, 'İnce çizgili bacak çalışması', 'Fine Line', 'Baldır'],
  [20, 'Yüz kompozisyonu', 'Realism', 'Ön kol'],
  [21, 'Uğur böceği ve küçük motifler', 'Illustrative', 'Ön kol'],
  [24, 'Sırtta ince çizgili figür', 'Fine Line', 'Sırt'],
  [25, 'Omuzda siyah ve gri kompozisyon', 'Realism', 'Üst kol'],
  [27, 'Figür ve saat', 'Realism', 'Ön kol'],
  [29, 'Ön kolda kaligrafi', 'Lettering', 'Ön kol'],
  [30, 'Dikey kaligrafi', 'Lettering', 'Ön kol'],
  [32, 'Küçük figürler', 'Illustrative', 'Kol'],
  [37, 'Kadın yüzü', 'Realism', 'Ön kol'],
  [39, 'Portre ve akışkan çizgiler', 'Realism', 'Ön kol'],
  [40, 'Figürlerle bütün kol çalışması', 'Realism', 'Kol'],
  [41, 'Ön kolda portre', 'Realism', 'Ön kol'],
  [42, 'Gözler', 'Fine Line', 'Ön kol'],
  [43, 'İki kolda desen çalışması', 'Ornamental', 'Ön kol'],
  [45, 'Siyah ve gri kol çalışması', 'Realism', 'Kol'],
  [47, 'Yıldız ve dalga motifleri', 'Blackwork', 'Ön kol'],
  [48, 'Detaylı figür kompozisyonu', 'Realism', 'Kol'],
  [49, 'Pusula ve figürler', 'Illustrative', 'Ön kol'],
];
fs.mkdirSync('public/tattoos/portfolio', { recursive: true });
const photos = [];
for (const [index, title, style, placement] of selected) {
  const file = `tattoo-${String(photos.length + 1).padStart(2, '0')}.webp`;
  const info = await sharp(`${dir}/${files[index]}`).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toFile(`public/tattoos/portfolio/${file}`);
  photos.push({ file: `/tattoos/portfolio/${file}`, width: info.width, height: info.height, title, style, placement, alt: `Tattoo station tarafından yapılan dövme: ${title.toLocaleLowerCase('tr')}`, source: files[index] });
}
fs.writeFileSync('src/content/tattoo-photos.json', JSON.stringify(photos, null, 2) + '\n');
console.log(`${photos.length} portfolio photos prepared.`);
