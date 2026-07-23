// -----------------------------------------------------------------------
// This is the ONLY file you need to edit to control what each buyer gets.
//
// Each pack now takes a LIST of links instead of just one — put as many
// as you want inside the square brackets, one per line, each in quotes,
// separated by commas. Buyers will get every link you put in the list.
//
// Leave PLACEHOLDER in the list (or as the only item) until you have real
// links ready — buyers will get a friendly "still finalizing" message
// instead of a broken link.
//
// The key on the left MUST exactly match the product "name" used in
// index.html's PRODUCTS array (case-sensitive).
// -----------------------------------------------------------------------

const PLACEHOLDER = 'REPLACE_ME';

const PRODUCTS = {
  'Ralph Lauren Product Suplier Pack': {
    links: ['Ralp Lauren Hoodies https://www.dhgate.com/product/ralpauren-hoodie-mens-rl-hoodies-designer/1116056605.html?f=bm%7Cmatycube%7Cmc%7C&skuId=1539782409787154444',
           'https://https://www.dhgate.com/product/ralpauren-hoodie-mens-rl-hoodies-designer/1116056605.html?f=bm%7Cmatycube%7Cmc%7C&skuId=1539782409787154444',
           ],
  },
  'Supreme Product Suplier Pack': {
    links: [PLACEHOLDER],
  },
  'Nike Product Suplier Pack': {
    links: [PLACEHOLDER],
  },
  'Electronics Suplier Pack': {
    links: [PLACEHOLDER],
  },
  'Jewelry Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Burberry Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Canada Goose Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Prada Gear Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Stüssy Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Chrome Hearts Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Moncler Supplier Pack': {
    links: [PLACEHOLDER],
  },
  'Essentials Accessories Pack': {
    links: [PLACEHOLDER],
  },
};

// Example of a pack with 3 real links filled in, for reference:
//
// 'Kitchenware Supplier Pack': {
//   links: [
//     'https://https://www.dhgate.com/product/ralpauren-hoodie-mens-rl-hoodies-designer/1116056605.html?f=bm%7Cmatycube%7Cmc%7C&skuId=1539782409787154444',
//     'https://docs.google.com/document/d/exampleBBB/edit',
//     'https://drive.google.com/drive/folders/exampleCCC',
//   ],
// },

const BUNDLE_NAME = 'Full Catalog Access';

function resolveDelivery(purchasedNames) {
  const wantsBundle = purchasedNames.some((n) => n === BUNDLE_NAME);
  const names = wantsBundle ? Object.keys(PRODUCTS) : purchasedNames;

  const seen = new Set();
  const items = [];
  for (const name of names) {
    if (seen.has(name)) continue;
    seen.add(name);
    const entry = PRODUCTS[name];
    const links = entry && Array.isArray(entry.links) ? entry.links : [];
    const realLinks = links.filter((l) => l && l !== PLACEHOLDER);
    items.push({
      name,
      links: realLinks,
      configured: realLinks.length > 0,
    });
  }
  return items;
}

module.exports = { resolveDelivery, PLACEHOLDER, BUNDLE_NAME };
