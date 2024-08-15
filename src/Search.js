export default class Search {
    #searchInput;
    #searchBtn;

    constructor() {
        this.#searchInput = document.querySelector("#search-input");
        this.#searchBtn = document.querySelector("#search-btn");
    }

    addEventListenerBtn(func){
        this.#searchBtn.addEventListener("click", func);
    }

    addEventListenerInput(func) {
        this.#searchInput.addEventListener("keydown", func);
    }

    clearInput() {
        this.#searchInput.value = "";
    }

    getSearchInput() {
        const location = this.#searchInput.value;
        if (!location) {
            this.handleEmptyInput();
        } else {
            this.clearInput();
            return location;
        }
    }

    handleEmptyInput() {
        throw new Error("Please enter a location.");
    }
}