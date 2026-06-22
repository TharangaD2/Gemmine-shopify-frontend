const fetch = require('node-fetch');
const query = `{
  pages(first: 10) {
    edges {
      node {
        handle
        title
      }
    }
  }
}`;
fetch('https://mdm1wq-mv.myshopify.com/api/2024-01/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': '1b122d1c639906c5c2750c5152ca2c98'
  },
  body: JSON.stringify({query})
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);
