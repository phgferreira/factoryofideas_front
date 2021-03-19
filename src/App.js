import { Component } from 'react';
import './App.css';
import logo from './img/logo.jpg';
import { Form, Button, Alert } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import SectorService from './services/SectorService';
import IdeaService from './services/IdeaService';

class App extends Component {

  resetState = {
    idea: {
      name: '',
      contact: '',
      suggestion: '',
      sector: {
        id: 0
      }
    },

    suggestionRequired: false,
    sectorRequired: false,

  }


  constructor(props) {
    super(props);
    this.state = { ...this.resetState,
      sectors: [],
      message: false,
      variant: 'secondary',
      disabled: false
    };
  }

  componentDidMount() {
    SectorService.getSectors().then((response) => {
        this.setState({
            sectors: response.data
        })
    })
  }

  reset() {
    this.setState(this.resetState);
    this.componentDidMount();
  }

  async postIdea() {
    try {
      if (this.state.idea.suggestion === '') {
        this.setState({ suggestionRequired: 'A sugestão é obrigatória' })
      } else if (this.state.idea.sector.id === 0) {
        this.setState({ sectorRequired: 'O setor é obrigatório' })
      } else {
        this.setState({ message: 'Enviando ...', variant: 'warning', suggestionRequired: false, sectorRequired: false, disabled: true });
        IdeaService.sendEmail(this.state.idea).then((response) => {
          this.reset();
          this.setState({ message: 'Enviado com sucesso', variant: 'success', disabled: false })
        });
      }
    } catch(e) {
      console.error('Failed: ' + e);
    }
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <div className="Frame">

            <img src={logo} className="Logo" alt=""/>

            <Form.Group className="Field First-Field">
              <Form.Label>Nome (opcional)</Form.Label>
              <Form.Control name="name" placeholder="Digite seu nome"
                value={ this.state.idea.name }
                onChange={ (e) => { this.setState({ idea: { 
                  name: e.target.value,
                  contact: this.state.idea.contact,
                  suggestion: this.state.idea.suggestion,
                  sector: this.state.idea.sector
                 } }) } }></Form.Control>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Contato (opcional)</Form.Label>
              <Form.Control name="contact" placeholder="Digite um contato para retorno"
                value={ this.state.idea.contact }
                onChange={ (e) => { this.setState({ idea: {
                  name: this.state.idea.name,
                  contact: e.target.value,
                  suggestion: this.state.idea.suggestion,
                  sector: this.state.idea.sector
                } }) } }></Form.Control>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Sugestão*</Form.Label>
              <Form.Control name="suggestion" as="textarea" placeholder="Digite aqui sua sujestão" rows="5"
                value={ this.state.idea.suggestion }
                onChange={ (e) => { this.setState({ idea: {
                  name: this.state.idea.name,
                  contact: this.state.idea.contact,
                  suggestion: e.target.value,
                  sector: this.state.idea.sector
                } }) } }></Form.Control>
              <Alert show={ this.state.suggestionRequired } name="suggestionRequired" variant="danger">{ this.state.suggestionRequired }</Alert>
            </Form.Group>

            <Form.Group className="Field">
              <Form.Label>Setor*</Form.Label>
                <Form.Control name="sector" as="select"
                    onChange={ (e) => { this.setState({ idea: {
                      name: this.state.idea.name,
                      contact: this.state.idea.contact,
                      suggestion: this.state.idea.suggestion,
                      sector: { id: e.target.value }
                    } }) } }>
                      <option key="0" value="0">Escolha o setor</option>
                    {
                    this.state.sectors
                        .sort( (a, b) => a.name > b.name ? 1 : -1 )
                        .map( sector => (
                          <option key={sector.id} value={sector.id}> {sector.name} </option>
                        ))
                    }
                </Form.Control>
                <Alert show={ this.state.sectorRequired } name="sectorRequired" variant="danger">{ this.state.sectorRequired }</Alert>
            </Form.Group>

            <Button className="Send-Button" variant="primary" size="lg"
              disabled={ this.state.disabled } onClick={ () => this.postIdea() }>Enviar</Button>

            <Alert show={ this.state.message } variant={ this.state.variant }>{ this.state.message }</Alert>

          </div>
        </header>
      </div>
    );
  }
}

export default App;
