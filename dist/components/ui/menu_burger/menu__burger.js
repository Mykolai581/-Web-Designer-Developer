import "./menu_burger.css";
export class MenuBurger {
    constructor(menu, menuItems, menuBurgerButton) {
        this.menu = menu;
        this.menuItems = menuItems;
        this.menuBurgerButton = menuBurgerButton;
    }
    init() {
        this.menuBurgerButton.setAttribute("aria-expanded", "false");
        this.menuBurgerButton.addEventListener("click", () => {
            this.toggle();
        });
        this.menuItems.addEventListener("click", (e) => {
            const item = e.target.closest(".menu__item");
            if (!item || !this.menuBurgerButton.classList.contains("active"))
                return;
            this.close();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen()) {
                this.close();
            }
        });
    }
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        this.menu.classList.add("active");
        this.menuBurgerButton.classList.add("active");
        this.menuBurgerButton.setAttribute("aria-expanded", "true");
        document.body.classList.add("lock");
    }
    close() {
        this.menu.classList.remove("active");
        this.menuBurgerButton.classList.remove("active");
        this.menuBurgerButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("lock");
    }
    isOpen() {
        return this.menuBurgerButton.classList.contains("active");
    }
}
//# sourceMappingURL=menu__burger.js.map