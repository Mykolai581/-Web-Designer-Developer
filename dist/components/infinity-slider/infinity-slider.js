import "./infinity-slider.css";
export class InfinitySlider {
    constructor(logos) {
        this.logos = logos;
        this.container = document.createElement("div");
        this.container.classList.add("logo-slider");
        this.track = document.createElement("div");
        this.track.classList.add("logo-track");
        this.container.appendChild(this.track);
        this.init();
    }
    init() {
        const repeatCount = this.logos.length < 8 ? 4 : 2;
        for (let i = 0; i < repeatCount; i++) {
            this.track.appendChild(this.createElementLogo());
        }
    }
    createElementLogo() {
        const fragment = document.createDocumentFragment();
        this.logos.forEach((logo) => {
            const item = document.createElement("div");
            item.classList.add("logo-item");
            const img = document.createElement("img");
            img.src = logo.src;
            img.alt = logo.alt;
            img.loading = "eager";
            item.appendChild(img);
            fragment.appendChild(item);
        });
        return fragment;
    }
    getElement() {
        return this.container;
    }
}
export const logoData = [
    { src: "../../../img/Section-one/logo1.svg", alt: "Logo" },
    { src: "../../../img/Section-one/logo2.svg", alt: "Logo" },
    { src: "../../../img/Section-one/logo3.svg", alt: "Logo" },
    { src: "../../../img/Section-one/logo4.svg", alt: "Logo" },
    { src: "../../../img/Section-one/logo5.svg", alt: "Logo" },
    { src: "../../../img/Section-one/logo6.svg", alt: "Logo" },
];
//# sourceMappingURL=infinity-slider.js.map