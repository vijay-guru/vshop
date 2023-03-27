import React,{useState} from "react";
import {useDispatch} from "react-redux"
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import { sendEmail } from "../actions/userAction";

const Footer = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaint, setComplaint] = useState('');


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const sendHandler=async (e) => {
    console.log(email)
    dispatch(sendEmail(email,complaint))
    alert("Complaints registered Successfully")
    setShow(false)
  }
  return (
    <MDBFooter className="font-small footer pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
      <h5>Made with <i className="fa fa-heart" style={{color:"#D2042D"}}></i> by Vijay</h5>
      <hr/>
        <MDBRow >
          <MDBCol md="2">
             <p style={{marginRight:"15px"}}>Contact us :</p>
          </MDBCol>
          <MDBCol md="2">
          <a className="decorat" href="https://www.facebook.com/profile.php?id=100073320799153">Facebook</a>
          </MDBCol>
          <MDBCol md="2">
          <a className="decorat" href="https://www.instagram.com/vijay_guru18/">Instagram</a>
          </MDBCol>
          <MDBCol md="2">
          <a className="decorat" href="https://www.linkedin.com/in/vijay-guru-166866210/">LinkedIn</a>
          </MDBCol>
          <MDBCol md="2">
          <a className="decorat" href="https://github.com/vijay-guru">Github</a>
          </MDBCol>
          <MDBCol md="2">
          <a className="decorat" href="mailto:vjguru40@gmail.com">Mail Us</a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBRow>
        <MDBCol>
        <MDBContainer fluid>
        <Button className="btn btn-danger" style={{borderRadius:"40px"}} onClick={handleShow}>
          Complaints   ? 
        </Button>
      <Modal  show={show}>
        <Modal.Body>
          <>
          <h3 className="text-center">Register your complaints here </h3>
          <hr/>
          <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Complaint Title</label>
                    <input type="text" value={complaintTitle} onChange={(e)=>setComplaintTitle(e.target.value)} className="form-control" placeholder="Enter complaint title" />
                </div>
                <div className="form-group">
                    <label>Complaint</label>
                    <input type="textarea" value={complaint} onChange={(e)=>setComplaint(e.target.value)} className="form-control" placeholder="Enter complaint" />
                </div>
                <button type="button" className="btn-sm btn-dark btn-block" onClick={sendHandler}>Submit</button>
            </form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-dark btn-sm" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
        </MDBContainer>
        </MDBCol>
        <MDBCol>
        <MDBContainer>
          <p style={{display:"inline-block",overflow:"hidden",textOverflow: "ellipsis"}}>&copy; {new Date().getFullYear()} Copyright: V-SHOP</p>
        </MDBContainer>
        </MDBCol>
        </MDBRow>
      </div>
    </MDBFooter>
  );
}

export default Footer;