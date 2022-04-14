import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
 
export class MovieCard extends React.Component {
  
    render() {
    const { movie, onMovieClick } = this.props; // shortend for const movie = this.props.movie, props are to receive data in form of an object
    return (
        <div>
           <a href="#" onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</a></div>
    );
  }
 } 
 
MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };
  
  export default MovieCard;
