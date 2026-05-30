// 1. تشغيل وإيقاف الفيديو عند تمرير الماوس فوق المنتج
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const video = card.querySelector('video');
    if (video) {
        card.addEventListener('mouseenter', () => {
            video.play().catch(error => console.log("Video playback interrupted"));
        });
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// 2 & 3. دمج منطق التبديل بين الأقسام وتحريك الأسهم بشكل ديناميكي مستقل
const tabs = document.querySelectorAll('.luxury-tab');
const tabContents = document.querySelectorAll('.products-tab-content');

// دالة لتفعيل السلايدر الخاص بكل قسم على حدة وبشكل منعزل
function initSlider(tabContent) {
    const track = tabContent.querySelector('.products-track');
    const nextButton = tabContent.querySelector('.arrow-right');
    const prevButton = tabContent.querySelector('.arrow-left');

    if (!track || !nextButton || !prevButton) return;

    let scrollAmount = 0;
    
    const getScrollStep = () => {
        const visibleCard = track.querySelector('.product-card');
        return visibleCard ? visibleCard.offsetWidth + 24 : 300; 
    };

    // إعادة السلايدر لنقطة الصفر عند التهيئة
    track.style.transform = 'translateX(0px)';

    nextButton.addEventListener('click', () => {
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        if (Math.abs(scrollAmount) < maxScroll) {
            scrollAmount -= getScrollStep();
            // منع السلايدر من تجاوز الحد الأقصى للعرض
            if (Math.abs(scrollAmount) > maxScroll) {
                scrollAmount = -maxScroll;
            }
            track.style.transform = `translateX(${scrollAmount}px)`; // تم الإصلاح باستخدام الباك تيك `
        }
    });

    prevButton.addEventListener('click', () => {
        if (scrollAmount < 0) {
            scrollAmount += getScrollStep();
            if (scrollAmount > 0) scrollAmount = 0;
            track.style.transform = `translateX(${scrollAmount}px)`; // تم الإصلاح باستخدام الباك تيك `
        }
    });
}

// تشغيل السلايدر لجميع الأقسام عند تحميل الصفحة لأول مرة
tabContents.forEach(content => initSlider(content));

// منطق التنقل بين الأقسام (Tabs) عند الضغط عليها
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // إزالة الفاعلية من كافة الأزرار العلوية
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const targetCategory = tab.getAttribute('data-target');
        
        // إظهار القسم المطلوب وإخفاء الباقي بالكامل
        tabContents.forEach(content => {
            if (content.id === targetCategory) {
                content.classList.add('active');
                
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// قسم العطور **********************************
// ========================
// VIDEO HOVER EFFECT
// ========================

const storyCards = document.querySelectorAll(".story-card");

storyCards.forEach((card)=>{

  const video = card.querySelector(".story-video");

  card.addEventListener("mouseenter",()=>{

    video.play();

  });

  card.addEventListener("mouseleave",()=>{

    video.pause();
    video.currentTime = 0;

  });

});
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});



// Navbar blur on scroll

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.style.background = "rgba(255,255,255,0.55)";
        navbar.style.backdropFilter = "blur(22px)";
        navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.08)";

    }

    else{

        navbar.style.background = "rgba(255,255,255,0.35)";
        navbar.style.boxShadow = "none";

    }

});


//اراء الزبائن***************************************************
// Luxury hover tilt effect

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
      scale(1)
    `;
  });

});

// Floating luxury glow

const glows = document.querySelectorAll(".glow");

window.addEventListener("mousemove", (e) => {

  glows.forEach((glow, index) => {

    const speed = index === 0 ? 0.015 : 0.02;

    const x = (window.innerWidth / 2 - e.pageX) * speed;
    const y = (window.innerHeight / 2 - e.pageY) * speed;

    glow.style.transform = `translate(${x}px, ${y}px)`;
  });

});
//*************ALL PRODACT *************************
// Luxury tilt hover effect
const elementsCu =
document.querySelectorAll(
'.column-cu'
);

const observerCu =
new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity='1';

entry.target.style.transform=
'translateY(0)';

}

});

},
{
threshold:0.2
}
);

elementsCu.forEach(el=>{

el.style.opacity='0';

el.style.transform=
'translateY(40px)';

el.style.transition=
'1s ease';

observerCu.observe(el);

});
//local storge
const contactFormCu =
document.querySelector(".contact-form-cu");

if(contactFormCu){

contactFormCu.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const name =
    document.querySelector(".contact-name-cu").value;

    const email =
    document.querySelector(".contact-email-cu").value;

    const message =
    document.querySelector(".contact-message-cu").value;

    localStorage.setItem(
    "customerName",
    name);

    localStorage.setItem(
    "customerEmail",
    email);

    localStorage.setItem(
    "customerMessage",
    message);

    alert("Message Saved!");


});
window.addEventListener(
"DOMContentLoaded",
function(){

    const savedName =
    localStorage.getItem("customerName");

    const savedEmail =
    localStorage.getItem("customerEmail");

    const savedMessage =
    localStorage.getItem("customerMessage");

    if(savedName){

        document.querySelector(
        ".contact-name-cu"
        ).value = savedName;

    }

    if(savedEmail){

        document.querySelector(
        ".contact-email-cu"
        ).value = savedEmail;

    }

    if(savedMessage){

        document.querySelector(
        ".contact-message-cu"
        ).value = savedMessage;

    }

});}