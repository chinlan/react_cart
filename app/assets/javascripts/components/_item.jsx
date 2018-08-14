class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateNameInput = this.updateNameInput.bind(this);
    this.updatePriceInput = this.updatePriceInput.bind(this);
    this.state = {
      editable: false,
      nameInput: this.props.item.name,
      priceInput: this.props.item.price
    };
  }

  handleEdit() {
    if(this.state.editable) {
      var name = this.state.nameInput;
      var id = this.props.item.id;
      var price = this.state.priceInput;
      var item = {id: id , name: name , price: price};
      this.props.handleUpdate(item);
    }
    this.setState({ editable: !this.state.editable })
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
    var name = this.state.editable ? <input type='text' value={this.state.nameInput} onChange={this.updateNameInput}/> : <h3>{this.props.item.name}</h3>;
    var price = this.state.editable ? <input type='text' value={this.state.priceInput} onChange={this.updatePriceInput}/>: <p>{this.props.item.price}</p>;
    return (
      <div>
        {name}
        {price}
        <button onClick={this.props.handleDelete} >Delete</button>
        <button onClick={this.handleEdit}> {this.state.editable ? 'Submit' : 'Edit' } </button>
      </div>
    )
  }
};
