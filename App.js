import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StatusBar,SafeAreaView} from 'react-native';
/*

Please develop a React Native page app that uses a JSON API to retrieve and present data about states and details about their population. Please make use of Redux or the like to demonstrate global state management (even though it may not really be needed in terms of this application scope).

The application should contain:

1) a scrollable list of state names.
     a. When a state in the list is single clicked, a second screen area should show:
         i. the state name
         ii. the overall population of the state
         iii. the number of counties in that stat
         iv. the list of counties in that state along with their population
         v. the sum of the county populations
         vi. an indication of whether the sum of the county populations equals that in the state “record”.
     b. When a state in the list is double-clicked, that state should be highlighted (or un-highlighted) in the list

2) A second scrollable list of the state names that is basically a duplicate of the first list and also shows the highlighted status of states, and can also be used to single or double click.

3) A “filter” box that is used to filter items in the second list (only) based on the letters entered in the filter box. So, if I enter “ne”, I will only see states in the second list that have “ne” anywhere in the state name (e.g. Maine, Nevada, etc.). The filter should be case-insensitive. When the filter box is empty, all states should be shown. The filter should be applied in “real-time” as the user is typing.

All in all, there are 4 areas on the screen:
2 scrolling lists for the states [keep the physical length of the areas small so that it does scroll]
1 search box (second list only)
1 scrollable state detail area

The data for populating the state list should be dynamically loaded and come from:

http://pos.idtretailsolutions.com/countytest/states

The details of the state should come from the “detail” link in the state object.

The layout should look something like this:

                             
                                                     [ search box ]
--------------------------    -------------------     ---------------
|                         |  |                   |   |              |
|                         |  |                   |   |              |
|                         |  |                   |   |              |
|                         |  |                   |   |              |
|                         |  |                   |   |              |
|                         |  |                   |   |              |
|                         |  |                   |   |              |
|                         |  |                   |   |              |
--------------------------   --------------------   ----------------


Your solution should be developed as shippable and maintainable code on Android.  Please ask questions if something is not clear as we do not want you to spend a lot of time on this (nor should you need to). Also, if you run into trouble, just stop and ask.

*/
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => (
    <Item title={item.state} />
  );

  const getStates = async () => {
     try {
      const response = await fetch('http://pos.idtretailsolutions.com/countytest/states');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStates();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.columnContainer}>
    <View style={{ flex: 1, padding: 22 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
w        />
      )}
    </View>
    <View style={{ flex: 1, padding: 22 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
w        />
      )}
    </View>
    <View style={{ flex: 1, padding: 10 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
w        />
      )}
    </View>
    </View>
    </SafeAreaView>
  );
  
};
const styles = {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  columnContainer: {
    flexDirection: 'row',
    flex: 1,  
  },
 
}
export default App