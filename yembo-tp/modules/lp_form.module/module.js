if (window.hsInEditor) { } else {
    function debounce(callback, wait) {
        let timerId;
        return (...args) => {
          clearTimeout(timerId);
          timerId = setTimeout(() => {
            callback(...args);
          }, wait);
        };
    }

    var functionRun = false;
      
    var fixedStop = true;
    // add class to header on scroll
    window.addEventListener('message', event => {
        if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {

            const form = document.querySelector(".form__wrapper");
            const formEl = document.querySelector(".form");
            const formHs = document.querySelector(".hs-form");
            const formInner = document.querySelector(".form__form");
            const lpRight = document.querySelector(".lpTemplate__right");
            const lpFlex = document.querySelector(".lpTemplate__flex");
            const header = document.querySelector(".header");
            const lpBottom = document.querySelector(".lpTemplate__bottom");
            const footer = document.querySelector(".footer");
            const windowHeight = window.innerHeight;
    
            let scrollpos = window.scrollY;
            let fixedStop = true;
    
            let topPos = header.offsetHeight - 20;
    
            let formHeight = form.offsetHeight;
            let formLeft = formEl.offsetLeft;

            if(formHeight > windowHeight) {
                form.classList.add('form__wrapper--screenheight');
            }

            function updateFormWidthAndLeft() {
                let formLeftResize = formEl.offsetLeft;
                form.style.left = scrollpos > topPos ? formLeftResize + "px" : "0";
                formLeft = formLeftResize;
            }

            function updateFormPosition(scrollPosition) {
                if (scrollPosition > topPos) {
                  form.classList.add("fixed");
                  lpRight.classList.add("fixed-form");
                  let formLeft = formEl.offsetLeft;
                  let formWidth = form.offsetWidth;
                  form.style.maxWidth = formWidth+"px";
              
                  const stickPosition =
                    lpBottom.offsetHeight + footer.offsetHeight + 110;
                  
                  if (scrollPosition + form.offsetHeight > document.body.scrollHeight - stickPosition) {
                    if (fixedStop) {
                        if(scrollPosition > (lpFlex.offsetHeight - form.offsetHeight + topPos)) {
                            scrollPosition = lpFlex.offsetHeight - form.offsetHeight + topPos - 100;
                        }
                        fixedStop = false;
                        form.classList.add("fixed--stop");
                        form.style.top = (scrollPosition - topPos) + "px";
                    }
                  } else {
                    if (!fixedStop) {
                        fixedStop = true;
                        form.classList.remove("fixed--stop");
                        form.style.top = "20px";
                    }
                  }
              
                  form.style.left = formLeft + "px";

                } else {
                    let formWidth = form.offsetWidth;
                    form.classList.remove("fixed");
                    lpRight.classList.remove("fixed-form");
                    form.style.left = "0";
                    form.style.maxWidth = formWidth+"px";
                }
            }

            // Initial update
            updateFormPosition(scrollpos);
            
            // Event listeners
            window.addEventListener('resize', debounce(() => {
                updateFormWidthAndLeft();
                updateFormPosition(scrollpos);
            }, 200));
            
            window.addEventListener('scroll', () => {
                scrollpos = window.scrollY;
                updateFormPosition(scrollpos);
            });

            window.functionRun = true;
    
        } else {
            setTimeout(function(){

                if(!window.functionRun) {
    
                    const form = document.querySelector(".form__wrapper");
                    const formEl = document.querySelector(".form");
                    const formHs = document.querySelector(".hs-form");
                    const formInner = document.querySelector(".form__form");
                    const lpRight = document.querySelector(".lpTemplate__right");
                    const header = document.querySelector(".header");
                    const lpBottom = document.querySelector(".lpTemplate__bottom");
                    const footer = document.querySelector(".footer");
                    const windowHeight = window.innerHeight;
            
                    let scrollpos = window.scrollY;
                    let fixedStop = true;
            
                    let topPos = header.offsetHeight - 20;
            
                    let formHeight = form.offsetHeight;
                    let formLeft = formEl.offsetLeft;

                    if(formHeight > windowHeight) {
                        form.classList.add('form__wrapper--screenheight');
                    }

                    function updateFormWidthAndLeft() {
                        let formLeftResize = formEl.offsetLeft;
                        form.style.left = scrollpos > topPos ? formLeftResize + "px" : "0";
                        formLeft = formLeftResize;
                    }

                    function updateFormPosition(scrollPosition) {
                        if (scrollPosition > topPos) {
                            form.classList.add("fixed");
                            lpRight.classList.add("fixed-form");
                            let formLeft = formEl.offsetLeft;
                            let formWidth = form.offsetWidth;
                            form.style.maxWidth = formWidth+"px";
                        
                            const stickPosition =
                            lpBottom.offsetHeight + footer.offsetHeight + 110;
                        
                            if (scrollPosition + form.offsetHeight > document.body.scrollHeight - stickPosition) {
                                if (fixedStop) {
                                    fixedStop = false;
                                    form.classList.add("fixed--stop");
                                    form.style.top = (scrollPosition - topPos) + "px";
                                }
                            } else {
                                if (!fixedStop) {
                                fixedStop = true;
                                form.classList.remove("fixed--stop");
                                form.style.top = "20px";
                                }
                            }
                        
                            form.style.left = formLeft + "px";

                        } else {
                            let formWidth = form.offsetWidth;
                            form.classList.remove("fixed");
                            lpRight.classList.remove("fixed-form");
                            form.style.left = "0";
                            form.style.maxWidth = formWidth+"px";
                        }
                    }

                    function fixed_stop(scrollPosition) {
                        if ( fixedStop ) {
                            if(scrollPosition > (document.querySelector('.lpTemplate__flex').offsetHeight - document.querySelector('.form__wrapper').offsetHeight + topPos)) {
                                scrollPosition = document.querySelector('.lpTemplate__flex').offsetHeight - document.querySelector('.form__wrapper').offsetHeight + topPos - 100;
                            }
                            fixedStop = false;
                            form.classList.add("fixed--stop"),
                            form.style.top = (scrollPosition - topPos)+"px";
                        }
                    }
                    function fixed_return() {
                        if ( !fixedStop ) {
                            fixedStop = true;
                            form.classList.remove("fixed--stop"),
                            form.style.top = "20px";
                        }
                    }

                    // Initial update
                    updateFormPosition(scrollpos);
                    
                    // Event listeners
                    window.addEventListener('resize', debounce(() => {
                        updateFormWidthAndLeft();
                        updateFormPosition(scrollpos);
                    }, 200));
                    
                    window.addEventListener('scroll', () => {
                        scrollpos = window.scrollY;
                        updateFormPosition(scrollpos);
                    });

                    window.functionRun = true;

                }
    
            }, 2000);
        }
     });
    }