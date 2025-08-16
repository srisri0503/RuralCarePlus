import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar,
  User,
  Stethoscope,
  Pill,
  Eye,
  Edit,
  Filter
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  visitDate: string;
  doctorName: string;
  symptoms: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  vitals: {
    bloodPressure: string;
    temperature: string;
    pulse: string;
    weight: string;
  };
}

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [dateFilter, setDateFilter] = useState('');

  const [records] = useState<MedicalRecord[]>([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      patientId: 'P001',
      visitDate: '2024-01-15',
      doctorName: 'Dr. Priya Sharma',
      symptoms: 'Fever, headache, body ache',
      diagnosis: 'Viral fever',
      prescription: 'Paracetamol 500mg - 3 times daily, Rest for 3 days',
      notes: 'Patient advised to drink plenty of fluids and take rest',
      vitals: {
        bloodPressure: '120/80',
        temperature: '101°F',
        pulse: '85 bpm',
        weight: '70 kg'
      }
    },
    {
      id: '2',
      patientName: 'Sunita Devi',
      patientId: 'P002',
      visitDate: '2024-01-12',
      doctorName: 'Dr. Amit Singh',
      symptoms: 'Chest pain, shortness of breath',
      diagnosis: 'Hypertension',
      prescription: 'Amlodipine 5mg - once daily, Low salt diet',
      notes: 'Regular BP monitoring required. Follow-up in 2 weeks',
      vitals: {
        bloodPressure: '150/95',
        temperature: '98.6°F',
        pulse: '92 bpm',
        weight: '65 kg'
      }
    },
    {
      id: '3',
      patientName: 'Mohan Lal',
      patientId: 'P003',
      visitDate: '2024-01-10',
      doctorName: 'Dr. Priya Sharma',
      symptoms: 'Frequent urination, excessive thirst',
      diagnosis: 'Type 2 Diabetes',
      prescription: 'Metformin 500mg - twice daily, Diabetic diet',
      notes: 'Blood sugar monitoring required. Lifestyle modifications advised',
      vitals: {
        bloodPressure: '130/85',
        temperature: '98.4°F',
        pulse: '78 bpm',
        weight: '75 kg'
      }
    }
  ]);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || record.visitDate === dateFilter;
    return matchesSearch && matchesDate;
  });

  const AddRecordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Medical Record</h2>
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
              <label className="label">Patient Name *</label>
              <input type="text" className="input-field" placeholder="Enter patient name" />
            </div>
            <div>
              <label className="label">Visit Date *</label>
              <input 
                type="date" 
                className="input-field" 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="label">Doctor Name *</label>
              <input type="text" className="input-field" placeholder="Enter doctor name" />
            </div>
            <div>
              <label className="label">Patient ID</label>
              <input type="text" className="input-field" placeholder="Enter patient ID" />
            </div>
          </div>

          {/* Vitals Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="label">Blood Pressure</label>
                <input type="text" className="input-field" placeholder="120/80" />
              </div>
              <div>
                <label className="label">Temperature</label>
                <input type="text" className="input-field" placeholder="98.6°F" />
              </div>
              <div>
                <label className="label">Pulse Rate</label>
                <input type="text" className="input-field" placeholder="72 bpm" />
              </div>
              <div>
                <label className="label">Weight</label>
                <input type="text" className="input-field" placeholder="70 kg" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="label">Symptoms *</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Describe the patient's symptoms"
            ></textarea>
          </div>
          
          <div>
            <label className="label">Diagnosis *</label>
            <textarea 
              className="input-field" 
              rows={2} 
              placeholder="Enter diagnosis"
            ></textarea>
          </div>
          
          <div>
            <label className="label">Prescription *</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Enter prescription details"
            ></textarea>
          </div>
          
          <div>
            <label className="label">Additional Notes</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Any additional notes or instructions"
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
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const RecordDetailsModal = () => (
    selectedRecord && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Medical Record Details</h2>
            <button
              onClick={() => setSelectedRecord(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Patient & Visit Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="font-medium">{selectedRecord.patientName}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-400 mr-3" />
                    <span>ID: {selectedRecord.patientId}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Visit Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <span>{selectedRecord.visitDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Stethoscope className="h-4 w-4 text-gray-400 mr-3" />
                    <span>{selectedRecord.doctorName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="text-lg font-semibold">{selectedRecord.vitals.bloodPressure}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-lg font-semibold">{selectedRecord.vitals.temperature}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pulse Rate</p>
                  <p className="text-lg font-semibold">{selectedRecord.vitals.pulse}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-lg font-semibold">{selectedRecord.vitals.weight}</p>
                </div>
              </div>
            </div>

            {/* Medical Details */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Symptoms</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRecord.symptoms}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Diagnosis</h4>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{selectedRecord.diagnosis}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Prescription</h4>
                <p className="text-gray-700 bg-green-50 p-4 rounded-lg">{selectedRecord.prescription}</p>
              </div>
              {selectedRecord.notes && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Additional Notes</h4>
                  <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg">{selectedRecord.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button className="btn-secondary">
              <Edit className="h-4 w-4 mr-2" />
              Edit Record
            </button>
            <button className="btn-primary">
              Print Record
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
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">Manage patient medical history and records</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Record
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name, doctor, or diagnosis..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              className="input-field"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{record.patientName}</h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {record.patientId}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {record.visitDate}
                    </div>
                    <div className="flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2" />
                      {record.doctorName}
                    </div>
                    <div className="flex items-center">
                      <Pill className="h-4 w-4 mr-2" />
                      {record.diagnosis}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{record.symptoms}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <button
                  onClick={() => setSelectedRecord(record)}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                <button className="btn-primary text-sm py-2 px-4">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && <AddRecordModal />}
      {selectedRecord && <RecordDetailsModal />}
    </div>
  );
};

export default MedicalRecords;