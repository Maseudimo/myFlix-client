
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss"
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  
  render() {
    const { movie } = this.props;
    return (
      
      <Card id="movie-card">
      <Card.Img id="movie-image" variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title id="moviecard-title">{movie.Title}</Card.Title>
        <Card.Text id="movie-genre">{movie.Genre.Name}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
      </Card.Body>
    </Card>
         )}
        }


        MovieCard.propTypes = {
          movie: PropTypes.shape({
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
          }).isRequired,
         
        };
        
        