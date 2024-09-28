import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";


gsap.registerPlugin(ScrollTrigger);
window.Webflow ||= [];
window.Webflow.push(() => {
// Select the button and menu elements by their data attributes
const navMenuBtn = document.querySelector('[custom="menuBtn"]');
const navMenuOpen = document.querySelector('[custom="navMenuOpen"]');
const navMenuConentOpen = document.querySelectorAll('[custom="navMenuConentOpen"] ');
const navMenuLine = document.querySelectorAll('[custom="navMenuLine"]');
const navMenuLinever = document.querySelectorAll('[custom="navMenuLineVer"]');
const navMenuLinks = document.querySelectorAll('[words-rotate-in]');
//const chars = document.querySelectorAll('.nav_menu_link > .word > .char');
// const words = document.querySelectorAll('.nav_menu_link > .word');
const words = document.querySelectorAll('[words-rotate-in]> .word');
const navmenu =document.querySelector('.nav_wrap')

let menuOpen = false; // Flag to track if the menu is open
let tl = gsap.timeline();
// Add the event listener for 'click' event
navMenuBtn.addEventListener('click', function(event) {

  
  //  // Kill any ongoing animation and clear the timeline
   tl.kill();
   tl.clear();

  // Toggle the menu based on the `menuOpen` flag
  if (menuOpen) {
    // Close the menu (move it back offscreen)
    tl.fromTo(words, {rotationX: 0, opacity:"100%",duration: 0.6, ease: "power2.out", stagger:  0.1 },{rotationX: 90, opacity:"0%",duration: 0.3, ease: "sine.inout", stagger:  .3 },'-=1');
    tl.to(navMenuConentOpen, {y: "-120%", duration: 0.3,ease: "power1.out",opacity:"0%", stagger:{amount: 0.7}},'-=.5');
    tl.to(navMenuLine, {width:"0%", stagger:.25}, '-=1');
    tl.to(navMenuLinever, {height:"0%"}, '-=1');
    tl.to(navMenuOpen, { clipPath: "polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)",duration: 1}); // Move it back up
    tl.to(navmenu,{mixBlendMode:"difference"}),'-=1';
  } else {
    // Open the menu (move it to 0%)
    
    tl.fromTo(navMenuOpen,{clipPath: "polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)",opacity:"0%",display:"none",duration: 1} ,{clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)',opacity:"100%", display:"block",duration: 1});
      //{opacity: "100%", clipPath: 'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)' ,  duration: 1}); // Move it down to 0%
    tl.to(navmenu,{mixBlendMode:"normal"},'-=2');
    tl.to(navMenuLine, {width:"100%",duration: 1, stagger:.25});
    tl.to(navMenuLinever, {height:"100%",duration: 1},'-=1');
    tl.to(navMenuConentOpen, {y: "0%", duration: 0.3,ease: "power1.out",opacity:"100%", stagger:.25},'-=1');
     navMenuLinks.forEach(link => {
      tl.to(words, {rotationX: 0, opacity:"100%",duration: 0.6, ease: "power2.out", stagger:  0.1 },'-=.90' );
     });
    
  }
  // Toggle the flag value
  menuOpen = !menuOpen;
});

// magnetic button hover animation 
// Selecting button on hover animation
const mWrap = document.querySelectorAll('[magnetic-hover]');
// Loop through each element in the NodeList
mWrap.forEach((element) => {
    let boundingRect = element.getBoundingClientRect();

    window.addEventListener('resize', () => {
        boundingRect = element.getBoundingClientRect();
    });

    element.addEventListener('mousemove', (e) => {
        const mousePosX = e.pageX - boundingRect.left;
        const mousePosY = e.pageY - boundingRect.top;

        gsap.to(element, {
            x: (mousePosX - boundingRect.width / 2) * .09,
            y: (mousePosY - boundingRect.height / 2) * .09,
            duration: 0.8,
            ease: 'power3.out',
        });
    });

element.addEventListener('mouseleave', () => {
    gsap.to(element, {
        x:0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1,0.30)'
    });
});
});
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



//main end point
});
//main end point
