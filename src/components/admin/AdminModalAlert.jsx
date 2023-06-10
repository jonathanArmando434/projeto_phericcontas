import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import api from "../../axios/api";
import loginZustand from "../../zustand/login";

import "./AdminModal.css";

import ModalLoading from "./ModalLoading";

const AdminModal = ({
  open,
  setOpen,
  id = "00000000000000000",
  getAssociateUpdated = () => {},
}) => {
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState("");
  const [loadingToModal, setLoadingToModal] = useState(false);
  const [title, setTitle] = useState("Título");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [btnNoCancel, setBtnNoCancel] = useState("Ok, percebi");

  const location = useLocation();
  const url = location.pathname;

  const handleUpdate = async (e) => {
    e.preventDefault();

    setOk(false);
    setMsg("");

    if (!photo) return;

    try {
      setLoadingToModal(true);

      if (
        url.startsWith("/admin/info/membro/") ||
        url.startsWith("/admin/perfil/")
      ) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.patch(
          "/colaborador/update-photo/" + id,
          formData
        );
        const data = res.data;
        const { message } = data;

        if (message === "Foto do colaborador atualizado com sucesso!") {
          getAssociateUpdated();
          setMsg(message);
          setOk(true);
        } else setMsg("A foto do colaborador não foi atualizada!");
      } else if (url.startsWith("/admin/info/cliente/")) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.patch("/cliente/update-logo/" + id, formData);
        const data = res.data;
        const { message } = data;

        if (message === "Logotipo do cliente foi atualizado com sucesso!") {
          getAssociateUpdated();
          setMsg(message);
          setOk(true);
        } else
          setMsg("O logotipo do cliente não foi atualizado, tente novamente!");
      }
    } catch (error) {
      console.log(error);
      setMsg("Houve um erro, tente novamente!");
    } finally {
      setLoadingToModal(false);
    }
  };

  const closeModal = async () => {
    setFile("");
    setOpen(!open);
    setOk(false);
    setMsg("");
  };

  const handleOnChangeFile = (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        setFile({});
        return;
      }

      setFile(e.target.files[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setMsg("");
    }
  };

  useEffect(() => {
    try {
      if (!file) {
        setPhoto("");
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPhoto(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.log(error);
    }
  }, [file]);

  useEffect(() => {
    if (
      url.startsWith("/admin/info/membro/") ||
      url.startsWith("/admin/perfil/")
    ) {
      setTitle("Atualizar foto do colaborador");
    } else if (url.startsWith("/admin/info/cliente/")) {
      setTitle("Atualizar logo do cliente");
    }
  }, []);

  return (
    <div
      id="admin-modal"
      className={
        open ? "admin-modal admin-d-block" : "admin-modal"
      }
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
                    <p>
                      {msg ||
                        "Tem certeza que vc deseja deletar o colaborador Jonathan-Armando do sistem"}
                    </p>
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
                        className="btn-cancel admin-btn admin-me-2 admin-main-btn"
                      >
                        Cancelar
                      </a>
                      <a
                        onClick={handleUpdate}
                        className="btn-update admin-btn admin-me-2 admin-main-btn"
                      >
                        {btnNoCancel}
                      </a>
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
