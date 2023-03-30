console.log(
  `%cWE ARE WATCHING`,
  `background: black; font-weight: bold; font-size: 11px; padding: 3px 12px; color: white `
);

// on init
var style = document.querySelector(".links-containr").style;
style.setProperty(
  "--bg",
  `radial-gradient(
  circle 10vmax at 0px 0px,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,.5) 80%,
  rgba(0,0,0,0.8) 100%
)`
);

// [smooth scroll]
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// [faction image full rotation animation]
$(".faction-image").bind(
  "webkitAnimationEnd mozAnimationEnd animationend",
  function () {
    $(this).removeClass("faction-image-animation");
  }
);

$(".faction-image").hover(function () {
  $(this).addClass("faction-image-animation");
});

// [preloader]
var preloadr = document.getElementById("_preloader");
setTimeout(function () {
  window.scrollTo(0, 0);
  preloadr.style.clipPath = "inset(100% 0% 0%)";
}, 6000);

var body = document.getElementsByTagName("BODY")[0];
setTimeout(function () {
  body.style.overflow = "hidden auto";
}, 6800);

// [torch effect on blackpaper btn]
function update(e) {
  try {
    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;

    var scrolledPixels = window.scrollY;

    const att = `radial-gradient(
      circle 10vmax at ${x}px ${y + scrolledPixels}px,
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,.5) 80%,
      rgba(0,0,0,0.8) 100%
    )`;

    var style = document.querySelector(".links-containr").style;
    style.setProperty("--bg", att);
  } catch (e) {}
}

// [eye mouse tracker]
let eyeBall = document.querySelector(".eyeball"),
  pupil = document.querySelector(".pupil"),
  eyeArea = eyeBall.getBoundingClientRect(),
  pupilArea = pupil.getBoundingClientRect(),
  R = eyeArea.width / 4,
  r = pupilArea.width / 4,
  centerX = eyeArea.left + R,
  centerY = eyeArea.top + R;

// [mouse follower]
var mouseX = 0,
  mouseY = 0;
var xp = 0,
  yp = 0;

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 991) {
    mouseX = e.pageX - 10;
    mouseY = e.pageY - 10;
  }

  // no need to update torch effect if we can't see elements on screen
  if (
    window.scrollY >
    (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return;
  }

  update(e);

  // no need to update eye if we can't see elements on screen
  if (window.scrollY > 300) {
    return;
  }

  let x = e.clientX - centerX,
    y = e.clientY - centerY,
    theta = Math.atan2(y, x),
    angleTmp = (theta * 180) / Math.PI + 360;

  var angle = angleTmp - 360 - 5;

  if (angle < 175 && angle > -5) {
    const xtrans = (angle * -1) / 4 + 20;
    const ytrans = 7 - Math.abs(xtrans) / 4 + 10;
    pupil.style.transform = `translateX(calc(-50% + ${xtrans}px)) translateY(${ytrans}px)`;
  } else {
    angle = angle * -1 - 10;
    const xtrans = (angle * -1) / 4 + 20;
    const ytrans = 10 - 7 + Math.abs(xtrans) / 4;
    pupil.style.transform = `translateX(calc(-50% + ${xtrans}px)) translateY(${ytrans}px)`;
  }
});

if (window.innerWidth > 991) {
  setInterval(function () {
    xp += (mouseX - xp) / 6;
    yp += (mouseY - yp) / 6;
    $("#follower").css({ left: xp + "px", top: yp + "px" });
  }, 20);
}

var checkbox = document.getElementById("check");
function closeSideMenu() {
  checkbox.checked = false;
}

function isElementInViewportCustom(el) {
  var rect = el.getBoundingClientRect();
  const middle = (rect.top + rect.bottom) / 2;
  const isVisible =
    middle >= 0 &&
    middle <= (window.innerHeight || document.documentElement.clientHeight);
  return isVisible;
}

var allItems = document.querySelectorAll(
  ".dstr-title, .rectangle-text, .dstr-dscr, .faction video, #district-1 video, .team-mmbr, #district-1 embed, .left-animation, .right-animation"
);
var backToTopBtn = document.getElementById("back-to-top");

function callbackFunc() {
  // [back to top function]
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }

  // [title animations]
  for (var i = 0; i < allItems.length; i++) {
    if (isElementInViewportCustom(allItems[i])) {
      if (!allItems[i].classList.contains("in-view")) {
        allItems[i].classList.add("in-view");
      }
    }
  }
}

window.addEventListener("scroll", callbackFunc);

// [scroll to top]
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// [timeline]
var owl = $(".owl-carousel");
owl.owlCarousel({
  loop: false,
  margin: 150,
  nav: false,
  responsive: {
    0: {
      items: 1,
      loop: true,
    },
    1100: {
      items: 3,
      loop: true,
    },
  },
});

if (window.innerWidth < 1100) {
  owl.trigger("next.owl.carousel");
}