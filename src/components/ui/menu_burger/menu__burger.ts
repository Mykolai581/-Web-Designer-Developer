import "./menu_burger.css";

export class MenuBurger {
  private menu: HTMLElement;
  private menuItems: HTMLElement;
  private menuBurgerButton: HTMLElement;

  constructor(
    menu: HTMLElement,
    menuItems: HTMLElement,
    menuBurgerButton: HTMLElement
  ) {
    this.menu = menu;
    this.menuItems = menuItems;
    this.menuBurgerButton = menuBurgerButton;
  }

  public init() {
    this.menuBurgerButton.setAttribute("aria-expanded", "false");

    this.menuBurgerButton.addEventListener("click", () => {
      this.toggle();
    });

    this.menuItems.addEventListener("click", (e) => {
      const item = (e.target as HTMLElement).closest(".menu__item");

      if (!item || !this.menuBurgerButton.classList.contains("active")) return;

      this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });
  }

  private toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    this.menu.classList.add("active");
    this.menuBurgerButton.classList.add("active");
    this.menuBurgerButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("lock");
  }

  private close(): void {
    this.menu.classList.remove("active");
    this.menuBurgerButton.classList.remove("active");
    this.menuBurgerButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("lock");
  }

  private isOpen(): boolean {
    return this.menuBurgerButton.classList.contains("active");
  }
}
