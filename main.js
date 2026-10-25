// Theme toggle, nav border on scroll, reveal-on-scroll and the contact form.
(function () {
  var root = document.documentElement;

  // Theme toggle: remembers the visitor's choice when storage is available.
  var toggle = document.getElementById('themeToggle');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Nav gets a hairline once the page scrolls.
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal sections as they enter the viewport.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Contact form: posts to FormSubmit's AJAX endpoint, which emails the owner.
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var endpoint = 'https://formsubmit.co/ajax/zafara26@iimklive.com';

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var ok = true;
    form.querySelectorAll('[required]').forEach(function (el) {
      var valid = el.value.trim() !== '' && (el.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.parentElement.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { setStatus('Please fill in your name, a valid email and a message.', 'err'); return; }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    setStatus('Sending...');

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.body.success) === 'true') {
          form.reset();
          setStatus("Thanks, your message is on its way. I'll get back to you soon.", 'ok');
        } else {
          throw new Error((res.body && res.body.message) || 'Request failed');
        }
      })
      .catch(function () {
        setStatus('Something went wrong. Please email me directly at zafara26@iimklive.com.', 'err');
      })
      .finally(function () { btn.disabled = false; });
  });
})();
