import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Map from './Map'


  class App extends Component {

      constructor(props) {
          super(props);

          this.state = {
              map: '',
              info: '',
              markers: [
                  {lat: 28.237302,long: -81.653586,name: 'Orlando Balloon Rides'},
                  {lat: 28.6274579,long: -81.7709545,name: 'Lakeridge Winery & Vineyards',},
                  {lat: 28.597751,long: -81.351397,name: 'Winter Park'},
                  {lat:28.384207,long: -81.501686,name: 'Player 1 Video Game Bar'},
                  {lat: 28.543983,long: -81.372991,name: 'Lake Eola'},
                  {lat: 28.727938,long: -81.477866,name: 'Wekiwa Springs State Park'},
                  {lat: 28.334320,long: -81.517540,name: 'Food Trucks'}
              ],
              virtualMarkers: []
          };


          this.initMap = this.initMap.bind(this);
          this.generateMarkers = this.generateMarkers.bind(this);
          this.openMarker = this.openMarker.bind(this);
      }


      componentDidMount() {
          window.initMap = this.initMap;
          createMapLink("https://maps.googleapis.com/maps/api/js?key=AIzaSyAfzh1i5W3DsrNwgco8SELCPycM7msEhBY&callback=initMap");

      }

      initMap() {
          let map;
          map = new window.google.maps.Map(document.getElementById('map'), {
              zoom: 9,
              center: {lat:28.538336 , lng: -81.379234}
          });

          const infowindow = new window.google.maps.InfoWindow({});

          this.setState({map: map, info: infowindow});
          this.generateMarkers(map);
      }

      generateMarkers(map) {
          let self = this;

          this.state.markers.forEach(marker => {
              const loc = {lat: marker.lat, lng: marker.long}

              let mark = new window.google.maps.Marker({
                  position: loc,
                  map: map,
                  title: marker.name
              });


              mark.addListener('click', function () {
                  self.openMarker(mark);
              });

              let virtMarker = this.state.virtualMarkers;
              virtMarker.push(mark);

              this.setState({virtualMarkers: virtMarker});


          });
      }

      openMarker(marker = '') {
          const clientId = "QANTSVVK2ZHV5435DNUH4R2CB1N025JYROWAGIPCN1Z5Z0IM\n";
          const clientSecret = "TL00ME40OFMTMYGLXPRJIKAV3AV5CFJXPSMJ3FUOG3Z0YHZA\n";
          const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";


          if (this.state.info.marker !== marker) {
              this.state.info.marker = marker;
              this.state.info.open(this.state.map, marker);
              marker.setAnimation(window.google.maps.Animation.DROP);


              this.state.info.addListener('closeClick', function () {
                  this.state.info.setMarker(null);
              });

              this.markerInfo(url);
          }
      }

      markerInfo(url) {

          let self = this.state.info;

          fetch(url)
              .then(function (resp) {
                  if (resp.status !== 200) {
                      const err = "Can't load data.";
                      this.setState({info: err});
                  }

                  resp.json().then(function (data) {
                      var place = data.response.venues[0];
                      var info =
                          "<div id='marker'>" +
                              "<h1>" + self.marker.title + "</h1>" +
                              "<h2><b>Address:</b> " + place.location.address + ", " + place.location.city + "</h2>" +

                          "</div>";

                      self.setContent(info);
                  });


              })
              .catch(function (err) {
                  const error = "Can't load data.";
                  self.setContent(error);
              });

      }
  render() {
    return (
                <div id="container">

                          <Header />
                           <Map />
                           <Sidebar
                             infoWindow={this.state.info}
                             openInfo={this.openMarker}
                             virtualMarker={this.state.virtualMarkers} />
                           <Footer />

                  </div>
              );
          }
      }
      function createMapLink(url) {
          let tag = window.document.getElementsByTagName('script')[0];
          let script = window.document.createElement('script');
          script.src = url;
          script.async = true;
          script.onerror = function () {
              document.write("Google Maps can't be loaded");
          };
          tag.parentNode.insertBefore(script, tag);
      }





export default App;
