class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.updateNameInput = this.updateNameInput.bind(this);
    this.updatePriceInput = this.updatePriceInput.bind(this);
    this.handleCilck = this.handleClick.bind(this);
    this.state = { nameInput: '', priceInput: '' };
  }

  handleClick() {
    $.ajax({
      url: '/api/items',
      type: 'POST',
      data: { item: { name: this.state.nameInput, price: this.state.priceInput } },
      success: (item) => {
        this.props.handleSubmit(item);
      }
    });
    this.setState({
      nameInput: '', priceInput: ''
    });
  }

  updateNameInput(e) {
    this.setState({
      nameInput: e.target.value
    });
  }

  updatePriceInput(e) {
    this.setState({
      priceInput: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.nameInput} placeholder='Product name' onChange={this.updateNameInput} />
        <input value={this.state.priceInput} placeholder='Product price' onChange={this.updatePriceInput} />
        <button onClick={this.handleClick.bind(this)}>Add to cart</button>
      </div>
    )
  }
};
