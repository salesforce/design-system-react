import badge from './badge/example';
import notification from './notification/example';
import selectlist from './selectlist/example';
import combobox from './combobox/example';
import tree from './tree/example';
import wizard from './wizard/example';
import loader from './loader/example';
import checkbox from './checkbox/example';
import radio from './radio/example';
import search from './search/example';
import pillbox from './pillbox/example';

badge();
notification();

selectlist(document.getElementById('selectlist'));
combobox(document.getElementById('combobox'));
tree(document.getElementById('tree'));
wizard(document.getElementById('wizard'));
loader(document.getElementById('loader'));
checkbox(document.getElementById('slds-checkbox'));
radio(document.getElementById('slds-radio'));
search(document.getElementById('search'));
pillbox(document.getElementById('pillbox'));
