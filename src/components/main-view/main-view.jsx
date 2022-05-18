import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

/*import { MovieCard } from '../movie-card/movie-card';*/
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationView } from '../navigation-view/navigation-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {


    constructor() {
      super();
      //initial state is set to null
      this.state = {
        movies: [],
        user: null,
      };
    }
  
    getMovies(token) {
      axios
        .get('https://mehos-myflix-app.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          //assign the result to the state
          this.setState({
            movies: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    // When token is present (user is logged in), get list of movies
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user'),
        });
        this.getMovies(accessToken)
      }
    }
  
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.username,
      });
  
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.username);
      //this.getMovies(authData.token);
     location.reload();
    }
  
    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null,
      });
    }
  
  
    render() {
      let { movies } = this.props;
      let { user } = this.state;
      
      return (
        <Router>
          <NavigationView user={user} />
          <Row className="main-view justify-content-md-center">
  
  
            <Route exact path="/" render={() => {
              
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
  
              if (movies.length === 0) return <div className="main-view" />;
  
              return <MoviesList movies={movies} />
            }} />
  
            <Route path="/register" render={() => {
              
              return <Col>
                <RegisterView />
              </Col>
            }} />
  
            <Route path="/movies/:movieId" render={({ match, history }) => {
              
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
  
            <Route path="/profile" render={({ history }) => {
              
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }
  
              return (
                <Col md={8}>
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />
  
            <Route path="/directors/:name" render={({ match, history }) => {
              
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />
  
            <Route path="/genres/:name" render={({ match, history }) => {
              
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Router>
      );
    }
  }
  
  let mapStateToProps = state => {
    return { movies: state.movies }
  }
  
  export default connect(mapStateToProps, { setMovies })(MainView);
