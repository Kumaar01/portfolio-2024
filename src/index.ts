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





//main end point
});
//main end point
