import {
  AsyncStorage
} from 'react-native'

export default class PoliticianUtils {

  static favorite(politician) {
    return AsyncStorage.getItem('favoritedPoliticians')
      .then(favoritedPoliticians => {
        if(!favoritedPoliticians) {
          favoritedPoliticians = [];
        }
        if (!politician.favorited) {
          favoritedPoliticians = [...favoritedPoliticians,politician.id];
        } else {
          favoritedPoliticians = favoritedPoliticians.filter(favoritedPolitician => {
            return favoritedPolitician.id  !== politician.id;
          });
        }
        AsyncStorage.setItem('favoritedPoliticians', JSON.stringify(favoritedPoliticians));
        return !politician.favorited;
      });
  }

  static isFavorited(politicianId) {
    return AsyncStorage.getItem('favoritedPoliticians')
      .then(favoritedPoliticians => {
        console.log(favoritedPoliticians);
        return favoritedPoliticians ?
                JSON.parse(favoritedPoliticians).indexOf(politicianId) > -1 : false;
      });
  }

}
