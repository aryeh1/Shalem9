import React, { useState } from 'react';
import './Chat.css';

//const mySecret = process.env['TOKEN']
const engineId = 'gpt3.5-turbo';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const addMessage = (message) => {
        setMessages([...messages, message]);
    };
    
    const sendMessage = async (event) => {
        event.preventDefault();
        addMessage({ text: inputText, sender: 'user' });
        setInputText('');
        const response = await fetch(`https://api.openai.com/v1/engines/${engineId}/completions`, {
            method: 'POST',
            body: JSON.stringify({ message: inputText }),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mySecret}`
            },
        });
        const data = await response.json();
        // Adjust the following line based on the actual response structure from the GPT-3 API
        addMessage({ text: data.message, sender: 'gpt-3' });
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}: </strong> {message.text}
                    </div>
                ))}
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
                <input type="text" placeholder="Enter your message" value={inputText} onChange={(e) => setInputText(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
