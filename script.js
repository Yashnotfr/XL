// Smooth scrolling for navigation links
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Update active navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Special case for top of page
    if (window.pageYOffset < 100) {
        current = 'home';
    }
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .news-item, .about-text, .about-visual');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Portfolio modal functionality
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');

const projectData = {
    1: {
        title: "Brand Activation Campaign",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        description: "A groundbreaking brand activation that merged physical and digital experiences, creating an immersive journey for customers. The campaign featured interactive installations, AR experiences, and social media integration that generated massive organic reach.",
        reach: "25M+",
        engagement: "18%",
        duration: "6 months"
    },
    2: {
        title: "Music Festival Production",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        description: "Complete production management for a three-day music festival, including stage design, artist coordination, brand partnerships, and live streaming. Created memorable experiences for 50,000+ attendees.",
        reach: "50M+",
        engagement: "22%",
        duration: "12 months"
    },
    3: {
        title: "Viral Social Campaign",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        description: "A fashion brand launch campaign that went viral across TikTok and Instagram, featuring user-generated content, influencer partnerships, and trending challenges that drove massive brand awareness.",
        reach: "75M+",
        engagement: "35%",
        duration: "3 months"
    },
    4: {
        title: "Interactive Digital Experience",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
        description: "An innovative automotive launch experience combining VR showrooms, interactive configurators, and personalized digital journeys. Revolutionized how customers engage with the brand online.",
        reach: "15M+",
        engagement: "28%",
        duration: "8 months"
    }
};

portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalImage').src = project.image;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalReach').textContent = project.reach;
            document.getElementById('modalEngagement').textContent = project.engagement;
            document.getElementById('modalDuration').textContent = project.duration;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Testimonials rotation
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function rotateTestimonials() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

setInterval(rotateTestimonials, 5000);

// Social media icon hover effects
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#fff';
        submitBtn.style.color = '#000';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '#fff';
            submitBtn.style.color = '#000';
            this.reset();
        }, 2000);
    }, 1500);
});

// Parallax effect for hero video
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    const rate = scrolled * -0.5;
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${rate}px)`;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #1a1a1a, #333)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #111, #222)';
    });
});

// Client logo animation
document.querySelectorAll('.client-logo').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
});

// Add loading animation for page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle service item clicks
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            console.log('Service clicked:', serviceId);
            // Add your service-specific logic here
        });
    });
});

// Enhanced scroll effects for sections
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
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

// Add active nav link styles
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: #00f5ff;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeNavStyle);

// Add responsive styles for mobile
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
    @media (max-width: 768px) {
        .hero-logo {
            top: 20px;
            left: 20px;
        }
        
        .hero-logo h1 {
            font-size: 1.4rem;
        }
        
        .sidebar-nav {
            left: 20px;
            top: 60%;
        }
        
        .nav-item {
            font-size: 0.9rem;
            padding: 8px 15px;
            margin-bottom: 1rem;
        }
        
        .social-sidebar {
            right: 20px;
            gap: 1rem;
        }
        
        .social-icon {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
        }
    }
`;
document.head.appendChild(responsiveStyle);

// XXL Assist Chatbox Functionality
class XXLAssist {
    constructor() {
        this.apiKey = 'AIzaSyBQ3J79I68F2L-F89pUt6ShFNFc7eQah1s';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        this.chatbox = document.getElementById('chatbox');
        this.chatboxToggle = document.getElementById('chatboxToggle');
        this.chatboxClose = document.getElementById('chatboxClose');
        this.chatboxInput = document.getElementById('chatboxInput');
        this.chatboxSend = document.getElementById('chatboxSend');
        this.chatboxMessages = document.getElementById('chatboxMessages');
        this.isOpen = false;
        
        this.companyInfo = {
            name: "XXL Studioworks",
            services: [
                "Brand Strategy & Consulting",
                "Creative Campaigns", 
                "Event Management & Experiences",
                "Social Media & Digital Content",
                "Media Productions",
                "Influencer & Celebrity Engagement"
            ],
            experience: "33 years in the industry",
            achievements: "10K+ experiences created, 50+ awards won",
            locations: ["Los Angeles Studio - 1234 Sunset Boulevard", "New York Office - 567 Broadway"],
            email: "yashvardhanbotreal@gmail.com",
            specialties: "Event management, brand activations, viral campaigns, music festivals, digital experiences"
        };
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.chatboxToggle.addEventListener('click', () => this.toggleChatbox());
        this.chatboxClose.addEventListener('click', () => this.closeChatbox());
        this.chatboxSend.addEventListener('click', () => this.sendMessage());
        this.chatboxInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }
    
    toggleChatbox() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatbox.classList.add('active');
            this.chatboxInput.focus();
        } else {
            this.chatbox.classList.remove('active');
        }
    }
    
    closeChatbox() {
        this.isOpen = false;
        this.chatbox.classList.remove('active');
    }
    
    async sendMessage() {
        const message = this.chatboxInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.chatboxInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const response = await this.getGeminiResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again or contact us at yashvardhanbotreal@gmail.com for assistance.', 'bot');
        }
    }
    
    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (type === 'bot') {
            avatarDiv.innerHTML = '<img src="Screenshot 2025-08-31 081206.png" alt="XXL Assist">';
        } else {
            avatarDiv.textContent = 'U';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatboxMessages.appendChild(messageDiv);
        this.chatboxMessages.scrollTop = this.chatboxMessages.scrollHeight;
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="Screenshot 2025-08-31 081206.png" alt="XXL Assist">
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatboxMessages.appendChild(typingDiv);
        this.chatboxMessages.scrollTop = this.chatboxMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    async getGeminiResponse(userMessage) {
        const prompt = `You are XXL Assist, an AI assistant for XXL Studioworks, a creative marketing and entertainment company. 

Company Information:
- Name: ${this.companyInfo.name}
- Experience: ${this.companyInfo.experience}
- Services: ${this.companyInfo.services.join(', ')}
- Achievements: ${this.companyInfo.achievements}
- Locations: ${this.companyInfo.locations.join(', ')}
- Specialties: ${this.companyInfo.specialties}
- Contact Email: ${this.companyInfo.email}

Guidelines:
- Be helpful, professional, and enthusiastic about events and creative marketing
- Provide specific information about XXL Studioworks services when asked
- For detailed enquiries, direct users to email: ${this.companyInfo.email}
- Keep responses concise but informative (max 150 words)
- Focus on event management, brand activations, creative campaigns, and entertainment solutions

User Question: ${userMessage}

Respond as XXL Assist:`;

        try {
            const requestBody = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 200
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };

            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Gemini API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Gemini API Response:', data);
            
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts) {
                return data.candidates[0].content.parts[0].text;
            } else if (data.error) {
                throw new Error(`Gemini API Error: ${data.error.message}`);
            } else {
                throw new Error('Invalid response format from Gemini API');
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            
            // Fallback response with company information
            if (userMessage.toLowerCase().includes('service') || userMessage.toLowerCase().includes('what do you do')) {
                return `XXL Studioworks offers comprehensive creative marketing and entertainment solutions including: ${this.companyInfo.services.join(', ')}. With ${this.companyInfo.experience}, we've created ${this.companyInfo.achievements}. For detailed information, please email us at ${this.companyInfo.email}.`;
            } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('email')) {
                return `You can reach us at ${this.companyInfo.email} for all enquiries. We have offices in ${this.companyInfo.locations.join(' and ')}.`;
            } else if (userMessage.toLowerCase().includes('event') || userMessage.toLowerCase().includes('management')) {
                return `We specialize in ${this.companyInfo.specialties}. Our team has ${this.companyInfo.experience} creating memorable experiences. Contact us at ${this.companyInfo.email} to discuss your event needs.`;
            } else {
                return `Hello! I'm XXL Assist from XXL Studioworks. We're a creative marketing and entertainment company with ${this.companyInfo.experience}. How can I help you with our services today? For detailed enquiries, please email ${this.companyInfo.email}.`;
            }
        }
    }
}

// Initialize XXL Assist when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new XXLAssist();
});
