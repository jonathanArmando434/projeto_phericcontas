import "./AdminModal.css";

import ModalLoading from "./ModalLoading";

const AdminModal = ({ open }) => {
 return (
    <div
      id="admin-modal"
      className={open ? "admin-modal admin-d-block" : "admin-modal"}
    >
        <ModalLoading />
    </div>
  );
};

export default AdminModal;
