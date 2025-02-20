import { FaTimes } from "react-icons/fa";
// import Image from "next/image";

const Modal = ({ data, setModal }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-1/2 h-3/4 rounded-xl">
      <div className="flex justify-between items-center p-3 rounded-t-xl bg-hackathon-green-300">
        <span className="text-3xl text-white font-bold">{data.title}</span>
        <FaTimes
          onClick={() => setModal(null)}
          className="hover:cursor-pointer text-white hover:!text-red-500 text-xl"
        />
      </div>
      <div className="px-3 rounded-b-xl py-2 border-b-2 border-hackathon-darkgray relative flex w-full h-full justify-center bg-hackathon-green-300">
        <embed
          fill={true}
          className="object-cover w-full h-full"
          src={data.src}
          alt="Photo of the Judge"
        />
      </div>
    </div>
  );
};

export default Modal;
