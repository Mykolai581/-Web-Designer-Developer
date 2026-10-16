import "./drop_down_menu.css";
export class DropDownMenu {
    constructor(dropMenuButton, dropMenu, dropMenuIcon) {
        this.dropMenuButton = dropMenuButton;
        this.dropMenu = dropMenu;
        this.dropMenuIcon =
            dropMenuIcon ||
                dropMenuButton.querySelector(".menu__arrow");
        this.initEvents();
    }
    initEvents() {
        this.dropMenuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggle();
        });
        this.dropMenu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        document.addEventListener("click", (e) => {
            const target = e.target;
            if (target &&
                !this.dropMenu.contains(target) &&
                !this.dropMenuButton.contains(target)) {
                this.close();
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen()) {
                this.close();
            }
        });
        this.dropMenu.addEventListener("click", (e) => {
            const item = e.target.closest(".menu__sub-link");
            if (!item || !this.dropMenu.contains(item))
                return;
            this.close();
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
        this.dropMenu.classList.add("active");
        this.dropMenuButton.classList.add("active");
        this.dropMenuIcon?.classList.add("active");
        this.dropMenuButton.setAttribute("aria-expanded", "true");
    }
    close() {
        this.dropMenu.classList.remove("active");
        this.dropMenuButton.classList.remove("active");
        this.dropMenuIcon?.classList.remove("active");
        this.dropMenuButton.setAttribute("aria-expanded", "false");
    }
    isOpen() {
        return this.dropMenu.classList.contains("active");
    }
}
//# sourceMappingURL=drop_down_menu.js.map