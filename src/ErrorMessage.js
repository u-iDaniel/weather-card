export default class ErrorMessage {
    #errorEl;

    constructor() {
        this.#errorEl = document.querySelector("#error-message");
    }

    displayError(message) {
        this.#errorEl.textContent = message;
        this.#errorEl.style.display = "block";
    }

    clearError() {
        this.#errorEl.textContent = "";
        this.#errorEl.style.display = "none";
    }
}