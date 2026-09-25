import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomizerModal } from './components/CustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { FeedbackHub } from './components/FeedbackHub';
import { AdminRealmDashboard } from './components/AdminRealmDashboard';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { NosotrosModal } from './components/NosotrosModal';
import { NotificationToasts } from './components/NotificationToasts';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-stone-800">
      <Header />

      <main className="flex-1">
        {currentView === 'catalog' && (
          <>
            <HeroBanner />
            <ProductCatalog />
          </>
        )}

        {currentView === 'customizer' && (
          <>
            <HeroBanner />
            <ProductCatalog />
          </>
        )}

        {currentView === 'cart' && <CartDrawer />}

        {currentView === 'checkout' && <CheckoutModal />}

        {currentView === 'tracker' && <OrderTracker />}

        {currentView === 'feedback' && <FeedbackHub />}

        {currentView === 'admin' && <AdminRealmDashboard />}

        {currentView === 'profile' && <CustomerProfileModal />}

        {currentView === 'nosotros' && <NosotrosModal />}
      </main>

      {/* Global Modals and Popups */}
      <CustomizerModal />
      <NotificationToasts />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
