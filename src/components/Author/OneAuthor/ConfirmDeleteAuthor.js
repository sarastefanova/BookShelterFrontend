import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React,{useEffect, useState} from "react";

const Example=(props)=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteAuthor=()=>{
        props.onDelete(props.nameAndSurname,1);
        debugger;
        handleClose();
    }
    return (
        <span>


            {/*<a   className="btn btn-danger roundedLinksBooks" title="Delete" onClick={handleShow}>*/}
            {/*    <i className="fa fa-trash"/>*/}
            {/*</a>*/}

            <button  className="btn btn-sm btn-outline-secondary " onClick={handleShow}>
                <span className="fa fa-remove"/>
                <span><strong>Remove</strong></span>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete this author?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteAuthor}>
                        Delete author
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

export default Example;