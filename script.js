// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
});

// Configuration
const CONFIG = {
    emissionFactors: {
        email: 4, // gram per email
        streaming: 100, // gram per hour (SD)
        videoCall: 55 // gram per hour
    },
    treeAbsorption: 21, // kg CO₂ per year per tree
    comparisonData: {
        car: { value: 240, label: "Berkendara 1 km dengan mobil", unit: "km" },
        tree: { value: 21000, label: "1 pohon serap CO₂ per tahun", unit: "pohon/tahun" },
        flight: { value: 90000, label: "Penerbangan 1 jam", unit: "jam penerbangan" }
    },
    noteColors: ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#9B5DE5'],
    emojis: ['💭', '🌟', '💫', '✨', '❤️', '🙏', '🤝', '🌍', '🕊️', '🔥', '📝', '💡', '🚀', '🎯', '⭐']
};

// Global variables for sticky notes
let stickyNotes = [];
let selectedColor = CONFIG.noteColors[0];

// Initialize website functionality
function initWebsite() {
    // Handle loading screen
    handleLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize digital wall - FIXED: hanya panggil satu kali
    initStickyNotes();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize process animation
    initProcessAnimation();
    
    // Initialize carbon calculator
    initCarbonCalculator();
    
    // Add glitch effect to hero title
    addGlitchEffect();
    
    // Initialize enhanced cards
    initEnhancedCards();
    
    // Initialize interactive chart
    initInteractiveChart();
}

// Handle loading screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) return;
    
    // Simulate loading process
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000); // Reduced to 2 seconds for better UX
    
    // Explore button functionality
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const visiSection = document.getElementById('visi');
            if (visiSection) {
                visiSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initialize navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            nav.style.padding = '10px 0';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            nav.style.padding = '15px 0';
        }
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Initialize chart animations
    initChartAnimations();
    
    // Initialize eco meter
    initEcoMeter();
    
    // Add hero section effects
    initHeroEffects();
}

// Initialize hero effects
function initHeroEffects() {
    const hero = document.getElementById('hero');
    
    if (!hero) return;
    
    // Add mousemove effect to hero section
    hero.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // Reset position when mouse leaves
    hero.addEventListener('mouseleave', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
    });
}

// Initialize chart animations
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    if (!chartBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    chartBars.forEach(bar => {
        bar.style.opacity = '0';
        bar.style.transform = 'translateY(50px)';
        bar.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(bar);
    });
}

// Initialize eco meter
function initEcoMeter() {
    const ecoMeter = document.getElementById('eco-meter');
    
    if (!ecoMeter) return;
    
    // Create Intersection Observer for eco meter
    const meterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the meter fill
                setTimeout(() => {
                    ecoMeter.style.width = '30%';
                }, 500);
                
                // Stop observing after animation
                meterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    meterObserver.observe(ecoMeter);
}

// Enhanced Interactive Chart
function initInteractiveChart() {
    const chartBars = document.querySelectorAll('.chart-bar');
    const timeButtons = document.querySelectorAll('.time-btn');
    const timeButtonsContainer = document.querySelector('.time-buttons');
    const comparisonSelect = document.getElementById('comparison-select');
    const tooltip = document.getElementById('chart-tooltip');

    // Pastikan elemen ada sebelum melanjutkan
    if (!chartBars.length || !comparisonSelect || !tooltip) {
        console.log('Elemen chart tidak ditemukan, skip initialization');
        return;
    }

    let currentMultiplier = 1;
    let currentComparison = 'none';
    let activeBar = null;

    // Update time buttons container attribute
    function updateTimeButtonsContainer() {
        if (timeButtonsContainer) {
            timeButtonsContainer.setAttribute('data-active', currentMultiplier);
        }
    }

    // Initialize chart
    updateChart();
    updateTimeButtonsContainer();

    // Time button events
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            timeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMultiplier = parseInt(this.dataset.multiplier);
            updateTimeButtonsContainer();
            updateChart();
        });
    });

    // Comparison select event
    comparisonSelect.addEventListener('change', function() {
        currentComparison = this.value;
        updateChart();
        updateLegend();
    });

    // Bar click events
    chartBars.forEach(bar => {
        bar.addEventListener('click', function() {
            // Remove active class from all bars
            chartBars.forEach(b => b.classList.remove('active'));
            // Add active class to clicked bar
            this.classList.add('active');
            activeBar = this;
            
            // Update tooltip
            updateTooltip(this);
        });

        // Hover effects
        bar.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px)';
            }
        });

        bar.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    function updateChart() {
        chartBars.forEach(bar => {
            const originalValue = parseInt(bar.dataset.value);
            const adjustedValue = originalValue * currentMultiplier;
            const barElement = bar.querySelector('.bar');
            const valueElement = bar.querySelector('.bar-value');
            
            if (!barElement || !valueElement) return;
            
            // Calculate height (max 90% of container)
            const maxValue = 300 * currentMultiplier;
            const heightPercentage = Math.min((adjustedValue / maxValue) * 90, 90);
            
            // Update bar height
            barElement.style.height = `${heightPercentage}%`;
            
            // Update value text
            let displayValue = adjustedValue;
            let unit = 'g CO₂';
            
            if (adjustedValue >= 1000) {
                displayValue = (adjustedValue / 1000).toFixed(1);
                unit = 'kg CO₂';
            }
            
            valueElement.textContent = `${displayValue} ${unit}`;
            
            // Add comparison bar if needed
            updateComparisonBar(bar, adjustedValue);
            
            // Add animation class
            barElement.classList.add('animated');
        });
        
        // Update tooltip if active bar exists
        if (activeBar) {
            updateTooltip(activeBar);
        }
    }

    function updateComparisonBar(bar, adjustedValue) {
        // Remove existing comparison bar
        const existingComparison = bar.querySelector('.comparison-bar');
        if (existingComparison) {
            existingComparison.remove();
        }
        
        if (currentComparison !== 'none' && CONFIG.comparisonData[currentComparison]) {
            const comparison = CONFIG.comparisonData[currentComparison];
            const barWrapper = bar.querySelector('.bar-wrapper');
            
            if (!barWrapper) return;
            
            // Create comparison bar
            const comparisonBar = document.createElement('div');
            comparisonBar.className = 'bar comparison-bar';
            
            // Calculate comparison height based on ratio to the main value
            const comparisonHeight = Math.min((comparison.value / (300 * currentMultiplier)) * 90, 90);
            comparisonBar.style.height = `${comparisonHeight}%`;
            
            // Insert comparison bar
            barWrapper.appendChild(comparisonBar);
        }
    }

    function updateTooltip(bar) {
        if (!bar) return;
        
        const originalValue = parseInt(bar.dataset.value);
        const adjustedValue = originalValue * currentMultiplier;
        const label = bar.dataset.label || bar.querySelector('.bar-label').textContent;
        
        const tooltipTitle = document.getElementById('tooltip-title');
        const tooltipDesc = document.getElementById('tooltip-desc');
        const tooltipComparison = document.getElementById('tooltip-comparison');
        
        if (tooltipTitle) tooltipTitle.textContent = label;
        
        let timeText = '';
        switch(currentMultiplier) {
            case 1: timeText = 'per jam'; break;
            case 24: timeText = 'per hari'; break;
            case 168: timeText = 'per minggu'; break;
        }
        
        let displayValue = adjustedValue;
        let unit = 'gram';
        if (adjustedValue >= 1000) {
            displayValue = (adjustedValue / 1000).toFixed(2);
            unit = 'kilogram';
        }
        
        if (tooltipDesc) {
            tooltipDesc.textContent = `Menghasilkan ${displayValue} ${unit} CO₂ ${timeText}.`;
        }
        
        // Update comparison info
        if (tooltipComparison && currentComparison !== 'none' && CONFIG.comparisonData[currentComparison]) {
            const comparison = CONFIG.comparisonData[currentComparison];
            const ratio = adjustedValue / comparison.value;
            
            let comparisonText = '';
            if (ratio >= 1) {
                comparisonText = `Setara dengan ${ratio.toFixed(1)} ${comparison.unit} ${comparison.label}`;
            } else {
                comparisonText = `Setara dengan ${(ratio * 100).toFixed(1)}% dari ${comparison.label}`;
            }
            
            tooltipComparison.innerHTML = `<p>${comparisonText}</p>`;
            tooltipComparison.style.display = 'block';
        } else if (tooltipComparison) {
            tooltipComparison.style.display = 'none';
        }
    }

    function updateLegend() {
        const comparisonLegend = document.querySelector('.comparison-legend');
        if (!comparisonLegend) return;
        
        if (currentComparison !== 'none') {
            comparisonLegend.style.display = 'flex';
            const legendText = document.getElementById('comparison-legend-text');
            
            if (legendText) {
                switch(currentComparison) {
                    case 'car':
                        legendText.textContent = 'Berkendara Mobil (per km)';
                        break;
                    case 'tree':
                        legendText.textContent = 'Penyerapan Pohon (per tahun)';
                        break;
                    case 'flight':
                        legendText.textContent = 'Penerbangan (per jam)';
                        break;
                }
            }
        } else {
            comparisonLegend.style.display = 'none';
        }
    }

    // Initialize with first bar active
    if (chartBars.length > 0) {
        setTimeout(() => {
            chartBars[0].classList.add('active');
            activeBar = chartBars[0];
            updateTooltip(activeBar);
        }, 100);
    }
}

// FIXED: Initialize sticky notes (replaces initDigitalWall)
function initStickyNotes() {
    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const colorOptions = document.querySelectorAll('.color-option');
    const notesContainer = document.getElementById('notes-container');
    const shuffleBtn = document.getElementById('shuffle-notes');
    const clearBtn = document.getElementById('clear-notes');
    
    // Check if sticky notes elements exist
    if (!noteForm || !notesContainer) {
        console.log('Sticky notes elements not found');
        return;
    }

    // Load existing notes
    stickyNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    
    // Initialize with sample notes if empty
    if (stickyNotes.length === 0) {
        stickyNotes = [
            {
                id: 1,
                title: "Selamat Datang!",
                content: "Ini adalah papan sticky notes digital. Tambahkan catatan Anda sendiri!",
                color: "#FFD166",
                date: new Date().toLocaleDateString('id-ID'),
                likes: 5,
                emoji: "👋"
            },
            {
                id: 2,
                title: "Ide Kreatif",
                content: "Bagikan ide kreatif Anda untuk membuat perubahan positif dalam komunitas.",
                color: "#06D6A0",
                date: new Date().toLocaleDateString('id-ID'),
                likes: 3,
                emoji: "💡"
            }
        ];
        saveStickyNotes();
    }
    
    // Set up color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.getAttribute('data-color');
        });
    });
    
    // Set default active color
    if (colorOptions.length > 0) {
        colorOptions[0].classList.add('active');
    }
    
    // Handle form submission - FIXED: proper validation
    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (title && content) {
            const newNote = {
                id: Date.now(),
                title: title,
                content: content,
                color: selectedColor,
                date: new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric'
                }),
                likes: 0,
                emoji: getRandomEmoji()
            };
            
            addStickyNoteWithAnimation(newNote);
            noteForm.reset();
        } else {
            showNotification('Harap isi judul dan konten catatan.', 'error');
        }
    });
    
    // Shuffle notes
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            for (let i = stickyNotes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [stickyNotes[i], stickyNotes[j]] = [stickyNotes[j], stickyNotes[i]];
            }
            saveStickyNotes();
            renderStickyNotes();
            showNotification('Posisi catatan diacak!', 'success');
        });
    }
    
    // Clear all notes
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus semua catatan?')) {
                stickyNotes = [];
                saveStickyNotes();
                renderStickyNotes();
                showNotification('Semua catatan telah dihapus.', 'success');
            }
        });
    }
    
    // Initial render
    renderStickyNotes();
}

// Add sticky note with animation
function addStickyNoteWithAnimation(note) {
    stickyNotes.unshift(note);
    saveStickyNotes();
    
    const notesContainer = document.getElementById('notes-container');
    const noteElement = createStickyNoteElement(note);
    noteElement.classList.add('sticking');
    
    if (notesContainer.firstChild) {
        notesContainer.insertBefore(noteElement, notesContainer.firstChild);
    } else {
        notesContainer.appendChild(noteElement);
    }
    
    setTimeout(() => {
        noteElement.classList.remove('sticking');
    }, 800);
    
    showNotification('Catatan berhasil ditambahkan!', 'success');
}

// Create sticky note element
function createStickyNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.style.setProperty('--note-color', note.color);
    noteElement.style.backgroundColor = note.color;
    
    noteElement.innerHTML = `
        <div class="note-header">
            <div class="note-title">${note.title}</div>
            <div class="note-actions">
                <button class="note-action like-btn" data-id="${note.id}">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="note-action delete-btn" data-id="${note.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="note-content">${note.content}</div>
        <div class="note-footer">
            <div class="note-date">${note.date}</div>
            <div class="note-emoji">${note.emoji}</div>
        </div>
    `;
    
    // Add event listeners
    const likeBtn = noteElement.querySelector('.like-btn');
    const deleteBtn = noteElement.querySelector('.delete-btn');
    
    likeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        likeStickyNote(note.id);
    });
    
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteStickyNote(note.id);
    });
    
    return noteElement;
}

// Render all sticky notes
function renderStickyNotes() {
    const notesContainer = document.getElementById('notes-container');
    if (!notesContainer) return;
    
    if (stickyNotes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <i class="far fa-sticky-note"></i>
                <p>Belum ada catatan. Tambahkan catatan pertama Anda!</p>
            </div>
        `;
        return;
    }
    
    notesContainer.innerHTML = '';
    stickyNotes.forEach(note => {
        const noteElement = createStickyNoteElement(note);
        notesContainer.appendChild(noteElement);
    });
}

// Like a sticky note
function likeStickyNote(id) {
    const noteIndex = stickyNotes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        stickyNotes[noteIndex].likes += 1;
        saveStickyNotes();
        renderStickyNotes();
        showNotification('Terima kasih atas dukungannya!', 'success');
    }
}

// Delete a sticky note
function deleteStickyNote(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
        stickyNotes = stickyNotes.filter(note => note.id !== id);
        saveStickyNotes();
        renderStickyNotes();
        showNotification('Catatan berhasil dihapus.', 'success');
    }
}

// Save sticky notes to localStorage
function saveStickyNotes() {
    localStorage.setItem('stickyNotes', JSON.stringify(stickyNotes));
}

// Get random emoji for notes
function getRandomEmoji() {
    return CONFIG.emojis[Math.floor(Math.random() * CONFIG.emojis.length)];
}

// Initialize scroll animations
function initScrollAnimations() {
    // Create Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements that should fade in on scroll
    const fadeElements = document.querySelectorAll('.info-card, .visi-text, .visi-visual, .about-text, .eco-meter');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(element);
    });
}

// Animasi Proses Digital ke Emisi
function initProcessAnimation() {
    const playBtn = document.getElementById('play-animation');
    const resetBtn = document.getElementById('reset-animation');
    const steps = document.querySelectorAll('.process-step');
    
    if (!playBtn || !resetBtn || !steps.length) return;
    
    playBtn.addEventListener('click', function() {
        playProcessAnimation(steps);
    });
    
    resetBtn.addEventListener('click', function() {
        resetProcessAnimation(steps);
    });
}

const steps = document.querySelectorAll('.process-step');

let index = 0;
setInterval(() => {
  steps.forEach(step => step.classList.remove('active'));
  steps[index].classList.add('active');
  index = (index + 1) % steps.length;
}, 1500);


function playProcessAnimation(steps) {
    resetProcessAnimation(steps);
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            
            // Show nature animation at the end
            if (index === steps.length - 1) {
                setTimeout(() => {
                    showNatureAnimation();
                }, 1500);
            }
        }, index * 2000); // 2 seconds per step
    });
}

function resetProcessAnimation(steps) {
    steps.forEach(step => {
        step.classList.remove('active');
    });
}

function showNatureAnimation() {
    // Hapus popup sebelumnya jika ada
    const existingPopup = document.querySelector('.nature-popup');
    const existingOverlay = document.querySelector('.popup-overlay');
    if (existingPopup) existingPopup.remove();
    if (existingOverlay) existingOverlay.remove();

    // Buat overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Buat popup baru
    const popup = document.createElement('div');
    popup.className = 'nature-popup';
    popup.innerHTML = `
        <div class="popup-header">
            <h3>⚠️ Dampak Emisi Karbon Digital</h3>
        </div>
        <div class="popup-content">
            <div class="carbon-scene">
                <div class="co2-counter">CO₂: 420 ppm</div>
                
                <div class="factory-container">
                    <div class="factory">
                        <div class="factory-chimney"></div>
                        <div class="smoke smoke1"></div>
                        <div class="smoke smoke2"></div>
                        <div class="smoke smoke3"></div>
                    </div>
                </div>
                
                <div class="co2-bubble bubble1"></div>
                <div class="co2-bubble bubble2"></div>
                <div class="co2-bubble bubble3"></div>
                <div class="co2-bubble bubble4"></div>
                
                <div class="withered-plant plant1"></div>
                <div class="withered-plant plant2"></div>
                <div class="withered-plant plant3"></div>
                
                <div class="sad-character">
                    <div class="character-body">
                        <div class="character-face">
                            <div class="eye left"></div>
                            <div class="eye right"></div>
                            <div class="sad-mouth"></div>
                        </div>
                    </div>
                    <div class="character-arm arm-left"></div>
                    <div class="character-arm arm-right"></div>
                </div>
            </div>
            
            <div class="popup-message">
                <p><strong>💡 Aktivitas Digital Menghasilkan Emisi!</strong></p>
                <p>Setiap email, streaming, dan cloud computing menghasilkan CO₂ yang mempengaruhi lingkungan dan memperparah pemanasan global</p>
            </div>
            
            <div class="popup-actions">
                <button class="popup-btn learn">Lihat Solusi</button>
                <button class="popup-btn close">Mengerti</button>
            </div>
        </div>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Setup event listeners dan interaksi
    setupCarbonPopupEvents(popup, overlay);
    
    // Auto close setelah 10 detik
    const autoCloseTimer = setTimeout(() => {
        closeCarbonPopup(popup, overlay);
    }, 10000);

    popup.autoCloseTimer = autoCloseTimer;
}

function setupCarbonPopupEvents(popup, overlay) {
    // Tombol tutup
    const closeBtn = popup.querySelector('.popup-btn.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeCarbonPopup(popup, overlay));
    }

    // Tombol solusi
    const learnBtn = popup.querySelector('.popup-btn.learn');
    if (learnBtn) {
        learnBtn.addEventListener('click', () => {
            showSolutionsModal();
            closeCarbonPopup(popup, overlay);
        });
    }

    // Klik overlay untuk close
    overlay.addEventListener('click', () => {
        closeCarbonPopup(popup, overlay);
    });

    // ESC key untuk close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeCarbonPopup(popup, overlay);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeCarbonPopup(popup, overlay) {
    if (popup.autoCloseTimer) {
        clearTimeout(popup.autoCloseTimer);
    }
    
    popup.classList.add('closing');
    overlay.classList.add('closing');
    
    setTimeout(() => {
        if (popup.parentNode) popup.parentNode.removeChild(popup);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 500);
}

function showSolutionsModal() {
    const solutions = [
        "📧 Hapus email tidak penting secara berkala",
        "🎵 Download musik daripada streaming berulang",
        "☁️ Unsubscribe newsletter tidak dibaca",
        "💾 Kompres file sebelum mengupload",
        "🔍 Gunakan search engine yang ramah lingkungan",
    ];
    
    alert("💚 Tips Mengurangi Jejak Karbon Digital:\n\n" + solutions.join('\n• '));
}

// Kalkulator Jejak Karbon
function initCarbonCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCarbonFootprint);
    }
}

function calculateCarbonFootprint() {
    const emailCount = parseInt(document.getElementById('email-count').value) || 0;
    const streamingHours = parseFloat(document.getElementById('streaming-hours').value) || 0;
    const videoCallHours = parseFloat(document.getElementById('video-call-hours').value) || 0;
    
    // Faktor emisi (gram CO₂ per aktivitas)
    const emailEmission = 4; // gram per email
    const streamingEmission = 36; // gram per jam (SD)
    const videoCallEmission = 1000; // gram per jam
    
    // Hitung total emisi harian (gram)
    const dailyEmission = 
        (emailCount * emailEmission) +
        (streamingHours * streamingEmission) +
        (videoCallHours * videoCallEmission);
    
    // Konversi ke kg per tahun
    const yearlyEmission = (dailyEmission * 365) / 1000;
    
    // 1 pohon menyerap sekitar 21 kg CO₂ per tahun
    const treesNeeded = Math.ceil(yearlyEmission / 21);
    
    // Tampilkan hasil
    const resultDiv = document.getElementById('calculator-result');
    const carbonResult = document.getElementById('carbon-result');
    const treeEquivalent = document.getElementById('tree-equivalent');
    
    if (carbonResult && treeEquivalent && resultDiv) {
        carbonResult.textContent = yearlyEmission.toFixed(1);
        treeEquivalent.textContent = treesNeeded;
        
        resultDiv.style.display = 'block';
        
        // Scroll ke hasil
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Tambahkan efek glitch pada judul hero
function addGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title .glitch'); // LEBIH SPESIFIK
    if (heroTitle) {
        // Hapus interval otomatis, gunakan CSS animation saja
        console.log('Glitch effect initialized on hero logo');
        
        // Optional: Trigger glitch on hover atau event tertentu
        heroTitle.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch-flicker 0.5s ease';
        });
        
        heroTitle.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
}

// Enhanced Info Cards Functionality
function initEnhancedCards() {
    // Flip card functionality
    const flipCards = document.querySelectorAll('.info-card-flip');
    
    flipCards.forEach(card => {
        const flipBtn = card.querySelector('.flip-btn');
        const flipBackBtn = card.querySelector('.flip-back-btn');
        
        if (flipBtn) {
            flipBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.add('flipped');
            });
        }
        
        if (flipBackBtn) {
            flipBackBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('flipped');
            });
        }
        
        // Auto-flip back on mouse leave (optional)
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (card.classList.contains('flipped')) {
                    card.classList.remove('flipped');
                }
            }, 30000);
        });
    });
    
    // Add particle effects to cards
    initCardParticles();
    
    // Add hover effects to additional cards
    initAdditionalCards();
}

// Particle effects for cards
function initCardParticles() {
    const cards = document.querySelectorAll('.info-card-wrapper, .additional-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createParticles(e, this);
        });
    });
}

function createParticles(e, card) {
    const particleCount = 8;
    const cardRect = card.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'card-particle';
        
        // Random position around cursor
        const x = e.clientX - cardRect.left + (Math.random() - 0.5) * 100;
        const y = e.clientY - cardRect.top + (Math.random() - 0.5) * 100;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        card.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { 
                opacity: 1,
                transform: 'scale(1) translate(0, 0)'
            },
            { 
                opacity: 0,
                transform: `scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// Additional cards functionality
function initAdditionalCards() {
    const additionalCards = document.querySelectorAll('.additional-card');
    
    additionalCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `cardSlideUp 0.6s ease forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        background-color: ${type === 'success' ? '#06D6A0' : type === 'error' ? '#EF476F' : '#118AB2'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animation for card entrance
const style = document.createElement('style');
style.textContent = `
    @keyframes cardSlideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .additional-card {
        opacity: 0;
    }
    
    .card-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
    }
`;
document.head.appendChild(style);
