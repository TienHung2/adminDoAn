import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {ToastsContainerPosition, ToastsContainer,ToastsStore} from 'react-toasts';

// function UserRow(props) {
//   const category = props.category

//   const deleteCategory = (id) =>{
//     fetch('http://localhost:8080/Blog/api/category/'+id, {
//       method: 'DELETE'
//     }).then(() => {
//       window.location.reload();
      
//       // document.location.assign('http://localhost:3000/setting/categories/createcategory#/setting/categories');
//     }).then(() => {
//       ToastsStore.success("Create Succesfully!");
//     });
    
//   }

//   const updateCategory = (id) => {
//     console.log(id);
//     fetch('http://localhost:8080/Blog/api/category/'+id)
//     .then(res => res.json())
//     .then(json => {
//       sessionStorage.setItem('categoryUpdate',JSON.stringify(json));
//       document.location.assign('http://localhost:3000/setting/categories/createcategory#/setting/categories/createcategory');
//     })
//   }

//   return (
// <tr>
//       <th scope="row">{category.id}</th>
//       <td>{category.categoryName}</td>
//       <td>
//         <Button onClick = {() => deleteCategory(category.id)} color="danger">Delete</Button>
//         {/* <Link to='/setting/categories/createcategory'> */}
//           <button onClick = {() => updateCategory(category.id)} className="btn btn-success">
//           Edit
//           </button>
//         {/* </Link> */}
//       </td>
//     </tr>
//   )
// }


class Categories extends Component {
  
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

  getCategory(){
    fetch('http://localhost:8080/Blog/api/category')
    .then(res => res.json())
    .then(json => {
      this.setState({
        items: json,
        active: false,
      })
    });
  }

  componentDidMount(){
    this.getCategory();
  }

  componentDidUpdate(){
    this.getCategory();
  }

  deleteCategory = (iid) =>{
    fetch('http://localhost:8080/Blog/api/category/'+iid, {
      method: 'DELETE'
    }).then(() => {
      ToastsStore.success("Delete Succesfully!");
    });
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  updateCategory = (id) => {
    console.log(id);
    fetch('http://localhost:8080/Blog/api/category/'+id)
    .then(res => res.json())
    .then(json => {
      sessionStorage.setItem('categoryUpdate',JSON.stringify(json));
      document.location.assign('http://localhost:3000/setting/categories/createcategory#/setting/categories/createcategory');
    })
  }

  render() {

    var a = JSON.parse(sessionStorage.getItem('userData'));
    if(!a){
      console.log("Loi")
      return (<Redirect to={'/'}/>)
    }
    const {items} = this.state;
    const deleteData = () =>{
      sessionStorage.removeItem("categoryUpdate");
    }
    return (
      <div className="animated fadeIn">
      <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Categories
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;
                <Link to="/setting/categories/createcategory" onClick={deleteData}>Create category</Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Category</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((category, index) =>
                      <tr>
                      <th scope="row">{category.id}</th>
                      <td>{category.categoryName}</td>
                      <td>
                          <i onClick = {() => this.updateCategory(category.id)} class="fa fa-edit" style={{fontSize:"30px",cursor:"pointer",color:"blue"}}></i>
                          &ensp;
                          <i onClick = {() => this.toggle(category.id)} class="fa fa-trash" style={{fontSize:"30px",cursor:"pointer",color:"red"}}></i>
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
          <p><center>Are you sure you want to delete this category?<br /> This action cannot be undone.</center></p> 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.deleteCategory(this.state.id)}>Yes, delete it!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Categories;
