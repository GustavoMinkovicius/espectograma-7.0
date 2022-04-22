import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

export default class Feed extends Component() {

    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          light_theme: true,
          stories:[]
        };
      }
      
    componentDidMount() {
        this.fetchUser();
      }

    async fetchUser() {
        let theme, name, image;
        await firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function (snapshot) {
            theme = snapshot.val().current_theme;
            name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
            image = snapshot.val().profile_picture;
          });
        this.setState({
          light_theme: theme === "light" ? true : false,
          isEnabled: theme === "light" ? false : true,
          name: name,
          profile_image: image
        });
      }
      
    renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation} />;
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Feed</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
