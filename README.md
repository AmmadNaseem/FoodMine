# MEAN Stack Foodmine Project
This is a MEAN stack web application for an online food store called Foodmine. It allows users to search for food products, add them to a cart, and purchase them. Users can also mark their address on a leaflet map using a marker and pay through PayPal.
The application provides a comprehensive platform for users to search for food, add to cart, select by category, and make purchases. Users can search for food items based on different categories such as All, FastFood, Soup, etc. They can add food items to their cart and make purchases after logging in. The application also provides features such as order tracking and history, allowing users to view their previous orders and track the status of their current orders. The application is optimized for performance, ensuring that pages load quickly and smoothly, providing a seamless user experience. Overall, the MEAN stack E-commerce food app provides a comprehensive and secure platform for users to search, select, and purchase food items online. The combination of MongoDB, Express.js, Angular, and Node.js provides a modern, responsive, and scalable application that is optimized for performance and user experience.

# Demo:

https://user-images.githubusercontent.com/61114465/234542167-3a6bf4c0-a748-43ea-b3d7-82a21a61df49.mp4


## 1. Set environment variables:

Create a .env file in the root directory and add the following environment variables:

makefile

MONGO_URI=<your_mongo_db_uri>
PAYPAL_CLIENT_ID=<your_paypal_client_id>

## 2. Start the server:

bash

npm start

The server should be running at http://localhost:3000.

# Usage

## Search Products
To search for products, navigate to the homepage and type your search query in the search bar. The application will display a list of matching products. Click on a product to view more details.

## Add to Cart
To add a product to your cart, click the "Add to Cart" button on the product detail page. You can view your cart by clicking on the cart icon in the navigation bar.

## Checkout
To checkout, go to your cart and click the "Checkout" button. You will be prompted to enter your shipping information and payment details. Once you have completed the checkout process, your order will be submitted and you will receive a confirmation email.

## Mark Address on Map
To mark your address on the map, navigate to the "Map" page and click on the location where you want to place the marker. You can drag the marker to adjust the location. Once you are satisfied with the marker placement, click the "Save Address" button to save the location.
Pay through PayPal

To pay through PayPal, complete the checkout process and select PayPal as your payment method. You will be redirected to the PayPal website to complete the payment. Once the payment is complete, you will be redirected back to the Foodmine website.
