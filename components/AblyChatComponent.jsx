import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './AblyChatComponent.module.css';
import { useSession } from "next-auth/react";

export default function AblyChatComponent({ roomDetails }) {
  const { data: session } = useSession();

  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const [messageHistory, setMessageHistory] = useState(roomDetails[0]?.messages || []);
  const [messageHistoryLoaded, setMessageHistoryLoaded] = useState([]);

  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel(roomDetails[0]?._id, (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = async (messageText) => {
    const allMessages = [...messageHistory, { id: Date.now(), name: session?.user?.id, message: messageText }];

    setMessageHistory(allMessages);
    console.log("Notes: " + allMessages);

    channel.publish({ name: "chat-message", data: messageText, id: new Date().toISOString() });
    setMessageText("");

    const postURL = `/api/newroom?roomIdPut=${roomDetails[0]?._id}`; //Our previously set up route in the backend
    await fetch(postURL, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: allMessages,
      }),
    }).then(() => {
      console.log("send");
    });

    // inputBox.focus();
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diff = now - messageTime;
    const minutes = Math.floor(diff / 1000 / 60);

    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  useEffect(() => {
    setMessageHistoryLoaded(roomDetails[0]?.messages || []);
  }, []);

  const oldMessages = messageHistoryLoaded.map((message, index) => {
    const author = message.name === session?.user?.id ? "me" : "other";
    return (
      <div key={index} className={`${styles.message} ${styles[author]}`}>
        <span className={styles.messageText}>{message.message}</span>
        <span className={styles.timestamp}>{formatTimestamp(message.id)}</span>
      </div>
    );
  });

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <div key={index} className={`${styles.message} ${styles[author]}`}>
        <span className={styles.messageText}>{message.data}</span>
        <span className={styles.timestamp}>just now</span>
      </div>
    );
  });

  // useEffect(() => {
  //   messageEnd.scrollIntoView({ behavior: "smooth" });
  // });

  return (
    <div className={`${styles.chatHolder} `}>
      <div className={styles.chatText}>
        {oldMessages}
        {messages}
        <div ref={(element) => { messageEnd = element; }}></div>
      </div>
      <form onSubmit={handleFormSubmission} className={`${styles.form}`}>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`${styles.textarea} ${styles.textBlack}`}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
}
