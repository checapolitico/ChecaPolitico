export default class RetrieveURL {

  static get(url, parameters) {
    let queryString = '';
    const headers = new Headers({
      'accept': 'application/json'
    });
    if (parameters) {
      let prepareParametersString = [];
      for (var parameter in parameters) {
        if (parameters.hasOwnProperty(parameter)) {
          prepareParametersString.push(encodeURIComponent(parameter) + "=" + encodeURIComponent(parameters[parameter]));
        }
      }
      queryString = prepareParametersString.join('&');
    }
    const uri = url + '?' + queryString;
    return fetch(uri)
            .then(response => {
              if(response.ok)
                return response.json();
              //TODO change when doing internationalization
              throw new Error('Error trying to retrieve: ' + uri);
            });
  }

  static post(url, data) {
    const jsonData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
              "Content-type": "application/json",
              "accept": "application/json"
            }),
          };
    return fetch(url, jsonData)
      .then(response => {
        if(response.ok)
          return response.json();
          //TODO change when doing internationalization
          throw new Error('Error trying to retrieve' + url);
      });
  }
}
