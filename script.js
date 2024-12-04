const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
var timeout;

let xscale = 1;
let yscale = 1;


function circleChaptaKaro() {


    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        /*  var xdiff = dets.clientX - xprev;
         var ydiff = dets.clienty - yprev;
      */
        this.clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
        }, 100);

    });
}

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".boudingelem", {
            y: 0,
            duration: 1.5,
            stagger: .2,
            ease: Expo.easeInOut,
            delay: -1,
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
        })
}

function circleMouseFollower() {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`

    })
}
circleChaptaKaro();
circleMouseFollower();
firstPageAnim();


/* Image move
teeno element ka pata kro , un teeno pr mousemove lagao ,unpe mouse move ho toh x & y ki value pata kro, ab x & y value pe image move kro mouse tej move hone pe image ko zada rotate kro kam move hone pe image kam rotate kro!!! 
*/



document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});
