/* eslint-disable react/prop-types */
import { USERICON } from "../../../utilts/constants";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center shadow-sm p-2">
      <img className="h-8 col-span-1" alt="user" src={USERICON} />
      <span className="font-bold px-2">{name}</span>
      <span className="">{message}</span>
    </div>
  );
};

export default ChatMessage;
