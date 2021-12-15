# Shopify backend
A complete e-commerce backend built using nodejs and mongodb.

# Model
## User
contains a users details along with reference to cart, orders and products added

## Product
contains all the products available along with tags to categories them

## PublishedProduct
contains all the products added by the user as a seller

## Cart
contains products added to cart by the user

## Orders
contains all the orders made by the user

# Services
## Authentication
### entry point - 
/auth
1. POST    /signup -> creates a user
2. POST    /login -> provides a jwt access token for user authentication

## Products
### entry point - 
/products
1. GET    /user-products -> fetches products added by logged in user [authentication reqd]
2. GET    /products -> fetches all the products available
3. POST    /add -> add new products [authentication reqd]
4. DELETE  /delete/:id -> delete a particular product by logged in user [authentication reqd]
5. PUT    /edit/:id -> edit details of existing product [authentication reqd]

## Cart
### entry point - 
/cart
1. GET    / -> fetches products in user's cart [authentication reqd]
2. PUT    / -> change products in user's cart [authentication reqd]
3. DELETE  /:prodId -> deletes a product in user's cart [authentication reqd]

## Order
### entry point -
/orders
1. GET / -> fetches products ordered by the user [authentication reqd]
2. POST /single -> add a product to order list [authentication reqd]
3. POST /multi -> order items present in user cart [authentication reqd]
4. DELETE /cancel/:orderId -> cancel a order made by the user [authentication reqd]