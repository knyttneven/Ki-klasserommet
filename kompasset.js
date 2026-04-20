// ============================================================
//  KOMPASSET — rendering, søk, admin-redigering og bilde-upload
// ============================================================

// ---------- LAGRING ----------
// Admin-endringer lagres i localStorage som en "overlay" over KOMPASS_TIPS.
// Publikum ser alltid: startdata MERGET med overlay.

const LS_KOMPASS = 'kompass_overlay_v1';

function loadOverlay() {
  try {
    const raw = localStorage.getItem(LS_KOMPASS);
    if (!raw) return { tips: [], slettet: [], endret: {} };
    return JSON.parse(raw);
  } catch (e) { return { tips: [], slettet: [], endret: {} }; }
}
function saveOverlay(o) { localStorage.setItem(LS_KOMPASS, JSON.stringify(o)); }

// Flettet liste som brukes til visning
function allTips() {
  const o = loadOverlay();
  const base = KOMPASS_TIPS
    .filter(t => !o.slettet.includes(t.id))
    .map(t => o.endret[t.id] ? { ...t, ...o.endret[t.id] } : t);
  return [...base, ...(o.tips || [])];
}

function tipsByKategori(kid) {
  return allTips().filter(t => t.kategori === kid);
}
function tipsById(id) {
  return allTips().find(t => t.id === id);
}

// ---------- STATE ----------
let currentView = 'hjem';   // 'hjem' | 'kategori' | 'tips'
let currentKategori = null;
let currentTipsId = null;
let adminOn = false;
let searchQ = '';

// ---------- HELPERS ----------
function esc(s) {
  return String(s || '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function iconFor(kid) {
  const k = KOMPASS_KATEGORIER.find(x => x.id === kid);
  return k ? k.ikon : '\u2726';
}
function navnFor(kid) {
  const k = KOMPASS_KATEGORIER.find(x => x.id === kid);
  return k ? k.navn : kid;
}

// ---------- RENDERING: HJEM ----------
function renderHjem() {
  const tips = allTips();
  const grid = KOMPASS_KATEGORIER.map(k => {
    const antall = tipsByKategori(k.id).length;
    return `
      <button class="kg-card" data-kat="${k.id}" onclick="openKategori('${k.id}')">
        <div class="kg-ic">${k.ikon}</div>
        <div class="kg-title">${esc(k.navn)}</div>
        <div class="kg-desc">${esc(k.beskr)}</div>
        <div class="kg-count">${antall} ${antall === 1 ? 'artikkel' : 'artikler'}</div>
      </button>`;
  }).join('');

  const forstetips = tips[0];
  const featured = forstetips ? `
    <div class="kg-featured">
      <div class="kg-featured-ic">${iconFor(forstetips.kategori)}</div>
      <div class="kg-featured-body">
        <div class="kg-featured-lbl">Start her</div>
        <div class="kg-featured-title">${esc(forstetips.tittel)}</div>
        <div class="kg-featured-desc">${esc(forstetips.ingress)}</div>
      </div>
      <button class="btn primary sm" onclick="openTips('${forstetips.id}')">Les &rarr;</button>
    </div>` : '';

  return `
    <div class="kg-hero">
      <div class="kg-hero-ikon" aria-hidden="true">\u{1F9ED}</div>
      <h1>Kompasset</h1>
      <p>Råd, oppskrifter og svar på det lærere ofte lurer på når de bruker KI i undervisningen.</p>
      <div class="kg-search-wrap">
        <svg class="kg-search-ic" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <path d="M11 11 l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <input id="kg-search" type="search" placeholder="Søk i tips og instruksjoner…"
               value="${esc(searchQ)}" oninput="onSearch(this.value)">
      </div>
    </div>

    ${featured}

    <div class="kg-section-label">Kategorier</div>
    <div class="kg-grid">${grid}</div>
  `;
}

// ---------- RENDERING: KATEGORI ----------
function renderKategori(kid) {
  const kat = KOMPASS_KATEGORIER.find(k => k.id === kid);
  if (!kat) return renderHjem();
  const tips = tipsByKategori(kid);

  const liste = tips.length === 0
    ? `<div class="kg-empty">Ingen tips i denne kategorien ennå.</div>`
    : tips.map(t => `
        <button class="kg-tips-row" onclick="openTips('${t.id}')">
          <div class="kg-tips-ic">${iconFor(t.kategori)}</div>
          <div class="kg-tips-body">
            <div class="kg-tips-tittel">${esc(t.tittel)}</div>
            <div class="kg-tips-ingress">${esc(t.ingress || '')}</div>
            <div class="kg-tips-meta">
              <span>${t.minutter || 2} min lesing</span>
              <span>·</span>
              <span>Oppdatert ${esc(t.oppdatert || '')}</span>
            </div>
          </div>
          <div class="kg-tips-chev">\u203A</div>
        </button>
      `).join('');

  return `
    <div class="kg-breadcrumb">
      <a onclick="goHome()">Kompasset</a>
      <span>›</span>
      <span>${esc(kat.navn)}</span>
    </div>
    <div class="kg-kat-head">
      <div class="kg-kat-ic">${kat.ikon}</div>
      <div>
        <h1>${esc(kat.navn)}</h1>
        <p>${esc(kat.beskr)}</p>
      </div>
    </div>
    <div class="kg-tips-list">${liste}</div>
  `;
}

// ---------- RENDERING: TIPS ----------
function renderTips(id) {
  const t = tipsById(id);
  if (!t) return renderHjem();
  const kat = KOMPASS_KATEGORIER.find(k => k.id === t.kategori);

  const blokker = (t.innhold || []).map(b => {
    switch (b.type) {
      case 'h2':    return `<h2 class="art-h2">${esc(b.tekst)}</h2>`;
      case 'p':     return `<p class="art-p">${esc(b.tekst)}</p>`;
      case 'liste': return `<ul class="art-ul">${(b.punkter||[]).map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
      case 'tips':  return `<div class="art-callout"><strong>Tips</strong><span>${esc(b.tekst)}</span></div>`;
      case 'kode':  return `<pre class="art-code">${esc(b.tekst)}</pre>`;
      case 'lenke': return `<p class="art-p"><a class="art-link" href="${esc(b.href)}" target="_blank" rel="noopener">${esc(b.tekst)} &rarr;</a></p>`;
      case 'video': return `<div class="art-video"><iframe src="${esc(b.embed)}" loading="lazy" allowfullscreen></iframe></div>`;
      case 'bilde': {
        const src = b.src || '';
        const isSvg = src.trim().startsWith('<svg');
        const bilde = isSvg
          ? `<div class="art-fig-svg">${src}</div>`
          : `<img src="${esc(src)}" alt="${esc(b.alt || '')}" loading="lazy">`;
        return `<figure class="art-fig">
          ${bilde}
          ${b.bildetekst ? `<figcaption>${esc(b.bildetekst)}</figcaption>` : ''}
        </figure>`;
      }
      default: return '';
    }
  }).join('');

  return `
    <div class="kg-breadcrumb">
      <a onclick="goHome()">Kompasset</a>
      <span>›</span>
      <a onclick="openKategori('${t.kategori}')">${esc(kat ? kat.navn : '')}</a>
      <span>›</span>
      <span>${esc(t.tittel)}</span>
    </div>

    <article class="kg-article">
      <div class="art-head">
        <div class="art-kat">${iconFor(t.kategori)} ${esc(kat ? kat.navn : '')}</div>
        <h1>${esc(t.tittel)}</h1>
        <p class="art-lede">${esc(t.ingress || '')}</p>
        <div class="art-meta">
          <span>\u{1F552} ${t.minutter || 2} min</span>
          <span>·</span>
          <span>Oppdatert ${esc(t.oppdatert || '')}</span>
        </div>
      </div>
      <div class="art-body">${blokker}</div>

      <div class="art-foot">
        <button class="btn ghost sm" onclick="openKategori('${t.kategori}')">\u2039 Tilbake til ${esc(kat ? kat.navn : '')}</button>
      </div>
    </article>
  `;
}

// ---------- SØK ----------
function renderSearch(q) {
  const hits = allTips().filter(t => {
    const hay = (t.tittel + ' ' + t.ingress + ' ' +
      (t.innhold||[]).map(b => b.tekst || (b.punkter||[]).join(' ') || '').join(' ')).toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const liste = hits.length === 0
    ? `<div class="kg-empty">Ingen treff på «${esc(q)}». Prøv et annet ord.</div>`
    : hits.map(t => `
        <button class="kg-tips-row" onclick="openTips('${t.id}')">
          <div class="kg-tips-ic">${iconFor(t.kategori)}</div>
          <div class="kg-tips-body">
            <div class="kg-tips-tittel">${esc(t.tittel)}</div>
            <div class="kg-tips-ingress">${esc(t.ingress || '')}</div>
            <div class="kg-tips-meta"><span>${esc(navnFor(t.kategori))}</span></div>
          </div>
          <div class="kg-tips-chev">\u203A</div>
        </button>`).join('');

  return `
    <div class="kg-breadcrumb">
      <a onclick="goHome()">Kompasset</a>
      <span>›</span>
      <span>Søk: «${esc(q)}»</span>
    </div>
    <h1 class="kg-search-title">${hits.length} treff på «${esc(q)}»</h1>
    <div class="kg-tips-list">${liste}</div>
  `;
}

// ---------- NAVIGASJON ----------
function render() {
  const root = document.getElementById('kompass-root');
  if (searchQ.trim().length >= 2) {
    root.innerHTML = renderSearch(searchQ.trim());
  } else if (currentView === 'tips' && currentTipsId) {
    root.innerHTML = renderTips(currentTipsId);
  } else if (currentView === 'kategori' && currentKategori) {
    root.innerHTML = renderKategori(currentKategori);
  } else {
    root.innerHTML = renderHjem();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() { currentView = 'hjem'; searchQ = ''; currentTipsId = null; currentKategori = null; render(); }
function openKategori(kid) { currentView = 'kategori'; currentKategori = kid; currentTipsId = null; searchQ = ''; render(); }
function openTips(id) { currentView = 'tips'; currentTipsId = id; searchQ = ''; render(); }

let searchTimer;
function onSearch(val) {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQ = val;
    render();
    if (val.trim().length >= 2) {
      // behold fokus i søkefeltet etter rendering
      const inp = document.getElementById('kg-search');
      if (inp) { inp.focus(); inp.setSelectionRange(val.length, val.length); }
    }
  }, 200);
}

// ============================================================
//  ADMIN-PANEL
// ============================================================
const ADMIN_PIN = CONFIG.ADMIN_PIN;
let adminUnlocked = false;

function openAdmin() {
  document.getElementById('kg-admin-modal').classList.add('open');
  if (!adminUnlocked) {
    document.getElementById('kg-admin-pin-view').style.display = '';
    document.getElementById('kg-admin-panel').style.display = 'none';
    setTimeout(() => document.getElementById('kg-admin-pin').focus(), 50);
  } else {
    showAdminPanel();
  }
}
function closeAdmin() {
  document.getElementById('kg-admin-modal').classList.remove('open');
}
function tryUnlockAdmin() {
  const v = document.getElementById('kg-admin-pin').value;
  if (v === ADMIN_PIN) {
    adminUnlocked = true;
    showAdminPanel();
  } else {
    const err = document.getElementById('kg-admin-pin-err');
    err.textContent = 'Feil PIN-kode';
    setTimeout(() => err.textContent = '', 2500);
  }
}
function showAdminPanel() {
  document.getElementById('kg-admin-pin-view').style.display = 'none';
  document.getElementById('kg-admin-panel').style.display = '';
  renderAdminList();
}

function renderAdminList() {
  const panel = document.getElementById('kg-admin-list');
  const tips = allTips();
  panel.innerHTML = `
    <div class="ka-toolbar">
      <button class="btn primary sm" onclick="adminNew()">+ Nytt tips</button>
      <button class="btn ghost sm" onclick="adminExport()">⬇ Eksporter JSON</button>
      <label class="btn ghost sm" for="ka-import">⬆ Importer JSON</label>
      <input type="file" id="ka-import" accept=".json,application/json" style="display:none"
             onchange="adminImport(this.files[0])">
    </div>
    <div class="ka-list">
      ${tips.map(t => `
        <div class="ka-row">
          <div class="ka-row-ic">${iconFor(t.kategori)}</div>
          <div class="ka-row-body">
            <div class="ka-row-tittel">${esc(t.tittel)}</div>
            <div class="ka-row-meta">${esc(navnFor(t.kategori))} · ${(t.innhold||[]).length} blokker</div>
          </div>
          <div class="ka-row-actions">
            <button class="btn ghost sm" onclick="adminEdit('${t.id}')">Rediger</button>
            <button class="btn ghost sm" onclick="adminDelete('${t.id}')">Slett</button>
          </div>
        </div>`).join('')}
    </div>
  `;
}

function adminNew() {
  const id = 'tip-' + Date.now();
  const nytt = {
    id, kategori: KOMPASS_KATEGORIER[0].id,
    tittel: 'Nytt tips', ingress: '',
    oppdatert: new Date().toISOString().slice(0,10),
    minutter: 2,
    innhold: [{ type: 'p', tekst: '' }]
  };
  const o = loadOverlay();
  o.tips = o.tips || [];
  o.tips.push(nytt);
  saveOverlay(o);
  adminEdit(id);
}

function adminDelete(id) {
  if (!confirm('Slette dette tipset?')) return;
  const o = loadOverlay();
  // Hvis det er et overlay-tips, bare fjern fra listen
  if ((o.tips||[]).find(x => x.id === id)) {
    o.tips = o.tips.filter(x => x.id !== id);
  } else {
    // Ellers: marker startdata-id som slettet
    o.slettet = o.slettet || [];
    if (!o.slettet.includes(id)) o.slettet.push(id);
  }
  saveOverlay(o);
  renderAdminList();
  render();
}

function adminEdit(id) {
  const t = tipsById(id);
  if (!t) return;
  const panel = document.getElementById('kg-admin-list');

  const katOpts = KOMPASS_KATEGORIER.map(k =>
    `<option value="${k.id}" ${k.id===t.kategori?'selected':''}>${k.ikon} ${k.navn}</option>`
  ).join('');

  const blokker = (t.innhold || []).map((b, i) => renderBlockEditor(b, i)).join('');

  panel.innerHTML = `
    <div class="ka-edit">
      <button class="btn ghost sm" onclick="renderAdminList()">‹ Tilbake til oversikt</button>

      <div class="ka-field">
        <label>Tittel</label>
        <input id="ka-tittel" type="text" value="${esc(t.tittel)}">
      </div>

      <div class="ka-field-row">
        <div class="ka-field">
          <label>Kategori</label>
          <select id="ka-kategori">${katOpts}</select>
        </div>
        <div class="ka-field" style="max-width:120px">
          <label>Lesetid (min)</label>
          <input id="ka-minutter" type="number" min="1" max="60" value="${t.minutter || 2}">
        </div>
        <div class="ka-field" style="max-width:160px">
          <label>Oppdatert</label>
          <input id="ka-oppdatert" type="date" value="${esc(t.oppdatert || '')}">
        </div>
      </div>

      <div class="ka-field">
        <label>Ingress (kort teaser-tekst)</label>
        <textarea id="ka-ingress" rows="2">${esc(t.ingress || '')}</textarea>
      </div>

      <div class="ka-field">
        <label>Innhold — blokker</label>
        <div id="ka-blokker">${blokker}</div>
        <div class="ka-add-blokk">
          <span>Legg til blokk:</span>
          <button class="btn ghost sm" onclick="adminAddBlock('p')">+ Avsnitt</button>
          <button class="btn ghost sm" onclick="adminAddBlock('h2')">+ Mellomtittel</button>
          <button class="btn ghost sm" onclick="adminAddBlock('liste')">+ Liste</button>
          <button class="btn ghost sm" onclick="adminAddBlock('tips')">+ Tips-boks</button>
          <button class="btn ghost sm" onclick="adminAddBlock('kode')">+ Kode/prompt</button>
          <button class="btn ghost sm" onclick="adminAddBlock('bilde')">+ Bilde</button>
          <button class="btn ghost sm" onclick="adminAddBlock('video')">+ Video</button>
          <button class="btn ghost sm" onclick="adminAddBlock('lenke')">+ Lenke</button>
        </div>
      </div>

      <div class="ka-save-row">
        <button class="btn primary" onclick="adminSave('${id}')">Lagre endringer</button>
        <span id="ka-save-msg" class="ka-save-msg"></span>
      </div>
    </div>
  `;
  // lagre id til bruk i add-block
  panel.dataset.editId = id;
}

function renderBlockEditor(b, i) {
  const label = {
    p: 'Avsnitt', h2: 'Mellomtittel', liste: 'Liste',
    tips: 'Tips-boks', kode: 'Kode / prompt-eksempel',
    bilde: 'Bilde', video: 'Video', lenke: 'Lenke'
  }[b.type] || b.type;

  let body = '';
  if (b.type === 'liste') {
    body = `<textarea data-k="punkter" rows="4" placeholder="Ett punkt per linje">${esc((b.punkter||[]).join('\n'))}</textarea>`;
  } else if (b.type === 'bilde') {
    const showPrev = b.src && !b.src.trim().startsWith('<svg');
    const showSvg  = b.src && b.src.trim().startsWith('<svg');
    body = `
      <div class="ka-upload">
        <label class="ka-upload-btn">
          \u{1F4C1} Last opp bilde (PNG/JPEG/SVG/GIF/WebP)
          <input type="file" accept=".png,.jpg,.jpeg,.svg,.gif,.webp,image/*"
                 onchange="adminUploadImage(event, ${i})" style="display:none">
        </label>
        <span class="ka-upload-hint">eller lim inn URL / SVG-kode nedenfor</span>
      </div>
      <textarea data-k="src" rows="3" placeholder="URL, data:image/… eller <svg>…</svg>">${esc(b.src || '')}</textarea>
      ${showPrev ? `<div class="ka-img-prev"><img src="${esc(b.src)}" alt=""></div>` : ''}
      ${showSvg ? `<div class="ka-img-prev">${b.src}</div>` : ''}
      <input data-k="alt" type="text" placeholder="Alt-tekst (beskrivelse for skjermleser)" value="${esc(b.alt||'')}" style="margin-top:.5rem">
      <input data-k="bildetekst" type="text" placeholder="Bildetekst (valgfritt)" value="${esc(b.bildetekst||'')}" style="margin-top:.35rem">
    `;
  } else if (b.type === 'video') {
    body = `<input data-k="embed" type="url" placeholder="YouTube embed-URL (https://www.youtube.com/embed/…)" value="${esc(b.embed||'')}">`;
  } else if (b.type === 'lenke') {
    body = `
      <input data-k="tekst" type="text" placeholder="Lenketekst" value="${esc(b.tekst||'')}">
      <input data-k="href" type="url" placeholder="https://…" value="${esc(b.href||'')}" style="margin-top:.35rem">
    `;
  } else {
    body = `<textarea data-k="tekst" rows="${b.type === 'p' ? 3 : 2}">${esc(b.tekst || '')}</textarea>`;
  }

  return `
    <div class="ka-blokk" data-i="${i}" data-type="${b.type}">
      <div class="ka-blokk-head">
        <span class="ka-blokk-type">${label}</span>
        <div class="ka-blokk-actions">
          <button class="btn ghost sm" onclick="adminMoveBlock(${i}, -1)" title="Flytt opp">↑</button>
          <button class="btn ghost sm" onclick="adminMoveBlock(${i}, +1)" title="Flytt ned">↓</button>
          <button class="btn ghost sm" onclick="adminRemoveBlock(${i})" title="Fjern">\u00d7</button>
        </div>
      </div>
      <div class="ka-blokk-body">${body}</div>
    </div>
  `;
}

// Lese blokker fra DOM til et innhold-array
function readBlocks() {
  const out = [];
  document.querySelectorAll('#ka-blokker .ka-blokk').forEach(el => {
    const type = el.dataset.type;
    const block = { type };
    el.querySelectorAll('[data-k]').forEach(f => {
      const k = f.dataset.k;
      if (k === 'punkter') {
        block.punkter = f.value.split('\n').map(s => s.trim()).filter(Boolean);
      } else {
        block[k] = f.value;
      }
    });
    out.push(block);
  });
  return out;
}

function adminAddBlock(type) {
  const panel = document.getElementById('kg-admin-list');
  const id = panel.dataset.editId;
  const t = tipsById(id);
  if (!t) return;

  // Lagre nåværende redigering først
  t.innhold = readBlocks();
  const nyBlokk = type === 'liste' ? { type, punkter: [] } : { type, tekst: '' };
  t.innhold.push(nyBlokk);

  // Oppdater overlay midlertidig (uten å lagre)
  adminEditReload(t);
}

function adminRemoveBlock(i) {
  const panel = document.getElementById('kg-admin-list');
  const id = panel.dataset.editId;
  const t = tipsById(id);
  if (!t) return;
  t.innhold = readBlocks();
  t.innhold.splice(i, 1);
  adminEditReload(t);
}

function adminMoveBlock(i, delta) {
  const panel = document.getElementById('kg-admin-list');
  const id = panel.dataset.editId;
  const t = tipsById(id);
  if (!t) return;
  t.innhold = readBlocks();
  const j = i + delta;
  if (j < 0 || j >= t.innhold.length) return;
  [t.innhold[i], t.innhold[j]] = [t.innhold[j], t.innhold[i]];
  adminEditReload(t);
}

// Re-render editor med ny innhold-liste (uten å røre lagret overlay)
function adminEditReload(tipp) {
  // Legg i overlay-endret midlertidig så tipsById finner det
  const o = loadOverlay();
  if ((o.tips||[]).find(x => x.id === tipp.id)) {
    o.tips = o.tips.map(x => x.id === tipp.id ? tipp : x);
  } else {
    o.endret = o.endret || {};
    o.endret[tipp.id] = { ...o.endret[tipp.id], innhold: tipp.innhold };
  }
  saveOverlay(o);
  adminEdit(tipp.id);
}

function adminUploadImage(ev, blockIndex) {
  const file = ev.target.files?.[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) {
    alert('Bildet er for stort (maks 3 MB).');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    const el = document.querySelector(`#ka-blokker .ka-blokk[data-i="${blockIndex}"] [data-k="src"]`);
    if (el) {
      el.value = e.target.result;
      // forhåndsvisning
      const preview = el.closest('.ka-blokk-body').querySelector('.ka-img-prev');
      const html = `<img src="${el.value}" alt="">`;
      if (preview) preview.innerHTML = html;
      else {
        const div = document.createElement('div');
        div.className = 'ka-img-prev';
        div.innerHTML = html;
        el.insertAdjacentElement('afterend', div);
      }
    }
  };
  reader.readAsDataURL(file);
}

function adminSave(id) {
  const tittel = document.getElementById('ka-tittel').value.trim();
  const kategori = document.getElementById('ka-kategori').value;
  const minutter = parseInt(document.getElementById('ka-minutter').value) || 2;
  const oppdatert = document.getElementById('ka-oppdatert').value;
  const ingress = document.getElementById('ka-ingress').value.trim();
  const innhold = readBlocks();

  const o = loadOverlay();
  const erOverlay = (o.tips || []).find(x => x.id === id);
  const oppdatering = { tittel, kategori, minutter, oppdatert, ingress, innhold };

  if (erOverlay) {
    o.tips = o.tips.map(x => x.id === id ? { ...x, ...oppdatering } : x);
  } else {
    o.endret = o.endret || {};
    o.endret[id] = oppdatering;
  }
  saveOverlay(o);

  const msg = document.getElementById('ka-save-msg');
  msg.textContent = '\u2713 Lagret';
  msg.classList.add('ok');
  setTimeout(() => { msg.textContent = ''; msg.classList.remove('ok'); }, 2000);

  render();
}

function adminExport() {
  const o = loadOverlay();
  const data = {
    format: 'kompass-overlay-v1',
    eksportert: new Date().toISOString(),
    ...o
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kompass-tips.json';
  a.click();
  URL.revokeObjectURL(url);
}

function adminImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.tips && !data.endret && !data.slettet) throw new Error('Ugyldig format');
      saveOverlay({
        tips: data.tips || [],
        slettet: data.slettet || [],
        endret: data.endret || {}
      });
      renderAdminList();
      render();
      alert('Import fullført.');
    } catch (err) {
      alert('Kunne ikke lese filen: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  render();

  // ESC lukker admin
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAdmin();
  });

  // PIN: Enter submit
  document.getElementById('kg-admin-pin')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryUnlockAdmin();
  });
});
