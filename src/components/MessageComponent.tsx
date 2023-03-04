import React, { useState } from "react";

interface MessageProps {
  message: {
    id: number;
    creator: string;
    content: string;
    timestamp: Date;
  };
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`message ${message.creator === "me" ? "right" : ""}`}>
      {message.content}
    </div>
  );
};

export default MessageComponent;