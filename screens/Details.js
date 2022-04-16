import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      url: `http://127.0.0.1:5000/star?name=${this.props.navigation.getParam(
        "planet_name"
      )}`,
     
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        this.setState({details:response.data.data})
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

//   setDetails = planetDetails => {
//     const planetType = planetDetails.planet_type;
//     let imagePath = "";
//     switch (planetType) {
//       case "Gas Giant":
//         imagePath = require("../assets/planet_type/gas_giant.png");
//         break;
//       case "Terrestrial":
//         imagePath = require("../assets/planet_type/terrestrial.png");
//         break;
//       case "Super Earth":
//         imagePath = require("../assets/planet_type/super_earth.png");
//         break;
//       case "Neptune Like":
//         imagePath = require("../assets/planet_type/neptune_like.png");
//         break;
//       default:
//         imagePath = require("../assets/planet_type/gas_giant.png");
//     }

//     this.setState({
//       details: planetDetails,
//       imagePath: imagePath
//     });
//   };

  render() {
    const { details} = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Mass : ${details.mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Radius : ${details.radius}`}</Text>
              
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});