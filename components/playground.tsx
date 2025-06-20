"use client"

import * as React from "react"
import { 
  SendIcon, 
  RotateCcwIcon,
  PlayIcon,
  BotIcon,
  UserIcon,
  SettingsIcon,
  SaveIcon,
  ShareIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function Playground() {
  const [chatbotName, setChatbotName] = React.useState("My Chatbot")
  const [jobDescription, setJobDescription] = React.useState("You are a helpful customer support assistant for an e-commerce company. You help customers with orders, returns, and product questions. Be friendly, professional, and concise in your responses.")
  const [model, setModel] = React.useState("gpt-3.5-turbo")
  const [temperature, setTemperature] = React.useState([0.7])
  const [maxTokens, setMaxTokens] = React.useState([1000])
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your customer support assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your question. Let me help you with that. This is a simulated response for testing purposes.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your customer support assistant. How can I help you today?',
        timestamp: new Date()
      }
    ])
    setCurrentMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full w-full max-w-full overflow-hidden bg-background">
      {/* Left Panel - Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-sidebar-border">
        {/* Chat Header */}
        <div className="border-b border-sidebar-border p-4 bg-sidebar-accent/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BotIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sidebar-foreground font-semibold">{chatbotName}</h3>
                <p className="text-sidebar-foreground/60 text-sm">Testing Mode</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleReset}
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <RotateCcwIcon className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <SaveIcon className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BotIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-sidebar-foreground text-sidebar'
                    : 'bg-sidebar-accent text-sidebar-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-sidebar-foreground rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-4 w-4 text-sidebar" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <BotIcon className="h-4 w-4 text-white" />
              </div>
              <div className="bg-sidebar-accent text-sidebar-foreground rounded-lg p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-sidebar-border p-4 bg-sidebar-accent/30">
          <div className="flex gap-3">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Chatbot Configuration */}
      <div className="w-80 flex flex-col bg-sidebar-accent/30 min-h-0">
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Chatbot Identity */}
          <div className="space-y-4">
            <h3 className="text-sidebar-foreground font-semibold text-lg">Chatbot Workshop</h3>
            
            <div className="space-y-3">
              <Label htmlFor="chatbot-name" className="text-sidebar-foreground font-medium">
                Chatbot Name
              </Label>
              <Input
                id="chatbot-name"
                value={chatbotName}
                onChange={(e) => setChatbotName(e.target.value)}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="job-description" className="text-sidebar-foreground font-medium">
                Job Description
              </Label>
              <Textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe what your chatbot should do, its personality, and how it should behave..."
                className="min-h-[120px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-sidebar-foreground/60">
                This is the most important setting. Be specific about your chatbot's role, tone, and capabilities.
              </p>
            </div>
          </div>

          {/* Model Configuration */}
          <div className="space-y-4 pt-4 border-t border-sidebar-border">
            <h4 className="text-sidebar-foreground font-medium">Model Settings</h4>
            
            <div className="space-y-3">
              <Label htmlFor="model" className="text-sidebar-foreground font-medium">
                AI Model
              </Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4 (Most Capable)</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Balanced)</SelectItem>
                  <SelectItem value="claude-3">Claude 3 (Alternative)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sidebar-foreground font-medium">Creativity</Label>
                <span className="text-sm text-sidebar-foreground/70">{temperature[0]}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-sidebar-foreground/60">
                Lower = more focused, Higher = more creative
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sidebar-foreground font-medium">Response Length</Label>
                <span className="text-sm text-sidebar-foreground/70">{maxTokens[0]}</span>
              </div>
              <Slider
                value={maxTokens}
                onValueChange={setMaxTokens}
                max={2000}
                min={100}
                step={100}
                className="w-full"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-sidebar-border">
            <div className="space-y-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Deploy Chatbot
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}