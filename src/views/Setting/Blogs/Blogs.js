import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button,Table, CardBody, CardHeader, Card, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {ToastsContainerPosition, ToastsContainer,ToastsStore} from 'react-toasts';

import 'bootstrap/dist/css/bootstrap.min.css';

// function BlogRow(props) {
  
//   const blog = props.blog
//   const blogLink = `/setting/blogs/getblog/${blog.id}`

//   const deleteBlog = (id) =>{

//     fetch('http://localhost:8080/Blog/api/blog/'+id, {
//       method: 'DELETE'
//     });
//     window.location.reload();
//   }

//   const updateBlog = (id)=>{
//     fetch('http://localhost:8080/Blog/api/blog/'+id)
//     .then(res => res.json())
//     .then(json => {
//       sessionStorage.setItem('blogUpdate',JSON.stringify(json));
//       document.location.assign('http://localhost:3000/setting/categories/createcategory#/setting/blogs/createblog');
//     })
//     console.log(sessionStorage.getItem('blogUpdate'))
//   }


//   return (
//     <tr>
//       <th scope="row"><Link to={blogLink}>{blog.id}</Link></th>
//       <td><Link to={blogLink}>{blog.title}</Link></td>
//       <td>{blog.author}</td>
//       <td>{blog.category}</td>
//       <td>{blog.date}</td>
//       <td>
//         <button className="btn btn-danger" onClick = {() => deleteBlog(blog.id)} >Delete</button>
//         {/* <Link to='/setting/blogs/createblog'> */}
//           <button className="btn btn-success" onClick = {() => updateBlog(blog.id)} >
//             Edit
//           </button>
//         {/* </Link> */}
//       </td>
//     </tr>
//   )
// }

class Blogs extends Component {
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

  getBlog(){
    fetch('http://localhost:8080/Blog/api/blog',{
      method: 'GET'
    }).then(res => res.json())
    .then(json => {
      this.setState({
        items: json,
      })
    });
  }

  componentDidMount(){
    this.getBlog();
  }

  componentDidUpdate(){
    this.getBlog();
  }

  deleteBlog = (id) =>{

    fetch('http://localhost:8080/Blog/api/blog/'+id, {
      method: 'DELETE'
    }).then(() => {
      ToastsStore.success("Delete Succesfully!");
    });
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));

  }

  updateBlog = (id)=>{
    fetch('http://localhost:8080/Blog/api/blog/'+id)
    .then(res => res.json())
    .then(json => {
      sessionStorage.setItem('blogUpdate',JSON.stringify(json));
      document.location.assign('http://localhost:3000/setting/categories/createcategory#/setting/blogs/createblog');
    })
  }  

  render() {

  var a = JSON.parse(sessionStorage.getItem('userData'));
  if(!a){
    return (<Redirect to={'/'}/>)
  }
    const {items} = this.state;
    const deleteData = () =>{
      sessionStorage.removeItem("blogUpdate");
    }
    return (
<div>
<ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Blogs &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;
                <Link to="/setting/blogs/createblog" onClick={deleteData}>Create Blog</Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((blog, index) =>
                      <tr>
                      <th scope="row"><Link to={`/setting/blogs/getblog/${blog.id}`}>{blog.id}</Link></th>
                      <td><Link to={`/setting/blogs/getblog/${blog.id}`}>{blog.title}</Link></td>
                      <td>{blog.author}</td>
                      <td>{blog.category}</td>
                      <td>{blog.date}</td>
                      <td>
                          <i onClick = {() => this.updateBlog(blog.id)} class="fa fa-edit" style={{fontSize:"30px",cursor:"pointer",color:"blue"}}></i>
                          &ensp;
                          <i onClick = {() => this.toggle(blog.id)} class="fa fa-trash" style={{fontSize:"30px",cursor:"pointer",color:"red"}}></i>
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
          <ModalHeader>Delete Blog</ModalHeader>
          <ModalBody>
          <p><center>Are you sure you want to delete this blog?<br /> This action cannot be undone.</center></p> 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.deleteBlog(this.state.id)}>Yes, delete it!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      </div>
    );
  }
}

export default Blogs;
