import React, {Component} from 'react';


class Sidebar extends Component {

  constructor() {
        super();

        this.state = {
            info: '',
            markers: [],
            query: ''
        };
    }

    componentDidMount() {
        this.setState({markers: this.props.virtualMarker});
    }

    open = () => {
        const sideBar = document.querySelector('.sideBar');

        sideBar.style.display === 'none' ? sideBar.style.display = 'block' : sideBar.style.display = 'none';
    }

    search = (event) => {
        const query = event.target.value.toLowerCase();
        const markers = this.props.virtualMarker;
        const newMarkers = [];

        markers.forEach(function (marker) {
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                marker.setVisible(true);
                newMarkers.push(marker);
            } else {
                marker.setVisible(false);
            }
        });

        this.setState({markers: newMarkers});
    }


    openMarker(marker) {
        console.log(marker);
        this.props.openInfo(marker);
    }


  render(){
    return(

      <div className="sideBar">
        <div className="place">
          <ul>

            <li>Orlando Balloon Rides</li>
            <li>Lakeridge Winery Vineyards</li>
            <li> Winter Park</li>
            <li >Player1 Video Game Bar</li>
            <li>Lake Eola</li>
            <li >Wekiwa Springs State Park</li>
            <li>Food Trucks</li>
          </ul>

        </div>
                   <div className="form" role="form">
                       <input type="text"
                              aria-labelledby="filter" placeholder="Search..."
                              className="input" role="search"
                              onChange={this.search}/>
                   </div>

                 </div>

)  }
}



export default Sidebar;
