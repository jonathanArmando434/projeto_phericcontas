import { IoMdAddCircleOutline } from 'react-icons/io'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import FormClient from '../../components/admin/FormClient'

const AddClient = () => {
    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Novo Cliente'} />

                        <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 admin-mx-auto admin-p-3 div-form">
                            <FormClient />
                        </div>
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default AddClient