class Editor {
  constructor() {
    this.quill = new Quill('#editor', {
      theme: 'bubble',
    });
    this.addSaveListener()
    this.queryContentLocal()
  }

  addSaveListener() {
    this.quill.on('text-change', this.saveInLocal.bind(this));
  }

  queryContentLocal() {
    let content = JSON.parse(localStorage.getItem('content'))
    if (content) {
      this.quill.setContents(content)
    }
  }

  saveInLocal() {
    let delta = this.quill.getContents();
    localStorage.setItem('content', JSON.stringify(delta))
  }
}

class Links {
  #links
  #linksEl

  constructor() {
    this.#linksEl = document.querySelector('#links')

    this.loadingLink()
    this.showLinks()
  }

  // inicializando a lista com os links salvos
  loadingLink() {
    const links = JSON.parse(localStorage.getItem('links'))
    this.#links = links || []
  }

  // adicionar link
  addLink(link) {
    this.#links.push(link)
    this.saveLinks()
    this.showLink(link)
  }

  //removendo um link
  removeLink(link) {
    this.#links = this.#links.filter(linkItem => linkItem.id !== link.id)
    this.saveLinks()
  }

  //salvando a lista de links
  saveLinks() {
    localStorage.setItem('links', JSON.stringify(this.#links))
  }

  // craindo link
  createContentLink(link) {
    const child = document.createElement('span')
    child.classList.add('link')

    const linkEl = document.createElement('a')
    linkEl.innerHTML = link.title
    linkEl.href = link.href
    child.appendChild(linkEl)


    const btn = document.createElement('button')
    btn.innerHTML = "X"
    btn.addEventListener('click', function () {
      this.removeLink(link)
      this.showLinks()
    }.bind(this))
    child.appendChild(btn)

    return child
  }

  showLink(link) {
    this.#linksEl.appendChild(this.createContentLink(link))
  }

  showLinks() {
    this.#linksEl.innerHTML = ""
    this.#links.forEach(linkItem => {
      this.showLink(linkItem)
    });
  }
}

class Tools {
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

new Editor()
const links = new Links()
new Tools(links)

