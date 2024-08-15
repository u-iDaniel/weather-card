import Search from './Search.js';
import DOMEditor from './DOMEditor.js';
import ErrorMessage from './ErrorMessage.js';

const API_KEY = process.env.API_KEY;

export default class VisualCrossingAPI {
    #searchObj;
    #currentLocation;
    #currentUnit;
    #domEditor;
    #errorMessage;

    constructor() {
        this.#searchObj = new Search();
        this.#domEditor = new DOMEditor();
        this.#errorMessage = new ErrorMessage();
        this.#searchObj.addEventListenerBtn(this.fetchLocationData.bind(this));
        this.#searchObj.addEventListenerInput((event) => {
            if (event.key === "Enter") {
                this.fetchLocationData();
            }
        });

        this.#currentLocation = "New York, NY";
        this.#currentUnit = "metric";
    }

    buildQuery(location = "") {
        if (location === "") {
            location = this.#searchObj.getSearchInput();
        }
        let unit = this.#currentUnit;
        if (unit === "imperial") {unit = "us";} // API uses "us" for imperial units
        this.query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${API_KEY}&contentType=json`;
    }

    setCurrentLocation(location) {
        this.#currentLocation = location;
    }

    setCurrentUnit(unit) {
        this.#currentUnit = unit;
    }

    async fetchData() {
        try {
            const response = await fetch(this.query);
            const data = await response.json();
            console.log(data);
            this.setCurrentLocation(data.resolvedAddress);
            this.updateDOM(data.address, data.currentConditions, this.#currentUnit);
            this.#errorMessage.clearError();
        } catch {
            this.#errorMessage.displayError("Location not found.");
        }
    }

    async fetchLocationData() {
        try {
            this.buildQuery();
            this.fetchData();
        } catch (err) {
            this.#errorMessage.displayError(err.message);
        }
    }

    async fetchUnitData() {
        this.buildQuery(this.#currentLocation);
        this.fetchData();
    }

    updateDOM(location, currentConditions) {
        const dataObj = {
            temp: currentConditions.temp,
            humidity: currentConditions.humidity,
            windspeed: currentConditions.windspeed,
            icon: currentConditions.icon
        };
        const unitObj = this.createUnitObj();
        this.#domEditor.displayWeather(location, dataObj, unitObj);
        this.#domEditor.renderIcon(dataObj.icon);
    }

    createUnitObj() {
        if (this.#currentUnit === "metric") {
            return {
                temp: "°C",
                windspeed: "km/h"
            };
        } else if (this.#currentUnit === "imperial") {
            return {
                temp: "°F",
                windspeed: "mph"
            };
        }
    }
}
