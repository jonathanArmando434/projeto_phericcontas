import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye , AiOutlineEyeInvisible} from 'react-icons/ai'
import api from "../../axios/api";
import loginZustand from "../../zustand/login";
import passwordValidator from "password-validator";

import logo from "/src/assets/admin/img/icons/logo-2.jpeg";

import "./Index.css";
import "./Index.2.0.css";
import "./Login.css";

import Loading from "../../components/Loading";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id_colaborador, setId_colaborador] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const { token } = useParams();

  const { handleLogin } = loginZustand((state) => state);

  let errorMsg = "";

  const verifyPassword = (password) => {
    // Create a schema
    const schema = new passwordValidator();

    // Add properties to it
    schema
      .is()
      .min(12) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(1) // Must have at least 2 digits
      .has()
      .not()
      .spaces(); // Should not have spaces

    // Validate against a password string
    return schema.validate(password);
  };

  const verifyDatas = async (signupDatas) => {
    const { password, confirmPassword } = signupDatas;

    if (!password) {
      errorMsg = "Preencha o campo da palavra-passe";
      return false;
    }

    if (!verifyPassword(password)) {
      errorMsg =
        "A Palavra passe deve ter entre 12 à 100 caracteres, deve ter letras maiúsculas e minúsculas, deve conter pelomenos um dígito e não deve ter espaços em branco";
      return false;
    }

    if (!confirmPassword) {
      errorMsg = "As palavras-passe precisam ser iguais";
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = {
        password,
        confirmPassword,
      };

      const canPost = await verifyDatas(user);
      if (!canPost) {
        setMessage(errorMsg);
        errorMsg = "";
        return;
      }

      const returned = await handleResetPassword(user);
      const msg = returned.message;
      const status = returned.status;

      if (status == 200) {
        const email = returned.email;
        const msgLogin = await handleLogin(
          {
            email,
            password,
          },
          "noChecked"
        );

        if (msgLogin === "Autenticação realizada com sucesso!")
          navigate("/admin");
      } else if (status == 422) setMessage(msg);
      else setMessage("Houve um erro, tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (user) => {
    try {
      const res = await api.patch(`/usuario/${token}`, user);
      const status = res.status;
      const data = res.data;
      return {
        message: data.message,
        status,
        email: data.email,
      };
    } catch (error) {
      const errorReq = error.response;
      const errorMessage = errorReq.data.message;
      const status = errorReq.status;
      if (errorMessage)
        return {
          message: errorMessage,
          status,
        };
      return;
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
                          style={{ marginBottom: ".8rem", marginTop: ".8rem" }}
                          className="admin-msg-danger"
                        >
                          {message}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="admin-form-label">
                          Nova palavra-passe
                        </label>
                        <div className='admin-password'>
                                                    <input
                                                        className="admin-form-control admin-form-control-lg"
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        placeholder="Informe a sua palavra-passe"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <button 
                                                    className='btn-eye-signup'
                                                    type='button'
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <AiOutlineEyeInvisible /> :  <AiOutlineEye /> }
                                                    </button>
                                                   </div>
                      </div>
                      <div className="mb-3">
                        <label className="admin-form-label">
                          Confirmar nova palavra-passe
                        </label>
                        <div className='admin-password'>
                                                    <input
                                                        className="admin-form-control admin-form-control-lg"
                                                        type={showPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        placeholder="Repita a sua palavra-passe"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                   </div>
                      </div>
                      <small>
                        Desejas voltar para o início de sessão?{" "}
                        <Link to="/admin/entrar">Entrar</Link>
                      </small>
                      <div className="admin-text-center admin-mt-3">
                        <button
                          type="submit"
                          className="admin-btn admin-btn admin-main-btn admin-form-control"
                        >
                          Redefinir palavra-passe
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

export default ResetPassword;
