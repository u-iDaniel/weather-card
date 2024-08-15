import VisualCrossingAPI from "./VisualCrossingAPI";
import DOMEditor from "./DOMEditor";

// Import classes

// Entry point class
class UnitTracker {
    #domEditor;
    #APIObj;
    #celsiusBtn;
    #fahrenheitBtn;
    #currentUnit;

    constructor(APIObj) {
        this.#domEditor = new DOMEditor();
        this.#APIObj = APIObj;

        this.#celsiusBtn = document.querySelector("#celsius-btn");
        this.#fahrenheitBtn = document.querySelector("#fahrenheit-btn");
        this.#celsiusBtn.addEventListener("click", (event) => this.convertUnit(event));
        this.#fahrenheitBtn.addEventListener("click", (event) => this.convertUnit(event));

        this.#currentUnit = "metric";
    }

    getCurrentUnit() {
        return this.#currentUnit;
    }

    convertUnit(event) {
        const unit = event.target.dataset.unit;
        if (this.#currentUnit === unit) return;
        this.#currentUnit = unit;
        this.updateActiveUnit();
        this.fetchData();
    }

    updateActiveUnit() {
        this.#domEditor.updateActiveUnit(
            this.#currentUnit === "metric" ? this.#celsiusBtn : this.#fahrenheitBtn,
            this.#currentUnit === "metric" ? this.#fahrenheitBtn : this.#celsiusBtn
        );
    }

    fetchData() {
        this.#APIObj.setCurrentUnit(this.#currentUnit);
        this.#APIObj.fetchUnitData();
    }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    const APIObj = new VisualCrossingAPI();
    const unitTracker = new UnitTracker(APIObj);
    unitTracker.fetchData();
});
