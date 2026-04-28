document.addEventListener("DOMContentLoaded", () => {
    // Анімація при скролі
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

    // Акордеон FAQ
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

    // Модальне вікно "Політика конфіденційності"
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

    // Скрипт "Читати огляд повністю"
    const readMoreBtn = document.getElementById("read-more-btn");
    if (readMoreBtn) {
        readMoreBtn.addEventListener("click", function () {
            const container = document.getElementById("seo-text-container");
            container.style.maxHeight = "none";
            this.style.display = "none";
        });
    }

    // Динамічні інфлюенсери
    const influencers = [
        {
            name: "Zubarev",
            text: "«Це просто казка, рідненькі! Натиснув кнопку, забрав бонус і полетів далі.»",
            img: "zubarev.jpg"
        },
        {
            name: "Poterya",
            text: "«Холодна голова, чіткий вибір і швидкий старт. Саме так я заходжу в гру.»",
            img: "ptieria.jpg"
        },
        {
            name: "Bogachuk",
            text: "«Точність вирішує все. Якщо вже грати, то тільки на платформі, якій довіряєш.»",
            img: "bohachuk.jpg"
        },
        {
            name: "Lebiga",
            text: "«Бонуси тут реально гарячі. Залітай і забирай свій максимум.»",
            img: "lebiha.jpg"
        }
    ];

    let currentInfluencer = Math.floor(Math.random() * influencers.length);
    const infCard = document.getElementById("influencer-card");
    const infImg = document.getElementById("influencer-img");
    const infName = document.getElementById("influencer-name");
    const infText = document.getElementById("influencer-text");
    const infDots = document.getElementById("influencer-dots");

    let intervalId;

    const updateUI = () => {
        const data = influencers[currentInfluencer];
        infImg.src = data.img;
        infImg.alt = data.name;
        infName.textContent = data.name;
        infText.textContent = data.text;

        if (infDots) {
            Array.from(infDots.children).forEach((dot, idx) => {
                dot.classList.toggle("active", idx === currentInfluencer);
            });
        }
    };

    const startAutoPlay = () => {
        intervalId = setInterval(() => {
            changeInfluencer();
        }, 3000);
    };

    const changeInfluencer = (index = -1) => {
        clearInterval(intervalId);

        if (!infCard) {
            return;
        }

        infCard.style.opacity = "0";

        setTimeout(() => {
            if (index === -1) {
                currentInfluencer = (currentInfluencer + 1) % influencers.length;
            } else {
                currentInfluencer = index;
            }

            updateUI();
            infCard.style.opacity = "1";
            startAutoPlay();
        }, 400);
    };

    if (infCard && infImg && infName && infText) {
        if (infDots) {
            infDots.innerHTML = "";
            influencers.forEach((_, idx) => {
                const dot = document.createElement("div");
                dot.className = "influencer-dot";
                dot.addEventListener("click", () => changeInfluencer(idx));
                infDots.appendChild(dot);
            });
        }

        updateUI();
        startAutoPlay();

        let touchStartX = 0;
        let touchEndX = 0;

        infCard.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(intervalId);
        }, { passive: true });

        infCard.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;

            if (touchEndX < touchStartX - 40) {
                changeInfluencer((currentInfluencer + 1) % influencers.length);
            } else if (touchEndX > touchStartX + 40) {
                changeInfluencer((currentInfluencer - 1 + influencers.length) % influencers.length);
            } else {
                startAutoPlay();
            }
        }, { passive: true });
    }

    // Динамічні виграші
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
