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
          const favoriteObject = {
              id: politician.id,
              photo: politician.photo.replace('maior.jpg',''),
              name: politician.name,
              party: politician.party,
              state: politician.state
          };
          favoritedPoliticians = [...favoritedPoliticians,favoriteObject];
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
        if(!favoritedPoliticians) return;
        return JSON.parse(favoritedPoliticians).some(politician => politician.id == politicianId);
      });
  }

  static getFavorites() {
    return AsyncStorage.getItem('favoritedPoliticians')
             .then(favoritedPoliticians => {
               return JSON.parse(favoritedPoliticians)
             });
  }

}
