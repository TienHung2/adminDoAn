import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Tooltip, UncontrolledTooltip } from 'reactstrap';

class TooltipItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    return (
      <span>
        <Button className="mr-1" color="secondary" id={'Tooltip-' + this.props.id}>
          {this.props.item.text}
        </Button>
        <Tooltip placement={this.props.item.placement} isOpen={this.state.tooltipOpen} target={'Tooltip-' + this.props.id} toggle={this.toggle}>
          Tooltip Content!
        </Tooltip>
      </span>
    );
  }
}

class LeTienHung extends Component {
  
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: [false, false],
      letienhung: [
        {
          placement: 'top',
          text: 'Top',
        },
        {
          placement: 'bottom',
          text: 'Bottom',
        },
        {
          placement: 'left',
          text: 'Left',
        },
        {
          placement: 'right',
          text: 'Right',
        },
      ],
    };
  }

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }

  render() {
  console.log(sessionStorage.getItem('userData'))

    return (
      <div></div>
    );
  }
}

export default LeTienHung;
