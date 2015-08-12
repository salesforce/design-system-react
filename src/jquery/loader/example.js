import Lib from '../../core/lib';
import Loader from './loader';

// TO-DO: This might not work with require, need to confirm that it does
const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

const exampleOptions = [
  { frame: 5 },
  { delay: 500 },
  { begin: 3, end: 6 }
];

$(function () {
  // Declarative
  $('.declarative .loader1').loader();
  $('.declarative .loader2').loader(exampleOptions[0]);
  $('.declarative .loader3').loader(exampleOptions[1]);
  $('.declarative .loader4').loader(exampleOptions[2]);

  // Imperative
  const loader1 = new Loader($('.imperative .loader1'));
  const loader2 = new Loader($('.imperative .loader2'), exampleOptions[0]);
  const loader3 = new Loader($('.imperative .loader3'), exampleOptions[1]);
  const loader4 = new Loader($('.imperative .loader4'), exampleOptions[2]);

  // Data Attrs
  const loaderDataAttrs = new Loader($('.loader-data-attrs'));

  void(loader1);
  void(loader2);
  void(loader3);
  void(loader4);
  void(loaderDataAttrs);
});
