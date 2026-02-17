document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ===== 1. تأثير التمرير على HEADER (إضافة كلاس scrolled) =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== 2. قائمة MOBILE (الهامبرغر) =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // فتح/غلق القائمة عند الضغط على الهامبرغر
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            const expanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });

        // غلق القائمة عند الضغط على أي رابط داخلي
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // غلق القائمة عند الضغط خارجها
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !menuToggle.contains(e.target) &&
                !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== 3. تفعيل SWIPER للسلايدر =====
    const heroSwiper = new Swiper('.hero-swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // ===== 4. أزرار اللغة (رسالة قادمة قريباً) =====
    const languageToggle = document.getElementById('languageToggle');
    const mobileLanguageToggle = document.getElementById('mobileLanguageToggle');

    function showLanguageComingSoon(event) {
        event.preventDefault();
        alert('سيتم توفير موقع باللغة الإنجليزية قريبًا! 😊');
    }

    if (languageToggle) {
        languageToggle.addEventListener('click', showLanguageComingSoon);
    }

    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', showLanguageComingSoon);
    }
});


// ===== تفعيل الخطوات عند التمرير مع تأثير الفتح والغلق =====
function initSoftwareTimeline() {
  const journeySteps = document.querySelectorAll('.journey-step');
  
  if (journeySteps.length === 0) return;
  
  function activateStepsOnScroll() {
    journeySteps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // عتبات مختلفة للجوال
      const enterThreshold = windowWidth <= 768 ? 0.85 : 0.7;
      const exitThreshold = windowWidth <= 768 ? 1.2 : 1.1;
      
      // إذا دخل العنصر منطقة المشاهدة - نفتحه
      if (rect.top < windowHeight * enterThreshold && rect.bottom > 100) {
        setTimeout(() => {
          step.classList.add('active');
        }, index * 150);
      } 
      // إذا خرج من منطقة المشاهدة - نغلقه
      else if (rect.bottom < 0 || rect.top > windowHeight * exitThreshold) {
        step.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', activateStepsOnScroll);
  window.addEventListener('resize', activateStepsOnScroll);
  setTimeout(activateStepsOnScroll, 500);
}

// تشغيل الدالة
document.addEventListener('DOMContentLoaded', () => {
  initSoftwareTimeline();
});


// ===== معالجة نموذج الاتصال =====
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // التحقق من صحة النموذج
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      
      // تغيير حالة الزر أثناء الإرسال
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

      try {
        const formData = new FormData(this);
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
          this.reset();
          this.classList.remove('was-validated');
        } else {
          throw new Error('فشل الإرسال');
        }
      } catch (error) {
        alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
      } finally {
        // إعادة الزر لحالته
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});


// ===== كود تشغيل الفيديو من مجلد videos =====
document.addEventListener('DOMContentLoaded', function() {
  
  // عناصر النافذة المنبثقة
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const closeBtn = document.getElementById('closeModalBtn');
  
  // كل أزرار تشغيل الفيديو
  const playButtons = document.querySelectorAll('.play-video-btn, .case-study-image');
  
  // إضافة حدث النقر لكل زر
  playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // الحصول على البطاقة الرئيسية
      const card = this.closest('.case-study-card');
      
      // جلب رابط الفيديو من data-video (مثل videos/v1.mp4)
      const videoUrl = card.getAttribute('data-video');
      
      if (videoUrl) {
        // وضع الرابط في مشغل الفيديو
        videoPlayer.src = videoUrl;
        videoPlayer.load();
        
        // عرض النافذة
        modal.classList.add('show');
        
        // تشغيل الفيديو
        videoPlayer.play().catch(error => {
          console.log("لم يتم تشغيل الفيديو تلقائياً:", error);
        });
      } else {
        alert('رابط الفيديو غير موجود');
      }
    });
  });
  
  // إغلاق النافذة عند الضغط على X
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
      modal.classList.remove('show');
    });
  }
  
  // إغلاق النافذة عند الضغط خارج الفيديو
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
      modal.classList.remove('show');
    }
  });
  
  // إغلاق الفيديو بالضغط على ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
      modal.classList.remove('show');
    }
  });
  
});


// ===== تحديث السنة تلقائياً =====
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// ===== تمرير سلس مع إغلاق القائمة في الجوال =====
document.addEventListener('DOMContentLoaded', function() {
  
  const navLinks = document.querySelectorAll('.nav-links a');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          
          // إغلاق القائمة في الجوال
          if (menuToggle && navLinksContainer) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
          
          // تعويض ارتفاع النافبار
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          // حساب الموقع مع تأثير سلس
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // تحديث الرابط النشط
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });
  
});
