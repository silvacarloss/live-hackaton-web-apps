import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  
  // Cada componente precisa de sua função render. Ela é o que
  // Define o que será exibido em cada um dos componentes
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Ideia </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="titulo">Título</Label>
              <Input
                type="text"
                name="titulo"
                value={this.state.activeItem.titulo}
                onChange={this.handleChange}
                placeholder="Título da ideia"
              />
            </FormGroup>
            <FormGroup>
              <Label for="descricao">Descrição</Label>
              <Input
                type="textarea"
                name="descricao"
                value={this.state.activeItem.descricao}
                onChange={this.handleChange}
                placeholder="Descrição da ideia"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
