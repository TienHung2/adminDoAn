import React, { Component } from 'react';
import { Button,Form, Label, FormGroup, Input, Row, Col } from 'reactstrap';
import {ToastsContainerPosition, ToastsContainer,ToastsStore} from 'react-toasts';
import {Redirect} from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

class CreateBlog extends Component {

  
  constructor() {
    var a = JSON.parse(sessionStorage.getItem('userData'));
    var blogUpdate = JSON.parse(sessionStorage.getItem('blogUpdate'));
    super();
    this.state = {
      items:[],
        author: a?a[0].name:"",
        category: blogUpdate!=null||blogUpdate?blogUpdate.category:"",
        content: blogUpdate?blogUpdate.content:"",
        // img:blogUpdate?blogUpdate.img.replace("../../assets/img/avatars/","C:\\fakepath\\"):"",
        img:"",
        title:blogUpdate?blogUpdate.title:"",
        categoryError:'',
        contentError:'',
        imgError:'',
        titleError:'',
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

 onChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
  }

  handleEditorChange(content) {
    this.setState({ content });
  }

  validate = () => {
    let categoryError = "";
    let contentError = "";
    let imgError = "";
    let titleError = "";


    if (!this.state.category) {
      categoryError = "* Category cannot be blank";
    }

    if (!this.state.content) {
      contentError = "* Content cannot be blank";
    }

    if (!this.state.img) {
      imgError = "* Img cannot be blank";
    }

    if (!this.state.title) {
      titleError = "* Title cannot be blank";
    }

    if ( categoryError || contentError || imgError || titleError ) {
      this.setState({ categoryError,contentError, imgError,titleError  });
      return false;
    }

    return true;
  };


  onSubmit = (e) => {
    e.preventDefault();
    var blogUpdate = JSON.parse(sessionStorage.getItem('blogUpdate'));
    const isValid = this.validate();
    this.state.img = this.state.img.replace("C:\\fakepath\\","../../assets/img/avatars/");
    if(isValid){
      if(!blogUpdate){
    fetch('http://localhost:8080/Blog/api/blog', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state), // body data type must match "Content-Type" header
    
  }
  );ToastsStore.success("Create Succesfully!");}
  if(blogUpdate){
    fetch('http://localhost:8080/Blog/api/blog/'+blogUpdate.id, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state), // body data type must match "Content-Type" header
      
  });
  sessionStorage.removeItem("blogUpdate")
  ToastsStore.success("Update Succesfully!");
  }
  this.setState({
      author: '',
      category: '',
      content: '',
      img:'',
      title:'',
      categoryError:'',
      contentError:'',
      imgError:'',
      titleError:'',
    })
  
    }
}

getCategory(){
  fetch('http://localhost:8080/Blog/api/category')
  .then(res => res.json())
  .then(json => {
    this.setState({
      items: json,
    })
  });
}

componentDidMount(){
  this.getCategory();
}

  render() {
    const{category, content, img, title, items}= this.state;
    var a = JSON.parse(sessionStorage.getItem('userData'));
    if(!a){
      console.log("Loi")
      return (<Redirect to={'/'}/>)
    }
    return (
      <Form onSubmit={this.onSubmit} autoComplete="off">
        <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input value={title} type="text"
              onChange={this.onChange} name="title" id="title"/>
              <div style={{ fontSize: 14, color: "red" }}>
            {this.state.titleError}
          </div>
            </FormGroup>
           
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input value={category} type="select"
              onChange={this.onChange} name="category" id="category">
              {items.map((category, index) =>
                      <option key={index}>{category.categoryName}</option>
                    )}
                    </Input>
              <div style={{ fontSize: 14, color: "red" }}>
              
            {this.state.categoryError}
          </div>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="img">Image</Label>
              <Input value={img}
              onChange={this.onChange} type ="file" name="img" id="img"/>
              <div style={{ fontSize: 14, color: "red" }}>
            {this.state.imgError}
          </div>
            </FormGroup>
          </Col>
          </Row>

            <FormGroup>
              <Label for="content">Content</Label>
              <Editor value={content}
              onEditorChange={this.handleEditorChange} type="textarea" style={{height:'700px'}} name="content" id="content"/>
              <div style={{ fontSize: 14, color: "red" }}>
            {this.state.contentError}
          </div>
            </FormGroup>

        <Button color="primary" style={{float:"right"}}>Submit</Button>
      </Form>
      
    );
  }
}

export default CreateBlog;
