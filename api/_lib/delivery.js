const PLACEHOLDER = 'REPLACE_ME';

const PRODUCTS = {
  'Ralph Lauren Product Suplier Pack': { link: https://www.dhgate.com/product/2026-new-style-sweater-for-men-spring-autumn/1096307821.html?d1_page_num=1&dspm=pcen.sp.list.2.nkTlcaqqDKoeTRcZkUlk&resource_id=1096307821&scm_id=search.LIST..%40.keywordSearchFlow%7Cv2%7C670_3%2C994_0%2C1063_2%2C1148_-1%2C1177_-1%2C1163_-1%2C1190_0%2C1175_3%2C1236_-1%2C1279_1%2C1308_-1%2C42_4%2C590_0%2C592_1%2C591_3%2C526_3%2C593_2%2C594_0%2C595_1%2C596_4%2C661_0%2C662_4%2C663_4%2C922_4%2C937_-1%2C934_-1%2C858_0%2C1036_0%2C7_1%7C2377eb77c9e142fcada56bc0b28a0df7%7Cbestmatch.newC.&skuId=1509592656320634963&stockCountry=CN#s1-0-1;searl|3218869757:1 },
  'Supreme Product Suplier Pack': { link: https://www.dhgate.com/product/supermeness-hoodies-desinger-mens-women-tracksuits/1115765498.html?d1_page_num=1&dspm=pcen.sp.list.6.76ken8HGwyPnu8sBtQGm&resource_id=1115765498&scm_id=search.LIST..%40.keywordSearchFlow%7Cv2%7Ctnsbrand%7C670_0%2C994_1%2C1063_2%2C1148_-1%2C1177_-1%2C1163_-1%2C1190_1%2C1175_3%2C1236_-1%2C1279_0%2C1308_-1%2C42_5%7C7865a2d1ed544f4f8e293dda51c1dff5%7Cbestmatch.newC.&skuId=1538968515955195985#s1-2-1;searl|3752905305:3 },
  'Nike Product Suplier Pack': { link: https://www.dhgate.com/product/techfleece-nikely-tracksuit-tshirt-shorts/1101162302.html?skuId=1503287324727619635&f=bm|CPSAXV|cmp_20260701_a8f3c91d|adset_b52e7f18|ad_c94d260a| },
  'Electronics Suplier Pack': { link: https://www.dhgate.com/product/2026-newest-tws-earbuds-pods-4th-gen-with/1114515620.html?dspm=pcen.sp.list.1.FkmvqHWJTwdd2M8UGxeF&resource_id=1114515620&scm_id=yf.prodauto.72.S8aaac2d493f835c80193f8727e2901c5-Q1-R0-Ppe4n09g8oz-Ggwfx1u73kw-A9-B100.4-A0_C0_D2x3x4x7x18_E42x0_G7_I0_J0_K0_Nah_O0_Rw1jK9BDcywH_S2_U236_V276.Iifjxr8SWHairpodsBtimnbmC8kOf1EssJ0D9e },
  'Jewelry Supplier Pack': { link: https://www.dhgate.com/product/advanced-luxury-mens-watch-designer-watches/1071763338.html?skuId=1418404308020056145&f=bm%7CCPSAXV%7Ccmp_20260701_a8f3c91d%7Cadset_b52e7f18%7Cad_c94d260a%7C },
  'Burberry Supplier Pack': { link: https://www.dhgate.com/product/men-s-polos-luxury-brand-short-sleeve-polo/1064214730.html?d1_page_num=1&dspm=pcen.sp.list.7.xaS2JnJCcTkK1O6RvPw7&resource_id=1064214730&scm_id=search.LIST..%40.keywordSearchFlow%7Cv2%7Ctnsbrand%7C670_3%2C994_2%2C1063_0%2C1148_-1%2C1177_-1%2C1163_-1%2C1190_1%2C1175_3%2C1236_-1%2C1279_1%2C1308_-1%2C42_3%7Cdf933a18b50342d9b4db827a4d5090d2%7Cbestmatch.newC.&skuId=1400175426760085537#s1-3-1;searl|3150773929:4 },
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
