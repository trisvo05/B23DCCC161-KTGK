import { Modal, Form, Input, Select, InputNumber } from "antd";
import { useEffect } from "react";
import { addRoom, updateRoom, getRooms } from "@/services/roomService";
import { Room } from "@/models/room";

const RoomForm = ({
  visible,
  onCancel,
  room,
  onSave,
}: {
  visible: boolean;
  onCancel: () => void;
  room?: Room;
  onSave: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (room) {
      form.setFieldsValue(room);
    } else {
      form.resetFields();
    }
  }, [room, form]);


        const handleOk = () => {
            form.validateFields().then((values) => {
            if (!room) {
                addRoom({ ...values, id: values.id});  // Thêm mới
            } else {
                updateRoom({ ...room, ...values });  // Cập nhật bản ghi
            }
            onSave();
            onCancel();
            });
        };
  

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={handleOk} title="Thêm/Chỉnh sửa phòng">
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="Mã phòng" rules={[{ required: true , max:10}]}> 
          <Input disabled={!!room} />
        </Form.Item>
        <Form.Item name="name" label="Tên phòng" rules={[{ required: true, max: 50 }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="capacity" label="Số chỗ ngồi" rules={[{ required: true, type: "number", min: 10, max: 200 }]}> 
          <InputNumber />
        </Form.Item>
        <Form.Item name="type" label="Loại phòng" rules={[{ required: true }]}> 
          <Select options={[{ label: "Lý thuyết", value: "Lý thuyết" }, { label: "Thực hành", value: "Thực hành" }, { label: "Hội trường", value: "Hội trường" }]} />
        </Form.Item>
        <Form.Item name="manager" label="Người phụ trách" rules={[{ required: true }]}> 
          <Select options={[{ label: "Vo Minh Tri", value: "Vo Minh Tri" }, { label: "Nguyen Quoc Hung", value: "Nguyen Quoc Hung" }]} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomForm;