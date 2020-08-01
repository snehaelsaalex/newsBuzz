import React, { Component } from 'react';
import './Home.scss';
import placeholderImage from '../assets/images/placeholder.png';
import { getData } from '../api-service/NewsApiService';
import axios from 'axios';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: [],
            selectedItem: {}
        }
    }
    async componentDidMount() {
        let data = await getData('http://newsapi.org/v2/top-headlines?country=in&apiKey=1248631933554e25b5076bdfdca5615c');
        this.setState({
            newsData: data
        })
        console.log(this.state.newsData);
    };
    setSelectedItem = (selectedItem) => {
        this.setState({
            selectedItem
        })
    }
    render() {
        return (
            <div className="home-container">
                <div className="jumbotron jumbotron-fluid jumbotron-custom">
                    <div className="container text-center">
                        <h1 className="display-4">NewS BuZZ</h1>
                        <p className="lead">Your any news destination</p>
                    </div>
                </div>
                <div className="container card-container">
                    <div className="row row-cols-1 row-cols-md-2">
                        {
                            this.state.newsData && this.state.newsData.map((newsItem, index )=> {
                                return (
                                    <div className="col mb-4" data-toggle="modal" data-target=".bd-view-modal-lg" onClick= {() => {this.setSelectedItem(newsItem)}} key = {index}>
                                        <div className="card card-custom text-white bg-dark mb-3">
                                            <img src={newsItem.urlToImage ? newsItem.urlToImage : placeholderImage} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{newsItem.title}</h5>
                                                <p className="card-text">{newsItem.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="modal fade bd-view-modal-lg modal-container" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content modal-custom-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="exampleModalLabel">{this.state.selectedItem.title}</h5>
                                <button type="button " className="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body modal-custom-body">
                                <div className="d-flex justify-content-center">
                                <img src = {this.state.selectedItem.urlToImage ? this.state.selectedItem.urlToImage : placeholderImage} width="200px" height="200px"  />
                               <span className="ml-3"> {this.state.selectedItem.description} </span> 
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Home
