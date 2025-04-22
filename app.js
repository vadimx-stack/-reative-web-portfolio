document.addEventListener('DOMContentLoaded', () => {
    initGSAP();
    initMobileMenu();
    initCustomCursor();
    initProjectsGallery();
    initProcessVisualizer();
    initContactForm();
    initCurrentYear();
});

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);
    
    const parallaxElements = document.querySelectorAll('.parallax-bg-1, .parallax-bg-2');
    parallaxElements.forEach(element => {
        gsap.to(element, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: element.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((element, index) => {
        gsap.fromTo(element, 
            { y: 60, opacity: 0, visibility: 'hidden' },
            { 
                y: 0, 
                opacity: 1, 
                visibility: 'visible',
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                delay: 0.2
            }
        );
    });
    
    const revealDelayElements = document.querySelectorAll('.gsap-reveal-delay');
    revealDelayElements.forEach((element, index) => {
        gsap.fromTo(element, 
            { y: 60, opacity: 0, visibility: 'hidden' },
            { 
                y: 0, 
                opacity: 1, 
                visibility: 'visible',
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                delay: 0.4
            }
        );
    });
    
    const revealDelay2Elements = document.querySelectorAll('.gsap-reveal-delay-2');
    revealDelay2Elements.forEach((element, index) => {
        gsap.fromTo(element, 
            { y: 60, opacity: 0, visibility: 'hidden' },
            { 
                y: 0, 
                opacity: 1, 
                visibility: 'visible',
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                delay: 0.6
            }
        );
    });
    
    gsap.to('#main-nav', {
        scrollTrigger: {
            trigger: 'body',
            start: "top -50",
            toggleClass: {targets: "#main-nav", className: "scrolled"}
        }
    });
    
    const orbitPoints = document.querySelectorAll('.orbit-point');
    orbitPoints.forEach((point, index) => {
        gsap.to(point, {
            rotation: 360,
            duration: 20 + index * 5,
            repeat: -1,
            ease: "none"
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .hexagon-item, .orbit-point, .process-node, .matrix-point');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
    
    if (!isMobileDevice()) {
        document.body.style.cursor = 'none';
    } else {
        if (cursor) {
            cursor.style.display = 'none';
        }
    }
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

function initProjectsGallery() {
    const hexagonItems = document.querySelectorAll('.hexagon-item');
    const projectDetailView = document.querySelector('.project-detail-view');
    const projectTitle = document.querySelector('.project-title');
    const projectDescription = document.querySelector('.project-description');
    const techStack = document.querySelector('.tech-stack');
    
    const projectsData = {
        'Aurora': {
            title: 'Аврора',
            description: 'Интерактивная платформа для визуализации комплексных данных с адаптивным интерфейсом и системой аналитики в реальном времени.',
            tech: ['React', 'D3.js', 'GraphQL', 'Node.js'],
            color: 'from-indigo-500 to-purple-600'
        },
        'Quantum': {
            title: 'Квантум',
            description: 'Экспериментальный пользовательский интерфейс с процедурной генерацией элементов и динамической адаптацией к поведению пользователя.',
            tech: ['Three.js', 'WebGL', 'Vue', 'GLSL'],
            color: 'from-teal-400 to-green-500'
        },
        'Nebula': {
            title: 'Небула',
            description: 'Иммерсивное аудиовизуальное приложение, реагирующее на звуковые входные данные и создающее синхронизированные визуальные эффекты.',
            tech: ['WebAudio API', 'Canvas', 'GSAP', 'JavaScript'],
            color: 'from-red-400 to-pink-500'
        },
        'Vertex': {
            title: 'Вертекс',
            description: 'Система машинного обучения для креативных процессов, позволяющая автоматизировать рутинные задачи и генерировать творческие решения.',
            tech: ['TensorFlow.js', 'Python', 'React', 'Flask'],
            color: 'from-yellow-400 to-orange-500'
        }
    };
    
    hexagonItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const projectData = projectsData[projectId];
            
            if (projectData) {
                projectTitle.textContent = projectData.title;
                projectDescription.textContent = projectData.description;
                
                techStack.innerHTML = '';
                projectData.tech.forEach(tech => {
                    const techSpan = document.createElement('span');
                    techSpan.textContent = tech;
                    techStack.appendChild(techSpan);
                });
                
                gsap.to(projectDetailView, {
                    opacity: 1,
                    y: -20,
                    duration: 0.8,
                    ease: "power3.out"
                });
                
                setTimeout(() => {
                    projectDetailView.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    });
}

function initProcessVisualizer() {
    const processNodes = document.querySelectorAll('.process-node');
    const nodeTitle = document.querySelector('.node-title');
    const nodeDescription = document.querySelector('.node-description');
    const processCanvas = document.getElementById('process-canvas');
    
    const processData = {
        'concept': {
            title: 'Концепция',
            description: 'Исследование возможностей и определение ключевых целей проекта. Создание концептуальных эскизов и установление направления творческого развития.'
        },
        'exploration': {
            title: 'Исследование',
            description: 'Анализ существующих решений и технологий. Изучение потребностей аудитории и разработка стратегии взаимодействия с пользователем.'
        },
        'iteration': {
            title: 'Итерация',
            description: 'Последовательное улучшение идей через циклы проектирования, тестирования и модификации. Внедрение обратной связи в процесс разработки.'
        },
        'refinement': {
            title: 'Доработка',
            description: 'Детальное совершенствование проекта, оптимизация производительности и пользовательского опыта. Подготовка к финальной стадии.'
        },
        'launch': {
            title: 'Запуск',
            description: 'Финальное тестирование и развертывание проекта. Анализ метрик и планирование будущих улучшений на основе реальных данных.'
        }
    };
    
    if (processCanvas) {
        const ctx = processCanvas.getContext('2d');
        let particlesArray = [];
        
        const resizeCanvas = () => {
            processCanvas.width = processCanvas.offsetWidth;
            processCanvas.height = processCanvas.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor(canvas, nodeIndex) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = this.getColorByNodeIndex(nodeIndex);
            }
            
            getColorByNodeIndex(index) {
                const colors = [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(217, 70, 239, 0.7)',
                    'rgba(251, 146, 60, 0.7)'
                ];
                
                return colors[index] || colors[0];
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > this.canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > this.canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                this.ctx.fillStyle = this.color;
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        const createParticles = (nodeIndex) => {
            particlesArray = [];
            for (let i = 0; i < 50; i++) {
                particlesArray.push(new Particle(processCanvas, nodeIndex));
            }
        };
        
        createParticles(0);
        
        const animateParticles = () => {
            ctx.clearRect(0, 0, processCanvas.width, processCanvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
        
        processNodes.forEach((node, index) => {
            node.addEventListener('click', () => {
                processNodes.forEach(n => n.classList.remove('active'));
                
                node.classList.add('active');
                
                const nodeId = node.getAttribute('data-node');
                
                if (processData[nodeId]) {
                    gsap.to([nodeTitle, nodeDescription], {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        onComplete: () => {
                            nodeTitle.textContent = processData[nodeId].title;
                            nodeDescription.textContent = processData[nodeId].description;
                            
                            gsap.to([nodeTitle, nodeDescription], {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                stagger: 0.1
                            });
                        }
                    });
                    
                    createParticles(index);
                }
            });
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('connection-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('sender-name').value;
            const email = document.getElementById('sender-email').value;
            const message = document.getElementById('message-content').value;
            
            const signalEmitter = document.querySelector('.signal-emitter');
            const signalCore = document.querySelector('.signal-core');
            
            signalEmitter.classList.add('sending');
            
            gsap.to(signalCore, {
                scale: 1.5,
                duration: 0.5,
                repeat: 3,
                yoyo: true,
                onComplete: () => {
                    contactForm.reset();
                    
                    alert('Сообщение успешно отправлено!');
                    
                    gsap.to(signalCore, {
                        scale: 1,
                        duration: 0.5
                    });
                    
                    signalEmitter.classList.remove('sending');
                }
            });
        });
    }
}

function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 