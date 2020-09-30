import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {Context} from '../../../Context/Context';
import {recipiesApi} from '../../../services/API';
import {ActivityIndicator} from 'react-native';
import {Card, Divider, Image} from 'react-native-elements';
import {Text} from 'react-native-elements';
import {styles} from './style';

export default function Description({navigation}) {
  const {
    currentDish: {id},
  } = useContext(Context);

  const [state, setState] = useState({});
  //Request for getting data
  const getDetails = async () => {
    const res = await recipiesApi.getRecipe(id);
    setState(res.data);
  };
  // List of ingridients
  const ingridiensList = (item) => {
    return (
      <View style={ingridientsContainer} key={Math.random().toString()}>
        <Text>{item.name}</Text>
        <Text>{item.amount}</Text>
      </View>
    );
  };
  // List of instructions
  const instructionsList = (item) => {
    return (
      <View key={Math.random().toString()}>
        <Text>{item.text}</Text>
        <Card.Image source={{uri: item.image}} style={instructionImage} />
      </View>
    );
  };

  // List of nutritions
  const nutritionsList = (item) => {
    return (
      <View style={nutritionsContainer} key={Math.random().toString()}>
        <Text>{item.portion_amount}:</Text>
        <Text>
          {item.energy_value}, Б-{item.proteins} Ж-{item.fats} У-
          {item.carbohydrates}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getDetails();
  }, []);

  const {
    container,
    title,
    context,
    imageStyle,
    ingridientsContainer,
    instructionImage,
    nutritionsContainer,
  } = styles;
  console.log(state);

  return (
    <ScrollView style={container}>
      <Image
        source={{uri: state.image}}
        style={imageStyle}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={context}>
        <Text h4 style={title}>
          {state.name}
        </Text>
        <Text>{state.description}</Text>
        <Divider />
        <Text style={title}>Ингредиенты:</Text>
        {state.ingridients &&
          state.ingridients.map((i, id) => ingridiensList(i))}
        <Divider />
        <View>
          <Text>Сумарное время приготовления - {state.total_time}</Text>
          <Text>
            Количество порций согластно рецепту - {state.portions_by_recipe}
          </Text>
        </View>
        <Divider />
        <View>
          <Text>Пищевая ценность:</Text>
          {state.nutritional_values &&
            state.nutritional_values.map((i) => nutritionsList(i))}
        </View>
        <Divider />
        <View>
          <Text>Инструкция по приготовлению:</Text>
          {state.instructions &&
            state.instructions.map((i, id) => instructionsList(i))}
        </View>
      </View>
    </ScrollView>
  );
}
