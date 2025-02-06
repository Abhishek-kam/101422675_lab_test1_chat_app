import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border p-2"
            />
            <button type="submit" className="bg-green-500 text-white p-2 ml-2">
                Send
            </button>
        </form>
    );
};

export default MessageInput;
