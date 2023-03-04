import React, { useState } from "react";
import axios from "axios";
import "./styles.scss";

const API_URL = "https://api.openai.com/v1/completions";

const headers = {
  Authorization: "Bearer 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",
  "Content-Type": "application/json",
};

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState("");

  const handleSend = () => {
    const updatedChatHistory = chatHistory + "[User]: " + inputText;
    setChatHistory(updatedChatHistory);
    console.log(updatedChatHistory);

    axios
      .post(
        `${API_URL}`,
        {
          prompt: updatedChatHistory,
          model: "text-davinci-003",
          temperature: 0.7,
          max_tokens: 2048,
        },
        { headers: headers }
      )
      .then((response) => {
        setChatHistory(
          updatedChatHistory +
            "\n[text-davinci-003]: " +
            response.data.choices[0].text +
            "\n\n"
        );
      })
      .catch((error) => {
        console.error(error);
      });

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

  return (
    <div className="chat-container">
      <div className="chat-history">
        <textarea readOnly value={chatHistory} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onKeyDown={handleKeyDown}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
