export class CustomURLSearchParams extends URLSearchParams {
  #onUpdate;

  constructor(init, options = {}) {
    super(init);
    this.#onUpdate = options?.onUpdate;
  }

  set(key, value) {
    super.set(key, value);
    this.#onUpdate(this);
  }

  replace(entries) {
    const newParams = new URLSearchParams();
    entries.forEach((value, key) => {
      if (value) {
        newParams.append(key, value);
      }
    });
    this.#onUpdate(newParams);
  }
}
