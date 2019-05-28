import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {ToastsContainerPosition, ToastsContainer,ToastsStore} from 'react-toasts';

// function UserRow(props) {
//   const user = props.user
//   const userLink = `/users/getuser/${user.id}`

//   const deleteUser = (id) =>{
//     fetch('http://localhost:8080/Blog/api/user/'+id, {
//       method: 'DELETE'
//     });
//   }

//   return (
//     <tr>
//       <th scope="row"><Link to={userLink}>{user.id}</Link></th>
//       <td><Link to={userLink}>{user.name}</Link></td>
//       <td>{user.email}</td>
//       <td>{user.userName}</td>
//       <td>
//         <Button onClick = {() => deleteUser(user.id)} color="danger">Delete</Button>
//       </td>
//     </tr>
//   )
// }

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      modal: false,
      id:''
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(idd) {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.setState({
      id: idd
    })
  }

  getUser(){
    fetch('http://localhost:8080/Blog/api/user')
    .then(res => res.json())
    .then(json => {
      this.setState({
        items: json,
      })
    });
  }

  componentDidMount(){
    this.getUser();
  }

  componentDidUpdate(){
    this.getUser();
  }

  deleteUser = (id) =>{
    fetch('http://localhost:8080/Blog/api/user/'+id, {
      method: 'DELETE'
    }).then(() => {
      ToastsStore.success("Delete Succesfully!");
    });
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {

    var a = JSON.parse(sessionStorage.getItem('userData'));
    if(!a){
      console.log("Loi")
      return (<Redirect to={'/'}/>)
    }
    const {items} = this.state;

    return (
      <div className="animated fadeIn">
      <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
        <Row>
          <Col xl={10}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
                
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((user, index) =>
                      <tr>
                      <th scope="row"><Link to={`/users/getuser/${user.id}`}>{user.id}</Link></th>
                      <td><Link to={`/users/getuser/${user.id}`}>{user.name}</Link></td>
                      <td>{user.email}</td>
                      <td>{user.userName}</td>
                      <td>
                        <i onClick = {() => this.toggle(user.id)} class="fa fa-trash" style={{fontSize:"30px",cursor:"pointer",color:"red"}}></i>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Delete Category</ModalHeader>
          <ModalBody>
          <p><center>Are you sure you want to delete this user?<br /> This action cannot be undone.</center></p> 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.deleteUser(this.state.id)}>Yes, delete it!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Users;
