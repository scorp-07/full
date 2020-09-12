const wordList = document.getElementById('word_list');
let listItems;

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    fetch('./js/base.json')
        .then(results => results.json())
        .then((json) => {
            getData(json);
        });    
}

function getData(data) {
    printItem(data);
    listItems = document.querySelectorAll('.words_list__item');
    document.getElementById('search').oninput = function() {
        let val = this.value.trim().toUpperCase();
        if(val != '') {
            let searchItems = [];
            for (let item in data) {
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
            clickListener();
        } 
        else {
            printItem(data, listItems);
            listItems = document.querySelectorAll('.words_list__item');
            clickListener();
        }
    }
    clickListener();
}
function printItem(data) {
    wordList.innerHTML = '';
    for(let key in data) {
        const listItem = createEl('li', {'class': 'words_list__item',}, key);
        wordList.appendChild(listItem);
    }
}
function clickListener() {
    for(let item of listItems) {
        item.addEventListener('click', () => {
            console.log('work');
            localStorage.setItem('letter', item.textContent);
            document.location.href = "./single-letter.html";
        });
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
