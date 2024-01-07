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
            <Icon
              name="calendar-outline"
              size={14}
              color={'#rgba(0, 0, 0, 0.7)'}
            />
            <Text style={styles.info}>{item.date}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="map-outline" size={14} color={'#rgba(0, 0, 0, 0.7)'} />
            <Text style={styles.info}>{item.locationsKeyword}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon
              name="globe-outline"
              size={14}
              color={'#rgba(0, 0, 0, 0.7)'}
            />
            <Text style={styles.info}>
              {item.languages
                .map((code: any) => languageMap[code] || code)
                .join(', ')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.heartContainer}>
        <TouchableOpacity onPress={() => toggleLike(item.clubId)}>
          <Icon
            name={item.heart ? 'heart' : 'heart-outline'}
            size={25}
            color="#58C047"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  clubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: 10,
  },
  imageContainer: {
    width: 122,
    height: 97,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  heartContainer: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginLeft: 5,
  },
});
