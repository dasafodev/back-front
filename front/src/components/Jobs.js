import React, { useState, useEffect } from "react";
import Job from "./Job";
import { Button, Container, Row, Col, Modal, Form , Alert} from "react-bootstrap";

export const Jobs = () => {
  const [state, setState] = useState({ offers: [] });

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showWarning, setShowWarning] = useState(false)

  const handleCreate = () => {
    if(name!=="" && company!=="" && salary!=="" && city!==""  ){
    setShow(false);
    const url = "/offers";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        company: company,
        salary: salary,
        city: city,
      }),
    };
    fetch(url, requestOptions).then((response) => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((offers) => {
          setState({ offers });
        });
      response.json();
    });
  }else{
    setShowWarning(true)
  }
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    const url = "/offers";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((offers) => {
        setState({ offers });
      });
  }, []);

  return (
    <>
      <Container>
        <Row className="mb-4 mt-4">
          <Col>
            <Button variant="primary" onClick={handleShow}>
              Crear oferta
            </Button>
            <br />
          </Col>
        </Row>
        <Row>
          {state.offers.map((e, i) => (
            <Col xs={5} className="m-2">
              <Job key={i} offer={e} />
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear oferta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={(value) => setName(value.target.value)}
              type="text"
              placeholder="Frontend Developer"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Compañia</Form.Label>
            <Form.Control
              onChange={(value) => setCompany(value.target.value)}
              type="text"
              placeholder="Apple"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Salario</Form.Label>
            <Form.Control
              onChange={(value) => setSalary(value.target.value)}
              type="text"
              placeholder="2200 USD"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              onChange={(value) => setCity(value.target.value)}
              type="text"
              placeholder="Remoto"
            />
          </Form.Group>
          <Alert show={showWarning} variant="danger" >Rellene todos los campos</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Jobs;
