window.onload = function () {
    let regExpExecArray = getPhraseWords();
    let countA;

    drawAndModifyWords(regExpExecArray);
    countA = countOfLetter('a', regExpExecArray);
    window.alert(`Количество символов 'a' после преобразований: ${countA}`);
}

function getPhraseWords() {
    let phrase = window.prompt("Введите фразу");
    let regExp = new RegExp("[a-zA-Zа-яА-Я]+", "g");
    return phrase.match(regExp);
}

function drawAndModifyWords(words) {
    let anyChar = new RegExp(".");

    let ul = "<ul>\n";
    for (let i = 0; i < words.length; i++) {
        if (i === 0) {
            words[i] = words[i].toUpperCase();
        }

        if (i === words.length - 1 || i === words.length - 2) {
            words[i] = words[i].replace(anyChar, words[i][0].toLowerCase());
        }

        ul += `<li>${words[i]}</li>`
    }
    ul += "</ul>";
    document.body.innerHTML = ul;
}

function countOfLetter(letter, words) {
    let countA = 0;
    let regExp = new RegExp("a", "g");

    words.forEach(function (elem) {
        let matchAll = elem.match(regExp);
        if (matchAll !== null) {
            countA += matchAll.length;
        }
    })
    return countA;
}
