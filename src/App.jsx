import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header";
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Driverd from './pages/Driverd';
import Cardetail from './pages/Cardetail';
import Carmaintain from './pages/Carmaintain';
import Userprofile from './pages/Userprofile';
import AuthPage from './pages/AuthPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DriverDetailsPage from './pages/DriverDetailsPage';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes for Admin Pages */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/driver/:driverId" element={
            <ProtectedRoute requiredRole="admin">
              <DriverDetailsPage />
            </ProtectedRoute>
          } />

          {/* Routes available only to signed-in users */}
          <Route path="/driverd" element={
            <SignedIn>
              <Driverd />
            </SignedIn>
          } />
          <Route path="/cardetaild" element={
            <SignedIn>
              <Cardetail />
            </SignedIn>
          } />
          <Route path="/carmaintainance" element={
            <SignedIn>
              <Carmaintain />
            </SignedIn>
          } />
          <Route path="/userprofile" element={
            <SignedIn>
              <Userprofile />
            </SignedIn>
          } />

          {/* Redirect non-signed-in users attempting to access protected routes */}
          <Route path="/signin" element={
            <SignedOut>
              <Navigate to="/auth" replace />
            </SignedOut>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
