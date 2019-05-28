import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {


  constructor(){
    super();
   
    this.state = {
     username: '',
     password: '',
     items: [],
     redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  login() {
    if(this.state.username && this.state.password){
      fetch('http://localhost:8080/Blog/api/user/login/'+this.state.username+'/'+this.state.password)
      .then(res => res.json())
      .then(json => {
        sessionStorage.setItem('userData',JSON.stringify(json.users));
        // if(json.users.length!=0){this.setState({redirectToReferrer: true});}
        var a=sessionStorage.getItem('userData')
        if(a.length!=2){
          console.log(sessionStorage.getItem('userData'))
          document.location.assign('http://localhost:3000/setting/categories/createcategory#/base/letienhung');
        }else{
          console.log("a = "+a.length)
          window.alert("Loi");
          
        }
        this.setState({
          items: json.users,
        })
      })
    }
   }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  render() {

    const {username, password} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form autoComplete="off">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input value={username} onChange={this.onChange} name="username" type="text" placeholder="Username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input value={password} onChange={this.onChange} name="password" type="password" placeholder="Password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button onClick={this.login} color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
