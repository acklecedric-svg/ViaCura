/**
 * @krisspy-file
 * @type page
 * @name "CommunicationHub"
 * @title "Communication Hub"
 * @description "Secure voice calls, encrypted messaging, and video consultation capabilities"
 * @routes ["/doctor/communication"]
 * @flowName "doctor-cockpit"
 * @layout "DoctorLayout"
 */

import { useState } from 'react';
import { Phone, Video, MessageSquare, Clock, Signal, Eye, Phone as PhoneIcon, X, Send, Paperclip } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  type: 'patient' | 'assistant' | 'doctor' | 'emergency';
  avatar: string;
  status: 'online' | 'offline' | 'in-call';
  lastSeen?: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system';
}

interface Call {
  id: string;
  contactName: string;
  duration: number;
  type: 'voice' | 'video';
  timestamp: string;
  status: 'completed' | 'missed' | 'rejected';
}

export default function CommunicationHub() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'chat' | 'history'>('contacts');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Dr. Patient', content: 'Guten Tag, wie kann ich Ihnen helfen?', timestamp: '14:32', type: 'text' },
    { id: '2', sender: 'You', content: 'Ich möchte einen Termin vereinbaren', timestamp: '14:35', type: 'text' },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const contacts: Contact[] = [
    { id: '1', name: 'Max Müller (Patient)', type: 'patient', avatar: '👨‍⚕️', status: 'online', lastSeen: 'now' },
    { id: '2', name: 'Sarah Weber (MFA Assistant)', type: 'assistant', avatar: '👩‍⚕️', status: 'online', lastSeen: 'now' },
    { id: '3', name: 'Dr. Klaus Schmidt', type: 'doctor', avatar: '👨‍⚕️', status: 'in-call', lastSeen: '5 min' },
    { id: '4', name: 'Notfalldienst', type: 'emergency', avatar: '🚑', status: 'online', lastSeen: 'now' },
  ];

  const callHistory: Call[] = [
    { id: '1', contactName: 'Max Müller', duration: 1245, type: 'voice', timestamp: '14:32', status: 'completed' },
    { id: '2', contactName: 'Sarah Weber', duration: 2340, type: 'video', timestamp: '13:15', status: 'completed' },
    { id: '3', contactName: 'Dr. Klaus Schmidt', duration: 0, type: 'voice', timestamp: '12:00', status: 'missed' },
    { id: '4', contactName: 'Emergency Hotline', duration: 4500, type: 'video', timestamp: '11:30', status: 'completed' },
  ];

  const handleVoiceCall = (contact: Contact) => {
    setSelectedContact(contact);
    setActiveCall({
      id: Date.now().toString(),
      contactName: contact.name,
      duration: 0,
      type: 'voice',
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
    });
  };

  const handleVideoCall = (contact: Contact) => {
    setSelectedContact(contact);
    setActiveCall({
      id: Date.now().toString(),
      contactName: contact.name,
      duration: 0,
      type: 'video',
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
    });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const endCall = () => {
    setActiveCall(null);
    setSelectedContact(null);
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'online':
        return 'bg-blue';
      case 'in-call':
        return 'bg-accent-yellow';
      case 'offline':
        return 'bg-tertiary';
      default:
        return 'bg-tertiary';
    }
  };

  const getStatusLabel = (status: Contact['status']) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'in-call':
        return 'In Anruf';
      case 'offline':
        return 'Offline';
      default:
        return 'Offline';
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="bg-secondary border-b border-primary sticky top-0 z-30 px-lg py-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-md flex items-center gap-md">
            <Phone className="w-8 h-8 text-blue" />
            Communication Hub
          </h1>
          <p className="text-secondary text-sm">Sichere Sprach-, Video- und Messaging-Kommunikation</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-lg h-[calc(100vh-150px)]">
        {/* Contacts Sidebar */}
        <aside className="lg:w-72 bg-secondary border-r border-primary overflow-y-auto">
          <div className="p-lg space-y-lg">
            {/* Tab Navigation */}
            <div className="flex gap-sm border-b border-primary">
              {['contacts', 'chat', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-md py-sm text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-blue text-blue'
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  {tab === 'contacts' && 'Kontakte'}
                  {tab === 'chat' && 'Chats'}
                  {tab === 'history' && 'Verlauf'}
                </button>
              ))}
            </div>

            {/* Contacts List */}
            {activeTab === 'contacts' && (
              <div className="space-y-sm">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-md rounded-lg transition-colors ${
                      selectedContact?.id === contact.id
                        ? 'bg-tertiary border border-blue'
                        : 'hover:bg-tertiary border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-md">
                      <div className="relative">
                        <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center text-lg">
                          {contact.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-secondary ${getStatusColor(contact.status)}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-primary">{contact.name}</p>
                        <p className="text-xs text-secondary">{getStatusLabel(contact.status)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Chat List */}
            {activeTab === 'chat' && (
              <div className="space-y-sm">
                {contacts.slice(0, 2).map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact);
                      setActiveTab('contacts');
                    }}
                    className="w-full p-md rounded-lg hover:bg-tertiary transition-colors text-left"
                  >
                    <div className="flex items-center gap-md mb-sm">
                      <div className="text-lg">{contact.avatar}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">{contact.name}</p>
                      </div>
                    </div>
                    <p className="text-xs text-secondary line-clamp-1">Letzter Chat...</p>
                  </button>
                ))}
              </div>
            )}

            {/* Call History */}
            {activeTab === 'history' && (
              <div className="space-y-sm">
                {callHistory.map((call) => (
                  <div key={call.id} className="p-md rounded-lg bg-tertiary/50 hover:bg-tertiary transition-colors">
                    <div className="flex items-start justify-between gap-md">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">{call.contactName}</p>
                        <p className="text-xs text-secondary mt-1">{call.timestamp}</p>
                      </div>
                      <div className="text-right">
                        {call.type === 'voice' ? (
                          <Phone className="w-4 h-4 text-secondary" />
                        ) : (
                          <Video className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-secondary mt-2">
                      {call.status === 'completed' && `Dauer: ${formatDuration(call.duration)}`}
                      {call.status === 'missed' && 'Verpasster Anruf'}
                      {call.status === 'rejected' && 'Abgelehnt'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Chat/Call Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeCall ? (
            /* Active Call View */
            <div className="flex flex-col items-center justify-center flex-1 bg-primary">
              <div className="text-center space-y-lg">
                <div className="w-24 h-24 mx-auto bg-tertiary rounded-full flex items-center justify-center text-5xl">
                  {selectedContact?.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{activeCall.contactName}</h2>
                  <p className="text-sm text-secondary mt-2">
                    {activeCall.type === 'voice' ? 'Sprachanruf' : 'Videoanruf'}
                  </p>
                </div>

                {/* Call Status Indicators */}
                <div className="flex items-center justify-center gap-md text-primary">
                  <div className="flex items-center gap-sm">
                    <Signal className="w-4 h-4 text-blue animate-pulse" />
                    <span className="text-sm">Verbunden</span>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-lg mt-2xl">
                  <button
                    onClick={() => {
                      /* Mute audio */
                    }}
                    className="w-12 h-12 rounded-full bg-tertiary hover:bg-tertiary text-primary flex items-center justify-center transition-colors"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={endCall}
                    className="w-16 h-16 rounded-full bg-danger hover:bg-danger/90 text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => {
                      /* Add contact */
                    }}
                    className="w-12 h-12 rounded-full bg-tertiary hover:bg-tertiary text-primary flex items-center justify-center transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : selectedContact ? (
            /* Chat View */
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="bg-secondary border-b border-primary px-lg py-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center text-2xl">
                      {selectedContact.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-primary">{selectedContact.name}</p>
                      <p className="text-xs text-secondary flex items-center gap-sm">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(selectedContact.status)}`}></span>
                        {getStatusLabel(selectedContact.status)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    <button
                      onClick={() => handleVoiceCall(selectedContact)}
                      className="p-md rounded-lg bg-tertiary hover:bg-blue/20 text-blue transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleVideoCall(selectedContact)}
                      className="p-md rounded-lg bg-tertiary hover:bg-blue/20 text-blue transition-colors"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-lg space-y-md">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-lg py-md rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-blue text-white'
                          : 'bg-tertiary text-primary'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-secondary'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-secondary border-t border-primary px-lg py-lg">
                <div className="flex gap-md">
                  <button className="p-md rounded-lg bg-tertiary hover:bg-tertiary text-secondary transition-colors flex-shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nachricht schreiben..."
                    className="input flex-1"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-md rounded-lg bg-blue hover:bg-blue-hover text-white transition-colors flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-lg">
              <Phone className="w-16 h-16 text-secondary mb-lg opacity-50" />
              <h2 className="text-2xl font-bold text-primary mb-md">Wählen Sie einen Kontakt</h2>
              <p className="text-secondary max-w-md">
                Wählen Sie einen Kontakt aus der Liste, um Sprach-, Video- oder Textkommunikation zu starten
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
