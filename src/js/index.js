//import '../css/style.scss'

const form = document.querySelector('.form__container');
form.addEventListener('submit', formSend);
let checkiIndex = 0;

async function formSend(e) {
    e.preventDefault();
    formValidate(form);
    let formDate = new FormData(form);
    if (checkiIndex === 0) {
        form.classList.add('_sending');
        let response = await fetch('http://www.mocky.io/v2/5944e07213000038025b6f30', {
            method: 'POST',
            body: formDate,
        });
        if (response.ok) {
            form.classList.remove('_sending');
            alert('Запрос выполнен!');
            let result = await response.json();
            form.reset();
        }
        else {
            form.classList.remove('_sending');
            alert('Ошибка!')
        }
    }
}

function formValidate(form) {

    let formRequired = document.querySelectorAll('.input');
    for (let i = 0; i < formRequired.length; i++) {
        const input = formRequired[i];
        formRemoveError();
        if (input.classList.contains('input'))
            if (input.value === '') {
                formAddError();
                setInterval(() => { formRemoveError() }, 3000);
                checkiIndex++
            }
            else {
                checkiIndex = 0;
            }
    }
}

function formAddError() {
    let req = document.querySelector('.span');
    req.classList.add('_error');
}
function formRemoveError() {
    let req = document.querySelector('.span');
    req.classList.remove('_error');
}

