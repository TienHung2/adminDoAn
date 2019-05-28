import React, { Component } from 'react';
import { Button,Form, Label, FormGroup, Input, Row, Col } from 'reactstrap';
import {ToastsContainerPosition, ToastsContainer,ToastsStore} from 'react-toasts';
import {Redirect} from 'react-router-dom';

class CreateCategory extends Component {

  constructor() {
    var categoryUpdate = JSON.parse(sessionStorage.getItem('categoryUpdate'));
    super();
    this.state = {
        categoryName:categoryUpdate?categoryUpdate.categoryName:'',
        nameError:'',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    }

    validate = () => {
      let nameError = "";
  
      if (!this.state.categoryName) {
        nameError = "* Category name cannot be blank";
      }
  
      if ( nameError ) {
        this.setState({ nameError});
        return false;
      }
  
      return true;
    };


    onSubmit = (e) => {
      e.preventDefault();
      var categoryUpdate = JSON.parse(sessionStorage.getItem('categoryUpdate'));
      const isValid = this.validate();
      if(isValid){
      console.log(JSON.stringify(this.state))
      if(!categoryUpdate){
      fetch('http://localhost:8080/Blog/api/category', {
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
      
    });
    
    ToastsStore.success("Create Succesfully!");
      }
      else{
        fetch('http://localhost:8080/Blog/api/category/'+categoryUpdate.id, {
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
      sessionStorage.removeItem("categoryUpdate")
        ToastsStore.success("Update Succesfully!");
      }
      this.setState({
        categoryName:'',
        nameError:'',
        })
  }
}

  render() {
    var a = JSON.parse(sessionStorage.getItem('userData'));
    if(!a){
      console.log("Loi")
      return (<Redirect to={'/'}/>)
    }

    const{categoryName}= this.state;
    return (
      <Form onSubmit={this.onSubmit} autoComplete="off">
        <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="categoryName">Category name</Label>
              <Input value={categoryName} type="text"
              onChange={this.onChange} name="categoryName" id="categoryName"/>
              <div style={{ fontSize: 14, color: "red" }}>
            {this.state.nameError}
          </div>
            </FormGroup>
           
          </Col>
          </Row>
        <Button color="primary" style={{float:"left"}}>Submit</Button>
      </Form>

    );
  }
}

export default CreateCategory;
