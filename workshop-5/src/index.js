import './styles/main.scss';

import indexTemplate from './pages/index/index.hbs';
import articleTemplate from './components/article/article.hbs';
import spinnerTemplate from './components/spinner/spinner.hbs';

const urls = [
  'api/data1.json',
  'api/data2.json',
  'api/data3.json',
  'api/data4.json'
];

document.addEventListener("DOMContentLoaded", function() {
  const root = $('#root');
  root.append(indexTemplate());
  const content = $('.content');
  var promises = [];
  urls.forEach( x=> {
   promises.push(fetch(x)
        .then((response) => {
          return response.json()
              .catch(e=> {
                  console.error(e.message);
              })
        }))

  });

console.log(promises);

  Promise.all(promises).then (result => {
    result.forEach(item => {
      if (item !== undefined) {
          item.data.forEach((data) => {
              content.append(articleTemplate(data));
          })
      }
    })
  });




  /**
   * Place your code here
   */
});
