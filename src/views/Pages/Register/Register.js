import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {ToastsContainerPosition, ToastsContainer,ToastsStore} from 'react-toasts';
import { Link } from 'react-router-dom';
import './Register.css';
class Register extends Component {
  
  constructor() {
    super();
    this.state = {
      age: '',
      brithDay: '',
      email: '',
      name:'',
      password:'',
      userName:'',
      emailError:'',
      nameError:'',
      userNameError:'',
      passwordError:'',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let emailError = "";
    let nameError = "";
    let userNameError = "";
    let passwordError = "";

    if (!this.state.email.includes("@")) {
      emailError = "* invalid email";
    }

    if (!this.state.name) {
      nameError = "* name cannot be blank";
    }

    if (!this.state.userName) {
      userNameError = "* userName cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "* password cannot be blank";
    }

    if (emailError || nameError || userNameError || passwordError) {
      this.setState({ emailError, nameError,userNameError, passwordError });
      return false;
    }

    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid){
    console.log(JSON.stringify(this.state))
    fetch('http://localhost:8080/Blog/api/user', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state), // body data type must match "Content-Type" header
  });
  this.setState({
    age: '',
      brithDay: '',
      email: '',
      name:'',
      password:'',
      userName:'',
      emailError:'',
      nameError:'',
      userNameError:'',
      passwordError:'',
    })
  ToastsStore.success("Create Succesfully!");
  }
  }

  render() {
    const{age, brithDay, email, name,password,userName}= this.state;
    return (
      <div className="app flex-row align-items-center">
      <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <div style={{ fontSize: 14, color: "red" }}>
            {this.state.userNameError}
          </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      
                      <Input name="userName"
              value={userName}
              onChange={this.onChange} type="text" placeholder="Username" autoComplete="username" />
                            
                    </InputGroup>

                    <div style={{ fontSize: 14, color: "red" }}>
            {this.state.nameError}
          </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="name"
              value={name}
              onChange={this.onChange} type="text" placeholder="Name" autoComplete="Name" />
              
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="brithDay"
              value={brithDay}
              onChange={this.onChange} type="date" placeholder="BirthDay" autoComplete="BirthDay" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="age"
              value={age}
              onChange={this.onChange} type="number" placeholder="Age" autoComplete="Age" />
                    </InputGroup>

                    <div style={{ fontSize: 14, color: "red" }}>
            {this.state.emailError}
          </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input name="email"
              value={email}
              onChange={this.onChange} type="text" placeholder="Email" autoComplete="email" />
              
                    </InputGroup>

                    <div style={{ fontSize: 14, color: "red" }}>
            {this.state.passwordError}
          </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="password"
              value={password}
              onChange={this.onChange} type="password" placeholder="Password" autoComplete="new-password" />
                                 
                    </InputGroup>
                    
                    <Button color="success" block>Create Account</Button>
                  </Form><br />
                  <Link style={{float:'right'}} to="/login">Go to login</Link>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </Container>       
      </div>
    );
  }
}

export default Register;
