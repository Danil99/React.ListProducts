import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Product from './components/Product.jsx';
import productsList from './productsList.js';
import Form from './components/Form.jsx';
import Header from './components/Header.jsx';

import './main.sass';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
		axios('/api/products')
			.then(res => res.data)
			.then(products => this.setState({ products }))
			.catch(this.handleError)
	}

  handleCheck(id) {
		axios.patch(`/api/products/${id}`)
			.then(res => {
				let products = this.state.products.map(product => {
					if(product.id === id) {
						product = res.data;
					}
					return product;
				});

				this.setState({products});
			})
			.catch(this.handleError);
	}

  handleDelete(id) {
		axios.delete(`/api/products/${id}`)
			.then(() => {
				let products = this.state.products.filter(product => product.id !== id);
				this.setState({products});
			})
			.catch(this.handleError);
	}

  handleAdd(title) {
		axios.post('/api/products', { title })
			.then(res => res.data)
			.then(product => {
				let products = [...this.state.products, product];
				this.setState({ products });
			})
			.catch(this.handleError);
	}

  handleEdit(id, title) {
		axios.put(`/api/products/${id}`, {title})
			.then(res => {
				if(title != '') {
					let products = this.state.products.map(product => {
						if(product.id === id) {
							product = res.data;
						};
						return product;
					});
					this.setState({products});
				}
			})
			.catch(this.handleError);
	}

  handleError(error) {
		console.error(error);
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
