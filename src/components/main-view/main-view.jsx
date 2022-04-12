import React from 'react';
import axios from 'axios';
import './main-view.scss';
//import propTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

  export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }

    componentDidMount(){
      axios.get('https://mehos-myflix-app.herokuapp.com/movies')
      .then(response => { 
        this.setState({
          movies: response.data
        });
     })
     .catch(error => {
       console.log(error);
     });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* User registers */
    onRegistration(registration) {
      this.setState({
          registration,
      });
  }
  onLoggedIn(user) {
    this.setState({
        user
    });
}


    render() {
        const { movies, selectedMovie } = this.state;


        if (movies.length === 0) return <div className="main-view" />;

        return (

            <div>
            <button>Login</button>
            <button>Register</button>
                  <div className="main-view">
                    {selectedMovie ? (
                      <MovieView
                        movie={selectedMovie}
                        onBackClick={(newSelectedMovie) => {
                          this.setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    ) : (
                      movies.map((movie) => (
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          onMovieClick={(movie) => {
                            this.setSelectedMovie(movie);
                          }}
                        />
                      ))
                    )}
                  </div>
                  </div>
                );
              }
            }
export default MainView;