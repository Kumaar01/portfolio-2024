import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from 'lenis'


gsap.registerPlugin(ScrollTrigger);
window.Webflow ||= [];
window.Webflow.push(() => {
// Select the button and menu elements by their data attributes
const navMenuBtnOpen = document.querySelector('[custom="menuBtnOpen"]');
const navMenuBtnClose = document.querySelector('[custom="menuBtnClose"]');
const navMenuOpen = document.querySelector('[custom="navMenuOpen"]');
const navMenuConentOpen = document.querySelectorAll('[custom="navMenuConentOpen"] ');
const navMenuLine = document.querySelectorAll('[custom="navMenuLine"]');
const navMenuLinever = document.querySelectorAll('[custom="navMenuLineVer"]');
const navMenuLinks = document.querySelectorAll('[words-rotate-in]');
const words = document.querySelectorAll('[words-rotate-in]> .word');
const navmenu =document.querySelector('.nav_wrap')
const navmenuButtons =document.querySelector('.nav_menu_link')

// let menuOpen = false; // Flag to track if the menu is open
let tl = gsap.timeline();
// Add the event listener for 'click' event
 function eventOpen() {
  
    tl.to (navMenuBtnOpen, {opacity:0, display:"none"},"-=.5");
    
    tl.fromTo(navMenuOpen,{clipPath: "polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)",opacity:"0%",display:"none"} ,{clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)',opacity:"100%", display:"block",duration: 1},"-=.2");
    // tl.to(navMenuOpen, {clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)',opacity:"100%", display:"block",duration: 1},"-=1");
    tl.to(navMenuBtnClose, {opacity:1, display:"block"},"-=.7");
    tl.to(navmenu,{mixBlendMode:"normal"},'-=2');
    tl.to(navMenuLine, {width:"100%",duration: 1, stagger:.25},'-=.2');
    tl.to(navMenuLinever, {height:"100%",duration: 1},'-=1');
    tl.to(navMenuConentOpen, {y: "0%", duration: 0.3,ease: "power1.out",opacity:"100%", stagger:.25},'-=1');
     navMenuLinks.forEach(link => {
      tl.to(words, {rotationX: 0, opacity:"100%",duration: 0.6, ease: "power2.out", stagger:  0.1 },'-=.90' );
     });

}

 function eventClose() {
  tl.kill();
  tl.clear();

    tl.fromTo(words, {rotationX: 0, opacity:"100%",duration: 0.6, ease: "power2.out", stagger:  0.1 },{rotationX: 90, opacity:"0%",duration: 0.3, ease: "sine.inout", stagger:  .3 },'-=.2');
    tl.to(navMenuConentOpen, {y: "-120%", duration: 0.8,ease: "power1.out",opacity:"0%", stagger:{amount: 0.7}},'-=.2');
    tl.to(navMenuLine, {width:"0%", stagger:.25}, '-=1');
    tl.to(navMenuLinever, {height:"0%"}, '-=1');
    tl.to(navMenuBtnClose, {opacity: 0,display:"none"},"-=.2");
    tl.to(navMenuOpen, { clipPath: "polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)",duration: .8},"-=.4"); // Move it back up
    tl.to (navMenuBtnOpen, {opacity:1, display:"block"},'-=.3');
    // tl.to(navmenu,{mixBlendMode:"difference"}),'-=1';

}
navMenuBtnOpen.addEventListener("click", eventOpen)
navMenuBtnClose.addEventListener("click", eventClose)
navmenuButtons.addEventListener("click", eventClose)

//button hover 2
$("[data-btn='wrap']").each(function () {

    const clipEl = $(this).find("[data-btn='clip']").attr("aria-hidden", "true");
    const durationSetting = 0.4;
    const easeSetting = "power2.out";
  
    function getPercentTop(el, e) {
      let elTop = el.offset().top - $(window).scrollTop();
      let mouseTop = e.pageY - $(window).scrollTop() - elTop;
      return (mouseTop / el.innerHeight()) * 100;
    }
    function getPercentLeft(el, e) {
      let elLeft = el.offset().left;
      let mouseLeft = e.pageX - elLeft;
      return (mouseLeft / el.innerWidth()) * 100;
    }
    $(this).on("mouseenter", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.set(clipEl, { display: "flex" });
      gsap.fromTo(clipEl, { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` }, { clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`, duration: durationSetting, ease: easeSetting });
    });
    $(this).on("mouseleave", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.to(clipEl, { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`, overwrite: true, duration: durationSetting, ease: easeSetting });
    });
  });

//portfolio cases animation on hover
$("[portfolio-cases]").each(function (index) {
let portfolioCasesSlides = $(this).find('[portfolio-cases-slides]');
let portfolioCasesImg = $(this).find('[portfolio-case-img]');
const durationSetting = 1.4;
const easeSetting = "power2.out";

let tl = gsap.timeline({ paused: true });

tl.to (portfolioCasesSlides, {borderColor: '#ffffff',duration: '.5',ease: easeSetting})
.to (portfolioCasesImg, {transform: "scale(1.1)", ease: easeSetting, duration: durationSetting}, '-=.5');

$(this).on("mouseenter", function () {
  tl.play();
  tl.duration(1.2);
});
$(this).on("mouseleave", function () {
tl.reverse();
tl.duration(.9);
});

});

//start of smooth scroll for pages linis scroll
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: .9,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

//start of all paragraph text element aniamtion
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => timeline.play()
    });
  }
  const imgSlideUp = "[img-slide-up]";
  const textRotateIn = "[text-rotate-in]";
  const accentsAnimation = "[accents-animation]";
  const globalButtonSlide = "[global-button-slide]";
  
  $(textRotateIn).each(function (index) {
    let tl = gsap.timeline({ 
      paused: true,
      defaults:{
        paddingBottom: "0.1em",
        marginBottom: "-0.1em",
        transformOrigin: "bottom",
      }
     });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(imgSlideUp), { height:"0px", duration: 1, ease: "power2.out"});
    tl.from($(this).find(".word"), { filter:"blur:7px",opacity:0, rotationX: -90, duration: .5, ease: "power2.out",stagger:{amount:"1.3"}},"-=.3" );
    tl.from($(this).find(accentsAnimation), { width:"0px", duration: .5, ease: "power2.out"}, "-=1");
    tl.from($(this).find(globalButtonSlide), { opacity: 0 ,x: -20, duration: 1, ease: "power2.out"},"-=.5");
    
    
    createScrollTrigger($(this), tl);
  });
  
  
  const charsWrapper = document.querySelectorAll('[char-animation-wrapper]');
  $(charsWrapper).each(function (index) {
    let tl = gsap.timeline({ paused: true,});
     tl.from($(this).find(".char"), {x: -30, clipPath: "inset(0% 100% 120% -5%)"}, {x: 0, duration: 4, stagger: 0.9,yPercent: 0,clipPath: "inset(0% -100% -200% -5%)",overwrite: true});


     createScrollTrigger($(this), tl);
    });







//main end point
});
//main end point






// import { CustomEase } from "gsap/CustomEase";


// function PageTransition() {

//   var tl = gsap.timeline()

//   .fromTo(".trans_slide", {
//     height: "0vh",
//     duration: 0.9
// }, {
//     height: "100vh",
//     duration: 0.9
// })
//   .fromTo(".trans_slide", {
//     clipPath: "polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)"
// }, {
//     clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)',
//     duration: 1
// })
// .to(".trans_slide", {
//   x:"100%",ease: "power3.out",duration: 3});
// }

// function delay(n) {
//   n = n || 2000;
//   return new Promise(done => {
//     setTimeout(() => {
//       done();
//     }, n);
//     });
// }

// function contentAnimation() {
//   document.addEventListener("DOMContentLoaded", () => {
//     gsap.set(" [last-nameload], [navbar-animation]", { opacity: 0 });
//     // Animate text elements (like titles)
//     const chars = document.querySelectorAll('[char-animation]');
//     chars.forEach((charElement) => {
//         gsap.timeline({
//             defaults: {
//                 duration: 1,
//                 ease: "power3.out"
//             }
//         })
  
//         .to(chars,{
//           opacity: 1
//         },"-=.8")
//        .fromTo(charElement.querySelectorAll(".char"), {
//            x: -30,
//            clipPath: "inset(0% 100% 120% -5%)"
  
//        }, {
  
//            x: 0,
//            duration: 2,
//            stagger: 0.1,
//            yPercent: 0,
//            clipPath: "inset(0% -100% -100% -5%)",
//            overwrite: true
//        }, "-=.2");
//    });
  
//    // Animate additional elements like last names and navbar
//    const onloadOther = document.querySelectorAll('[last-nameload]');
//    const navbarAnimation = document.querySelectorAll('[navbar-animation]');
//    gsap.timeline({
//        defaults: {
//            duration: 1,
//            ease: "power3.out"
//        }
//    })
//    .fromTo(onloadOther, {
//        y: 50,
//        opacity: 0,
//        filter: "blur(5px)"
//    }, {
//        y: 0,
//        stagger: 0.1,
//        filter: "blur(0px)",
//        opacity: 1
//    }, '=.3')
//    .fromTo(navbarAnimation, {
//        y: -50,
//        opacity: 0
//    }, {
//        y: 0,
//        opacity: 1
//    }, '-=1.5');
//   });
// }

// barba.init({

//   sync: true,

//   transitions: [{

//     async leave(data) {

//       const done = this.async();

//       PageTransition();
//       await delay(1500);
//       done();
//     },

//     async enter(data) {
//       contentAnimation();
//     },

//     async once(data) {
//       contentAnimation();
//     }
//   }]
// });



// //start of on load animation on titles
// document.addEventListener("DOMContentLoaded", () => {


//   //start of function
// function PageTransition() {
// // Animate additional elements like last names and navbar
// const onloadOther = document.querySelectorAll('[last-nameload]');
// const navbarAnimation = document.querySelectorAll('[navbar-animation]');
// const chars = document.querySelectorAll('[char-animation]');
// chars.forEach((charElement) => {
// gsap.set(" [last-nameload], [navbar-animation]", { opacity: 0 });

// var tl = gsap.timeline()

//   .to(".loader", {display: "none", opacity: "0"},"-=.5")

//   .fromTo(".trans_slide", {width:"100%",height: "100vh"}, {width:"0%",height: "100vh",ease: "power3.out",duration: 2})

//   .to(chars,{opacity: 1},"-=1.8")

//   .fromTo(charElement.querySelectorAll(".char"),
//   {x: -30, clipPath: "inset(0% 100% 120% -5%)"}, 
//   {x: 0, duration: .3, stagger: 0.1, yPercent: 0, clipPath: "inset(0% -100% -100% -5%)", overwrite: true}, "-=2.7")

//   .fromTo(onloadOther, {y: 50, opacity: 0, filter: "blur(5px)"}, {y: 0, stagger: 0.1, filter: "blur(0px)", opacity: 1, duration: 1, ease: "power3.out"}, '-=2.3')

//   .fromTo(navbarAnimation, { y: -50, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power3.out"}, '-=1.5');

          
        
// })
// }

// //END of trans function



// // Check if it's a returning user
// let isReturningUser = sessionStorage.getItem("visited") !== null;
// sessionStorage.setItem("visited", "true"); // Mark as visited

// if (isReturningUser) {
// // If user has visited before, run the PageTransition animation directly
// PageTransition();
// } else {
// // If it's the user's first visit, run the loader animation

// // Page loader animation setup
// let customEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
// let counter = { value: 0 };
// let loaderDuration = 5;

// function updateLoaderText() {
//   let progress = Math.round(counter.value);
//   $(".loader_number").text(progress);
// }

// function endLoaderAnimation() {
//   $(".trigger").click();
// }

// let loaderTimeline = gsap.timeline({
//   onComplete: endLoaderAnimation, // Call function when loader finishes
//   defaults: {}
// });

// // Loader animations
// loaderTimeline.to(counter, {
//   value: 100,
//   onUpdate: updateLoaderText,
//   duration: loaderDuration,
//   ease: CustomEase.create("custom", customEase)
// })
// .fromTo(".load_logo2", {
//   height: "100%",
//   duration: loaderDuration,
//   ease: CustomEase.create("custom", customEase)
// }, {
//   height: "0%",
//   duration: loaderDuration,
//   ease: CustomEase.create("custom", customEase)
// }, 0)
// .to(".loader_bar", {
//   width: "100%",
//   duration: loaderDuration,
//   ease: CustomEase.create("custom", customEase)
// }, 0)
// .to(".loader_text1, .loader_text2, .loader_text3", {
//   stagger: 1.3,
//   onUpdate: updateLoaderText,
//   display: "flex",
//   opacity: "1",
//   filter: "blur(0px)",
//   x: "0",
//   duration: 2,
//   ease: "power3.out"
// }, 0);

// // Additional loader animations (fade out and transition effects)
// loaderTimeline.to(".loader_text1, .loader_text2, .loader_text3", {
//   stagger: 1.3,
//   display: "flex",
//   opacity: "0",
//   filter: "blur(5px)",
//   x: "50",
//   duration: 3,
//   ease: "power3.out"
// }, 3)
// .to(".loarder_text, .loader_bar, .is-loader-bottom", {
//   stagger: 0.3,
//   y: "100",
//   filter: "blur(10px)",
//   opacity: "0",
//   duration: 0.7
// }, 6)
// .to(".loader", {
//   display: "none",
//   opacity: "0"
// }, 8.5)

// //added after 
//   .fromTo(".trans_slide", {
//   height: "0vh",
//   duration: 0.9
// }, {
//   height: "100vh",
//   duration: 0.9
// }, 6.5)
// .fromTo(".trans_slide", {
//   clipPath: "polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)"
// }, {
//   clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)',
//   duration: 1
// }, 7.3)

// // Front load animations, triggered after the loader finishes
// loaderTimeline.call(() => {
//       // Start of front load animations
// // Ensure chars, onloadOther, and navbar are hidden initially
// gsap.set(" [last-nameload], [navbar-animation]", { opacity: 0 });
//   const chars = document.querySelectorAll('[char-animation]');
//   chars.forEach((charElement) => {
//     gsap.timeline({
//       defaults: {
//         duration: 1,
//         ease: "power3.out"
//       }
//     })
//         .to(".trans_slide", {
//       x:"100%",ease: "power3.out",duration: 3})

//        .to(chars,{
//          opacity: 1
//        },"-=1.8")
//       .fromTo(charElement.querySelectorAll(".char"), {
//           x: -30,
//           clipPath: "inset(0% 100% 120% -5%)"
            
//       }, {

//           x: 0,
//           duration: 2,
//           stagger: 0.1,
//           yPercent: 0,
//           clipPath: "inset(0% -100% -100% -5%)",
//           overwrite: true
//       }, "-=2.7");
//   });

//   const onloadOther = document.querySelectorAll('[last-nameload]');
//   const navbarAnimation = document.querySelectorAll('[navbar-animation]');
//   gsap.timeline({
//     defaults: {
//       duration: 1,
//       ease: "power3.out"
//     }
//   })
//   .fromTo(onloadOther, {
//     y: 50,
//     opacity: 0,
//     filter: "blur(5px)"
//   }, {
//     y: 0,
//     stagger: 0.1,
//     filter: "blur(0px)",
//     opacity: 1
//   }, '=.3')
//   .fromTo(navbarAnimation, {
//     y: -50,
//     opacity: 0
//   }, {
//     y: 0,
//     opacity: 1
//   }, '-=1.5');
// });
// }
// });