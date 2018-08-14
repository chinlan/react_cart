class Body extends React.Component {
  constructor(props) {
    super(props);
    this.removeItemClient = this.removeItemClient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    $.getJSON('/api/items.json', (response) => { this.setState({ items: response }) });
  }

  handleSubmit(item) {
    var newState = this.state.items.concat(item);
    this.setState({ items: newState })
  }

  handleDelete(id) {
    $.ajax({
      url: `/api/items/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeItemClient(id);
      }
    });
  }

  removeItemClient(id) {
    var newItems = this.state.items.filter((item) => {
      return item.id != id;
    });

    this.setState({ items: newItems });
  }

  handleUpdate(item) {
    $.ajax({
      url: `/api/items/${item.id}`,
      type: 'PUT',
      data: { item: item },
      success: () => {
        this.updateItems(item);
      }
    }
  )}

  updateItems(item) {
    var items = this.state.items.filter((i) => { return i.id != item.id });
    items.push(item);

    this.setState({items: items });
  }

  render() {
    return (
      <div>
        <NewItem handleSubmit={this.handleSubmit.bind(this)}/>
        <AllItems  items={this.state.items}  handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    )
  }
};
