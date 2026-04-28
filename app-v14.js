document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
    });

    document.querySelectorAll(".faq-question").forEach((item) => {
        item.addEventListener("click", () => {
            const parent = item.parentElement;
            const isActive = parent.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach((faq) => {
                faq.classList.remove("active");
                faq.querySelector(".faq-icon").textContent = "+";
            });

            if (!isActive) {
                parent.classList.add("active");
                item.querySelector(".faq-icon").textContent = "x";
            }
        });
    });

    const privacyBtn = document.getElementById("openPrivacy");
    const privacyModal = document.getElementById("privacyModal");
    const closePrivacy = document.getElementById("closePrivacy");

    if (privacyBtn) {
        privacyBtn.addEventListener("click", (e) => {
            e.preventDefault();
            privacyModal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    }

    if (closePrivacy) {
        closePrivacy.addEventListener("click", () => {
            privacyModal.classList.remove("show");
            document.body.style.overflow = "";
        });
    }

    if (privacyModal) {
        privacyModal.addEventListener("click", (e) => {
            if (e.target === privacyModal) {
                privacyModal.classList.remove("show");
                document.body.style.overflow = "";
            }
        });
    }

    const readMoreBtn = document.getElementById("read-more-btn");
    if (readMoreBtn) {
        readMoreBtn.addEventListener("click", function () {
            const container = document.getElementById("seo-text-container");
            container.style.maxHeight = "none";
            this.style.display = "none";
        });
    }

    const timerEl = document.getElementById("bonus-timer");
    if (timerEl) {
        let secondsLeft = 9 * 60 * 60;
        const renderTimer = () => {
            const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
            const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
            const seconds = String(secondsLeft % 60).padStart(2, "0");
            timerEl.textContent = `${hours}:${minutes}:${seconds}`;
        };
        renderTimer();
        setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft -= 1;
            }
            renderTimer();
        }, 1000);
    }

    const influencers = [
        { name: "Зубарєв", text: "«На 1win все чітко: зайшов, активував бонус і одразу в гру.»", img: "zubarev.jpg", proof: "Вибір Зубарєва" },
        { name: "Потеря", text: "«1win дає швидкість, зручність і стабільний результат щодня.»", img: "ptieria.jpg", proof: "Рекомендація Потері" },
        { name: "Лебіга", text: "«На 1win реально гарячі бонуси. Заходиш і одразу відчуваєш драйв.»", img: "lebiha.jpg", proof: "Рекомендація Лебіги" },
        { name: "Богачук", text: "«Точність і дисципліна вирішують. На 1win це працює на максимум.»", img: "bohachuk.jpg", proof: "Вибір Богачука" },
        { name: "Слобоженко", text: "«1win — мій вибір: швидкі виплати, потужні бонуси та надійна платформа.»", img: "slobodzhenko.jpg", proof: "Вибір Слобоженка" },
        { name: "Берінчик", text: "«У 1win усе по-бійцівськи: темп, азарт і великі можливості.»", img: "berinchyk.jpg", proof: "Рекомендація Берінчика" },
        { name: "Амосов", text: "«У спорті та на 1win перемагає той, хто тримає фокус до кінця.»", img: "amosov.jpg", proof: "Вибір Амосова" }
    ];

    const infCard = document.getElementById("influencer-card");
    const infImg = document.getElementById("influencer-img");
    const infName = document.getElementById("influencer-name");
    const infText = document.getElementById("influencer-text");
    const infProof = document.getElementById("influencer-proof");
    const infDots = document.getElementById("influencer-dots");

    if (infCard && infImg && infName && infText) {
        let currentIndex = Math.floor(Math.random() * influencers.length);
        let isAnimating = false;

        if (infDots) {
            infDots.innerHTML = "";
            influencers.forEach((_, idx) => {
                const dot = document.createElement("div");
                dot.className = "influencer-dot";
                dot.addEventListener("click", () => {
                    changeInfluencer(idx);
                });
                infDots.appendChild(dot);
            });
        }

        const changeInfluencer = (nextIndex = null) => {
            if (isAnimating) {
                return;
            }
            isAnimating = true;
            infCard.classList.add("is-fading");

            setTimeout(() => {
                if (typeof nextIndex === "number") {
                    currentIndex = nextIndex;
                } else {
                    currentIndex = (currentIndex + 1) % influencers.length;
                }

                const current = influencers[currentIndex];
                infImg.src = current.img;
                infImg.alt = current.name;
                infName.textContent = current.name;
                infText.textContent = current.text;
                if (infProof) {
                    infProof.textContent = current.proof;
                }

                if (infDots) {
                    Array.from(infDots.children).forEach((dot, idx) => {
                        dot.classList.toggle("active", idx === currentIndex);
                    });
                }

                infCard.classList.remove("is-fading");
                isAnimating = false;
            }, 250);
        };

        changeInfluencer(currentIndex);

        let sliderInterval = setInterval(() => {
            changeInfluencer();
        }, 5000);

        infCard.addEventListener("touchstart", (e) => {
            infCard.dataset.touchStartX = String(e.changedTouches[0].screenX);
        }, { passive: true });

        infCard.addEventListener("touchend", (e) => {
            const startX = Number(infCard.dataset.touchStartX || 0);
            const endX = e.changedTouches[0].screenX;

            if (endX < startX - 40) {
                changeInfluencer((currentIndex + 1) % influencers.length);
            } else if (endX > startX + 40) {
                changeInfluencer((currentIndex - 1 + influencers.length) % influencers.length);
            }

            clearInterval(sliderInterval);
            sliderInterval = setInterval(() => {
                changeInfluencer();
            }, 5000);
        }, { passive: true });
    }

    const feedToast = document.getElementById("live-feed-toast");
    const feedUsers = ["Max_***", "LuckyGuy", "ivan_99", "DimaTop", "Oleg777", "xStorm", "NikaPlay"];
    const feedGames = ["Aviator", "Lucky Jet", "Gates of Olympus", "Plinko", "Sweet Bonanza"];
    if (feedToast) {
        const showLiveToast = () => {
            const user = feedUsers[Math.floor(Math.random() * feedUsers.length)];
            const game = feedGames[Math.floor(Math.random() * feedGames.length)];
            const amount = Math.floor(Math.random() * (28000 - 950 + 1)) + 950;
            const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            feedToast.textContent = `Користувач ${user} щойно виграв ${formattedAmount} UAH у ${game}`;
            feedToast.classList.add("show");

            setTimeout(() => {
                feedToast.classList.remove("show");
            }, 2200);

            const nextIn = (Math.floor(Math.random() * 3) + 3) * 1000;
            setTimeout(showLiveToast, nextIn);
        };

        setTimeout(showLiveToast, 2000);
    }

    const liveWinsNames = [
        "Maks_Vip", "Olexandr_UA", "Lucky_Guy", "Vovan_77", "Krasava",
        "mister_X", "OlegUA", "Pobeditel2026", "Tanya_Win", "Ihor_Pro",
        "Nazar88", "Denys_King", "Gamer_UA", "Champion1", "SuperVlad",
        "Artem_Cash", "Bohdan_Bet", "Zheka777", "Stepan_M", "Andriy_Top",
        "Katya_K", "Oksana_Luck", "Serhiy_V", "Dima_Start", "Rich_Boy",
        "Money_Maker", "Slot_Master", "Casino_King", "Win_Hunter", "Big_Boss",
        "Vip_Player", "Lucky_Strike", "Jackpot_UA", "Crypto_Fan"
    ];
    const liveWinsGames = ["Aviator", "Lucky Jet", "Gates of Olympus", "Sugar Rush", "Plinko", "Sweet Bonanza", "Speed-n-Cash"];

    const generateLiveWins = () => {
        const container = document.getElementById("dynamic-live-wins");
        if (!container) {
            return;
        }

        container.innerHTML = "";
        for (let i = 0; i < 5; i += 1) {
            const name = liveWinsNames[Math.floor(Math.random() * liveWinsNames.length)];
            const game = liveWinsGames[Math.floor(Math.random() * liveWinsGames.length)];
            const amount = Math.floor(Math.random() * (50000 - 450 + 1)) + 450;
            const formattedAmount = `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UAH`;

            const item = document.createElement("div");
            item.className = "win-item";
            item.innerHTML = `
                <span class="win-user">${name}</span>
                <span class="win-amount">${formattedAmount}</span>
                <span class="win-game">${game}</span>
            `;
            container.appendChild(item);
        }
    };

    generateLiveWins();
    setInterval(generateLiveWins, 7200000);
});
