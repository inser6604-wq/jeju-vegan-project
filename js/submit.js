// 가게 등록 폼 제출
(function () {
  var storeForm = document.getElementById('storeForm');
  if (!storeForm) return;

  storeForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    var name = document.getElementById('store-name').value.trim();
    if (!name) return;

    var payload = {
      type: 'store',
      name: name,
      address: (document.getElementById('store-address').value || '').trim(),
      phone: (document.getElementById('store-phone').value || '').trim(),
      vegan_info: (document.getElementById('vegan-option').value || '').trim(),
      description: (document.getElementById('store-intro').value || '').trim(),
      opening_hours: (document.getElementById('business-hours').value || '').trim(),
      closed_days: (document.getElementById('regular-holiday').value || '').trim(),
    };

    var submitBtn = document.getElementById('storeSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = '제출 중...';

    var { error } = await sb.from('submissions').insert(payload);

    if (error) {
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      submitBtn.disabled = false;
      submitBtn.textContent = '제출하기 ✓';
      return;
    }

    showSuccess('store');
  });
})();

// 맛집 제보 폼 제출
(function () {
  var reportForm = document.querySelector('.report-form-body');
  if (!reportForm) return;

  reportForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    var name = document.getElementById('r-store-name').value.trim();
    if (!name) return;

    var payload = {
      type: 'report',
      name: name,
      address: (document.getElementById('r-location').value || '').trim(),
      vegan_info: (document.getElementById('r-vegan-info').value || '').trim(),
    };

    var reportBtn = reportForm.querySelector('.btn-report-submit');
    reportBtn.disabled = true;
    reportBtn.textContent = '제출 중...';

    var { error } = await sb.from('submissions').insert(payload);

    if (error) {
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      reportBtn.disabled = false;
      reportBtn.textContent = '제보하기';
      return;
    }

    showSuccess('report');
  });
})();

function showSuccess(type) {
  var targetClass = type === 'store' ? '.submit-store-content' : '.submit-report-content';
  var section = document.querySelector(targetClass);
  if (!section) return;

  section.innerHTML = `
    <div class="submit-success">
      <div class="submit-success-icon">✓</div>
      <h2>${type === 'store' ? '등록 신청이 완료됐어요!' : '제보가 접수됐어요!'}</h2>
      <p>${type === 'store'
        ? '관리자 검토 후 2-3일 내 등록됩니다.<br>감사합니다 🌱'
        : '저희 팀이 확인 후 등록해드릴게요.<br>소중한 제보 감사해요 🌱'
      }</p>
      <button type="button" class="btn submit-success-retry" onclick="location.reload()">
        ${type === 'store' ? '다시 등록하기' : '다시 제보하기'}
      </button>
    </div>`;
}
