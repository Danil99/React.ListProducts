import React from 'react';

import Button from './Button.jsx';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let title = this.state.title;
    if(title != '') {
      this.props.onAdd(title);
      this.setState({title: ''});
    }
  }

  handleChange(event) {
    let title = event.target.value;

    this.setState({title});
  }

  render() {
    return (
      <form className="addh" onSubmit={this.handleSubmit}>
        <input value={this.state.title} onChange={this.handleChange} placeholder="Добавить задачу" />
        <Button className="add">Добавить</Button>
      </form>
    )
  }
};

export default Form;
