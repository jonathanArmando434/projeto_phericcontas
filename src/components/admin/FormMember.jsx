import { IoMdAddCircleOutline } from 'react-icons/io'

import { BsPersonBoundingBox } from 'react-icons/bs'

import userNoPhoto from '/src/assets/admin/img/avatars/form-update-img.png'

const FormMember = () => {
    return (
        <form className="form-new" action="">
            <div className="admin-update-img admin-mb-3">
                <label className='admin-form-label' htmlFor="img">
                    <BsPersonBoundingBox />
                    <label className='admin-form-label admin-d-block'>Seleciona uma imagem</label>
                    <input type="file" accept='image/*' id='img' name='img' />
                </label>
            </div>

            <label className='admin-form-label' htmlFor="name">Nome</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="name"
                name="name"
                placeholder="Informe o nome do novo membro"
            />
            <label className='admin-form-label' htmlFor="bi">Número do Bilhete de Identidade</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3"
                id="bi"
                name="bi"
                placeholder="Informe o número do BI do novo membro"
            />
            <label className='admin-form-label' htmlFor="email">E-mail</label>
            <input
                type="email"
                className="admin-form-control admin-mb-3"
                id="email"
                name="email"
                placeholder="Informe o E-mail principal do novo membro"
            />
            <label className='admin-form-label' htmlFor="phone">Telefone / WhatsApp</label>
            <input
                type="text"
                className="admin-form-control admin-mb-3 admin-d-inline-block"
                id="phone"
                name="phone"
                placeholder="Informe o telefone do novo membro"
            />
            <div>
                <label className='admin-form-label' htmlFor={`indioma${/*indioma.length*/''}`}>Indioma</label>
                {
                    /* indioma.forEach((value, index) => {*/
                    <input
                        /* key={index} */
                        type="text"
                        className={
                                                    /*index === (indioma.length - 1)*/ true ? "admin-form-control admin-mb-3 admin-w-me-95 admin-d-inline-block" :
                                "admin-form-control admin-mb-3"
                        }
                        id={`indioma${/*index+1*/''}`}
                        name={`indioma${/*index+1*/''}`}
                        placeholder="Informe um indioma"
                    />
                    /* })*/
                }

                <a href="#" onClick={(e) => {
                    e.preventDefault()
                    indioma.push(' ')
                    console.log(indioma.length)
                }}>
                    <IoMdAddCircleOutline />
                </a>
            </div>

            <label className='admin-form-label' htmlFor="data-nascimento">Data de Nascimento</label>
            <input
                type="date"
                className="admin-form-control admin-mb-3"
                id="data-nascimento"
                name="datNascimento"
                placeholder="Informe o o E-mail principal do novo membro"
            />
            <label className='admin-form-label' htmlFor="">Género</label>
            <div className="">
                <label className='admin-form-check'>
                    <input
                        className="admin-form-check-input"
                        type="radio"
                        defaultValue="Masculino"
                        name="genero"
                        defaultChecked
                    />
                    <span className="admin-form-check-label">Masculino</span>
                </label>
                <label className='admin-form-check'>
                    <input
                        className="admin-form-check-input"
                        type="radio"
                        defaultValue="Feminino"
                        name="genero"
                    />
                    <span className="admin-form-check-label">Feminino</span>
                </label>
            </div>
            <label className='admin-form-label' htmlFor="cargo">Cargo</label>
            <select id="cargo" className="admin-form-select admin-mb-3">
                <option selected="">Funcionário</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
            </select>
            <label className='admin-form-label' htmlFor="salario">Salário</label>
            <select id="salario" className="admin-form-select admin-mb-3">
                <option selected="">100.000,00 KZ</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
            </select>
            <label className='admin-form-label admin-d-block' htmlFor="number-bank">
                Conta Bancária
            </label>
            <div className="admin-d-flex admin-justify-content-between">
                <input
                    type="text"
                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                    id="number-bank"
                    name="numberBank"
                    placeholder="Informe o número da conta bancária do novo membro"
                />
                <input
                    type="text"
                    className="admin-form-control admin-d-inline-block admin-mb-3"
                    id="iban-bank"
                    name="ibanBank"
                    placeholder="Informe o IBAN da conta bancária do novo membro"
                />
            </div>
            <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                Cadastrar
            </button>
        </form>
    )
}

export default FormMember