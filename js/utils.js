// utils.js - вспомогательные функции
const Utils = {
    // Форматирование даты
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('ru-RU', options);
    },
    
    // Ограничение текста
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Генерация уникального ID
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Проверка на мобильное устройство
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Показать уведомление
    showNotification: function(message, type = 'info', duration = 3000) {
        // Удаляем предыдущие уведомления
        const oldNotifications = document.querySelectorAll('.notification');
        oldNotifications.forEach(notif => notif.remove());
        
        // Создаем новое уведомление
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            background-color: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Скрываем через указанное время
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    },
    
    // Сохранение в localStorage
    saveToStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
            return false;
        }
    },
    
    // Получение из localStorage
    getFromStorage: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return null;
        }
    }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}