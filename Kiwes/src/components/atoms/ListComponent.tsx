import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {languageMap} from '../../utils/languageMap';
import {apiServer} from '../../utils/metaData';
import Icon from 'react-native-vector-icons/Ionicons';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';

export default function ListComponent({
  item,
  navigateToClub,
  posts,
  setPosts,
}: any) {
  console.log('-----------item-------------');
  console.log(item);
  const toggleLike = async (id: String) => {
    const post = posts.find((post: any) => post.clubId === id);
    if (!post) {
      return;
    }

    // Update state
    const updatedPosts = posts.map((post: any) =>
      post.clubId === id
        ? {...post, isHeart: post.isHeart === 'YES' ? 'NO' : 'YES'}
        : post,
    );
    setPosts(updatedPosts);
    try {
      const updatedPost = updatedPosts.find((post: any) => post.clubId === id);
      const apiUrl = `${apiServer}/api/v1/heart/${id}`;
      await new RESTAPIBuilder(
        apiUrl,
        updatedPost.isHeart === 'YES' ? 'PUT' : 'DELETE',
      )
        .setNeedToken(true)
        .build()
        .run();
    } catch (err) {
      console.error(err);
      // If API call fails, revert state
      setPosts(
        posts.map((post: any) =>
          post.clubId === id ? {...post, heart: post.isHeart} : post,
        ),
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.clubContainer}
      onPress={() => {
        navigateToClub(item.clubId);
      }}>
      <Image
        source={{uri: item.thumbnailImage || item.clubThumbnailImg}}
        style={styles.imageContainer}
      />

      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <Icon name="calendar-outline" />
            <Text style={styles.info}>{item.date}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="map-outline" />
            <Text style={styles.info}>{item.locationsKeyword}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="globe-outline" />
            <Text style={styles.info}>
              {item.languages
                .map((code: any) => languageMap[code] || code)
                .join(', ')}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.heartContainer}
        onPress={() => toggleLike(item.clubId)}>
        <Icon
          name={item.heart ? 'heart' : 'heart-outline'}
          size={25}
          color="#58C047"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  clubContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    width: 122,
    height: 97,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  heartContainer: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info: {
    marginLeft: 5,
  },
});
