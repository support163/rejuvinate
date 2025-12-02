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

interface HistoricalDataPoint {
  date: string
  value: number
}

interface MetricHistoryData {
  title: string
  unit: string
  normalRange: { min: number; max: number }
  data: HistoricalDataPoint[]
  color: string
  milestones?: TreatmentMilestone[]
}

interface TreatmentMilestone {
  date: string
  medication: string
  injectionType: 'IM' | 'SubQ'
  dose: string
  note?: string
}

// Treatment milestones for testosterone therapy
const testosteroneMilestones: TreatmentMilestone[] = [
  { date: 'Jan 2022', medication: 'Testosterone Cypionate', injectionType: 'IM', dose: '100mg/week', note: 'Initial TRT start' },
  { date: 'Apr 2022', medication: 'Testosterone Cypionate', injectionType: 'IM', dose: '120mg/week', note: 'Dose increase' },
  { date: 'Jul 2022', medication: 'Testosterone Cypionate', injectionType: 'IM', dose: '150mg/week', note: 'Dose optimization' },
  { date: 'Jan 2023', medication: 'Testosterone Cypionate', injectionType: 'SubQ', dose: '150mg/week', note: 'Switched to SubQ' },
  { date: 'Jul 2023', medication: 'Testosterone Cypionate', injectionType: 'SubQ', dose: '175mg/week', note: 'Dose adjustment' },
  { date: 'Jan 2024', medication: 'Testosterone Cypionate', injectionType: 'SubQ', dose: '200mg/week', note: 'Maintenance dose' },
  { date: 'Jul 2024', medication: 'Testosterone Enanthate', injectionType: 'SubQ', dose: '200mg/week', note: 'Changed to Enanthate' },
]

// Historical data for each metric
const historicalData: Record<string, MetricHistoryData> = {
  testosterone: {
    title: 'Testosterone',
    unit: 'ng/dL',
    normalRange: { min: 300, max: 1000 },
    color: '#3b82f6',
    milestones: testosteroneMilestones,
    data: [
      { date: 'Jan 2022', value: 285 },
      { date: 'Apr 2022', value: 320 },
      { date: 'Jul 2022', value: 445 },
      { date: 'Oct 2022', value: 512 },
      { date: 'Jan 2023', value: 548 },
      { date: 'Apr 2023', value: 590 },
      { date: 'Jul 2023', value: 625 },
      { date: 'Oct 2023', value: 610 },
      { date: 'Jan 2024', value: 658 },
      { date: 'Apr 2024', value: 672 },
      { date: 'Jul 2024', value: 695 },
      { date: 'Oct 2024', value: 678 },
      { date: 'Jan 2025', value: 702 },
      { date: 'Apr 2025', value: 690 },
      { date: 'Jul 2025', value: 685 },
      { date: 'Oct 2025', value: 685 },
    ]
  },
  estrogen: {
    title: 'Estrogen',
    unit: 'pg/mL',
    normalRange: { min: 10, max: 40 },
    color: '#ec4899',
    data: [
      { date: 'Jan 2022', value: 45 },
      { date: 'Apr 2022', value: 42 },
      { date: 'Jul 2022', value: 38 },
      { date: 'Oct 2022', value: 35 },
      { date: 'Jan 2023', value: 32 },
      { date: 'Apr 2023', value: 30 },
      { date: 'Jul 2023', value: 28 },
      { date: 'Oct 2023', value: 29 },
      { date: 'Jan 2024', value: 27 },
      { date: 'Apr 2024', value: 26 },
      { date: 'Jul 2024', value: 28 },
      { date: 'Oct 2024', value: 27 },
      { date: 'Jan 2025', value: 29 },
      { date: 'Apr 2025', value: 28 },
      { date: 'Jul 2025', value: 27 },
      { date: 'Oct 2025', value: 28 },
    ]
  },
  thyroid: {
    title: 'Thyroid (TSH)',
    unit: 'mIU/L',
    normalRange: { min: 0.4, max: 4.0 },
    color: '#ef4444',
    data: [
      { date: 'Jan 2022', value: 4.8 },
      { date: 'Apr 2022', value: 4.2 },
      { date: 'Jul 2022', value: 3.8 },
      { date: 'Oct 2022', value: 3.5 },
      { date: 'Jan 2023', value: 3.2 },
      { date: 'Apr 2023', value: 2.9 },
      { date: 'Jul 2023', value: 2.7 },
      { date: 'Oct 2023', value: 2.5 },
      { date: 'Jan 2024', value: 2.4 },
      { date: 'Apr 2024', value: 2.3 },
      { date: 'Jul 2024', value: 2.2 },
      { date: 'Oct 2024', value: 2.1 },
      { date: 'Jan 2025', value: 2.2 },
      { date: 'Apr 2025', value: 2.1 },
      { date: 'Jul 2025', value: 2.0 },
      { date: 'Oct 2025', value: 2.1 },
    ]
  },
  vitaminD: {
    title: 'Vitamin D',
    unit: 'ng/mL',
    normalRange: { min: 30, max: 100 },
    color: '#eab308',
    data: [
      { date: 'Jan 2022', value: 18 },
      { date: 'Apr 2022', value: 22 },
      { date: 'Jul 2022', value: 28 },
      { date: 'Oct 2022', value: 32 },
      { date: 'Jan 2023', value: 30 },
      { date: 'Apr 2023', value: 35 },
      { date: 'Jul 2023', value: 42 },
      { date: 'Oct 2023', value: 38 },
      { date: 'Jan 2024', value: 36 },
      { date: 'Apr 2024', value: 40 },
      { date: 'Jul 2024', value: 48 },
      { date: 'Oct 2024', value: 44 },
      { date: 'Jan 2025', value: 42 },
      { date: 'Apr 2025', value: 46 },
      { date: 'Jul 2025', value: 50 },
      { date: 'Oct 2025', value: 45 },
    ]
  }
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
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
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
            onClick={() => setSelectedMetric('testosterone')}
          />
          <MetricCard
            title="Estrogen"
            value={healthMetrics.estrogen.value}
            unit={healthMetrics.estrogen.unit}
            change={healthMetrics.estrogen.change}
            icon={<Droplets className="w-6 h-6" />}
            color="pink"
            onClick={() => setSelectedMetric('estrogen')}
          />
          <MetricCard
            title="Thyroid (TSH)"
            value={healthMetrics.thyroid.value}
            unit={healthMetrics.thyroid.unit}
            change={healthMetrics.thyroid.change}
            icon={<Heart className="w-6 h-6" />}
            color="red"
            onClick={() => setSelectedMetric('thyroid')}
          />
          <MetricCard
            title="Vitamin D"
            value={healthMetrics.vitaminD.value}
            unit={healthMetrics.vitaminD.unit}
            change={healthMetrics.vitaminD.change}
            icon={<TrendingUp className="w-6 h-6" />}
            color="yellow"
            onClick={() => setSelectedMetric('vitaminD')}
          />
        </div>

        {/* Historical Data Modal */}
        {selectedMetric && (
          <HistoryModal
            metricData={historicalData[selectedMetric]}
            onClose={() => setSelectedMetric(null)}
          />
        )}

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
  color,
  onClick
}: {
  title: string
  value: number
  unit: string
  change: string
  icon: React.ReactNode
  color: 'blue' | 'pink' | 'red' | 'yellow'
  onClick: () => void
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    pink: 'bg-pink-50 text-pink-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  const isPositive = change.startsWith('+')

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-2 border-transparent hover:border-secondary/30"
    >
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
      <div className="mt-2 flex items-center justify-between">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Normal Range
        </span>
        <span className="text-xs text-secondary font-medium">View History →</span>
      </div>
    </div>
  )
}

function HistoryModal({
  metricData,
  onClose
}: {
  metricData: MetricHistoryData
  onClose: () => void
}) {
  const { data, title, unit, normalRange, color, milestones } = metricData
  const [showMilestones, setShowMilestones] = useState(true)
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)

  // Calculate chart dimensions
  const chartHeight = 350
  const chartWidth = 800
  const padding = { top: 60, right: 40, bottom: 60, left: 60 }
  const graphWidth = chartWidth - padding.left - padding.right
  const graphHeight = chartHeight - padding.top - padding.bottom

  // Calculate min/max for scaling
  const values = data.map(d => d.value)
  const minValue = Math.min(...values, normalRange.min) * 0.9
  const maxValue = Math.max(...values, normalRange.max) * 1.1

  // Scale functions
  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth
  const yScale = (value: number) => padding.top + graphHeight - ((value - minValue) / (maxValue - minValue)) * graphHeight

  // Create path for line chart
  const linePath = data.map((point, i) => {
    const x = xScale(i)
    const y = yScale(point.value)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  // Normal range band Y positions
  const normalMinY = yScale(normalRange.min)
  const normalMaxY = yScale(normalRange.max)

  // Get first and last values for summary
  const firstValue = data[0].value
  const lastValue = data[data.length - 1].value
  const totalChange = ((lastValue - firstValue) / firstValue * 100).toFixed(1)
  const isImproved = (title === 'Estrogen' || title === 'Thyroid (TSH)')
    ? lastValue < firstValue
    : lastValue > firstValue

  // Find milestone positions on chart
  const getMilestonePosition = (milestoneDate: string) => {
    const index = data.findIndex(d => d.date === milestoneDate)
    if (index === -1) return null
    return {
      x: xScale(index),
      y: yScale(data[index].value),
      index
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-2xl font-bold text-primary">{title} History</h2>
            <p className="text-sm text-gray-500">Historical lab results over time</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Current Level</p>
              <p className="text-xl font-bold text-gray-900">{lastValue} <span className="text-sm font-normal text-gray-500">{unit}</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Starting Level</p>
              <p className="text-xl font-bold text-gray-900">{firstValue} <span className="text-sm font-normal text-gray-500">{unit}</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Total Change</p>
              <p className={`text-xl font-bold ${isImproved ? 'text-green-600' : 'text-red-500'}`}>
                {Number(totalChange) > 0 ? '+' : ''}{totalChange}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Normal Range</p>
              <p className="text-xl font-bold text-gray-900">{normalRange.min} - {normalRange.max}</p>
            </div>
          </div>

          {/* Milestones Toggle */}
          {milestones && milestones.length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-secondary" />
                <span className="font-medium text-gray-700">Treatment Milestones</span>
              </div>
              <button
                onClick={() => setShowMilestones(!showMilestones)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showMilestones
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {showMilestones ? 'Hide Milestones' : 'Show Milestones'}
              </button>
            </div>
          )}

          {/* Chart */}
          <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[600px]">
              {/* Normal range band */}
              <rect
                x={padding.left}
                y={normalMaxY}
                width={graphWidth}
                height={normalMinY - normalMaxY}
                fill="#22c55e"
                opacity="0.1"
              />
              <line
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={normalMinY}
                y2={normalMinY}
                stroke="#22c55e"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={normalMaxY}
                y2={normalMaxY}
                stroke="#22c55e"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Milestone vertical lines */}
              {showMilestones && milestones && milestones.map((milestone, i) => {
                const pos = getMilestonePosition(milestone.date)
                if (!pos) return null
                return (
                  <line
                    key={`milestone-line-${i}`}
                    x1={pos.x}
                    x2={pos.x}
                    y1={padding.top - 10}
                    y2={chartHeight - padding.bottom}
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                    opacity={hoveredMilestone === i ? 1 : 0.5}
                  />
                )
              })}

              {/* Y-axis */}
              <line
                x1={padding.left}
                x2={padding.left}
                y1={padding.top}
                y2={chartHeight - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              {/* X-axis */}
              <line
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={chartHeight - padding.bottom}
                y2={chartHeight - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((percent, i) => {
                const value = minValue + (maxValue - minValue) * (1 - percent)
                const y = padding.top + graphHeight * percent
                return (
                  <g key={i}>
                    <line
                      x1={padding.left - 5}
                      x2={padding.left}
                      y1={y}
                      y2={y}
                      stroke="#9ca3af"
                      strokeWidth="1"
                    />
                    <text
                      x={padding.left - 10}
                      y={y}
                      textAnchor="end"
                      dominantBaseline="middle"
                      className="text-xs fill-gray-500"
                    >
                      {value.toFixed(title === 'Thyroid (TSH)' ? 1 : 0)}
                    </text>
                  </g>
                )
              })}

              {/* X-axis labels */}
              {data.filter((_, i) => i % 4 === 0 || i === data.length - 1).map((point, i, arr) => {
                const originalIndex = data.indexOf(point)
                const x = xScale(originalIndex)
                return (
                  <text
                    key={i}
                    x={x}
                    y={chartHeight - padding.bottom + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                  >
                    {point.date}
                  </text>
                )
              })}

              {/* Line path */}
              <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {data.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={xScale(i)}
                    cy={yScale(point.value)}
                    r="6"
                    fill="white"
                    stroke={color}
                    strokeWidth="3"
                    className="hover:r-8 transition-all cursor-pointer"
                  />
                </g>
              ))}

              {/* Milestone markers (diamond icons) */}
              {showMilestones && milestones && milestones.map((milestone, i) => {
                const pos = getMilestonePosition(milestone.date)
                if (!pos) return null
                const isHovered = hoveredMilestone === i
                return (
                  <g
                    key={`milestone-marker-${i}`}
                    onMouseEnter={() => setHoveredMilestone(i)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Diamond marker at data point */}
                    <polygon
                      points={`${pos.x},${pos.y - 12} ${pos.x + 8},${pos.y} ${pos.x},${pos.y + 12} ${pos.x - 8},${pos.y}`}
                      fill={isHovered ? '#f97316' : '#fb923c'}
                      stroke="white"
                      strokeWidth="2"
                    />
                    {/* Pill icon inside diamond */}
                    <text
                      x={pos.x}
                      y={pos.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[8px] fill-white font-bold"
                    >
                      Rx
                    </text>
                    {/* Milestone label at top */}
                    <rect
                      x={pos.x - 50}
                      y={padding.top - 40}
                      width="100"
                      height="24"
                      rx="4"
                      fill={isHovered ? '#f97316' : '#fb923c'}
                      opacity={isHovered ? 1 : 0.8}
                    />
                    <text
                      x={pos.x}
                      y={padding.top - 25}
                      textAnchor="middle"
                      className="text-[10px] fill-white font-medium"
                    >
                      {milestone.dose}
                    </text>
                  </g>
                )
              })}

              {/* Legend */}
              <g transform={`translate(${chartWidth - padding.right - 120}, ${padding.top - 20})`}>
                <rect x="0" y="0" width="12" height="12" fill="#22c55e" opacity="0.3" />
                <text x="18" y="10" className="text-xs fill-gray-600">Normal Range</text>
              </g>
              {showMilestones && milestones && milestones.length > 0 && (
                <g transform={`translate(${chartWidth - padding.right - 120}, ${padding.top})`}>
                  <polygon
                    points="6,0 12,6 6,12 0,6"
                    fill="#fb923c"
                  />
                  <text x="18" y="10" className="text-xs fill-gray-600">Treatment Change</text>
                </g>
              )}
            </svg>

            {/* Floating tooltip for hovered milestone */}
            {showMilestones && milestones && hoveredMilestone !== null && (
              <div
                className="absolute bg-gray-900 text-white rounded-lg p-4 shadow-xl z-20 min-w-[250px]"
                style={{
                  left: `${((getMilestonePosition(milestones[hoveredMilestone].date)?.x || 0) / chartWidth) * 100}%`,
                  top: '120px',
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="text-sm font-bold text-orange-400 mb-2">
                  Treatment Change
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="font-medium">{milestones[hoveredMilestone].date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Medication:</span>
                    <span className="font-medium">{milestones[hoveredMilestone].medication}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Injection Type:</span>
                    <span className="font-medium">{milestones[hoveredMilestone].injectionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dose:</span>
                    <span className="font-medium text-orange-400">{milestones[hoveredMilestone].dose}</span>
                  </div>
                  {milestones[hoveredMilestone].note && (
                    <div className="pt-2 border-t border-gray-700 text-gray-300 italic">
                      {milestones[hoveredMilestone].note}
                    </div>
                  )}
                </div>
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-900"></div>
              </div>
            )}
          </div>

          {/* Data table */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">All Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Value ({unit})</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data].reverse().map((point, i) => {
                    const isInRange = point.value >= normalRange.min && point.value <= normalRange.max
                    return (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-900">{point.date}</td>
                        <td className="py-2 px-3 text-right font-medium" style={{ color }}>
                          {point.value}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            isInRange ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {isInRange ? 'Normal' : point.value < normalRange.min ? 'Low' : 'High'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Treatment Timeline Section - Only shown for testosterone */}
          {milestones && milestones.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Pill className="w-4 h-4 text-orange-500" />
                Treatment Timeline
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-orange-200"></div>

                {/* Milestone items */}
                <div className="space-y-4">
                  {milestones.map((milestone, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      {/* Timeline dot */}
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center z-10 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>

                      {/* Milestone content */}
                      <div className="flex-1 bg-gradient-to-r from-orange-50 to-transparent rounded-lg p-4 border border-orange-100">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                              {milestone.date}
                            </span>
                            <h4 className="font-semibold text-gray-900 mt-2">
                              {milestone.medication}
                            </h4>
                            {milestone.note && (
                              <p className="text-sm text-gray-600 mt-1">{milestone.note}</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              milestone.injectionType === 'IM'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {milestone.injectionType === 'IM' ? 'Intramuscular (IM)' : 'Subcutaneous (SubQ)'}
                            </span>
                            <span className="text-sm font-bold text-orange-600">
                              {milestone.dose}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
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
