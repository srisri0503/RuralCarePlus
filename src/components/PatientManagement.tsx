import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Phone, 
  MapPin,
  User,
  Calendar
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  village: string;
  aadhar: string;
  bloodGroup: string;
  lastVisit: string;
}

const PatientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91 9876543210',
      village: 'Rampur',
      aadhar: '1234-5678-9012',
      bloodGroup: 'B+',
      lastVisit: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sunita Devi',
      age: 38,
      gender: 'Female',
      phone: '+91 9876543211',
      village: 'Shivganj',
      aadhar: '2345-6789-0123',
      bloodGroup: 'O+',
      lastVisit: '2024-01-12'
    },
    {
      id: '3',
      name: 'Mohan Lal',
      age: 62,
      gender: 'Male',
      phone: '+91 9876543212',
      village: 'Krishnanagar',
      aadhar: '3456-7890-1234',
      bloodGroup: 'A+',
      lastVisit: '2024-01-10'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const AddPatientModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Full Name *</label>
              <input type="text" className="input-field" placeholder="Enter full name" />
            </div>
            <div>
              <label className="label">Age *</label>
              <input type="number" className="input-field" placeholder="Enter age" />
            </div>
            <div>
              <label className="label">Gender *</label>
              <select className="input-field">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Phone Number *</label>
              <input type="tel" className="input-field" placeholder="+91 9876543210" />
            </div>
            <div>
              <label className="label">Village *</label>
              <input type="text" className="input-field" placeholder="Enter village name" />
            </div>
            <div>
              <label className="label">Aadhar Number *</label>
              <input type="text" className="input-field" placeholder="1234-5678-9012" />
            </div>
            <div>
              <label className="label">Blood Group</label>
              <select className="input-field">
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="label">Emergency Contact</label>
              <input type="tel" className="input-field" placeholder="+91 9876543210" />
            </div>
          </div>
          
          <div>
            <label className="label">Address</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Enter complete address"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const PatientDetailsModal = () => (
    selectedPatient && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
            <button
              onClick={() => setSelectedPatient(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{selectedPatient.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium">{selectedPatient.age} years</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{selectedPatient.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Village</p>
                  <p className="font-medium">{selectedPatient.village}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="font-medium">{selectedPatient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Visit</p>
                <p className="font-medium">{selectedPatient.lastVisit}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button className="btn-secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit Patient
            </button>
            <button className="btn-primary">
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">Manage patient records and information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients by name, village, or phone..."
          className="input-field pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                patient.bloodGroup ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {patient.bloodGroup || 'Unknown'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {patient.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {patient.village}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Last visit: {patient.lastVisit}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPatient(patient)}
                className="flex-1 btn-secondary text-sm py-2"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              <button className="flex-1 btn-primary text-sm py-2">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && <AddPatientModal />}
      {selectedPatient && <PatientDetailsModal />}
    </div>
  );
};

export default PatientManagement;