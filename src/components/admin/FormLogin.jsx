import { Link } from "react-router-dom"

const FormLogin = () => {
    return (
        <form>
            <div className="mb-3">
                <label className="admin-form-label">E-mail</label>
                <input
                    className="admin-form-control admin-form-control-lg"
                    type="email"
                    name="email"
                    placeholder="Informe o seu E-mail"
                />
            </div>
            <div className="mb-3">
                <label className="admin-form-label">Palavra-Passe</label>
                <input
                    className="admin-form-control admin-form-control-lg"
                    type="password"
                    name="password"
                    placeholder="Informe a sua palavra-passe"
                />
                <small>
                    <a href="index.html">Esqueceu a palavra-passe?</a>
                </small>
            </div>
            <div>
                <label className="admin-mb-0">
                    <input
                        className=""
                        type="checkbox"
                        defaultValue="remember-me"
                        name="remember-me"
                        defaultChecked=""
                    />
                    <span className="">
                        Remember me next time
                    </span>
                </label>
            </div>
            <div className="admin-text-center admin-mt-3">
                <Link to="/admin">
                    <button type="submit" className="admin-btn admin-btn admin-main-btn admin-form-control">
                        Entrar
                    </button>
                </Link>
            </div>
        </form>
    )
}

export default FormLogin