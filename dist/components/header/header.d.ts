import "./header.css";
interface HeaderLink {
    text: string;
    href: string;
    pages?: string[];
}
interface HeaderOptions {
    logoImgSrc: string;
    logoSrc: string;
    menuLinks: HeaderLink[];
    buttonText: string;
    onButtonClick?: () => void;
}
export declare class Header {
    private options;
    private element;
    private menuBurgerInstance;
    constructor(options: HeaderOptions);
    getElement(): HTMLElement;
    updateMenu(newLinks: HeaderLink[]): void;
    destroy(): void;
    private render;
}
export declare const header: Header;
export {};
//# sourceMappingURL=header.d.ts.map