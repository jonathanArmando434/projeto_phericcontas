import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineEye , AiOutlineEyeInvisible} from 'react-icons/ai'
import loginZustand from "../../zustand/login"
import validator from "email-validator";

import './Index.css'
import './Index.2.0.css'
import './Login.css'

import logo from "/src/assets/admin/img/icons/logo-2.jpeg"

import Loading from "../../components/Loading"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [remeberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const { handleLogin } = loginZustand(state => state)

    let errorMsg = ''
    const verifyDatas = async (loginDtas) => {
        const {
            email,
            password
        } = loginDtas

        if (!email) {
            errorMsg = 'Preencha o campo de E-mail!'
            return false
        }
        if (!validator.validate(email)) {
            errorMsg = 'E-mail inválido'
            return false
        }
        if (!password) {
            errorMsg = 'Preencha o campo da palavra-passe!'
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const loginDatas = {
                email,
                password
            }

            const canPost = await verifyDatas(loginDatas)
            if (!canPost) {
                setMessage(errorMsg)
                errorMsg = ''
                return
            }

            const msg = await handleLogin(loginDatas, remeberMe)

            if (msg === 'Autenticação realizada com sucesso!') navigate('/admin')
            else if (typeof msg === 'string'
                && msg !== 'Autenticação realizada com sucesso!'
                && msg !== 'Houve um erro no servidor, tenta novamente!') setMessage(msg)
            else alert('Erro no servidor, tente novamente!')
        } finally {
            setLoading(false)
        }
    }

    return (loading ? <Loading /> :
        (
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
                                                {message && <div style={{ marginBottom: '.8rem', marginTop: '.8rem' }} className='admin-msg-danger'>
                                                    {message}
                                                </div>}
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
                                                <div className="mb-3">
                                                    <label className="admin-form-label">Palavra-passe</label>
                                                   <div className='admin-password'>
                                                    <input
                                                        className="password-input admin-form-control admin-form-control-lg"
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        placeholder="Informe a sua palavra-passe"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <button 
                                                    className='btn-eye'
                                                    type='button'
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <AiOutlineEyeInvisible /> :  <AiOutlineEye /> }
                                                    </button>
                                                   </div>
                                                    <small>
                                                        <Link to={'/admin/palavra-passe/recuperar'}>Esqueceu a palavra-passe?</Link>
                                                    </small>
                                                </div>
                                                <div className='mb-3'>
                                                    <label className="admin-mb-0">
                                                        <input
                                                            type="checkbox"
                                                            name="remember-me"
                                                            defaultChecked={remeberMe}
                                                            onChange={(e) => setRememberMe(e.target.checked)}
                                                        />
                                                        <span className="">
                                                            Lembre-se de mim da próxima vez
                                                        </span>
                                                    </label>
                                                </div>
                                                <small className="">
                                                    Você ainda não tem uma conta? <Link to="/admin/cadastrar">Cadastre-se</Link>
                                                </small>
                                                <div className="admin-text-center admin-mt-3">
                                                    <button type="submit" className="admin-btn admin-btn admin-main-btn admin-form-control">
                                                        Entrar
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
        )
    )

}

export default Login