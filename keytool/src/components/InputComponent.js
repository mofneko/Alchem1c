import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import CardText from 'material-ui/Card/CardText'

class InputComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const divOptions = {
      style: {
        display: 'flex',
        alignSelf: 'stretch',
        width: '100%'
      }
    }

    return React.createElement('div', divOptions, 
      this.makeFilePropertyPanel()    
    )
  }

  // make

  makeFilePropertyPanel() {
    const divOptions = {
      style: {
        flex: 1.5,
        padding: '10px'
      }
    }

    const paperOptions = {
      style: {
        width: '100%',
        height: '100%'
      }
    }

    return (
      <div style={divOptions.style}>
        <Paper style={paperOptions.style}>
          {this.makeDragAndDropZoneElement()}
          {this.makeApkFileDescriptionElement()}
          {this.makeSignatureElement()}
        </Paper>
      </div>
    )
  }

  makeDragAndDropZoneElement() {
    const divOptions = {
      style: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px'
      }
    }

    const imgOptions = {
      style: {
        width: '300px',
        height: '300px',
        border: '1px solid black'
      },
      src: './res/main.jpg'
    }

    return React.createElement('div', divOptions,
      React.createElement('img', imgOptions)
    )
  }

  makeApkFileDescriptionElement() {
    let text
    if (this.props.file !== undefined) {
      text = this.props.file.path
    } else {
      text = 'Waiting for apk file to be Drag & Drop.....'
    }

    const divOptions = {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
      }
    }

    const textOptions = {
      style: {
        textAlign: 'center'
      }
    }

    return React.createElement('div', divOptions, 
      React.createElement(CardText, textOptions, text)
    )
  }

  makeSignatureElement() {
    const divOptions = {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
      }
    }

    const textFieldOptions = {
      id: 'signature',
      style: {
        width: '80%'
      }
    }

    return React.createElement('div', divOptions, 
      React.createElement(TextField, textFieldOptions)
    )
  }
}

module.exports = InputComponent