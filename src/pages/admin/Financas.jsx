import { MdOutlineFilterList, MdDoneOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import api from "../../axios/api";

import PageTitle from "../../components/admin/PageTitle";
import TaskIndicator from "../../components/admin/TaskIndicator";
import MinLoading from "../../components/admin/MinLoading";
import AdminModalAlert from "/src/components/admin/AdminModalAlert";

const Financas = () => {
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [desc, setDesc] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Entrada");
  const [dados, setDados] = useState([]);
  const [message, setMessage] = useState("");
  const [allRight, setAllRight] = useState(false);
  const [entrada, setEntrada] = useState({});
  const [saida, setSaida] = useState({});
  const [total, setTotal] = useState({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [mnsg, setMnsg] = useState("");
  const [textBtn, setTextBtn] = useState("");
  const [dCancelBtn, setDCancelBtn] = useState(false);

  const getDadosAboutReport = async () => {
    try {
      const res = await api.get(`/financas/Annual-report/${year}`);
      const dados = res.data;
      setEntrada(dados.entrada);
      setSaida(dados.saida);
      setTotal(dados.total);
    } catch (error) {
      console.log(error);
      alert("Houve um erro, tente novamente!");
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await getDadosAboutReport();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      setLoading(true);
      const res = await api.delete(`/financas/${id}`);
      const msg = res.data.message;
      if (msg === "Dado de finança removido com sucesso!") {
        const aux = [...dados];
        aux.splice(index, 1);
        setDados(aux);
        await getDadosAboutReport()
        setTitle("Status da operação")
        setTextBtn('Prosseguir')
        setMnsg("Dado de finança removido com sucesso!");
      } else setMnsg("Houve um erro, tente novamente!");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const verifyDatas = async (dados) => {
    const { desc, valor, tipo } = dados;

    if (!desc) {
      setMessage("Preencha o campo da descrição");
      return false;
    }

    if (!valor) {
      setMessage("Preencha o campo do valor");
      return false;
    }

    if (!tipo) {
      setMessage("Seleciona um tipo");
      return false;
    }

    return true;
  };

  const cleanDatas = () => {
    setDesc("");
    setValor("");
    setTipo("Entrada");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setMessage("");
      setAllRight(false);

      const dado = {
        desc,
        valor,
        tipo,
      };

      const canPost = await verifyDatas(dado);

      if (canPost) {
        const res = await api.post("/financas", dado);
        const msg = res.data.message;

        if (msg === "Dado de Finança inserido no sistema com sucesso!") {
          setMessage(msg);
          setAllRight(true);
          getDados();
          getDadosAboutReport();
          cleanDatas();
        }
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAllRight(false)
        setMessage('')
    }, 5000)
    }
  };

  const getDados = async () => {
    const res = await api.get("/financas");
    const data = res.data;
    setDados(data);
  };

  useEffect(() => {
    try {
      getDados();
      getDadosAboutReport();
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="admin-dashboard admin-content">
      <div className="admin-container-fluid admin-p-0">
        <div className="admin-row">
          <PageTitle
            title={"Controle de Finanças"}
            BtnIcon={MdOutlineFilterList}
            handleSunmit={handleFilter}
            year={year}
            setYear={setYear}
          />

          {loading ? (
            <MinLoading />
          ) : (
            <>
              <div className="admin-row admin-mt-4">
                <TaskIndicator title={"Entrada: kZ"} about={entrada} col={4} />

                <TaskIndicator title={"Saída: KZ"} about={saida} col={4} />

                <TaskIndicator title={"Total: KZ"} about={total} col={4} />
                <div className="admin-col-12admin-white">
                  <div className="admin-col-12 admin-d-flex">
                    <div
                      className="admin-card admin-flex-fill admin-bg-fff"
                      style={{ padding: "2.2rem" }}
                    >
                      <form onSubmit={handleSubmit}>
                        {message && (
                          <div
                            className={
                              allRight
                                ? "admin-msg-success"
                                : "admin-msg-danger"
                            }
                          >
                            {message}
                          </div>
                        )}
                        <div className="admin-d-flex admin-justify-content-between">
                          <div style={{ width: "30%" }}>
                            <label
                              className="admin-form-label admin-d-block"
                              htmlFor="startContract"
                            >
                              Descrição
                            </label>
                            <input
                              type="text"
                              className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                              id="startContract"
                              name="startContract"
                              placeholder="Descrição"
                              value={desc}
                              onChange={(e) => setDesc(e.target.value)}
                            />
                          </div>
                          <div style={{ width: "30%" }}>
                            <label
                              className="admin-form-label admin-d-block"
                              htmlFor="endContract"
                            >
                              Valor
                            </label>
                            <input
                              type="number"
                              min={1}
                              className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                              id="endContract"
                              name="endContract"
                              placeholder="Valor"
                              value={valor}
                              onChange={(e) => setValor(e.target.value)}
                            />
                          </div>
                          <div style={{ width: "19%" }}>
                            <label
                              className="admin-form-label admin-d-block"
                              htmlFor="endContract"
                            >
                              Tipo
                            </label>
                            <select
                              id="salario"
                              className="admin-form-select admin-mb-3"
                              value={tipo}
                              onChange={(e) => setTipo(e.target.value)}
                            >
                              <option value="Entrada">Entrada</option>
                              <option value="Saída">Saída</option>
                            </select>
                          </div>
                          <div style={{ width: "19%", marginTop: "3.4%" }}>
                            <button
                              type="submit"
                              className="admin-btn admin-main-btn admin-form-control"
                            >
                              Adicionar
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="admin-col-12 admin-d-flex">
                    <div className="admin-card admin-flex-fill admin-bg-fff">
                      <table className="admin-white admin-table admin-table-hover admin-my-0">
                        <thead>
                          <tr>
                            <th
                              className="admin-d-none admin-d-xl-table-cell"
                              style={{ paddingLeft: "1.2rem" }}
                            >
                              Descrição
                            </th>
                            <th
                              className="admin-d-none admin-d-xl-table-cell"
                              style={{ paddingLeft: 0 }}
                            >
                              Data
                            </th>
                            <th
                              className="admin-d-none admin-d-xl-table-cell"
                              style={{ paddingLeft: 0 }}
                            >
                              Valor
                            </th>
                            <th
                              className="admin-d-none admin-d-xl-table-cell"
                              style={{ paddingLeft: 0 }}
                            >
                              Tipo
                            </th>
                            <th
                              className="admin-d-none admin-d-md-table-cell"
                              style={{ paddingLeft: 0 }}
                            >
                              Eliminar
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dados &&
                            dados.map((dado, index) => (
                              <tr key={dado._id}>
                                <td style={{ paddingLeft: "1.2rem" }}>
                                  {dado.desc || "Salário"}
                                </td>
                                <td className="admin-d-none admin-d-xl-table-cell">
                                  {new Date(dado.criado_em)
                                    .toLocaleDateString()
                                    .split("T")[0] || "300.00,00 kz"}
                                </td>
                                <td className="admin-d-none admin-d-xl-table-cell">
                                  {dado.valor || "300.00,00 kz"}
                                </td>
                                <td>
                                  <span
                                    className={
                                      dado.tipo === "Entrada"
                                        ? "admin-badge admin-status-success"
                                        : "admin-badge admin-status-danger"
                                    }
                                  >
                                    {dado.tipo || "Saída"}
                                  </span>
                                </td>
                                <td className="admin-d-none admin-d-md-table-cell">
                                  <a
                                    onClick={() =>
                                      handleDelete(dado._id, index)
                                    }
                                    className="admin-tab-cancel"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={24}
                                      height={24}
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="admin-feather admin-feather-x-square admin-align-middle"
                                    >
                                      <rect
                                        x={3}
                                        y={3}
                                        width={18}
                                        height={18}
                                        rx={2}
                                        ry={2}
                                      />
                                      <line x1={9} y1={9} x2={15} y2={15} />
                                      <line x1={15} y1={9} x2={9} y2={15} />
                                    </svg>
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <AdminModalAlert
                open={open}
                setOpen={setOpen}
                title={title}
                msg={mnsg}
                btnNoCancel={textBtn}
                dCancelBtn={dCancelBtn}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Financas;
