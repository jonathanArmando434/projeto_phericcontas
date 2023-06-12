import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import validator from "email-validator";
import api from "../../axios/api";

import "./Index.css";
import "./Index.2.0.css";
import "./Login.css";

import logo from "/src/assets/admin/img/icons/logo-2.jpeg";

import Loading from "../../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [allRight, setAllRight] = useState(false);
  const [loading, setLoading] = useState(false);

  let errorMsg = "";
  const verifyDatas = async (data) => {
    const { email } = data;

    if (!email) {
      errorMsg = "Preencha o campo de E-mail!";
      return false;
    }
    if (!validator.validate(email)) {
      errorMsg = "E-mail inválido";
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setAllRight(false);
      setMessage("");

      const body = {
        email,
      };

      const canPost = await verifyDatas(body);
      if (!canPost) {
        setMessage(errorMsg);
        errorMsg = "";
        return;
      }

      const res = await api.post(`/usuario/reset-password`, body);
      const dado = res.data;
      const msg = dado.message;
      const status = res.status;

      if (status == 200) {
        setMessage(msg);
        setAllRight(true);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
      const errorReq = error.response;
      const status = errorReq.status
      const msg = errorReq.data.message
      if (status == 406) setMessage(msg);
      else setMessage("Houve um erro, tente novamente");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <main className="admin admin-login admin-d-flex admin-vw-100 admin-vh-100 admin-main-login">
      <div className="admin-container-login">
        <div className="admin-container admin-d-flex admin-flex-column">
          <div className="admin-row admin-vh-100">
            <div className="admin-col-12 admin-col-lg-4 admin-mx-auto admin-d-table admin-h-100">
              <div className="admin-d-table-cell admin-align-middle">
                <div className="admin-card admin-card-login">
                  <div className="admin-card-body">
                    <div className="admin-text-center">
                      <img
                        src={logo}
                        alt="Phericcontas"
                        className="admin-img-fluid"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      {message && (
                        <div
                        style={{marginBottom: '.8rem', marginTop: '.8rem'}}
                          className={
                            allRight ? "admin-msg-success" : "admin-msg-danger"
                          }
                        >
                          <p
                            style={
                              allRight
                                ? { color: "rgb(0, 104, 74)" }
                                : { color: "rgb(91, 0, 0)" }
                            }
                            className="mb-0"
                          >
                            {message}
                          </p>
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="admin-form-label">E-mail</label>
                        <input
                          className="admin-form-control admin-form-control-lg"
                          type="email"
                          name="email"
                          placeholder="Informe o seu E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          minLength={12}
                          maxLength={100}
                        />
                      </div>

                      <small className="">
                        Desejas voltar para o início de sessão?{" "}
                        <Link to="/admin/entrar">Entrar</Link>
                      </small>
                      <div className="admin-text-center admin-mt-3">
                        <button
                          type="submit"
                          className="admin-btn admin-btn admin-main-btn admin-form-control"
                        >
                          Recuperar palavra-passe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
