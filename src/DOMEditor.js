import "./style.css";

function importAll(r) {
    let icons = {};
    r.keys().forEach((item) => {
      icons[item.replace('./', '')] = r(item);
    });
    return icons;
}
  
// key: filename of svg icon, value: path to svg icon relative from dist/
const weatherIcons = importAll(require.context('./images/weather-icons', false, /\.svg$/));

export default class DOMEditor {
    #tempEl;
    #locationEl;
    #humidityEl;
    #windEl;
    #iconEl;

    constructor() {
        this.#tempEl = document.querySelector("#temp");
        this.#locationEl = document.querySelector("#location");
        this.#humidityEl = document.querySelector("#humid-pct");
        this.#windEl = document.querySelector("#wind-spd");
        this.#iconEl = document.querySelector("#icon");
    }

    extractCity(address) {
        return address.split(",")[0];
    }

    displayWeather(address, dataObj, unitObj) {
        this.#tempEl.textContent = `${Math.round(dataObj.temp)}${unitObj.temp}`;
        this.#locationEl.textContent = this.extractCity(address);
        this.#humidityEl.textContent = `${Math.round(dataObj.humidity)}%`;
        this.#windEl.textContent = `${Math.round(dataObj.windspeed)} ${unitObj.windspeed}`;
    }

    renderIcon(icon) {
        this.#iconEl.src = weatherIcons[`${icon}.svg`];   
        this.#iconEl.onerror = this.iconError.bind(this);
        this.#iconEl.alt = icon;
    }

    iconError() {
        this.#iconEl.src = weatherIcons['not-available.svg'];
        this.#iconEl.title = "Icon not found";
        this.#iconEl.alt = "Not Available";
    }

    updateActiveUnit(activeButtonEl, inactiveButtonEl) {
        activeButtonEl.classList.add("active");
        inactiveButtonEl.classList.remove("active");
    }
}