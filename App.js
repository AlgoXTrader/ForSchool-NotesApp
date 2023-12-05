import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const NOTLARIM = ({ navigation, route }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (route.params?.newNote) {
      setNotes([...notes, route.params.newNote]);
    }
  }, [route.params?.newNote]);

  const handleLongPress = (note) => {
    Alert.alert(
      'Notu Sil',
      'Bu notu silmek istiyor munusuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Sil', onPress: () => deleteNote(note) },
      ],
      { cancelable: false }
    );
  };

  const deleteNote = (note) => {
    const newNotes = notes.filter((n) => n !== note);
    setNotes(newNotes);
  };

  return (
    <ImageBackground
      source={require('./assets/messi.jpg')}
      style={styles.backgroundImage}
    >

      <View style={styles.container}>
        <Text style={styles.title}>Notlar</Text>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.noteItem}
              onPress={() => navigation.navigate('NOT', { note: item })}
              onLongPress={() => handleLongPress(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Not_Ekle')}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Not Ekle</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>

  );
};

const Not_Ekle = ({ navigation }) => {
  const [newNote, setNewNote] = useState('');

  return (
    <ImageBackground
    source={require('./assets/messi2.jpg')}
    style={styles.backgroundImage}
  >

      <View style={styles.container}>
        <Text style={styles.title}>Yeni Not Ekle</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNewNote(text)}
          value={newNote}
          placeholder="Notunuzu buraya giriniz"
          placeholderTextColor={'red'}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NOTLARIM', { newNote });
          }}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Tamam</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>

  );
};

const NOT = ({ route }) => {
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#f0ff'
  },
  noteItem: {
    borderWidth: 1,
    borderColor: '#f0ff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },

});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NOTLARIM">
        <Stack.Screen name="NOTLARIM" component={NOTLARIM} />
        <Stack.Screen name="Not_Ekle" component={Not_Ekle} />
        <Stack.Screen name="NOT" component={NOT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
