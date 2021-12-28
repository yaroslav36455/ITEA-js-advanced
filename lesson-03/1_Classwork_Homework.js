window.onload=function (e) {
    const inputCounter = document.getElementById("counter");
    const checkboxAltCounter= document.getElementById("is-alter");
    let intervalID;

    document.getElementById("btn-stop").onclick = stop;
    document.getElementById("btn-start").onclick = start;
    document.getElementById("btn-refresh").onclick = refresh;

    function stop() {
        if (intervalID !== undefined) {
            clearInterval(intervalID);
            intervalID = undefined;
        }
    }

    function start() {
        if (intervalID === undefined) {
            if (isNaN(Number.parseInt(inputCounter.value))) {
                refresh();
            }
            intervalID = setInterval(count, 1000, inputCounter, checkboxAltCounter)
        }
    }

    function refresh() {
        inputCounter.value = checkboxAltCounter.checked === false ? 0 : 30;
    }

    function count(inputCounter, checkboxAltCounter) {
        let value = Number.parseInt(inputCounter.value);

        if (checkboxAltCounter.checked === false) {
            inputCounter.value = ++value;
        } else if (value > 1) { // счётчик альтернативный и счёт разрешён(value > 1)
            inputCounter.value = --value;
        } else { // счётчик альтернативный, но счёт не разрешён(value <= 1), счётчик можно удалить
            stop();
        }
    }
}