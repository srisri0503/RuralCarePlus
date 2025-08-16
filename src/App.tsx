import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PatientManagement from './components/PatientManagement';
import AppointmentBooking from './components/AppointmentBooking';
import HealthCards from './components/HealthCards';
import MedicalRecords from './components/MedicalRecords';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/appointments" element={<AppointmentBooking />} />
          <Route path="/health-cards" element={<HealthCards />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;