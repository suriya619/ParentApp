import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';


function Icons(props: any) {
  const { type, name, color, size } = props;

  const getIconsElement =() => {
    switch(type){
      case 'AntDesign': 
        return <AntDesign name={name} color={color} size={size} />
      case 'Entypo': 
        return <Entypo name={name} color={color} size={size} />
      case 'EvilIcons': 
        return <EvilIcons name={name} color={color} size={size} />
      case 'Feather': 
        return <Feather name={name} color={color} size={size} />
      case 'FontAwesome': 
        return <FontAwesome name={name} color={color} size={size} />
      case 'FontAwesome5': 
        return <FontAwesome5 name={name} color={color} size={size} />
      case 'Fontisto': 
        return <Fontisto name={name} color={color} size={size} />
      case 'Ionicons': 
        return <Ionicons name={name} color={color} size={size} />
      case 'MaterialCommunityIcons': 
        return <MaterialCommunityIcons name={name} color={color} size={size} />
      case 'MaterialIcons': 
        return <MaterialIcons name={name} color={color} size={size} />
      case 'Octicons': 
        return <Octicons name={name} color={color} size={size} />
      default:
        break;
    }

  }

  const Icon = getIconsElement();
  return Icon;
}

export default Icons;