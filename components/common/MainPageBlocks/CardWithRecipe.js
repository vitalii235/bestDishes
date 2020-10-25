import React from 'react';
import {Card, CardItem, Text, View, Title} from 'native-base';
import {Image} from 'react-native';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {translations} from '../../../translations/translations';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CardWithRecipe = ({item, navigation, setDataForCurrentDish}) => {
  const {
    likesContainer,
    infoBlock,
    imageStyle,
    card,
    container,
    cardItem,
    categories,
    leftSide,
    title,
  } = styles;

  const {
    info: {category, timeForCooking},
  } = translations;

  return (
    <View style={container} key={Math.random().toString()}>
      <TouchableOpacity
        onPress={() => {
          console.log('startedLoader');
          setDataForCurrentDish('id', item.id);
          navigation.navigate('Description');
        }}>
        <Card style={card}>
          <View style={title}>
            <Title>{item?.name ?? 'Блюдо'}</Title>
          </View>
          {/* <Subtitle>Test</Subtitle> */}
          <CardItem cardBody style={cardItem}>
            <Image
              style={imageStyle}
              source={{
                uri: item?.image,
              }}
            />
          </CardItem>
          <View style={infoBlock}>
            <View style={leftSide}>
              <Text>{item?.total_time}</Text>
              <View style={likesContainer}>
                <AntDesign name="hearto" size={15} />
                <Text>13</Text>
              </View>
            </View>
            {/* <View style={categories}>
              <Text>{item?.categories?.[0]}</Text>
            </View> */}
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
  //   }
};

export default CardWithRecipe;
