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






