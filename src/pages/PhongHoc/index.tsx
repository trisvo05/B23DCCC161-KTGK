import { Button } from "antd";
import { useState } from "react";
import RoomList from "./RoomList";
import RoomForm from "./RoomForm";
import { Room } from "@/models/room";


const RoomPage = () => {
  const [modalvisible, setmodalvisible] = useState(false);
  const [editroom, seteditroom] = useState<Room | undefined>();
  
  return (
    <div>
      <Button type="primary" onClick={() => setmodalvisible(true)}>Thêm phòng</Button>
      <RoomList onEdit={(room) => {
        seteditroom(room);
        setmodalvisible(true);
      }} />
      <RoomForm 
        visible={modalvisible} 
        onCancel={() => { setmodalvisible(false); seteditroom(undefined); }} 
        room={editroom} 
        onSave={() => {}} 
      />
    </div>
  );
};

export default RoomPage;