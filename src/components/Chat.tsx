import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles.scss";

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat: FC = (): ReactElement => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const axiosRequest = (messages: Message[]) => {
    setIsThinking(true);
    axios
      .post(
        `${API_URL}`,
        {
          model: "gpt-3.5-turbo",
          messages: messages,
        },
        { headers: HEADERS }
      )
      .then((response) => {
        const assistantMessage: Message = {
          role: "assistant",
          content: `${response.data.choices[0].message.content}`,
        };

        const newMessages = [...messages, assistantMessage];

        setMessages(newMessages);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsThinking(false);
      });
  };

  const handleSend = () => {
    const userMessage: Message = {
      role: "user",
      content: `${inputText}`,
    };

    const newMessages = [...messages, userMessage];

    // Call axiosRequest with the updated messages array
    axiosRequest(newMessages);

    // Update state with the new messages array and clear input
    setMessages(newMessages);
    setInputText("");
  };

  const handleKeyDown = (event: {
    keyCode: number;
    preventDefault: () => void;
  }) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSend();
    }
  };

  const loadingMessage = () => {
    return (
      <div className="message">
        <div className="typing typing-1"></div>
        <div className="typing typing-2"></div>
        <div className="typing typing-3"></div>
      </div>
    );
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="center">
        <div className="chat">
          <div className="messages" id="chat">
            <div className="time">Today at 11:41</div>
            <div className="message">Ask me something!</div>
            <div>
              {messages.map((message, index) => (
                <div
                  key={index++}
                  className={`message ${
                    message.role === "user" ? "right" : ""
                  }`}
                >
                  {message.content}
                </div>
              ))}
              <div>{isThinking && loadingMessage()}</div>
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="input">
            <input
              type="text"
              value={inputText}
              onKeyDown={handleKeyDown}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Ask OpenAI here..."
            />
            <i className="fas fa-paper-plane" onClick={handleSend}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
