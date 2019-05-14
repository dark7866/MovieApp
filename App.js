
import React, {Component} from 'react';
import {
AppRegistry,
Platform,
StatusBar,        // Required to hide StatusBar
ListView,         // Renders a list
RefreshControl,   // Refreshes the list on pulldown
ImageBackground,            // Renders background image
ScrollView,       // Scrollable Container
StyleSheet,       // Needed for styles
Text,             // Renders Text
TouchableOpacity, // Handles presses
View,             // Container component
TextInput,
ReactYouTube,        // Handles Text Input
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Dimensions from 'Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchBar from 'react-native-material-design-searchbar';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import YouTube from 'react-native-youtube';
import movieData from './movieData.json';


const screen = Dimensions.get('window');

class FirstPage extends Component {

  // Extract movie and onPress props passed from List component
  render({ movie, onPress } = this.props) {
    // Extract values from movie object
    const { title, rating, image } = movie;
    return (
      <TouchableOpacity
        // passing row styles for first page
        style={styles.row}
        // Call onPress function passed from List component when pressed
        onPress={onPress}
        // Dim row a little bit when pressed
        activeOpacity={0.7}
      >
        {/* Background image */}
        <ImageBackground source={{uri: image}} style={styles.imageBackground}>
          {/* Title */}
          <Text style={[styles.text, styles.title]}>{title.toUpperCase()}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

}

class List extends Component {

  /*
    Store the data for ListView
   */
  state = {
    // ListView DataSource object
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    isRefreshing: false,
    text: ""
  }

  /*
   Call _fetchData after component has been mounted
   */
  componentDidMount() {
    // Fetch Data
    this._fetchData();
  }

  /*
   *Prepare movie data for ListView component
   */
  _fetchData = () => {
    // Data is being refreshed
    this.setState({ isRefreshing: true });
    this.setState({
      // Fill up DataSource with movie data
      dataSource: this.state.dataSource.cloneWithRows(movieData),
      isRefreshing: false,
    });
  }

  /*
   Render a row
   */
  _renderRow = (movie) => {
    return (
      <FirstPage
        movie={movie}
        // Pass a function to handle presses
        onPress={()=>{
          // Navigate to a separate movie detail screen
          this.props.navigator.push({
            name: 'movie',
            movie: movie,
          });
        }}
      />
    );
  }
/* Filter searches */
  filterSearch(text){
        const newData = movieData.filter(function(item){
            const itemData = item.title.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
  }

  render() {
    return (

      <View>

   {/* Search bar on first page */}
   <SearchBar
    height={40} //set height
    padding={1}
    onSearchChange={(text) => this.filterSearch(text)} // call filterSearch
    value={this.state.text}

    />
    {/* Render all the movies on first page */}
      <ListView
       enableEmptySections={true}
        // Data source from state
        dataSource={this.state.dataSource}
        // Row renderer method
        renderRow={this._renderRow}
        // Refresh the list on pull down
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._fetchData}
          />
        }

      />
      </View>
    );
  }
}

//Second Page
class Movie extends Component {

  state = {
    height: 215
  };

  handleReady = () => {
        setTimeout(() => this.setState({ height: 216 }), 500);
    }
  // Extract movie object passed as a prop from FirstPage component
  render({ movie } = this.props) {
    // Extract values from movie object
    const { title, rating, large, plot, Vid, Director, Year, Budget, cast1, cast1img, cast2, cast2img, cast3, cast3img, cast4, cast4img, cast5, cast5img, cast1as, cast2as, cast3as, cast4as, cast5as } = movie;
    return (

       <View style={styles.moviecontainer}>
         {/*Image*/}
          <ImageBackground source={{uri: large}} style={styles.movieimageBackground}>

            {/* Title */}
            <Text style={[styles.movietext, styles.movietitle]}>{title.toUpperCase()}</Text>

             <View style={styles.movierating}>
              {/* Icon */}
              <ImageBackground
                source={{uri: 'https://staticv2.rottentomatoes.com/static/images/icons/cf-lg.png'}}
                style={styles.movieicon}
              />
              {/* Value */}
              <Text style={[styles.movietext, styles.movievalue]}>{rating}%</Text>
            </View>

  </ImageBackground>

     {/* Tabs on second page */}
        <ScrollableTabView
      style={{backgroundColor: 'black' }}
      initialPage={2}
      renderTabBar={() =><ScrollableTabBar backgroundColor='#191919' />}
      initialPage = {0}
      Page = {0}
      tabBarActiveTextColor= 'white'
      tabBarInactiveTextColor= 'white'

    >

     {/* INFO Tab */}
     <View tabLabel='INFO' >


      <ScrollView>
      <Text>
      <Text style={[styles.movietext]}>{"\n"}{'Overview'}{"\n\n"}</Text>
      <Text style={styles.movieplotText}>{plot}{"\n\n"}</Text>
      <Text style={[styles.movietext]}>{'Release Date'}</Text>
      <Text style={styles.movieplotText}>{"                                                             "}{Year}{"\n\n"}</Text>
      <Text style={[styles.movietext]}>{'Directed By'}</Text>
      <Text style={styles.movieplotText}>{"                                     "}{Director}{"\n\n"}</Text>
      <Text style={[styles.movietext]}>{'Budget'}</Text>
      <Text style={styles.movieplotText}>{"                                                         "}{Budget}{"\n"}</Text>
      </Text>

      </ScrollView>
      </View>
      {/* Cast members TAB */}
      <View tabLabel='CAST'>
        <ScrollView>

        <View style={{flexDirection:'row'}}>
       {/* cast 1 */}
        <ImageBackground source={{uri: cast1img}} style={styles.image} />

        <View style={{flex:1}}>
        <Text style={styles.movietext}>{"        "}</Text>
        <Text style={styles.movietext}>{"   "}{cast1}</Text>
        <Text style={styles.movieplotText}>{"   "}{cast1as}</Text>
        </View>
        </View>
        {/* cast 2 */}
        <View style={{flexDirection:'row'}}>
        <ImageBackground source={{uri: cast2img}} style={styles.image} />

        <View style={{flex:1}}>
        <Text style={styles.movietext}>{"        "}</Text>
        <Text style={styles.movietext}>{"   "}{cast2}</Text>
        <Text style={styles.movieplotText}>{"   "}{cast2as}</Text>
        </View>
        </View>
        {/* cast 3 */}
        <View style={{flexDirection:'row'}}>
        <ImageBackground source={{uri: cast3img}} style={styles.image} />

        <View style={{flex:1}}>
        <Text style={styles.movietext}>{"        "}</Text>
        <Text style={styles.movietext}>{"   "}{cast3}</Text>
        <Text style={styles.movieplotText}>{"   "}{cast3as}</Text>
        </View>
        </View>
        {/* cast 4 */}
        <View style={{flexDirection:'row'}}>
        <ImageBackground source={{uri: cast4img}} style={styles.image} />

        <View style={{flex:1}}>
        <Text style={styles.movietext}>{"        "}</Text>
        <Text style={styles.movietext}>{"   "}{cast4}</Text>
        <Text style={styles.movieplotText}>{"   "}{cast4as}</Text>
        </View>
        </View>
        {/* cast 5 */}
        <View style={{flexDirection:'row'}}>
        <ImageBackground source={{uri: cast5img}} style={styles.image} />

        <View style={{flex:1}}>
        <Text style={styles.movietext}>{"        "}</Text>
        <Text style={styles.movietext}>{"   "}{cast5}</Text>
        <Text style={styles.movieplotText}>{"   "}{cast5as}</Text>
        </View>
        </View>

        </ScrollView>
        </View>
        {/* Trailer Tab */}
      <View tabLabel='TRAILER'>
        <YouTube
          
                  apiKey="YOUR API KEY"
                  ref      = {item => this.player = item}
                  videoId={Vid}
                  controls={1}
                  onReady  = {this.handleReady}
                  style    = {{ alignSelf: 'stretch', height: this.state.height }}
                />

      </View>
    </ScrollableTabView>

         {/* CLOSE button */}
         <View style={styles.moviebuttonContainer}>
            <TouchableOpacity
              // Go to the previous screen
              onPress={() => {this.props.navigator.pop();}}
              // Dim button a little bit when pressed
              activeOpacity={0.7}
              // Pass button style
              style={styles.moviebutton}
            >
              <Text style={styles.moviebuttonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
      </View>


    );
  }
}

const RouteMapper = (route, navigationOperations, onComponentRef) => {
  if (route.name === 'list') {
    return (
      <List navigator={navigationOperations} />
    );
  } else if (route.name === 'movie') {
    return (
      <Movie
        // Pass movie object passed with route down as a prop
        movie={route.movie}
        // Pass navigationOperations as navigator prop
        navigator={navigationOperations}
      />
    );
  }
};

{/* Main App function */}
export default class App extends Component {
  componentDidMount() {
    // Hide the status bar
    StatusBar.setHidden(true);
}


  render() {
    return (
      // Handle navigation between screens
      <NavigationExperimental.Navigator
        // Default to list route
        initialRoute={{name: 'list'}}
        // Use FloatFromBottom transition between screens
        configureScene={(route, routeStack) => NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom}
        // Pass a route mapper functions
        renderScene={RouteMapper}
      />
    );
  }
}
// Styles for everything
const styles = StyleSheet.create({
  // Row
  row: {
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: 'black',
  },
  // Background image
  imageBackground: {
    height: screen.height / 3,          // Divide screen height by 3
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
  },
  // Shared text style
  text: {
    color: '#fff',                      // White text color
    backgroundColor: 'transparent',     // No background
    fontFamily: 'Avenir',               // Change default font
    fontWeight: 'bold',                 // Bold font
    // Add text shadow
    textShadowColor: '#222',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  // Movie title
  title: {
    fontSize: 22,                       // Bigger font size
  },
   moviecontainer: {
    flex: 1,                            // Take up all screen space
    backgroundColor: '#333',            // Dark background
  },
  // Background image for second page
  movieimageBackground: {
    flex: 1,                            // Take up all screen space
    padding: 20                         // Add padding for content inside
  },
  // movie
  movietext: {
    backgroundColor: 'transparent',     // No background
    fontSize: 16,
    color: '#fff',                      // White text color
    fontFamily: 'Avenir',               // Change default font
    fontWeight: 'bold',                 // Bold font
    // Add text shadow
    textShadowColor: '#222',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  // Movie title in second page
  movietitle: {
    fontSize: 30,                       // Bigger font size
    marginTop: 30,                      // Add space between top screen edge
    marginBottom: 5,                    // Add space at the bottom
    textAlign: 'center',                // Center horizontally
  },
  // Rating row
  movierating: {
    flexDirection: 'row',               // Arrange icon and rating in one line
    justifyContent: 'center',           // Center horizontally
  },
  // Certified fresh icon
  movieicon: {
    width: 22,                          // Set width
    height: 22,                         // Set height
    marginRight: 5,                     // Add some margin between icon and rating
  },
   // Rating value
  movievalue: {
    fontSize: 16,                       // Smaller font size
  },
  // movie plot text
  movieplotText: {
    color: '#cccccc',                   // Dark text color
    fontFamily: 'Avenir',               // Change default font
    fontSize: 15,                       // Small font size
  },
  moviebuttonContainer: {
     backgroundColor: '#191919',        // Background colour
     marginTop: 1,                      // Add some margin at the top
  },
  //close button
  moviebutton: {
    padding: 15                         // Padding inside
  },
  //close button text
  moviebuttonText: {
    color: '#fff',                      // White button text
    fontFamily: 'Avenir',               // Change default font
    fontWeight: 'bold',                 // Bold font
    textAlign: 'center',                // Center horizontally
  },
  //Youtube player
  player: {
    height: 300,                        // Height of YouTube video screen
    backgroundColor: 'black',           // Backgroudn colour
    marginVertical: 10,
  },
  //Cast images
  image: {
    height: 85,
    borderRadius: 45,
    overflow: 'hidden',
    width: 85
  }
});
