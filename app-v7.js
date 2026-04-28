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

    const influencers = [
        { name: "Зубарев", text: "«На 1win все четко: зашел, активировал бонус и сразу в игру.»", img: "zubarev.jpg" },
        { name: "Потеря", text: "«1win дает скорость, удобство и стабильный результат каждый день.»", img: "ptieria.jpg" },
        { name: "Лебига", text: "«На 1win реально горячие бонусы. Заходишь и сразу чувствуешь драйв.»", img: "lebiha.jpg" },
        { name: "Богачук", text: "«Точность и дисциплина решают. На 1win это работает на максимум.»", img: "bohachuk.jpg" },
        { name: "Слобоженко", text: "«1win — мой выбор: быстрые выплаты, мощные бонусы и надежная платформа.»", img: "slobodzhenko.jpg" },
        { name: "Беринчик", text: "«В 1win все по-бойцовски: темп, азарт и большие возможности.»", img: "berinchyk.jpg" },
        { name: "Амосов", text: "«В спорте и на 1win побеждает тот, кто держит фокус до конца.»", img: "amosov.jpg" }
    ];

    const infCard = document.getElementById("influencer-card");
    const infImg = document.getElementById("influencer-img");
    const infName = document.getElementById("influencer-name");
    const infText = document.getElementById("influencer-text");
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

        // Одна чистая функция: одновременно обновляет src, имя и цитату.
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
