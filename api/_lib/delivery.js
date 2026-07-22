const PLACEHOLDER = 'REPLACE_ME';

const PRODUCTS = {
  'Ralph Lauren Product Suplier Pack': { link: PLACEHOLDER },
  'Supreme Product Suplier Pack': { link: PLACEHOLDER },
  'Nike Product Suplier Pack': { link: PLACEHOLDER },
  'Electronics Suplier Pack': { link: PLACEHOLDER },
  'Jewelry Supplier Pack': { link: PLACEHOLDER },
  'Burberry Supplier Pack': { link: PLACEHOLDER },
  'Sneaker Supplier Pack': { link: PLACEHOLDER },
  'Audio Gear Supplier Pack': { link: PLACEHOLDER },
  'Watches Supplier Pack': { link: PLACEHOLDER },
  'Kitchenware Supplier Pack': { link: PLACEHOLDER },
  'Outerwear Supplier Pack': { link: PLACEHOLDER },
  'Mobile Accessories Pack': { link: PLACEHOLDER },
};

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
    items.push({
      name,
      link: entry ? entry.link : null,
      configured: !!entry && entry.link !== PLACEHOLDER,
    });
  }
  return items;
}

module.exports = { resolveDelivery, PLACEHOLDER, BUNDLE_NAME };
