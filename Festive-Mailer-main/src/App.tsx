import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, AtSign, Volume2, Sparkles, Calendar, Edit3, Star, Heart, Gift, Zap } from 'lucide-react';
import { BackgroundGradient, TextGenerateEffect, MovingBorder, Meteors } from './components/ui';
import { cn } from './utils/cn';

interface EmailFormData {
  festival: string;
  customOccasion: string;
  recipientName: string;
  recipientEmail: string;
  relationship: string;
  tone: string;
  additionalTouches: string;
  senderName: string;
}

interface PreviewData {
  subject: string;
  body: string;
}

interface Festival {
  value: string;
  label: string;
  gradient: string;
  accent: string;
  imageUrl: string;
  icon: string;
  description: string;
}

type Screen = 'create' | 'success';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('create');
  const [formData, setFormData] = useState<EmailFormData>({
    festival: '',
    customOccasion: '',
    recipientName: '',
    recipientEmail: '',
    relationship: '',
    tone: 'Warm & Personal',
    additionalTouches: '',
    senderName: ''
  });
  const [previewData, setPreviewData] = useState<PreviewData>({
    subject: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionId] = useState(() => crypto.randomUUID());

  const festivals: Festival[] = [
    { 
      value: 'Diwali', 
      label: 'Diwali', 
      gradient: 'from-amber-400 via-orange-500 to-red-500', 
      accent: 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50',
      imageUrl: '/diwali.jpg',
      icon: '🪔',
      description: 'Festival of Lights'
    },
    { 
      value: 'Christmas', 
      label: 'Christmas', 
      gradient: 'from-green-500 via-emerald-500 to-red-500', 
      accent: 'border-green-500 bg-gradient-to-br from-green-50 to-red-50',
      imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500&h=280&fit=crop&crop=center&q=80',
      icon: '🎄',
      description: 'Season of Joy'
    },
    { 
      value: 'New Year', 
      label: 'New Year', 
      gradient: 'from-purple-500 via-blue-500 to-cyan-500', 
      accent: 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=280&fit=crop&crop=center&q=80',
      icon: '🎊',
      description: 'New Beginnings'
    },
    { 
      value: 'Eid', 
      label: 'Eid', 
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500', 
      accent: 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50',
      imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=500&h=280&fit=crop&crop=center&q=80',
      icon: '🌙',
      description: 'Blessed Celebration'
    },
    { 
      value: 'Holi', 
      label: 'Holi', 
      gradient: 'from-pink-400 via-purple-400 to-indigo-400', 
      accent: 'border-pink-400 bg-gradient-to-br from-pink-50 to-purple-50',
      imageUrl: '/holi.jpg',
      icon: '🎨',
      description: 'Festival of Colors'
    },
    { 
      value: 'Other', 
      label: 'Other', 
      gradient: 'from-slate-400 via-gray-500 to-zinc-500', 
      accent: 'border-gray-400 bg-gradient-to-br from-gray-50 to-slate-50',
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=280&fit=crop&crop=center&q=80',
      icon: '🎉',
      description: 'Special Occasion'
    }
  ];

  const tones = [
    { value: 'Warm & Personal', icon: '💝' },
    { value: 'Formal & Professional', icon: '🏢' },
    { value: 'Fun & Lighthearted', icon: '😊' },
    { value: 'Spiritual & Reflective', icon: '🙏' }
  ];

  const getCurrentFestival = () => {
    return festivals.find(f => f.value === formData.festival) || festivals[0];
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.festival) errors.push('Festival is required');
    if (formData.festival === 'Other' && !formData.customOccasion.trim()) errors.push('Custom occasion name is required when "Other" is selected');
    if (!formData.recipientName.trim()) errors.push('Recipient name is required');
    if (!formData.recipientEmail.trim()) errors.push('Recipient email is required');
    if (!formData.recipientEmail.match(/.+@.+\..+/)) errors.push('Please enter a valid email');
    if (!formData.senderName.trim()) errors.push('Sender name is required');
    
    if (errors.length > 0) {
      setErrorMessage(errors.join(', '));
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const generateAndSendEmail = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setErrorMessage('');

    try {
      const relationshipText = formData.relationship ? ` to my ${formData.relationship}` : '';
      const personalTouchText = formData.additionalTouches ? `\nPersonal note: ${formData.additionalTouches}` : '';
      const toneInstruction = formData.tone !== 'Warm & Personal' ? ` in a ${formData.tone.toLowerCase()} tone` : '';
      const occasionName = formData.festival === 'Other' ? formData.customOccasion : formData.festival;
      
      const message = `write a happy ${occasionName} mail${relationshipText} ${formData.recipientName}${toneInstruction}.${personalTouchText}
From: ${formData.senderName}
send this to ${formData.recipientEmail} yourself, just send it yourself dont ask any confirmations okay`;

      console.log('Sending message:', message);

      const response = await fetch(import.meta.env.VITE_API_URL || 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY || 'sk-default-9wdTatnu1figlN2UilBoBW0yz58wNokO'
        },
        body: JSON.stringify({
          user_id: import.meta.env.VITE_USER_ID || 'sarankumar131313@gmail.com',
          agent_id: import.meta.env.VITE_AGENT_ID || '683a7619883e43f5a295739f',
          session_id: sessionId,
          message: message
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        let errorMessage = `API Error (${response.status}): `;
        
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage += errorJson.error?.message || errorJson.message || errorText;
        } catch {
          errorMessage += errorText || response.statusText;
        }
        
        setErrorMessage(errorMessage);
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);        if (data.response) {
          const responseText = data.response;
          const occasionName = formData.festival === 'Other' ? formData.customOccasion : formData.festival;
          let subject = `${occasionName} Greetings`;
          let body = responseText;
        
        const subjectMatch = responseText.match(/Subject:\s*(.+)/i);
        if (subjectMatch) {
          subject = subjectMatch[1].trim();
          body = responseText.replace(/Subject:\s*.+\n\n?/i, '').trim();
        }
        
        setPreviewData({
          subject: subject,
          body: body
        });
        
        setCurrentScreen('success');        } else if (data.status === 'success') {
          const occasionName = formData.festival === 'Other' ? formData.customOccasion : formData.festival;
          setPreviewData({
            subject: `${occasionName} Greetings`,
            body: data.message || 'Your festival greeting has been sent successfully!'
          });
          setCurrentScreen('success');
      } else {
        setErrorMessage(data.error?.message || data.message || 'Failed to generate and send email');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Network error: ${error instanceof Error ? error.message : String(error)}. Please check your connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      festival: '',
      customOccasion: '',
      recipientName: '',
      recipientEmail: '',
      relationship: '',
      tone: 'Warm & Personal',
      additionalTouches: '',
      senderName: ''
    });
    setPreviewData({ subject: '', body: '' });
    setCurrentScreen('create');
    setErrorMessage('');
  };

  const renderNavigation = () => (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-50 border-b bg-black/20 backdrop-blur-xl border-white/10"
    >
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <Sparkles className="w-10 h-10 mr-4 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-r from-purple-400 to-pink-400 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text">
              FestiveMailer
            </h1>
          </motion.div>
          <div className="flex items-center space-x-8">
            <motion.button 
              onClick={() => setCurrentScreen('create')}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                currentScreen === 'create' 
                  ? 'bg-white/20 text-white border border-white/30' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Message
            </motion.button>
            <div className="flex space-x-4">
              <Star className="w-5 h-5 text-white/40" />
              <Heart className="w-5 h-5 text-white/40" />
              <Gift className="w-5 h-5 text-white/40" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
  const renderCreateScreen = () => (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 scroll-momentum scroll-performance">
      {/* Global Comet Effects - Full Page Coverage */}
      <div className="fixed inset-0 z-0 pointer-events-none animate-optimized">
        <Meteors number={80} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(236,72,153,0.08),transparent)] animate-pulse-slow" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)] animate-pulse-slow" />
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-3xl animate-bounce-slow" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 blur-3xl animate-pulse-slow" />
        {/* Additional floating orbs */}
        <div className="absolute w-64 h-64 rounded-full top-1/2 left-1/3 bg-pink-500/8 blur-2xl animate-float" />
        <div className="absolute w-48 h-48 rounded-full top-3/4 right-1/3 bg-indigo-500/10 blur-2xl animate-bounce-slow" />
      </div>

      {renderNavigation()}
      
      <div className="relative z-10 max-w-6xl px-6 py-12 mx-auto lg:px-8">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TextGenerateEffect 
            words="Create Stunning Festival Messages"
            className="mb-6 text-6xl font-black text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text"
          />
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Send personalized, AI-powered festival greetings that touch hearts and spread joy instantly.
          </motion.p>
        </motion.div>

        {errorMessage && (
          <motion.div 
            className="p-6 mb-8 border bg-red-500/10 border-red-500/20 rounded-2xl backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-medium text-center text-red-300">{errorMessage}</p>
          </motion.div>
        )}

        <BackgroundGradient className="p-1 rounded-3xl grid-performance">
          <div className="relative p-8 overflow-hidden border shadow-2xl bg-gradient-to-br from-slate-900/90 via-purple-950/80 to-slate-900/90 backdrop-blur-2xl rounded-3xl border-white/20">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl" />
            <div className="absolute top-0 w-64 h-32 rounded-full left-1/4 bg-purple-400/10 blur-3xl" />
            <div className="absolute bottom-0 w-64 h-32 rounded-full right-1/4 bg-pink-400/10 blur-3xl" />
            
            <form onSubmit={(e) => { e.preventDefault(); generateAndSendEmail(); }} className="relative z-10 space-y-10">
              
              {/* Festival Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="flex items-center mb-8 text-xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text">
                  <div className="relative mr-3">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-30 animate-pulse" />
                  </div>
                  Choose Your Festival
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                  {festivals.map((festival, index) => (
                    <motion.button
                      key={festival.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, festival: festival.value })}
                      className={cn(
                        "festival-card group relative p-6 rounded-3xl border-2 transition-all duration-300 overflow-hidden backdrop-blur-xl isolate",
                        formData.festival === festival.value
                          ? "border-purple-400/50 bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-pink-500/20 shadow-2xl shadow-purple-500/25 scale-105"
                          : "border-white/20 bg-gradient-to-br from-white/5 via-purple-500/5 to-pink-500/5 hover:bg-gradient-to-br hover:from-white/10 hover:via-purple-500/10 hover:to-pink-500/10 hover:border-white/30 hover:shadow-xl hover:shadow-purple-500/10"
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center justify-center w-full mb-6 overflow-hidden border aspect-video rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-700/40 border-white/10">
                          <img 
                            src={festival.imageUrl} 
                            alt={festival.label}
                            className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-105 group-hover:brightness-110 hw-accelerate"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=500&h=280&fit=crop&crop=center&q=80';
                            }}
                          />
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
                        </div>
                        <div className="text-center">
                          <div className="mb-3 text-3xl transition-transform duration-200 group-hover:scale-110">{festival.icon}</div>
                          <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-200 group-hover:text-purple-200">{festival.label}</h3>
                          <p className="text-sm transition-colors duration-200 text-white/70 group-hover:text-white/90">{festival.description}</p>
                        </div>
                      </div>
                      {formData.festival === festival.value && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-purple-500/30 rounded-3xl"
                          layoutId="selectedFestival"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {formData.festival === festival.value && (
                        <motion.div
                          className="absolute inset-0 border-2 pointer-events-none border-purple-400/70 rounded-3xl"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Custom Occasion Input - appears when "Other" is selected */}
              {formData.festival === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <label className="flex items-center mb-4 text-lg font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text">
                    <div className="relative mr-3">
                      <Edit3 className="w-5 h-5 text-purple-400" />
                      <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-30 animate-pulse" />
                    </div>
                    Custom Occasion Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.customOccasion}
                      onChange={(e) => setFormData({ ...formData, customOccasion: e.target.value })}
                      className="w-full px-6 py-4 text-white transition-all duration-300 border bg-black/30 border-white/20 rounded-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-black/40 hover:bg-black/40 hover:border-white/30 backdrop-blur-sm"
                      placeholder="e.g., Birthday, Anniversary, Graduation, Promotion..."
                      required
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    Enter the name of your special occasion to personalize the greeting message.
                  </p>
                </motion.div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                
                {/* Left Column */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <label className="flex items-center mb-4 text-base font-semibold text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                      <div className="relative mr-3">
                        <User className="w-5 h-5 text-purple-400" />
                        <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20" />
                      </div>
                      Recipient Name *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={formData.recipientName}
                        onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                        className="w-full px-6 py-4 text-white transition-all duration-300 border bg-black/30 border-white/20 rounded-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-black/40 hover:bg-black/40 hover:border-white/30 backdrop-blur-sm"
                        placeholder="Enter recipient's name"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <label className="flex items-center mb-4 text-base font-semibold text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                      <div className="relative mr-3">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20" />
                      </div>
                      Recipient Email *
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        value={formData.recipientEmail}
                        onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                        className="w-full px-6 py-4 text-white transition-all duration-300 border bg-black/30 border-white/20 rounded-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-black/40 hover:bg-black/40 hover:border-white/30 backdrop-blur-sm"
                        placeholder="recipient@example.com"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <label className="flex items-center mb-4 text-base font-semibold text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                      <div className="relative mr-3">
                        <MessageSquare className="w-5 h-5 text-purple-400" />
                        <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20" />
                      </div>
                      Relationship / Context
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={formData.relationship}
                        onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                        className="w-full px-6 py-4 text-white transition-all duration-300 border bg-black/30 border-white/20 rounded-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-black/40 hover:bg-black/40 hover:border-white/30 backdrop-blur-sm"
                        placeholder="friend, colleague, family, etc."
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <label className="flex items-center mb-6 text-base font-semibold text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                      <div className="relative mr-3">
                        <Volume2 className="w-5 h-5 text-purple-400" />
                        <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20" />
                      </div>
                      Tone *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {tones.map((tone, index) => (
                        <motion.button
                          key={tone.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, tone: tone.value })}
                          className={cn(
                            "group relative p-5 rounded-2xl border-2 transition-all duration-500 text-left backdrop-blur-xl shadow-lg",
                            formData.tone === tone.value
                              ? "border-purple-400/60 bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-pink-500/30 text-white shadow-purple-500/25"
                              : "border-white/20 bg-gradient-to-br from-slate-800/40 via-purple-900/20 to-slate-800/40 text-white/80 hover:bg-gradient-to-br hover:from-slate-800/60 hover:via-purple-900/30 hover:to-slate-800/60 hover:border-white/30 hover:text-white hover:shadow-purple-500/10"
                          )}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="mb-2 text-xl transition-transform duration-300 group-hover:scale-110">{tone.icon}</div>
                          <div className="text-sm font-medium leading-tight">{tone.value}</div>
                          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl group-hover:opacity-100" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                  >
                    <label className="flex items-center mb-4 text-base font-semibold text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                      <div className="relative mr-3">
                        <AtSign className="w-5 h-5 text-purple-400" />
                        <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20" />
                      </div>
                      Your Name / Company *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={formData.senderName}
                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                        className="w-full px-6 py-4 text-white transition-all duration-300 border bg-black/30 border-white/20 rounded-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-black/40 hover:bg-black/40 hover:border-white/30 backdrop-blur-sm"
                        placeholder="Your name or company name"
                        required
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Personal Touches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <label className="flex items-center mb-4 text-base font-semibold text-transparent bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                  <div className="relative mr-3">
                    <Edit3 className="w-5 h-5 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-20" />
                  </div>
                  Additional Personal Touches
                </label>
                <div className="relative group">
                  <textarea
                    value={formData.additionalTouches}
                    onChange={(e) => setFormData({ ...formData, additionalTouches: e.target.value })}
                    className="w-full h-32 px-6 py-4 text-white transition-all duration-300 border resize-none bg-black/30 border-white/20 rounded-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-black/40 hover:bg-black/40 hover:border-white/30 backdrop-blur-sm"
                    placeholder="e.g., Mention their new job, include gratitude for past support, reference shared memories..."
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col gap-6 pt-8 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <MovingBorder
                  duration={3000}
                  className="flex-1"
                  onClick={generateAndSendEmail}
                  disabled={loading}
                >
                  <div className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white">
                    {loading ? (
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-3"
                        >
                          <Zap className="w-6 h-6" />
                        </motion.div>
                        Sending Magic...
                      </div>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3" />
                        Generate & Send
                      </>
                    )}
                  </div>
                </MovingBorder>
                
                <motion.button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-8 py-4 font-medium transition-all duration-300 border-2 sm:flex-none border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:border-white/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset Form
                </motion.button>
              </motion.div>
            </form>
          </div>
        </BackgroundGradient>
      </div>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 scroll-momentum scroll-performance">
      {/* Global Comet Effects - Full Page Coverage */}
      <div className="fixed inset-0 z-0 pointer-events-none animate-optimized">
        <Meteors number={100} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(34,197,94,0.12),transparent)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(16,185,129,0.1),transparent)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.08),transparent)] animate-pulse-slow" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)] animate-pulse-slow" />
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-green-500/10 blur-3xl animate-bounce-slow" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 blur-3xl animate-pulse-slow" />
        {/* Additional success celebration orbs */}
        <div className="absolute rounded-full top-1/3 right-1/4 w-72 h-72 bg-green-400/8 blur-2xl animate-float" />
        <div className="absolute w-56 h-56 rounded-full bottom-1/3 left-1/3 bg-emerald-400/12 blur-2xl animate-bounce-slow" />
        <div className="absolute w-40 h-40 rounded-full top-2/3 left-1/5 bg-teal-500/10 blur-xl animate-pulse-slow" />
      </div>

      {renderNavigation()}
      
      <div className="relative z-10 px-6 py-12 mx-auto max-w-7xl lg:px-8">
        <motion.div 
          className="grid items-start gap-12 lg:grid-cols-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Column - Success Status */}
          <div className="space-y-8">
            <BackgroundGradient className="p-1 rounded-3xl">
              <div className="p-8 border bg-gradient-to-br from-slate-900/95 via-purple-950/90 to-slate-900/95 backdrop-blur-2xl rounded-3xl border-white/20">
                {/* Success Icon with Animation */}
                <motion.div 
                  className="relative mx-auto mb-8 w-fit"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${getCurrentFestival().gradient} flex items-center justify-center relative overflow-hidden shadow-2xl`}>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <CheckCircle className="z-10 w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  {/* Floating particles around success icon */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
                        style={{
                          top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
                          left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 30}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <h2 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text">
                    Message Sent Successfully! 🎉
                  </h2>
                  <p className="mb-6 text-lg text-white/80">
                    Your {formData.festival === 'Other' ? formData.customOccasion : formData.festival} greeting has been delivered
                  </p>
                </motion.div>
                
                {/* Recipient Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-8"
                >
                  <div className="p-6 border bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-teal-500/10 backdrop-blur-sm rounded-2xl border-emerald-400/20">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-400">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="mb-1 text-sm font-medium text-emerald-300">Delivered to:</p>
                        <p className="text-lg font-semibold text-white truncate">{formData.recipientEmail}</p>
                        <p className="text-sm text-white/60">Recipient: {formData.recipientName}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <motion.div
                          className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <MovingBorder
                    duration={3000}
                    onClick={resetForm}
                    className="flex-1"
                  >
                    <div className="flex items-center justify-center px-6 py-3 text-base font-semibold text-white">
                      <Send className="w-5 h-5 mr-2" />
                      Send Another Message
                    </div>
                  </MovingBorder>
                  
                  <motion.button
                    className="flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 border-2 border-white/20 rounded-xl text-white/60 hover:bg-white/5 hover:border-white/30 hover:text-white/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    View History
                  </motion.button>
                </motion.div>

                {/* Thank you message */}
                <motion.p 
                  className="mt-8 text-sm text-center text-white/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  Thank you for using FestiveMailer ✨
                </motion.p>
              </div>
            </BackgroundGradient>
          </div>

          {/* Right Column - Message Preview */}
          {previewData.subject && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <BackgroundGradient className="p-1 rounded-3xl">
                <div className="p-8 border bg-gradient-to-br from-slate-900/95 via-purple-950/90 to-slate-900/95 backdrop-blur-2xl rounded-3xl border-white/20">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text">
                      Message Preview
                    </h3>
                  </div>
                  
                  {/* Subject Section */}
                  <div className="mb-6">
                    <div className="p-5 border bg-gradient-to-r from-purple-500/10 via-purple-600/5 to-pink-500/10 backdrop-blur-sm rounded-2xl border-purple-400/20">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="mb-2 text-sm font-medium text-purple-300">Subject Line:</p>
                          <p className="font-semibold leading-relaxed text-white">{previewData.subject}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="mb-6">
                    <div className="p-5 overflow-y-auto border bg-gradient-to-r from-blue-500/10 via-indigo-600/5 to-purple-500/10 backdrop-blur-sm rounded-2xl border-blue-400/20 max-h-80">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="mb-3 text-sm font-medium text-blue-300">Message Content:</p>
                          <div className="prose-sm prose prose-invert max-w-none">
                            <div className="text-sm leading-relaxed whitespace-pre-wrap text-white/90">
                              {previewData.body}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 text-center border bg-white/5 backdrop-blur-sm rounded-xl border-white/10">
                      <div className="text-2xl font-bold text-emerald-400">{formData.festival === 'Other' ? formData.customOccasion : formData.festival}</div>
                      <div className="text-xs text-white/60">Occasion</div>
                    </div>
                    <div className="p-4 text-center border bg-white/5 backdrop-blur-sm rounded-xl border-white/10">
                      <div className="text-2xl font-bold text-purple-400">{formData.tone.split(' ')[0]}</div>
                      <div className="text-xs text-white/60">Tone</div>
                    </div>
                  </div>
                </div>
              </BackgroundGradient>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentScreen) {
    case 'success':
      return renderSuccessScreen();
    default:
      return renderCreateScreen();
  }
}

export default App;