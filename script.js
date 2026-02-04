const scroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true
        });

        function loaderAnimation() {
            let counter = 0;
            let interval = setInterval(function () {
                counter++;
                document.querySelector(".loader h1").textContent = counter;
                document.querySelector(".loading-bar-fill").style.width = counter + "%";

                if (counter === 100) {
                    clearInterval(interval);

                    let tl = gsap.timeline();

                    tl.to(".loader h1", {
                        opacity: 0,
                        duration: 0.4,
                        delay: 0.5
                    })

                        .to(".loading-bar", {
                            opacity: 0,
                            duration: 0.4,
                            delay: -0.2
                        })

                        .to(".loader", {
                            y: "-100%",
                            duration: 1,
                            ease: "Expo.easeInOut",
                            delay: 0.2
                        })

                        .from(".navbar", {
                            opacity: 0,
                            y: "-10",
                            duration: 1.5,
                            ease: Expo.easeInOut
                        }, "-=0.8")

                        .to(".bounding-elem", {
                            y: "0",
                            ease: Expo.easeInOut,
                            duration: 1,
                            delay: -1,
                            stagger: 0.2
                        })

                        .from(".hero-footer", {
                            y: "-10",
                            ease: Expo.easeInOut,
                            opacity: 0,
                            duration: 1.5,
                            delay: -1
                        })
                }
            }, 30);
        }

        function circleMouseFollower(xscale, yscale) {
            window.addEventListener("mousemove", function (dets) {
                document.querySelector(".mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
            })
        };

        function menuToggle() {
            const menuTrigger = document.getElementById('menuTrigger');
            const menuItems = document.getElementById('menuItems');
            const menuH4s = menuItems.querySelectorAll('h4');

            let isMenuOpen = false;

            gsap.set(menuH4s, { opacity: 0 });

            menuTrigger.addEventListener('click', function () {
                if (!isMenuOpen) {
                    const tl = gsap.timeline();

                    tl.to(menuTrigger, {
                        opacity: 0,
                        y: 10,
                        duration: 0.3,
                        ease: "power2.in"
                    })
                        .fromTo(menuH4s,
                            {
                                opacity: 0,
                                y: -20
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.4,
                                stagger: 0.15,
                                ease: "back.out(1.7)",
                                onStart: function () {
                                    menuItems.classList.add('active');
                                }
                            }
                        );

                    isMenuOpen = true;
                } else {
                    closeMenu();
                }
            });

            function closeMenu() {
                const tl = gsap.timeline();

                tl.to(menuH4s, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    stagger: 0.08,
                    onComplete: function () {
                        menuItems.classList.remove('active');
                    }
                })
                    .to(menuTrigger, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                isMenuOpen = false;
            }

            document.addEventListener('click', function (e) {
                if (!e.target.closest('.navbar-right') && isMenuOpen) {
                    closeMenu();
                }
            });
        }

        function circleSkew() {
            let xScale = 1;
            let yScale = 1;

            window.xPreviousValue = 0;
            window.yPreviousValue = 0;

            window.addEventListener("mousemove", function (dets) {
                let xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xPreviousValue);
                let yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yPreviousValue);

                xPreviousValue = dets.clientX;
                yPreviousValue = dets.clientY;

                circleMouseFollower(xscale, yscale);
            })
        }

        function imageAnime() {
            document.querySelectorAll(".elem").forEach(function (elem) {
                let rotate = 0;
                let diffrot = 0;

                elem.addEventListener("mouseleave", function () {
                    gsap.to(elem.querySelector("img"), {
                        opacity: 0,
                        ease: Power3,
                        duration: 0.5,
                    });
                });

                elem.addEventListener("mousemove", function (dets) {
                    let diff = dets.clientY - elem.getBoundingClientRect().top;
                    diffrot = dets.clientX - rotate;
                    rotate = dets.clientX;

                    gsap.to(elem.querySelector("img"), {
                        opacity: 1,
                        ease: Power3,
                        top: diff,
                        left: dets.clientX - elem.getBoundingClientRect().left,
                        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
                    });
                });
            });
        }

        function updateTime() {
            const now = new Date();
            const pakistanTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));

            let hours = pakistanTime.getHours();
            let minutes = pakistanTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            const timeString = `${hours}:${minutes} ${ampm} PKT`;

            const timeElement = document.querySelector('.footer-left h5:last-child');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        }

        loaderAnimation();
        circleMouseFollower();
        menuToggle();
        circleSkew();
        imageAnime();
        updateTime();

        setInterval(updateTime, 1000);