import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
    const [stopLoading, setStopLoading] = useState(false)

    const navigate = useNavigate()

    const { loading, handleLogin, changeLoading } = loginZustand(state => state)

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

        changeLoading()

        const msg = await handleLogin(loginDatas, remeberMe)

        changeLoading()

        if (msg === 'Autenticação realizada com sucesso!') navigate('/admin')
        else if (typeof msg === 'string'
            && msg !== 'Autenticação realizada com sucesso!'
            && msg !== 'Houve um erro no servidor, tenta novamente!') setMessage(msg)
        else alert('Erro no servidor, tente novamente!')
    }

    useEffect(() => {
        setTimeout(() => setStopLoading(true), 300)
    })

    return (loading || !stopLoading ? <Loading /> :
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
                                            <form >
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
                                                
                                                <small className="">
                                                    Desejas voltar para início de sessão? <Link to="/admin/entrar">Login</Link>
                                                </small>
                                                <div className="admin-text-center admin-mt-3">
                                                    <button type="submit" className="admin-btn admin-btn admin-main-btn admin-form-control">
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
        )
    )

}

export default Login