export const permissions = {
  user: [
    "view-single-user",
    "view-all-user",
    "create-user",
    "update-single-user",
    "update-all-user",
    "deactivate-user",
  ],
  product: [
    "view-single-product",
    "view-all-product",
    "create-product",
    "update-single-product",
    "update-all-product",
    "deactivate-product",
  ],
  product_category: [
    "view-single-category",
    "view-all-category",
    "create-category",
    "update-single-category",
    "update-all-category",
    "deactivate-category",
  ],
  role: [
    "view-single-role",
    "view-all-role",
    "create-role",
    "update-single-role",
    "update-all-role",
    "deactivate-role",
  ],
  storefront: [
    "view-single-storefront",
    "view-all-storefront",
    "create-storefront",
    "update-single-storefront",
    "update-all-storefront",
    "deactivate-storefront",
  ],
};

const admin = {
  firstName: "Isayas",
  lastName: "Melkamu",
  email: "isaias@gmail.com",
  permissions: Object.values(permissions).reduce(
    (acc, val) => acc.concat(val),
    []
  ),
};

export default admin;
