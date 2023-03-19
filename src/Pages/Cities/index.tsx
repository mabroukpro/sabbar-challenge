import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, message } from "antd";
import { useCallback, useState } from "react";
import { MessageType } from "../../enums/messageType";
import AddCityModal from "./components/addCityModal";
import CitiesTable from "./components/citiiesTable";

function CitiesPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = useCallback(
    (message: string, type: MessageType) => {
      switch (type) {
        case MessageType.ERROR:
          messageApi.error(message);
          break;
        case MessageType.SUCCESS:
          messageApi.success(message);
          break;
      }
    },
    [messageApi]
  );
  return (
    <>
      {contextHolder}
      <CitiesTable onMessage={showMessage} />
      <AddCityModal onClose={() => setOpenModal(false)} open={openModal} />
      <FloatButton
        onClick={(ev) => setOpenModal(true)}
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
      />
    </>
  );
}

export default CitiesPage;
