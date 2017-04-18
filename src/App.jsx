import React from 'react';
import ReactDOM from 'react-dom';

import Product from './components/Product.jsx';
import productsList from './productsList.js';
import Form from './components/Form.jsx';
import Header from './components/Header.jsx';

import './main.sass';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.initialData
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleCheck(id) {
    let products = this.state.products.map(product => {
      if(product.id === id) {
        product.completed = !product.completed;
      };
      return product;
    });
    this.setState({products});
  }

  handleDelete(id) {
    let products = this.state.products.filter(product => {
      return product.id !== id;
    });
    this.setState({products});
  }

  handleAdd(title) {
    let product = {
      id: this.state.products.length + 1,
      title,
      comleted: false
    };
    let products = [...this.state.products, product]
    this.setState({products});
  }

  handleEdit(id, title) {
    let products = this.state.products.map(product => {
      if(product.id === id) {
        product.title = title
      };
      return product;
    });
    this.setState({products});
  }

  render() {
    return (
      <main>
        <Header />
        <section>
          <div className="list-products">
            {
              this.state.products.map(product => {
                return (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  completed={product.completed}
                  onChecked={this.handleCheck}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                />)
              })
            }
          </div>
          <Form onAdd={this.handleAdd} />
        </section>
      </main>
    )
  }
};


ReactDOM.render(<App initialData={productsList} />, document.getElementById('root'));
