const TaskIndicator = ({ title, value, since, about = '', Icon }) => {
    const bg = (about === 1) ? 'admin-bg-warning' : (about === 2) ? 'admin-bg-success' : (about == 3) ? 'admin-bg-danger' : 'admin-my-bg-primary'

    return (
        <div className="admin-col-3 admin-card">
            <div className="admin-card-content admin-p-20">
                <div className="admin-card-body admin-p-0">
                    <div className="admin-row">
                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                            <h5 className="admin-card-title">{title}</h5>
                        </div>

                        {
                            /*
                                <div className="admin-col-auto">
                            <div className={`admin-stat ${bg} admin-text-primary`}>
                                <Icon />
                            </div>
                        </div>
                            */
                        }
                    </div>
                    <span className="admin-h3 admin-mt-1 admin-mb-3">{value}</span>
                    <div className="admin-mb-0">
                        <span className="admin-text-danger"> <i
                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                            -3.65% </span>
                        <span className="admin-text-muted">{since}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskIndicator