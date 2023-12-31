import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TasteImg from "./TasteBot.avif";
import Form from 'react-bootstrap/Form';

//import { Img } from 'react-image';



import Post from "./components/Post";
import Header from "./components/Header";
import LeftCard from "./components/LeftCard";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function App() {
  
  const [data, setData] = useState({});
  const [backendString, setBackendString] = useState('');


  useEffect(() => {
      fetch('/api/data')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error:', error));
  }, []);

  const [tfidfResults, setTfidfResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleButtonClick = async () => {
    console.log('Button clicked');
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/TFIDF?query=${query}`, {
        method: 'GET', // Specify the request method
      });
      console.log(response)
      const data = await response.json();
      console.log("hi")

      setTfidfResults(data.results);
      handleButtonClick1()
    } catch (error) {
      console.error('Error fetching TFIDF results:', error);
    }
  };

  const [Word2VecResults, setWord2VecResults] = useState([]);
  const [query1, setQuery1] = useState('');

  const handleButtonClick1 = async () => {
    console.log('Button clicked');
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/word2vec?query=${query1}`, {
        method: 'GET', // Specify the request method
      });
      console.log(response)
      const data = await response.json();

      setWord2VecResults(data.results);
      handleRankingButtonClick2()
    } catch (error) {
      console.error('Error fetching TFIDF results:', error);
    }
  };
  

  const [rankingResults, setRankingResults] = useState([]);

  const handleRankingButtonClick2 = async () => {
    try {
      const response = await fetch(`http://localhost:5000/ranking`);
      const data = await response.json();
      setRankingResults(data.results);
    } catch (error) {
      console.error('Error fetching ranking results:', error);
    }
  };



  return (
  
  <div style={{backgroundColor: 'dimgrey', position:"absolute", left:"0",right:"0", height:"100%"}}>
    <Navbar bg="dark" variant="dark" expand="lg">
    <img src={TasteImg} height = "30sv" className="square bg-primary rounded-circle mx-2"  alt="Description" />
    <Navbar.Brand href="#home">The Taste Bot</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">

      </Nav>
    </Navbar.Collapse>
    </Navbar>
    <div class="text-center">
      <img src={TasteImg} height = "150sv" className="square bg-primary rounded-circle mx-2 mt-3"  alt="Description" />
      <h1 className="mt-2" style={{"pointer-events":"none"}}>Welcome To The TasteBot!</h1>
      {/* <Form>
        <Form.Group className="mb-3 mx-5" bg="dark" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" selectionColor={'green'} small rows={5} style={{background:"silver", cursor: "auto", "user-select":"text" }}/>
        </Form.Group>

      </Form> */}
    </div>
    <div style={{backgroundColor: 'silver'}} className="text-center" >
    <p class="text-center" style={{width:"30%", "text-align":"center", margin:"auto"}} >The TasteBot uses an Amazon review database to recommend food products that interest you. Thank you for choosing us when you're looking for something tasty! </p>
    <Container flex>
      <Row className="show-grid">
          <Col xs={1} md={4}>
            <h1>Step 1</h1>
            <p>Write the category of food that interests you!</p>
          </Col>
          <Col xs={4} md={4}>
            <h1>Step 2</h1>
            <p>Describe a quality about your desired snack!</p>
          </Col>
          <Col xs={1} md={4}>
            <h1>Step 3</h1>
            <p>Finally, click submit!</p>
          </Col>
      </Row>

      <Row className="show-grid">
          <Col xs={0} md={4} className="lm-0 lp-0" >
            <Form.Control type="input" placeholder="Food Type, I.E Cereal " size="sm" value={query} onChange={(e) => setQuery(e.target.value)}/>
          </Col>
          <Col xs={6} md={4} >
            <Form.Control type="input" placeholder="One Word Descriptor" size="sm"value={query1} onChange={(e) => setQuery1(e.target.value)}/>
          </Col>
          <Col xs={1} md={4}>
          <Button /*style={{color:"#00005c", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}*/ variant="success" size="lg" className="mt-0" onClick={handleButtonClick}/*onClick={handleRankingButtonClick2}*/>submit</Button>
          </Col>
      </Row>
    </Container>
   
    <div className = "text-center" class="text-dark" style={{backgroundColor: 'silver', "margin-top":"3%"}}>
      <h1>Step 4</h1>
      <p>After clicking submit, scroll down to find results!</p>
     
    </div>
    <div style={{backgroundColor: 'silver', "margin-top":"8%"}}>
      <container >
        <h1 style={{backgroundColor: 'silver', "margin-bottom":"3%"}}>Results</h1>
        <Row className = "show-grid">
              <Col xs={1} md={4}>
              <h2>Direct Match!</h2>
              <ul style={{backgroundColor: 'silver'}} class="p-0 mb-0">
                {tfidfResults.map((result, index) => (
                  <li style={{backgroundColor: 'silver'}} key={index}>{index+1}. {result}</li>
                ))}
              </ul>
              </Col>
              <Col xs={4} md={4}>
                <h2>Ranks!</h2>
                <ul style={{backgroundColor: 'silver', "list-style-type":"none"}} class="p-0 m-0">
                {rankingResults.map((result, index) => (<li key={index}>{index+1}. {result}</li>))}
                </ul>
              
              </Col>
              <Col xs={1} md={4}>
              <h2>Correlated Match!</h2>
              <ul style={{backgroundColor: 'silver', left:"0",right:"0", "list-style-type":"none"}} class="p-0 m-0">
              {Word2VecResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
              </ul>
              </Col>
          </Row>
      </container>
    </div>
    </div>

    {/* <div style={{backgroundColor: 'silver', position:"absolute", bottom:"0"}} class="mt-0 pt-0 bt-0" > */}



    {/* </div> */}

    <div style={{backgroundColor: 'silver', left:"0",right:"0", position:"absolute", height:"17%"}} class="p-0 m-0">
      
    </div>
  </div>

  );
}

export default App;
