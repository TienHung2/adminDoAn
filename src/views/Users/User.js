import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Redirect} from 'react-router-dom';

class User extends Component {
constructor(props){
    super(props);
    this.state = {
      items: []
    }
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
  render() {
    var a = JSON.parse(sessionStorage.getItem('userData'));
    if(!a){
      console.log("Loi")
      return (<Redirect to={'/'}/>)
    }
    var {items} = this.state

    const user = items.find( user => user.id.toString() === this.props.match.params.id)

    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
