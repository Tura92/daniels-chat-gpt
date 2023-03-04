import React from "react";

interface MessageProps {
  message: {
    id: number;
    creator: string;
    content: string;
    timestamp: Date;
  };
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return <div className="message">{message.content}</div>;
};

export default MessageComponent;
