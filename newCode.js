// const alphabet = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'.split('')
const generation = document.querySelector('.generation');
const linkGo = document.querySelector('.link-to');


  // Функція підстановки нового посилання в href
function addAtribute(el){
  linkGo.setAttribute('href', el);
}

// Масив укр букв і скільки вони мають дыапазонів (Аа - Ад, Ае-Аз) 
const objectWords = {
  1:102,
  2:106,
  3:139,
  4:103,
  5:19,
  6:109,
  7:69,
  8:21,
  9:38,
  10:130,
  11: 'return',
  12:59,
  13:9,
  14:15,
  15:123,
  16:75,
  17:105,
  18:128,
  19:113,
  20:220,
  21:111,
  22:145,
  23:104,
  24:75,
  25:75,
  26:63,
  27:49,
  28:54,
  29:66,
  30:26,
  31:'return',
  32:17,
  33:32,
}


// Функція рандомних цифор включно від n
function random(n){
  return parseInt(Math.random()*(n-1)+1)
}

// функція відключення посилань
function disabled(a){
  if(a == 0){    
    generation.classList.add('disabled');
    linkGo.classList.remove('disabled');

  } else{    
    generation.classList.remove('disabled');
  }
}

function randomFunc(){
  generation.classList.add('new');
  disabled(0);

  let firstNumb = random(34);
  let secondNumb = random(objectWords[firstNumb]);
  console.log(secondNumb);
  
  if(isNaN(secondNumb) == true){
    return
  }
  // Запуск головної функції, яка використовує перші 2 цири щоб перейти по посиланню
  //  і забрати інформацію за допомогою fetch

  mainFunc(firstNumb,secondNumb)
}

function mainFunc(a,b){  
  let link = `https://slovnyk.ua/index.php?s1=${a}&s2=${b}`

  fetch(link)
.then((response) =>{

    if (!response.ok) {
      console.log('noOk');
    } else{
        console.log('OOK');
    }

    return response.text();
})
.then((text)=>{
const finishWord = symbols(text);
link = `https://slovnyk.ua/index.php?swrd=${finishWord}`
addAtribute(link)
})
.catch((error) => {
    console.log('noOk2');
});
}


// Функція робить з тексту веб сторінку за допомогою parseFromString
function symbols(text){
const parser = new DOMParser();
const doc = parser.parseFromString(text, 'text/html');

const words = doc.querySelectorAll('.cont_link');

const arrWordsLength = words.length;
const sequenceNumberWord = Math.floor(Math.random() * arrWordsLength);
return words[sequenceNumberWord].textContent;
}

// Головний виклик всії функцій - натиск на Генерувати
generation.addEventListener('click', randomFunc);

// натиск на Перейти
linkGo.addEventListener('click', ()=>{disabled(1)})