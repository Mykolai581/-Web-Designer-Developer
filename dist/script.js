import { header } from "./components/header/header";
import { InfinitySlider, logoData, } from "./components/infinity-slider/infinity-slider";
const wrapper = document.querySelector(".wrapper");
if (wrapper) {
    wrapper.insertAdjacentElement("afterbegin", header.getElement());
}
const logoSliderContainer = document.getElementById("logo-slider");
if (logoSliderContainer) {
    const sliderLogos = new InfinitySlider(logoData);
    logoSliderContainer.appendChild(sliderLogos.getElement());
}
//# sourceMappingURL=script.js.map