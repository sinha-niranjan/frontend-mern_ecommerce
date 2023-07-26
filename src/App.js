import "./App.css";
import React, { useState } from "react";
import NavBar from "./component/layout/navBar/NavBar";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/home/Home";
import ProductDetails from "./component/product/productDetails/ProductDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import webfont from "webfontloader";
import Products from "./component/product/products/Products";
import Search from "./component/layout/search/Search";
import LoginSignUp from "./component/user/loginSignUp/LoginSignUp";

import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./component/user/profile/Profile";

import { useSelector } from "react-redux";
import Loader from "./component/layout/loader/Loader";
import UpdateProfile from "./component/user/updateProfile/UpdateProfile";
import UpdatePassword from "./component/user/updatePassword/UpdatePassword";
import ForgotPassword from "./component/user/forgotPassword/ForgotPassword";
import ResetPassword from "./component/user/resetPassword/ResetPassword";
import Cart from "./component/cart/cart/Cart";
import Shipping from "./component/cart/shipping/Shipping";
import ConfirmOrder from "./component/cart/confirmOrder/ConfirmOrder";
import axios from "axios";
import Payment from "./component/cart/payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/orderSuccess/OrderSuccess";
import MyOrders from "./component/orders/myOrders/MyOrders";
import OrderDetails from "./component/orders/orderDetails/OrderDetails";
import Dashboard from "./component/admin/dashboard/Dashboard";
import ProductList from "./component/admin/productList/ProductList";
import CreateProduct from "./component/admin/createProduct/CreateProduct";
import UpdateProduct from "./component/admin/updateProduct/UpdateProduct";
import OrderList from "./component/admin/orderList/OrderList";
import ProcessOrder from "./component/admin/processOrder/ProcessOrder";
import UserList from "./component/admin/userList/UserList";
import UpdateUser from "./component/admin/updateUser/UpdateUser";
import ProductReviews from "./component/admin/productReviews/ProductReviews";
import Contact from "./component/layout/contact/Contact";
import About from "./component/layout/about/About";
import NotFound from "./component/layout/notFound/NotFound";

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("https://frontend-mern-ecommerce.vercel.app/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

 
  return (
    <Router>
      <NavBar />

      <Routes>
        {/*        *************************        UNPROTECTED ROUTES        ********************             */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        {/*          *********************         PROTECTED ROUTES         *********************          */}
        <Route
          exact
          path="/account"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <Profile /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/me/update"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <UpdateProfile /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/password/update"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <UpdatePassword /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/login/shipping"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <Shipping /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/order/confirm"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}</>
            )
          }
        />

        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              loading ? (
                <Loader />
              ) : (
                <>
                  {isAuthenticated ? (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />{" "}
                    </Elements>
                  ) : (
                    <LoginSignUp />
                  )}
                </>
              )
            }
          />
        )}

        <Route
          exact
          path="/success"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <OrderSuccess /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/orders"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <MyOrders /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/order/:id"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <OrderDetails /> : <LoginSignUp />}</>
            )
          }
        />

        <Route
          exact
          path="/order/confirm"
          element={
            loading ? (
              <Loader />
            ) : (
              <>{isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}</>
            )
          }
        />

        {/*          ****************************          ADMIN PROTECTED ROUTES       ****************************         */}

        <Route
          exact
          path="/admin/dashboard"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user &&  user.role === "admin" ? (
                  <Dashboard />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/products"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated &&user &&  user.role === "admin" ? (
                  <ProductList />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/product"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated &&user && user.role === "admin" ? (
                  <CreateProduct />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/product/:id"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user && user.role === "admin" ? (
                  <UpdateProduct />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/orders"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user.role === "admin" ? (
                  <OrderList />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/order/:id"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user.role === "admin" ? (
                  <ProcessOrder />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/users"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user.role === "admin" ? (
                  <UserList />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/user/:id"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user.role === "admin" ? (
                  <UpdateUser />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route
          exact
          path="/admin/reviews"
          element={
            loading ? (
              <Loader />
            ) : (
              <>
                {isAuthenticated && user.role === "admin" ? (
                  <ProductReviews />
                ) : (
                  <LoginSignUp />
                )}
              </>
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
