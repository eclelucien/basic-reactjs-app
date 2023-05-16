import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    clients: [],
    isLoading: true
  };

  async componentDidMount() {
    const response = await fetch('/clients');
    const body = await response.json();
    this.setState({ clients: body, isLoading: false });
  }

  async remove(id) {
    await fetch(`/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let updatedClients = this.state.clients.filter(client => client.id !== id);
    this.setState({ clients: updatedClients });
  }

  render() {
    const { clients, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const clientList = clients.map(client => (
      <tr key={client.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
        <td>{client.email}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={`/clients/${client.id}`}>
              Edit
            </Button>
            <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/clients/new">
              Add Client
            </Button>
          </div>
          <h3>Clients</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Name</th>
                <th width="30%">Email</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{clientList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;
