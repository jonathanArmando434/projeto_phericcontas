import logo2 from "/src/assets/admin/img/icons/logo-2.jpeg"

import './Index.css'
import './Index.2.0.css'
import './Login.css'

import FormLogin from '/src/components/admin/FormLogin'

const Login = () => {
    return (
        <main className="admin admin-login admin-d-flex admin-vw-100 admin-vh-100 admin-main-login">
            <div className="admin-container-login">
                <div className="admin-container admin-d-flex admin-flex-column">
                    <div className="admin-row admin-vh-100">
                        <div className="admin-col-12 admin-col-lg-4 admin-mx-auto admin-d-table admin-h-100">
                            <div className="admin-d-table-cell admin-align-middle">
                                <div className="admin-text-center admin-mt-4">
                                    <h1 className="admin-h2">Seja Bem-Vindo</h1>
                                    <p className="admin-lead">Inicie sessão com a sua conta para continuar</p>
                                </div>
                                <div className="admin-card admin-card-login">
                                    <div className="admin-card-body">
                                        <div className="admin-text-center">
                                            <img
                                                src={logo2}
                                                alt="Charles Hall"
                                                className="admin-img-fluid"
                                            />
                                        </div>
                                        <FormLogin />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login