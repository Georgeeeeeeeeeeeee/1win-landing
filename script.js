document.addEventListener("DOMContentLoaded", () => {
    // Анімація при скролі
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Акордеон FAQ
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const isActive = parent.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-icon').textContent = '+';
            });

            if (!isActive) {
                parent.classList.add('active');
                item.querySelector('.faq-icon').textContent = '×';
            }
        });
    });

    // Модальне вікно "Політика конфіденційності"
    const privacyBtn = document.getElementById('openPrivacy');
    const privacyModal = document.getElementById('privacyModal');
    const closePrivacy = document.getElementById('closePrivacy');

    if (privacyBtn) {
        privacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        });
    }

    if (closePrivacy) {
        closePrivacy.addEventListener('click', () => {
            privacyModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                privacyModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Скрипт "Читати огляд повністю"
    const readMoreBtn = document.getElementById('read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            var container = document.getElementById('seo-text-container');
            container.style.maxHeight = 'none';
            this.style.display = 'none';
        });
    }

    // Динамічні інфлюенсери
    const influencers = [
        { name: "Олександр Слобоженко", text: "«Я обираю надійність. 1win — це мій вибір для результату.»", img: "slobozhenko.jpg" },
        { name: "Ярослав Амосов", text: "«У спорті, як і в 1win — перемагають лише найсильніші. Твій час настав!»", img: "amosov.jpg" },
        { name: "Денис Берінчик", text: "«Тільки сміливі забирають банк. Заходь та перемагай разом зі мною!»", img: "berinchyk.jpg" },
        { name: "Ігор Потеря", text: "«Виходь на новий рівень. Мій вибір — 1win!»", img: "ptieria.jpg" },
        { name: "Сергій Богачук", text: "«Сила в точності. Став на переможців!»", img: "bohachuk.jpg" },
        { name: "Олександр Зубарєв", text: "«Це просто казка, рідненькі! Натиснув кнопку — залетіло. Все чітко!»", img: "zubarev.jpg" },
        { name: "Михайло Лебіга", text: "«Ти навіть не уявляєш, які тут бонуси. Залітай, поки гаряче!»", img: "lebiha.jpg" }
    ];

    let currentInfluencer = Math.floor(Math.random() * influencers.length);
    const infCard = document.getElementById('influencer-card');
    const infImg = document.getElementById('influencer-img');
    const infName = document.getElementById('influencer-name');
    const infText = document.getElementById('influencer-text');
    const infDots = document.getElementById('influencer-dots');
    
    let intervalId;

    const updateUI = () => {
        const data = influencers[currentInfluencer];
        infImg.src = data.img;
        infImg.alt = data.name;
        infName.textContent = data.name;
        infText.textContent = data.text;
        
        if (infDots) {
            Array.from(infDots.children).forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentInfluencer);
            });
        }
    };

    const changeInfluencer = (index = -1) => {
        clearInterval(intervalId);
        infCard.style.opacity = '0';
        
        setTimeout(() => {
            if (index === -1) {
                currentInfluencer = (currentInfluencer + 1) % influencers.length;
            } else {
                currentInfluencer = index;
            }
            updateUI();
            infCard.style.opacity = '1';
            startAutoPlay();
        }, 400); // Плавність зникнення 400мс
    };

    const startAutoPlay = () => {
        intervalId = setInterval(() => changeInfluencer(), 3000); // 3 секунди
    };

    if (infCard && infImg && infName && infText) {
        // Ініціалізація точок
        if (infDots) {
            influencers.forEach((_, idx) => {
                const dot = document.createElement('div');
                dot.className = 'influencer-dot';
                dot.addEventListener('click', () => changeInfluencer(idx));
                infDots.appendChild(dot);
            });
        }

        // Старт
        updateUI();
        startAutoPlay();

        // Свайп для мобільних
        let touchStartX = 0;
        let touchEndX = 0;
        
        infCard.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(intervalId);
        }, {passive: true});
        
        infCard.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 40) {
                changeInfluencer((currentInfluencer + 1) % influencers.length);
            } else if (touchEndX > touchStartX + 40) {
                changeInfluencer((currentInfluencer - 1 + influencers.length) % influencers.length);
            } else {
                startAutoPlay();
            }
        }, {passive: true});
    }

    // Динамічні Виграші
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
         const container = document.getElementById('dynamic-live-wins');
         if (!container) return;
         
         container.innerHTML = '';
         for (let i = 0; i < 5; i++) {
             const name = liveWinsNames[Math.floor(Math.random() * liveWinsNames.length)];
             const game = liveWinsGames[Math.floor(Math.random() * liveWinsGames.length)];
             const amount = Math.floor(Math.random() * (50000 - 450 + 1)) + 450;
             const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UAH";
             
             const item = document.createElement('div');
             item.className = 'win-item';
             item.innerHTML = `
                 <span class="win-user">${name}</span>
                 <span class="win-amount">${formattedAmount}</span>
                 <span class="win-game">${game}</span>
             `;
             container.appendChild(item);
         }
    };

    generateLiveWins();
    setInterval(generateLiveWins, 7200000); // Кожні 2 години
});
