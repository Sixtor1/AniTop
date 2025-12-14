// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Слайдер цитат
const quotes = document.querySelectorAll('.quote');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.quote-prev');
const nextBtn = document.querySelector('.quote-next');
let currentQuote = 0;

function showQuote(index) {
    quotes.forEach(quote => quote.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    quotes[index].classList.add('active');
    dots[index].classList.add('active');
    currentQuote = index;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        let newIndex = currentQuote - 1;
        if (newIndex < 0) newIndex = quotes.length - 1;
        showQuote(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentQuote + 1;
        if (newIndex >= quotes.length) newIndex = 0;
        showQuote(newIndex);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showQuote(index);
    });
});

// Автоматическое переключение цитат
if (quotes.length > 0) {
    setInterval(() => {
        let newIndex = currentQuote + 1;
        if (newIndex >= quotes.length) newIndex = 0;
        showQuote(newIndex);
    }, 5000);
}

// Фильтрация новинок
const filterButtons = document.querySelectorAll('.filter-btn');
const noveltyCards = document.querySelectorAll('.novelty-card');

if (filterButtons.length > 0 && noveltyCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            noveltyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Поиск и сортировка для Топ 20 IMDB
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const topItems = document.querySelectorAll('.top-item');

if (searchInput && topItems.length > 0) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        topItems.forEach(item => {
            const title = item.getAttribute('data-name').toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

if (sortSelect && topItems.length > 0) {
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const itemsArray = Array.from(topItems);
        
        itemsArray.sort((a, b) => {
            if (sortBy === 'rating') {
                const ratingA = parseFloat(a.getAttribute('data-rating'));
                const ratingB = parseFloat(b.getAttribute('data-rating'));
                return ratingB - ratingA;
            } else if (sortBy === 'name') {
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                return nameA.localeCompare(nameB);
            } else if (sortBy === 'year') {
                const yearA = parseInt(a.getAttribute('data-year'));
                const yearB = parseInt(b.getAttribute('data-year'));
                return yearB - yearA;
            }
            return 0;
        });
        
        // Переставляем элементы в DOM
        const container = document.querySelector('.top-items-container');
        container.innerHTML = '';
        itemsArray.forEach(item => {
            container.appendChild(item);
        });
    });
}

// Плавная прокрутка для всех страниц
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем меню на мобильных устройствах
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Активное меню при прокрутке (только для index.html)
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для карточек
    const cards = document.querySelectorAll('.section-card, .fact-card, .novelty-card, .actor-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});