import { Component } from 'react';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
    state = {
    query: '',
    isLoading: false,
    error: null
  };

  handleSubmit = value => {
    this.setState({query: value})
  }

  render() {
    
    return (
      <Layout>
        <Toaster toastOptions={{duration: 1500}}/>
        <Searchbar onSubmit={this.handleSubmit} query={this.state.query}></Searchbar>
        <ImageGallery query={this.state.query}></ImageGallery>
      </Layout>
    );
  }
}


