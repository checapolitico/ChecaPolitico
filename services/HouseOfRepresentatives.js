import RetrieveURL from '../utils/RetrieveURL';
import Globals from '../utils/Globals';
import Deputy from '../models/Deputy';
import deepMapKeys from "deep-map-keys";

const DEPUTY_INFORMATION_API_PATH = 'deputados/';

export default class HouseOfRepresentatives {

  static getDeputies (deputy) {
    return RetrieveURL.get(Globals.HOUSE_OF_REPRESENTATIVES_API_NEW + DEPUTY_INFORMATION_API_PATH, deputy)
            .then(response => {
              return HouseOfRepresentatives.convertResponse(response);
            });
  }
  static getDeputy (id) {
    return RetrieveURL.get(Globals.HOUSE_OF_REPRESENTATIVES_API_NEW + DEPUTY_INFORMATION_API_PATH + id)
            .then(response => {
              return HouseOfRepresentatives.convertResponse(response);
            });
  }

  static convertResponse (response) {
    return deepMapKeys(response, key => {
      return Deputy[key] ? Deputy[key] : key;
    });
  }

}
