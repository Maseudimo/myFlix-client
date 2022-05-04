import React from "react";
import PropTypes from "prop-types";
import "./director-view.scss";
import { Container, Card, Button, Row, Link } from "react-bootstrap";




export class DirectorView extends React.Component {
  render() {
    const { director, movie, onBackClick } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title
              
            >
              Director
            </Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth year: </span>
              <span className="value">{director.BirthYear}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Death year: </span>
              <span className="value">{director.DeathYear}</span>
            </Card.Text>
            
          </Card.Body>
        </Card>

        
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    BirthYear: PropTypes.number,
    DeathYear: PropTypes.number,
  }).isRequired,
};