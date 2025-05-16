function changePage(pageNumber) {
  
    let pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.style.display = 'none';
    });

    let bigImage = document.querySelector('.bigCari img');

    if (pageNumber === 2) {
        bigImage.classList.add('rotate-img');
    } else {
        bigImage.classList.remove('rotate-img');
    }

    switch (pageNumber) {
        case 1:
            document.getElementById('content1').style.display = 'block';
            break;
        case 2:
            document.getElementById('content2').style.display = 'block';
            break;
        case 3:
            document.getElementById('content3').style.display = 'block';
            break;
    }
}





function showContent(buttonNumber) {

    let buttons = document.querySelectorAll('.bottom-buttons button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });


    document.querySelectorAll('.bottom-buttons button')[buttonNumber - 1].classList.add('active');

    changePage(buttonNumber);
}





const inputs = document.querySelectorAll("input, textarea");

inputs.forEach(input => {
  input.addEventListener("focus", () => {
    document.body.style.overflow = "hidden";
  });

  input.addEventListener("blur", () => {
    document.body.style.overflow = "auto";
  });
});


window.onload = function() {
    showContent(1);
};





document.querySelector('.logout-button').addEventListener('click', function() {
    localStorage.clear();
    sessionStorage.clear();
    location.replace("/"); 
});




















document.addEventListener('DOMContentLoaded', () => {
  const lesCari = document.querySelector('.lesCari');
  const pages = document.querySelectorAll('.content-page');

  document.querySelectorAll('.miniCari').forEach(item => {
    item.addEventListener('click', e => {
  e.preventDefault();
  const target = item.getAttribute('data-target');
  if (!target) return;

  // إزالة كلاس الدخول إن وجد
  lesCari.classList.remove('animate-in');
  lesCari.classList.add('animate-out');

  lesCari.addEventListener('animationend', function handleLesCariOut() {
    lesCari.style.display = 'none';
    lesCari.classList.remove('animate-out');
    lesCari.removeEventListener('animationend', handleLesCariOut);

    // أخفي كل الصفحات
    pages.forEach(page => {
      page.style.display = 'none';
      page.classList.remove('animate-in', 'animate-out');
    });

    // أظهر الصفحة المطلوبة مع أنيميشن الدخول
    const currentPage = document.getElementById(`content-${target}`);
    if (currentPage) {
      currentPage.style.display = 'block';

      // لإعادة تفعيل الأنيميشن كل مرة
      setTimeout(() => {
        currentPage.classList.add('animate-in');
      }, 10);
    }
  });
});

  });

  // زر الرجوع لكل صفحة
   document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
  const lesCari = document.querySelector('.lesCari');
  const currentPage = btn.closest('.content-page');

  if (!currentPage || !lesCari) return;

  currentPage.classList.remove('animate-in');
  currentPage.classList.add('animate-out');

  currentPage.addEventListener('animationend', function handlePageOut() {
    currentPage.style.display = 'none';
    currentPage.classList.remove('animate-out');
    currentPage.removeEventListener('animationend', handlePageOut);

    // عرض القائمة
    lesCari.style.display = 'block';

    // تأخير بسيط لإعادة تفعيل الأنيميشن
    setTimeout(() => {
      lesCari.classList.add('animate-in');
    }, 10);

    lesCari.addEventListener('animationend', function handleLesIn() {
      lesCari.classList.remove('animate-in');
      lesCari.removeEventListener('animationend', handleLesIn);
    });
  });
});

});



});
