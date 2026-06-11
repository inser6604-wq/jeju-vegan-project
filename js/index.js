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

      // 메인 히어로 슬라이더
      (function initHeroSlider() {
        var hero = document.querySelector('.home-hero');
        if (!hero) return;

        var slides = hero.querySelectorAll('.home-hero-slide');
        var heroSearch = hero.querySelector('.home-hero-inner--search');
        var heroMain = hero.querySelector('.home-hero-inner--main');
        var heroFresh = hero.querySelector('.home-hero-inner--fresh');
        var currentEl = hero.querySelector('.home-hero-current');
        var totalEl = hero.querySelector('.home-hero-total');
        var prevBtn = hero.querySelector('.home-hero-prev');
        var nextBtn = hero.querySelector('.home-hero-next');
        var total = slides.length;
        var current = 0;
        var timer = null;
        var INTERVAL = 3000;

        if (!total) return;

        function pad(num) {
          return String(num).padStart(2, '0');
        }

        function updateCounter() {
          if (currentEl) currentEl.textContent = pad(current + 1);
          if (totalEl) totalEl.textContent = pad(total);
        }

        function updateContent() {
          if (heroSearch) heroSearch.classList.toggle('is-visible', current === 0);
          if (heroMain) heroMain.classList.toggle('is-visible', current === 1);
          if (heroFresh) heroFresh.classList.toggle('is-visible', current === 2);
        }

        function goTo(index) {
          slides[current].classList.remove('is-active');
          current = (index + total) % total;
          slides[current].classList.add('is-active');
          updateCounter();
          updateContent();
        }

        function next() {
          goTo(current + 1);
        }

        function prev() {
          goTo(current - 1);
        }

        function startAutoplay() {
          stopAutoplay();
          timer = window.setInterval(next, INTERVAL);
        }

        function stopAutoplay() {
          if (timer) {
            window.clearInterval(timer);
            timer = null;
          }
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            prev();
            startAutoplay();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            next();
            startAutoplay();
          });
        }

        hero.addEventListener('mouseenter', stopAutoplay);
        hero.addEventListener('mouseleave', startAutoplay);
        hero.addEventListener('focusin', stopAutoplay);
        hero.addEventListener('focusout', function (e) {
          if (!hero.contains(e.relatedTarget)) startAutoplay();
        });

        updateCounter();
        updateContent();
        startAutoplay();
      })();

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
      
      // 메인페이지 카운트업 애니메이션
      var countupItems = document.querySelectorAll('.home-map-stats strong[data-count]');
      if (countupItems.length) {
        function animateCount(item) {
          if (item.dataset.countStarted === 'true') return;
          item.dataset.countStarted = 'true';

          var target = parseInt(item.dataset.count, 10) || 0;
          var suffix = item.dataset.suffix || '';
          var duration = 2000;
          var startTime = null;

          function updateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.floor(progress * target);
            item.textContent = current + suffix;

            if (progress < 1) {
              window.requestAnimationFrame(updateCount);
            } else {
              item.textContent = target + suffix;
            }
          }

          window.requestAnimationFrame(updateCount);
        }

        var observer = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        countupItems.forEach(function (item) {
          observer.observe(item);
        });
      }
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

// 메인 페이지 투명 헤더: includeHTML 로딩 완료 후 초기화
document.addEventListener('includeHTMLLoaded', function () {
  if (!document.querySelector('.page-index')) return;

  var header = document.querySelector('.site-header');
  if (!header) return;

  var logoImg = header.querySelector('.logo img');
  var defaultLogo = 'image/jeju-vegan-logo-default.svg';
  var greenLogo = 'image/jeju-vegan-logo-green.svg';

  function updateHeader() {
    if (window.scrollY < 10) {
      header.classList.add('is-transparent');
      if (logoImg) logoImg.src = greenLogo;
    } else {
      header.classList.remove('is-transparent');
      if (logoImg) logoImg.src = defaultLogo;
    }
  }

  header.addEventListener('mouseenter', function () {
    if (header.classList.contains('is-transparent') && logoImg) {
      logoImg.src = defaultLogo;
    }
  });

  header.addEventListener('mouseleave', function () {
    if (header.classList.contains('is-transparent') && logoImg) {
      logoImg.src = greenLogo;
    }
  });

  window.addEventListener('scroll', updateHeader);
  updateHeader();
});

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

// map__________________________________________________________
// map-btn클릭 
const mapBtns = document.querySelectorAll('.map-btn');
const resetBtn = document.querySelector('#map-reset');

if (mapBtns.length) {
  mapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    mapBtns.forEach(btn => btn.classList.remove('active'));
  });
}

// map-filter-tab 여닫기 클릭
document.addEventListener('DOMContentLoaded', () => {
  const filterTab = document.querySelector('.map-filter-tab');
  const filterInner = document.querySelector('.map-filter-inner');
  const mapFilter = document.querySelector('.map-filter');
  const tabArrow = filterTab ? filterTab.querySelector('img') : null;
  let isOpen = true;

  if (filterTab && filterInner && mapFilter && tabArrow) {
    filterTab.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen = !isOpen;
      filterInner.classList.toggle('hidden', !isOpen);
      mapFilter.classList.toggle('closed', !isOpen);
      tabArrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  }
});

  // map-filter-search기능
const searchInput = document.querySelector('.map-search input');
const allCards = document.querySelectorAll('.map-place-card');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.trim().toLowerCase();

    allCards.forEach(card => {
      const title = card.querySelector('.map-card-title').textContent.toLowerCase();
      const place = card.querySelector('.card-place').textContent.toLowerCase();

      if (keyword === '') {
        if (card.classList.contains('map-hidden')) {
          card.style.display = 'none';
        } else {
          card.style.display = 'flex';
        }
      } else {
        if (title.includes(keyword)){
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
}

  // map-pin hover
const mapPinItems = document.querySelectorAll('.map-pin');

mapPinItems.forEach(pinItem => {
  const anchor = pinItem.querySelector('a');
  const greenImg = anchor.querySelector('img');

  const orangeImg = document.createElement('img');
  orangeImg.setAttribute('src', greenImg.getAttribute('src').replace('mappin-green', 'mappin-orange'));
  orangeImg.setAttribute('alt', 'mappin-orange');
  orangeImg.style.position = 'absolute';
  orangeImg.style.top = '0';
  orangeImg.style.left = '0';
  orangeImg.style.opacity = '0';
  orangeImg.style.transition = 'opacity 0.3s ease';

  greenImg.style.transition = 'opacity 0.3s ease';
  greenImg.style.display = 'block';

  anchor.style.display = 'block';
  anchor.style.position = 'relative';
  anchor.appendChild(orangeImg);

  pinItem.addEventListener('mouseenter', () => {
    greenImg.style.opacity = '0';
    orangeImg.style.opacity = '1';
  });

  pinItem.addEventListener('mouseleave', () => {
    greenImg.style.opacity = '1';
    orangeImg.style.opacity = '0';
  });
});
// map-list-tab 클릭
const mapListTab = document.querySelector('.map-list-tab');
const hiddenCards = document.querySelectorAll('.map-hidden');

if (mapListTab) {
  mapListTab.addEventListener('click', () => {
    const isHidden = mapListTab.classList.contains('active');

    hiddenCards.forEach(card => {
      card.classList.toggle('map-hidden');
    });

    mapListTab.classList.toggle('active');
    const tabImg = mapListTab.querySelector('img');
    if (tabImg) {
      tabImg.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    if (mapListTab.lastChild) {
      mapListTab.lastChild.textContent = isHidden ? '접기' : '더보기';
    }
  });
}