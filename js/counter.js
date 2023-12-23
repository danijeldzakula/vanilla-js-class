const COUNTER_STORAGE_KEY = "counter";

class Counter {
  constructor(selector, value = 10, limit = null) {
    this.selector = selector;
    this.limit = limit;
    this.value = LocalStorageHandler.get(COUNTER_STORAGE_KEY) || value;

    this.bindDecrement();
    this.bindIncrement();
    this.getDisabled();
    this.getValue();
  }

  bindDecrement() {
    const element = this.selector.querySelector(".btn-decrement");

    if (element) {
      element.addEventListener("click", () => {
        if (this.value < 1) {
          this.getDisabled();
          LocalStorageHandler.set(COUNTER_STORAGE_KEY, this.value);
          return;
        }

        this.value -= 1;
        this.getValue();
        this.getDisabled();
        LocalStorageHandler.set(COUNTER_STORAGE_KEY, this.value);
      });
    }
  }

  bindIncrement() {
    const element = this.selector.querySelector(".btn-increment");

    if (element) {
      element.addEventListener("click", () => {
        this.value += 1;
        this.getValue();
        this.getDisabled();
        LocalStorageHandler.set(COUNTER_STORAGE_KEY, this.value);
      });
    }
  }

  getDisabled() {
    const elementDecrement = this.selector.querySelector(".btn-decrement");

    if (this.value > 0) {
      elementDecrement.disabled = false;
    } else {
      elementDecrement.disabled = true;
    }

    const elementIncrement = this.selector.querySelector(".btn-increment");

    if (this.limit) {
      if (this.value < this.limit) {
        elementIncrement.disabled = false;
      } else {
        elementIncrement.disabled = true;
      }
    }
  }

  getValue() {
    const element = this.selector.querySelector(".counter-value");
    element.innerHTML = this.value;
  }
}
