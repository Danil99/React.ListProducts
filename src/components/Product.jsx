import React from 'react';

import Button from './Button.jsx';
import Checkbox from './Checkbox.jsx';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidUpdate() {
    if(this.state.editing) {
      this.refs.title.focus();
      this.refs.title.select();
    };
  }

  handleSubmit(event) {
    event.preventDefault();
		let title = this.refs.title.value;
		if(title != '') {
      this.props.onEdit(this.props.id, title);
  		this.setState({editing: false});
    }
  }

  stateEdit() {
    return (
      <form className="aditing" onSubmit={this.handleSubmit}>
        <input defaultValue={this.props.title} ref="title" onChange={this.handleChange} />
        <Button icon="floppy-o" className="save" />
      </form>
    )
  }

  stateList() {
    return (
      <div className={`product${this.props.completed ? ' completed' : ''}`}>
        <Checkbox onStateClick={() => this.props.onChecked(this.props.id)} checked={this.props.completed} />
        <span className="title">{this.props.title}</span>
        <Button icon="pencil-square-o" onClick={() => this.setState({editing: true})} className="edit" />
        <Button onClick={() => this.props.onDelete(this.props.id)} icon="trash" className="delete" />
      </div>
    );
  }

  render() {
    return this.state.editing ? this.stateEdit() : this.stateList()
  }
};

export default Product;
