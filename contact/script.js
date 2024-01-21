const root = '/portfolio/'



const setLanguage = async (language) => {
  const response = await fetch(root + 'contact/language.json');
  const data = await response.json();

  const languageIndicator = document.querySelector('nav > .burger-items > .language > span');
  languageIndicator.textContent = language.toUpperCase();

  const header = document.querySelector('.contact > h1');
  header.textContent = data.header[language];
  
  const inputs = document.querySelectorAll('.contact > .content > form > input');
  const name = inputs[0];
  const eMail = inputs[1];
  const message = inputs[2];
  const submit = document.querySelector('.contact > .content > form > button');

  name.placeholder = data.form.name[language ];
  eMail.placeholder = data.form.email[language];
  message.placeholder = data.form.message[language];

  
  const contact = document.querySelector('.contact > .content > .other > .info:nth-child(1) > h2');
  const locationHead = document.querySelector('.contact > .content > .other > .info:nth-child(2) > h2');
  const location = document.querySelector('.contact > .content > .other > .info:nth-child(2) > a');

  contact.textContent = data.info.contact[language];
  locationHead.textContent = data.info.location[language][0];
  location.textContent = data.info.location[language][1];
}

const searchParams = new URLSearchParams(window.location.search);
const lang = searchParams.get('lang') !== null ? searchParams.get('lang') : 'en';


const languageToggler = document.querySelector('nav > .burger-items > .language');

languageToggler.onclick = async () => {
  
  const languages = ['en', 'id', 'jp'];
  let index = languages.indexOf(lang);
  let nextIndex = (index + 1) % 3;
  window.location.href = root + `contact/?lang=${languages[nextIndex]}`;
}


setLanguage(lang);





const burgerButton = document.querySelector('nav > .burger');

burgerButton.onclick = () => {
  let opened = burgerButton.dataset.opened == 'true';
  const burgerItems = document.querySelector('nav > .burger-items');
  if (opened) {
    burgerItems.style.transform = 'translate(-100%, -3.85rem)';
    
  } else {
    burgerItems.style.transform = 'translate(0, -3.85rem)';
  }
  burgerButton.dataset.opened = !opened;
  
}


const darkModeToggler = document.querySelector('nav > .burger-items > .dark-mode');


darkModeToggler.onclick = () => {
  const theme = document.body.dataset.theme;
  const icons = document.querySelectorAll('nav > .burger-items > .dark-mode > svg');
  if (theme == 'light') {
    document.body.dataset.theme = 'dark';
    icons[0].classList.add('hidden');
    icons[1].classList.remove('hidden');
  } else {
    document.body.dataset.theme = 'light';
    icons[1].classList.add('hidden');
    icons[0].classList.remove('hidden');
  }
}
