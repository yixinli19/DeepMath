// Main JavaScript for DeepMath Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initVideoPlaceholder();
    initAnimations();
    initFormValidation();
    initCurriculumFlowchart();
    initTestimonialScroll();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Video Placeholder Functionality
function initVideoPlaceholder() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would load the actual video
            this.innerHTML = `
                <div style="padding: 2rem; text-align: center;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #2563eb; margin-bottom: 1rem;"></i>
                    <p>Loading demo video...</p>
                </div>
            `;
            
            // Simulate video loading
            setTimeout(() => {
                this.innerHTML = `
                    <div style="padding: 2rem; text-align: center;">
                        <i class="fas fa-play" style="font-size: 3rem; color: #2563eb; margin-bottom: 1rem;"></i>
                        <p><strong>Demo Video Would Play Here</strong></p>
                        <p>This would show the DeepMath platform in action</p>
                    </div>
                `;
            }, 2000);
        });
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate feature cards, pricing cards, etc.
    const animatedElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .benefit-card, ' +
        '.stat-item, .curriculum-area, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Validation Enhancement
function initFormValidation() {
    // Add real-time validation for email fields
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
        input.addEventListener('input', clearEmailError);
    });

    // Add real-time validation for password fields
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('blur', validatePassword);
        input.addEventListener('input', clearPasswordError);
    });
}

function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById(e.target.id + 'Error');
    
    if (email && !emailRegex.test(email)) {
        e.target.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'Please enter a valid email address';
        }
    } else {
        e.target.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

function clearEmailError(e) {
    e.target.classList.remove('error');
    const errorElement = document.getElementById(e.target.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function validatePassword(e) {
    const password = e.target.value;
    const errorElement = document.getElementById(e.target.id + 'Error');
    
    if (password && password.length < 6) {
        e.target.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'Password must be at least 6 characters';
        }
    } else {
        e.target.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

function clearPasswordError(e) {
    if (e.target.value.length >= 6) {
        e.target.classList.remove('error');
        const errorElement = document.getElementById(e.target.id + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number) {
                    animateCounter(target, number);
                    statObserver.unobserve(target);
                }
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
}

// Add loading state to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button[type="submit"], .btn-primary, .btn-secondary')) {
        const button = e.target;
        const originalText = button.textContent;
        
        // Don't add loading state if it's already there
        if (button.classList.contains('btn-loading')) {
            return;
        }
        
        button.classList.add('btn-loading');
        button.disabled = true;
        
        // Reset after a short delay for demo purposes
        setTimeout(() => {
            button.classList.remove('btn-loading');
            button.disabled = false;
            button.textContent = originalText;
        }, 1000);
    }
});

// FAQ Accordion (if FAQ items are present)
document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('h3');
    if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const content = item.querySelector('p');
            if (content) {
                const isOpen = content.style.display === 'block';
                content.style.display = isOpen ? 'none' : 'block';
                header.style.transform = isOpen ? 'none' : 'translateX(10px)';
            }
        });
    }
});

// Curriculum Flowchart Functionality
function initCurriculumFlowchart() {
    // Initialize the first area as expanded by default
    const firstArea = document.querySelector('.curriculum-area[data-area="numbers"]');
    if (firstArea) {
        toggleArea('numbers');
    }
}

// Toggle curriculum area visibility
function toggleArea(areaId) {
    const area = document.querySelector(`.curriculum-area[data-area="${areaId}"]`);
    if (!area) return;

    const header = area.querySelector('.area-header');
    const content = area.querySelector('.area-content');
    
    // Close all other areas
    document.querySelectorAll('.curriculum-area').forEach(otherArea => {
        if (otherArea !== area) {
            const otherHeader = otherArea.querySelector('.area-header');
            const otherContent = otherArea.querySelector('.area-content');
            otherHeader.classList.remove('active');
            otherContent.classList.remove('active');
            
            // Also close all modules in other areas
            otherArea.querySelectorAll('.module-card').forEach(module => {
                const moduleHeader = module.querySelector('.module-header');
                const moduleContent = module.querySelector('.module-content');
                moduleHeader.classList.remove('active');
                moduleContent.classList.remove('active');
            });
        }
    });

    // Toggle current area
    const isActive = header.classList.contains('active');
    if (isActive) {
        header.classList.remove('active');
        content.classList.remove('active');
        
        // Close all modules in this area
        area.querySelectorAll('.module-card').forEach(module => {
            const moduleHeader = module.querySelector('.module-header');
            const moduleContent = module.querySelector('.module-content');
            moduleHeader.classList.remove('active');
            moduleContent.classList.remove('active');
        });
    } else {
        header.classList.add('active');
        content.classList.add('active');
    }
}

// Toggle module visibility
function toggleModule(moduleId) {
    const content = document.getElementById(moduleId);
    if (!content) return;

    const module = content.closest('.module-card');
    if (!module) return;

    const header = module.querySelector('.module-header');
    
    const isActive = header.classList.contains('active');
    if (isActive) {
        header.classList.remove('active');
        content.classList.remove('active');
    } else {
        header.classList.add('active');
        content.classList.add('active');
    }
}

// Add smooth scrolling to curriculum sections
function scrollToCurriculum() {
    const curriculumSection = document.getElementById('curriculum');
    if (curriculumSection) {
        curriculumSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animate curriculum stats when they come into view
const curriculumStats = document.querySelectorAll('.stat-item .stat-number');
if (curriculumStats.length > 0) {
    const curriculumObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalText = target.textContent;
                const number = parseInt(finalText.replace(/\D/g, ''));
                
                if (number && number > 1) {
                    // Animate counting up
                    let current = 0;
                    const increment = Math.ceil(number / 30);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            target.textContent = finalText;
                            clearInterval(timer);
                        } else {
                            target.textContent = current;
                        }
                    }, 50);
                }
                
                curriculumObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    curriculumStats.forEach(stat => {
        curriculumObserver.observe(stat);
    });
}

// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');
    
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        toggle.style.transform = 'rotate(0deg)';
    } else {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-toggle').style.transform = 'rotate(0deg)';
        });
        
        // Open clicked FAQ item
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.style.transform = 'rotate(180deg)';
    }
}

// Scroll to pricing plans
function scrollToPlans() {
    const pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
        pricingGrid.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Language Switching Functionality
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.problems': 'Problem',
        'nav.solution': 'Solution',
        'nav.pricing': 'Pricing',
        'nav.reviews': 'Review',
        'nav.login': 'Login',
        'nav.signup': 'Start Free Trial',
        
        // Hero Section
        'hero.title': 'Where Exceptional Minds Deserve More.',
        'hero.subtitle': 'Built on the world’s most advanced math education systems, DeepMath nurtures your child’s talent with depth, logic, and precision—turning potential into mastery.',
        'hero.videoTitle': 'See How It Works',
        'hero.videoDesc': 'Watch a real student work through challenging problems with our AI tutor',
        'hero.startTrial': 'Start Free Trial',
        'hero.seeAllPlans': 'See All Plans',
        
        // Problems Section
        'problems.title': 'Explore Sample Problems',
        'problems.subtitle': 'Try our challenging problems with step-by-step AI guidance',
        
        // Why Choose Section
        'whyChoose.title': 'Why Choose DeepMath?',
        'whyChoose.subtitle': 'Built on proven foundations with cutting-edge innovation',
        'whyChoose.foundation.title': '30+ Years of Proven Excellence',
        'whyChoose.foundation.description': 'Built on over 30 years of China\'s foundation math education system, proven to produce some of the world\'s strongest mathematical minds and consistently top-performing students in international assessments.',
        'whyChoose.olympic.title': 'Olympic-Level Challenges',
        'whyChoose.olympic.description': 'Our curriculum includes competition-grade problems designed to challenge and inspire advanced learners, preparing students for mathematical olympiads and fostering deep analytical thinking.',
        'whyChoose.ai.title': 'Cutting-Edge AI Technology',
        'whyChoose.ai.description': 'Powered by advanced AI technology in education, featuring Socratic questioning methods that guide students to discover solutions independently while providing personalized learning experiences.',
        'whyChoose.trust.years': 'Years of Educational Excellence',
        'whyChoose.trust.success': 'Student Success Rate',
        'whyChoose.trust.students': 'Students Worldwide',

        // Contact Page
        'contact.hero.title': 'Contact Us',
        'contact.hero.subtitle': 'We\'re here to help! Send us a message and we\'ll get back to you soon.',
        'contact.getInTouch.title': 'Get in Touch',
        'contact.getInTouch.email': 'Email us at support@deepmath.com or use the form below',
        'contact.getInTouch.response': 'We typically respond within 24 hours',
        'contact.form.firstName': 'First Name',
        'contact.form.lastName': 'Last Name',
        'contact.form.email': 'Email Address',
        'contact.form.subject': 'Subject',
        'contact.form.subjectPlaceholder': 'What can we help you with?',
        'contact.form.message': 'Message',
        'contact.form.messagePlaceholder': 'Please describe your question or issue...',
        'contact.form.submit': 'Send Message',
        'contact.form.success': 'Thank you for contacting us! We\'ll respond within 24 hours.',
        'contact.form.error': 'Please correct the errors above and try again.',

        // Careers Page
        'careers.hero.title': 'Join Our Mission',
        'careers.hero.subtitle': 'Help us revolutionize mathematics education and empower the next generation of problem solvers',
        'careers.culture.title': 'Why Work at DeepMath?',
        'careers.culture.innovation.title': 'Innovation First',
        'careers.culture.innovation.description': 'Work with cutting-edge AI technology and shape the future of education',
        'careers.culture.impact.title': 'Meaningful Impact',
        'careers.culture.impact.description': 'Directly influence the learning journey of thousands of students worldwide',
        'careers.culture.team.title': 'Collaborative Team',
        'careers.culture.team.description': 'Work alongside passionate educators, engineers, and researchers',
        'careers.join.title': 'Join Our Team',
        'careers.join.subtitle': 'We\'re always looking for talented individuals who share our passion for education and innovation',
        'careers.areas.engineering.title': 'Engineering',
        'careers.areas.engineering.description': 'Build cutting-edge AI-powered educational technology that transforms how students learn mathematics.',
        'careers.areas.education.title': 'Education',
        'careers.areas.education.description': 'Design innovative curriculum and research-backed learning experiences that challenge and inspire students.',
        'careers.areas.business.title': 'Business',
        'careers.areas.business.description': 'Drive growth and help bring advanced math education to students and families around the world.',
        'careers.process.title': 'How to Apply',
        'careers.process.step1.title': 'Send Your Resume',
        'careers.process.step1.description': 'Email us your resume and cover letter explaining why you\'re passionate about math education.',
        'careers.process.step2.title': 'Initial Conversation',
        'careers.process.step2.description': 'We\'ll schedule a call to learn more about your background and discuss potential opportunities.',
        'careers.process.step3.title': 'Join the Team',
        'careers.process.step3.description': 'If there\'s a mutual fit, we\'ll work together to find the perfect role for your skills and interests.',
        'careers.cta.title': 'Ready to Make an Impact?',
        'careers.cta.description': 'Join us in revolutionizing math education and helping gifted students reach their full potential.',
        'careers.cta.button': 'Send Us Your Resume',
        'careers.cta.email': 'Email: careers@deepmath.com',
        'careers.benefits.title': 'Benefits & Perks',
        'careers.benefits.health.title': 'Health & Wellness',
        'careers.benefits.health.description': 'Comprehensive health, dental, and vision insurance',
        'careers.benefits.remote.title': 'Remote Friendly',
        'careers.benefits.remote.description': 'Flexible work arrangements and remote work options',
        'careers.benefits.learning.title': 'Learning Budget',
        'careers.benefits.learning.description': '$2,000 annual professional development allowance',
        'careers.benefits.timeoff.title': 'Time Off',
        'careers.benefits.timeoff.description': 'Unlimited PTO and sabbatical opportunities',
        'careers.benefits.equity.title': 'Equity',
        'careers.benefits.equity.description': 'Stock options for all full-time employees',
        'careers.benefits.office.title': 'Office Perks',
        'careers.benefits.office.description': 'Catered meals, snacks, and premium coffee',
        'problems.tab1': 'Numbers and Algebra',
        'problems.tab2': 'Geometry',
        'problems.tab3': 'Statistics and Probability',
        'problems.tab4': 'Integrated Thinking',
        'problems.bored.title': 'Your Child is Bored & Disengaged',
        'problems.bored.desc': '"My 7th grader finishes math homework in 10 minutes and says it\'s too easy. She\'s losing interest in math entirely."',
        'problems.bored.solution': 'Our Solution: 10,000+ challenging problems that scale to your child\'s ability level',
        'problems.help.title': 'No One Can Help With Advanced Problems',
        'problems.help.desc': '"When my child gets stuck on competition-level problems, neither I nor their teacher can guide them effectively."',
        'problems.help.solution': 'Our Solution: 24/7 AI tutor trained on advanced mathematical reasoning',
        'problems.expensive.title': 'Private Tutoring is Expensive & Inconsistent',
        'problems.expensive.desc': '"We\'re paying $80/hour for a tutor who cancels frequently. It\'s costing us $320/month for just 4 sessions."',
        'problems.expensive.solution': 'Our Solution: Starting at $29/month for unlimited access',
        'problems.thinking.title': 'Your Child Isn\'t Learning to Think',
        'problems.thinking.desc': '"My kid can solve problems but doesn\'t understand the reasoning. They just memorize steps."',
        'problems.thinking.solution': 'Our Solution: Socratic method that guides discovery, never gives direct answers',
        'problems.time.title': 'Limited Time for Advanced Practice',
        'problems.time.desc': '"Between school, homework, and activities, there\'s no time for the challenging problems my child actually needs."',
        'problems.time.solution': 'Our Solution: Efficient 15-30 minute sessions that maximize learning impact',
        'problems.peers.title': 'No Peers at Their Math Level',
        'problems.peers.desc': '"My daughter is doing algebra in 6th grade but feels isolated because none of her classmates can relate to her math interests."',
        'problems.peers.solution': 'Our Solution: Connect with a community of advanced math learners nationwide',
        
        // Benefits Section
        'benefits.title': 'Your Child\'s Complete Learning Journey',
        'benefits.subtitle': 'A structured two-phase approach that builds solid foundations before advancing to specialized skills',
        'benefits.journeyTitle': 'Your Child\'s Complete Learning Journey',
        'benefits.journeySubtitle': 'A structured two-phase approach that builds solid foundations before advancing to specialized skills',
        'benefits.phase1.title': 'Phase 1: Comprehensive Foundation',
        'benefits.phase1.desc': 'Master core mathematical concepts through our proven test-practice-test methodology',
        'benefits.phase2.title': 'Phase 2: Specialized Training',
        'benefits.phase2.desc': 'Develop advanced problem-solving strategies and competition-level skills',
        'benefits.comprehensive.title': 'Phase 1: Comprehensive Foundation',
        'benefits.comprehensive.subtitle': 'Complete K-12 Mathematical Mastery',
        'benefits.comprehensive.method': 'Our Proven Method: Test → Practice → Test',
        'benefits.comprehensive.step1': 'Initial Assessment',
        'benefits.comprehensive.step1.detail': 'Identify knowledge gaps',
        'benefits.comprehensive.step2': 'Targeted Practice',
        'benefits.comprehensive.step2.detail': 'AI-guided problem solving',
        'benefits.comprehensive.step3': 'Mastery Validation',
        'benefits.comprehensive.step3.detail': 'Confirm understanding',
        'benefits.comprehensive.modules': 'Four Core Learning Areas',
        'benefits.comprehensive.module1': 'Numbers & Algebra',
        'benefits.comprehensive.module2': 'Geometry',
        'benefits.comprehensive.module3': 'Statistics & Probability',
        'benefits.comprehensive.module4': 'Integrated Thinking',
        'benefits.specialized.title': 'Phase 2: Specialized Training',
        'benefits.specialized.subtitle': 'Advanced Strategies & Competition Preparation',
        'benefits.specialized.module1.title': '1. Quick & Clever Calculations',
        'benefits.specialized.module1.topic1': '1.1 Integer multiplication techniques',
        'benefits.specialized.module1.topic2': '1.2 Decimal operations & mixed calculations',
        'benefits.specialized.module1.topic3': '1.3 Fraction addition, subtraction & mixed operations',
        'benefits.specialized.module1.topic4': '1.4 Fraction multiplication, division & mixed operations',
        'benefits.specialized.module1.topic5': '1.5 Comparing fraction sizes',
        'benefits.specialized.module1.topic6': '1.6 Percentages & mixed operations',
        'benefits.specialized.module2.title': '2. Multiple-Choice Strategies',
        'benefits.specialized.module2.topic1': '2.1 Direct selection method',
        'benefits.specialized.module2.topic2': '2.2 Elimination method',
        'benefits.specialized.module2.topic3': '2.3 Substitution method',
        'benefits.specialized.module2.topic4': '2.4 Assignment method',
        'benefits.specialized.module2.topic5': '2.5 Extremum method',
        'benefits.specialized.module2.topic6': '2.6 Diagram method',
        'benefits.specialized.module3.title': '3. Word Problem Strategies',
        'benefits.specialized.module3.topic1': '3.1 Solving problems using diagram strategies',
        'benefits.specialized.module3.topic2': '3.2 Solving problems using transformation strategies',
        'benefits.specialized.module3.topic3': '3.3 Solving problems using case analysis strategies',
        'benefits.specialized.module3.topic4': '3.4 Enumeration, assumption & working backward strategies',
        'benefits.specialized.module3.topic5': '3.5 Reading comprehension strategies',
        'benefits.specialized.module3.topic6': '3.6 Strategies for understanding discontinuous information',
        'benefits.specialized.module4.title': '4. Olympiad Thinking Training',
        'benefits.specialized.module4.topic1': '4.1 Defining new operations',
        'benefits.specialized.module4.topic2': '4.2 Comprehensive number theory',
        'benefits.specialized.module4.topic3': '4.3 Counting problems',
        'benefits.specialized.module4.topic4': '4.4 Logical reasoning',
        'benefits.specialized.module4.topic5': '4.5 Maximum/minimum value problems',
        'benefits.specialized.module4.topic6': '4.6 Pigeonhole principle',
        'benefits.specialized.module4.topic7': '4.7 Plane geometry problems',
        'benefits.specialized.module4.topic8': '4.8 Statistics and probability',
        'benefits.specialized.module4.topic9': '4.9 Practical applications',
        
        // Learning Outcomes
        'benefits.outcomes.title': 'What Your Child Will Achieve',
        'benefits.outcomes.item1': 'Solid mathematical foundation across all K-12 topics',
        'benefits.outcomes.item2': 'Advanced problem-solving strategies and shortcuts',
        'benefits.outcomes.item3': 'Competition-level mathematical thinking skills',
        'benefits.outcomes.item4': 'Confidence to tackle any mathematical challenge',
        
        // Phase 2 Specialized Training
        'benefits.specialized.method': 'Test → Practice → Test Approach',
        'benefits.specialized.step1': 'Strategy Assessment',
        'benefits.specialized.step1.detail': 'Identify skill gaps',
        'benefits.specialized.step2': 'Intensive Training',
        'benefits.specialized.step2.detail': 'Master advanced techniques',
        'benefits.specialized.step3': 'Competition Readiness',
        'benefits.specialized.step3.detail': 'Validate mastery',
        
        // Specialized Curriculum
        'specialized.curriculum.title': 'Specialized Training Curriculum',
        'specialized.curriculum.subtitle': 'Advanced problem-solving strategies and competition preparation techniques',
        'specialized.curriculum.stats.primary': 'Primary Areas',
        'specialized.curriculum.stats.primaryDesc': 'Specialized skill domains',
        'specialized.curriculum.stats.secondary': 'Training Modules', 
        'specialized.curriculum.stats.secondaryDesc': 'Focused technique training',
        'specialized.curriculum.stats.objectives': 'Skill Objectives',
        'specialized.curriculum.stats.objectivesDesc': 'Competition-level targets',
        
        // Specialized Areas
        'specialized.area1.title': 'Quick & Clever Calculations',
        'specialized.area1.desc': 'Advanced computational techniques and shortcuts',
        'specialized.area2.title': 'Multiple-Choice Strategies',
        'specialized.area2.desc': 'Systematic approaches to test-taking excellence',
        'specialized.area3.title': 'Word Problem Strategies', 
        'specialized.area3.desc': 'Systematic problem-solving methodologies',
        'specialized.area4.title': 'Olympiad Thinking Training',
        'specialized.area4.desc': 'Elite-level mathematical reasoning and competition skills',
        
        // Specialized Modules
        'specialized.module1-1.title': 'Integer Multiplication',
        'specialized.module1-1-1.title': '1.1.1 Mental Math Techniques',
        'specialized.module1-1-1.obj1': 'Two-digit multiplication shortcuts',
        'specialized.module1-1-1.obj2': 'Pattern recognition in products',
        'specialized.module1-1-1.obj3': 'Cross multiplication methods',
        
        'specialized.module1-2.title': 'Decimal Operations',
        'specialized.module1-2-1.title': '1.2.1 Mixed Calculations',
        'specialized.module1-2-1.obj1': 'Decimal multiplication shortcuts',
        'specialized.module1-2-1.obj2': 'Division estimation techniques',
        'specialized.module1-2-1.obj3': 'Converting to simpler forms',
        
        'specialized.module1-3.title': 'Fraction Mastery',
        'specialized.module1-3-1.title': '1.3.1 Advanced Operations',
        'specialized.module1-3-1.obj1': 'Complex fraction calculations',
        'specialized.module1-3-1.obj2': 'Comparison strategies',
        'specialized.module1-3-1.obj3': 'Mixed number conversions',
        
        'specialized.module2-1.title': 'Direct Methods',
        'specialized.module2-1-1.title': '2.1.1 Selection Techniques',
        'specialized.module2-1-1.obj1': 'Pattern recognition in answers',
        'specialized.module2-1-1.obj2': 'Quick calculation methods',
        'specialized.module2-1-1.obj3': 'Elimination strategies',
        
        'specialized.module2-2.title': 'Advanced Techniques',
        'specialized.module2-2-1.title': '2.2.1 Strategic Approaches',
        'specialized.module2-2-1.obj1': 'Substitution and testing',
        'specialized.module2-2-1.obj2': 'Extremum value analysis',
        'specialized.module2-2-1.obj3': 'Graphical interpretation',
        
        'specialized.module3-1.title': 'Visual Strategies',
        'specialized.module3-1-1.title': '3.1.1 Diagram Techniques',
        'specialized.module3-1-1.obj1': 'Creating effective diagrams',
        'specialized.module3-1-1.obj2': 'Visual problem representation', 
        'specialized.module3-1-1.obj3': 'Transformation visualization',
        
        'specialized.module3-2.title': 'Analytical Methods',
        'specialized.module3-2-1.title': '3.2.1 Problem Analysis',
        'specialized.module3-2-1.obj1': 'Case-by-case analysis',
        'specialized.module3-2-1.obj2': 'Working backward techniques',
        'specialized.module3-2-1.obj3': 'Information processing skills',
        
        'specialized.module4-1.title': 'Advanced Number Theory',
        'specialized.module4-1-1.title': '4.1.1 Competition Concepts',
        'specialized.module4-1-1.obj1': 'New operation definitions',
        'specialized.module4-1-1.obj2': 'Modular arithmetic',
        'specialized.module4-1-1.obj3': 'Prime number properties',
        
        'specialized.module4-2.title': 'Advanced Problem Solving',
        'specialized.module4-2-1.title': '4.2.1 Elite Techniques',
        'specialized.module4-2-1.obj1': 'Combinatorics and counting',
        'specialized.module4-2-1.obj2': 'Logical reasoning patterns',
        'specialized.module4-2-1.obj3': 'Optimization strategies',
        
        'specialized.module4-3.title': 'Competition Geometry',
        'specialized.module4-3-1.title': '4.3.1 Advanced Geometry',
        'specialized.module4-3-1.obj1': 'Plane geometry theorems',
        'specialized.module4-3-1.obj2': 'Pigeonhole principle applications',
        'specialized.module4-3-1.obj3': 'Real-world applications',
        
        // Benefit Cards
        'benefits.card1.title': 'For Advanced Students',
        'benefits.card1.desc': 'Specifically designed for academically gifted students who are often under-challenged in traditional school settings.',
        'benefits.card1.badge1': 'K-12 Coverage',
        'benefits.card1.badge2': 'Expert Designed',
        'benefits.card2.title': 'Accelerated Progress',
        'benefits.card2.desc': 'Students advance at their own pace, with detailed analytics helping parents track improvement and identify strengths.',
        'benefits.card2.badge1': 'Personalized',
        'benefits.card2.badge2': 'Data-Driven',
        'benefits.card3.title': 'Proven Results',
        'benefits.card3.desc': '30+ years of mathematical expertise combined with cutting-edge AI technology for unprecedented learning outcomes.',
        'benefits.card3.badge1': '30+ Years',
        'benefits.card3.badge2': 'AI-Powered',
        
        // Curriculum Section
        'curriculum.title': 'Our Comprehensive Curriculum',
        'curriculum.subtitle': 'Expertly designed content spanning all areas of mathematics from elementary to advanced levels',
        'curriculum.stats.primary': 'Primary Modules',
        'curriculum.stats.primaryDesc': 'Core learning areas',
        'curriculum.stats.secondary': 'Secondary Modules',
        'curriculum.stats.secondaryDesc': 'Detailed topic coverage',
        'curriculum.stats.objectives': 'Learning Objectives',
        'curriculum.stats.objectivesDesc': 'Specific skill targets',
        'curriculum.area1.title': 'Numbers and Algebra',
        'curriculum.area1.desc': 'Foundation through advanced algebraic concepts',
        'curriculum.area2.title': 'Geometry',
        'curriculum.area2.desc': 'Spatial reasoning from basic shapes to advanced proofs',
        'curriculum.module1-1.title': 'Number Sense & Operations',
        'curriculum.module1-2.title': 'Algebraic Thinking',
        'curriculum.module1-3.title': 'Advanced Algebra',
        'curriculum.module2-1.title': '2D Shapes & Properties',
        'curriculum.module2-2.title': '3D Geometry',
        'curriculum.module2-3.title': 'Coordinate Geometry',
        'curriculum.area3.title': 'Statistics and Probability',
        'curriculum.area3.desc': 'Data analysis and probabilistic reasoning',
        'curriculum.area4.title': 'Integrated Thinking',
        'curriculum.area4.desc': 'Problem-solving across mathematical domains',
        'curriculum.module3-1.title': 'Data Analysis',
        'curriculum.module3-2.title': 'Probability',
        'curriculum.module4-1.title': 'Mathematical Modeling',
        'curriculum.module4-2.title': 'Competition Mathematics',
        
        // Testimonials Section
        'testimonials.title': 'Voices from Parents',
        'testimonials.subtitle': 'Real feedback from families using DeepMath',
        'testimonials.sarah.quote': '"My daughter went from being bored in math class to asking for extra practice time. The AI tutor explains concepts in ways that click for her."',
        'testimonials.sarah.name': 'Sarah M.',
        'testimonials.sarah.role': 'Parent of 7th grader',
        'testimonials.michael.quote': '"Finally found a platform that challenges my gifted son. He\'s working on algebra in 6th grade and loves the competition-level problems."',
        'testimonials.michael.name': 'Michael T.',
        'testimonials.michael.role': 'Parent of 6th grader',
        'testimonials.jennifer.quote': '"The progress tracking is incredible. I can see exactly where my child excels and what areas need more focus."',
        'testimonials.jennifer.name': 'Jennifer L.',
        'testimonials.jennifer.role': 'Homeschool parent',
        'testimonials.david.quote': '"Best investment we\'ve made in our daughter\'s education. She\'s gained confidence and actually enjoys math now."',
        'testimonials.david.name': 'David R.',
        'testimonials.david.role': 'Parent of 9th grader',
        'testimonials.lisa.quote': '"The AI tutor never gives direct answers but guides my son to discover solutions himself. It\'s like having a personal math coach."',
        'testimonials.lisa.name': 'Lisa K.',
        'testimonials.lisa.role': 'Parent of 8th grader',
        'testimonials.amanda.quote': '"Amazing platform! My twin boys are at different math levels and it adapts perfectly to each of their needs."',
        'testimonials.amanda.name': 'Amanda S.',
        'testimonials.amanda.role': 'Parent of twins',
        'testimonials.stats.rating': 'Average Rating',
        'testimonials.stats.ratingDesc': 'From 2,500+ reviews',
        'testimonials.stats.grades': 'Improved Grades',
        'testimonials.stats.gradesDesc': 'Within 3 months',
        'testimonials.stats.confidence': 'Improved Math Confidence',
        'testimonials.stats.confidenceDesc': 'Parent-reported surveys',
        'testimonials.stats.recommend': 'Would Recommend',
        'testimonials.stats.recommendDesc': 'To other parents',
        
        // Pricing Section
        'pricing.title': 'Stop Paying for Inconsistent Tutoring',
        'pricing.subtitle': 'Get unlimited access to advanced math challenges and AI tutoring for less than the cost of one private lesson',
        'pricing.guarantee': '30-day money-back guarantee • Cancel anytime • No contracts',
        'pricing.familyDiscount': 'Family Discount Available: Get 30% off when you purchase 2+ accounts for any tier (Limited time: First 3 months only)',
        'pricing.bronze.name': 'Bronze',
        'pricing.bronze.desc': 'Complete math mastery platform with adaptive learning approach.',
        'pricing.silver.name': 'Silver',
        'pricing.silver.desc': 'Everything in Bronze plus AI tutor with emotion detection.',
        'pricing.gold.name': 'Gold',
        'pricing.gold.desc': 'Ultimate learning experience with unlimited AI conversations.',
        'pricing.month': '/month',
        'pricing.mostPopular': 'Most Popular',
        
        // Footer Section
        'footer.tagline': 'Where Exceptional Minds Deserve More.',
        'footer.company': 'Company',
        'footer.about': 'About us',
        'footer.feedback': 'Feedback',
        'footer.media': 'Media inquiries',
        'footer.contact': 'Contact us',
        'footer.careers': 'Careers',
        'footer.resources': 'Resources',
        'footer.blog': 'Blog',
        'footer.privacy': 'Privacy policy',
        'footer.terms': 'Terms of service',
        'footer.community': 'Community',
        'footer.events': 'Events',
        'footer.campus': 'Campus',
        'footer.fellows': 'Fellows',
        'footer.copyright': '© 2024 DeepMath. All rights reserved.',
        
        // FAQ Section
        'faq.title': 'Frequently Asked Questions',
        'faq.q1.question': 'Can I change my plan anytime?',
        'faq.q1.answer': 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and you\'ll be charged or credited accordingly.',
        'faq.q2.question': 'What if I\'m not satisfied?',
        'faq.q2.answer': 'We offer a 30-day money-back guarantee on all plans. If you\'re not completely satisfied, we\'ll refund your subscription fee.',
        'faq.q3.question': 'How does the Family Discount work?',
        'faq.q3.answer': 'Get 30% off when you purchase 2 or more accounts on any tier (Bronze, Silver, or Gold). Perfect for families with multiple children or homeschooling groups. This discount applies to the first 3 months only.',
        'faq.q4.question': 'How does the AI tutor work?',
        'faq.q4.answer': 'Our Socratic AI asks guiding questions to help students discover solutions independently. It never gives direct answers but provides personalized guidance. Only Gold plans include emotion detection to track student mental health.',
        'faq.q5.question': 'What are the AI tutor conversation limits?',
        'faq.q5.answer': 'Bronze plans include 4-level static hints but no AI tutor. Silver plans allow up to 5 AI conversations per question. Gold plans have unlimited AI conversations per question.',
        'faq.q6.question': 'What curriculum standards do you follow?',
        'faq.q6.answer': 'Our curriculum aligns with Common Core standards and goes beyond to challenge advanced students with competition-level problems.',
        'faq.q7.question': 'Do you offer school or district licensing?',
        'faq.q7.answer': 'Yes! We have special pricing for schools and districts. Contact our sales team for custom enterprise solutions.',
        
        // Contact Section
        'contact.title': 'Still Have Questions?',
        'contact.subtitle': 'Our team is here to help you choose the perfect plan for your mathematical journey.',
        'contact.scheduleCall': 'Schedule a Call',
        'contact.emailSupport': 'Email Support',
        
        // Pricing Details
        'pricing.startTrial': 'Start Free Trial',
        'pricing.bronze.included': 'What\'s Included:',
        'pricing.bronze.freeTrial': '14-day free trial',
        'pricing.bronze.problems': 'Full access to 10,000+ problems',
        'pricing.bronze.adaptive': 'Adaptive test-practice-test approach',
        'pricing.bronze.hints': 'Four level hints for every question',
        'pricing.bronze.sessions': 'Unlimited practice sessions',
        'pricing.bronze.tracking': 'Detailed progress tracking',
        'pricing.bronze.noAI': '24/7 AI tutor',
        'pricing.bronze.noEmotion': 'Emotion detection & mental health tracking',
        'pricing.bronze.trial': '14-day free trial, then $12.99/month',
        'pricing.bronze.family': 'Family (2+ users): $9.09/month each',
        'pricing.silver.included': 'Everything in Bronze, plus:',
        'pricing.silver.freeTrial': '14-day free trial',
        'pricing.silver.aiTutor': '24/7 Socratic AI tutor',
        'pricing.silver.conversations': 'Up to 5 conversations per question',
        'pricing.silver.support': 'Priority support',
        'pricing.silver.noEmotion': 'Emotion detection & mental health tracking',
        'pricing.silver.noReports': 'Parent mental health reports',
        'pricing.silver.trial': '14-day free trial, then $19.99/month',
        'pricing.silver.family': 'Family (2+ users): $13.99/month each',
        'pricing.gold.included': 'Everything in Silver, plus:',
        'pricing.gold.freeTrial': '14-day free trial',
        'pricing.gold.unlimited': 'Unlimited AI tutor conversations',
        'pricing.gold.emotion': 'Emotion detection & mental health tracking',
        'pricing.gold.reports': 'Parent mental health reports',
        'pricing.gold.analytics': 'Advanced learning analytics',
        'pricing.gold.roadmaps': 'Personalized study roadmaps',
        'pricing.gold.competition': 'Competition prep materials',
        'pricing.gold.consultation': '1-on-1 consultation calls',
        'pricing.gold.trial': '14-day free trial, then $29.99/month',
        'pricing.gold.family': 'Family (2+ users): $20.99/month each',
        
        // Curriculum Sub-modules
        'curriculum.module1-1-1.title': '1.1.1 Whole Numbers',
        'curriculum.module1-1-1.obj1': 'Place value understanding',
        'curriculum.module1-1-1.obj2': 'Number comparison and ordering',
        'curriculum.module1-1-1.obj3': 'Rounding and estimation',
        'curriculum.module1-1-2.title': '1.1.2 Fractions',
        'curriculum.module1-1-2.obj1': 'Fraction concepts and representations',
        'curriculum.module1-1-2.obj2': 'Equivalent fractions',
        'curriculum.module1-1-2.obj3': 'Operations with fractions',
        'curriculum.module1-1-2.obj4': 'Mixed numbers and improper fractions',
        'curriculum.module1-1-3.title': '1.1.3 Decimals',
        'curriculum.module1-1-3.obj1': 'Decimal place value',
        'curriculum.module1-1-3.obj2': 'Converting between fractions and decimals',
        'curriculum.module1-1-3.obj3': 'Operations with decimals',
        'curriculum.module1-1-3.obj4': 'Rounding decimals',
        'curriculum.module1-2-1.title': '1.2.1 Patterns & Relationships',
        'curriculum.module1-2-1.obj1': 'Number patterns and sequences',
        'curriculum.module1-2-1.obj2': 'Growing patterns',
        'curriculum.module1-2-1.obj3': 'Function tables',
        'curriculum.module1-2-2.title': '1.2.2 Expressions & Equations',
        'curriculum.module1-2-2.obj1': 'Writing algebraic expressions',
        'curriculum.module1-2-2.obj2': 'Evaluating expressions',
        'curriculum.module1-2-2.obj3': 'Solving simple equations',
        'curriculum.module1-2-2.obj4': 'Inequalities',
        'curriculum.module1-3-1.title': '1.3.1 Linear Functions',
        'curriculum.module1-3-1.obj1': 'Slope and y-intercept',
        'curriculum.module1-3-1.obj2': 'Graphing linear equations',
        'curriculum.module1-3-1.obj3': 'Systems of linear equations',
        'curriculum.module1-3-2.title': '1.3.2 Quadratic Functions',
        'curriculum.module1-3-2.obj1': 'Parabolas and vertex form',
        'curriculum.module1-3-2.obj2': 'Factoring quadratics',
        'curriculum.module1-3-2.obj3': 'Quadratic formula',
        'curriculum.module2-1-1.title': '2.1.1 Basic Shapes',
        'curriculum.module2-1-1.obj1': 'Identifying and classifying shapes',
        'curriculum.module2-1-1.obj2': 'Properties of polygons',
        'curriculum.module2-1-1.obj3': 'Angles and angle relationships',
        'curriculum.module2-1-2.title': '2.1.2 Area & Perimeter',
        'curriculum.module2-1-2.obj1': 'Calculating area of various shapes',
        'curriculum.module2-1-2.obj2': 'Perimeter and circumference',
        'curriculum.module2-1-2.obj3': 'Composite figures',
        'curriculum.module2-2-1.title': '2.2.1 Solid Figures',
        'curriculum.module2-2-1.obj1': 'Identifying 3D shapes',
        'curriculum.module2-2-1.obj2': 'Surface area calculations',
        'curriculum.module2-2-1.obj3': 'Volume formulas',
        'curriculum.module2-3-1.title': '2.3.1 Coordinate Plane',
        'curriculum.module2-3-1.obj1': 'Plotting points',
        'curriculum.module2-3-1.obj2': 'Distance formula',
        'curriculum.module2-3-1.obj3': 'Midpoint formula',
        'curriculum.module3-1-1.title': '3.1.1 Data Collection',
        'curriculum.module3-1-1.obj1': 'Survey methods',
        'curriculum.module3-1-1.obj2': 'Data organization',
        'curriculum.module3-1-1.obj3': 'Tables and charts',
        'curriculum.module3-1-2.title': '3.1.2 Statistical Measures',
        'curriculum.module3-1-2.obj1': 'Mean, median, mode',
        'curriculum.module3-1-2.obj2': 'Range and quartiles',
        'curriculum.module3-1-2.obj3': 'Standard deviation',
        'curriculum.module3-2-1.title': '3.2.1 Basic Probability',
        'curriculum.module3-2-1.obj1': 'Theoretical vs experimental',
        'curriculum.module3-2-1.obj2': 'Compound events',
        'curriculum.module3-2-1.obj3': 'Conditional probability',
        'curriculum.module4-1-1.title': '4.1.1 Real-World Applications',
        'curriculum.module4-1-1.obj1': 'Mathematical modeling',
        'curriculum.module4-1-1.obj2': 'Optimization problems',
        'curriculum.module4-1-1.obj3': 'Cross-curricular connections',
        'curriculum.module4-2-1.title': '4.2.1 Advanced Problem Solving',
        'curriculum.module4-2-1.obj1': 'Contest preparation',
        'curriculum.module4-2-1.obj2': 'Proof techniques',
        'curriculum.module4-2-1.obj3': 'Creative problem solving',
        
        // About Page
        'about.team.title': 'Meet Our Team',
        'about.team.subtitle': 'Passionate educators and technologists dedicated to advancing mathematical education',
        'about.team.yanan.name': 'Yanan Zhu',
        'about.team.yanan.title': 'Founder & Business Lead',
        'about.team.yanan.bio': 'M.S. and B.S. from Tsinghua University. Former Vice President of Microsoft Greater China, Managing Director of Accenture Greater China (Fortune 500\'s only consulting company), and Partner at IBM Global Consulting. Expert in enterprise digital transformation, successfully guided multiple renowned companies to IPO.',
        'about.team.meilu.name': 'Meilu Zeng',
        'about.team.meilu.title': 'Curriculum & Education Specialist',
        'about.team.meilu.bio': 'Former Mathematics Research Specialist in Jinan City, China, with nearly 30 years of experience in high school entrance examination development. Special-grade Teacher of Shandong Province. Council member of Mathematics Research Association, China Education Society Mathematics Education Research Center. Key member of Ministry of Education\'s research teams on examination evaluation and teaching quality monitoring.',
        'about.team.yixin.name': 'Yixin Li',
        'about.team.yixin.title': 'Product & Technology Lead',
        'about.team.yixin.bio': 'M.S. and B.S. from NC State University. Solution Product Manager in Lenovo Global Future Leaders Program. Innovator in applying large language models and reinforcement learning to enhance educational experiences. Successfully led the development of AI-powered educational platforms that bridge theoretical research with practical applications.',
        'about.team.noboru.name': 'Dr. Noboru Matsuda',
        'about.team.noboru.title': 'AI Research Advisor',
        'about.team.noboru.bio': 'Associate Professor of Computer Science and Director of the Innovative Educational Computing Laboratory at NC State University. Ph.D. in Intelligent Systems from University of Pittsburgh. Specializes in AI technology innovation for education, focusing on machine learning and computational approaches to understand and improve learning processes. Member of the Digital Transformation of Education cluster at NCSU Chancellor\'s Faculty Excellence Program.'
    },
    zh: {
        // Navigation
        'nav.home': '首页',
        'nav.problems': '例题',
        'nav.solution': '解决方案',
        'nav.pricing': '价格',
        'nav.reviews': '评价',
        'nav.login': '登录',
        'nav.signup': '开始免费试用',
        
        // Hero Section
        'hero.title': '让优秀的孩子，不止于优秀。',
        'hero.subtitle': '依托全球顶尖数学教育体系，DeepMath 精准挖掘孩子的潜力，用系统性的训练和智能化辅导，打造真正领先的数学能力。',
        'hero.videoTitle': '看看它是如何工作的',
        'hero.videoDesc': '观看真实学生在我们的AI导师指导下解决挑战性问题',
        'hero.startTrial': '开始免费试用',
        'hero.seeAllPlans': '查看所有计划',
        
        // Problems Section
        'problems.title': '探索示例问题',
        'problems.subtitle': '尝试我们具有挑战性的问题，享受AI逐步引导',
        
        // Why Choose Section
        'whyChoose.title': '为什么选择DeepMath？',
        'whyChoose.subtitle': '基于经验验证的基础，融合前沿创新技术',
        'whyChoose.foundation.title': '30+年经验证的卓越',
        'whyChoose.foundation.description': '基于中国30多年基础数学教育体系构建，经过验证能够培养出世界上最强的数学人才，在国际评估中持续取得顶尖成绩的学生。',
        'whyChoose.olympic.title': '奥林匹克级别的挑战',
        'whyChoose.olympic.description': '我们的课程包含竞赛级别的问题，旨在挑战和激发高级学习者，为学生参加数学奥林匹克竞赛做准备，培养深度分析思维。',
        'whyChoose.ai.title': '前沿AI教育技术',
        'whyChoose.ai.description': '采用教育领域前沿AI技术驱动，特色苏格拉底式提问方法，引导学生独立发现解决方案，同时提供个性化学习体验。',
        'whyChoose.trust.years': '年教育卓越经验',
        'whyChoose.trust.success': '学生成功率',
        'whyChoose.trust.students': '全球学生',

        // Contact Page
        'contact.hero.title': '联系我们',
        'contact.hero.subtitle': '我们在这里为您提供帮助！请发送消息，我们将尽快回复您。',
        'contact.getInTouch.title': '联系方式',
        'contact.getInTouch.email': '请通过邮箱 support@deepmath.com 联系我们或使用下方表单',
        'contact.getInTouch.response': '我们通常在24小时内回复',
        'contact.form.firstName': '名',
        'contact.form.lastName': '姓',
        'contact.form.email': '邮箱地址',
        'contact.form.subject': '主题',
        'contact.form.subjectPlaceholder': '我们可以为您提供什么帮助？',
        'contact.form.message': '消息内容',
        'contact.form.messagePlaceholder': '请描述您的问题或疑问...',
        'contact.form.submit': '发送消息',
        'contact.form.success': '感谢您联系我们！我们将在24小时内回复。',
        'contact.form.error': '请更正上述错误后重试。',

        // Careers Page
        'careers.hero.title': '加入我们的使命',
        'careers.hero.subtitle': '帮助我们革新数学教育，培养下一代问题解决者',
        'careers.culture.title': '为什么在DeepMath工作？',
        'careers.culture.innovation.title': '创新为先',
        'careers.culture.innovation.description': '与前沿AI技术合作，塑造教育的未来',
        'careers.culture.impact.title': '有意义的影响',
        'careers.culture.impact.description': '直接影响全球数千名学生的学习之旅',
        'careers.culture.team.title': '协作团队',
        'careers.culture.team.description': '与充满激情的教育者、工程师和研究人员共事',
        'careers.join.title': '加入我们的团队',
        'careers.join.subtitle': '我们一直在寻找与我们对教育和创新怀有同样热情的人才',
        'careers.areas.engineering.title': '工程技术',
        'careers.areas.engineering.description': '构建前沿的AI驱动教育技术，改变学生学习数学的方式。',
        'careers.areas.education.title': '教育',
        'careers.areas.education.description': '设计创新课程和基于研究的学习体验，挑战和激发学生。',
        'careers.areas.business.title': '商务',
        'careers.areas.business.description': '推动增长，帮助将先进的数学教育带给全世界的学生和家庭。',
        'careers.process.title': '如何申请',
        'careers.process.step1.title': '发送简历',
        'careers.process.step1.description': '请通过邮件发送您的简历和求职信，解释您对数学教育的热情。',
        'careers.process.step2.title': '初步交流',
        'careers.process.step2.description': '我们将安排电话沟通，更多了解您的背景并讨论潜在机会。',
        'careers.process.step3.title': '加入团队',
        'careers.process.step3.description': '如果双方都认为合适，我们将合作为您找到最适合您技能和兴趣的职位。',
        'careers.cta.title': '准备好产生影响了吗？',
        'careers.cta.description': '加入我们，共同革新数学教育，帮助优秀学生发挥全部潜力。',
        'careers.cta.button': '发送您的简历',
        'careers.cta.email': '邮箱：careers@deepmath.com',
        'careers.benefits.title': '福利待遇',
        'careers.benefits.health.title': '健康福利',
        'careers.benefits.health.description': '全面的医疗、牙科和视力保险',
        'careers.benefits.remote.title': '远程友好',
        'careers.benefits.remote.description': '灵活的工作安排和远程工作选择',
        'careers.benefits.learning.title': '学习预算',
        'careers.benefits.learning.description': '每年2000美元的专业发展津贴',
        'careers.benefits.timeoff.title': '休假时间',
        'careers.benefits.timeoff.description': '无限PTO和sabbatical机会',
        'careers.benefits.equity.title': '股权',
        'careers.benefits.equity.description': '所有全职员工的股票期权',
        'careers.benefits.office.title': '办公室福利',
        'careers.benefits.office.description': '餐饮服务、零食和优质咖啡',
        'problems.tab1': '数字与代数',
        'problems.tab2': '几何',
        'problems.tab3': '统计与概率',
        'problems.tab4': '综合思维',
        'problems.bored.title': '您的孩子感到无聊和不参与',
        'problems.bored.desc': '"我的7年级学生10分钟就完成数学作业，说太简单了。她完全失去了对数学的兴趣。"',
        'problems.bored.solution': '我们的解决方案：10,000+个根据您孩子能力水平调整的挑战性问题',
        'problems.help.title': '没有人能帮助解决高级问题',
        'problems.help.desc': '"当我的孩子在竞赛级问题上遇到困难时，我和他们的老师都无法有效指导。"',
        'problems.help.solution': '我们的解决方案：24/7 AI导师，训练有素的高级数学推理',
        'problems.expensive.title': '私人辅导昂贵且不一致',
        'problems.expensive.desc': '"我们每小时支付80美元给经常取消的导师。仅4次课程就花费我们每月320美元。"',
        'problems.expensive.solution': '我们的解决方案：每月29美元起，无限制访问',
        'problems.thinking.title': '您的孩子没有学会思考',
        'problems.thinking.desc': '"我的孩子能解决问题，但不理解推理。他们只是记忆步骤。"',
        'problems.thinking.solution': '我们的解决方案：苏格拉底式方法指导发现，从不直接给出答案',
        'problems.time.title': '高级练习时间有限',
        'problems.time.desc': '"在学校、作业和活动之间，没有时间做我孩子真正需要的挑战性问题。"',
        'problems.time.solution': '我们的解决方案：高效的15-30分钟课程，最大化学习效果',
        'problems.peers.title': '没有同等数学水平的同伴',
        'problems.peers.desc': '"我女儿在6年级就在学代数，但感到孤立，因为她的同学都无法理解她的数学兴趣。"',
        'problems.peers.solution': '我们的解决方案：与全国高级数学学习者社区建立联系',
        
        // Benefits Section
        'benefits.title': '您孩子的全方位学习之旅',
        'benefits.subtitle': '循序渐进的两阶段学习路径，先夯实基础，再深入提升专业技能。',
        'benefits.journeyTitle': '您孩子的完整学习之旅',
        'benefits.journeySubtitle': '结构化的两阶段方法，先建立扎实基础，再进入专项技能提升',
        'benefits.phase1.title': '第一阶段：综合基础',
        'benefits.phase1.desc': '通过我们经过验证的测试-练习-测试方法掌握核心数学概念',
        'benefits.phase2.title': '第二阶段：专项提升',
        'benefits.phase2.desc': '培养高级解题策略和竞赛级别技能',
        'benefits.comprehensive.title': '第一阶段：综合基础',
        'benefits.comprehensive.subtitle': '完整的K-12数学精通',
        'benefits.comprehensive.method': '我们经验证的方法：测试 → 练习 → 测试',
        'benefits.comprehensive.step1': '初始评估',
        'benefits.comprehensive.step1.detail': '识别知识薄弱环节',
        'benefits.comprehensive.step2': '针对性练习',
        'benefits.comprehensive.step2.detail': 'AI引导的问题解决',
        'benefits.comprehensive.step3': '掌握验证',
        'benefits.comprehensive.step3.detail': '确认理解程度',
        'benefits.comprehensive.modules': '四大核心学习领域',
        'benefits.comprehensive.module1': '数字与代数',
        'benefits.comprehensive.module2': '几何',
        'benefits.comprehensive.module3': '统计与概率',
        'benefits.comprehensive.module4': '综合思维',
        
        'benefits.specialized.title': '第二阶段：专项提升',
        'benefits.specialized.subtitle': '高级策略与竞赛准备',
        'benefits.specialized.module1.title': '1. 速算巧算',
        'benefits.specialized.module1.topic1': '1.1 整数乘法技巧',
        'benefits.specialized.module1.topic2': '1.2 小数运算与混合计算',
        'benefits.specialized.module1.topic3': '1.3 分数加减与混合运算',
        'benefits.specialized.module1.topic4': '1.4 分数乘除与混合运算',
        'benefits.specialized.module1.topic5': '1.5 分数大小比较',
        'benefits.specialized.module1.topic6': '1.6 百分数与混合运算',
        'benefits.specialized.module2.title': '2. 选择题技巧',
        'benefits.specialized.module2.topic1': '2.1 直接选择法',
        'benefits.specialized.module2.topic2': '2.2 排除法',
        'benefits.specialized.module2.topic3': '2.3 代入法',
        'benefits.specialized.module2.topic4': '2.4 赋值法',
        'benefits.specialized.module2.topic5': '2.5 极值法',
        'benefits.specialized.module2.topic6': '2.6 图解法',
        'benefits.specialized.module3.title': '3. 应用题策略',
        'benefits.specialized.module3.topic1': '3.1 图示策略解题',
        'benefits.specialized.module3.topic2': '3.2 转化策略解题',
        'benefits.specialized.module3.topic3': '3.3 分类讨论策略解题',
        'benefits.specialized.module3.topic4': '3.4 枚举、假设与逆向推理策略',
        'benefits.specialized.module3.topic5': '3.5 阅读理解策略',
        'benefits.specialized.module3.topic6': '3.6 不连续信息理解策略',
        'benefits.specialized.module4.title': '4. 奥数思维训练',
        'benefits.specialized.module4.topic1': '4.1 新定义运算',
        'benefits.specialized.module4.topic2': '4.2 数论综合',
        'benefits.specialized.module4.topic3': '4.3 计数问题',
        'benefits.specialized.module4.topic4': '4.4 逻辑推理',
        'benefits.specialized.module4.topic5': '4.5 最值问题',
        'benefits.specialized.module4.topic6': '4.6 抽屉原理',
        'benefits.specialized.module4.topic7': '4.7 平面几何问题',
        'benefits.specialized.module4.topic8': '4.8 统计与概率',
        'benefits.specialized.module4.topic9': '4.9 实际应用',
        
        // Learning Outcomes
        'benefits.outcomes.title': '您的孩子将获得什么',
        'benefits.outcomes.item1': '覆盖所有K-12主题的扎实数学基础',
        'benefits.outcomes.item2': '高级解题策略和快速计算技巧',
        'benefits.outcomes.item3': '竞赛级别的数学思维能力',
        'benefits.outcomes.item4': '面对任何数学挑战的信心',
        
        // 第二阶段专项训练
        'benefits.specialized.method': '测试 → 练习 → 测试方法',
        'benefits.specialized.step1': '策略评估',
        'benefits.specialized.step1.detail': '识别技能差距',
        'benefits.specialized.step2': '强化训练',
        'benefits.specialized.step2.detail': '掌握高级技巧',
        'benefits.specialized.step3': '竞赛准备',
        'benefits.specialized.step3.detail': '验证掌握程度',
        
        // 专项训练课程
        'specialized.curriculum.title': '专项训练课程',
        'specialized.curriculum.subtitle': '高级解题策略和竞赛准备技巧',
        'specialized.curriculum.stats.primary': '主要领域',
        'specialized.curriculum.stats.primaryDesc': '专业技能领域',
        'specialized.curriculum.stats.secondary': '训练模块', 
        'specialized.curriculum.stats.secondaryDesc': '专注技巧训练',
        'specialized.curriculum.stats.objectives': '技能目标',
        'specialized.curriculum.stats.objectivesDesc': '竞赛级别目标',
        
        // 专项领域
        'specialized.area1.title': '快速巧算',
        'specialized.area1.desc': '高级计算技巧和快速方法',
        'specialized.area2.title': '选择题策略',
        'specialized.area2.desc': '系统化的应试技巧',
        'specialized.area3.title': '应用题策略', 
        'specialized.area3.desc': '系统化的问题解决方法',
        'specialized.area4.title': '奥数思维训练',
        'specialized.area4.desc': '精英级数学推理和竞赛技能',
        
        // 专项模块
        'specialized.module1-1.title': '整数乘法',
        'specialized.module1-1-1.title': '1.1.1 心算技巧',
        'specialized.module1-1-1.obj1': '两位数乘法快速方法',
        'specialized.module1-1-1.obj2': '乘积中的规律识别',
        'specialized.module1-1-1.obj3': '交叉乘法方法',
        
        'specialized.module1-2.title': '小数运算',
        'specialized.module1-2-1.title': '1.2.1 混合计算',
        'specialized.module1-2-1.obj1': '小数乘法快速方法',
        'specialized.module1-2-1.obj2': '除法估算技巧',
        'specialized.module1-2-1.obj3': '转换为简单形式',
        
        'specialized.module1-3.title': '分数精通',
        'specialized.module1-3-1.title': '1.3.1 高级运算',
        'specialized.module1-3-1.obj1': '复杂分数计算',
        'specialized.module1-3-1.obj2': '比较策略',
        'specialized.module1-3-1.obj3': '带分数转换',
        
        'specialized.module2-1.title': '直接方法',
        'specialized.module2-1-1.title': '2.1.1 选择技巧',
        'specialized.module2-1-1.obj1': '答案中的规律识别',
        'specialized.module2-1-1.obj2': '快速计算方法',
        'specialized.module2-1-1.obj3': '排除策略',
        
        'specialized.module2-2.title': '高级技巧',
        'specialized.module2-2-1.title': '2.2.1 策略方法',
        'specialized.module2-2-1.obj1': '代入和测试',
        'specialized.module2-2-1.obj2': '极值分析',
        'specialized.module2-2-1.obj3': '图形解释',
        
        'specialized.module3-1.title': '视觉策略',
        'specialized.module3-1-1.title': '3.1.1 图解技巧',
        'specialized.module3-1-1.obj1': '创建有效图表',
        'specialized.module3-1-1.obj2': '视觉问题表示', 
        'specialized.module3-1-1.obj3': '变换可视化',
        
        'specialized.module3-2.title': '分析方法',
        'specialized.module3-2-1.title': '3.2.1 问题分析',
        'specialized.module3-2-1.obj1': '分情况分析',
        'specialized.module3-2-1.obj2': '逆向思维技巧',
        'specialized.module3-2-1.obj3': '信息处理技能',
        
        'specialized.module4-1.title': '高级数论',
        'specialized.module4-1-1.title': '4.1.1 竞赛概念',
        'specialized.module4-1-1.obj1': '新运算定义',
        'specialized.module4-1-1.obj2': '模运算',
        'specialized.module4-1-1.obj3': '质数性质',
        
        'specialized.module4-2.title': '高级解题',
        'specialized.module4-2-1.title': '4.2.1 精英技巧',
        'specialized.module4-2-1.obj1': '组合计数',
        'specialized.module4-2-1.obj2': '逻辑推理模式',
        'specialized.module4-2-1.obj3': '优化策略',
        
        'specialized.module4-3.title': '竞赛几何',
        'specialized.module4-3-1.title': '4.3.1 高级几何',
        'specialized.module4-3-1.obj1': '平面几何定理',
        'specialized.module4-3-1.obj2': '抽屉原理应用',
        'specialized.module4-3-1.obj3': '实际应用',
        
        // Benefit Cards
        'benefits.card1.title': '专为高级学生设计',
        'benefits.card1.desc': '专为在传统学校环境中经常面临挑战不足的学术天才学生而设计。',
        'benefits.card1.badge1': 'K-12全覆盖',
        'benefits.card1.badge2': '专家设计',
        'benefits.card2.title': '加速进步',
        'benefits.card2.desc': '学生按自己的节奏前进，详细的分析帮助家长跟踪改进并识别优势。',
        'benefits.card2.badge1': '个性化',
        'benefits.card2.badge2': '数据驱动',
        'benefits.card3.title': '经验证的结果',
        'benefits.card3.desc': '30多年的数学专业知识与尖端AI技术相结合，带来前所未有的学习成果。',
        'benefits.card3.badge1': '30+年',
        'benefits.card3.badge2': 'AI驱动',
        
        // Curriculum Section
        'curriculum.title': '我们的综合课程',
        'curriculum.subtitle': '专业设计的内容涵盖从小学到高级水平的所有数学领域',
        'curriculum.stats.primary': '主要模块',
        'curriculum.stats.primaryDesc': '核心学习领域',
        'curriculum.stats.secondary': '次要模块',
        'curriculum.stats.secondaryDesc': '详细主题覆盖',
        'curriculum.stats.objectives': '学习目标',
        'curriculum.stats.objectivesDesc': '具体技能目标',
        'curriculum.area1.title': '数字与代数',
        'curriculum.area1.desc': '从基础到高级代数概念',
        'curriculum.area2.title': '几何',
        'curriculum.area2.desc': '从基本图形到高级证明的空间推理',
        'curriculum.module1-1.title': '数感与运算',
        'curriculum.module1-2.title': '代数思维',
        'curriculum.module1-3.title': '高级代数',
        'curriculum.module2-1.title': '二维图形与性质',
        'curriculum.module2-2.title': '三维几何',
        'curriculum.module2-3.title': '坐标几何',
        'curriculum.area3.title': '统计与概率',
        'curriculum.area3.desc': '数据分析和概率推理',
        'curriculum.area4.title': '综合思维',
        'curriculum.area4.desc': '跨数学领域的问题解决',
        'curriculum.module3-1.title': '数据分析',
        'curriculum.module3-2.title': '概率',
        'curriculum.module4-1.title': '数学建模',
        'curriculum.module4-2.title': '竞赛数学',
        
        // Testimonials Section
        'testimonials.title': '家长的声音',
        'testimonials.subtitle': '使用深度数学的家庭的真实反馈',
        'testimonials.sarah.quote': '"我女儿从在数学课上感到无聊变成了要求额外的练习时间。AI导师以她能理解的方式解释概念。"',
        'testimonials.sarah.name': 'Sarah M.',
        'testimonials.sarah.role': '7年级学生家长',
        'testimonials.michael.quote': '"终于找到了一个能挑战我天才儿子的平台。他在6年级就在学代数，喜欢竞赛级别的问题。"',
        'testimonials.michael.name': 'Michael T.',
        'testimonials.michael.role': '6年级学生家长',
        'testimonials.jennifer.quote': '"进度跟踪令人难以置信。我可以确切地看到我的孩子在哪里表现出色，哪些领域需要更多关注。"',
        'testimonials.jennifer.name': 'Jennifer L.',
        'testimonials.jennifer.role': '家庭教育家长',
        'testimonials.david.quote': '"我们在女儿教育上做出的最好投资。她获得了信心，现在真的喜欢数学。"',
        'testimonials.david.name': 'David R.',
        'testimonials.david.role': '9年级学生家长',
        'testimonials.lisa.quote': '"AI导师从不直接给出答案，而是引导我儿子自己发现解决方案。就像有一个私人数学教练。"',
        'testimonials.lisa.name': 'Lisa K.',
        'testimonials.lisa.role': '8年级学生家长',
        'testimonials.amanda.quote': '"令人惊叹的平台！我的双胞胎男孩数学水平不同，它完美地适应了他们每个人的需求。"',
        'testimonials.amanda.name': 'Amanda S.',
        'testimonials.amanda.role': '双胞胎家长',
        'testimonials.stats.rating': '平均评分',
        'testimonials.stats.ratingDesc': '来自2,500+评价',
        'testimonials.stats.grades': '成绩提高',
        'testimonials.stats.gradesDesc': '3个月内',
        'testimonials.stats.confidence': '数学信心提高',
        'testimonials.stats.confidenceDesc': '家长报告调查',
        'testimonials.stats.recommend': '会推荐',
        'testimonials.stats.recommendDesc': '给其他家长',
        
        // Pricing Section
        'pricing.title': '停止为不一致的辅导付费',
        'pricing.subtitle': '以低于一次私人课程的费用获得高级数学挑战和AI辅导的无限制访问',
        'pricing.guarantee': '30天退款保证 • 随时取消 • 无合同',
        'pricing.familyDiscount': '家庭折扣可用：购买任何层级的2+账户可享受30%折扣（限时优惠：仅前3个月）',
        'pricing.bronze.name': '青铜',
        'pricing.bronze.desc': '完整的数学掌握平台，采用自适应学习方法。',
        'pricing.silver.name': '白银',
        'pricing.silver.desc': '青铜版的所有功能加上带情感检测的AI导师。',
        'pricing.gold.name': '黄金',
        'pricing.gold.desc': '终极学习体验，提供无限制的AI对话。',
        'pricing.month': '/月',
        'pricing.mostPopular': '最受欢迎',
        
        // Footer Section
        'footer.tagline': '让优秀的孩子，不止于优秀。',
        'footer.company': '公司',
        'footer.about': '关于我们',
        'footer.feedback': '反馈',
        'footer.media': '媒体咨询',
        'footer.contact': '联系我们',
        'footer.careers': '职业',
        'footer.resources': '资源',
        'footer.blog': '博客',
        'footer.privacy': '隐私政策',
        'footer.terms': '服务条款',
        'footer.community': '社区',
        'footer.events': '活动',
        'footer.campus': '校园',
        'footer.fellows': '学者',
        'footer.copyright': '© 2024 深度数学。保留所有权利。',
        
        // FAQ Section
        'faq.title': '常见问题',
        'faq.q1.question': '我可以随时更改计划吗？',
        'faq.q1.answer': '是的！您可以随时升级或降级您的计划。更改立即生效，我们会相应地收费或退款。',
        'faq.q2.question': '如果我不满意怎么办？',
        'faq.q2.answer': '我们为所有计划提供30天退款保证。如果您不完全满意，我们将退还您的订阅费。',
        'faq.q3.question': '家庭折扣如何运作？',
        'faq.q3.answer': '购买任何层级（青铜、白银或黄金）的2个或更多账户可享受30%折扣。非常适合有多个孩子的家庭或家庭教育群体。此折扣仅适用于前3个月。',
        'faq.q4.question': 'AI导师如何工作？',
        'faq.q4.answer': '我们的苏格拉底式AI通过引导性问题帮助学生独立发现解决方案。它从不直接给出答案，而是提供个性化指导。只有黄金计划包含情感检测来跟踪学生心理健康。',
        'faq.q5.question': 'AI导师对话限制是什么？',
        'faq.q5.answer': '青铜计划包括4级静态提示但没有AI导师。白银计划允许每个问题最多5次AI对话。黄金计划每个问题有无限制的AI对话。',
        'faq.q6.question': '你们遵循什么课程标准？',
        'faq.q6.answer': '我们的课程符合共同核心标准，并超越这些标准，为高级学生提供竞赛级别的问题挑战。',
        'faq.q7.question': '你们提供学校或学区许可吗？',
        'faq.q7.answer': '是的！我们为学校和学区提供特殊定价。请联系我们的销售团队获取定制企业解决方案。',
        
        // Contact Section
        'contact.title': '还有问题吗？',
        'contact.subtitle': '我们的团队在这里帮助您为您的数学之旅选择完美的计划。',
        'contact.scheduleCall': '安排通话',
        'contact.emailSupport': '邮件支持',
        
        // Pricing Details
        'pricing.startTrial': '开始免费试用',
        'pricing.bronze.included': '包含内容：',
        'pricing.bronze.freeTrial': '14天免费试用',
        'pricing.bronze.problems': '完整访问10,000+题目',
        'pricing.bronze.adaptive': '自适应测试-练习-测试方法',
        'pricing.bronze.hints': '每题四级提示',
        'pricing.bronze.sessions': '无限练习会话',
        'pricing.bronze.tracking': '详细进度跟踪',
        'pricing.bronze.noAI': '24/7 AI导师',
        'pricing.bronze.noEmotion': '情感检测和心理健康跟踪',
        'pricing.bronze.trial': '14天免费试用，然后$12.99/月',
        'pricing.bronze.family': '家庭套餐（2+用户）：每人$9.09/月',
        'pricing.silver.included': '青铜版所有功能，另加：',
        'pricing.silver.freeTrial': '14天免费试用',
        'pricing.silver.aiTutor': '24/7苏格拉底式AI导师',
        'pricing.silver.conversations': '每题最多5次对话',
        'pricing.silver.support': '优先支持',
        'pricing.silver.noEmotion': '情感检测和心理健康跟踪',
        'pricing.silver.noReports': '家长心理健康报告',
        'pricing.silver.trial': '14天免费试用，然后$19.99/月',
        'pricing.silver.family': '家庭套餐（2+用户）：每人$13.99/月',
        'pricing.gold.included': '白银版所有功能，另加：',
        'pricing.gold.freeTrial': '14天免费试用',
        'pricing.gold.unlimited': '无限制AI导师对话',
        'pricing.gold.emotion': '情感检测和心理健康跟踪',
        'pricing.gold.reports': '家长心理健康报告',
        'pricing.gold.analytics': '高级学习分析',
        'pricing.gold.roadmaps': '个性化学习路线图',
        'pricing.gold.competition': '竞赛准备材料',
        'pricing.gold.consultation': '一对一咨询通话',
        'pricing.gold.trial': '14天免费试用，然后$29.99/月',
        'pricing.gold.family': '家庭套餐（2+用户）：每人$20.99/月',
        
        // Curriculum Sub-modules
        'curriculum.module1-1-1.title': '1.1.1 整数',
        'curriculum.module1-1-1.obj1': '位值理解',
        'curriculum.module1-1-1.obj2': '数字比较和排序',
        'curriculum.module1-1-1.obj3': '四舍五入和估算',
        'curriculum.module1-1-2.title': '1.1.2 分数',
        'curriculum.module1-1-2.obj1': '分数概念和表示',
        'curriculum.module1-1-2.obj2': '等价分数',
        'curriculum.module1-1-2.obj3': '分数运算',
        'curriculum.module1-1-2.obj4': '带分数和假分数',
        'curriculum.module1-1-3.title': '1.1.3 小数',
        'curriculum.module1-1-3.obj1': '小数位值',
        'curriculum.module1-1-3.obj2': '分数与小数转换',
        'curriculum.module1-1-3.obj3': '小数运算',
        'curriculum.module1-1-3.obj4': '小数四舍五入',
        'curriculum.module1-2-1.title': '1.2.1 模式与关系',
        'curriculum.module1-2-1.obj1': '数字模式和序列',
        'curriculum.module1-2-1.obj2': '增长模式',
        'curriculum.module1-2-1.obj3': '函数表',
        'curriculum.module1-2-2.title': '1.2.2 表达式与方程',
        'curriculum.module1-2-2.obj1': '编写代数表达式',
        'curriculum.module1-2-2.obj2': '计算表达式',
        'curriculum.module1-2-2.obj3': '解简单方程',
        'curriculum.module1-2-2.obj4': '不等式',
        'curriculum.module1-3-1.title': '1.3.1 线性函数',
        'curriculum.module1-3-1.obj1': '斜率和y截距',
        'curriculum.module1-3-1.obj2': '绘制线性方程图',
        'curriculum.module1-3-1.obj3': '线性方程组',
        'curriculum.module1-3-2.title': '1.3.2 二次函数',
        'curriculum.module1-3-2.obj1': '抛物线和顶点形式',
        'curriculum.module1-3-2.obj2': '因式分解二次方程',
        'curriculum.module1-3-2.obj3': '二次公式',
        'curriculum.module2-1-1.title': '2.1.1 基本图形',
        'curriculum.module2-1-1.obj1': '识别和分类图形',
        'curriculum.module2-1-1.obj2': '多边形性质',
        'curriculum.module2-1-1.obj3': '角度和角度关系',
        'curriculum.module2-1-2.title': '2.1.2 面积与周长',
        'curriculum.module2-1-2.obj1': '计算各种图形的面积',
        'curriculum.module2-1-2.obj2': '周长和圆周',
        'curriculum.module2-1-2.obj3': '复合图形',
        'curriculum.module2-2-1.title': '2.2.1 立体图形',
        'curriculum.module2-2-1.obj1': '识别三维图形',
        'curriculum.module2-2-1.obj2': '表面积计算',
        'curriculum.module2-2-1.obj3': '体积公式',
        'curriculum.module2-3-1.title': '2.3.1 坐标平面',
        'curriculum.module2-3-1.obj1': '绘制点',
        'curriculum.module2-3-1.obj2': '距离公式',
        'curriculum.module2-3-1.obj3': '中点公式',
        'curriculum.module3-1-1.title': '3.1.1 数据收集',
        'curriculum.module3-1-1.obj1': '调查方法',
        'curriculum.module3-1-1.obj2': '数据组织',
        'curriculum.module3-1-1.obj3': '表格和图表',
        'curriculum.module3-1-2.title': '3.1.2 统计测量',
        'curriculum.module3-1-2.obj1': '平均数、中位数、众数',
        'curriculum.module3-1-2.obj2': '范围和四分位数',
        'curriculum.module3-1-2.obj3': '标准差',
        'curriculum.module3-2-1.title': '3.2.1 基础概率',
        'curriculum.module3-2-1.obj1': '理论与实验',
        'curriculum.module3-2-1.obj2': '复合事件',
        'curriculum.module3-2-1.obj3': '条件概率',
        'curriculum.module4-1-1.title': '4.1.1 现实世界应用',
        'curriculum.module4-1-1.obj1': '数学建模',
        'curriculum.module4-1-1.obj2': '优化问题',
        'curriculum.module4-1-1.obj3': '跨学科联系',
        'curriculum.module4-2-1.title': '4.2.1 高级问题解决',
        'curriculum.module4-2-1.obj1': '竞赛准备',
        'curriculum.module4-2-1.obj2': '证明技巧',
        'curriculum.module4-2-1.obj3': '创造性问题解决',
        
        // About Page
        'about.team.title': '认识我们的团队',
        'about.team.subtitle': '致力于推进数学教育的热情教育家和技术专家',
        'about.team.yanan.name': 'Yanan Zhu',
        'about.team.yanan.title': '创始人兼业务负责人',
        'about.team.yanan.bio': '清华大学硕士及学士。曾任微软大中华区副总裁、埃森哲大中华区董事总经理（财富500强中唯一的咨询公司），以及IBM全球咨询合伙人。企业数字化转型专家，成功指导多家知名企业实现上市。',
        'about.team.meilu.name': 'Meilu Zeng',
        'about.team.meilu.title': '课程与教育专家',
        'about.team.meilu.bio': '曾任中国济南市数学教研员，拥有近30年中考命题经验。山东省特级教师。中国教育学会数学教育研究中心数学研究会理事。教育部考试评价与教学质量监测课题组核心成员。',
        'about.team.yixin.name': 'Yixin Li',
        'about.team.yixin.title': '产品与技术负责人',
        'about.team.yixin.bio': '北卡罗来纳州立大学硕士和学士学位。现为联想全球未来领袖项目中的解决方案产品经理。致力于将大语言模型和强化学习应用于提升教育体验。成功领导了多个人工智能驱动的教育平台开发项目，将理论研究有效转化为实际应用。',
        'about.team.noboru.name': 'Dr. Noboru Matsuda',
        'about.team.noboru.title': 'AI研究顾问',
        'about.team.noboru.bio': '北卡罗来纳州立大学计算机科学副教授，创新教育计算实验室主任。于匹兹堡大学获得智能系统博士学位。专注于教育领域的人工智能技术创新，重点研究利用机器学习和计算方法理解并提升学习过程。现为北卡州立大学校长卓越教授计划下"教育数字化转型"学术群组成员。'
    }
};

function changeLanguage(lang) {
    // Save language preference
    localStorage.setItem('selectedLanguage', lang);
    
    // Update all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update page title
    if (lang === 'zh') {
        document.title = '深度数学 - 为天才儿童提供高级数学教育';
    } else {
        document.title = 'DeepMath - Advanced Math Education for Gifted Children';
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);
    }
});

// Function to handle problem card clicks
function openProblem(problemId) {
    // For now, redirect to a placeholder page or show an alert
    // In the future, this would redirect to the problem detail page
    const problemUrl = `problem.html?id=${problemId}`;
    
    // Show a placeholder message for now
    showNotification(`Opening ${problemId} problem... (Placeholder - would redirect to ${problemUrl})`, 'info');
    
    // Uncomment this line when the problem detail page is ready:
    // window.open(problemUrl, '_blank');
}

// Function to switch between problem tabs
function switchProblemTab(tabId) {
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Remove active class from all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab button
    const activeButton = document.querySelector(`[onclick="switchProblemTab('${tabId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Show the selected tab content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Print debug info in console
    console.log('DeepMath - Website loaded successfully');
    console.log('Features: Mobile menu, smooth scrolling, animations, form validation, curriculum flowchart, FAQ toggle, language switching, problem navigation'); 

// Initialize testimonial infinite scroll
function initTestimonialScroll() {
    const testimonialScroll = document.querySelector('.testimonial-scroll');
    if (!testimonialScroll) return;

    // Ensure smooth infinite scrolling by handling animation end
    testimonialScroll.addEventListener('animationiteration', function() {
        // Animation completed one cycle, seamlessly continues
        this.style.transform = 'translateX(0)';
    });

    // Optional: Add pause on hover for better UX
    testimonialScroll.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });

    testimonialScroll.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });

    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        testimonialScroll.style.animation = 'none';
        testimonialScroll.style.transform = 'translateX(0)';
    }
}