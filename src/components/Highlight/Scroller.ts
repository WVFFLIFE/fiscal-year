class Scroller {
  private ref: HTMLElement | null;

  constructor() {
    this.ref = null;
  }

  private scrollToRef(options: ScrollIntoViewOptions) {
    if (this.ref) {
      this.ref.scrollIntoView(options);
    }
  }

  scrollTo(
    ref: HTMLElement,
    options: ScrollIntoViewOptions = { block: 'center' }
  ) {
    if (!this.ref) {
      this.ref = ref;
      this.scrollToRef(options);
    }
  }

  clear() {
    this.ref = null;
  }
}

export default new Scroller();
