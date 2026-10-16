import "./infinity-slider.css";
interface Logo {
    src: string;
    alt: string;
}
export declare class InfinitySlider {
    private container;
    private track;
    private logos;
    constructor(logos: Logo[]);
    private init;
    private createElementLogo;
    getElement(): HTMLElement;
}
export declare const logoData: Logo[];
export {};
//# sourceMappingURL=infinity-slider.d.ts.map