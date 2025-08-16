import React from 'react';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Activity,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Patients',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Today\'s Appointments',
      value: '23',
      change: '+5%',
      changeType: 'increase',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      name: 'Active Health Cards',
      value: '892',
      change: '+8%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
    {
      name: 'Monthly Checkups',
      value: '156',
      change: '+15%',
      changeType: 'increase',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  const recentAppointments = [
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      time: '10:00 AM',
      doctor: 'Dr. Priya Sharma',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Sunita Devi',
      time: '11:30 AM',
      doctor: 'Dr. Amit Singh',
      status: 'pending',
    },
    {
      id: '3',
      patientName: 'Mohan Lal',
      time: '2:00 PM',
      doctor: 'Dr. Priya Sharma',
      status: 'confirmed',
    },
  ];

  const villages = [
    { name: 'Rampur', patients: 234, distance: '5 km' },
    { name: 'Shivganj', patients: 189, distance: '8 km' },
    { name: 'Krishnanagar', patients: 156, distance: '12 km' },
    { name: 'Govindpur', patients: 98, distance: '15 km' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to RuralCarePlus</h1>
        <p className="text-primary-100 text-lg">
          Providing quality healthcare services to rural communities
        </p>
        <div className="mt-6 flex items-center space-x-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Open: 8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Serving 15+ Villages</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="ml-2 flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">{appointment.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Villages Served */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Villages Served</h2>
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {villages.map((village, index) => (
              <div
                key={village.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{village.name}</p>
                  <p className="text-sm text-gray-600">{village.distance} away</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">{village.patients}</p>
                  <p className="text-sm text-gray-600">patients</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;