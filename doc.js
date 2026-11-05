// Páginas de texto (privacidad, normas): cada idioma es un bloque con su
// atributo lang dentro de .doc. Se ve el del navegador (español por defecto)
// y el botón .lang cambia al otro. Los enlaces .mail toman el correo de
// config.js.
(function () {
  var cfg = window.PROJECTA || {};
  var email = cfg.accountEmail || cfg.contactEmail || '';
  // Published alone (no rest of the site): drop the links to it.
  if (cfg.standalone) {
    document.documentElement.classList.add('standalone');
    document.querySelectorAll('a[data-site-link]').forEach(function (a) {
      a.removeAttribute('href');
    });
  }
  document.querySelectorAll('a.mail').forEach(function (a) {
    a.textContent = email;
    a.href = 'mailto:' + email + (a.dataset.subject ? '?subject=' + encodeURIComponent(a.dataset.subject) : '');
  });

  var stored = null;
  try { stored = localStorage.getItem('projecta_lang'); } catch (e) {}
  var lang = stored || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');

  function show(l) {
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== l;
    });
    var title = document.querySelector('meta[name="title-' + l + '"]');
    if (title) document.title = title.content;
    var btn = document.querySelector('.lang');
    if (btn) btn.textContent = l === 'es' ? 'English' : 'Español';
  }

  var btn = document.querySelector('.lang');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = lang === 'es' ? 'en' : 'es';
      try { localStorage.setItem('projecta_lang', next); } catch (e) {}
      show(next);
    });
  }
  show(lang);
})();
