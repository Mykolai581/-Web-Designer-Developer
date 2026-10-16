import "./header.css";
import { DropDownMenu } from "../ui/drop_down_menu/drop_down_menu";
import { MenuBurger } from "../ui/menu_burger/menu__burger";

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

class LogoComponent {
  constructor(private imgSrc: string, private linkHref: string) {}

  public render(): HTMLElement {
    const logoElement = document.createElement("div");
    const logoLink = document.createElement("a");
    const logoImg = document.createElement("img");

    logoElement.classList.add("header__logo", "Logo");
    logoLink.classList.add("logo__link");
    logoImg.classList.add("logo__image");

    logoLink.href = this.linkHref;
    logoImg.src = this.imgSrc;
    logoImg.alt = "Logo";

    logoLink.appendChild(logoImg);
    logoElement.appendChild(logoLink);

    return logoElement;
  }
}

class HeaderButtonComponent {
  constructor(private text: string, private onClick?: () => void) {}

  public render(): HTMLElement {
    const buttonBody = document.createElement("div");
    const buttonLink = document.createElement("a");
    buttonBody.classList.add("header__button");
    buttonLink.classList.add("button__link");
    buttonLink.href = "#";
    buttonLink.textContent = this.text;

    if (this.onClick) {
      buttonLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.onClick?.();
      });
    }

    buttonBody.appendChild(buttonLink);
    return buttonBody;
  }
}

class BurgerButtonComponent {
  public render(): HTMLButtonElement {
    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-burger");

    for (let i = 0; i < 3; i++) {
      menuButton.appendChild(document.createElement("span"));
    }

    return menuButton;
  }
}

class MenuComponent {
  constructor(private links: HeaderLink[]) {}

  public render(): { menuContainer: HTMLElement; ulElement: HTMLElement } {
    const menuContainer = document.createElement("div");
    const navElement = document.createElement("nav");
    const ulElement: HTMLUListElement = document.createElement("ul");

    menuContainer.classList.add("header__menu", "menu");
    navElement.classList.add("menu__body");
    ulElement.classList.add("menu__list");

    this.links.forEach((link) => {
      const liElement = this.createMenuItem(link);
      ulElement.appendChild(liElement);
    });

    navElement.appendChild(ulElement);
    menuContainer.appendChild(navElement);

    return { menuContainer, ulElement };
  }

  private createMenuItem(link: HeaderLink): HTMLElement {
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");

    liElement.classList.add("menu__item");
    aElement.classList.add("menu__link");
    aElement.href = link.href;
    aElement.textContent = link.text;

    if (link.pages && link.pages.length > 0) {
      liElement.classList.add("menu__item--has-children");

      const icon = document.createElement("img");
      icon.src = "../../../img/icon/Vector.svg";
      icon.alt = "icon";
      icon.classList.add("menu__arrow");
      aElement.append(icon);

      aElement.addEventListener("click", (e: MouseEvent) => e.preventDefault());

      const subUl = this.createSubMenu(link.pages);
      liElement.appendChild(aElement);
      liElement.appendChild(subUl);

      new DropDownMenu(aElement, subUl, icon);
    } else {
      liElement.appendChild(aElement);
    }

    return liElement;
  }

  private createSubMenu(pages: string[]): HTMLUListElement {
    const subUl = document.createElement("ul");
    subUl.classList.add("menu__sub-list");

    pages.forEach((pageName) => {
      const subLi = document.createElement("li");
      const subA = document.createElement("a");

      subLi.classList.add("menu__sub-item");
      subA.classList.add("menu__sub-link");
      subA.href = "#";
      subA.textContent = pageName;

      subLi.appendChild(subA);
      subUl.appendChild(subLi);
    });

    return subUl;
  }
}

export class Header {
  private options: HeaderOptions;
  private element: HTMLElement | null = null;
  private menuBurgerInstance: MenuBurger | null = null;

  constructor(options: HeaderOptions) {
    this.options = options;
  }

  public getElement(): HTMLElement {
    if (!this.element) {
      this.element = this.render();
    }
    return this.element;
  }

  public updateMenu(newLinks: HeaderLink[]): void {
    this.options.menuLinks = newLinks;
    if (!this.element) return;

    const parent = this.element.parentElement;
    const newElement = this.render();

    if (parent) {
      parent.replaceChild(newElement, this.element);
    }
    this.element = newElement;
  }

  public destroy(): void {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    this.menuBurgerInstance = null;
  }

  private render(): HTMLElement {
    const headerElement = document.createElement("header");
    const headerContainer = document.createElement("div");

    headerElement.classList.add("header");
    headerContainer.classList.add("header__container");

    const logo = new LogoComponent(
      this.options.logoImgSrc,
      this.options.logoSrc
    );
    const navMenu = new MenuComponent(this.options.menuLinks);

    const actionButton = new HeaderButtonComponent(
      this.options.buttonText,
      this.options.onButtonClick
    );
    const burgerButtonComp = new BurgerButtonComponent();

    const { menuContainer, ulElement } = navMenu.render();
    const burgerButton = burgerButtonComp.render();

    this.menuBurgerInstance = new MenuBurger(
      menuContainer,
      ulElement,
      burgerButton
    );
    this.menuBurgerInstance.init();

    headerContainer.appendChild(logo.render());
    headerContainer.appendChild(menuContainer);
    headerContainer.appendChild(actionButton.render());
    headerContainer.appendChild(burgerButton);

    headerElement.appendChild(headerContainer);

    if (window.innerHeight > 0) {
      headerElement.classList.add("down");
    }

    return headerElement;
  }
}

const links: HeaderLink[] = [
  { text: "SERVICES", href: "#" },
  { text: "WORK", href: "#" },
  { text: "ABOUT", href: "#" },
  { text: "BLOG", href: "#" },
  {
    text: "PAGES",
    href: "#",
    pages: ["Style Guide", "Licenses", "Changelog"],
  },
];

export const header = new Header({
  logoImgSrc: "../../../img/icon/Logo.svg",
  logoSrc: "#",
  menuLinks: links,
  buttonText: "LET’S TALK",
});
