export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: string;
  village: string;
  aadhar_number: string;
  blood_group?: string;
  emergency_contact: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  visit_date: string;
  symptoms: string;
  diagnosis: string;
  prescription: string;
  doctor_name: string;
  notes?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  doctor_name: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
}

export interface HealthCard {
  id: string;
  patient_id: string;
  card_number: string;
  issue_date: string;
  expiry_date: string;
  status: 'active' | 'expired' | 'suspended';
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  available_days: string[];
  available_times: string[];
}