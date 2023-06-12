import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import api from "../../axios/api";
import loginZustand from "../../zustand/login";

import "./AdminModal.css";

import ModalLoading from "./ModalLoading";

const AdminModal = ({
  open,
  setOpen,
  title,
  msg,
  btnNoCancel,
  dCancelBtn,
  handleNoCancel = async () => {},
  goToAssociate = () => {}
}) => {
  const [loadingToModal, setLoadingToModal] = useState(false);

  const navigate = useNavigate()

  const handleCanGo = async () => {
    try{
      setLoadingToModal(true)
      await handleNoCancel()
    }finally{
      setLoadingToModal(false)
    }
  }

  const closeModal = async () => {
    setOpen(!open);
  };

  return (
    <div
      id="admin-modal"
      className={open ? "admin-modal admin-d-block" : "admin-modal"}
    >
      {loadingToModal ? (
        <ModalLoading />
      ) : (
        <>
          <div className="div-close-model">
            <a onClick={closeModal} className="admin-close alert">
              <MdClose />
            </a>
          </div>
          {/* Modal content */}
          <div className="admin-modal-alert-d-center">
            <div id="modal-content" className="admin-modal-alert-content">
              {/* <span class="close">&times;</span> */}
              <main className="admin-content-alert">
                <div className="admin-row admin-d-flex">
                  <div className="admin-col-12">
                    <h1 className="admin-h3 admin-mb-3">{title}</h1>
                    <p>{msg}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      height: "content",
                    }}
                    className="admin-col-12 admin-mt-4"
                  >
                    <div className="admin-d-inline-block">
                      <a
                        onClick={closeModal}
                        className={
                          dCancelBtn
                            ? "btn-cancel admin-btn admin-me-2 admin-main-btn"
                            : "d-none"
                        }
                      >
                        Cancelar
                      </a>
                      {!dCancelBtn ? (
                        <a
                          onClick={goToAssociate}
                          className="btn-update admin-btn admin-me-2 admin-main-btn"
                        >
                          {btnNoCancel}
                        </a>
                      ) : (
                        <a  onClick={handleCanGo} className="btn-update admin-btn admin-me-2 admin-main-btn">
                          {btnNoCancel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminModal;
