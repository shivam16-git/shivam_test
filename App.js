import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Linking
} from 'react-native'

import { apiService } from './Services/ApiService';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      keyword: '',
      num:100,
      isLoading: false
    }
  }

  getList = async () => {
    let payload = {
      keyword: this.state.keyword,
      num: this.state.num
    }
    this.setState({
      isLoading: true
    })
    let response = await apiService.getList(payload);
    console.log('my res', response)
    if (response.results) {
      this.setState({
        isLoading: false,
        list: response.results,

      })
    } else {
      this.setState({ isLoading: false })
    }
  }
  openLink = async (url) => {
    await Linking.openURL(url);
  }

  render() {
    const { list, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <TextInput
            ref={ele => this.inputRef = ele}
            blurOnSubmit={false}
            placeholder={'Search Here'}
            placeholderTextColor='#A5A5A5'
            maxLength={30}
            autoCapitalize="none"
            onChangeText={(value) => this.setState({ keyword: value })}
            style={{ width: '70%', borderWidth: 0.5 ,paddingLeft:10}}
          />
          <Button onPress={() => this.getList()} title="search">Search</Button>
        </View>

        {isLoading ? <ActivityIndicator size="large" color={'blue'} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 200 }} /> : <FlatList
          data={list ? list : []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: '4%', borderWidth: 0.5, borderColor: 'grey', marginTop: 20,padding:10 }} onPress={() => this.openLink(item.link)}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ marginTop: 5 }}>{item.description}</Text>
              <Text style={{ marginTop: 5 }}>{item.g_review_stars}</Text>
              <Text>{item.link}</Text>
            </TouchableOpacity>
          } />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})
export default App;