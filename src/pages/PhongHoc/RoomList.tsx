import { Room } from "@/models/room";
import { Table, Button, Space, Modal, Select, Input } from "antd";
import { useState, useEffect } from "react";
import { getRooms, deleteRoom } from "@/services/roomService";

const RoomList = ({ onEdit }: { onEdit: (room: Room) => void }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterManager, setFilterManager] = useState("");

  useEffect(() => {
    const fetchedRooms = getRooms();
    setRooms(fetchedRooms);
    setFilteredRooms(fetchedRooms);
  }, []);

  useEffect(() => {
    let filtered = rooms;
    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.id.includes(searchTerm) ||
          room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType) {
      filtered = filtered.filter((room) => room.type === filterType);
    }
    if (filterManager) {
      filtered = filtered.filter((room) => room.manager === filterManager);
    }
    setFilteredRooms(filtered);
  }, [searchTerm, filterType, filterManager, rooms]);

  const handleDelete = (id: string, capacity: number) => {
    if (capacity >= 30) {
      alert("Chỉ xóa được khi phòng dưới 30 chỗ ngồi");
      return;
    }
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa phòng này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteRoom(id);
        const updatedRooms = getRooms();
        setRooms(updatedRooms);
      },
    });
  };

  const columns = [
    { title: "Mã phòng", dataIndex: "id" },
    { title: "Tên phòng", dataIndex: "name" },
    { title: "Số chỗ ngồi", dataIndex: "capacity" },
    { title: "Loại phòng", dataIndex: "type" },
    { title: "Người phụ trách", dataIndex: "manager" },
    {
      title: "Hành động",
      render: (room: Room) => (
        <Space>
          <Button onClick={() => onEdit(room)}>Sửa</Button>
          <Button danger onClick={() => handleDelete(room.id, room.capacity)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Tìm kiếm theo mã phòng, tên phòng"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, width: 200 }}
      />
      <Select
        placeholder="Lọc theo loại phòng"
        onChange={(value) => setFilterType(value || "")}
        allowClear
        style={{ marginBottom: 16, width: 200, marginLeft: 10 }}
      >
        <Select.Option value="Lý thuyết">Lý thuyết</Select.Option>
        <Select.Option value="Thực hành">Thực hành</Select.Option>
        <Select.Option value="Hội trường">Hội trường</Select.Option>
      </Select>
      <Select
        placeholder="Lọc theo người phụ trách"
        onChange={(value) => setFilterManager(value || "")}
        allowClear
        style={{ marginBottom: 16, width: 200, marginLeft: 10 }}
      >
        <Select.Option value="Vo Minh Tri">Vo Minh Tri</Select.Option>
        <Select.Option value="Nguyen Quoc Hung">Nguyen Quoc Hung</Select.Option>
      </Select>
      <Table columns={columns} dataSource={filteredRooms} rowKey="id" />
    </div>
  );
};

export default RoomList;
