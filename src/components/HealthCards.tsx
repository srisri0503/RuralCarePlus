import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Plus, 
  Search,
  Calendar,
  User,
  MapPin,
  Phone,
  Shield,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface HealthCard {
  id: string;
  cardNumber: string;
  patientName: string;
  patientPhone: string;
  village: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended';
  bloodGroup: string;
  emergencyContact: string;
}

const HealthCards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<HealthCard | null>(null);

  const [healthCards] = useState<HealthCard[]>([
    {
      id: '1',
      cardNumber: 'RCP-2024-001',
      patientName: 'Rajesh Kumar',
      patientPhone: '+91 9876543210',
      village: 'Rampur',
      issueDate: '2024-01-01',
      expiryDate: '2025-01-01',
      status: 'active',
      bloodGroup: 'B+',
      emergencyContact: '+91 9876543211'
    },
    {
      id: '2',
      cardNumber: 'RCP-2024-002',
      patientName: 'Sunita Devi',
      patientPhone: '+91 9876543211',
      village: 'Shivganj',
      issueDate: '2024-01-05',
      expiryDate: '2025-01-05',
      status: 'active',
      bloodGroup: 'O+',
      emergencyContact: '+91 9876543212'
    },
    {
      id: '3',
      cardNumber: 'RCP-2023-045',
      patientName: 'Mohan Lal',
      patientPhone: '+91 9876543212',
      village: 'Krishnanagar',
      issueDate: '2023-06-15',
      expiryDate: '2024-06-15',
      status: 'expired',
      bloodGroup: 'A+',
      emergencyContact: '+91 9876543213'
    }
  ]);

  const filteredCards = healthCards.filter(card =>
    card.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'suspended':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const IssueCardModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Issue New Health Card</h2>
          <button
            onClick={() => setShowIssueModal(false)}
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
              <label className="label">Emergency Contact *</label>
              <input type="tel" className="input-field" placeholder="+91 9876543210" />
            </div>
            <div>
              <label className="label">Issue Date *</label>
              <input 
                type="date" 
                className="input-field" 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="label">Validity (Years) *</label>
              <select className="input-field" defaultValue="1">
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
              </select>
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
              onClick={() => setShowIssueModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Issue Health Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const CardDetailsModal = () => (
    selectedCard && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Health Card Details</h2>
            <button
              onClick={() => setSelectedCard(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          {/* Digital Health Card */}
          <div className="health-card text-white rounded-xl p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold">RuralCarePlus</h3>
                <p className="text-blue-100">Digital Health Card</p>
              </div>
              <CreditCard className="h-8 w-8" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-blue-100 text-sm">Card Number</p>
                <p className="text-xl font-mono font-bold">{selectedCard.cardNumber}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Status</p>
                <div className="flex items-center">
                  {getStatusIcon(selectedCard.status)}
                  <span className="ml-2 font-medium capitalize">{selectedCard.status}</span>
                </div>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Patient Name</p>
                <p className="text-lg font-semibold">{selectedCard.patientName}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Blood Group</p>
                <p className="text-lg font-semibold">{selectedCard.bloodGroup}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Village</p>
                <p className="font-medium">{selectedCard.village}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Valid Until</p>
                <p className="font-medium">{selectedCard.expiryDate}</p>
              </div>
            </div>
          </div>
          
          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-3" />
                  <span>{selectedCard.patientPhone}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Emergency: {selectedCard.emergencyContact}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                  <span>{selectedCard.village}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Card Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Issued: {selectedCard.issueDate}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Expires: {selectedCard.expiryDate}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-400 mr-3" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedCard.status)}`}>
                    {selectedCard.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button className="btn-primary">
              Renew Card
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
          <h1 className="text-3xl font-bold text-gray-900">Health Cards</h1>
          <p className="text-gray-600 mt-1">Issue and manage digital health cards for patients</p>
        </div>
        <button
          onClick={() => setShowIssueModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Issue New Card
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by patient name, card number, or village..."
          className="input-field pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Health Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <div key={card.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{card.patientName}</h3>
                  <p className="text-sm text-gray-600 font-mono">{card.cardNumber}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(card.status)}`}>
                {card.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {card.village}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {card.patientPhone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Expires: {card.expiryDate}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2" />
                Blood Group: {card.bloodGroup}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCard(card)}
                className="flex-1 btn-secondary text-sm py-2"
              >
                View Card
              </button>
              <button className="flex-1 btn-primary text-sm py-2">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showIssueModal && <IssueCardModal />}
      {selectedCard && <CardDetailsModal />}
    </div>
  );
};

export default HealthCards;