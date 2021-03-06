import 'whatwg-fetch';
import 'mdn-polyfills/CustomEvent';

const mehrsprachig = ({
  selector = '[data-mehrsprachig]',
  trigger = '[data-mehrsprachig-trigger]',
  standard = 'en',
  sources = {}
} = {}) => {
  const locales = {};
  const toTranslate = document.querySelectorAll(selector);
  const toListen = document.querySelectorAll(trigger);

  const localize = (langKey, value) => {
    let localized = locales[langKey];

    const array = value.split('.');
    array.forEach(item => {
      localized = localized[item];
    });

    return localized;
  };

  const translate = langKey => {
    const event = new CustomEvent('mehrsprachigTranslated', {
      detail: langKey,
      bubbles: true
    });

    toTranslate.forEach(node => {
      const values = node.dataset.mehrsprachig.replace(/ /g, '').split(',');

      values.forEach(value => {
        if (value.includes('=')) {
          const split = value.split('=');
          node[split[0]] = localize(langKey, split[1]);
          return;
        }

        if (value.includes('html:')) {
          node.innerHTML = localize(langKey, value.replace('html:', ''));
          return;
        }

        node.textContent = localize(langKey, value);
      });
    });

    localStorage.setItem('mehrsprachig', langKey);
    document.dispatchEvent(event);
  };

  const changeLang = async langKey => {
    if (!locales[langKey]) {
      const response = await fetch(sources[langKey]);
      const data = await response.json();
      locales[langKey] = data;
    }
    translate(langKey);
  };

  const listener = event => {
    event.preventDefault();
    changeLang(event.target.dataset.mehrsprachigTrigger);
  };

  toListen.forEach(node => {
    node.addEventListener('click', listener);
  });

  if (localStorage.getItem('mehrsprachig')) {
    changeLang(localStorage.getItem('mehrsprachig'));
  } else {
    changeLang(standard);
  }
};

export default mehrsprachig;
