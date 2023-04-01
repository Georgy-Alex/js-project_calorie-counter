export default class Result {
    constructor(element) {
        this.counter = element;
        
        this.root = element.querySelector(`.counter__result`);
        this.caloriesNormOutput = this.root.querySelector(`#calories-norm`);
        this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`);
        this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`);
    }

    show(calories) {
        this.root.classList.remove(`counter__result--hidden`)
        // показ блока с результатом
        this.caloriesNormOutput.textContent = Math.floor(calories.NORM + 0.5);
        this.caloriesMinOutput.textContent = Math.floor(calories.MIN + 0.5);
        this.caloriesMaxOutput.textContent = Math.floor(calories.MAX + 0.5);
    }

    hide() {
        this.root.classList.add(`counter__result--hidden`)
        // скрытие блока, очистка значений
        this.caloriesNormOutput.textContent = '';
        this.caloriesMinOutput.textContent = '';
        this.caloriesMaxOutput.textContent = '';
    }
}