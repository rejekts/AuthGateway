import React from "react";
import { Header, Form, Dropdown, Button } from "semantic-ui-react";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuantity: 0,
      selectedTotal: 0
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {}

  handleSelection(e, { name, value }) {
    e.preventDefault();
    console.log(name, value);
    let selectedTotal = 0;
    if (value >= 5) {
      selectedTotal = 225 * value;
    } else {
      selectedTotal = 250 * value;
    }
    this.setState({ [name]: value, selectedTotal });
  }
  render() {
    //console.log(this.props.options);
    return (
      <Form>
        <Header as="h3">Quantity desired</Header>
        <Form.Field>
          <Dropdown
            name="selectedQuantity"
            searchInput={{ type: "number" }}
            selection
            options={this.props.options}
            placeholder="Select amount..."
            onChange={this.handleSelection}
          />
        </Form.Field>
        <Header as="h4">Total cost: ${this.state.selectedTotal}</Header>
        <Button>Purchase</Button>
      </Form>
    );
  }
}

export default Cart;
