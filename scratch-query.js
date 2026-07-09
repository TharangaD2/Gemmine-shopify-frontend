const query = `
  {
    page(handle: "about-page") {
      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {
        reference {
          ... on Video {
            sources {
              url
            }
          }
          ... on GenericFile {
            url
          }
        }
      }
    }
  }
`;

async function fetchPages() {
  const res = await fetch('https://mdm1wq-mv.myshopify.com/api/2023-10/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '1b122d1c639906c5c2750c5152ca2c98'
    },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

fetchPages();
