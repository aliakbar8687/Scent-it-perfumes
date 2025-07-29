// Global Variables
let isRotating = false;
let favorites = [];
let currentTestimonial = 0;
let currentHeroSlide = 0;
let currentHeroText = 0;
let testimonialsSwiper = null;

// Hero Background Images
const heroBackgrounds = [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1594736797933-d0b22d46eceb?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=1920&h=1080&fit=crop'
];

// Hero Text Content
const heroTextContent = [
    {
        title: "Premium Itar & Perfumes",
        subtitle: "Discover the art of fragrance with our exquisite collection of traditional itar and modern perfumes"
    },
    {
        title: "Luxurious Fragrances",
        subtitle: "Experience the finest scents crafted with premium ingredients from around the world"
    },
    {
        title: "Authentic Itar Collection",
        subtitle: "Immerse yourself in traditional Middle Eastern fragrances that tell a story of elegance"
    },
    {
        title: "Handcrafted Excellence",
        subtitle: "Each bottle represents hours of careful craftsmanship and passion for perfection"
    },
    {
        title: "Timeless Elegance",
        subtitle: "Create unforgettable memories with our signature collection of premium fragrances"
    }
];

// Product Images Array
const productImages = [
  'a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg', 'i.jpg', 'j.jpg',
  'k.jpg', 'l.jpg', 'm.jpg', 'n.jpg', 'o.jpg', 'p.jpg', 'q.jpg', 'r.jpg', 's.jpg', 't.jpg',
  'u.jpg', 'v.jpg', 'w.jpg', 'x.jpg', 'y.jpg', 'z.jpg',
  '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg'
];


// Testimonials Data with Images
// const testimonials = [
//     {
//         text: "Amazing quality fragrances! The oud collection is absolutely divine. I've been using their products for over a year now.",
//         author: "Priya Sharma",
//         location: "Mumbai, India",
//         rating: 5,
//         image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//         text: "Fast delivery and authentic products. Highly recommended! The jasmine essence is my absolute favorite for special occasions.",
//         author: "Rajesh Kumar",
//         location: "Delhi, India",
//         rating: 5,
//         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//         text: "The quality is exceptional and the fragrances last all day. Customer service is also very responsive and helpful.",
//         author: "Anjali Singh",
//         location: "Bangalore, India",
//         rating: 5,
//         image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//         text: "I love the traditional itar collection. Each fragrance tells a beautiful story and the quality is unmatched.",
//         author: "Arjun Patel",
//         location: "Gujarat, India",
//         rating: 5,
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//         text: "Exceptional customer service and premium quality products. My entire family loves their fragrance collection.",
//         author: "Meera Reddy",
//         location: "Hyderabad, India",
//         rating: 5,
//         image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face"
//     }
// ];

// Section-specific CSS Management
const sectionStyles = {
    hero: `
        .hero-section { min-height: 100vh; position: relative; }
        .hero-slider { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .hero-slide { opacity: 0; transition: opacity 2s ease-in-out; }
        .hero-slide.active { opacity: 1; }
    `,
    products: `
        .product-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .product-card:hover { transform: translateY(-15px) scale(1.02); }
        .product-image img { transition: all 0.5s ease; }
        .product-card:hover .product-image img { transform: scale(1.1) rotate(5deg); }
    `,
    testimonials: `
        .testimonials-swiper { padding: 20px 0 60px 0; }
        .testimonial-card { height: auto; min-height: 300px; }
        .swiper-pagination-bullet { background: var(--primary-gradient); }
    `,
    navigation: `
        .navbar { transition: all 0.3s ease; backdrop-filter: blur(15px); }
        .nav-link { position: relative; overflow: hidden; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: -100%; width: 100%; height: 2px; background: white; transition: left 0.3s ease; }
        .nav-link:hover::after { left: 0; }
    `
};

// Apply Section-specific Styles
function applySectionStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = Object.values(sectionStyles).join('\n');
    document.head.appendChild(styleElement);
}

// Hero Background Slider
function initializeHeroSlider() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroTextSlides = document.querySelectorAll('.hero-text-slide');
    
    if (heroSlides.length === 0) return;
    
    // Set initial active slide
    heroSlides[0].classList.add('active');
    if (heroTextSlides.length > 0) {
        heroTextSlides[0].classList.add('active');
    }
    
    setInterval(() => {
        // Remove active class from current slide
        heroSlides[currentHeroSlide].classList.remove('active');
        if (heroTextSlides[currentHeroText]) {
            heroTextSlides[currentHeroText].classList.remove('active');
        }
        
        // Move to next slide
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        currentHeroText = (currentHeroText + 1) % (heroTextSlides.length || heroTextContent.length);
        
        // Add active class to new slide
        heroSlides[currentHeroSlide].classList.add('active');
        if (heroTextSlides[currentHeroText]) {
            heroTextSlides[currentHeroText].classList.add('active');
        }
        
        // Update text content if using dynamic content
        updateHeroTextContent();
        
    }, 4000); // Change every 4 seconds
}

// Update Hero Text Content
function updateHeroTextContent() {
    const titleElement = document.querySelector('.hero-text-slide.active .hero-title');
    const subtitleElement = document.querySelector('.hero-text-slide.active .hero-subtitle');
    
    if (titleElement && subtitleElement && heroTextContent[currentHeroText]) {
        titleElement.textContent = heroTextContent[currentHeroText].title;
        subtitleElement.textContent = heroTextContent[currentHeroText].subtitle;
    }
}

// Initialize Testimonials Swiper
function initializeTestimonialsSwiper() {
    // Wait for Swiper library to load
    if (typeof Swiper === 'undefined') {
        setTimeout(initializeTestimonialsSwiper, 100);
        return;
    }
    
    testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            }
        },
        effect: 'slide',
        speed: 800,
        on: {
            slideChange: function() {
                // Add entrance animation to active slides
                const activeSlides = document.querySelectorAll('.swiper-slide-active .testimonial-card');
                activeSlides.forEach(card => {
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 100);
                });
            }
        }
    });
}

// Page Navigation Functions
function showPage(pageId) {
    // Add fade out effect to current page
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
        currentPage.style.opacity = '0';
        currentPage.style.transform = 'translateY(20px)';
    }
    
    setTimeout(() => {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
        
        // Add fade in effect
        setTimeout(() => {
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 50);
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Page-specific initializations
        if (pageId === 'shop') {
            setTimeout(() => {
                generateProducts();
                initialize3DRotation();
            }, 200);
        } else if (pageId === 'home') {
            setTimeout(() => {
                initializeHeroSlider();
                initialize3DRotation();
                initializeTestimonialsSwiper();
            }, 200);
        }
    }, 300);
}

// Enhanced Product Generation with Images
function generateProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    const perfumeNames = [
        'Royal Oud', 'Jasmine Essence', 'Sandalwood Premium', 'Rose Absolute', 'Musk Divine',
        'Amber Gold', 'Lavender Dreams', 'Vanilla Bliss', 'Bergamot Fresh', 'Patchouli Dark',
        'White Tea', 'Black Pepper', 'Citrus Burst', 'Floral Symphony', 'Woody Charm',
        'Oriental Nights', 'Fresh Mint', 'Sweet Orange', 'Cedar Wood', 'Ylang Ylang',
        'Frankincense Sacred', 'Geranium Garden', 'Lemon Grass', 'Pine Forest', 'Eucalyptus Pure',
        'Sage Wisdom', 'Thyme Herbal', 'Rosemary Fresh', 'Basil Sacred', 'Chamomile Calm',
        'Grapefruit Zest', 'Lime Fresh', 'Mandarin Joy', 'Neroli Blossom', 'Petitgrain Green',
        'Tea Tree Pure', 'Lavender Fields', 'Rose Garden', 'Jasmine Night', 'Sandalwood Royal',
        'Oud Majestic', 'Amber Warm', 'Musk White', 'Vanilla Bean', 'Cinnamon Spice',
        'Cardamom Rich', 'Ginger Warm', 'Clove Bud', 'Nutmeg Sweet', 'Black Pepper Bold'
    ];
    
    const categories = ['Itar', 'Perfume', 'Essence', 'Premium'];
    const prices = [999, 1299, 1599, 1899, 2199, 2499, 2899, 3299, 3699, 4299];
    
    let productsHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const name = perfumeNames[i % perfumeNames.length];
        const variation = i >= perfumeNames.length ? ` ${Math.floor(i / perfumeNames.length) + 1}` : '';
        const fullName = name + variation;
        const price = prices[Math.floor(Math.random() * prices.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const imageUrl = productImages[i % productImages.length];
        
        productsHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4 product-item" data-price="${price}" data-category="${category.toLowerCase()}">
                <div class="product-card">
                    <div class="category-badge">${category}</div>
                    <button class="favorite-btn" data-product="${fullName}" onclick="toggleFavorite('${fullName}')">
                        <i class="far fa-heart"></i>
                    </button>
                    <div class="product-image">
                        <div class="rotating-product" onmouseover="createScentParticles(this)" onclick="showProductDetail('${fullName}', '₹${price}')">
                            <img src="${imageUrl}" alt="${fullName}" class="product-img" loading="lazy">
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${fullName}</h3>
                        <p class="product-price">₹${price.toLocaleString()}</p>
                        <div class="d-flex gap-2">
                            <a href="https://wa.me/918299473773?text=Hello%2C%20I'm%20interested%20in%20buying%20${encodeURIComponent(fullName)}%20from%20your%20website!" target="_blank" class="whatsapp-btn flex-grow-1 text-center">
                                <i class="fab fa-whatsapp"></i> Buy Now
                            </a>
                            <button class="btn btn-outline-primary btn-sm" onclick="showProductDetail('${fullName}', '₹${price}')">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    productGrid.innerHTML = productsHTML;
    
    // Initialize favorite buttons
    updateFavoriteButtons();
    
    // Add staggered animation to products
    animateProductCards();
}

// Animate Product Cards with Staggered Effect
function animateProductCards() {
    const productCards = document.querySelectorAll('#productGrid .product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Enhanced Scent Particles Effect
function createScentParticles(element) {
    const particleCount = 8;
    const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(102, 126, 234, 0.6)', 'rgba(245, 93, 108, 0.6)'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'scent-particle';
            particle.style.left = Math.random() * 80 + 10 + '%';
            particle.style.bottom = '10px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animation = `floatUp ${2 + Math.random() * 2}s linear infinite`;
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 4000);
        }, i * 150);
    }
}

// Enhanced 3D Product Rotation Effect
function initialize3DRotation() {
    const rotatingProducts = document.querySelectorAll('.rotating-product');
    
    rotatingProducts.forEach(product => {
        let rotationY = 0;
        let rotationX = 0;
        let isMouseDown = false;
        let startX = 0;
        let startY = 0;
        
        // Add initial 3D perspective
        product.style.transformStyle = 'preserve-3d';
        product.style.cursor = 'grab';
        
        // Mouse events for desktop
        product.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
            product.style.cursor = 'grabbing';
        });
        
        product.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            rotationY += deltaX * 0.8;
            rotationX -= deltaY * 0.8;
            
            // Limit rotation angles for better visual effect
            rotationX = Math.max(-45, Math.min(45, rotationX));
            
            product.style.transform = `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        product.addEventListener('mouseup', () => {
            isMouseDown = false;
            product.style.cursor = 'grab';
        });
        
        product.addEventListener('mouseleave', () => {
            isMouseDown = false;
            product.style.cursor = 'grab';
            // Reset rotation on mouse leave
            setTimeout(() => {
                if (!isMouseDown) {
                    product.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
                    rotationY = 0;
                    rotationX = 0;
                }
            }, 1000);
        });
        
        // Touch events for mobile
        product.addEventListener('touchstart', (e) => {
            isMouseDown = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        product.addEventListener('touchmove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
            
            rotationX = Math.max(-30, Math.min(30, rotationX));
            
            product.style.transform = `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        product.addEventListener('touchend', () => {
            isMouseDown = false;
        });
        
        // Auto-rotation on hover (desktop only)
        product.addEventListener('mouseenter', () => {
            if (!isMouseDown && window.innerWidth > 768) {
                product.style.transition = 'transform 0.3s ease';
                product.style.transform = 'perspective(1000px) rotateY(15deg) rotateX(5deg) scale(1.05)';
            }
        });
        
        product.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768 && !isMouseDown) {
                product.style.transition = 'transform 0.5s ease';
                product.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            }
        });
    });
}

// Enhanced Search Functionality
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    let visibleCount = 0;
    
    productItems.forEach((item, index) => {
        const productTitle = item.querySelector('.product-title').textContent.toLowerCase();
        const category = item.querySelector('.category-badge').textContent.toLowerCase();
        
        if (productTitle.includes(searchTerm) || category.includes(searchTerm)) {
            item.style.display = 'block';
            // Animate visible items
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, visibleCount * 50);
            visibleCount++;
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.8)';
        }
    });
    
    // Show/hide no results message
    showNoResultsMessage(visibleCount === 0);
}

// Filter Products by Price with Animation
function filterByPrice(minPrice, maxPrice) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const productItems = document.querySelectorAll('.product-item');
    let visibleCount = 0;
    
    productItems.forEach((item, index) => {
        const price = parseInt(item.dataset.price);
        
        if (price >= minPrice && price <= maxPrice) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, visibleCount * 80);
            visibleCount++;
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.8)';
        }
    });
    
    showNoResultsMessage(visibleCount === 0);
}

// Show No Results Message
function showNoResultsMessage(show) {
    let noResultsDiv = document.getElementById('noResults');
    
    if (show && !noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.id = 'noResults';
        noResultsDiv.className = 'col-12 text-center py-5';
        noResultsDiv.innerHTML = `
            <div class="no-results-message">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p class="text-muted">Try adjusting your search or filter criteria</p>
            </div>
        `;
        document.getElementById('productGrid').appendChild(noResultsDiv);
    } else if (!show && noResultsDiv) {
        noResultsDiv.remove();
    }
}

// Enhanced Favorites System
function toggleFavorite(productName) {
    const index = favorites.indexOf(productName);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productName);
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
    
    // Show feedback animation
    showFavoriteAnimation(productName, index === -1);
}

function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        const productName = btn.dataset.product;
        if (favorites.includes(productName)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

// Show Favorite Animation
function showFavoriteAnimation(productName, isAdded) {
    const message = isAdded ? `${productName} added to favorites!` : `${productName} removed from favorites!`;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${isAdded ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Enhanced WhatsApp Integration
function buyProduct(productName, price) {
    const message = `Hello! I'm interested in buying ${productName} (${price}) from Scent-It-Perfumes website. 

Could you please provide more details about:
- Fragrance notes and longevity
- Bottle size and packaging
- Delivery options
- Any current offers

Thank you!`;
    
    const whatsappUrl = `https://wa.me/918299473773?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showProductDetail(productName, price) {
    // Create a modal-like experience before redirecting to WhatsApp
    const modal = document.createElement('div');
    modal.className = 'product-detail-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="background: white; padding: 2rem; border-radius: 20px; max-width: 400px; text-align: center; transform: scale(0.8); transition: transform 0.3s ease;">
            <h3>${productName}</h3>
            <p class="h4 text-primary">${price}</p>
            <p>Would you like to inquire about this fragrance on WhatsApp?</p>
            <div class="mt-3">
                <button class="btn btn-success me-2" onclick="buyProduct('${productName}', '${price}'); document.body.removeChild(this.closest('.product-detail-modal'));">
                    <i class="fab fa-whatsapp"></i> Yes, Contact Now
                </button>
                <button class="btn btn-secondary" onclick="document.body.removeChild(this.closest('.product-detail-modal'));">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 100);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => document.body.removeChild(modal), 300);
        }
    });
}

// Enhanced Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Subscribing...', 'info');
    
    setTimeout(() => {
        showNotification('Thank you for subscribing! You will receive updates about new fragrances and exclusive offers.', 'success');
        emailInput.value = '';
        
        // Add sparkle effect
        createSparkleEffect(emailInput.parentElement);
    }, 1500);
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 10001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        font-weight: 600;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 4000);
}

// Create Sparkle Effect
function createSparkleEffect(element) {
    const sparkles = 12;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkles; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                width: 6px;
                height: 6px;
                background: gold;
                border-radius: 50%;
                z-index: 10000;
                animation: sparkleAnimation 1.5s ease-out forwards;
                pointer-events: none;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1500);
        }, i * 100);
    }
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg) translateY(-50px);
        }
    }
`;

// WhatsApp Floating Button with Animation
function createWhatsAppFloat() {
    const whatsappFloat = document.createElement('div');
    whatsappFloat.innerHTML = `
        <a href="https://wa.me/918299473773?text=Hello%2C%20I%20have%20a%20question%20about%20your%20perfumes!" 
           target="_blank" 
           class="whatsapp-float"
           style="position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; 
                  width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; 
                  justify-content: center; font-size: 24px; z-index: 1000; text-decoration: none;
                  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4); transition: all 0.3s ease;
                  animation: whatsappPulse 2s infinite;"
           onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(37, 211, 102, 0.6)'"
           onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(37, 211, 102, 0.4)'">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    document.body.appendChild(whatsappFloat);
}

// Enhanced Scroll Effects
function initializeScrollEffects() {
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = 'none';
        }
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Advanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animations based on element type
                if (element.classList.contains('product-card')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                } else if (element.classList.contains('testimonial-card')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0) rotateY(0deg)';
                } else {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
                
                // Add ripple effect for special elements
                if (element.classList.contains('about-feature')) {
                    createRippleEffect(element);
                }
            }
        });
    }, observerOptions);
    
    // Observe different element types
    const elementsToObserve = [
        '.product-card',
        '.testimonial-card',
        '.about-feature',
        '.contact-item',
        '.newsletter-section'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            if (element.classList.contains('testimonial-card')) {
                element.style.transform = 'translateX(-50px) rotateY(-15deg)';
            } else {
                element.style.transform = 'translateY(50px)';
            }
            
            observer.observe(element);
        });
    });
}

// Create Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleEffect 1s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

// Page Transitions with Advanced Effects
function initializePageTransitions() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
}

// Advanced Image Loading with Lazy Loading
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Contact Form Enhancement
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea[placeholder="Your Message"]').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Sending message...', 'info');
            
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
                createSparkleEffect(this);
            }, 2000);
        });
    }
}

// Load Favorites from Storage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

// Initialize Performance Optimizations
function initializePerformanceOptimizations() {
    // Debounce search function
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchProducts, 300);
        });
    }
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                // Scroll-based animations here
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });
}

// Add Custom CSS Animations
function addCustomAnimations() {
    const customCSS = `
        ${sparkleCSS}
        
        @keyframes whatsappPulse {
            0% { box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4); }
            50% { box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4), 0 0 0 10px rgba(37, 211, 102, 0.1); }
            100% { box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4); }
        }
        
        @keyframes rippleEffect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        
        .product-card img.loaded {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .hero-product img {
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .rotating-product:hover img {
            filter: brightness(1.1) contrast(1.1);
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                width: 50px !important;
                height: 50px !important;
                font-size: 20px !important;
            }
            
            .notification {
                right: 10px !important;
                left: 10px !important;
                max-width: none !important;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = customCSS;
    document.head.appendChild(styleElement);
}

// Main Initialization Function
function initializeApp() {
    // Apply section styles
    applySectionStyles();
    
    // Add custom animations
    addCustomAnimations();
    
    // Initialize all features
    initializeHeroSlider();
    initialize3DRotation();
    initializeTestimonialsSwiper();
    initializeScrollEffects();
    initializePageTransitions();
    initializeLazyLoading();
    initializeContactForm();
    initializePerformanceOptimizations();
    createWhatsAppFloat();
    
    // Load saved data
    loadFavorites();
    
    // Initialize testimonials
    updateTestimonialDisplay();
    
    // Generate initial products if on shop page
    if (document.getElementById('shop').classList.contains('active')) {
        generateProducts();
    }
}

// Legacy testimonial function for compatibility
function updateTestimonialDisplay() {
    // This function is kept for backward compatibility
    // The Swiper now handles testimonials display
    if (testimonialsSwiper) {
        testimonialsSwiper.update();
    }
}

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Loading Screen Management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1500);
        }
    }, 2000);
    
    // Start hero slider after page load
    setTimeout(initializeHeroSlider, 2100);
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        if (testimonialsSwiper && testimonialsSwiper.autoplay) {
            testimonialsSwiper.autoplay.stop();
        }
    } else {
        // Resume animations when page becomes visible
        if (testimonialsSwiper && testimonialsSwiper.autoplay) {
            testimonialsSwiper.autoplay.start();
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (testimonialsSwiper) {
        testimonialsSwiper.update();
    }
    
    // Reinitialize 3D rotation for new elements
    initialize3DRotation();
});