import { Signup } from "./Components/LoginSignup/Signup";
import Login from "../src/Components/LoginSignup/Login";
import Dashboard from "./Components/Dashboard";
import PageNotFound from "./Components/PageNotFound";
import SessionExpiry from "./Components/SessionExpiry";
import Error from "./Components/Error";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { DataProvider } from "./Auth/DataContext";
import Menu from "./Components/Restaurant Page/Menu";
import Restaurant from "./Components/Restaurant Page/Restaurant";
import Photos from "./Components/Restaurant Page/Photos";
import OrderOnline from "./Components/Restaurant Page/OrderOnline";
import Cart from "./Components/Cart";
import PaymentGateway from "./Components/payment/PaymentGateway";
import OrderDetails from "./Components/OrderDetails";
import Counter from "./Components/Redux Sample/Counter";
import Orders from "./Components/UserProfile/Orders";
import UserDashboard from "./Components/UserProfile/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Items from "./Components/Admin/Items";
import AdminOrders from "./Components/Admin/AdminOrders";

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute isProtected={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isProtected={false}>
                  <Navigate to="/login" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute isProtected={false}>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sessionExpiry"
              element={
                <ProtectedRoute>
                  <SessionExpiry />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/restaurant/:id/"
              element={
                <ProtectedRoute>
                  <Restaurant />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute>
                    <OrderOnline />
                  </ProtectedRoute>
                }
              />
              <Route path="/restaurant/:id/menu" element={<Menu />} />
              <Route
                path="/restaurant/:id/photos"
                element={
                  <ProtectedRoute>
                    <Photos />
                  </ProtectedRoute>
                }
              />

              <Route
                index
                path="/restaurant/:id/orderOnline"
                element={
                  <ProtectedRoute>
                    <OrderOnline />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentGateway /></ProtectedRoute>} />
            <Route path="/orderDetails" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/searchItems/:name" element={<ProtectedRoute><OrderOnline /></ProtectedRoute>} />
            <Route path="/category/:id" element={<ProtectedRoute><OrderOnline /></ProtectedRoute>} />
            <Route path="/paymentGateway" element={<ProtectedRoute><PaymentGateway /></ProtectedRoute>} />
            <Route
              path="/counter"
              element={
                <ProtectedRoute>
                  <Counter />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/error"
              element={
                <ProtectedRoute>
                  <Error />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/my-account" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
              <Route index path="/my-account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            </Route>
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard isAdmin={true} /></ProtectedRoute>}>
              <Route index path="/admin-dashboard/item-management" element={<ProtectedRoute><Items isAdmin={true}/></ProtectedRoute>} />
              <Route path="/admin-dashboard/orders" element={<ProtectedRoute><AdminOrders isAdmin={true}/></ProtectedRoute>} />
            </Route>
          </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
