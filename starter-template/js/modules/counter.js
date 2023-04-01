import Result from './result.js';

const PhysicalActivityRatio = {
    MIN: 1.2,
    LOW: 1.375,
    MEDIUM: 1.55,
    HIGH: 1.725,
    MAX: 1.9,
};

const CaloriesFormulaFactor = {
    AGE: 5,
    WEIGHT: 10,
    HEIGHT: 6.25,
};

const CaloriesFormulaConstant = {
    MALE: -5,
    FEMALE: 161
};

const CaloriesMinMaxRatio = {
    MIN: 0.85,
    MAX: 1.15
};

export default class Counter {
    constructor(element) {
        this.element = element;
        this.ageElement = this.element.querySelector(`#age`); /*ПОЛУЧИЛИ ВОЗРАСТ*/
        this.weightElement = this.element.querySelector(`#weight`); /*ПОЛУЧИЛИ ВЕС*/
        this.heightElement = this.element.querySelector(`#height`); /*ПОЛУЧИЛИ РОСТ*/
        // перечисление параметров, необходимых для работы: gender, age, weight, height, activity и т.д.
        this.btnSubmit = this.element.querySelector(`.form__submit-button`); /*КНОПКА РВСЧЕТА*/
        this.btnReset = this.element.querySelector(`.form__reset-button`); /*КНОПКА УДАЛЕНИЯ*/
        this.form = this.element.querySelector(`.form`);
    }

    _onFormInput() {
        // получение данных от пользователя
        this.age = Number.parseInt(this.ageElement.value, 10);
        this.weight = Number.parseInt(this.weightElement.value, 10);
        this.height = Number.parseInt(this.heightElement.value, 10);
        //валидация
        this.btnReset.disabled = !(this.age || this.weight || this.height); /*DISABLED  СТАНОВИТСЯ FALCE*/
        this.btnSubmit.disabled = !this.form.checkValidity(); /*ПРОВЕРИЛИ ЧТО ВСЕ УСЛОВИЯ ЗАПОЛНЕНИЯ ВЕРНЫ И РАЗБЛОКИРОВАЛИ КНОПКУ*/
    }
    _onFormReset() {
        // задизабленность при обновлении страницы кнопок, скрытие блока с результатом
        this.form.reset();
        this.btnSubmit.disabled = true;
        this.btnReset.disabled = true;
        if (this.showResult) this.showResult.hide();
    }

    _onFormSubmit(evt) {
        this.genderKey = evt.get('gender').toUpperCase();
        this.activityKey = evt.get('activity').toUpperCase();
        this.calories = {
            NORM: this.getCaloriesNorm(),
            MIN: this.getCaloriesMin(),
            MAX: this.getCaloriesMax(),
        };

        this.showResult = new Result(this.element);
        this.showResult.show(this.calories);
        // вызов методов расчета калорий 
        // getCaloriesNorm(), getCaloriesMin(), getCaloriesMax()
        // показ блока с результатами калорий
    }
    init() {
        this.element.addEventListener('change', (event) => {
            event.preventDefault();
            this._onFormInput();
        });

        this.btnReset.addEventListener('click', (event) => {
            event.preventDefault();
            this._onFormReset();
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.formData = new FormData(this.form);
            this._onFormSubmit(this.formData);
        });
        // инициализация обработчиков событий 
        // _onFormInput, _onFormReset, _onFormSubmit
    }

    deinit() {
        // удаление обработчиков событий 
        // _onFormInput, _onFormReset, _onFormSubmit
    }

    getCaloriesNorm() {
        return (
            (CaloriesFormulaFactor.WEIGHT * this.weight +
                CaloriesFormulaFactor.HEIGHT * this.height -
                CaloriesFormulaFactor.AGE * this.age -
                CaloriesFormulaConstant[this.genderKey]) *
            PhysicalActivityRatio[this.activityKey]
        );
        // перечисление констант age, weight, height, gender, activity
        // применение формулы расчета
    }

    getCaloriesMin() {
        return this.getCaloriesNorm() * CaloriesMinMaxRatio.MIN;
    }

    getCaloriesMax() {
        return this.getCaloriesNorm() * CaloriesMinMaxRatio.MAX
    }
}