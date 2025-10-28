
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Partners from "./pages/Partners";
import RacePlus from "./pages/RacePlus";
import MembershipCheckout from "./pages/MembershipCheckout";
import MembershipSuccess from "./pages/MembershipSuccess";
import PaymentSuccess from "./pages/PaymentSuccess";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import PartnerApplication from "./pages/PartnerApplication";
import Ambassador from "./pages/Ambassador";
import Contact from "./pages/Contact";
import WhyRace from "./pages/WhyRace";
import OrganizeNew from "./pages/OrganizeNew";
import Verification from "./pages/Verification";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SavedEventsProvider } from "./contexts/SavedEventsContext";
import { useEffect } from "react";

// ScrollToTop component to ensure pages start at the top
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <SavedEventsProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="events" element={<Events />} />
                <Route path="news" element={<News />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="partners" element={<Partners />} />
                <Route path="why-race" element={<WhyRace />} />
                <Route path="partner-application" element={<PartnerApplication />} />
                <Route path="ambassador" element={<Ambassador />} />
                <Route path="contact" element={<Contact />} />
                <Route path="auth" element={<Auth />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="race-plus" element={<RacePlus />} />
                <Route path="membership-checkout" element={<MembershipCheckout />} />
                <Route path="membership-success" element={<MembershipSuccess />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path="event-details/:id" element={<EventDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="organize/new" element={<OrganizeNew />} />
                <Route path="verification" element={<Verification />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            </SavedEventsProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
