import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://api.openai.com/v1/completions";

const headers = {
  Authorization: "Bearer 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",
  "Content-Type": "application/json",
};

const ChatInput = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState("");

  const handleSend = () => {
    const updatedChatHistory = chatHistory + "[User]: " + inputText;
    setChatHistory(updatedChatHistory);
    console.log(chatHistory);

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
          updatedChatHistory + "\n" + response.data.choices[0].text + "\n"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <textarea readOnly value={chatHistory} />
      <input
        type="text"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
