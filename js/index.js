document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('.like-icon');
    btn.classList.toggle('is-active');

    // 빈 하트 ↔ 채운 하트 토글
    if (btn.classList.contains('is-active')) {
      icon.dataset.icon = 'mdi:heart';
    } else {
      icon.dataset.icon = 'mdi:heart-outline';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {

      // FAQ 아코디언
      document.querySelectorAll('.js-faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var item = this.closest('.faq-item');
          var isActive = item.classList.contains('active');

          item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (el) {
            el.classList.remove('active');
            el.querySelector('.js-faq-question').setAttribute('aria-expanded', 'false');
          });

          if (!isActive) {
            item.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // 카테고리 탭 필터
      document.querySelectorAll('.js-tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.js-tab-btn').forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');

          var tab = this.dataset.tab;
          document.querySelectorAll('.faq-group').forEach(function (group) {
            group.style.display = (tab === 'all' || group.dataset.panel === tab) ? '' : 'none';
          });
        });
      });

      // 검색
      var searchForm = document.querySelector('.faq-search-form');
      var searchInput = document.querySelector('.faq-search-input');

      function runSearch() {
        var query = searchInput.value.trim().toLowerCase();

        if (!query) {
          document.querySelectorAll('.faq-item').forEach(function (item) { item.style.display = ''; });
          document.querySelectorAll('.faq-group').forEach(function (group) { group.style.display = ''; });
          return;
        }

        document.querySelectorAll('.faq-group').forEach(function (group) {
          var hasVisible = false;
          group.querySelectorAll('.faq-item').forEach(function (item) {
            var match = item.textContent.toLowerCase().includes(query);
            item.style.display = match ? '' : 'none';
            if (match) hasVisible = true;
          });
          group.style.display = hasVisible ? '' : 'none';
        });
      }

      if (searchForm) searchForm.addEventListener('submit', function (e) { e.preventDefault(); runSearch(); });
      if (searchInput) searchInput.addEventListener('input', runSearch);
    });

function setSubmitTabFromHash() {
  const hash = window.location.hash.slice(1);
  if (hash === 'tab-store' || hash === 'tab-report') {
    const tab = document.getElementById(hash);
    if (tab) tab.checked = true;
  }
}

var goTopBtn = document.getElementById('goTopBtn');
if (goTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      goTopBtn.classList.add('is-visible');
    } else {
      goTopBtn.classList.remove('is-visible');
    }
  });

  goTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('DOMContentLoaded', setSubmitTabFromHash);
window.addEventListener('hashchange', setSubmitTabFromHash);
