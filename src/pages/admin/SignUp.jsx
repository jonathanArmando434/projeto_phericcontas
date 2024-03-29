import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { AiOutlineEye , AiOutlineEyeInvisible} from 'react-icons/ai'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'
import passwordValidator from 'password-validator';

import logo from "/src/assets/admin/img/icons/logo-2.jpeg"

import './Index.css'
import './Index.2.0.css'
import './SignUp.css'

import Loading from '../../components/Loading'

const SignUp = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [id_colaborador, setId_colaborador] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const navigate = useNavigate()

    const { handleLogin } = loginZustand(state => state)

    let errorMsg = ''

    const verifyPassword = (password) => {
        // Create a schema
        const schema = new passwordValidator();

        // Add properties to it
        schema
            .is().min(12)                                    // Minimum length 8
            .is().max(100)                                  // Maximum length 100
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits(1)                                // Must have at least 2 digits
            .has().not().spaces()                           // Should not have spaces

        // Validate against a password string
        return schema.validate(password)
    }

    const verifyDatas = async (signupDatas) => {
        const {
            password,
            confirmPassword,
            id_colaborador
        } = signupDatas

        if (!id_colaborador) {
            errorMsg = 'Preencha o campo de ID do colaborador'
            return false
        }

        if (!password) {
            errorMsg = 'Preencha o campo da palavra-passe'
            return false
        }

        if (!verifyPassword(password)) {
            errorMsg = 'A Palavra passe deve ter entre 12 à 100 caracteres, deve ter letras maiúsculas e minúsculas, deve conter pelomenos um dígito e não deve ter espaços em branco'
            return false
        }

        if (!confirmPassword) {
            errorMsg = 'As palavras-passe precisam ser iguais'
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const signupDatas = {
                password,
                confirmPassword,
                id_colaborador
            }

            const canPost = await verifyDatas(signupDatas)
            if (!canPost) {
                setMessage(errorMsg)
                errorMsg = ''
                return
            }

            const msg = await handleSignup(signupDatas)

            if (msg === 'Usuário inserido no sistema com sucesso!') {
                const res = await api.get(`/contato-colaborador/${id_colaborador}`)
                const { email } = res.data
                const msgLogin = await handleLogin(
                    {
                        email,
                        password,
                    }, 'noChecked')

                if (msgLogin === 'Autenticação realizada com sucesso!') navigate('/admin')
            }

            else if (typeof msg === 'string'
                && msg !== 'Usuário inserido no sistema com sucesso!'
                && msg !== 'Houve um erro no servidor, tenta novamente!') setMessage(msg)
            else alert('Erro no servidor, tente novamente!')
        } finally {
            setLoading(false)
        }
    }

    const handleSignup = async (signupDatas) => {
        try {
            const res = await api.post('/usuario', signupDatas)
            const data = res.data
            return data.message
        } catch (error) {
            const errorMessage = error.response && error.response.data.message
            if (errorMessage) return errorMessage
            return
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
                                                    <label className="admin-form-label">ID do colaborador</label>
                                                    <input
                                                        className="admin-form-control admin-form-control-lg"
                                                        type="text"
                                                        name="id_colaborador"
                                                        placeholder="Informe o seu ID"
                                                        value={id_colaborador}
                                                        onChange={(e) => setId_colaborador(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="admin-form-label">Palavra-passe</label>
                                                    <div className='admin-password'>
                                                    <input
                                                        className="admin-form-control admin-form-control-lg"
                                                        type={showPassword1 ? "text" : "password"}
                                                        name="password"
                                                        placeholder="Informe a sua palavra-passe"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <button 
                                                    className='btn-eye-signup1'
                                                    type='button'
                                                    onClick={() => setShowPassword1(!showPassword1)}>
                                                        {showPassword1 ? <AiOutlineEyeInvisible /> :  <AiOutlineEye /> }
                                                    </button>
                                                   </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="admin-form-label">Confirmar palavra-passe</label>
                                                    <div className='admin-password'>
                                                    <input
                                                        className="admin-form-control admin-form-control-lg"
                                                        type={showPassword2 ? "text" : "password"}
                                                        name="confirmPassword"
                                                        placeholder="Repita a sua palavra-passe"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    <button 
                                                    className='btn-eye-signup2'
                                                    type='button'
                                                    onClick={() => setShowPassword2(!showPassword2)}>
                                                        {showPassword2 ? <AiOutlineEyeInvisible /> :  <AiOutlineEye /> }
                                                    </button>
                                                   </div>
                                                </div>
                                                <small>
                                                    Vocẽ já está cadastrado? <Link to="/admin/entrar">Entrar</Link>
                                                </small>
                                                <div className="admin-text-center admin-mt-3">
                                                    <button type="submit" className="admin-btn admin-btn admin-main-btn admin-form-control">
                                                        Cadastrar
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

export default SignUp