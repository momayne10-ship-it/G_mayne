document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // تعطيل التنبيهات الافتراضية
  window.alert = function () {};

  // التحقق من صحة النماذج
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        Swal.fire({
          icon: 'error',
          title: 'خطأ في الإدخال',
          text: 'يرجى ملء جميع الحقول بشكل صحيح.',
          background: '#fff4f4',
          iconColor: '#dc3545',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'animated-swal',
            title: 'swal-title',
            content: 'swal-text',
          },
          showClass: { popup: 'animate__animated animate__bounceIn' },
          hideClass: { popup: 'animate__animated animate__bounceOut' },
        });
      }
      form.classList.add('was-validated');
    }, false);
  });

  // تنظيف إدخال حقل الاسم
  document.querySelectorAll('#name').forEach(input => {
    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^A-Za-z\u0600-\u06FF\s\-']/g, '');
    });
  });

  // وظيفة "قريبًا"
  window.showComingSoon = event => {
    event.preventDefault();
    Swal.fire({
      icon: 'info',
      title: 'أمور مثيرة قادمة! 😊',
      text: 'هذا القسم تحت الإنشاء. كن على اطلاع لتجربة مذهلة!',
      background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
      iconColor: '#11A7A5',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'center',
      customClass: {
        popup: 'animated-swal',
        title: 'swal-title',
        content: 'swal-text',
      },
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
  };

  // وظيفة "قريبًا" للنسخة العربية
// وظيفة "قريبًا" للإشعار بتوفر اللغة الإنجليزية
  window.showLanguageComingSoon = event => {
    event.preventDefault();
    Swal.fire({
      icon: 'info',
      title: '  نعتذر لعدم توفر الخدمة! 😊',
      text: 'سيتم توفير موقع باللغة الإنجليزية قريبًا. انتظرنا!',
      background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
      iconColor: '#11A7A5',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'center',
      customClass: {
        popup: 'animated-swal',
        title: 'swal-title',
        content: 'swal-text',
      },
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
  };
  // زر العودة للأعلى
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // معالجة نموذج الاتصال باستخدام AJAX
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

      const formData = new FormData(this);

      fetch('https://formspree.io/f/mzzanwoy', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
        .then(response => {
          if (!response.ok) throw new Error(`خطأ HTTP! الحالة: ${response.status} ${response.statusText}`);
          return response.json();
        })
        .then(data => {
          if (data.ok) {
            Swal.fire({
              icon: 'success',
              title: 'تم الإرسال بنجاح!',
              text: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.',
              background: '#f4f9ff',
              iconColor: '#28a745',
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              position: 'center',
              customClass: {
                popup: 'animated-swal',
                title: 'swal-title',
                content: 'swal-text',
              },
              showClass: { popup: 'animate__animated animate__fadeInDown' },
              hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
            this.reset();
            this.classList.remove('was-validated');
          } else {
            throw new Error(data.error || 'فشل إرسال الرسالة.');
          }
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: `حدث خطأ أثناء إرسال الرسالة: ${error.message}. يرجى المحاولة مرة أخرى أو التواصل مع الدعم.`,
            background: '#fff4f4',
            iconColor: '#dc3545',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: 'موافق',
            position: 'center',
            customClass: {
              popup: 'animated-swal',
              title: 'swal-title',
              content: 'swal-text',
              confirmButton: 'swal-button',
            },
            showClass: { popup: 'animate__animated animate__bounceIn' },
            hideClass: { popup: 'animate__animated animate__bounceOut' },
          });
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  // تهيئة Swiper للـ Hero
  const heroSwiper = new Swiper('.hero-swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: { delay: 6000, disableOnInteraction: false },
    speed: 1000,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });

  // تهيئة Swiper للشهادات
  const testimonialsSwiperEl = document.querySelector('.testimonials-swiper');
  if (testimonialsSwiperEl) {
    new Swiper('.testimonials-swiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // تهيئة Swiper للفريق
  const teamSwiperEl = document.querySelector('.team-swiper');
  if (teamSwiperEl) {
    new Swiper('.team-swiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // تأثيرات التمرير للشريط التنقل
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 100);
    });
  }

  // قائمة الجوال
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    const toggleMenu = () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      const isExpanded = menuToggle.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchstart', toggleMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // تأثيرات التمرير للعناصر
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .section-title');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (elementPosition < screenPosition) {
        element.style.animation = 'fadeInUp 1s ease forwards';
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // تأثيرات بطاقات الفريق
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // تحسين تجربة الهواتف
  if (window.innerWidth <= 768) {
    const touchElements = document.querySelectorAll('.feature-card, .team-card, .btn-hero');
    touchElements.forEach(element => {
      element.style.cursor = 'pointer';
      element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.98)';
      });
      element.addEventListener('touchend', () => {
        element.style.transform = 'scale(1)';
      });
    });
  }

  // التحكم في الفيديو
  const video = document.getElementById('aboutVideo');
  const soundToggle = document.getElementById('soundToggle');
  if (video && soundToggle) {
    const soundIcon = soundToggle.querySelector('i');
    const soundText = document.querySelector('.sound-text');
    let isMuted = true;

    const videoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(error => console.log('Auto-play prevented:', error));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    videoObserver.observe(video);

    soundToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      video.muted = isMuted;
      soundIcon.className = `fas fa-volume-${isMuted ? 'mute' : 'up'}`;
      soundText.textContent = `Sound ${isMuted ? 'Off' : 'On'}`;
    });

    video.addEventListener('click', () => {
      if (video.paused) video.play();
      else video.pause();
    });
  }
});