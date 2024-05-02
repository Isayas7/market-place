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

export const roleData = {
  Buyer: "Buyer",
  Seller: "Seller",
  Admin: "Admin",
  Personnel_Delivery: "Personnel-Delivery",
};

export const statusData = {
  Active: "Active",
  Banned: "Banned",
};
export const orderStatus = {
  Pending: "Pending",
  Shipping: "Shipping",
  Delivered: "Delivered",
};

const admin = {
  _id: "123456789",
  firstName: "Isayas",
  middleName: "Melkamu",
  email: "isaias@gmail.com",
  role: roleData.Admin,
  password: "1234",
  permissions: Object.values(permissions).reduce(
    (acc, val) => acc.concat(val),
    []
  ),
};

export default admin;
