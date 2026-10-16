import "./drop_down_menu.css";
export declare class DropDownMenu {
    private dropMenuButton;
    private dropMenu;
    private dropMenuIcon;
    constructor(dropMenuButton: HTMLElement, dropMenu: HTMLUListElement, dropMenuIcon?: HTMLImageElement);
    initEvents(): void;
    toggle(): void;
    open(): void;
    close(): void;
    isOpen(): boolean;
}
//# sourceMappingURL=drop_down_menu.d.ts.map