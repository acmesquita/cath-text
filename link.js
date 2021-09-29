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