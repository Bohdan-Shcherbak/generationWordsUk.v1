const generation = document.querySelector('.generation');
const linkGo = document.querySelector('.link-to');

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

const objectsFiles = {
    1: 'oneLetter',
    2: 'twoLetter',
    3: 'threeLetter',
    4: 'fourLetter',
    5: 'fiveLetter',
    6: 'sixLetter',
    7: 'sevenLetter',
    8: 'eightLetter',
    9: 'nineLetter',
    10: 'tenLetter',
    12: 'twelveLetter',
    13: 'thirteenLetter',
    14: 'fourteenLetter',
    15: 'fifteenLetter',
    16: 'sixteenLetter',
    17: 'seventeenLetter',
    18: 'eighteenLetter',
    19: 'nineteenLetter',
    20: 'twentyLetter',
    21: 'twentyOneLetter',
    22: 'twentyTwoLetter',
    23: 'twentyThreeLetter',
    24: 'twentyFourLetter',
    25: 'twentyFiveLetter',
    26: 'twentySixLetter',
    27: 'twentySevenLetter',
    28: 'twentyEightLetter',
    29: 'twentyNineLetter',
    30: 'thirtyLetter',
    32: 'thirtyTwoLetter',
    33: 'thirtyThreeLetter',
}

const finishWord = '';

// Функція підстановки нового посилання в href
function addAtribute(el){
    linkGo.setAttribute('href', el);
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

function mainFunc(a,b){  
    generation.classList.add('new');
    disabled(0);
    // створюємо перші 2 цифри для посилання
    let firstNumb = random(34);
    let secondNumb = random(objectWords[firstNumb]);

    // перевірка на пустоту значення об'єкта
    if(isNaN(secondNumb)){
        return
    }

    // обираємо файл
    const nameFile = './letters/' + objectsFiles[firstNumb]+'.min.js';

    // обираємо діапазон, тобто конкретний масив
    const nameRange = objectsFiles[firstNumb] + secondNumb;    

    // знаходимо конкретне слово для завершення посилання
    // const lastWord =  loadArrays(nameRange,nameFile);
    let lastWord = '';
    async function getWord() {
        lastWord = await loadArrays(nameRange, nameFile);  // Присвоюємо результат глобальній змінній
    }
    getWord().then(()=>{
        const link = `https://slovnyk.ua/index.php?swrd=${lastWord}`
        console.log(link);
        addAtribute(link)
    });
}

async function loadArrays(nameRange,nameFile) {
    try{        
        const containFiles = await import(nameFile)
        const arrWords = [...containFiles[nameRange]];
        const arrWordsLength = arrWords.length;
        const randomWord = Math.floor(Math.random() * arrWordsLength);
        const finishWord = arrWords[randomWord];
        return finishWord;
    }
    catch(error){
        console.error('Помилка завантаження файлу:', error);
        throw error;
    }
}

// Головний виклик всії функцій - натиск на Генерувати
generation.addEventListener('click', mainFunc);

// натиск на Перейти
linkGo.addEventListener('click', ()=>{disabled(1)})
