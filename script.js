 window.alert = function() {};

  (function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
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
              content: 'swal-text'
            },
            showClass: {
              popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
              popup: 'animate__animated animate__bounceOut'
            }
          });
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();

  document.querySelectorAll('#name').forEach(input => {
    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^A-Za-z\u0600-\u06FF\s\-']/g, '');
    });
  });

  function showComingSoon(event) {
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
        content: 'swal-text'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }

  // Back to Top Button Functionality
  const backToTopButton = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // معالجة نموذج الاتصال باستخدام AJAX
  document.getElementById('contactForm').addEventListener('submit', function(e) {
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
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`خطأ HTTP! الحالة: ${response.status} ${response.statusText}`);
      }
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
            content: 'swal-text'
          },
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        document.getElementById('contactForm').reset();
        document.getElementById('contactForm').classList.remove('was-validated');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: data.error || 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
          background: '#fff4f4',
          iconColor: '#dc3545',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'center',
          customClass: {
            popup: 'animated-swal',
            title: 'swal-title',
            content: 'swal-text'
          },
          showClass: {
            popup: 'animate__animated animate__bounceIn'
          },
          hideClass: {
            popup: 'animate__animated animate__bounceOut'
          }
        });
      }
    })
    .catch(error => {
      console.error('خطأ في الإرسال:', error.message);
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
          confirmButton: 'swal-button'
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      });
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Hero Swiper
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

    // Initialize Testimonials Swiper if exists
    const testimonialsSwiperEl = document.querySelector('.testimonials-swiper');
    if (testimonialsSwiperEl) {
        const testimonialsSwiper = new Swiper('.testimonials-swiper', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
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
    // Trigger once on load
    animateOnScroll();

    // Initialize Team Swiper if exists
    const teamSwiperEl = document.querySelector('.team-swiper');
    if (teamSwiperEl) {
        const teamSwiper = new Swiper('.team-swiper', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('aboutVideo');
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = soundToggle.querySelector('i');
  const soundText = document.querySelector('.sound-text');
  let isMuted = true;
  
  // Intersection Observer لتشغيل الفيديو عند الظهور وإيقافه عند الاختفاء
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // تشغيل الفيديو عندما يكون مرئياً
        video.play().catch(error => {
          console.log('Auto-play was prevented:', error);
        });
      } else {
        // إيقاف الفيديو عندما لا يكون مرئياً
        video.pause();
      }
    });
  }, { threshold: 0.5 }); // عندما يكون 50% من الفيديو مرئياً
  
  // مراقبة عنصر الفيديو
  videoObserver.observe(video);
  
  // تبديل الصوت عند النقر على الزر
  soundToggle.addEventListener('click', function() {
    isMuted = !isMuted;
    video.muted = isMuted;
    
    if (isMuted) {
      soundIcon.className = 'fas fa-volume-mute';
      soundText.textContent = 'Sound Off';
    } else {
      soundIcon.className = 'fas fa-volume-up';
      soundText.textContent = 'Sound On';
    }
  });
  
  // تشغيل/إيقاف الفيديو عند النقر عليه
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Hero Swiper
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

    // Initialize Testimonials Swiper if exists
    const testimonialsSwiperEl = document.querySelector('.testimonials-swiper');
    if (testimonialsSwiperEl) {
        const testimonialsSwiper = new Swiper('.testimonials-swiper', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لك على رسالتك! سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
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
    // Trigger once on load
    animateOnScroll();

    // Initialize Team Swiper if exists
    const teamSwiperEl = document.querySelector('.team-swiper');
    if (teamSwiperEl) {
        const teamSwiper = new Swiper('.team-swiper', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // إضافة تأثيرات للشريط المنزلق للفريق
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // تحسين تجربة المستخدم للهواتف
    if (window.innerWidth <= 768) {
        // إضافة تأثير النقر للهواتف
        const touchElements = document.querySelectorAll('.feature-card, .team-card, .btn-hero');
        touchElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
});