import "./drop_down_menu.css";

export class DropDownMenu {
  private dropMenuButton: HTMLElement;
  private dropMenu: HTMLUListElement;
  private dropMenuIcon: HTMLImageElement | null;

  constructor(
    dropMenuButton: HTMLElement,
    dropMenu: HTMLUListElement,
    dropMenuIcon?: HTMLImageElement
  ) {
    this.dropMenuButton = dropMenuButton;
    this.dropMenu = dropMenu;
    this.dropMenuIcon =
      dropMenuIcon ||
      dropMenuButton.querySelector<HTMLImageElement>(".menu__arrow");

    this.initEvents();
  }

  public initEvents(): void {
    this.dropMenuButton.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      this.toggle();
    });

    this.dropMenu.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      const target = e.target as Node | null;

      if (
        target &&
        !this.dropMenu.contains(target) &&
        !this.dropMenuButton.contains(target)
      ) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    this.dropMenu.addEventListener("click", (e) => {
      const item = (e.target as HTMLElement).closest(".menu__sub-link");

      if (!item || !this.dropMenu.contains(item)) return;

      this.close();
    });
  }

  public toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  public open(): void {
    this.dropMenu.classList.add("active");
    this.dropMenuButton.classList.add("active");
    this.dropMenuIcon?.classList.add("active");
    this.dropMenuButton.setAttribute("aria-expanded", "true");
  }

  public close(): void {
    this.dropMenu.classList.remove("active");
    this.dropMenuButton.classList.remove("active");
    this.dropMenuIcon?.classList.remove("active");
    this.dropMenuButton.setAttribute("aria-expanded", "false");
  }

  public isOpen(): boolean {
    return this.dropMenu.classList.contains("active");
  }
}
