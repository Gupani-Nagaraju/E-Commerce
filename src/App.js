import React from "react";
import { Route, Routes } from "react-router-dom";

/* ---------- CONTEXT ---------- */
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

/* ---------- MAIN PAGES ---------- */
import Landpage from "./Pages/Landpage/Landpage";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";

/* ---------- CATEGORY PAGES ---------- */
import Acpage from "./Pages/Acpage/Acpage";
import Mobilepage from "./Pages/Mobilepage/Mobilepage";
import Bookspage from "./Pages/Bookspage/Bookspage";
import Computerpage from "./Pages/Computerpage/Computerpage";
import Fridgepage from "./Pages/Fridgepage/Fridgepage";
import Furniturepage from "./Pages/Furniturepage/Furniturepage";
import Kitchenpage from "./Pages/Kitchenpage/Kitchenpage";
import Menpage from "./Pages/Menpage/Menpage";
import Speakerpage from "./Pages/Speakerpage/Speakerpage";
import Tvpage from "./Pages/Tvpage/Tvpage";
import Watchpage from "./Pages/Watchpage/Watchpage";
import Womenpage from "./Pages/Womenpage/Womenpage";
import Shoppage from "./Components/Shop/Shoppage";

/* ----------  CATEGORY ---------- */
import Categorymenu from "./Pages/Category/Categorymenu";
import Categorygrid from "./Components/Category/Categorygrid";
import ProductGrid from "./Components/ProductGrid/ProductGrid";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

/* ----------  ORDER ---------- */
import Cartpage from "./Pages/Cartpage/Cartpage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import Orderpage from "./Pages/Orderpage/Orderpage";
import BuyNowPage from "./Pages/BuyNowPage/BuyNowPage";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";

/* ---------- AUTH ---------- */
import Loginpage from "./Pages/Login/Loginpage";
import Registrationpage from "./Pages/Registration/Registrationpage";


/* ---------- WISHLIST ---------- */
import Wishlist from "./Pages/Wishlist/Wishlist";

/* ---------- SEARCH NO RESULTS ---------- */
import NoResultsPage from "./Pages/NoResultsPage/NoResultsPage";

function App() {
  return (
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        
        <Routes>
          {/* ---------------- MAIN ---------------- */}
          <Route path="/" element={<Landpage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* ---------------- CART / CHECKOUT ---------------- */}
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />

          {/* ---------------- CATEGORY PAGES ---------------- */}
          <Route path="/acpage" element={<Acpage />} />
          <Route path="/mobiles" element={<Mobilepage />} />
          <Route path="/bookspage" element={<Bookspage />} />
          <Route path="/computerpage" element={<Computerpage />} />
          <Route path="/fridgepage" element={<Fridgepage />} />
          <Route path="/furniturepage" element={<Furniturepage />} />
          <Route path="/kitchenepage" element={<Kitchenpage />} />
          <Route path="/menpage" element={<Menpage />} />
          <Route path="/speakerpage" element={<Speakerpage />} />
          <Route path="/tvpage" element={<Tvpage />} />
          <Route path="/watchpage" element={<Watchpage />} />
          <Route path="/womenpage" element={<Womenpage />} />
          <Route path="/shop" element={<Shoppage />} />

          {/* ---------------- WISHLIST ---------------- */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* ---------------- SEARCH NO RESULTS ---------------- */}
          <Route path="/search/no-results" element={<NoResultsPage />} />

          {/* ---------------- EXTRA / MISC ---------------- */}
          <Route path="/categorymenu" element={<Categorymenu />} />
          <Route path="/categorygrid" element={<Categorygrid />} />
          <Route path="/productgrid" element={<ProductGrid />} />
          <Route path="/order" element={<Orderpage />} />
          
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/Registrationpage" element={<Registrationpage/>} />

          {/* ---------------- PRODUCT DETAILS ---------------- */}
          <Route path="/product/:category/:id" element={<ProductDetails />} />

          {/* detail routes kept as you had */}
          <Route path="/mobiles/:id" element={<Mobilepage />} />
          <Route path="/computers/:id" element={<Computerpage />} />
          <Route path="/men/:id" element={<Menpage />} />
          <Route path="/women/:id" element={<Womenpage />} />
          <Route path="/watches/:id" element={<Watchpage />} />

          {/* ---------------- BUY / SUCCESS ---------------- */}
          <Route path="/buy-now" element={<BuyNowPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
