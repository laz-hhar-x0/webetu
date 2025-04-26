


const toggleBtn = document.getElementById("togglePasswordInput");
const passwordBox = document.getElementById("passwordBox");
const checkBtn = document.getElementById("checkPasswordBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const toggleIcon = document.getElementById("toggleIcon");

let visible = false;

toggleBtn.addEventListener("click", () => {
  visible = !visible;

  passwordBox.classList.toggle("visible", visible);
  toggleIcon.className = visible ? "fas fa-times" : "fas fa-plus";
  errorMsg.style.display = "none";

  if (visible) {
    passwordInput.value = "";
    passwordInput.focus();
  }
});

checkBtn.addEventListener("click", () => {
  const enteredPassword = passwordInput.value;
  const errorSound = document.getElementById("errorSound");

  if (enteredPassword === "admin@LAZHAR") {
    window.location.href = "/input";
  } else {
    // صوت
    errorSound.play();

    // رسالة الخطأ مع الأنيميشن
    errorMsg.classList.add("show");

    // إضافة الأنيميشن (هزة) و التأثيرات
    passwordInput.classList.add("flash-bg", "red-border", "shake");
    checkBtn.classList.add("red-button", "shake");
    checkBtn.textContent = "WRONG";

    // رجوع للوضع الأصلي بعد 2 ثواني
    setTimeout(() => {
      errorMsg.classList.remove("show");
      errorMsg.style.display = "none";

      passwordInput.classList.remove("flash-bg", "red-border", "shake");
      checkBtn.classList.remove("red-button", "shake");
      checkBtn.textContent = "submit";
    }, 2000);
  }
});






  setTimeout(() => {
    const msg = document.getElementById('success-message');
    if (msg) {
      msg.classList.add('fade-out');
      setTimeout(() => {
        msg.remove(); // نحّيه من الصفحة بعد نهاية الأنيميشن
      }, 600); // نفس وقت animation: fadeOut
    }
  }, 2000); // 2 ثواني قبل ما يبدأ يختفي





  // منع الصفحة من التمدد كي يطلع الكيبورد
  window.addEventListener('resize', () => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      document.body.style.height = window.innerHeight + 'px';
    }
  });

  // نرجعو الحالة كي يخرج الكيبورد
  window.addEventListener('focusout', () => {
    document.body.style.height = '100dvh';
  });



// ----------------------------------------------------------------------------------


  // const loginForm = document.querySelector("form");
  // const loginBtn = loginForm.querySelector("button[type='submit']");
  // const matriculeInput = loginForm.querySelector("input[name='matricule']");
  // const passwordInput = loginForm.querySelector("input[name='password']");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // نوقف الفورم من الإرسال العادي

    const matricule = matriculeInput.value.trim();
    const password = passwordInput.value.trim();

    if (matricule === "" || password === "") {
      showError("الرجاء ملء جميع الحقول");
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricule, password }),
      });

      const data = await response.json();

      if (response.ok && data.redirect) {
        window.location.href = data.redirect;
      } else {
        showError(data.error || "⚠️ حدث خطأ ما");
      }
    } catch (err) {
      showError("⚠️ لا يمكن الاتصال بالخادم");
    }
  });

  function showError(message) {
    let errorSpan = document.querySelector("#login-error");
    if (!errorSpan) {
      errorSpan = document.createElement("div");
      errorSpan.id = "login-error";
      errorSpan.style.color = "red";
      errorSpan.style.marginTop = "10px";
      loginForm.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
  }


