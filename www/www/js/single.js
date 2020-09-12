const wordList = document.getElementById('word_list');
const singleWord = document.querySelector('#single_word');
const singleTitle = document.querySelector('#single_word__title');
const singleDesc = document.querySelector('#single_word__description');
const closeEl = document.getElementById('close_btn');
let listItems;


fetch('./js/base.json')
.then(results => results.json())
.then(json => {
    getData(json);
})

function getData(data) {
    printItems(data[localStorage.getItem('letter')]);
    listItems = document.querySelectorAll('.words_list__item');

    document.getElementById('search').oninput = function() {
        let val = this.value.trim().toLowerCase();
        if(val != '') {
            let searchItems = [];
            for (let item in data[localStorage.getItem('letter')]) {
                if(item.search(val) == -1) {

                } 
                else {
                    searchItems.push(item);
                }
            }
            wordList.innerHTML = '';
            for (let item of searchItems) {
                const listItem = createEl('li', {'class': 'words_list__item'}, item);
                wordList.appendChild(listItem);
            }
            listItems = document.querySelectorAll('.words_list__item');
            clickListener(data);
        } 
        else {
            printItems(data[localStorage.getItem('letter')]);
            listItems = document.querySelectorAll('.words_list__item');
            clickListener(data);
        }

    }
    clickListener(data);
}

closeEl.addEventListener('click', ()=> {
    closeBtn();
})

function printItems(data) {
    wordList.innerHTML = '';
    for(let key in data) {
        const listItem = createEl('li', {'class': 'words_list__item',}, key);
        wordList.appendChild(listItem);
    }
}
function createEl (tag, options, text) {
    const elem = document.createElement(tag);
    for(const key in options) {
        elem.setAttribute(key, options[key]);
    }
    elem.textContent = text;
    return elem;
}

function closeBtn() {
    singleWord.classList.remove('active');   
}

function clickListener(data) {
    for (let item of listItems) {
        item.addEventListener('click', () => {
            singleWord.classList.add('active');
            const desc = data[localStorage.getItem('letter')][item.textContent];
            singleTitle.textContent = item.textContent;
            singleDesc.textContent = desc;
        })
    }
}

// loadData();

// function loadData() {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', './js/base.json');
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState == 4 && xhr.status == 200) {
//             getData(xhr.responseText);
//         } 
//         else {
//             console.log('error');
//         }
//     }
//     xhr.send();
// }
