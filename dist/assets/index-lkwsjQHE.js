(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      (t.credentials =
        e.crossOrigin === `use-credentials`
          ? `include`
          : e.crossOrigin === `anonymous`
          ? `omit`
          : `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var e = class {
    constructor(e, t, n) {
      (this.dropMenuButton = e),
        (this.dropMenu = t),
        (this.dropMenuIcon = n || e.querySelector(`.menu__arrow`)),
        this.initEvents();
    }
    initEvents() {
      this.dropMenuButton.addEventListener(`click`, (e) => {
        e.stopPropagation(), this.toggle();
      }),
        this.dropMenu.addEventListener(`click`, (e) => {
          e.stopPropagation();
        }),
        document.addEventListener(`click`, (e) => {
          let t = e.target;
          t &&
            !this.dropMenu.contains(t) &&
            !this.dropMenuButton.contains(t) &&
            this.close();
        }),
        document.addEventListener(`keydown`, (e) => {
          e.key === `Escape` && this.isOpen() && this.close();
        }),
        this.dropMenu.addEventListener(`click`, (e) => {
          let t = e.target.closest(`.menu__sub-link`);
          t && this.dropMenu.contains(t) && this.close();
        });
    }
    toggle() {
      this.isOpen() ? this.close() : this.open();
    }
    open() {
      this.dropMenu.classList.add(`active`),
        this.dropMenuButton.classList.add(`active`),
        this.dropMenuIcon?.classList.add(`active`),
        this.dropMenuButton.setAttribute(`aria-expanded`, `true`);
    }
    close() {
      this.dropMenu.classList.remove(`active`),
        this.dropMenuButton.classList.remove(`active`),
        this.dropMenuIcon?.classList.remove(`active`),
        this.dropMenuButton.setAttribute(`aria-expanded`, `false`);
    }
    isOpen() {
      return this.dropMenu.classList.contains(`active`);
    }
  },
  t = class {
    constructor(e, t, n) {
      (this.menu = e), (this.menuItems = t), (this.menuBurgerButton = n);
    }
    init() {
      this.menuBurgerButton.setAttribute(`aria-expanded`, `false`),
        this.menuBurgerButton.addEventListener(`click`, () => {
          this.toggle();
        }),
        this.menuItems.addEventListener(`click`, (e) => {
          e.target.closest(`.menu__item`) &&
            this.menuBurgerButton.classList.contains(`active`) &&
            this.close();
        }),
        document.addEventListener(`keydown`, (e) => {
          e.key === `Escape` && this.isOpen() && this.close();
        });
    }
    toggle() {
      this.isOpen() ? this.close() : this.open();
    }
    open() {
      this.menu.classList.add(`active`),
        this.menuBurgerButton.classList.add(`active`),
        this.menuBurgerButton.setAttribute(`aria-expanded`, `true`),
        document.body.classList.add(`lock`);
    }
    close() {
      this.menu.classList.remove(`active`),
        this.menuBurgerButton.classList.remove(`active`),
        this.menuBurgerButton.setAttribute(`aria-expanded`, `false`),
        document.body.classList.remove(`lock`);
    }
    isOpen() {
      return this.menuBurgerButton.classList.contains(`active`);
    }
  },
  n = class {
    constructor(e, t) {
      (this.imgSrc = e), (this.linkHref = t);
    }
    render() {
      let e = document.createElement(`div`),
        t = document.createElement(`a`),
        n = document.createElement(`img`);
      return (
        e.classList.add(`header__logo`, `Logo`),
        t.classList.add(`logo__link`),
        n.classList.add(`logo__image`),
        (t.href = this.linkHref),
        (n.src = this.imgSrc),
        (n.alt = `Logo`),
        t.appendChild(n),
        e.appendChild(t),
        e
      );
    }
  },
  r = class {
    constructor(e, t) {
      (this.text = e), (this.onClick = t);
    }
    render() {
      let e = document.createElement(`div`),
        t = document.createElement(`a`);
      return (
        e.classList.add(`header__button`),
        t.classList.add(`button__link`),
        (t.href = `#`),
        (t.textContent = this.text),
        this.onClick &&
          t.addEventListener(`click`, (e) => {
            e.preventDefault(), this.onClick?.();
          }),
        e.appendChild(t),
        e
      );
    }
  },
  i = class {
    render() {
      let e = document.createElement(`button`);
      e.classList.add(`menu-burger`);
      for (let t = 0; t < 3; t++) e.appendChild(document.createElement(`span`));
      return e;
    }
  },
  a = class {
    constructor(e) {
      this.links = e;
    }
    render() {
      let e = document.createElement(`div`),
        t = document.createElement(`nav`),
        n = document.createElement(`ul`);
      return (
        e.classList.add(`header__menu`, `menu`),
        t.classList.add(`menu__body`),
        n.classList.add(`menu__list`),
        this.links.forEach((e) => {
          let t = this.createMenuItem(e);
          n.appendChild(t);
        }),
        t.appendChild(n),
        e.appendChild(t),
        { menuContainer: e, ulElement: n }
      );
    }
    createMenuItem(t) {
      let n = document.createElement(`li`),
        r = document.createElement(`a`);
      if (
        (n.classList.add(`menu__item`),
        r.classList.add(`menu__link`),
        (r.href = t.href),
        (r.textContent = t.text),
        t.pages && t.pages.length > 0)
      ) {
        n.classList.add(`menu__item--has-children`);
        let i = document.createElement(`img`);
        (i.src = `../../../img/icon/Vector.svg`),
          (i.alt = `icon`),
          i.classList.add(`menu__arrow`),
          r.append(i),
          r.addEventListener(`click`, (e) => e.preventDefault());
        let a = this.createSubMenu(t.pages);
        n.appendChild(r), n.appendChild(a), new e(r, a, i);
      } else n.appendChild(r);
      return n;
    }
    createSubMenu(e) {
      let t = document.createElement(`ul`);
      return (
        t.classList.add(`menu__sub-list`),
        e.forEach((e) => {
          let n = document.createElement(`li`),
            r = document.createElement(`a`);
          n.classList.add(`menu__sub-item`),
            r.classList.add(`menu__sub-link`),
            (r.href = `#`),
            (r.textContent = e),
            n.appendChild(r),
            t.appendChild(n);
        }),
        t
      );
    }
  },
  o = new (class {
    constructor(e) {
      (this.element = null),
        (this.menuBurgerInstance = null),
        (this.options = e);
    }
    getElement() {
      return (this.element ||= this.render()), this.element;
    }
    updateMenu(e) {
      if (((this.options.menuLinks = e), !this.element)) return;
      let t = this.element.parentElement,
        n = this.render();
      t && t.replaceChild(n, this.element), (this.element = n);
    }
    destroy() {
      (this.element &&= (this.element.remove(), null)),
        (this.menuBurgerInstance = null);
    }
    render() {
      let e = document.createElement(`header`),
        o = document.createElement(`div`);
      e.classList.add(`header`), o.classList.add(`header__container`);
      let s = new n(this.options.logoImgSrc, this.options.logoSrc),
        c = new a(this.options.menuLinks),
        l = new r(this.options.buttonText, this.options.onButtonClick),
        u = new i(),
        { menuContainer: d, ulElement: f } = c.render(),
        p = u.render();
      return (
        (this.menuBurgerInstance = new t(d, f, p)),
        this.menuBurgerInstance.init(),
        o.appendChild(s.render()),
        o.appendChild(d),
        o.appendChild(l.render()),
        o.appendChild(p),
        e.appendChild(o),
        window.innerHeight > 0 && e.classList.add(`down`),
        e
      );
    }
  })({
    logoImgSrc: `../../../img/icon/Logo.svg`,
    logoSrc: `#`,
    menuLinks: [
      { text: `SERVICES`, href: `#` },
      { text: `WORK`, href: `#` },
      { text: `ABOUT`, href: `#` },
      { text: `BLOG`, href: `#` },
      {
        text: `PAGES`,
        href: `#`,
        pages: [`Style Guide`, `Licenses`, `Changelog`],
      },
    ],
    buttonText: `LET’S TALK`,
  }),
  s = class {
    constructor(e) {
      (this.logos = e),
        (this.container = document.createElement(`div`)),
        this.container.classList.add(`logo-slider`),
        (this.track = document.createElement(`div`)),
        this.track.classList.add(`logo-track`),
        this.container.appendChild(this.track),
        this.init();
    }
    init() {
      let e = this.logos.length < 8 ? 4 : 2;
      for (let t = 0; t < e; t++)
        this.track.appendChild(this.createElementLogo());
    }
    createElementLogo() {
      let e = document.createDocumentFragment();
      return (
        this.logos.forEach((t) => {
          let n = document.createElement(`div`);
          n.classList.add(`logo-item`);
          let r = document.createElement(`img`);
          (r.src = t.src),
            (r.alt = t.alt),
            (r.loading = `eager`),
            n.appendChild(r),
            e.appendChild(n);
        }),
        e
      );
    }
    getElement() {
      return this.container;
    }
  },
  c = [
    { src: `../../../img/Section-one/logo1.svg`, alt: `Logo` },
    { src: `../../../img/Section-one/logo2.svg`, alt: `Logo` },
    { src: `../../../img/Section-one/logo3.svg`, alt: `Logo` },
    { src: `../../../img/Section-one/logo4.svg`, alt: `Logo` },
    { src: `../../../img/Section-one/logo5.svg`, alt: `Logo` },
    { src: `../../../img/Section-one/logo6.svg`, alt: `Logo` },
  ],
  l = document.querySelector(`.wrapper`);
l && l.insertAdjacentElement(`afterbegin`, o.getElement());
var u = document.getElementById(`logo-slider`);
if (u) {
  let e = new s(c);
  u.appendChild(e.getElement());
}
