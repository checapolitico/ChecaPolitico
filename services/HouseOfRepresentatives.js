import RetrieveURL from '../utils/RetrieveURL';
import Globals from '../utils/Globals';

const DEPUTY_INFORMATION_API_PATH = 'deputados';

export default class HouseOfRepresentatives {

  static getDeputy(deputy) {
    return RetrieveURL.get(Globals.HOUSE_OF_REPRESENTATIVES_API_NEW + DEPUTY_INFORMATION_API_PATH, deputy)
            .then(json => console.log(json));
  }

}
