import { BiSearch } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import api from "../../axios/api";
import searchZustand from "../../zustand/search";
import taskZustand from "../../zustand/task";

import userNoPhoto from "/src/assets/admin/img/avatars/user-no-photo.png";
import clientIMG from "../../assets/admin/img/icons/client-no-logo.png";

import "./AdminModal.css";

import ModalLoading from "./ModalLoading";

const AdminModal = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [loadingToModal, setLoadingToModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [title, setTitle] = useState("");

  const {
    open,
    setOpen,
    about,
    id_responsavel,
    setIdResponsavel,
    id_cliente,
    setIdCliente,
    members,
    setMembers,
    clients,
    setClients,
  } = taskZustand((state) => state);

  const { result, cleanSearch, handleSearchColaborador, handleSearchCliente } =
    searchZustand((state) => state);

  const principalRef = useRef(null);
  const secundaryRef = useRef(null);

  let searchContentPrev = "";

  const handleSearch = async (e) => {
    e.preventDefault();

    //verificando se a string é vazia, se contem apenas espaços em branco, se possui caracteres especias
    if (search.trim().length === 0 || /^[^\w\s]+$/.test(search)) return;

    try {
      setLoadingToModal(true);

      if (about === "funcionário") {
        const returned = await handleSearchColaborador(search);
        setTitle(
          `${returned.resultTotal} resultado (s) para "${returned.query}"`
        );
        cleanSearch();
      } else {
        const returned = await handleSearchCliente(search);
        setTitle(
          `${returned.resultTotal} resultado (s) para "${returned.query}"`
        );
        cleanSearch();
      }

      setSearch("");
      setIsSearch(true);
    } catch (error) {
      console.log(error);
      alert("A pesquisa falhou, tente novamente!");
    } finally {
      setLoadingToModal(false);
    }
  };

  const closeModal = () => {
    setOpen(!open);
    setIsSearch(false);
    principalRef.current.classList.remove("admin-d-none");
    secundaryRef.current.classList.add("admin-d-none");
    setTitle(`Seleciona um ${about}`);
  };

  const handleonClickMember = (index) => {
    let aux = [...members];

    const select = aux[index].select;

    aux[index].select = !select;

    if (aux[index].select === true) {
      setIdResponsavel(aux[index]._id);

      const aux2 = aux.map((value) => {
        if (value !== aux[index]) value.select = false;
        return value;
      });

      aux = [...aux2];
    } else setIdResponsavel("");

    setMembers(aux);
  };

  const handleonClickClient = (index) => {
    let aux = [...clients];

    const select = aux[index].select;

    aux[index].select = !select;

    if (aux[index].select === true) {
      setIdCliente(aux[index]._id);

      const aux2 = aux.map((value) => {
        if (value !== aux[index]) value.select = false;
        return value;
      });

      aux = [...aux2];
    } else setIdCliente("");

    setClients(aux);
  };

  const getMembers = async (api_url) => {
    const res = await api.get(api_url);
    const dados = res.data;

    const auxDados = [];

    dados.forEach((value) => {
      if (
        value.nome !== "Phericcontas" &&
        value.cargo !== "PCA" &&
        value.cargo !== "Gerente"
      )
        auxDados.push({ ...value, select: false });
    });

    auxDados.forEach((value, index) => {
      if (value._id === id_responsavel) handleonClickMember(index);
    });

    setMembers(auxDados);
  };

  const getClients = async (api_url) => {
    const res = await api.get(api_url);
    const dados = res.data;

    const auxDados = [];

    dados.forEach((value) => {
      auxDados.push({ ...value, select: false });
    });

    auxDados.forEach((value, index) => {
      if (value._id === id_cliente) handleonClickClient(index);
    });

    setClients(auxDados);
  };

  useEffect(() => {
    if (!loadingToModal && isSearch) {
      principalRef.current.classList.add("admin-d-none");
      secundaryRef.current.classList.remove("admin-d-none");
    }
  }, [loadingToModal]);

  useEffect(() => {
    setTitle(`Seleciona um ${about}`);
  }, [about]);

  useEffect(() => {
    const api_url_member = import.meta.env.VITE_API_URL_MEMBERS;
    getMembers(api_url_member);

    const api_url_client = import.meta.env.VITE_API_URL_CLIENTE;
    getClients(api_url_client);
  }, []);

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
          <div id="modal-content" className="admin-modal-content">
            <div className="admin-bar-modal">
              <form onSubmit={handleSearch} className="admin-w-100">
                <input
                  type="search"
                  id="search"
                  name="search"
                  className="admin-form-control admin-d-inline-block"
                  placeholder={`Pesquisar ${about}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  id="btn-search"
                  className="admin-btn-input admin-btn admin-button-select inside"
                >
                  <BiSearch />
                </button>
              </form>
            </div>
            {/* <span class="close">&times;</span> */}
            <main className="admin-content">
              <div className="admin-row">
                <div className="admin-col-12 admin-title-btn">
                  <h1 className="admin-h3 admin-mb-3">{title}</h1>
                </div>
                <div className="admin-col-12 admin-d-flex">
                  <div id="principal" ref={principalRef} className="admin-row">
                    {about === "funcionário"
                      ? members.map((member, index) => {
                          return (
                            <div
                              onClick={() => handleonClickMember(index)}
                              key={member._id}
                              style={{ minWidth: "20.5em" }}
                              className={
                                member.select
                                  ? "admin-card-selected admin-card admin-card-member admin-col-12 admin-col-md-3 admin-col-lg-4 admin-min-card"
                                  : "admin-card admin-card-member admin-col-12 admin-col-md-3 admin-col-lg-4 admin-min-card"
                              }
                            >
                              <div className="admin-card-content">
                                <img
                                  className="admin-card-img-top admin-card-img-member"
                                  src={
                                    member.foto_url
                                      ? `${apiUrl}/${member.foto_url}`
                                      : userNoPhoto
                                  }
                                  alt={member.nome}
                                  width="276"
                                  height="276"
                                />
                                <div className="admin-card-header">
                                  <h5 className="admin-card-title admin-mb-0">
                                    {member.nome}
                                  </h5>
                                </div>
                                <div className="admin-card-body">
                                  <p className="admin-card-text">
                                    {member.cargo}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : clients.map((client, index) => {
                          // if (client._id === id_cliente) handleonClickClient(index)
                          return (
                            <div
                              onClick={() => handleonClickClient(index)}
                              key={client._id}
                              style={{ minWidth: "21rem" }}
                              className={
                                client.select
                                  ? "admin-card-selected admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                                  : "admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                              }
                            >
                              <div className="admin-card-content">
                                <img
                                  className="admin-card-img-top admin-card-img-client"
                                  src={
                                    client.foto_url
                                      ? `${apiUrl}/${client.foto_url}`
                                      : clientIMG
                                  }
                                  alt={client.nome}
                                  max-width="276"
                                  height="138"
                                />
                                <div className="admin-card-header">
                                  <h5 className="admin-card-title admin-mb-0">
                                    {client.nome}
                                  </h5>
                                </div>
                                <div className="admin-card-body">
                                  <p className="admin-card-text">
                                    {client.area_negocio}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                  <div
                    id="secundary"
                    ref={secundaryRef}
                    className="admin-row admin-d-none"
                  >
                    {about === "funcionário"
                      ? result.map((member, index) => {
                          return (
                            <div
                              onClick={() => handleonClickMember(index)}
                              key={member._id}
                              style={{ minWidth: "20.5em" }}
                              className={
                                member.select
                                  ? "admin-card-selected admin-card admin-card-member admin-col-12 admin-col-md-3 admin-col-lg-4 admin-min-card"
                                  : "admin-card admin-card-member admin-col-12 admin-col-md-3 admin-col-lg-4 admin-min-card"
                              }
                            >
                              <div className="admin-card-content">
                                <img
                                  className="admin-card-img-top admin-card-img-member"
                                  src={
                                    member.foto_url
                                      ? `${apiUrl}/${member.foto_url}`
                                      : userNoPhoto
                                  }
                                  alt={member.nome}
                                  width="276"
                                  height="276"
                                />
                                <div className="admin-card-header">
                                  <h5 className="admin-card-title admin-mb-0">
                                    {member.nome}
                                  </h5>
                                </div>
                                <div className="admin-card-body">
                                  <p className="admin-card-text">
                                    {member.cargo}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : result.map((client, index) => {
                          // if (client._id === id_cliente) handleonClickClient(index)
                          return (
                            <div
                              onClick={() => handleonClickClient(index)}
                              key={client._id}
                              style={{ minWidth: "21rem" }}
                              className={
                                client.select
                                  ? "admin-card-selected admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                                  : "admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card"
                              }
                            >
                              <div className="admin-card-content">
                                <img
                                  className="admin-card-img-top admin-card-img-client"
                                  src={
                                    client.foto_url
                                      ? `${apiUrl}/${client.foto_url}`
                                      : clientIMG
                                  }
                                  alt={client.nome}
                                  max-width="276"
                                  height="138"
                                />
                                <div className="admin-card-header">
                                  <h5 className="admin-card-title admin-mb-0">
                                    {client.nome}
                                  </h5>
                                </div>
                                <div className="admin-card-body">
                                  <p className="admin-card-text">
                                    {client.area_negocio}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminModal;
