import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const confirmDeleteBookOrdered=(props)=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBookOrdered=()=>{
        console.log(props.bookName)
        props.onDeleteBookOrdered(props.bookName);
        debugger;
        handleClose();
    }
    return (
        <span>


            <a   className="btn btn-danger roundedLinksBooks" title="Delete" onClick={handleShow}>
                <i className="fa fa-trash"/>
            </a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to cancel this order?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteBookOrdered}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
}
export default confirmDeleteBookOrdered;