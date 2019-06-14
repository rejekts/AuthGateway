import React from "react";
import { Header, Form, Dropdown, Button } from "semantic-ui-react";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuantity: 0,
      selectedTotal: 0,
      confirmed: false,
      basket: false
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {}

  handleSelection(e, { name, value }) {
    e.preventDefault();
    console.log(name, value);
    let selectedTotal = 0;
    if (value >= 5) {
      selectedTotal = 225 * value; //current price if 5 or more purchase THE PRICES DONT MATTER, ONLY THE QUANTITY. ACTUAL PRICES STORED ON SERVER SO NO FUCKY BUISNESS => this just displays the total cost
    } else {
      selectedTotal = 250 * value; //price per proxy
    }
    this.setState({ [name]: value, selectedTotal, confirmed: false }); //user has to reconfirm if they make any changes
    if (value !== 0) {
      this.setState({ basket: true });
    } else {
      this.setState({ basket: false });
    }
  }
  handleConfirm(e) {
    e.preventDefault();
    this.setState({ confirmed: true });
    alert("You are about to make a auto-renewing subscription purchase!"); //guard against accidental button pushes
  }
  handlePurchase(e) {
    e.preventDefault();
    console.log("purchase commenced");
    console.log(this.props.id, this.state.selectedQuantity);
    axios
      .post("/purchase", payload)
      .then(results => {
        console.log("Good return ", results); // was working on this IS INCOMPLETE
      })
      .catch(err => {
        console.log("Bad return ", err);
      });
    //send request with quantity, and user id
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
        <Button
          toggle
          active={this.state.confirmed}
          disabled={!this.state.basket}
          onClick={e => {
            this.handleConfirm(e);
          }}
        >
          {this.state.confirmed ? `Confirmed!` : "Confirm"}
        </Button>
        <Button
          disabled={!this.state.confirmed}
          onClick={e => {
            this.handlePurchase(e);
          }}
        >
          Purchase
        </Button>
      </Form>
    );
  }
}

export default Cart;
