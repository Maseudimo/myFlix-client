import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


 class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
        };
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

      /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
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

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
        user
    });
}


    render() {
        const { movies, selectedMovie, regsiter, user } = this.state;

        


        if (movies.length === 0) return <div className="main-view" />;

        return (

            <div>
            <button>Login</button>
            <button>Register</button>
            <Row className="main-view justify-content-md-center">
                    {selectedMovie 
                   ? (
                      <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                      </Col>
                    )
                      
                      :movies.map((movie) => (
                        <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
                      }
                      </Row>
                      </div>
                       );
                      }
                    }
  

       
export default MainView;