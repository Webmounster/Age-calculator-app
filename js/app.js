const inputDay = document.querySelector('.form__input-day');
const inputMonth = document.querySelector('.form__input-month');
const inputYear = document.querySelector('.form__input-year');

const calculeDays = document.querySelector('.calcule__days--number');
const calculeMonths = document.querySelector('.calcule__months--number');
const calculeYears = document.querySelector('.calcule__years--number');

const inputs = document.querySelectorAll('.form__input');

const btnSubmit = document.querySelector('.form__submit');

const image = document.querySelector('.happybirthday');

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
let days;
let months;
let years;

let formvalid;

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    image.style.animation = '';
    formvalid = false;
    requerido();
    if (formvalid) {
        calculateAge();
    }
})


// Función para campos requeridos
function requerido() {
    inputs.forEach(element => {
        const label = element.parentElement.querySelector('.form__label');
        const error = element.parentElement.querySelector('.form__error');
        if (element.value == '') {
            invalido(label, element, error, 'The Field is required');
        } else {
            valido(label, element, error);

            fechaValida();

        }
    });
}



// Funcion para fecha valida(dias,mes y año)
function fechaValida() {
    let validDay = false;
    let validMonth = false;
    let validYear = false;
    let label_day = inputDay.parentElement.querySelector('.form__label');
    let error_day = inputDay.parentElement.querySelector('.form__error');
    let label_month = inputMonth.parentElement.querySelector('.form__label');
    let error_month = inputMonth.parentElement.querySelector('.form__error');
    let label_year = inputYear.parentElement.querySelector('.form__label');
    let error_year = inputYear.parentElement.querySelector('.form__error');
    if (inputDay.value != '') {

        if (inputDay.value < 1 || inputDay.value > diasEnUnMes(inputMonth.value, inputYear.value) || isNaN(inputDay.value)) {

            invalido(label_day, inputDay, error_day, 'Must be a valid day');
        } else {

            if (inputDay.value > currentDay && inputMonth.value >= currentMonth + 1 && inputYear.value == currentYear) {
                invalido(label_day, inputDay, error_day, "You're not born yet!!");
            } else {
                valido(label_day, inputDay, error_day);
                validDay = true;
            }
        }
    }

    if (inputMonth.value != '') {

        if (inputMonth.value < 1 || inputMonth.value > 12 || isNaN(inputMonth.value)) {

            invalido(label_month, inputMonth, error_month, 'Must be a valid month');
        } else {
            valido(label_month, inputMonth, error_month);
            validMonth = true;
        }
    }

    if (inputYear.value != '') {

        if (inputYear.value > currentYear || isNaN(inputYear.value)) {
            invalido(label_year, inputYear, error_year, 'Must be in the past');
        } else {

            if (inputYear.value == currentYear && inputMonth.value > currentMonth + 1) {
                invalido(label_month, inputMonth, error_month, "You're not born yet!!");
            } else {

                valido(label_year, inputYear, error_year);
                validYear = true;
            }
        }
    }



    if (validDay && validMonth && validYear) {
        formvalid = true;
    }

    return formvalid;
}

// Funcion para averigurar la edad

function calculateAge() {
    let monthCurrent = currentMonth + 1;
    let diffDays = currentDay - inputDay.value;
    let diffMonths = monthCurrent - inputMonth.value;
    let diffYears = currentYear - inputYear.value;

    let counterDays = 0;
    let counterMonths = 0;
    let counterYears = 0;
    let yearsUp = setInterval(yearAnima, 90);
    let monthsUp = setInterval(monthAnima, 90);
    let daysUp = setInterval(dayAnima, 90);

    if (diffMonths >= 0) {
        years = diffYears;
        months = diffMonths;
    } else {
        years = diffYears - 1;
        months = diffMonths + 12;
    }

    if (diffDays >= 0) {
        days = diffDays;
    } else {
        days = diasEnUnMes(monthCurrent, currentYear) + diffDays;
    }



    function yearAnima() {
        if (counterYears == years) {
            clearInterval(yearsUp);
            calculeYears.innerHTML = counterYears;
            if (inputDay.value == currentDay && inputMonth.value == currentMonth + 1) {
                happyAnima();
            }
        } else {
            counterYears++;
            calculeYears.innerHTML = counterYears;
        }
    }
    function monthAnima() {
        if (counterMonths == months) {
            clearInterval(monthsUp);
            calculeMonths.innerHTML = counterMonths;
        } else {
            counterMonths++;
            calculeMonths.innerHTML = counterMonths;
        }
    }
    function dayAnima() {
        if (counterDays == days) {
            clearInterval(daysUp);
            calculeDays.innerHTML = counterDays;
        } else {
            counterDays++;
            calculeDays.innerHTML = counterDays;
        }
    }

    function happyAnima() {
        image.style.opacity = 1;
        image.style.animation = 'happy 1s 0s forwards ease';
    }


    // console.log(currentDay);
    // console.log(monthCurrent);
    // console.log(currentYear);
    // console.log(diffDays);
    // console.log(diffMonths);
    // console.log(diffYears);
    // console.log(`Años: ${years} -- Meses: ${months} -- Dias: ${days}`);
}


// Función para dias del mes
function diasEnUnMes(month, year) {
    return new Date(year, month, 0).getDate();

}

function invalido(label, element, error, msg) {
    label.style.color = "red";
    element.style.borderColor = "red";
    error.style.display = 'block';
    error.innerHTML = msg;
}

function valido(label, element, error) {
    label.style.color = "";
    element.style.borderColor = "";
    error.style.display = 'none';
}