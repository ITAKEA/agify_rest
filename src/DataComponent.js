
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function DataComponent() {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();
    setData(result);
  };

  const getMostProbableCountry = () => {
    if (data && data.nationalizeData.country.length > 0) {
      let mostProbableCountry = data.nationalizeData.country[0];
      data.nationalizeData.country.forEach((country) => {
        if (country.probability > mostProbableCountry.probability) {
          mostProbableCountry = country;
        }
      });
      return mostProbableCountry;
    }
    return null;
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Enter name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" onClick={fetchData}>
            Fetch Data
          </Button>
        </Col>
      </Row>
      {data && (
        <div className="mt-4">
          <h2>Name: {data.agifyData.name}</h2>
          <p>Age: {data.agifyData.age}</p>
          <p>Gender: {data.genderizeData.gender}</p>
          {data.nationalizeData.country.length > 0 && (
            <p>
              Most probable country:{' '}
              <strong>{getMostProbableCountry().country_id}</strong>
            </p>
          )}
          {data.nationalizeData.country.map((country) => (
            <p key={country.country_id}>
              Country: {country.country_id}, Probability: {country.probability}
            </p>
          ))}
        </div>
      )}
    </Container>
  );
}

export default DataComponent;
