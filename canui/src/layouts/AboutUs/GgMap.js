import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOeqn_QRWjq-d3jjbmgsgI2hPAymkfZuc&amp&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker className='map-marker-container clicked infoBox-opened' position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: true,
  };

  render() {
    let { lat, lng } = this.props;
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        lat={lat}
        lng={lng}
      />
    )
  }
}
export default MyFancyComponent;
