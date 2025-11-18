import { useState } from 'react';
import './ChatModal.scss';

interface ChatModalProps {
  onClose: () => void;
}

const ChatModal = ({ onClose }: ChatModalProps) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string; isUser: boolean}[]>([
    { text: 'Olá! Como posso ajudar você hoje? Posso te ajudar a encontrar prompts, explicar MCPs ou guiar você no uso do Amazon Q.', isUser: false }
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, { text: chatMessage, isUser: true }]);
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          text: 'Desculpe, ainda estou aprendendo. Tente navegar pelas seções do menu!',
          isUser: false
        }]);
      }, 1000);
      
      setChatMessage('');
    }
  };

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <h3>Assistente IA</h3>
        <button 
          className="chat-close" 
          onClick={onClose}
          aria-label="Fechar chat"
        >
          ×
        </button>
      </div>
      <div className="chat-body">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.isUser ? 'user-message' : 'assistant-message'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && chatMessage.trim()) {
              handleSendMessage();
            }
          }}
        />
        <button 
          className="chat-send-btn"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatModal;