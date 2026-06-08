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

document.addEventListener("click", (e) => {
  const mobileMenu = document.querySelector(".mobile-menu");

  // 햄버거 버튼 토글
  const menuBtn = e.target.closest(".menu-btn");
  if (menuBtn) {
    e.preventDefault();
    const isActive = menuBtn.classList.toggle("active");
    mobileMenu?.classList.toggle("active", isActive);
    document.body.classList.toggle("menu-open", isActive);
    return;
  }

  // X 닫기 버튼
  if (e.target.closest(".mobile-menu-close")) {
    document.querySelector(".menu-btn")?.classList.remove("active");
    mobileMenu?.classList.remove("active");
    document.body.classList.remove("menu-open");
    return;
  }

  // 메뉴 외부(오버레이) 클릭 시 닫기
  if (document.body.classList.contains("menu-open") && !e.target.closest(".mobile-menu")) {
    document.querySelector(".menu-btn")?.classList.remove("active");
    mobileMenu?.classList.remove("active");
    document.body.classList.remove("menu-open");
    return;
  }

  // 아코디언 메인메뉴 토글
  const span = e.target.closest(".mobile-depth1 > li > span");
  if (span) {
    const subMenu = span.nextElementSibling;
    document.querySelectorAll(".mobile-depth2").forEach(item => {
      if (item !== subMenu) item.classList.remove("active");
    });
    subMenu?.classList.toggle("active");
  }

    // pick / course 탭 버튼 active 토글
  const tabBtn = e.target.closest(".tab-list .tab-btn");
  if (tabBtn) {
    const tabList = tabBtn.closest(".tab-list");
    tabList.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    tabBtn.classList.add("active");
  }
});
