import Messenger from "@/components/admin/services/Messenger";
import ProtectedPage from "@/components/ProtectedPage";

const MessengerPage = () => {
  return (
    <ProtectedPage
      title="Admin | Messenger"
      restrictions={["admin", "committee"]}
    >
      <div className="w-11/12 justify-center bg-hackathon-page z-0 h-screen">
        <title>Admin | Messenger</title>
        <Messenger />
      </div>
    </ProtectedPage>
  );
};

export default MessengerPage;
