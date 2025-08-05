import React, { useState, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Get parameters from URL (passed from HubSpot)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get('contactId');
    const userId = urlParams.get('userId');
    const objectType = urlParams.get('objectType');
    
    setContactData({
      contactId,
      userId, 
      objectType: objectType || 'Contact'
    });
  }, []);

  // Auto-load Brian's initial analysis
  useEffect(() => {
    if (!hasInitialized) {
      const initialMessage = {
        type: 'brian',
        content: `👋 Hi! I've analyzed this deal and here's what I found:

**Status Summary:** Deal stalled in tour phase for 8 days. Customer showed high interest but no follow-up contact. URGENT: Schedule financing consultation to maintain momentum.

**Brian Score:** 7.2/10 (Medium Priority)

**Recommended Actions:** 📞 Call Today • 📧 Rate Buydown Email • 📅 Schedule Meeting

I evaluated 3 phone calls, 2 email chains, and 1 web chat. I've @mentioned the team with my feedback on each activity.

What sales coaching do you need?`,
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  const askBrian = async () => {
    if (!question.trim()) return;
    
    const userMessage = question;
    setQuestion(""); // Clear input immediately
    
    // Add user message to chat
    setMessages(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const brianResponse = "Based on your situation, here's my recommendation: Schedule a 15-minute financing consultation to show them payment options they might not know about. This approach increases conversion by 45% over generic follow-up.";
      
      // Add Brian's response to chat
      setMessages(prev => [...prev, {
        type: 'brian',
        content: brianResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'brian',
        content: "Based on your situation, here's my recommendation: Schedule a 15-minute financing consultation to show them payment options they might not know about.",
        timestamp: new Date()
      }]);
    }
    
    setLoading(false);
  };

  const handleScenarioClick = (scenario) => {
    setQuestion(scenario);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askBrian();
    }
  };

  const quickScenarios = [
    "They love the home but said rates are too high",
    "Deal stalled - no response in over a week", 
    "Ready to present financing options",
    "Haven't heard from them in weeks",
    "Need to create urgency for decision"
  ];

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      maxWidth: '100%',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f1f5f9'
      }}>
        <img 
          src="https://s3.amazonaws.com/cdn.mybuildercloud.com/builderdesigns.com/042720d164d8fafd0364b1aa32e77ae2-brian%20avatar.svg"
          alt="Brian"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid #ff7a59',
            boxShadow: '0 4px 12px rgba(255, 122, 89, 0.3)',
            backgroundColor: 'white'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{
          display: 'none',
          background: 'linear-gradient(135deg, #ff7a59 0%, #ff6b47 100%)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: '18px',
          boxShadow: '0 4px 12px rgba(255, 122, 89, 0.3)',
          border: '2px solid white'
        }}>
          B
        </div>
        <div>
          <h1 style={{
            margin: '0',
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b'
          }}>
            Ask Brian
          </h1>
          <p style={{
            margin: '0',
            fontSize: '14px',
            color: '#64748b'
          }}>
            Your personal HubSpot sales coach
          </p>
        </div>
      </div>

      {/* Analysis Section - Removed since it's now in chat */}

      {/* Chat Messages */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          💬 Chat with Brian
        </h2>

        {/* Messages Container */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          padding: '20px',
          minHeight: '400px',
          maxHeight: '600px',
          overflowY: 'auto',
          border: '1px solid #e2e8f0',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((message, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: message.type === 'user' ? '#3b82f6' : '#ff7a59',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {message.type === 'user' ? '👤' : 'B'}
                </div>
                
                {/* Message Bubble */}
                <div style={{
                  backgroundColor: message.type === 'user' ? '#3b82f6' : 'white',
                  color: message.type === 'user' ? 'white' : '#1e293b',
                  padding: '16px 20px',
                  borderRadius: message.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: '85%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: message.type === 'brian' ? '1px solid #ff7a59' : 'none'
                }}>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line',
                    marginBottom: message.type === 'brian' && !message.content.includes('👋') ? '8px' : '0'
                  }}>
                    {message.content}
                  </div>
                  {message.type === 'brian' && !message.content.includes('👋') && (
                    <div style={{
                      fontSize: '12px',
                      color: '#a16207',
                      fontStyle: 'italic'
                    }}>
                      💡 <strong>Success Rate:</strong> 73% of buyers move forward with this approach
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ff7a59',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  B
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  border: '1px solid #ff7a59',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    fontStyle: 'italic'
                  }}>
                    🤔 Brian is thinking...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end'
        }}>
          <div style={{ flex: 1 }}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Brian anything about sales strategies, objection handling, or deal guidance..."
              style={{
                width: '100%',
                minHeight: '50px',
                maxHeight: '120px',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            onClick={askBrian}
            disabled={loading || !question.trim()}
            style={{
              backgroundColor: loading || !question.trim() ? '#94a3b8' : '#ff7a59',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading || !question.trim() ? 'none' : '0 2px 8px rgba(255, 122, 89, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? '⏳' : 'Send'}
          </button>
        </div>
      </div>

      {/* Quick Scenarios */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '12px'
        }}>
          🚀 Quick Scenarios
        </h3>
        <div style={{
          display: 'grid',
          gap: '8px'
        }}>
          {quickScenarios.map((scenario, index) => (
            <button
              key={index}
              onClick={() => handleScenarioClick(scenario)}
              style={{
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: '#475569'
              }}
            >
              {scenario}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #e2e8f0',
        paddingTop: '16px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#64748b',
          margin: '0'
        }}>
          🏠 <strong>Brian AI Sales</strong> from Builder Designs
        </p>
      </div>
    </div>
  );
};

export default App;
