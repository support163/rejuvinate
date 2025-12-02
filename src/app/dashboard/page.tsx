'use client'

import { useState } from 'react'
import {
  User,
  Calendar,
  FileText,
  Bell,
  Settings,
  LogOut,
  Home,
  Pill,
  ClipboardList,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react'
import ChatBot from '@/components/ChatBot'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'treatments', label: 'My Treatments', icon: Pill },
    { id: 'records', label: 'Health Records', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const upcomingAppointments = [
    { id: 1, title: 'Hormone Therapy Consultation', date: 'Dec 5, 2024', time: '10:00 AM', doctor: 'Dr. Sarah Mitchell' },
    { id: 2, title: 'Follow-up Appointment', date: 'Dec 12, 2024', time: '2:30 PM', doctor: 'Dr. James Wilson' },
  ]

  const recentActivities = [
    { id: 1, action: 'Lab results uploaded', time: '2 hours ago', icon: FileText },
    { id: 2, action: 'Prescription renewed', time: '1 day ago', icon: Pill },
    { id: 3, action: 'Appointment scheduled', time: '3 days ago', icon: Calendar },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-primary-light">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#f7931e" strokeWidth="2" />
                <path
                  d="M20 8 L20 20 M15 15 Q20 10 25 15 M12 22 Q20 30 28 22"
                  fill="none"
                  stroke="#f7931e"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-lg font-semibold">
              <span className="text-white">REVITALIZED</span>
              <span className="text-secondary ml-1">HEALTH</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-secondary text-white'
                        : 'text-gray-300 hover:bg-primary-light hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-primary-light">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-400">john@example.com</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-gray-300 hover:text-white transition-colors text-sm">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Welcome back, John</h1>
              <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with your health journey</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors">
                <Calendar size={18} />
                <span className="font-medium">Book Appointment</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <TrendingUp size={14} />
                  +2
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-500 text-sm">Upcoming Appointments</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Pill className="text-orange-600" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-gray-500 text-sm">Active Treatments</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="text-green-600" size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-gray-500 text-sm">Lab Results</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="text-purple-600" size={24} />
                </div>
                <span className="text-xs text-red-500 font-medium">2 new</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
              <p className="text-gray-500 text-sm">Messages</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                  <button className="text-secondary hover:text-secondary-dark text-sm font-medium flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Calendar className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                        <p className="text-sm text-gray-500">{appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gray-600" size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-gradient-to-r from-primary to-primary-dark rounded-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
                <p className="text-gray-300 max-w-xl">
                  Our AI assistant is available 24/7 to answer your health questions, help you schedule appointments,
                  or provide information about our treatments.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <button className="bg-secondary hover:bg-secondary-dark px-6 py-3 rounded-lg font-semibold transition-colors">
                  Start Chat
                </button>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ChatBot Widget - Bottom Left */}
      <ChatBot />
    </div>
  )
}
