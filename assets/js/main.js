/*=============== SHOW MENU ===============*/
const   navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)


/*=============== EMAIL JS ===============*/
const   contactForm = document.getElementById('contact-form'),
        contactMessage = document.getElementById('contact-message')

const   sendEmail = (e) =>{
    e.preventDefault()

    // Tampilkan loading
    contactMessage.textContent = 'Sending message...'
    contactMessage.style.color = 'var(--text-color)'

    // serviceID - templateID - #form - publicKey
    // Public key harus sesuai dengan akun EmailJS yang memiliki service dan template
    emailjs.sendForm('service_vo3gxvv','template_js9at1s', contactForm, 'bKSsSXqEr-U_N6c6k')
    .then(() =>{
        // Show sent message
        contactMessage.textContent = 'Message sent successfully ✅'
        contactMessage.style.color = 'green'

        // Remove message after five seconds
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 5000)

        // Clear input fields
        contactForm.reset()

    }, (error) =>{
        // Show error message
        console.log('EmailJS Error:', error)
        contactMessage.textContent = 'Message not sent (service error) ❌'
        contactMessage.style.color = 'red'
    })

}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

// Sections that should activate "About Me" link
const aboutRelatedSections = ['about', 'services', 'kekurangan', 'resolusi']
    
const scrollActive = () =>{
const scrollDown = window.scrollY
const windowHeight = window.innerHeight
const documentHeight = document.documentElement.scrollHeight

// First, remove all active links
document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('active-link'))

// Check if we're at the bottom of the page for the last section (contact)
const isAtBottom = (windowHeight + scrollDown) >= (documentHeight - 50)

if(isAtBottom){
	const contactLink = document.querySelector('.nav__menu a[href*="contact"]')
	if(contactLink) contactLink.classList.add('active-link')
	return
}

// Find which section is currently in view
sections.forEach(current =>{
	const sectionHeight = current.offsetHeight,
		  sectionTop = current.offsetTop - 58,
		  sectionId = current.getAttribute('id')

	if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
		// Check if this section should activate "About Me"
		if(aboutRelatedSections.includes(sectionId)){
			const aboutLink = document.querySelector('.nav__menu a[href*="about"]')
			if(aboutLink) aboutLink.classList.add('active-link')
		} else {
			// For other sections (home, projects, contact), activate their own link
			const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
			if(sectionsClass) sectionsClass.classList.add('active-link')
		}
	}
})
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animation repeat
})
sr.reveal(`.home__perfil, .about__image, .contact__mail`, {origin: 'right'})
sr.reveal(`.home__name, .home__info,
           .about__container .section__title-1, .about__info,
           .contact__social, .contact__data`, {origin: 'left'})
sr.reveal(`.services__card, .projects__card`, {interval: 100})

/*=============== SERVICE CARD TO PROJECT NAVIGATION ===============*/
const serviceCards = document.querySelectorAll('.services__card')

// Simple function to scroll to projects section
const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

// Add click event listeners to service cards
serviceCards.forEach((card) => {
    card.addEventListener('click', (e) => {
        e.preventDefault()
        
        // Simple click effect
        card.style.transform = 'scale(0.98)'
        
        setTimeout(() => {
            card.style.transform = ''
            scrollToProjects()
        }, 100)
    })
    
    // Add cursor pointer
    card.style.cursor = 'pointer'
})