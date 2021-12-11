import {
    MDBContainer,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
  } from 'mdbreact';
  
export const MyGenericModal = (props) => {
    <MDBContainer>
     <MDBBtn onClick={this.props.toggle}>Modal</MDBBtn>
     <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
       <MDBModalHeader toggle={this.props.toggle}>{this.props.title}</MDBModalHeader>
       <MDBModalBody>
         {this.props.children}
       </MDBModalBody>
       <MDBModalFooter>
         <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
         <MDBBtn color="primary">Save changes</MDBBtn>
       </MDBModalFooter>
     </MDBModal>
    </MDBContainer>
   }
