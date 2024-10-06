document.addEventListener('DOMContentLoaded', (event) => {
    const audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.getElementById('volume-control');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const bulletContainer = document.getElementById('bullet-container');

    // Fonction pour créer les balles
    function createBullet() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = `${Math.random() * window.innerWidth}px`;
        bullet.style.top = `${window.innerHeight}px`;
        bulletContainer.appendChild(bullet);

        const animationDuration = Math.random() * 2 + 1;
        bullet.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(-${window.innerHeight + 15}px)` }
        ], {
            duration: animationDuration * 1000,
            easing: 'linear'
        }).onfinish = () => {
            bullet.remove();
        };
    }

    setInterval(createBullet, 100);

    // Contrôles audio
    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = this.value;
        updateMuteButton();
    });

    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    muteBtn.addEventListener('click', function() {
        audioPlayer.muted = !audioPlayer.muted;
        updateMuteButton();
    });

    function updateMuteButton() {
        if (audioPlayer.muted || audioPlayer.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // Effet de traînée de souris
    let dots = [];
    let mouse = { x: 0, y: 0 };

    for (let i = 0; i < 12; i++) {
        let dot = document.createElement('div');
        dot.className = 'trail';
        document.body.appendChild(dot);
        dots.push(dot);
    }

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animateTrail() {
        let x = mouse.x;
        let y = mouse.y;

        dots.forEach((dot, index) => {
            let nextDot = dots[index + 1] || dots[0];
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            x += (nextDot.offsetLeft - dot.offsetLeft) * .5;
            y += (nextDot.offsetTop - dot.offsetTop) * .5;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Effets sur le titre de l'onglet
    const tabEffects = {
        originalTitle: "Sραrrσωhαωκ",
        glitchChars: "!<>-_\\/[]{}—=+*^?#________",
        
        glitch: function() {
            let iteration = 0;
            const glitchInterval = setInterval(() => {
                document.title = this.originalTitle
                    .split("")
                    .map((char, index) => {
                        if(index < iteration) {
                            return this.originalTitle[index];
                        }
                        return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                    })
                    .join("");
                
                if(iteration >= this.originalTitle.length) {
                    clearInterval(glitchInterval);
                    document.title = this.originalTitle;
                }
                iteration += 1 / 3;
            }, 50);
        },
        
        loading: function() {
            const dots = ['.', '..', '...'];
            let i = 0;
            const loadingInterval = setInterval(() => {
                document.title = `${this.originalTitle}${dots[i]}`;
                i = (i + 1) % dots.length;
            }, 500);
            setTimeout(() => {
                clearInterval(loadingInterval);
                document.title = this.originalTitle;
            }, 5000);
        },
        
        matrix: function() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let iteration = 0;
            const matrixInterval = setInterval(() => {
                document.title = this.originalTitle
                    .split("")
                    .map((char, index) => {
                        if(index < iteration) {
                            return this.originalTitle[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
                
                if(iteration >= this.originalTitle.length) {
                    clearInterval(matrixInterval);
                    document.title = this.originalTitle;
                }
                iteration += 1 / 3;
            }, 50);
        },
        
        typing: function() {
            let i = 0;
            const typingInterval = setInterval(() => {
                document.title = this.originalTitle.slice(0, i) + '|';
                i++;
                if (i > this.originalTitle.length) {
                    clearInterval(typingInterval);
                    document.title = this.originalTitle;
                }
            }, 200);
        }
    };

    setInterval(() => {
        const effects = Object.keys(tabEffects).filter(key => typeof tabEffects[key] === 'function');
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        tabEffects[randomEffect]();
    }, 10000);
});