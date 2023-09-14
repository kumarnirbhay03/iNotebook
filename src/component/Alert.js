import React, { useContext } from 'react'
import alertContext from '../context/alert/alertContext';
const Alert = () => {
    const { alert } = useContext(alertContext);
    return (
        <div style={{ height: "50px" }}>
            {alert && (
                <div
                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>{alert.type === "danger" ? "Error" : "Success"}</strong>:{alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert
