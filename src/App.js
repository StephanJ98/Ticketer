import React, { Component } from 'react';
import Tesseract from 'tesseract.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploads: [],
      documents: [],
      lng: 'spa'
    };
  }

  handleChangeLng = (event) => {
    this.setState({lng: event.target.value})
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      var uploads = []
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key]
        uploads.push(URL.createObjectURL(upload))
      }
      this.setState({
        uploads: uploads
      })
    } else {
      this.setState({
        uploads: []
      })
    }
  }

  generateText = () => {
    let uploads = this.state.uploads

    for (var i = 0; i < uploads.length; i++) {
      Tesseract.recognize(
        uploads[i],
        this.state.lng
      )
        .catch(err => {
          console.error(err)
        })
        .then(result => {
          this.setState({
            documents: this.state.documents.concat({
              text: result.data.text, // Texto obtenido
              confidence: result.data.confidence // Nivel de confianza en el texto obtenido
            })
          })
        })
    }
  }

  render() {
    return (
      <div className="app">
        <section className="main">
          <label className="fileUploaderContainer">
            Añadir imagen
            <input type="file" accept=".png,.jpg,.bmp,.pbm" id="fileUploader" onChange={this.handleChange} multiple />
          </label>
          <label className="lngSelectorContainer">
            Idioma del texto
            <select id='lngSelector' defaultValue='spa' onChange={this.handleChangeLng}>
              <option value='eng'>Inglés</option>
              <option value='fra'>Francés</option>
              <option value='glg'>Gallego</option>
              <option value='spa'>Español</option>
            </select>
          </label>
          <div>
            {this.state.uploads.map((value, index) => {
              return <img key={index} src={value} alt='pequeña imagen' width="40px" height="40px" />
            })}
          </div>
          <button onClick={this.generateText} className="button">Obtener Texto</button>
        </section>
        <section className="results">
          {this.state.documents.map((value, index) => {
            return (
              <div key={index} className="resultContainer">
                <div className="result">
                  <div className="resultConfidence">
                    <small><strong>Nivel de confianza:</strong> {value.confidence} %</small>
                  </div>
                  <div className="resultText">
                    <small><strong>Texto obtenido:</strong></small> <textarea>{value.text}</textarea>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    )
  }

}

export default App;