import React from 'react';

function AlertMessages({ error, errorMsg, successMsg }) {
    return (
        <React.Fragment>
            {error && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{error}</strong>
                </div>
            )}

            {/*break*/}
            {errorMsg && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{errorMsg}</strong>
                </div>
            )}

            {/*break*/}
            {successMsg && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{successMsg}</strong>
                </div>
            )}
        </React.Fragment>
    );
}

export default AlertMessages;
