'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { X, Paperclip, Smile, Mic, Send, MessageCircle, Minimize2, Maximize2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there, you're speaking with Rejuvination HealthAI Assistant.",
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`
    return `${Math.floor(diffMins / 1440)}d`
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsAnalyzing(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your question. I'm here to help you with any health-related inquiries. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-secondary hover:bg-secondary-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    )
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isFullscreen
          ? 'inset-0'
          : isMinimized
          ? 'bottom-6 left-6 w-80 h-14'
          : 'bottom-6 left-6 w-[420px] h-[600px] max-h-[85vh]'
      }`}
    >
      <div className="bg-[#1a1a1a] rounded-xl shadow-2xl flex flex-col h-full overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Close chat"
          >
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current mb-1"></div>
            <div className="w-5 h-0.5 bg-current"></div>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        {!isMinimized && (
          <>
            {/* Logo and Tagline */}
            <div className="px-6 py-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 relative">
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
                <div className="text-xl font-semibold">
                  <span className="text-white">REVITALIZED</span>
                  <span className="text-secondary ml-1">HEALTH</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Ask me about medical advice, wellness tips, or your health related questions
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] ${
                      message.sender === 'user'
                        ? 'bg-secondary text-white rounded-2xl rounded-br-md px-4 py-3'
                        : 'bg-[#2a2a2a] text-white rounded-2xl rounded-bl-md px-4 py-3'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.sender === 'bot' && (
                      <p className="text-xs text-gray-500 mt-2">
                        A2V2 • AI Agent • {formatTimestamp(message.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {isAnalyzing && (
                <div className="flex items-center gap-2 text-gray-400 text-sm px-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <span className="animate-pulse">Analyzing</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 pb-4">
              <div className="bg-[#2a2a2a] rounded-xl p-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a Question"
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm mb-3"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label="Attach file"
                    >
                      <Paperclip size={20} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label="Add emoji"
                    >
                      <Smile size={20} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label="Voice input"
                    >
                      <Mic size={20} />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="text-secondary hover:text-secondary-light disabled:text-gray-600 transition-colors"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Branding */}
            <div className="px-4 pb-4 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <span>Agent by</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">A</span>
                  </div>
                  <span className="font-semibold text-gray-400">A2V2.ai</span>
                </div>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex-1 flex items-center justify-center gap-2 text-white"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium">Revitalized Health Assistant</span>
          </button>
        )}
      </div>
    </div>
  )
}
