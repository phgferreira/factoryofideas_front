import React, { Component } from 'react';
import './App.css';
import { Form, Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';

const sectors = [
  'Escolha um setor',
  'Tecnologia da Informação',
  'Controle de Infecção',
  'Nutição',
  'Faturamento',
  'Gestão da Qualidade'
]

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      suggestion: '',
      sector: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async postIdea() {
    try {
      let result = await fetch('https://webhook.site/68e70d52-1c5b-4448-9e26-06d1f08a8a4a', {
        method: 'post',
        mode: 'no-cors',
        headers: {
            
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          suggestion: this.state.suggestion,
          sector: this.state.sector
        })
      })

      console.log('Sucess: ' + result);

    } catch(e) {
      console.error('Failed: ' + e);
    }
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <div className="Frame">
            <Form.Group className="Field First-Field">
              <Form.Label>Nome (opcional)</Form.Label>
              <Form.Control name="name" placeholder="Digite seu nome"
                value={ this.state.name }
                onChange={ this.onChange }></Form.Control>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Sugestão</Form.Label>
              <Form.Control name="suggestion" as="textarea" placeholder="Digite aqui sua sujestão" rows="10"
                value={ this.state.suggestion }
                onChange={ this.onChange }></Form.Control>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Setor</Form.Label>
              <Form.Control name="sector" as="select"
                value={ this.state.sector }
                onChange={ this.onChange }>
                {
                  sectors
                    .sort( (a, b) => a > b ? 1 : -1 )
                    .map( sector => (
                      <option key={sector} value={sector}> {sector} </option>
                    ))
                }
              </Form.Control>
            </Form.Group>

            <Button onClick={ () => this.postIdea() } className="Send-Button" variant="primary" size="lg">Enviar</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
