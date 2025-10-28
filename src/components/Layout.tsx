
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isEventsPage = location.pathname === '/events';
  const isNewsPage = location.pathname === '/news';
  
  // Add padding top for the Events and News pages to avoid overlap
  const mainClass = `flex-grow ${isEventsPage || isNewsPage ? 'pt-16' : ''}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={mainClass}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
