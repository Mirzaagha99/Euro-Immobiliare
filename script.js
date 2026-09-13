// Apertura/chiusura del menu di navigazione su schermi piccoli (mobile)
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    var isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Chiude il menu quando si clicca su un link (utile su mobile)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// Invio del modulo di contatto senza ricaricare la pagina (usa Formspree)
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          feedback.textContent = 'Richiesta inviata. Ti ricontatteremo al più presto.';
          feedback.className = 'form-feedback success';
          form.reset();
        } else {
          feedback.textContent = 'Non è stato possibile inviare la richiesta. Chiamaci o scrivici su WhatsApp.';
          feedback.className = 'form-feedback error';
        }
      })
      .catch(function () {
        feedback.textContent = 'Errore di connessione. Chiamaci o scrivici su WhatsApp.';
        feedback.className = 'form-feedback error';
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Invia richiesta';
      });
  });
});
