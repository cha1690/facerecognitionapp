import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import SignIn from './Components/SignIn/SignIn.js';
import Register from './Components/Register/Register.js';
import Particles from 'react-particles-js';
import 'tachyons';


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
    input:'',
    imageUrl:'',
    box:{},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    } 
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route : route})
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render() {
    const {isSignedIn, box, route, imageUrl} = this.state;
    return (
      <div className="App">y
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
        { route === 'home' 
        ? <div>
          <Logo />
          <Rank 
            name={this.state.user.name} 
            entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange ={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition 
            box= {box} 
            imageUrl={imageUrl}/>
        </div>
        : ( route === 'signin' 
            ? <SignIn 
              loadUser={this.loadUser} 
              onRouteChange = {this.onRouteChange} />
            : <Register 
                loadUser = {this.loadUser} 
                onRouteChange = {this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
