import React, {useContext} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import {ErrorContext} from "../Methods/ErrorContext";
import {SuccessContext} from "../Methods/SuccessContext";

const ConfirmAction = (props) => {
    const [error, setError] = useContext(ErrorContext)
    const [success, setSuccess] = useContext(SuccessContext)

    let statusText, statusColor;

    switch (props.status) {
        case 'active':
            statusText = 'activated';
            statusColor = 'text-success';
            break;
        case 'delete':
            statusText = 'deleted';
            statusColor = 'text-warning';
            break;
        default:
            statusText = 'blocked';
            statusColor = 'text-danger';
    }
  return (
      <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
              <h5>Are you sure you want to proceed with this action?</h5>
              <p>Selected users will be <span className={statusColor}>{statusText}</span></p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
              <div >
                  {error && <Alert variant="danger" className="p-2 m-0">{error}</Alert>}
                  {success && <Alert variant="success" className="p-2 m-0">User status changed successfully</Alert>}
              </div>
              <div>
                  <Button onClick={props.confirm} className="mx-3" disabled={success}> Confirm </Button>
                  <Button onClick={props.onHide} > Close </Button>
              </div>
          </Modal.Footer>
      </Modal>
  )
}


export default ConfirmAction