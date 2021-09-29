class ToolsEvents {
  #btnLinks
  #form
  #linkRef

  constructor(linkRef) {
    this.#linkRef = linkRef
    this.#btnLinks = document.querySelector('#btnLinks')
    this.#form = document.querySelector('#form')

    this.addEventToogle()
    this.addEventFormSubmit()
  }

  addEventFormSubmit() {
    this.#form.addEventListener('submit', function (event) {
      event.preventDefault()
      this.createLink()
    }.bind(this))
  }

  addEventToogle() {
    this.#btnLinks.addEventListener('click', this.toogle.bind(this))
  }

  createLink() {
    const formData = new FormData(this.#form)
    const link = this.formDataToJSON(formData)
    link.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

    this.#linkRef.addLink(link)
    this.formReset()
  }

  formDataToJSON(formData) {
    let object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    return object;
  }

  formReset() {
    this.#form.reset();
    this.toogle()
  }

  toogle() {
    if (this.#form.className == 'show') {
      this.#form.classList.remove('show')
      this.#form.classList.add('hide')
    } else {
      this.#form.classList.remove('hide')
      this.#form.classList.add('show')
    }
  }
}