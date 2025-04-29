document.addEventListener("DOMContentLoaded", function() {

  // dont execute in editor mode
  if (window.hsInEditor) {} else {

    /**********************************************************************************************/
    /* Check if gsap and ScrollTrigger library exists before registering
    /**********************************************************************************************/

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    /**********************************************************************************************/
    /* fade in animation [data-fade-in]
    /**********************************************************************************************/

    if (document.querySelectorAll("[data-gsap-fade-in]").length > 0) {
      function fadeInElement(element) {
        gsap.set(element, { autoAlpha: 0 });
        gsap.timeline({
          scrollTrigger: {
            trigger: element.parentNode,
            start: "top 90%",
            end: "bottom center",
          },
          defaults: {
            duration: 1,
            ease: "sine.inOut",
          },
        }).fromTo(
          element,
          {
            autoAlpha: 0,
          },
          {
            duration: 1,
            autoAlpha: 1,
          }
        );
      }
      gsap.utils.toArray("[data-gsap-fade-in]").forEach(fadeInElement);
    }


    /**********************************************************************************************/
    /* fade in up animation [data-fade-in-up]
    /**********************************************************************************************/

    if (document.querySelectorAll("[data-gsap-fade-in-up]").length > 0) {
      function fadeInUpElement(element) {
        gsap.set(element, { autoAlpha: 0 });
        gsap.timeline({
          scrollTrigger: {
            trigger: element.parentNode,
            start: 'top 90%',
            end: 'bottom 30%',
          },
          defaults: {
            duration: 1,
            ease: "sine.inOut",
          },
        }).fromTo(
          element,
          {
            autoAlpha: 0,
            y: 50,
          },
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
          }
        );
      }
      gsap.utils.toArray("[data-gsap-fade-in-up]").forEach(fadeInUpElement);
    }

    /**********************************************************************************************/
    /* stagger animation for cards
    /**********************************************************************************************/

    if (document.querySelectorAll("[data-gsap-stagger-container]").length > 0) {
      function animateStaggerElements(containerSelector, itemSelector) {
        gsap.utils.toArray(containerSelector).forEach(section => {
          const elems = section.querySelectorAll(itemSelector);
          gsap.set(elems, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            overwrite: 'auto',
            visibility: 'hidden',
          });
          ScrollTrigger.create({
            trigger: section,
            start: 'top 90%',
            end: 'bottom 30%',
            once: true,
            // markers: true,
            onEnter: () => gsap.to(elems, {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              visibility: 'visible',
            })
          });
        });
      }
      animateStaggerElements("[data-gsap-stagger-container]", "[data-gsap-stagger]");
    }


    /**********************************************************************************************/
    /* left right content reveal animation
    /**********************************************************************************************/

    function animateFromSides(element) {
      gsap.set(element, { autoAlpha: 0 });

      if (window.innerWidth >= 768) {
        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 100%",
            end: "bottom center",
          },
          defaults: {
            duration: 2,
            ease: "expo",
            overwrite: "auto",
            delay: 0.3,
          },
        })
        .fromTo(
          element,
          {
            x: element.hasAttribute("data-gsap-from-left") ? -100 : 100, // animate from left or right
          },
          {
            x: 0,
            autoAlpha: 1,
          }
        );
      } else {
        // Apply a fade-in up animation for screens smaller than 768px
        gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 100%",
            end: "bottom center",
          },
          defaults: {
            duration: 1,
            ease: "power2.out",
            overwrite: "auto",
          },
        })
        .fromTo(
          element,
          {
            y: 50, // Animate up
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
          }
        );
      }
    }

    gsap.utils.toArray("[data-gsap-from-left], [data-gsap-from-right]").forEach(animateFromSides);

    window.addEventListener('resize', () => {
      gsap.utils.toArray("[data-gsap-from-left], [data-gsap-from-right]").forEach(animateFromSides);
    });

    /**********************************************************************************************/
    /* clip path image reveal animation
    /**********************************************************************************************/

    if (document.querySelectorAll("[data-gsap-image-reveal]").length > 0) {
      function revealImageFromLeftToRight(container) {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
            // markers: true,
            toggleActions: "play none none reverse"
          }
        });

        tl.set(container, { autoAlpha: 1 });
        tl.from(container, 3, {
          xPercent: -100, // reveal from left to right
          ease: Expo.easeOut
        });
        tl.from(image, 3, {
          xPercent: 100, // reveal from left to right
          scale: 1.2,
          delay: -3,
          ease: Expo.easeOut
        });
      }

      let revealContainers = document.querySelectorAll("[data-gsap-image-reveal]");
      revealContainers.forEach(revealImageFromLeftToRight);
    }


    /**********************************************************************************************/

  }

});
