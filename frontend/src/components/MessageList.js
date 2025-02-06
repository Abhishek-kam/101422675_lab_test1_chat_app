const MessageList = ({ messages }) => {
    return (
        <div className="h-96 overflow-y-auto border p-2">
            {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                    <strong>{msg.from_user}:</strong> {msg.message}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
