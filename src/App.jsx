import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authpage from "./Pages/Authpage";
import Homepage from "./Pages/Homepage";
import TripDetailspage from "./Pages/TripDetailspage";
import Paymentpage from "./Pages/Paymentpage";
import Confirmationpage from "./Pages/Confirmationpage";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider } from "./Context/AuthContext";
import { DestinationProvider } from "./Context/DestinationContext";
import { BackendDataContextProvider } from "./Context/BackEndDataContext";
import { LocalDataContextProvider } from "./Context/LocalDataContext";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  return (
    <div className="overflow-x-hidden font-t_figtree text-t_black">
      <Router>
        <ClerkProvider publishableKey={clerkPubKey}>
          <AuthProvider>
            <DestinationProvider>
              <BackendDataContextProvider>
                <LocalDataContextProvider>
                  <Routes>
                    <Route path="/" element={<Authpage />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route
                      path="/destination/:id"
                      element={<TripDetailspage />}
                    />
                    <Route path="/payment-stripe" element={<Paymentpage />} />
                    <Route
                      path="/payment-confirmation"
                      element={<Confirmationpage />}
                    />
                  </Routes>
                </LocalDataContextProvider>
              </BackendDataContextProvider>
            </DestinationProvider>
          </AuthProvider>
        </ClerkProvider>
      </Router>
    </div>
  );
};

export default App;
