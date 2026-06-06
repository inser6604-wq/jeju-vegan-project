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