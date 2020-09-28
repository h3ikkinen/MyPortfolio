
document.addEventListener('DOMContentLoaded', () => {
    let noWork = document.querySelectorAll('.noworked');
    noWork.forEach(item => item.addEventListener('click', () => {alert('Простите,но пока не работает')}));
    // script for scroll animation 
    let animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll(params) {
            for ( let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;
    
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
    
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
    
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
    
                }
            }
            

        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft};
        }
        setTimeout(() => {
            animOnScroll();
        }, 500);
    }
    // skills charts 
    const counters = document.querySelectorAll('.skills__charts-percent'),
    lines = document.querySelectorAll('.skills__charts-body-percent');
    window.addEventListener('scroll', () => {
        counters.forEach((item, i) => {
            if (document.querySelector('.skills__charts').classList.contains('_active')) {
                lines[i].style.width = item.innerHTML;
            }
        }); 
    });
    //menu toggler 
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu'),
          overlay = document.querySelector('.menu__overlay'),
          closeElem = document.querySelector('.menu_close'),
          link = document.querySelectorAll('.menu__link');
    hamburger.addEventListener('click', (e) => {
        menu.classList.toggle('active');
    });
    closeElem.addEventListener('click', (e) => {
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        }
    });
    overlay.addEventListener('click', (e) => {
        menu.classList.remove('active');
        if (!menu.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    });



    // slider 
    var mySwiper = new Swiper('.portfolio__slider', {
        // Optional parameters
        // direction: 'vertical',
        // loop: true,
        spaceBetween: 10,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
    });
    // modal 

    const modalTriggerFr = document.querySelector('.contacts__freelance_btn'),
          modalOverlayFr = document.querySelector('.freelance__modal_overlay'),
          modalCloseFr = document.querySelector('.freelance__modal_close'),
          modalFr = document.querySelector('.freelance__modal');

    modalTriggerFr.addEventListener('click', () => {
        modalFr.classList.add('active');
    });
    modalOverlayFr.addEventListener('click', (e) => {
        if (e.target == modalOverlayFr && e.target != document.querySelector('.freelance__modal_body')) {
            modalFr.classList.remove('active');
        }
    });
    modalCloseFr.addEventListener('click', () => {
        modalFr.classList.remove('active');
    });

    // плавный скролл по якорям 
    var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
                  V = 0.3;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    linkNav.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.remove('active');
        });
    });
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            var w = window.pageYOffset,  // производим прокрутка прокрутка
                hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
            t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash  // URL с хэшем
                }
            }
    }, false);
}
});
