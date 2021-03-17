import React, { Component } from 'react';
import './App.css';
import { Form, Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorComponent from './components/SectorComponent';
import SectorService from './services/SectorService';

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
      name: 'Nique',
      suggestion: 'Sugestão de teste',
      sector: {
        id: '',
        name: ''
      }
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
      SectorService.sendMail(this.state);
      console.log('Success')
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

            <SectorComponent/>

            <Button onClick={ () => this.postIdea() } className="Send-Button" variant="primary" size="lg">Enviar</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
