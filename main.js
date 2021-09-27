class Editor {
  constructor() {
    this.quill = new Quill('#editor', {
      theme: 'bubble',
    });
    this.quill.on('text-change', saveInLocal);
    queryContentLocal()
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

new Editor()