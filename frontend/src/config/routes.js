const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forbiden403: "/403",
  notfound404user: "/*",
  listProduct: "/listProduct",
  productDescription: "/productDescription/:id",
  categoryAll: "/category/list",
  category: "/category/:categoryId/list",
  storeLocation: "/storeLocation",
  cart: "/cart",

  //admin

  adminHome: "/admin",
  productListAdmin: "/admin/products",
  categoryListAdmin: "/admin/categories",
  orderListAdmin: "/admin/orders",
  customerListAdmin: "/admin/customers",
  shop: "/admin/shop",
  notfound404admin: "/admin/*",
};

export default routes;
