import React from 'react';
import './App.css';
import ComboBox from './CoinManagement';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
function App() {
  return (
    <div class='App'>
      <Container fluid>
        <Row>
          <Col xs={12} md={4}>
            <ComboBox></ComboBox>
          </Col>
          <Col xs={6} md={4}>
            <TextField
              id='outlined-basic'
              label='Số lượng'
              variant='outlined'
            />
          </Col>
          <Col xs={6} md={4}>
            <TextField
              id='outlined-number'
              label='Number'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
            />
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
}

export default App;
