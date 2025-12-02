'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  Activity,
  Droplets,
  Heart,
  TrendingUp,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Pill,
  Upload,
  File,
  Trash2,
  Eye,
  X,
  CheckCircle
} from 'lucide-react'

interface MedicalRecord {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  category: string
}

// Mock health data
const healthMetrics = {
  testosterone: { value: 685, unit: 'ng/dL', status: 'normal', change: '+12%' },
  estrogen: { value: 28, unit: 'pg/mL', status: 'normal', change: '+5%' },
  thyroid: { value: 2.1, unit: 'mIU/L', status: 'normal', change: '-3%' },
  vitaminD: { value: 45, unit: 'ng/mL', status: 'normal', change: '+18%' },
}

const upcomingAppointments = [
  { id: 1, type: 'Follow-up Consultation', date: 'Dec 15, 2025', time: '10:00 AM', provider: 'Dr. Sarah Johnson' },
  { id: 2, type: 'Lab Work', date: 'Dec 22, 2025', time: '8:30 AM', provider: 'Quest Diagnostics' },
]

const currentMedications = [
  { name: 'Testosterone Cypionate', dosage: '200mg/week', refillDate: 'Dec 20, 2025' },
  { name: 'Vitamin D3', dosage: '5000 IU/day', refillDate: 'Jan 5, 2026' },
  { name: 'DHEA', dosage: '25mg/day', refillDate: 'Dec 28, 2025' },
]

const recentMessages = [
  { id: 1, from: 'Dr. Johnson', subject: 'Lab Results Review', date: '2 days ago', unread: true },
  { id: 2, from: 'Billing Dept', subject: 'Invoice Available', date: '5 days ago', unread: false },
]

// Initial mock medical records
const initialMedicalRecords: MedicalRecord[] = [
  { id: '1', name: 'Blood_Panel_Oct_2025.pdf', type: 'application/pdf', size: '245 KB', uploadedAt: 'Oct 15, 2025', category: 'Blood Labs' },
  { id: '2', name: 'Hormone_Panel_Sep_2025.pdf', type: 'application/pdf', size: '189 KB', uploadedAt: 'Sep 22, 2025', category: 'Blood Labs' },
]

export default function Dashboard() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(initialMedicalRecords)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin')
    }
  }, [user, isLoading, router])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf')

    if (pdfFiles.length === 0) {
      alert('Please upload PDF files only')
      return
    }

    const newRecords: MedicalRecord[] = pdfFiles.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: formatFileSize(file.size),
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: 'Blood Labs'
    }))

    setMedicalRecords(prev => [...newRecords, ...prev])
    setUploadSuccess(true)
    setTimeout(() => setUploadSuccess(false), 3000)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const deleteRecord = (id: string) => {
    setMedicalRecords(prev => prev.filter(record => record.id !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-600 mt-1">Here&apos;s your health overview</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            </button>
            <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-600 hover:text-red-500"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Testosterone"
            value={healthMetrics.testosterone.value}
            unit={healthMetrics.testosterone.unit}
            change={healthMetrics.testosterone.change}
            icon={<Activity className="w-6 h-6" />}
            color="blue"
          />
          <MetricCard
            title="Estrogen"
            value={healthMetrics.estrogen.value}
            unit={healthMetrics.estrogen.unit}
            change={healthMetrics.estrogen.change}
            icon={<Droplets className="w-6 h-6" />}
            color="pink"
          />
          <MetricCard
            title="Thyroid (TSH)"
            value={healthMetrics.thyroid.value}
            unit={healthMetrics.thyroid.unit}
            change={healthMetrics.thyroid.change}
            icon={<Heart className="w-6 h-6" />}
            color="red"
          />
          <MetricCard
            title="Vitamin D"
            value={healthMetrics.vitaminD.value}
            unit={healthMetrics.vitaminD.unit}
            change={healthMetrics.vitaminD.change}
            icon={<TrendingUp className="w-6 h-6" />}
            color="yellow"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Upcoming Appointments
              </h2>
              <Link href="#" className="text-secondary text-sm hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="border border-gray-100 rounded-lg p-4 hover:border-secondary/30 transition-colors">
                  <h3 className="font-medium text-gray-900">{apt.type}</h3>
                  <p className="text-sm text-gray-600 mt-1">{apt.provider}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-secondary font-medium">{apt.date}</span>
                    <span className="text-sm text-gray-500">{apt.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition-colors">
              Schedule New Appointment
            </button>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Pill className="w-5 h-5 text-secondary" />
                Current Medications
              </h2>
              <Link href="#" className="text-secondary text-sm hover:underline">Manage</Link>
            </div>
            <div className="space-y-4">
              {currentMedications.map((med, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{med.name}</h3>
                    <p className="text-sm text-gray-500">{med.dosage}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Refill by</span>
                    <p className="text-sm text-secondary font-medium">{med.refillDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors">
              Request Refill
            </button>
          </div>

          {/* Messages & Quick Links */}
          <div className="space-y-6">
            {/* Messages */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Messages
                </h2>
                <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">1 new</span>
              </div>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 ${msg.unread ? 'bg-secondary/5' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {msg.unread && <span className="w-2 h-2 bg-secondary rounded-full"></span>}
                      <div className={!msg.unread ? 'ml-5' : ''}>
                        <p className={`text-sm ${msg.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{msg.from}</p>
                        <p className="text-xs text-gray-500">{msg.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{msg.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-primary mb-4">Quick Links</h2>
              <div className="space-y-2">
                <QuickLink icon={<FileText className="w-5 h-5" />} label="View Lab Results" />
                <QuickLink icon={<Calendar className="w-5 h-5" />} label="Treatment History" />
                <QuickLink icon={<Settings className="w-5 h-5" />} label="Account Settings" />
              </div>
            </div>
          </div>
        </div>

        {/* Medical Records Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FileText className="w-6 h-6 text-secondary" />
              Medical Records
            </h2>
            <span className="text-sm text-gray-500">{medicalRecords.length} files</span>
          </div>

          {/* Upload Success Message */}
          {uploadSuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-700">File uploaded successfully!</p>
            </div>
          )}

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging
                ? 'border-secondary bg-secondary/5'
                : 'border-gray-300 hover:border-secondary/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-secondary' : 'text-gray-400'}`} />
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Drag and drop</span> your blood lab PDFs here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              Browse Files
            </label>
            <p className="text-xs text-gray-400 mt-4">Supported format: PDF (Max 10MB)</p>
          </div>

          {/* Uploaded Files List */}
          {medicalRecords.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Uploaded Records</h3>
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{record.name}</p>
                        <p className="text-xs text-gray-500">
                          {record.size} • {record.uploadedAt} • {record.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-gray-500 hover:text-secondary hover:bg-white rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Health Tip Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Optimize Your Results</h3>
              <p className="text-white/80 max-w-xl">
                Remember to take your testosterone injection on the same day each week for optimal hormone levels.
                Stay hydrated and maintain consistent sleep patterns.
              </p>
            </div>
            <Link
              href="#"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Resources
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  unit,
  change,
  icon,
  color
}: {
  title: string
  value: number
  unit: string
  change: string
  icon: React.ReactNode
  color: 'blue' | 'pink' | 'red' | 'yellow'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  const isPositive = change.startsWith('+')

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
      <div className="mt-2">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Normal Range
        </span>
      </div>
    </div>
  )
}

function QuickLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Link
      href="#"
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-400 group-hover:text-secondary transition-colors">{icon}</span>
        <span className="text-gray-700 group-hover:text-gray-900">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors" />
    </Link>
  )
}
