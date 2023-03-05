import { IoMdAddCircleOutline } from 'react-icons/io'

import userNoPhoto from '/src/assets/admin/img/avatars/form-update-img.png'

import './AddMember.css'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import FormMember from '../../components/admin/FormMember'

const AddMember = () => {
    const indioma = [' ']

    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                    <PageTitle title={'Novo Membro'} />
                        
                        <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 mx-auto admin-p-3 div-form">
                            <FormMember />
                        </div>
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default AddMember