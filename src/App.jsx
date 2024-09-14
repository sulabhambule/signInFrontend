import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpSuccess from './components/SignUpSuccess/SignUpSuccess';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          {/* Redirect default route to /sign-up */}
          <Route path="/" element={<Navigate to="/sign-up" />} />
          
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          
          {/* Success page route */}
          <Route path="/signup-success" element={<SignUpSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
