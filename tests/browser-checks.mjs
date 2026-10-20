// Verifikasi acceptance criteria FocusFlow. Dependensi pengujian berada di luar aplikasi.
// Jalankan server statis terlebih dahulu; lihat README.md untuk perintah lengkap.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const modulePath = process.env.PLAYWRIGHT_MODULE || '/tmp/focusflow-qa/node_modules/playwright/index.mjs';
const { chromium } = await import(pathToFileURL(modulePath));
const executablePath = process.env.CHROME_BIN || '/tmp/focusflow-qa/chrome/opt/google/chrome/chrome';
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const outputDir = process.env.QA_OUTPUT || '/tmp/focusflow-qa/results';
const zoomOnly = process.argv.includes('--zoom-only');
await fs.mkdir(outputDir, { recursive: true });

const result = { date: new Date().toISOString(), baseURL, executablePath, coverageNote: 'Suite ini hanya menguji Chrome. AC-13 secara keseluruhan juga memerlukan Firefox; hasil bagian Chrome tidak membuktikan kelulusan penuh AC-13.', checks: [], screenshots: [], sourceHashes: {} };
for (const file of ['index.html', 'styles.css', 'assets/favicon.svg']) {
  result.sourceHashes[file] = createHash('sha256').update(await fs.readFile(file)).digest('hex');
}
const browser = await chromium.launch({ executablePath, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
result.browserVersion = await browser.version();

async function check(id, name, run) {
  try {
    const detail = await run();
    result.checks.push({ id, name, status: 'lulus', detail });
    console.log(`LULUS ${id}: ${name}`);
  } catch (error) {
    result.checks.push({ id, name, status: 'gagal', detail: error.message });
    console.error(`GAGAL ${id}: ${name}: ${error.message}`);
  }
}
const normalize = text => text.replace(/\s+/g, ' ').trim();
const titles = ['Prioritas Harian', 'Sesi Fokus', 'Ringkasan Progres'];
const descriptions = [
  'Pilih tugas terpenting agar energi tersalurkan ke pekerjaan yang paling berarti.',
  'Bangun kebiasaan bekerja dalam sesi terarah dengan jeda yang seimbang.',
  'Pahami kemajuan harian untuk merencanakan langkah berikutnya.'
];
async function targetVisible(page) {
  assert.equal(new URL(page.url()).pathname, '/');
  assert.equal(new URL(page.url()).hash, '#fitur');
  const box = await page.locator('#fitur').boundingBox();
  assert.ok(box.y >= 0 && box.y < (await page.evaluate(() => innerHeight)), `Awal fitur tidak terlihat: ${box.y}`);
}
async function layout(page) {
  const state = await page.evaluate(() => {
    const rect = element => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    };
    const outside = [...document.querySelectorAll('h1,h2,h3,p,a,.brand')].filter(element => {
      const r = element.getBoundingClientRect();
      return r.x < -1 || r.right > innerWidth + 1 || r.width < 1 || r.height < 1;
    }).map(element => element.textContent.trim());
    return {
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      outside,
      cards: [...document.querySelectorAll('article')].map(rect),
      sections: [...document.querySelectorAll('main > section, body > footer')].map(rect)
    };
  });
  assert.ok(state.scrollWidth <= state.viewport.width, JSON.stringify(state));
  assert.deepEqual(state.outside, []);
  for (let i = 1; i < state.sections.length; i++) {
    const previous = state.sections[i - 1];
    assert.ok(previous.y + previous.height <= state.sections[i].y + 1, 'Section bertumpang tindih');
  }
  if (state.viewport.width === 320) {
    assert.ok(state.cards.every(card => Math.abs(card.x - state.cards[0].x) < 1));
    assert.ok(state.cards[1].y >= state.cards[0].y + state.cards[0].height);
  }
  return state;
}

if (!zoomOnly) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const requests = [], errors = [];
  page.on('request', request => requests.push({ url: request.url(), method: request.method(), type: request.resourceType() }));
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));

  await check('AC-01', 'Rute, judul, dan urutan section', async () => {
    const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.title(), 'FocusFlow — Fokus pada yang penting');
    assert.equal(await page.locator('main > section').count(), 3);
    assert.deepEqual(await page.locator('main > section').evaluateAll(elements => elements.map(element => element.classList[0])), ['hero', 'features', 'closing-section']);
    assert.equal(await page.locator('body > footer').count(), 1);
  });
  await check('AC-02', 'Hero dan naskah yang disetujui', async () => {
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(normalize(await page.locator('h1').innerText()), 'Fokus lebih jernih, tuntaskan yang penting.');
    assert.equal(await page.locator('.brand').innerText(), 'FocusFlow');
    assert.equal(await page.locator('.hero-description').innerText(), 'Tentukan prioritas, bangun sesi fokus, dan lihat progresmu dalam satu alur yang sederhana.');
  });
  await check('AC-03', 'Tepat tiga kartu informatif dan target unik', async () => {
    assert.equal(await page.locator('[id="fitur"]').count(), 1);
    assert.equal(await page.locator('article').count(), 3);
    assert.deepEqual(await page.locator('article h3').allTextContents(), titles);
    assert.deepEqual(await page.locator('article p').allTextContents(), descriptions);
    assert.equal(await page.locator('article button, article input, article a').count(), 0);
  });
  await check('AC-04', 'Kedua CTA melalui klik dan Enter tanpa permintaan data', async () => {
    const links = page.getByRole('link', { name: 'Jelajahi fitur', exact: true });
    assert.equal(await links.count(), 2);
    for (const mode of ['click', 'keyboard']) {
      for (const index of [0, 1]) {
        await page.goto(baseURL, { waitUntil: 'networkidle' });
        const before = requests.length;
        const link = links.nth(index);
        if (mode === 'click') await link.click();
        else { await link.focus(); await page.keyboard.press('Enter'); }
        await targetVisible(page);
        // Chrome dapat memvalidasi ulang favicon setelah navigasi fragmen.
        // Izinkan hanya aset favicon tersebut; tetap tolak navigasi dokumen dan data/API.
        const outgoing = requests.slice(before);
        assert.ok(outgoing.every(request => request.method === 'GET' && request.type === 'other' && new URL(request.url).pathname === '/assets/favicon.svg'), JSON.stringify(outgoing));
      }
    }
  });
  await check('AC-05', 'Footer terlihat ketika digulir sampai bawah', async () => {
    await page.locator('footer').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('footer p').innerText(), '© FocusFlow. Produk fiktif untuk eksperimen SDD.');
    assert.ok(await page.locator('footer p').isVisible());
  });
  await check('AC-06', 'Tanpa formulir, kode runtime, API, atau penyimpanan pengguna', async () => {
    assert.equal(await page.locator('form,input,textarea,select,script,iframe').count(), 0);
    assert.ok(requests.every(request => request.method === 'GET' && !['fetch', 'xhr', 'websocket'].includes(request.type)));
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert.equal((await context.cookies()).length, 0);
  });
  for (const viewport of [{ width: 320, height: 800 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
    await check('AC-07', `Layout ${viewport.width} × ${viewport.height}`, async () => {
      await page.setViewportSize(viewport);
      await page.goto(baseURL, { waitUntil: 'networkidle' });
      const state = await layout(page);
      const screenshot = path.join(outputDir, `chrome-${viewport.width}.png`);
      await page.screenshot({ path: screenshot, fullPage: true });
      result.screenshots.push(screenshot);
      return state;
    });
  }
  await check('AC-08', 'Bahasa, heading, landmark, Tab, dan fokus terlihat', async () => {
    assert.equal(await page.locator('html').getAttribute('lang'), 'id');
    assert.equal(await page.getByRole('main').count(), 1);
    assert.equal(await page.getByRole('contentinfo').count(), 1);
    assert.deepEqual(await page.locator('h1,h2,h3').evaluateAll(elements => elements.map(element => element.tagName)), ['H1', 'H2', 'H3', 'H3', 'H3', 'H2']);
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    for (const index of [0, 1]) {
      await page.keyboard.press('Tab');
      const state = await page.getByRole('link', { name: 'Jelajahi fitur', exact: true }).nth(index).evaluate(element => {
        const style = getComputedStyle(element);
        return { focused: document.activeElement === element, outline: style.outlineStyle, width: parseFloat(style.outlineWidth) };
      });
      assert.ok(state.focused && state.outline !== 'none' && state.width >= 2, JSON.stringify(state));
    }
    await page.keyboard.press('Enter');
    await targetVisible(page);
  });
  await check('AC-09', 'Kontras teks dan ukuran kedua CTA', async () => {
    const colors = await page.evaluate(() => [...document.querySelectorAll('.brand,.hero-title,.hero-title em,h2,h3,p,.feature-number,a')].map(element => {
      const style = getComputedStyle(element);
      let ancestor = element, background;
      while (ancestor) {
        const candidate = getComputedStyle(ancestor).backgroundColor;
        if (candidate !== 'rgba(0, 0, 0, 0)' && candidate !== 'transparent') { background = candidate; break; }
        ancestor = ancestor.parentElement;
      }
      const r = element.getBoundingClientRect();
      return { text: element.textContent.trim(), color: style.color, background, fontSize: parseFloat(style.fontSize), fontWeight: parseFloat(style.fontWeight), width: r.width, height: r.height, link: element.tagName === 'A' };
    }));
    const luminance = value => value.match(/[\d.]+/g).slice(0, 3).map(Number).map(channel => channel / 255).map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
    for (const color of colors) {
      const a = luminance(color.color), b = luminance(color.background);
      color.ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      color.threshold = color.fontSize >= 24 || (color.fontSize >= 18.666 && color.fontWeight >= 700) ? 3 : 4.5;
      assert.ok(color.ratio >= color.threshold, JSON.stringify(color));
      if (color.link) assert.ok(color.width >= 44 && color.height >= 44, JSON.stringify(color));
    }
    return colors;
  });
  await check('AC-10', 'Naskah Indonesia tanpa teks pengisi atau label asing', async () => {
    assert.deepEqual(await page.locator('h2').allTextContents(), ['Tiga langkah menuju kerja lebih terarah', 'Siap menata fokusmu?']);
    assert.equal(await page.locator('.closing-description').innerText(), 'Kenali cara FocusFlow membantu membangun kebiasaan kerja yang lebih terarah.');
    assert.equal(await page.getByRole('link', { name: 'Jelajahi fitur', exact: true }).count(), 2);
    assert.doesNotMatch(await page.locator('body').innerText(), /lorem ipsum|sign up|learn more|dashboard/i);
    assert.equal(await page.locator('[aria-label]').count(), 0);
  });
  await check('AC-11', 'Konten dan CTA tanpa JavaScript; preferensi pengurangan gerakan', async () => {
    const noJS = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
    try {
      const noJSPage = await noJS.newPage();
      await noJSPage.goto(baseURL);
      assert.equal(await noJSPage.locator('article').count(), 3);
      for (const index of [0, 1]) {
        await noJSPage.getByRole('link', { name: 'Jelajahi fitur', exact: true }).nth(index).click();
        await targetVisible(noJSPage);
      }
    } finally { await noJS.close(); }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const motion = await page.locator('a').evaluateAll(elements => elements.map(element => ({ animation: getComputedStyle(element).animationName, transition: getComputedStyle(element).transitionDuration, scroll: getComputedStyle(element).scrollBehavior })));
    assert.ok(motion.every(style => style.animation === 'none' && style.transition === '0s' && style.scroll === 'auto'));
    return motion;
  });
  await check('AC-12', 'Semua permintaan berasal dari asal yang sama', async () => {
    assert.ok(requests.length > 0);
    assert.ok(requests.every(request => new URL(request.url).origin === new URL(baseURL).origin));
    assert.doesNotMatch(await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily), /url\(/i);
    return [...new Set(requests.map(request => request.url))];
  });
  await check('AC-13', 'Chrome: tanpa galat konsol, aset, atau request', async () => {
    assert.deepEqual(errors, []);
    return { browser: result.browserVersion, errors };
  });

  const touchContext = await browser.newContext({ viewport: { width: 320, height: 800 }, hasTouch: true, isMobile: true });
  try {
    const touchPage = await touchContext.newPage();
    await check('AC-04', 'Kedua CTA melalui sentuhan 320 × 800', async () => {
      for (const index of [0, 1]) {
        await touchPage.goto(baseURL);
        await touchPage.getByRole('link', { name: 'Jelajahi fitur', exact: true }).nth(index).tap();
        await targetVisible(touchPage);
      }
    });
  } finally { await touchContext.close(); }
  await context.close();
}
await browser.close();

await check('AC-09', 'Zoom browser Chrome 200% pada area konten fisik 1440 × 900', async () => {
  // ChromeZoomLevelPrefs menyimpan default zoom per partisi; partisi utama = "x".
  // Ini menggunakan zoom browser nyata, bukan CSS zoom atau pinch/scale emulation.
  const profile = await fs.mkdtemp(path.join(outputDir, 'zoom-profile-'));
  await fs.mkdir(path.join(profile, 'Default'));
  await fs.writeFile(path.join(profile, 'Default', 'Preferences'), JSON.stringify({ partition: { default_zoom_level: { x: Math.log(2) / Math.log(1.2) } } }));
  const zoomContext = await chromium.launchPersistentContext(profile, { executablePath, viewport: null, args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,987'] });
  try {
    const zoomPage = await zoomContext.newPage();
    await zoomPage.goto(baseURL);
    const state = await zoomPage.evaluate(() => ({ ratio: devicePixelRatio, width: innerWidth, height: innerHeight, outerWidth, outerHeight }));
    assert.equal(state.ratio, 2);
    assert.equal(state.width, 720);
    assert.equal(state.height, 450);
    const layoutState = await layout(zoomPage);
    for (const index of [0, 1]) {
      await zoomPage.getByRole('link', { name: 'Jelajahi fitur', exact: true }).nth(index).click();
      await targetVisible(zoomPage);
    }
    const screenshot = path.join(outputDir, 'chrome-zoom-200.png');
    // Pada zoom browser asli, clip fullPage Playwright memakai ukuran CSS,
    // sedangkan Chrome menangkap piksel native; hasilnya dapat terpotong.
    // Gunakan ukuran native CDP agar seluruh halaman fisik tertangkap.
    const session = await zoomContext.newCDPSession(zoomPage);
    const metrics = await session.send('Page.getLayoutMetrics');
    const dimensions = { width: Math.ceil(metrics.contentSize.width), height: Math.ceil(metrics.contentSize.height) };
    assert.equal(dimensions.width, state.width * state.ratio);
    const captured = await session.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true, clip: { x: 0, y: 0, ...dimensions, scale: 1 } });
    const png = Buffer.from(captured.data, 'base64');
    assert.equal(png.readUInt32BE(16), dimensions.width);
    assert.equal(png.readUInt32BE(20), dimensions.height);
    await fs.writeFile(screenshot, png);
    result.screenshots.push(screenshot);
    return { ...state, layout: layoutState, screenshot: { ...dimensions, method: 'CDP Page.captureScreenshot dengan native contentSize' } };
  } finally { await zoomContext.close(); }
});

result.counts = { passed: result.checks.filter(check => check.status === 'lulus').length, failed: result.checks.filter(check => check.status === 'gagal').length };
await fs.writeFile(path.join(outputDir, zoomOnly ? 'chrome-zoom-results.json' : 'chrome-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result.counts));
if (result.counts.failed) process.exitCode = 1;
