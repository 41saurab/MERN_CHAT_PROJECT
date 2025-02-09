// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMessages, sendMessage } from "@/store/slices/chatSlice";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

// const ChatWindow = ({ selectedUser }) => {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const { messages, loading } = useSelector((state) => state.chat);
//     const [messageText, setMessageText] = useState("");

//     useEffect(() => {
//         if (selectedUser?._id) {
//             dispatch(fetchMessages(selectedUser._id));
//         }
//     }, [dispatch, selectedUser, user?._id]);

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!messageText.trim() || !selectedUser?._id) return;

//         try {
//             await dispatch(
//                 sendMessage({
//                     receiver: selectedUser._id,
//                     message: messageText,
//                 })
//             ).unwrap();

//             setMessageText("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     // Reference to the bottom of the chat window
//     const messagesEndRef = useRef(null);
//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]); // Runs every time messages are updated

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="flex flex-col h-[89vh] w-full bg-slate-100"
//         >
//             <div className="p-2 bg-slate-100 shadow-md flex items-center">
//                 <img src={selectedUser?.pic || "/default-avatar.png"} alt={selectedUser?.fullName || "User"} className="rounded-full h-12 w-12 mr-4" />
//                 <h2 className="text-lg font-semibold text-slate-700">{selectedUser?.fullName || "Chat"}</h2>
//             </div>

//             <div className="flex-1 overflow-auto p-4 scrollbar-hidden">
//                 {messages?.length > 0 ? (
//                     messages.map((msg) => (
//                         <motion.div
//                             key={msg._id}
//                             className={`p-2 my-2 flex ${msg.sender?._id === user?._id ? "justify-end" : "justify-start"}`}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <div className="flex flex-col w-fit">
//                                 <span className={`text-xs text-gray-500 dark:text-gray-400 mb-1 ${msg.sender?._id === user?._id ? "text-right" : "text-left"}`}>
//                                     {new Date(msg.createdAt).toLocaleTimeString([], {
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                         hour12: true,
//                                     })}
//                                 </span>

//                                 <div
//                                     className={`px-4 py-2 rounded-lg text-white w-fit ${
//                                         msg.sender?._id === user?._id ? "bg-[#e11d48] text-right ml-auto" : "bg-[#e12c53] text-left"
//                                     }`}
//                                 >
//                                     <span>{msg.message}</span>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))
//                 ) : (
//                     <p className="text-center text-slate-400">No messages yet.</p>
//                 )}
//                 {/* Reference for scrolling */}
//                 <div ref={messagesEndRef} />
//             </div>

//             <form className="p-4 flex border-t">
//                 <Input
//                     type="text"
//                     className="w-full p-3 border focus:outline-slate-400 rounded-lg text-slate-800 bg-slate-100"
//                     placeholder="Type a message..."
//                     value={messageText}
//                     onChange={(e) => setMessageText(e.target.value)}
//                 />
//                 <Button className="ml-2 px-6  text-white rounded-lg py-3 transition duration-200" onClick={handleSendMessage}>
//                     Send
//                 </Button>
//             </form>
//         </motion.div>
//     );
// };

// export default ChatWindow;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMessages, sendMessage } from "@/store/slices/chatSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";

import socket from "@/config/socket-config";

const ChatWindow = ({ selectedUser }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { messages, loading } = useSelector((state) => state.chat);
    const [messageText, setMessageText] = useState("");

    // Reference to the bottom of the chat window
    const messagesEndRef = useRef(null);

    // Fetch messages when the selected user changes
    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(fetchMessages(selectedUser._id));
        }

        // Listen for new messages from the socket (both from other users and the sender)
        socket.on("newMessageReceived", (newMessage) => {
            if (newMessage.receiver === user?._id || newMessage.sender === user?._id) {
                dispatch(fetchMessages(selectedUser._id)); // Update messages when a new one is received
            }
        });

        // Cleanup socket listener when component unmounts
        return () => {
            socket.off("newMessageReceived");
        };
    }, [dispatch, selectedUser, user?._id]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageText.trim() || !selectedUser?._id) return;

        try {
            // Dispatch message to backend to store in DB
            await dispatch(
                sendMessage({
                    receiver: selectedUser._id,
                    message: messageText,
                })
            ).unwrap();

            // Emit message to socket server
            const messageData = {
                sender: user?._id,
                receiver: selectedUser._id,
                message: messageText,
            };

            socket.emit("newMessage", messageData); // Emit to backend

            setMessageText(""); // Clear message input after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-[89vh] w-full bg-slate-100"
        >
            <div className="p-2 bg-slate-100 shadow-md flex items-center">
                <img src={selectedUser?.pic || "/default-avatar.png"} alt={selectedUser?.fullName || "User"} className="rounded-full h-12 w-12 mr-4" />
                <h2 className="text-lg font-semibold text-slate-700">{selectedUser?.fullName || "Chat"}</h2>
            </div>

            <div className="flex-1 overflow-auto p-4 scrollbar-hidden">
                {messages?.length > 0 ? (
                    messages.map((msg) => (
                        <motion.div
                            key={msg._id}
                            className={`p-2 my-2 flex ${msg.sender?._id === user?._id ? "justify-end" : "justify-start"}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex flex-col w-fit">
                                <span className={`text-xs text-gray-500 dark:text-gray-400 mb-1 ${msg.sender?._id === user?._id ? "text-right" : "text-left"}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </span>

                                <div
                                    className={`px-4 py-2 rounded-lg text-white w-fit ${
                                        msg.sender?._id === user?._id ? "bg-[#e11d48] text-right ml-auto" : "bg-[#d42f53] text-left"
                                    }`}
                                >
                                    <span>{msg.message}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-slate-400">No messages yet.</p>
                )}
                {/* Reference for scrolling */}
                <div ref={messagesEndRef} />
            </div>

            <form className="p-4 flex border-t" onSubmit={handleSendMessage}>
                <Input
                    type="text"
                    className="w-full p-3 border focus:outline-slate-400 rounded-lg text-slate-800 bg-slate-100"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <Button className="ml-2 px-6 text-white rounded-lg py-3 transition duration-200" type="submit">
                    Send
                </Button>
            </form>
        </motion.div>
    );
};

export default ChatWindow;
