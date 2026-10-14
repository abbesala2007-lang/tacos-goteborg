/* TacO's — renders the AURA-template shell and sections for each page (body[data-page]). */
(function () {
  'use strict';
  const D = window.TACOS;
  const B = D.business;
  const PAGE = document.body.dataset.page || 'home';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Icons (lucide) ---------- */
  const PATHS = {
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16.5 12"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
    maximize: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>'
  };
  const icon = (n) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[n]}</svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const img = (key) => D.images[key];

  const LINKS = [
    { href: 'index.html', label: 'Hem', page: 'home' },
    { href: 'meny.html', label: 'Meny', page: 'menu' },
    { href: 'historia.html', label: 'Vår historia', page: 'story' },
    { href: 'galleri.html', label: 'Galleri', page: 'gallery' },
    { href: 'hitta-hit.html', label: 'Hitta hit', page: 'visit' }
  ];
  const navLinks = () => LINKS.map((l) => `<a href="${l.href}"${l.page === PAGE ? ' class="active" aria-current="page"' : ''}>${l.label}</a>`).join('');

  /* ---------- Shared pieces ---------- */
  function sectionTitle({ label, title, description, h1 = false }) {
    const tag = h1 ? 'h1' : 'h2';
    return `<div class="section-title"><div class="eyebrow">${label}</div><${tag}>${title}</${tag}>${description ? `<p>${description}</p>` : ''}</div>`;
  }

  function header() {
    return `<header class="site-header${PAGE !== 'home' ? ' scrolled' : ''}">
      <a href="index.html" class="wordmark" aria-label="TacO’s startsida">TACO’S<span class="brand-caption">BIRRIA · TACOS · GÖTEBORG</span></a>
      <nav class="desktop-nav" aria-label="Huvudmeny">${navLinks()}</nav>
      <div class="header-actions">
        <a class="btn btn-primary" href="meny.html">Se menyn ${icon('arrowRight')}</a>
        <button class="btn btn-ghost btn-icon mobile-menu-toggle" type="button" aria-label="Öppna menyn" aria-expanded="false">${icon('menu')}</button>
      </div>
    </header>`;
  }

  function closingBand() {
    return `<section class="reservation-band">
      <div class="eyebrow">Sugen än?</div>
      <h2>Vi har tortillan redo.</h2>
      <p>Kom förbi Lindholmen – ät här eller ta med.</p>
      <div class="band-ctas">
        <a class="btn btn-primary" href="hitta-hit.html">${icon('pin')} Hitta hit ${icon('arrowRight')}</a>
        <a class="btn btn-text" href="meny.html">Se menyn ${icon('arrowRight')}</a>
      </div>
    </section>`;
  }

  function footer() {
    const socials = [
      B.instagram && `<a href="${B.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">${icon('instagram')}</a>`,
      B.facebook && `<a href="${B.facebook}" target="_blank" rel="noreferrer" aria-label="Facebook">${icon('facebook')}</a>`
    ].filter(Boolean).join('');
    return `<footer class="site-footer">
      <div class="footer-grid">
        <div>
          <img class="footer-logo" src="img/logo-round.png" alt="TacO’s logotyp" width="56" height="56">
          <a href="index.html" class="wordmark">TACO’S</a>
          <p class="footer-tagline">Birria med själ.<br>Krispigt, långkokt och gjort från grunden.</p>
          ${socials ? `<div class="social-icons">${socials}</div>` : ''}
        </div>
        <div>
          <h3 class="footer-heading">HITTA OSS</h3>
          <p>${B.street}<br>${B.city}</p>
          <a class="btn btn-text" href="hitta-hit.html">Hitta hit ${icon('arrowRight')}</a>
        </div>
        <div>
          <h3 class="footer-heading">ÖPPETTIDER</h3>
          <p>${B.days}<br>${B.hours}<br>${B.price}</p>
        </div>
        <div>
          <h3 class="footer-heading">BLI FÖRST MED NYHETERNA</h3>
          <p>Nya smaker, erbjudanden och kvällar på TacO’s<br>– direkt i din inkorg.</p>
          <form class="footer-newsletter" novalidate>
            <input name="email" type="email" required maxlength="255" aria-label="E-postadress för nyhetsbrev" placeholder="Din e-postadress">
            <button class="btn btn-icon" type="submit" aria-label="Prenumerera på nyhetsbrevet">${icon('arrowRight')}</button>
          </form>
          <p class="footer-status" role="status" aria-live="polite"></p>
        </div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} TacO’s. Alla rättigheter förbehållna.</span><span>Långkokt med kärlek. Serverat med själ.</span></div>
    </footer>`;
  }

  /* ---------- Hero (home) ---------- */
  const SLIDES = ['spread'];
  function hero() {
    const first = img(SLIDES[0]);
    return `<section class="hero">
      <img class="hero-image" src="${first.src}" alt="${esc(first.alt)}" width="1920" height="1088" fetchpriority="high">
      <div class="hero-content">
        <div class="eyebrow">Birria · Tacos · Lindholmen</div>
        <h1>Birria med själ.<br><em>Smak utan gränser.</em></h1>
        <p class="hero-description">Långkokt högrev, krispiga tortillas och såser gjorda från grunden. <br>Mexikansk birria möter Balkan och Mellanöstern – mitt på Lindholmen.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="meny.html">Se menyn ${icon('arrowRight')}</a>
          <a class="btn btn-glass" href="hitta-hit.html">Hitta hit ${icon('arrowRight')}</a>
        </div>
      </div>
      <div class="hero-info">
        <div>${icon('clock')}<span><small>ÖPPET ${B.days.toUpperCase()}</small>${B.hours}</span></div>
        <div>${icon('star')}<span><small>BETYG PÅ GOOGLE</small>${B.rating} ★ · ${B.reviews} recensioner</span></div>
        <a href="hitta-hit.html">${icon('pin')}<span><small>HITTA HIT</small>${B.street}, Göteborg</span></a>
      </div>
      ${SLIDES.length > 1 ? `<div class="hero-slide-controls">${SLIDES.map((s, i) => `<button type="button" class="slide-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Visa bild ${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}</div>` : ''}
      <button type="button" class="btn btn-ghost btn-icon hero-scroll" aria-label="Till menyn">${icon('arrowDown')}</button>
    </section>`;
  }

  function initHero(root) {
    const heroEl = root.querySelector('.hero');
    if (!heroEl) return;
    const image = heroEl.querySelector('.hero-image');
    const dots = [...heroEl.querySelectorAll('.slide-dot')];
    let current = 0;
    let timer;
    SLIDES.forEach((s) => { const pre = new Image(); pre.src = img(s).src; });
    const show = (i) => {
      current = i;
      const s = img(SLIDES[i]);
      image.src = s.src;
      image.alt = s.alt;
      image.style.animation = 'none';
      void image.offsetWidth;
      image.style.animation = '';
      dots.forEach((d, j) => { d.classList.toggle('active', j === i); d.setAttribute('aria-pressed', String(j === i)); });
    };
    const start = () => { if (!reducedMotion && SLIDES.length > 1) timer = window.setInterval(() => show((current + 1) % SLIDES.length), 9000); };
    dots.forEach((d) => d.addEventListener('click', () => { window.clearInterval(timer); show(Number(d.dataset.slide)); start(); }));
    start();
    heroEl.querySelector('.hero-scroll').addEventListener('click', () => {
      document.querySelector('.section')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Menu ---------- */
  function menuSection(full) {
    const title = { label: 'Smaka på TacO’s', title: 'Långkokt. Krispigt.<br>Oförglömligt <em>gott.</em>', description: 'Från klassisk birria till våra egna signaturer. Allt tillagas på plats, varje dag.', h1: full };
    return `<section class="section reveal" id="meny">
      ${sectionTitle(title)}
      <div class="menu-tabs" role="tablist" aria-label="Menykategorier">${D.categories.map((c, i) => `<button type="button" role="tab" class="menu-tab${i === 0 ? ' active' : ''}" aria-selected="${i === 0}" data-cat="${c}">${c}</button>`).join('')}</div>
      <div class="menu-layout">
        <div class="menu-photo"><img src="" alt="" loading="lazy" width="1024" height="1024"><span class="menu-photo-label">${icon('sparkles')} LÅNGKOKT MED KÄRLEK</span></div>
        <div role="tabpanel" class="menu-panel-wrap" data-full="${full ? '1' : ''}"></div>
      </div>
    </section>`;
  }

  function dishHTML(d) {
    return `<article class="dish">
      <div class="dish-heading"><h3>${esc(d.name)}</h3><span class="dish-price">${d.price} <small>kr</small></span></div>
      ${d.desc ? `<p>${esc(d.desc)}</p>` : ''}
      ${d.tags.length ? `<div class="dietary-tags">${d.tags.map((t) => `<span class="dietary-tag">${t}</span>`).join('')}</div>` : ''}
      ${d.popular ? `<span class="recommendation">${icon('sparkles')} POPULÄR</span>` : ''}
    </article>`;
  }

  function initMenu(root) {
    const section = root.querySelector('#meny');
    if (!section) return;
    const tabs = [...section.querySelectorAll('.menu-tab')];
    const wrap = section.querySelector('.menu-panel-wrap');
    const photo = section.querySelector('.menu-photo img');
    const full = !!wrap.dataset.full;
    const render = (cat) => {
      tabs.forEach((t) => { const on = t.dataset.cat === cat; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
      const p = img(D.categoryPhoto[cat] || 'spread');
      if (photo.getAttribute('src') !== p.src) { photo.src = p.src; photo.alt = p.alt; }
      const lunch = cat === 'Tacos' ? `<div class="lunch-note">${icon('utensils')} LUNCH <span>Tacos, burrito eller bowl – med dryck och kaffe.</span></div>` : '';
      wrap.innerHTML = `<div class="menu-panel">${lunch}${D.dishes.filter((d) => d.c === cat).map(dishHTML).join('')}
        <div class="menu-bottom"><span class="menu-note">Priser inkl. moms<br>Fråga oss gärna om allergener.</span>${full ? '' : `<a class="btn btn-text" href="meny.html">Se hela menyn ${icon('arrowRight')}</a>`}</div></div>`;
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => render(t.dataset.cat));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        next.focus(); render(next.dataset.cat);
      });
    });
    render(D.categories[0]);
  }

  /* ---------- Story ---------- */
  function storySection(full) {
    const s = img('storefront');
    return `<section class="story-band"><div class="section">
      <div class="story-layout">
        <img class="chef-photo" src="${s.src}" alt="${esc(s.alt)}" loading="lazy" width="1024" height="1280">
        <div class="story-copy">
          <div class="eyebrow">Vår filosofi</div>
          <h2>Född i Mexiko.<br>Uppvuxen i <em>Göteborg.</em></h2>
          <p>Birria är en mexikansk klassiker: kött som långkokas i timmar tills det faller isär. Vi tog den med oss till Lindholmen ${B.founded} – och gav den vår egen själ.</p>
          <p>Hos oss möter tortillan kajmak och ajvar från Balkan, harissa, tahini och sumak från Mellanöstern. Allt lagas från grunden, varje dag.</p>
          <div class="chef-signature">Långkokt. Krispigt. Ärligt.</div>
          <div class="chef-role">FRÅN VÅRT KÖK PÅ LINDHOLMEN</div>
          ${full ? '<p>Vi tror på generösa portioner, ärliga råvaror och ett ställe där alla känner sig välkomna – oavsett om du tar en snabb lunch eller stannar en stund.</p>' : `<a class="btn btn-text" href="historia.html">Läs vår historia ${icon('arrowRight')}</a>`}
        </div>
      </div>
      <div class="stats">
        <div><strong>${B.founded}</strong><span>Grundat på Lindholmen</span></div>
        <div><strong>${B.rating} ★</strong><span>Betyg på Google</span></div>
        <div><strong>${B.reviews}+</strong><span>Recensioner</span></div>
      </div>
    </div></section>`;
  }

  /* ---------- Gallery + lightbox ---------- */
  function gallerySection(full) {
    const title = { label: 'Stämningen på TacO’s', title: 'Mer än en måltid.<br>En smak att <em>minnas.</em>', description: 'Krispiga tortillas, färska örter och en plats att längta tillbaka till.', h1: full };
    return `<section class="section" id="galleri">
      ${sectionTitle(title)}
      ${full ? `<div class="menu-tabs" role="tablist" aria-label="Filtrera bilder">${['Alla', 'Mat', 'Lokalen'].map((f, i) => `<button type="button" role="tab" class="menu-tab${i === 0 ? ' active' : ''}" aria-selected="${i === 0}" data-filter="${f}">${f}</button>`).join('')}</div>` : ''}
      <div class="gallery-grid"></div>
      ${full ? '' : `<div class="mt-8 text-center"><a class="btn btn-text" href="galleri.html">Kliv in hos TacO’s ${icon('arrowRight')}</a></div>`}
    </section>`;
  }

  function initGallery(root) {
    const section = root.querySelector('#galleri');
    if (!section) return;
    const grid = section.querySelector('.gallery-grid');
    const filters = [...section.querySelectorAll('[data-filter]')];
    let items = D.gallery;
    const render = (filter) => {
      items = D.gallery.filter((g) => filter === 'Alla' || g.type === filter);
      grid.innerHTML = items.map((g, i) => {
        const im = img(g.img);
        return `<button type="button" class="gallery-item" data-index="${i}" aria-label="Visa ${esc(g.name)}"><img src="${im.src}" alt="${esc(im.alt)}" loading="lazy" width="1024" height="1024"><span class="gallery-caption">${esc(g.name)}</span>${icon('maximize')}</button>`;
      }).join('');
      grid.querySelectorAll('.gallery-item').forEach((b) => b.addEventListener('click', () => openLightbox(items, Number(b.dataset.index), b)));
    };
    filters.forEach((f) => f.addEventListener('click', () => {
      filters.forEach((x) => { const on = x === f; x.classList.toggle('active', on); x.setAttribute('aria-selected', String(on)); });
      render(f.dataset.filter);
    }));
    render('Alla');
  }

  function openLightbox(items, index, opener) {
    let i = index;
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    const box = document.createElement('div');
    box.className = 'dialog-content lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-labelledby', 'lightbox-title');
    box.innerHTML = `<button type="button" class="dialog-close" aria-label="Stäng">${icon('x')}</button><img src="" alt=""><div class="lightbox-bottom"><h2 id="lightbox-title"></h2><div class="lightbox-nav"><button type="button" class="btn btn-ghost btn-icon" data-dir="-1" aria-label="Föregående bild">${icon('chevronLeft')}</button><button type="button" class="btn btn-ghost btn-icon" data-dir="1" aria-label="Nästa bild">${icon('chevronRight')}</button></div></div>`;
    const imgEl = box.querySelector('img');
    const titleEl = box.querySelector('h2');
    const show = () => { const g = items[i]; const im = img(g.img); imgEl.src = im.src; imgEl.alt = im.alt; titleEl.textContent = g.name; };
    const step = (dir) => { i = (i + dir + items.length) % items.length; show(); };
    const close = () => { overlay.remove(); box.remove(); document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; opener?.focus(); };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab') trapFocus(e, box);
    };
    overlay.addEventListener('click', close);
    box.querySelector('.dialog-close').addEventListener('click', close);
    box.querySelectorAll('[data-dir]').forEach((b) => b.addEventListener('click', () => step(Number(b.dataset.dir))));
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.append(overlay, box);
    show();
    box.querySelector('.dialog-close').focus();
  }

  function trapFocus(e, container) {
    const f = [...container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea')];
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Visit page ---------- */
  function visitPage() {
    return `<div class="inner-page"><section class="section">
      ${sectionTitle({ label: 'Hitta till TacO’s', title: 'Välkommen till <em>Lindholmen.</em>', description: 'Ät på plats eller ta med – vi ses på Lindholmsallén.', h1: true })}
      <div class="visit-grid">
        <div>
          <iframe class="map-frame" title="Karta: ${B.street}, ${B.city}" src="${B.mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="visit-details">
            <div><h3>Hitta oss</h3><p>${B.street}<br>${B.city}</p><a href="${B.mapsLink}" target="_blank" rel="noreferrer">Vägbeskrivning ↗</a></div>
            <div><h3>Öppettider</h3><p>${B.days}<br>${B.hours}<br>${B.price}</p></div>
          </div>
        </div>
        <div class="inquiry">
          <h2 class="visit-form-title">Catering & gruppbeställningar</h2>
          <p class="visit-form-intro">Ska ni vara många? Kontoret, kalaset eller festen – berätta vad ni behöver så hör vi av oss.</p>
          <form class="inquiry-form" novalidate>
            <div class="form-grid">
              <div class="form-field"><label for="event-name">Ditt namn</label><input id="event-name" name="name" required maxlength="100" autocomplete="name" placeholder="För- och efternamn"></div>
              <div class="form-field"><label for="event-email">E-postadress</label><input id="event-email" name="email" type="email" required maxlength="255" autocomplete="email" placeholder="du@exempel.se"></div>
              <div class="form-field full"><label for="event-message">Berätta om ert event</label><textarea id="event-message" name="message" rows="6" maxlength="2000" required placeholder="Datum, antal personer och vad ni är sugna på…"></textarea></div>
            </div>
            <p class="form-error" role="alert" hidden></p>
            <button class="btn btn-primary form-submit" type="submit">Skicka förfrågan ${icon('arrowRight')}</button>
          </form>
        </div>
      </div>
    </section></div>`;
  }

  /* ---------- Forms ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  async function send(type, data) {
    if (!D.formEndpoint) throw new Error('not-configured');
    await fetch(D.formEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ type, ...data }) });
  }

  function initInquiry(root) {
    const wrap = root.querySelector('.inquiry');
    if (!wrap) return;
    const form = wrap.querySelector('form');
    const err = form.querySelector('.form-error');
    const btn = form.querySelector('button[type=submit]');
    const showError = (msg) => { err.textContent = msg; err.hidden = false; };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.hidden = true;
      const data = Object.fromEntries(new FormData(form));
      Object.keys(data).forEach((k) => { data[k] = String(data[k]).trim(); });
      if (!data.name || !EMAIL_RE.test(data.email) || !data.message) { showError('Kontrollera ditt namn, din e-postadress och ditt meddelande.'); return; }
      btn.disabled = true;
      const label = btn.innerHTML;
      btn.textContent = 'Skickar…';
      try {
        await send('catering', data);
        wrap.querySelector('form').hidden = true;
        const ok = document.createElement('div');
        ok.className = 'success-state';
        ok.innerHTML = `${icon('check')}<h3>Tack! Vi hör av oss.</h3><p>Din förfrågan är mottagen.</p><button type="button" class="btn btn-text">Skicka en till ${icon('arrowRight')}</button>`;
        ok.querySelector('button').addEventListener('click', () => { ok.remove(); form.reset(); form.hidden = false; });
        wrap.append(ok);
      } catch (ex) {
        showError(ex.message === 'not-configured'
          ? 'Formuläret är inte aktiverat ännu. Kom gärna förbi oss på Lindholmsallén 8A.'
          : 'Vi kunde inte skicka din förfrågan. Försök igen om en stund.');
      } finally {
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
  }

  function initNewsletter(root) {
    const form = root.querySelector('.footer-newsletter');
    if (!form) return;
    const status = root.querySelector('.footer-status');
    const btn = form.querySelector('button');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!EMAIL_RE.test(email)) { status.textContent = 'Ange en giltig e-postadress.'; return; }
      btn.disabled = true;
      try {
        await send('newsletter', { email });
        status.textContent = 'Välkommen in! Du står på listan.';
        form.reset();
      } catch (ex) {
        status.textContent = ex.message === 'not-configured' ? 'Nyhetsbrevet startar snart – håll utkik!' : 'Försök igen om en stund.';
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---------- Header behaviour + drawer ---------- */
  function initHeader(root) {
    const head = root.querySelector('.site-header');
    if (PAGE === 'home') {
      const onScroll = () => head.classList.toggle('scrolled', window.scrollY > 30);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    const toggle = head.querySelector('.mobile-menu-toggle');
    toggle.addEventListener('click', () => {
      const backdrop = document.createElement('div');
      backdrop.className = 'drawer-backdrop';
      const drawer = document.createElement('div');
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'Navigering');
      drawer.innerHTML = `<div class="mobile-drawer-top"><span class="wordmark">TACO’S</span><button type="button" class="btn btn-ghost btn-icon" aria-label="Stäng menyn">${icon('x')}</button></div><nav>${navLinks()}</nav><a class="btn btn-primary" href="meny.html">Se menyn ${icon('arrowRight')}</a>`;
      const close = () => { backdrop.remove(); drawer.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); };
      const onKey = (e) => { if (e.key === 'Escape') close(); if (e.key === 'Tab') trapFocus(e, drawer); };
      backdrop.addEventListener('click', close);
      drawer.querySelector('button').addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      document.body.append(backdrop, drawer);
      toggle.setAttribute('aria-expanded', 'true');
      drawer.querySelector('button').focus();
    });
  }

  /* ---------- Page assembly ---------- */
  const PAGES = {
    home: () => hero() + menuSection(false) + storySection(false) + gallerySection(false),
    menu: () => `<div class="inner-page">${menuSection(true)}</div>`,
    story: () => `<div class="inner-page"><div class="section">${sectionTitle({ label: 'Historien om TacO’s', title: 'Varje taco har en historia.', h1: true })}</div>${storySection(true)}</div>`,
    gallery: () => `<div class="inner-page">${gallerySection(true)}</div>`,
    visit: visitPage
  };

  const app = document.getElementById('app');
  app.innerHTML = header() + `<main>${(PAGES[PAGE] || PAGES.home)()}</main>` + closingBand() + footer();
  initHeader(app);
  initHero(app);
  initMenu(app);
  initGallery(app);
  initInquiry(app);
  initNewsletter(app);
})();
