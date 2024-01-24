/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../utilts/chatSlice";
import { generateRandomName, makeRandomMessge } from "../../../utilts/helper";

const LiveChat = () => {
  const isMenuOpen = useSelector((store) => store?.app?.isMenuOpen);
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store?.chat?.messages);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessge(20),
        })
      );
    }, 1500);
    return () => {
      clearInterval(i);
    };
  }, []);
  return (
    <>
      <div className="w-full h-[600px] p-2 ml-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessages?.map((chatMessage, i) => (
            <ChatMessage
              key={i}
              name={chatMessage?.name}
              message={chatMessage?.message}
            />
          ))}
        </div>
      </div>
      <form
        className="w-full p-2 ml-2 border border-black"
        onSubmit={(e) => {
          e.preventDefault(),
            console.log("🚀 ~ LiveChat ~ liveMessage:", liveMessage);
          dispatch(
            addMessage({
              name: "Tamaghna Ghosh",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className={
            isMenuOpen
              ? "w-[350px] rounded-full p-2 m-2"
              : "w-[550px] rounded-full p-2 m-2"
          }
          placeholder="chat...."
          type="text"
          onChange={(e) => setLiveMessage(e.target.value)}
          value={liveMessage}
        />
        <button className="bg-slate-200 px-4 py-2 rounded-full">Send</button>
      </form>
    </>
  );
};

export default LiveChat;


