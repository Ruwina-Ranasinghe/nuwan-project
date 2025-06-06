'use client';

import { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  school: string;
}

interface Errors {
  [key: string]: string;
}

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    school: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Registration data:', formData);

      setIsSuccess(true);

      // Close modal and reset after 2 seconds
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close registration form"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success Message */}
        {isSuccess ? (
          <div className="p-6 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Registration Successful!
            </h3>
            <p className="text-gray-600">Welcome to EduClass! We'll contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
            {[
              {
                label: 'First Name',
                name: 'firstName',
                icon: User,
                type: 'text',
                placeholder: 'Enter your first name',
              },
              {
                label: 'Last Name',
                name: 'lastName',
                icon: User,
                type: 'text',
                placeholder: 'Enter your last name',
              },
              {
                label: 'Email Address',
                name: 'email',
                icon: Mail,
                type: 'email',
                placeholder: 'Enter your email',
              },
              {
                label: 'Phone Number',
                name: 'phone',
                icon: Phone,
                type: 'tel',
                placeholder: 'Enter your phone number',
              },
              {
                label: 'Address',
                name: 'address',
                icon: MapPin,
                type: 'text',
                placeholder: 'Enter your address',
              },
              {
                label: 'Date of Birth',
                name: 'dateOfBirth',
                icon: Calendar,
                type: 'date',
                placeholder: '',
              },
              {
                label: 'School',
                name: 'school',
                icon: GraduationCap,
                type: 'text',
                placeholder: 'Enter your school name',
              },
            ].map(({ label, name, icon: Icon, type, placeholder }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="flex items-center text-sm font-medium text-gray-700 mb-1"
                >
                  <Icon size={16} className="mr-2 text-blue-500" />
                  {label}
                </label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors[name]
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
                {errors[name] && (
                  <p id={`${name}-error`} className="text-red-500 text-xs mt-1">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Register Now'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function EduClass() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">EduClass</div>
            <div className="hidden md:flex space-x-8">
              {['Courses', 'Teachers', 'Contacts', 'About Us'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn with <span className="text-blue-600">Mr. Johnson</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced Mathematics & Physics Classes - Unlock your potential with personalized
            online tutoring
          </p>
          <button
            onClick={() => setIsRegistrationOpen(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Learning Today
          </button>
        </div>
        <div className="mt-16 bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Educational Content Image Placeholder</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: User,
              title: 'Expert Tutoring',
              desc: 'Personalized one-on-one sessions with experienced instructor',
            },
            {
              icon: Calendar,
              title: 'Flexible Schedule',
              desc: 'Learn at your own pace with flexible timing options',
            },
            {
              icon: CheckCircle,
              title: 'Proven Results',
              desc: 'Track record of helping students achieve their academic goals',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  );
}

