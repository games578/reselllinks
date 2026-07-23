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
           'Ralph Lauren Sweatshirts https://www.dhgate.com/product/men-s-horse-hoodies-sweatshirts-spring-autumn/1116273050.html?d1_page_num=1&dspm=pcen.sp.list.10.Uf7KsMMzTwfSbmh076Kt&resource_id=1116273050&scm_id=search.LIST..%40.keywordSearchFlow%7Cv2%7Ctnsbrand%7C670_3%2C994_2%2C1063_2%2C1148_-1%2C1177_-1%2C1163_-1%2C1190_1%2C1175_3%2C1236_-1%2C1279_1%2C1308_-1%2C42_7%7C664bc89655514daea82c378ac66f24f7%7Cbestmatch.newC.&skuId=1540190898020081740#s1-5-1;searl|3737748228:6',
           ],
  },
  'Supreme Product Suplier Pack': {
    links: ['Supreme Hoodies & T-Shirts dhgate.com/product/supermeness-hoodies-desinger-mens-women-tracksuits/1115765498.html?d1_page_num=1&dspm=pcen.sp.list.5.98E8nwToqBr2fMXeST4o&resource_id=1115765498&scm_id=search.LIST..@.keywordSearchFlow|v2|tnsbrand|670_1,994_2,1063_2,1148_-1,1177_-1,1163_-1,1190_0,1175_3,1236_-1,1279_1,1308_-1,42_4,590_1,592_4,591_2,526_3,593_2,594_4,595_4,596_2,661_3,662_4,663_2,922_4,937_-1,934_-1,858_1,1036_0,7_0|c177122b00c1436ab835a32576ff3ae1|bestmatch.newC.#s1-1-1;searl|0447030267:2',
            'All Supreme Clothes https://www.dhgate.com/product/supremely-designer-men-s-tracksuits-unisex/1108301444.html?skuId=1521223840234066020&f=bm%7CCPSAXV%7Ccmp_20260701_a8f3c91d%7Cadset_b52e7f18%7Cad_c94d260a%7C',
           ],
  },
  'Nike Product Suplier Pack': {
    links: ['Nike Summer Fits dhgate.com/product/mens-cologne-designer-perfume-men-perfumes/1097912282.html?f=bm%7CCPSAXV%7Ccmp_20260701_a8f3c91d%7Cadset_b52e7f18%7Cad_c94d260a%7C&skuId=1512272457334505548',
             'Nike TN Shoes https://www.dhgate.com/product/with-box-tn-men-women-running-shoes-designer/1111620010.html?dspm=pcen.sp.list.1.Snv5ClEdQO9Rpxg6m3Qz&resource_id=1111620010&scm_id=yf.prodauto.77.S8aaae49f9c085f3a019c0cd9bb6028b6-Q1-R0-Pp3ni2fzbho-Gg1bg7gmbjb-Aother-B100.4-A6887_C1202_D18_E42x4_G7_I0_J0_K0_Nah_O0_Rw1jK9YFI1Fw_S18_U1590_V75.IidtvhmSnikeXshoeHwithXboxXfreeXshipXtnXmanXwomanXrunXshoeXdesignerXtnsXsneakerXoutdoorXdurableXtrainerXcomfortableXspBtimoy9C9sO-EssJ0Dwf&skuId=1529669128867442757&stockCountry=CN',
           ],
  },
  'Electronics Suplier Pack': {
    links: ['Apple Airpods https://www.dhgate.com/product/usa-stock-for-airpods-pro-3-airpodspro-2/1099248232.html?dspm=pcen.sp.list.1.vFufXbCDAQ6UBM0SOfeM&resource_id=1099248232&scm_id=yf.shopauto.19.S8aaaf77196d27cb30196f1950c747945-Q1-R0-Pp00_f2d7178dc1f363-G0-A11.4-A0_C0_D2x3x4x7x18_E42x4_G5_I0_J0_K0_Nah_O1_Rw1jKa08pF0r_S2_U369_V385.Ii6gpd4SWHairpodsBtimp1zC6fO8qEssJ0MaD87',
             'RIphone 17 Pro Max https://www.dhgate.com/product/i17-pro-max-256gb-512gb-1tb-smartphone-hd/1098988706.html?f=bm%7Cmatycube%7Cmc%7C&skuId=1522383626529996944&stockCountry=CN',
           ],
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
