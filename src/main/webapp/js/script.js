// Form validation and interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();

    // Form validation
    const form = document.getElementById('studentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                showValidationErrors();
            } else {
                showConfetti();
                showLoading();
            }
        });
    }

    // Table row interactions
    initTableInteractions();

    // Back to top button
    initBackToTop();

    // Export buttons
    initExportButtons();

    // Real-time validation
    initRealTimeValidation();
});

function initAnimations() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    // Observe all cards and sections
    document.querySelectorAll('.stat-card, .feature, .form-group').forEach(el => {
        observer.observe(el);
    });
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const year = document.getElementById('year').value;

    let isValid = true;

    // Name validation
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('name');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    if (year < 2000 || year > currentYear + 5) {
        showError('year', `Year must be between 2000 and ${currentYear + 5}`);
        isValid = false;
    } else {
        clearError('year');
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');

    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Add error styling
    field.style.borderColor = '#f72585';

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.color = '#f72585';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.display = 'flex';
    errorDiv.style.alignItems = 'center';
    errorDiv.style.gap = '5px';

    formGroup.appendChild(errorDiv);
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');

    field.style.borderColor = '';

    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
}

function showValidationErrors() {
    // Create floating error notification
    const notification = document.createElement('div');
    notification.className = 'floating-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(247, 37, 133, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        ">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
                <strong>Please fix the errors</strong>
                <p style="margin: 5px 0 0 0; font-size: 0.9em;">Check the form fields</p>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showConfetti() {
    // Create confetti effect
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const confettiPieces = [];
    const colors = ['#4361ee', '#3a0ca3', '#7209b7', '#4cc9f0', '#f72585'];

    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 10 + 5,
            d: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(p => {
            ctx.beginPath();
            ctx.lineWidth = p.r / 2;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
            ctx.stroke();

            p.tiltAngle += p.tiltAngleIncrement;
            p.y += (Math.cos(p.d) + 1 + p.r / 2) / 2;
            p.x += Math.sin(p.d);
            p.tilt = Math.sin(p.tiltAngle) * 15;
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();

    // Stop after 3 seconds
    setTimeout(() => {
        confettiPieces.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
}

function showLoading() {
    // Show loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
        ">
            <div class="spinner" style="
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #4361ee;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            <h3>Registering Student...</h3>
            <p>Please wait while we process your request</p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function initTableInteractions() {
    // Add row click effects
    const tableRows = document.querySelectorAll('.students-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            this.classList.toggle('selected');
        });

        // Add hover sound effect
        row.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });

    // Action button handlers
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();

            const action = this.classList.contains('view') ? 'view' :
                          this.classList.contains('edit') ? 'edit' : 'delete';

            const row = this.closest('tr');
            const studentId = row.querySelector('.student-id').textContent;
            const studentName = row.querySelector('strong').textContent;

            showActionModal(action, studentId, studentName);
        });
    });
}

function showActionModal(action, id, name) {
    const messages = {
        view: `View profile of ${name} (${id})`,
        edit: `Edit details of ${name} (${id})`,
        delete: `Are you sure you want to delete ${name} (${id})?`
    };

    const modal = document.createElement('div');
    modal.className = 'action-modal';
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div style="
                background: #1e293b;
                padding: 40px;
                border-radius: 15px;
                max-width: 400px;
                width: 90%;
                border: 2px solid #4361ee;
                animation: modalAppear 0.3s ease;
            ">
                <h3 style="
                    color: white;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <i class="fas fa-${action === 'view' ? 'eye' : action === 'edit' ? 'edit' : 'trash'}"></i>
                    ${action.charAt(0).toUpperCase() + action.slice(1)} Student
                </h3>
                <p style="color: #94a3b8; margin-bottom: 30px;">${messages[action]}</p>
                <div style="display: flex; gap: 15px; justify-content: flex-end;">
                    <button class="modal-btn cancel" style="
                        padding: 10px 20px;
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                    ">Cancel</button>
                    <button class="modal-btn confirm" style="
                        padding: 10px 20px;
                        background: ${action === 'delete' ? '#f72585' : '#4361ee'};
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                    ">${action === 'delete' ? 'Delete' : 'Confirm'}</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Event listeners for modal buttons
    modal.querySelector('.cancel').addEventListener('click', () => modal.remove());
    modal.querySelector('.confirm').addEventListener('click', () => {
        if (action === 'delete') {
            // In a real application, you would make an AJAX call here
            const row = document.querySelector(`.student-id:contains('${id}')`).closest('tr');
            row.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => row.remove(), 300);

            // Show success message
            showNotification(`${name} has been deleted successfully`, 'success');
        } else {
            showNotification(`Action "${action}" completed for ${name}`, 'info');
        }
        modal.remove();
    });
}

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initExportButtons() {
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.textContent.toLowerCase().trim();
            showNotification(`Exporting data as ${format.toUpperCase()}...`, 'info');

            // Simulate export process
            setTimeout(() => {
                showNotification(`Data exported successfully as ${format.toUpperCase()}!`, 'success');
            }, 1500);
        });
    });
}

function initRealTimeValidation() {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4cc9f0';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('blur', function() {
            if (this.id === 'email' && this.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = '#f72585';
                    showTooltip(this, 'Please enter a valid email address');
                }
            }
        });
    });
}

function showTooltip(element, message) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) existingTooltip.remove();

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#f72585';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '0.85rem';
    tooltip.style.zIndex = '1000';
    tooltip.style.top = (element.offsetTop - 40) + 'px';
    tooltip.style.left = element.offsetLeft + 'px';
    tooltip.style.animation = 'fadeIn 0.3s ease';

    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(tooltip);

    // Remove tooltip after 3 seconds
    setTimeout(() => {
        tooltip.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(76, 201, 240, 0.9)' :
                       type === 'error' ? 'rgba(247, 37, 133, 0.9)' :
                       'rgba(67, 97, 238, 0.9)'};
            color: white;
            padding: 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        ">
            <i class="fas fa-${type === 'success' ? 'check-circle' :
                          type === 'error' ? 'exclamation-circle' :
                          'info-circle'}"></i>
            <div>
                <strong>${type === 'success' ? 'Success!' :
                         type === 'error' ? 'Error!' :
                         'Info'}</strong>
                <p style="margin: 5px 0 0 0; font-size: 0.9em;">${message}</p>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slide animations
const animationStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add current year to footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year-display');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + / to focus search
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.action-modal');
        if (modal) modal.remove();
    }
});