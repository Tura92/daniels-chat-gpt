import React, { FC, ReactElement, useState } from "react";
import axios from "axios";
import "../styles.scss";
import MessageModel from "../models/Message";
import MessageComponent from "./Message";

const API_URL = "https://api.openai.com/v1/completions";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

let testMessages: MessageModel[] = [
  new MessageModel("Alice", "Hi there!"),
  new MessageModel("Bob", "Hey Alice, how's it going?"),
  new MessageModel("Alice", "Not bad, thanks. How about you?"),
  new MessageModel("Bob", "Pretty good, just been busy with work."),
  new MessageModel("Alice", "I know the feeling!"),
];

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const Chat2: FC = (): ReactElement => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const addMessage = (message: MessageModel) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const axiosRequest = (newMessages: MessageModel[]) => {
    setIsThinking(true);
    axios
      .post(
        `${API_URL}`,
        {
          prompt: inputText,
          model: "text-davinci-003",
          temperature: 0.7,
          max_tokens: 2048,
        },
        { headers: headers }
      )
      .then((response) => {
        addMessage(new MessageModel("chat", response.data.choices[0].text));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsThinking(false);
      });
  };

  const handleSend = () => {
    const updatedMessages = [...messages, new MessageModel("me", inputText)];
    setMessages(updatedMessages);
    axiosRequest(updatedMessages);
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

  return (
    <div className="chat-container">
      <div className="center">
        <div className="chat">
          <div className="messages" id="chat">
            <div className="time">Today at 11:41</div>
            <div className="message">Ask me something!</div>
            <div>
              {messages.map((message) => (
                <MessageComponent key={message.id} message={message} />
              ))}
              <div>{isThinking && loadingMessage()}</div>
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

export default Chat2;
