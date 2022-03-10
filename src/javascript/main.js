const quill = new Quill('#editor', {
  theme: 'bubble',
});
new Editor(quill)
const links = new Links()
new ToolsEvents(links)
