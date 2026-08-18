(() => {

  /* ========================================
     HELPERS
  ======================================== */

  const qs = (selector, parent = document) =>
    parent.querySelector(selector);

  const qsa = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  const reducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


  const coarsePointer =
    window.matchMedia(
      '(pointer: coarse)'
    ).matches;


  const tabletLayout =
    window.matchMedia(
      '(max-width: 900px)'
    );


  /* ========================================
     PRELOADER
  ======================================== */

  const preloader =
    qs('#preloader');


  window.addEventListener(
    'load',
    () => {

      window.setTimeout(
        () => {

          preloader?.classList.add(
            'is-hidden'
          );

        },
        reducedMotion ? 0 : 950
      );

    }
  );



  /* ========================================
     HEADER SCROLL STATE
  ======================================== */

  const header =
    qs('#siteHeader');


  const updateHeader = () => {

    header?.classList.toggle(
      'scrolled',
      window.scrollY > 26
    );

  };


  updateHeader();


  window.addEventListener(
    'scroll',
    updateHeader,
    {
      passive: true
    }
  );



  /* ========================================
     MOBILE NAVIGATION
  ======================================== */

  const menuToggle =
    qs('#menuToggle');

  const navLinks =
    qs('#navLinks');


  menuToggle?.addEventListener(
    'click',
    () => {

      const open =
        navLinks?.classList.toggle(
          'is-open'
        );


      menuToggle.setAttribute(
        'aria-expanded',
        String(Boolean(open))
      );

    }
  );


  qsa(
    '#navLinks a'
  ).forEach(link => {

    link.addEventListener(
      'click',
      () => {

        navLinks?.classList.remove(
          'is-open'
        );


        menuToggle?.setAttribute(
          'aria-expanded',
          'false'
        );

      }
    );

  });



  /* ========================================
     SCROLL REVEALS
  ======================================== */

  qsa(
    '.reveal'
  ).forEach(element => {

    const delay =
      Number(
        element.dataset.delay || 0
      );


    element.style.setProperty(
      '--delay',
      `${delay}ms`
    );

  });


  if (
    !reducedMotion &&
    'IntersectionObserver' in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  'is-visible'
                );


                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.14
        }
      );


    qsa(
      '.reveal'
    ).forEach(element => {

      revealObserver.observe(
        element
      );

    });


  } else {

    qsa(
      '.reveal'
    ).forEach(element => {

      element.classList.add(
        'is-visible'
      );

    });

  }



  /* ========================================
     LUXURY GLASS PORTRAIT
  ======================================== */

  const portrait =
    qs('#portraitCard');


  const setPortraitActive =
    active => {

      if (!portrait) {
        return;
      }


      portrait.classList.toggle(
        'is-active',
        active
      );


      portrait.setAttribute(
        'aria-pressed',
        String(active)
      );

    };


  const resetPortraitLight =
    () => {

      if (!portrait) {
        return;
      }


      portrait.style.setProperty(
        '--mx',
        '50%'
      );


      portrait.style.setProperty(
        '--my',
        '50%'
      );

    };


  if (portrait) {

    /*
      Desktop:

      - portrait stays completely intact
      - cursor moves soft champagne light
      - CSS controls halo
      - CSS controls floating frames
      - CSS controls glass reflection
      - CSS controls subtle zoom
    */


    portrait.addEventListener(
      'pointerenter',
      event => {

        if (
          coarsePointer ||
          tabletLayout.matches ||
          reducedMotion
        ) {

          return;

        }


        setPortraitActive(
          true
        );


        const rect =
          portrait.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        portrait.style.setProperty(
          '--mx',
          `${x * 100}%`
        );


        portrait.style.setProperty(
          '--my',
          `${y * 100}%`
        );

      }
    );


    portrait.addEventListener(
      'pointermove',
      event => {

        if (
          coarsePointer ||
          tabletLayout.matches ||
          reducedMotion
        ) {

          return;

        }


        const rect =
          portrait.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        portrait.style.setProperty(
          '--mx',
          `${x * 100}%`
        );


        portrait.style.setProperty(
          '--my',
          `${y * 100}%`
        );


        setPortraitActive(
          true
        );

      }
    );


    portrait.addEventListener(
      'pointerleave',
      () => {

        if (
          coarsePointer ||
          tabletLayout.matches
        ) {

          return;

        }


        resetPortraitLight();


        setPortraitActive(
          false
        );

      }
    );


    /*
      Mobile / tablet:

      Tap once = activate portrait.

      Tap again = return to calm state.
    */

    portrait.addEventListener(
      'click',
      () => {

        if (
          !coarsePointer &&
          !tabletLayout.matches
        ) {

          return;

        }


        const active =
          !portrait.classList.contains(
            'is-active'
          );


        setPortraitActive(
          active
        );

      }
    );


    /*
      If screen layout changes,
      reset the portrait cleanly.
    */

    tabletLayout.addEventListener?.(
      'change',
      () => {

        resetPortraitLight();


        setPortraitActive(
          false
        );

      }
    );

  }



  /* ========================================
     EXECUTIVE DESK ACCORDION
  ======================================== */

  qsa(
    '.capability'
  ).forEach(item => {


    const trigger =
      qs(
        '.capability-trigger',
        item
      );


    trigger?.addEventListener(
      'click',
      () => {

        const willOpen =
          !item.classList.contains(
            'is-open'
          );


        qsa(
          '.capability'
        ).forEach(other => {

          other.classList.remove(
            'is-open'
          );


          qs(
            '.capability-trigger',
            other
          )?.setAttribute(
            'aria-expanded',
            'false'
          );

        });


        if (willOpen) {

          item.classList.add(
            'is-open'
          );


          trigger.setAttribute(
            'aria-expanded',
            'true'
          );

        }

      }
    );

  });



  /* ========================================
     INTERACTIVE OFFICE WORKBENCH
  ======================================== */

  const toolTabs =
    qsa('.tool-tab');

  const toolScenes =
    qsa('.tool-scene');


  const activateTool =
    toolName => {


      toolTabs.forEach(tab => {

        const active =
          tab.dataset.tool ===
          toolName;


        tab.classList.toggle(
          'is-active',
          active
        );


        tab.setAttribute(
          'aria-selected',
          String(active)
        );

      });


      toolScenes.forEach(scene => {

        scene.classList.toggle(
          'is-active',
          scene.dataset.scene ===
          toolName
        );

      });

    };


  toolTabs.forEach(tab => {


    /*
      Click works on desktop,
      tablet and mobile.
    */

    tab.addEventListener(
      'click',
      () => {

        activateTool(
          tab.dataset.tool
        );

      }
    );


    /*
      Desktop also changes
      scene on hover.
    */

    if (
      !coarsePointer
    ) {

      tab.addEventListener(
        'mouseenter',
        () => {

          activateTool(
            tab.dataset.tool
          );

        }
      );

    }

  });



  /* ========================================
     A DAY IN MOTION
  ======================================== */

  const motionTrack =
    qs('#motionTrack');

  const progress =
    qs('#motionProgress');

  const steps =
    qsa('.motion-step');


  if (
    motionTrack &&
    steps.length &&
    !reducedMotion
  ) {

    const updateMotion =
      () => {


        const rect =
          motionTrack.getBoundingClientRect();


        const viewportAnchor =
          window.innerHeight *
          0.48;


        const raw =
          (
            viewportAnchor -
            rect.top
          ) /
          Math.max(
            1,
            rect.height
          );


        const percentage =
          Math.max(
            0,
            Math.min(
              1,
              raw
            )
          );


        if (progress) {

          progress.style.height =
            `${percentage * 100}%`;

        }


        let activeIndex =
          0;


        steps.forEach(
          (step, index) => {

            const stepRect =
              step.getBoundingClientRect();


            if (
              stepRect.top <
              viewportAnchor
            ) {

              activeIndex =
                index;

            }

          }
        );


        steps.forEach(
          (step, index) => {

            step.classList.toggle(
              'is-active',
              index === activeIndex
            );

          }
        );

      };


    updateMotion();


    window.addEventListener(
      'scroll',
      updateMotion,
      {
        passive: true
      }
    );


    window.addEventListener(
      'resize',
      updateMotion
    );

  }



  /* ========================================
     MAGNETIC BUTTONS / LINKS
  ======================================== */

  if (
    !coarsePointer &&
    !reducedMotion
  ) {

    qsa(
      '.magnetic'
    ).forEach(element => {


      element.addEventListener(
        'mousemove',
        event => {

          const rect =
            element.getBoundingClientRect();


          const x =
            event.clientX -
            (
              rect.left +
              rect.width / 2
            );


          const y =
            event.clientY -
            (
              rect.top +
              rect.height / 2
            );


          element.style.transform =
            `translate(
              ${x * 0.08}px,
              ${y * 0.08}px
            )`;

        }
      );


      element.addEventListener(
        'mouseleave',
        () => {

          element.style.transform =
            '';

        }
      );

    });

  }



  /* ========================================
     LUXURY EDITORIAL CURSOR
  ======================================== */

  if (
    !coarsePointer &&
    !reducedMotion
  ) {

    const dot =
      qs('.cursor-dot');

    const ring =
      qs('.cursor-ring');

    const cursorLabel =
      qs('.cursor-label');


    let mouseX =
      0;

    let mouseY =
      0;

    let ringX =
      0;

    let ringY =
      0;


    document.body.classList.add(
      'has-cursor'
    );



    /* ========================================
       CENTRAL CHAMPAGNE DIAMOND
    ======================================== */

    window.addEventListener(
      'mousemove',
      event => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        if (dot) {

          dot.style.transform = `
            translate(
              ${mouseX}px,
              ${mouseY}px
            )
            translate(-50%, -50%)
            rotate(45deg)
          `;

        }

      },
      {
        passive: true
      }
    );



    /* ========================================
       SMOOTH TRAILING OUTER RING
    ======================================== */

    const animateCursor =
      () => {


        ringX +=
          (
            mouseX -
            ringX
          ) *
          0.14;


        ringY +=
          (
            mouseY -
            ringY
          ) *
          0.14;


        if (ring) {

          ring.style.transform = `
            translate(
              ${ringX}px,
              ${ringY}px
            )
            translate(-50%, -50%)
          `;

        }


        requestAnimationFrame(
          animateCursor
        );

      };


    animateCursor();



    /* ========================================
       CURSOR LABEL HELPERS
    ======================================== */

    const showCursorLabel =
      (
        label,
        mode = ''
      ) => {


        if (
          !ring ||
          !cursorLabel
        ) {

          return;

        }


        cursorLabel.textContent =
          label;


        ring.classList.add(
          'is-labeled'
        );


        document.body.classList.add(
          'cursor-active'
        );


        if (
          mode === 'open'
        ) {

          ring.classList.add(
            'is-open'
          );

        } else {

          ring.classList.remove(
            'is-open'
          );

        }

      };


    const hideCursorLabel =
      () => {


        if (
          !ring ||
          !cursorLabel
        ) {

          return;

        }


        ring.classList.remove(
          'is-labeled',
          'is-open'
        );


        cursorLabel.textContent =
          '';


        document.body.classList.remove(
          'cursor-active'
        );

      };



    /* ========================================
       PORTRAIT CURSOR = VIEW
    ======================================== */

    if (portrait) {

      portrait.addEventListener(
        'mouseenter',
        () => {

          showCursorLabel(
            'VIEW'
          );

        }
      );


      portrait.addEventListener(
        'mouseleave',
        hideCursorLabel
      );

    }



    /* ========================================
       EXECUTIVE DESK CURSOR
    ======================================== */

    qsa(
      '.capability-trigger'
    ).forEach(item => {


      item.addEventListener(
        'mouseenter',
        () => {

          showCursorLabel(
            item.getAttribute(
              'aria-expanded'
            ) === 'true'
              ? 'CLOSE'
              : 'OPEN'
          );

        }
      );


      item.addEventListener(
        'mouseleave',
        hideCursorLabel
      );

    });



    /* ========================================
       WORKBENCH TOOLS CURSOR
    ======================================== */

    qsa(
      '.tool-tab'
    ).forEach(item => {


      item.addEventListener(
        'mouseenter',
        () => {

          showCursorLabel(
            'VIEW'
          );

        }
      );


      item.addEventListener(
        'mouseleave',
        hideCursorLabel
      );

    });



    /* ========================================
       NORMAL BUTTONS / LINKS
    ======================================== */

    qsa(
      'a, button'
    ).forEach(item => {


      /*
        These elements already
        have custom cursor labels.
      */

      if (
        item.matches(
          '#portraitCard, .capability-trigger, .tool-tab'
        )
      ) {

        return;

      }


      item.addEventListener(
        'mouseenter',
        () => {

          showCursorLabel(
            '↗'
          );

        }
      );


      item.addEventListener(
        'mouseleave',
        hideCursorLabel
      );

    });



    /* ========================================
       HIDE CURSOR OUTSIDE PAGE
    ======================================== */

    document.addEventListener(
      'mouseleave',
      () => {

        if (dot) {

          dot.style.opacity =
            '0';

        }


        if (ring) {

          ring.style.opacity =
            '0';

        }

      }
    );


    document.addEventListener(
      'mouseenter',
      () => {

        if (dot) {

          dot.style.opacity =
            '';

        }


        if (ring) {

          ring.style.opacity =
            '';

        }

      }
    );

  }

})();