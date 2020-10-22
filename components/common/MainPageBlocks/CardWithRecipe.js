import React from 'react';
import {Card, CardItem, Text, View} from 'native-base';
import {Image} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {translations} from '../../../translations/translations';

const CardWithRecipe = ({item, navigation, setDataForCurrentDish}) => {
  const {
    itemContainer,
    infoBlock,
    imageStyle,
    card,
    container,
    overlay,
    cardItem,
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
          <Grid>
            <Row style={itemContainer}>
              <Col style={infoBlock} size={2 / 3}>
                <Text>{item?.name}</Text>
                <Text>
                  {category}: {item?.categories?.join(', ')}
                </Text>
                <Text>
                  {item.total_time && `${timeForCooking}: ${item.total_time}`}
                </Text>
              </Col>
              <Col size={1 / 3}>
                <CardItem cardBody style={cardItem}>
                  <View style={overlay} />
                  <Image
                    style={imageStyle}
                    source={{
                      uri: item?.image,
                    }}
                  />
                </CardItem>
              </Col>
            </Row>
          </Grid>
        </Card>
      </TouchableOpacity>
    </View>
  );
  //   }
};

export default CardWithRecipe;
