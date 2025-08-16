import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  village: string;
}

const AppointmentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      patientPhone: '+91 9876543210',
      date: '2024-01-20',
      time: '10:00 AM',
      doctor: 'Dr. Priya Sharma',
      reason: 'Regular checkup',
      status: 'scheduled',
      village: 'Rampur'
    },
    {
      id: '2',
      patientName: 'Sunita Devi',
      patientPhone: '+91 9876543211',
      date: '2024-01-20',
      time: '11:30 AM',
      doctor: 'Dr. Amit Singh',
      reason: 'Blood pressure monitoring',
      status: 'completed',
      village: 'Shivganj'
    },
    {
      id: '3',
      patientName: 'Mohan Lal',
      patientPhone: '+91 9876543212',
      date: '2024-01-21',
      time: '2:00 PM',
      doctor: 'Dr. Priya Sharma',
      reason: 'Diabetes consultation',
      status: 'scheduled',
      village: 'Krishnanagar'
    }
  ]);

  const doctors = [
    { id: '1', name: 'Dr. Priya Sharma', specialization: 'General Medicine' },
    { id: '2', name: 'Dr. Amit Singh', specialization: 'Cardiology' },
    { id: '3', name: 'Dr. Kavita Patel', specialization: 'Pediatrics' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.patientPhone.includes(searchTerm) ||
                         appointment.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Book New Appointment</h2>
          <button
            onClick={() => setShowBookingModal(false)}
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
              <label className="label">Doctor *</label>
              <select className="input-field">
                <option value="">Select doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Appointment Date *</label>
              <input 
                type="date" 
                className="input-field" 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="label">Time Slot *</label>
              <select className="input-field">
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="label">Reason for Visit *</label>
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Describe the reason for appointment"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Book Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name, phone, or village..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="input-field min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <input
            type="date"
            className="input-field"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {appointment.doctor}
                    </div>
                    <div>
                      Village: {appointment.village}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{appointment.reason}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                {getStatusIcon(appointment.status)}
                <div className="flex space-x-2">
                  {appointment.status === 'scheduled' && (
                    <>
                      <button className="btn-secondary text-sm py-1 px-3">
                        Reschedule
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-lg">
                        Complete
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded-lg">
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'completed' && (
                    <button className="btn-secondary text-sm py-1 px-3">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && <BookingModal />}
    </div>
  );
};

export default AppointmentBooking;