const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];



const setLanguage = async (language) => {
  const response = await fetch('/data/language.json');
  const data = await response.json();

  const languageIndicator = document.querySelector('nav > .burger-items > .language > span');
  languageIndicator.textContent = language.toUpperCase();

  const greeting = document.querySelector('.header > .introduction > h6');
  const intro = document.querySelector('.header > .introduction > h1');
  const introDesc = document.querySelector('.header > .introduction > p');

  greeting.textContent = data.greeting[language];
  intro.textContent = data.introduction[language];
  introDesc.textContent = data.description[language];


  const worksTitle = document.querySelector('.works > .head > h1');
  const worksDesc = document.querySelector('.works > .head > p');
  worksTitle.textContent = data.works.title[language];
  worksDesc.textContent = data.works.desc[language];
  

  const blenderTitle = document.querySelector('.blender > h1');
  const blenderDesc = document.querySelector('.blender > p');
  const blenderMascot = document.querySelector('.blender > .mascot > h1');
  const latestBlender = document.querySelector('.blender > .latest > h1');
  const allRenders = document.querySelector('.blender > .all-works > h1');

  blenderTitle.textContent = data.blender.title[language];
  blenderDesc.textContent = data.blender.desc[language];
  blenderMascot.textContent = data.blender.section.mascot[language];
  latestBlender.textContent = data.blender.section.latest[language];
  allRenders.textContent = data.blender.section.renders[language];
};

const searchParams = new URLSearchParams(window.location.search);
const lang = searchParams.get('lang') !== null ? searchParams.get('lang') : 'en';


const languageToggler = document.querySelector('nav > .burger-items > .language');

languageToggler.onclick = async () => {
  
  const languages = ['en', 'id', 'jp'];
  let index = languages.indexOf(lang);
  let nextIndex = (index + 1) % 3;
  window.location.href = `/?lang=${languages[nextIndex]}`;
}


setLanguage(lang);




const fetchData = async () => {
  const response = await fetch('/data/render.csv');
  const data = (await response.text()).split('\n').slice(1);


  const container = document.querySelector('.works > .blender > .all-works > .items');
  
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const [title, image, link, description, postDate] = data[randomIndex].split(',');

    const date = new Date(postDate);

    let formattedDate = `${daysOfWeek[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${1900 + date.getYear()}`;

    
    const element = document.querySelector('.header > .image-profile');
    const caption = document.querySelector('.header > .image-profile > div > span');
    const dateContainer = document.querySelector('.header > .image-profile > div > p');
    const linkContainer = document.querySelector('.header > .image-profile > a');
    
    element.style.backgroundImage = `url(${image})`;
    caption.textContent = title;
    dateContainer.textContent = formattedDate;
    linkContainer.href = link;
  }, 6000);


  
  for (let i = 0; i < data.length; i++) {
    const element = document.createElement('button');
    const item = data[i];
    const [title, image, link, description] = item.split(',');

    element.style.background = `url(${image})`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
    element.onclick = () => {
      document.querySelector('.render-modal-wrapper').classList.remove('hidden');
      document.body.classList.add('no-scroll');

      const modalImg = document.querySelector('.render-modal > .img');
      const modalCaption = document.querySelector('.render-modal > .main > .caption > p');
      const modalLike = document.querySelector('.render-modal > .main > .options > a:first-child');
      const modalLink = document.querySelector('.render-modal > .main > .options > a:last-child');

      modalImg.style.backgroundImage = `url(${image})`;
      modalCaption.textContent = description;
      modalLike.href = link;
      modalLink.href = link;
    }
    container.append(element);
  }
}


fetchData();

let counter = 0;

setInterval(() => {
  const allItems = document.querySelector('.works > .blender > .latest > .latest-blender-work').children;

  const backgrounds = [
    ['https://pbs.twimg.com/media/GD6WGZka8AAFFaZ?format=jpg&name=large', 'Wireframe'],
    ['https://pbs.twimg.com/media/GD6WGZlbcAAyaP6?format=jpg&name=large', 'Solid'],
    ['https://pbs.twimg.com/media/GD6WGZiaUAAG1j0?format=jpg&name=large', 'Materials'],
    ['https://pbs.twimg.com/media/GD6WGZtaUAAsDcb?format=jpg&name=large', 'EEVEE'],
    ['https://pbs.twimg.com/media/GD4fHkBbcAAo2fW?format=jpg&name=large', 'Cycles']
  ]

  let currentIndex = counter % backgrounds.length;

  allItems[0].style.backgroundImage = `url(${backgrounds[currentIndex][0]})`;
  allItems[5].textContent = backgrounds[currentIndex][1];
  allItems[6].style.transform = `rotate(${counter*45}deg)`;
  counter++;
}, 3000);






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
