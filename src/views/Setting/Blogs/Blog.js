import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Redirect} from 'react-router-dom';

class Blog extends Component{
    constructor(props){
        super(props);
        this.state = {
          item: []
        }
      }

      getBlog(){
        fetch('http://localhost:8080/Blog/api/blog',{
          method:'GET'
        })
        .then(res => res.json())
        .then(json => {
          this.setState({
            item: json,
          })
        });
      }

      componentDidMount(){
        this.getBlog();
      }

      render(){
        var a = JSON.parse(sessionStorage.getItem('userData'));
        if(!a){
          console.log("Loi")
          return (<Redirect to={'/'}/>)
        }
        var {item} = this.state

        const blog = item.find( blog => blog.id.toString() === this.props.match.params.id)
    
        const blogDetails = blog ? Object.entries(blog) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
          return(
            
<div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Blog id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        blogDetails.map(([key, value]) => {
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

export default Blog;