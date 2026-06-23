/* ===================================================================
   MADAD AI — script.js
   Shared layout, data and behaviours for every page of the site.
=================================================================== */

/* ----------------------------- DATA ----------------------------- */

const NURSES = [
  { id: 1, name: "Mavzum Rahimova",  specialty: "Pediatriya",   exp: 8,  rating: 4.95, orders: 196, status: "active" },
  { id: 2, name: "Zulfiya Qosimova", specialty: "Jarrohlik",    exp: 12, rating: 4.97, orders: 248, status: "active" },
  { id: 3, name: "Dilnoza Yusupova", specialty: "Kardiologiya", exp: 6,  rating: 4.80, orders: 134, status: "busy"   },
  { id: 4, name: "Nilufar Toshmatova", specialty: "Nevrologiya", exp: 5, rating: 4.93, orders: 178, status: "active" },
  { id: 5, name: "Sevara Aliyeva",   specialty: "Ginekologiya", exp: 9,  rating: 4.88, orders: 165, status: "active" },
  { id: 6, name: "Gulnoza Sodiqova", specialty: "Ortopediya",   exp: 7,  rating: 4.75, orders: 121, status: "busy"   },
  { id: 7, name: "Madina Ergasheva", specialty: "Pediatriya",   exp: 4,  rating: 4.70, orders: 98,  status: "active" },
  { id: 8, name: "Shahnoza Nurmatova", specialty: "Tibbiy test", exp: 6, rating: 4.82, orders: 110, status: "active" }
];

const DOCTORS = [
  { id: 1, name: "Dr. Sherzod Karimov", specialty: "Kardiolog",   exp: 15, rating: 4.9, status: "active" },
  { id: 2, name: "Dr. Malika Umarova",  specialty: "Pediatr",     exp: 10, rating: 4.8, status: "active" },
  { id: 3, name: "Dr. Jasur Toshmatov", specialty: "Nevrolog",    exp: 12, rating: 4.9, status: "active" },
  { id: 4, name: "Dr. Nargiza Yusupova",specialty: "Ginekolog",   exp: 18, rating: 5.0, status: "busy"   },
  { id: 5, name: "Dr. Bahodir Ne'matov",specialty: "Terapevt",    exp: 9,  rating: 4.7, status: "active" },
  { id: 6, name: "Dr. Aziza Rashidova", specialty: "Travmatolog", exp: 11, rating: 4.6, status: "active" },
  { id: 7, name: "Dr. Olim Sattorov",   specialty: "Endokrinolog",exp: 8,  rating: 4.75,status: "active" },
  { id: 8, name: "Dr. Kamola Ismoilova",specialty: "Kardiolog",   exp: 6,  rating: 4.65,status: "busy"   }
];

const SPECIALTIES = ["Terapevt","Kardiolog","Pediatr","Nevrolog","Ginekolog","Travmatolog","Endokrinolog"];

const REGIONS = {
  "Toshkent shahri": {
    "Yunusobod": ["Bog'ishamol", "Minor", "Yangi hayot"],
    "Chilonzor": ["Chilonzor-1", "Chilonzor-9"],
    "Mirzo Ulug'bek": ["Olmazor", "Buyuk Ipak Yo'li"]
  },
  "Toshkent viloyati": {
    "Zangiota": ["Zangiota MFY"],
    "Qibray": ["Qibray markaz"]
  },
  "Samarqand": {
    "Samarqand shahri": ["Registon"],
    "Urgut": ["Urgut markaz"]
  },
  "Farg'ona": {
    "Farg'ona shahri": ["Marg'ilon yo'li"],
    "Qo'qon": ["Qo'qon markazi"]
  }
};

const AI_RULES = [
  { keywords: ["bosh", "migren", "boshim"], specialties: ["Terapevt", "Nevrolog"] },
  { keywords: ["yurak", "yurakim", "puls"], specialties: ["Kardiolog"] },
  { keywords: ["bola", "bolam", "chaqaloq"], specialties: ["Pediatr"] },
  { keywords: ["bosim", "qon bosim"], specialties: ["Kardiolog", "Terapevt"] },
  { keywords: ["asab", "stress", "uyqu", "tashvish"], specialties: ["Nevrolog"] },
  { keywords: ["homila", "ayol", "oylik"], specialties: ["Ginekolog"] },
  { keywords: ["suyak", "jarohat", "singan", "oyoq", "qo'l"], specialties: ["Travmatolog"] },
  { keywords: ["qand", "diabet"], specialties: ["Endokrinolog"] },
  { keywords: ["isitma", "shamol", "tana harorat", "yo'tal"], specialties: ["Terapevt"] }
];

const REVIEWS = [
  { user: "Aziz T.",   nurse: "Zulfiya Qosimova",  rating: 5, text: "Juda g'amxor va professional, operatsiyadan keyin parvarish ajoyib bo'ldi." },
  { user: "Kamola R.",  nurse: "Mavzum Rahimova",   rating: 5, text: "Bolam bilan juda yaxshi muloqot qildi, vaqtida keldi." },
  { user: "Sherzod Q.", nurse: "Nilufar Toshmatova",rating: 5, text: "Nevrologik parvarish bo'yicha tavsiyalari foydali bo'ldi." },
  { user: "Dilshod A.", nurse: "Sevara Aliyeva",    rating: 4, text: "Hammasi yaxshi, ammo biroz kechikib keldi." },
  { user: "Nodira S.",  nurse: "Dilnoza Yusupova",  rating: 5, text: "Bosimni doimiy nazorat qilib, juda ishonchli ishladi." }
];

const CHAT_SCRIPTS = {
  1: ["Assalomu alaykum! Bugun soat nechada kelishim mumkin?", "Albatta, kerakli dorilarni o'zim bilan olib kelaman."],
  2: ["Salom, operatsiyadan keyingi parvarish bo'yicha savolingiz bormi?", "Tashvishlanmang, men 12 yillik tajribaga egaman."],
  3: ["Bosimni har kuni o'lchab, sizga xabar beraman.", "Tahlil natijalari yaxshi ko'rinmoqda."],
  4: ["Nevrologik holatingiz bo'yicha bemalol so'rang.", "Kunlik mashqlar ro'yxatini yuboraman."]
};

/* -------------------------- LAYOUT HTML -------------------------- */

const NAV_ITEMS = [
  { href: "index.html",    icon: "fa-house",          label: "Bosh sahifa" },
  { href: "index.html#ai-help", icon: "fa-circle-question", label: "Qanday yordam kerak?" },
  { href: "chat.html",     icon: "fa-comments",       label: "Chat" },
  { href: "nurses.html",   icon: "fa-user-nurse",     label: "Hamshiralar" },
  { href: "doctors.html",  icon: "fa-user-doctor",    label: "Shifokorlar" },
  { href: "ratings.html",  icon: "fa-star",           label: "Reytinglar" },
  { href: "order.html",    icon: "fa-clipboard-list", label: "Buyurtma berish" },
  { href: "regions.html",  icon: "fa-map-location-dot",label: "Hududlar" },
  { href: "about.html",    icon: "fa-circle-info",    label: "Biz haqimizda" }
];

function headerHTML(){
  return `
  <div class="header-inner">
    <div class="header-left">
      <button class="hamburger" id="hamburgerBtn" aria-label="Menyu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <a href="index.html" class="logo"><span class="logo-badge"><i class="fa-solid fa-heart-pulse"></i></span>MADAD AI</a>
    </div>
    <div class="header-right">
      <a href="ratings.html" class="btn btn-outline hide-mobile btn-sm"><i class="fa-solid fa-star"></i> Reyting</a>
      <a href="login.html" class="btn btn-outline btn-sm"><i class="fa-solid fa-right-to-bracket"></i> <span class="hide-mobile">Kirish</span></a>
      <a href="register.html" class="btn btn-primary btn-sm">Ro'yxatdan o'tish</a>
    </div>
  </div>`;
}

function sidebarHTML(activeHref){
  const items = NAV_ITEMS.map(it => {
    const isActive = activeHref === it.href.split('#')[0] && !it.href.includes('#');
    return `<a href="${it.href}" class="${isActive ? 'active' : ''}"><i class="fa-solid ${it.icon}"></i> ${it.label}</a>`;
  }).join('');
  return `
  <div class="sidebar-header">
    <button class="sidebar-close" id="sidebarClose" aria-label="Yopish"><i class="fa-solid fa-xmark"></i></button>
    <a href="index.html" class="logo"><span class="logo-badge"><i class="fa-solid fa-heart-pulse"></i></span>MADAD AI</a>
    <p>Salom! Qanday yordam kerak? AI yordamida eng mos mutaxassisni tanlang.</p>
  </div>
  <nav class="sidebar-nav">${items}</nav>
  <div class="sidebar-foot">
    <a href="login.html" class="btn btn-outline">Kirish</a>
    <a href="register.html" class="btn btn-primary">Ro'yxat</a>
  </div>`;
}

function footerHTML(){
  return `
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo"><i class="fa-solid fa-heart-pulse"></i> MADAD AI</div>
        <p>AI yordamida eng mos tibbiy yordamni toping. Uyga malakali hamshira va shifokor chaqiring — tez, ishonchli, professional.</p>
        <div class="social-row">
          <a href="#" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
          <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div>
        <h4>Xizmatlar</h4>
        <ul>
          <li><a href="nurses.html">Uyda parvarish</a></li>
          <li><a href="nurses.html">Ukol &amp; dropper</a></li>
          <li><a href="doctors.html">Shifokor konsultatsiyasi</a></li>
          <li><a href="order.html">Tibbiy test</a></li>
          <li><a href="order.html">Kechasi qo'riqchi</a></li>
        </ul>
      </div>
      <div>
        <h4>Kompaniya</h4>
        <ul>
          <li><a href="about.html">Biz haqimizda</a></li>
          <li><a href="ratings.html">Reytinglar</a></li>
          <li><a href="regions.html">Hududlar</a></li>
          <li><a href="register.html">Hamshira bo'lib ishlash</a></li>
          <li><a href="login.html">Kirish</a></li>
        </ul>
      </div>
      <div>
        <h4>Aloqa</h4>
        <div class="footer-contact-item"><i class="fa-solid fa-location-dot"></i> Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 108-uy</div>
        <button class="btn btn-sm btn-outline-white" id="sendLocationBtn" style="margin-bottom:16px;"><i class="fa-solid fa-location-crosshairs"></i> Lokatsiyamni yuborish</button>
        <div class="footer-contact-item"><i class="fa-solid fa-phone"></i> +998 71 200 00 00</div>
        <div class="footer-contact-item"><i class="fa-solid fa-envelope"></i> info@madad.ai</div>
        <form id="footerChatForm" class="footer-chat-box">
          <input type="text" id="footerChatInput" placeholder="Tezkor xabar yuboring..." aria-label="Xabar">
          <button type="submit" aria-label="Yuborish"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 MADAD AI. Barcha huquqlar himoyalangan.</span>
      <span><a href="about.html">Maxfiylik siyosati</a><a href="about.html">Foydalanish shartlari</a><a href="tel:+998712000000">+998 71 200 00 00</a></span>
    </div>
  </div>`;
}

/* ----------------------------- LAYOUT INIT ----------------------------- */

function injectLayout(){
  const page = document.body.dataset.page || '';
  const headerEl = document.getElementById('app-header');
  const sidebarEl = document.getElementById('app-sidebar');
  const footerEl = document.getElementById('app-footer');
  if (headerEl){ headerEl.className = 'site-header'; headerEl.innerHTML = headerHTML(); }
  if (sidebarEl){ sidebarEl.className = 'app-sidebar'; sidebarEl.innerHTML = sidebarHTML(page); }
  if (footerEl){ footerEl.className = 'site-footer'; footerEl.innerHTML = footerHTML(); }

  if (!document.getElementById('sidebar-overlay')){
    const ov = document.createElement('div');
    ov.id = 'sidebar-overlay'; ov.className = 'sidebar-overlay';
    document.body.appendChild(ov);
  }
  if (!document.getElementById('toast-container')){
    const tc = document.createElement('div');
    tc.id = 'toast-container';
    document.body.appendChild(tc);
  }
  if (!document.getElementById('backToTop')){
    const bt = document.createElement('button');
    bt.id = 'backToTop'; bt.className = 'back-to-top'; bt.setAttribute('aria-label','Tepaga qaytish');
    bt.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(bt);
  }
}

function initHeaderScroll(){
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initSidebar(){
  const sidebar = document.querySelector('.app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburgerBtn');
  const closeBtn = document.getElementById('sidebarClose');
  if (!sidebar || !hamburger) return;

  const open = () => {
    sidebar.classList.add('is-open'); overlay.classList.add('is-active');
    hamburger.classList.add('is-open'); hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    sidebar.classList.remove('is-open'); overlay.classList.remove('is-active');
    hamburger.classList.remove('is-open'); hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  };
  hamburger.addEventListener('click', () => sidebar.classList.contains('is-open') ? close() : open());
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('is-visible', window.scrollY > 300));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function showToast(message, type = 'info'){
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initRevealAnimations(){
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

function initPageLoader(){
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 250));
  setTimeout(() => loader.classList.add('hide'), 1200);
}

function initFooterExtras(){
  const locBtn = document.getElementById('sendLocationBtn');
  if (locBtn){
    locBtn.addEventListener('click', () => {
      if (!navigator.geolocation){
        showToast("Brauzeringiz lokatsiyani qo'llamaydi.", 'error');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        () => showToast('Lokatsiyangiz muvaffaqiyatli yuborildi!', 'success'),
        () => showToast('Lokatsiyani aniqlab bo\'lmadi.', 'error')
      );
    });
  }
  const footerChatForm = document.getElementById('footerChatForm');
  if (footerChatForm){
    footerChatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('footerChatInput');
      const val = input.value.trim();
      if (!val) return;
      sessionStorage.setItem('madad_pending_msg', val);
      window.location.href = 'chat.html';
    });
  }
}

/* ----------------------------- HELPERS ----------------------------- */

function initials(name){
  return name.replace('Dr. ', '').split(' ').slice(0,2).map(p => p[0]).join('').toUpperCase();
}
function starString(rating){
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}
function statusLabel(status){ return status === 'active' ? 'Faol' : 'Band'; }

function personCard(person, type){
  const link = type === 'nurse' ? 'order.html' : 'order.html';
  return `
  <div class="card person-card reveal">
    <span class="badge-pill ${person.status === 'busy' ? 'busy' : ''}">${statusLabel(person.status)}</span>
    <div class="person-avatar">${initials(person.name)}<span class="status-dot ${person.status}"></span></div>
    <h3>${person.name}</h3>
    <div class="person-specialty">${person.specialty}</div>
    <div class="person-meta">${person.exp} yil tajriba &middot; ${person.orders ? person.orders + ' buyurtma' : ''}</div>
    <div class="stars">${starString(person.rating)} <span style="color:var(--text-light); font-weight:600;">${person.rating}</span></div>
    <div class="person-actions">
      <button class="btn btn-outline btn-sm" onclick="openChatWith('${person.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-comment"></i> Chat</button>
      <a href="${link}?name=${encodeURIComponent(person.name)}" class="btn btn-primary btn-sm"><i class="fa-solid fa-calendar-check"></i> Buyurtma</a>
    </div>
  </div>`;
}

function openChatWith(name){
  sessionStorage.setItem('madad_open_chat', name);
  window.location.href = 'chat.html';
}
window.openChatWith = openChatWith;

/* ----------------------------- PAGE: HOME ----------------------------- */

function initHome(){
  const region1 = document.getElementById('homeRegion');
  const district1 = document.getElementById('homeDistrict');
  const mahalla1 = document.getElementById('homeMahalla');
  if (region1){
    Object.keys(REGIONS).forEach(v => region1.add(new Option(v, v)));
    region1.addEventListener('change', () => {
      district1.innerHTML = '<option value="">Tuman tanlang</option>';
      mahalla1.innerHTML = '<option value="">Mahalla tanlang</option>';
      mahalla1.disabled = true;
      const districts = REGIONS[region1.value] || {};
      Object.keys(districts).forEach(d => district1.add(new Option(d, d)));
      district1.disabled = false;
    });
    district1.addEventListener('change', () => {
      mahalla1.innerHTML = '<option value="">Mahalla tanlang</option>';
      const list = (REGIONS[region1.value] || {})[district1.value] || [];
      list.forEach(m => mahalla1.add(new Option(m, m)));
      mahalla1.disabled = false;
    });
  }
  const searchForm = document.getElementById('homeSearchForm');
  if (searchForm){
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Hududingiz bo\'yicha mos hamshiralar topildi!', 'success');
      window.location.href = 'nurses.html';
    });
  }

  const featuredNurses = document.getElementById('featuredNurses');
  if (featuredNurses) featuredNurses.innerHTML = NURSES.slice(0,4).map(n => personCard(n,'nurse')).join('');
  const featuredDoctors = document.getElementById('featuredDoctors');
  if (featuredDoctors) featuredDoctors.innerHTML = DOCTORS.slice(0,4).map(d => personCard(d,'doctor')).join('');

  initAIBlock();

  document.querySelectorAll('[data-open-sidebar]').forEach(btn => {
    btn.addEventListener('click', () => document.getElementById('hamburgerBtn').click());
  });
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initAIBlock(){
  const form = document.getElementById('aiForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('aiSymptomInput');
    const text = input.value.trim().toLowerCase();
    const resultBox = document.getElementById('aiResult');
    if (!text){
      showToast('Iltimos, simptomingizni yozing.', 'error');
      return;
    }
    let matched = null;
    for (const rule of AI_RULES){
      if (rule.keywords.some(k => text.includes(k))){ matched = rule; break; }
    }
    const specialties = matched ? matched.specialties : ['Terapevt'];
    const topDocs = DOCTORS.filter(d => specialties.includes(d.specialty)).slice(0,3);
    resultBox.innerHTML = `
      <strong>Sizga tavsiya etiladi: ${specialties.join(' yoki ')}</strong>
      <div class="specialist-list">${specialties.map(s => `<span>${s}</span>`).join('')}</div>
      <div class="grid grid-people" style="margin-top:16px;">
        ${topDocs.map(d => personCard(d,'doctor')).join('')}
      </div>`;
    resultBox.classList.add('is-visible');
  });
}

/* ----------------------------- PAGE: NURSES ----------------------------- */

function initNurses(){
  const grid = document.getElementById('nursesGrid');
  const chipRow = document.getElementById('nurseSpecialtyChips');
  if (!grid) return;
  const specialties = ['Barchasi', ...new Set(NURSES.map(n => n.specialty))];
  if (chipRow){
    chipRow.innerHTML = specialties.map((s,i) => `<button class="chip ${i===0?'active':''}" data-specialty="${s}">${s}</button>`).join('');
    chipRow.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      chipRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render(chip.dataset.specialty);
    });
  }
  function render(filter){
    const list = (!filter || filter === 'Barchasi') ? NURSES : NURSES.filter(n => n.specialty === filter);
    grid.innerHTML = list.length ? list.map(n => personCard(n,'nurse')).join('') :
      `<div class="empty-state"><i class="fa-solid fa-user-nurse"></i><p>Bu yo'nalishda hamshira topilmadi.</p></div>`;
    initRevealAnimations();
  }
  render('Barchasi');
}

/* ----------------------------- PAGE: DOCTORS ----------------------------- */

function initDoctors(){
  const grid = document.getElementById('doctorsGrid');
  const chipRow = document.getElementById('doctorSpecialtyChips');
  if (!grid) return;
  const all = ['Barchasi', ...SPECIALTIES];
  if (chipRow){
    chipRow.innerHTML = all.map((s,i) => `<button class="chip ${i===0?'active':''}" data-specialty="${s}">${s}</button>`).join('');
    chipRow.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      chipRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render(chip.dataset.specialty);
    });
  }
  function render(filter){
    const list = (!filter || filter === 'Barchasi') ? DOCTORS : DOCTORS.filter(d => d.specialty === filter);
    grid.innerHTML = list.length ? list.map(d => personCard(d,'doctor')).join('') :
      `<div class="empty-state"><i class="fa-solid fa-user-doctor"></i><p>Bu yo'nalishda shifokor topilmadi.</p></div>`;
    initRevealAnimations();
  }
  render('Barchasi');
}

/* ----------------------------- PAGE: CHAT ----------------------------- */

function initChat(){
  const contactsList = document.getElementById('chatContacts');
  const messagesBox = document.getElementById('chatMessages');
  const windowHead = document.getElementById('chatWindowHead');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  if (!contactsList) return;

  const contacts = NURSES.slice(0,4);
  const state = {};
  contacts.forEach(c => {
    state[c.id] = [
      { from: 'them', text: `Assalomu alaykum! Men ${c.name}, sizga qanday yordam bera olaman?`, time: '09:1' + c.id },
      { from: 'them', text: CHAT_SCRIPTS[c.id] ? CHAT_SCRIPTS[c.id][0] : 'Savolingiz bo\'lsa yozing.', time: '09:2' + c.id }
    ];
  });
  let activeId = contacts[0].id;

  function renderContacts(){
    contactsList.innerHTML = contacts.map(c => {
      const last = state[c.id][state[c.id].length - 1];
      return `
      <div class="contact-item ${c.id === activeId ? 'active' : ''}" data-id="${c.id}">
        <div class="person-avatar">${initials(c.name)}<span class="status-dot ${c.status}"></span></div>
        <div class="contact-info">
          <div class="contact-name">${c.name}</div>
          <div class="contact-last">${last.text}</div>
        </div>
        <div class="contact-time">${last.time.split(':')[0]}:00</div>
      </div>`;
    }).join('');
    contactsList.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', () => { activeId = Number(item.dataset.id); renderAll(); });
    });
  }

  function renderWindow(){
    const c = contacts.find(x => x.id === activeId);
    windowHead.innerHTML = `
      <div class="person-avatar">${initials(c.name)}<span class="status-dot ${c.status}"></span></div>
      <div><div class="contact-name">${c.name}</div><div class="contact-last">${c.specialty} &middot; ${statusLabel(c.status)}</div></div>`;
    messagesBox.innerHTML = state[c.id].map(m => `
      <div class="msg ${m.from === 'me' ? 'out' : 'in'}">${m.text}<span class="msg-time">${m.time.includes(':') ? m.time : ''}</span></div>
    `).join('');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function renderAll(){ renderContacts(); renderWindow(); }

  function sendMessage(text){
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    state[activeId].push({ from: 'me', text, time: timeStr });
    renderAll();
    setTimeout(() => {
      const c = contacts.find(x => x.id === activeId);
      const script = CHAT_SCRIPTS[c.id] || ["Rahmat, tez orada javob beraman."];
      const reply = script[Math.floor(Math.random() * script.length)];
      state[activeId].push({ from: 'them', text: reply, time: timeStr });
      renderAll();
    }, 900);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    sendMessage(input.value);
    input.value = '';
  });

  document.querySelectorAll('.quick-replies button').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.textContent.trim()));
  });

  const pendingMsg = sessionStorage.getItem('madad_pending_msg');
  const openWith = sessionStorage.getItem('madad_open_chat');
  if (openWith){
    const found = contacts.find(c => c.name === openWith);
    if (found) activeId = found.id;
    sessionStorage.removeItem('madad_open_chat');
  }
  renderAll();
  if (pendingMsg){
    sessionStorage.removeItem('madad_pending_msg');
    setTimeout(() => sendMessage(pendingMsg), 400);
  }
}

/* ----------------------------- PAGE: RATINGS ----------------------------- */

function initRatings(){
  const podium = document.getElementById('ratingsPodium');
  const list = document.getElementById('ratingsList');
  const reviewsBox = document.getElementById('reviewsBox');
  if (!podium) return;
  const sorted = [...NURSES].sort((a,b) => b.rating - a.rating || b.orders - a.orders);
  const top3 = sorted.slice(0,3);
  const tiers = ['gold','silver','bronze'];
  const medalIcon = ['fa-trophy','fa-medal','fa-medal'];
  podium.innerHTML = top3.map((n,i) => `
    <div class="card podium-card ${tiers[i]} reveal">
      <div class="rank-badge ${tiers[i]}"><i class="fa-solid ${medalIcon[i]}"></i></div>
      <div class="person-avatar" style="margin:0 auto 10px;">${initials(n.name)}</div>
      <h3 style="margin-bottom:2px;">${n.name}</h3>
      <div class="person-specialty">${n.specialty}</div>
      <div class="stars">${starString(n.rating)} ${n.rating}</div>
      <div class="person-meta">${n.orders} buyurtma</div>
    </div>`).join('');

  const rest = sorted.slice(3,6);
  list.innerHTML = rest.map((n,i) => `
    <div class="rank-row">
      <div class="rank-badge plain">${i+4}</div>
      <div class="person-avatar">${initials(n.name)}</div>
      <div style="flex:1;">
        <div class="ri-name">${n.name}</div>
        <div class="ri-meta">${n.specialty} &middot; ${n.orders} buyurtma</div>
      </div>
      <div class="stars">${n.rating}</div>
    </div>`).join('');

  reviewsBox.innerHTML = REVIEWS.map(r => `
    <div class="card review-card reveal">
      <div class="review-head">
        <div class="person-avatar">${r.user.split(' ').map(p=>p[0]).join('')}</div>
        <div>
          <div class="review-name">${r.user}</div>
          <div class="review-stars">${starString(r.rating)}</div>
        </div>
      </div>
      <p class="review-text">"${r.text}" &mdash; <strong>${r.nurse}</strong> haqida</p>
    </div>`).join('');

  initStarInput();
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm){
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const rating = document.querySelectorAll('#starInput i.active').length;
      if (rating === 0){ showToast('Iltimos, yulduz tanlang.', 'error'); return; }
      showToast('Izohingiz uchun rahmat!', 'success');
      reviewForm.reset();
      document.querySelectorAll('#starInput i').forEach(i => i.classList.remove('active'));
    });
  }
}

function initStarInput(){
  const box = document.getElementById('starInput');
  if (!box) return;
  const stars = box.querySelectorAll('i');
  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      stars.forEach((s,i) => s.classList.toggle('active', i <= idx));
    });
  });
}

/* ----------------------------- PAGE: ORDER ----------------------------- */

function initOrder(){
  const form = document.getElementById('orderForm');
  if (!form) return;
  const nurseSelect = document.getElementById('orderNurse');
  if (nurseSelect){
    NURSES.forEach(n => nurseSelect.add(new Option(`${n.name} (${n.specialty})`, n.name)));
    nurseSelect.add(new Option('Istalgan hamshira', 'Istalgan'));
  }
  const params = new URLSearchParams(window.location.search);
  const nameParam = params.get('name');
  if (nameParam && nurseSelect){
    const opt = [...nurseSelect.options].find(o => o.value === nameParam);
    if (opt) nurseSelect.value = nameParam;
  }
  const region = document.getElementById('orderRegion');
  const district = document.getElementById('orderDistrict');
  const mahalla = document.getElementById('orderMahalla');
  if (region){
    Object.keys(REGIONS).forEach(v => region.add(new Option(v, v)));
    region.addEventListener('change', () => {
      district.innerHTML = '<option value="">Tuman tanlang</option>';
      mahalla.innerHTML = '<option value="">Mahalla tanlang</option>';
      Object.keys(REGIONS[region.value] || {}).forEach(d => district.add(new Option(d,d)));
    });
    district.addEventListener('change', () => {
      mahalla.innerHTML = '<option value="">Mahalla tanlang</option>';
      ((REGIONS[region.value] || {})[district.value] || []).forEach(m => mahalla.add(new Option(m,m)));
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm(form)){
      showToast('Buyurtmangiz qabul qilindi! Tez orada bog\'lanamiz.', 'success');
      form.reset();
      form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    } else {
      showToast('Iltimos, barcha majburiy maydonlarni to\'g\'ri to\'ldiring.', 'error');
    }
  });
}

function validateForm(form){
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const errorEl = field.closest('.form-group')?.querySelector('.error-text');
    let fieldValid = field.value.trim() !== '';
    if (field.type === 'tel' && fieldValid){
      fieldValid = /^[\d+\s()-]{7,15}$/.test(field.value.trim());
    }
    field.classList.toggle('invalid', !fieldValid);
    if (errorEl) errorEl.classList.toggle('is-visible', !fieldValid);
    if (!fieldValid) valid = false;
  });
  return valid;
}

/* ----------------------------- PAGE: REGIONS ----------------------------- */

function initRegions(){
  const region = document.getElementById('regionsViloyat');
  const district = document.getElementById('regionsTuman');
  const mahalla = document.getElementById('regionsMahalla');
  const summary = document.getElementById('regionsSummary');
  const grid = document.getElementById('regionsNurseGrid');
  if (!region) return;

  Object.keys(REGIONS).forEach(v => region.add(new Option(v, v)));

  function renderResults(){
    const count = Math.max(2, Math.floor(Math.random() * 6) + 2);
    summary.innerHTML = `
      <span class="pill-stat"><i class="fa-solid fa-user-nurse"></i> ${count} hamshira mavjud</span>
      <span class="pill-stat"><i class="fa-solid fa-user-doctor"></i> ${Math.max(1, count - 3)} shifokor mavjud</span>
      <span class="pill-stat"><i class="fa-solid fa-clock"></i> O'rtacha javob: 12 daqiqa</span>`;
    grid.innerHTML = NURSES.slice(0, count > 8 ? 8 : count).map(n => personCard(n,'nurse')).join('');
    initRevealAnimations();
  }

  region.addEventListener('change', () => {
    district.innerHTML = '<option value="">Tuman tanlang</option>';
    mahalla.innerHTML = '<option value="">Mahalla tanlang</option>';
    district.disabled = !region.value;
    mahalla.disabled = true;
    Object.keys(REGIONS[region.value] || {}).forEach(d => district.add(new Option(d,d)));
  });
  district.addEventListener('change', () => {
    mahalla.innerHTML = '<option value="">Mahalla tanlang</option>';
    mahalla.disabled = !district.value;
    ((REGIONS[region.value] || {})[district.value] || []).forEach(m => mahalla.add(new Option(m,m)));
  });
  mahalla.addEventListener('change', () => { if (mahalla.value) renderResults(); });
}

/* ----------------------------- PAGE: LOGIN ----------------------------- */

function initLogin(){
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm(form)){
      showToast('Muvaffaqiyatli kirdingiz! Yo\'naltirilmoqda...', 'success');
      setTimeout(() => window.location.href = 'index.html', 1200);
    } else {
      showToast('Login yoki parol noto\'g\'ri kiritildi.', 'error');
    }
  });
}

/* ----------------------------- PAGE: REGISTER ----------------------------- */

function initRegister(){
  const tabBtns = document.querySelectorAll('#registerTabs button');
  const panels = document.querySelectorAll('.register-panel');
  if (tabBtns.length){
    tabBtns.forEach(btn => btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(p => p.style.display = p.id === btn.dataset.target ? 'block' : 'none');
    }));
  }
  ['patientForm','nurseForm'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (validateForm(form)){
        showToast('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!', 'success');
        form.reset();
      } else {
        showToast('Iltimos, barcha majburiy maydonlarni to\'ldiring.', 'error');
      }
    });
  });
}

/* ----------------------------- BOOTSTRAP ----------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initHeaderScroll();
  initSidebar();
  initBackToTop();
  initFooterExtras();
  initPageLoader();

  const page = document.body.dataset.page;
  const initMap = {
    home: initHome, nurses: initNurses, doctors: initDoctors, chat: initChat,
    ratings: initRatings, order: initOrder, regions: initRegions, login: initLogin,
    register: initRegister
  };
  if (initMap[page]) initMap[page]();

  initRevealAnimations();
});
