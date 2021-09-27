const quill = new Quill('#editor', {
  theme: 'bubble',
});

function queryContentLocal() {
  let content = JSON.parse(localStorage.getItem('content'))
  if (content) {
    quill.setContents(content)
  }
}

function saveInLocal() {
  let delta = quill.getContents();
  localStorage.setItem('content', JSON.stringify(delta))
}

quill.on('text-change', saveInLocal);
queryContentLocal()
