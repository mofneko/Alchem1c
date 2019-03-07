const React = require('react')
const ReactDOM = require('react-dom')
const Application = require('./components/Application.js')
const Generator = require('./library/Generator.js')
const Path = require('path')

// Reload
function reload(state = {}) {
  ReactDOM.render(
    React.createElement(Application, state),
    document.getElementById('root')
  )
}

// Drag and Drop
function handleDragDrop() {
  document.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files.length <= 0) {
      return
    }

    const file = e.dataTransfer.files[0]
    const extension = Path.extname(file.path).replace('.', '').toLowerCase()
    const support = ['apk']

    if (!support.includes(extension)) {
      console.log(extension)
      return
    }

    reload({
      file
    })

    handleGenerate(file)
  })

  document.addEventListener('dragover', (e) =>  {
    e.preventDefault()
    e.stopPropagation()
  })
}

// action

function handleGenerate(file) {
  const generator = new Generator()
  var inputSignature = document.getElementById('signature')
  inputSignature.value = generator.idioms(file.path)
}

// Initially
handleDragDrop()
reload()