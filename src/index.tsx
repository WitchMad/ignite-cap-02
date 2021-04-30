import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Site Bom tom',
          type: 'deposit',
          category: 'Freelancer',
          amount: 1500,
          createdAt: new Date('2021-10-12'),
        },
        {
          id: 2,
          title: 'Hambúrguer',
          type: 'withdraw',
          category: 'Alimentação',
          amount: 60,
          createdAt: new Date('2021-10-12'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
