// TODO: Having a base path hardcoded here is obviously just a temp solution
const iconBasePath = '/examples/assets/icons/';

const icons = {
	'utility': {
		'add': iconBasePath + 'utility-sprite/svg/symbols.svg#add',
		'adduser': iconBasePath + 'utility-sprite/svg/symbols.svg#adduser',
		'announcement': iconBasePath + 'utility-sprite/svg/symbols.svg#announcement',
		'apps': iconBasePath + 'utility-sprite/svg/symbols.svg#apps',
		'arrowdown': iconBasePath + 'utility-sprite/svg/symbols.svg#arrowdown',
		'arrowup': iconBasePath + 'utility-sprite/svg/symbols.svg#arrowup',
		'attach': iconBasePath + 'utility-sprite/svg/symbols.svg#attach',
		'back': iconBasePath + 'utility-sprite/svg/symbols.svg#back',
		'ban': iconBasePath + 'utility-sprite/svg/symbols.svg#ban',
		'bold': iconBasePath + 'utility-sprite/svg/symbols.svg#bold',
		'bookmark': iconBasePath + 'utility-sprite/svg/symbols.svg#bookmark',
		'brush': iconBasePath + 'utility-sprite/svg/symbols.svg#brush',
		'bucket': iconBasePath + 'utility-sprite/svg/symbols.svg#bucket',
		'builder': iconBasePath + 'utility-sprite/svg/symbols.svg#builder',
		'call': iconBasePath + 'utility-sprite/svg/symbols.svg#call',
		'capslock': iconBasePath + 'utility-sprite/svg/symbols.svg#capslock',
		'cases': iconBasePath + 'utility-sprite/svg/symbols.svg#cases',
		'center_align_text': iconBasePath + 'utility-sprite/svg/symbols.svg#center_align_text',
		'chart': iconBasePath + 'utility-sprite/svg/symbols.svg#chart',
		'chat': iconBasePath + 'utility-sprite/svg/symbols.svg#chat',
		'check': iconBasePath + 'utility-sprite/svg/symbols.svg#check',
		'checkin': iconBasePath + 'utility-sprite/svg/symbols.svg#checkin',
		'chevrondown': iconBasePath + 'utility-sprite/svg/symbols.svg#chevrondown',
		'chevronleft': iconBasePath + 'utility-sprite/svg/symbols.svg#chevronleft',
		'chevronright': iconBasePath + 'utility-sprite/svg/symbols.svg#chevronright',
		'chevronup': iconBasePath + 'utility-sprite/svg/symbols.svg#chevronup',
		'clear': iconBasePath + 'utility-sprite/svg/symbols.svg#clear',
		'clock': iconBasePath + 'utility-sprite/svg/symbols.svg#clock',
		'close': iconBasePath + 'utility-sprite/svg/symbols.svg#close',
		'comments': iconBasePath + 'utility-sprite/svg/symbols.svg#comments',
		'company': iconBasePath + 'utility-sprite/svg/symbols.svg#company',
		'connected_apps': iconBasePath + 'utility-sprite/svg/symbols.svg#connected_apps',
		'contract_alt': iconBasePath + 'utility-sprite/svg/symbols.svg#contract_alt',
		'contract': iconBasePath + 'utility-sprite/svg/symbols.svg#contract',
		'copy': iconBasePath + 'utility-sprite/svg/symbols.svg#copy',
		'crossfilter': iconBasePath + 'utility-sprite/svg/symbols.svg#crossfilter',
		'custom_apps': iconBasePath + 'utility-sprite/svg/symbols.svg#custom_apps',
		'cut': iconBasePath + 'utility-sprite/svg/symbols.svg#cut',
		'dash': iconBasePath + 'utility-sprite/svg/symbols.svg#dash',
		'dayview': iconBasePath + 'utility-sprite/svg/symbols.svg#dayview',
		'delete': iconBasePath + 'utility-sprite/svg/symbols.svg#delete',
		'deprecate': iconBasePath + 'utility-sprite/svg/symbols.svg#deprecate',
		'desktop': iconBasePath + 'utility-sprite/svg/symbols.svg#desktop',
		'down': iconBasePath + 'utility-sprite/svg/symbols.svg#down',
		'download': iconBasePath + 'utility-sprite/svg/symbols.svg#download',
		'edit': iconBasePath + 'utility-sprite/svg/symbols.svg#edit',
		'email': iconBasePath + 'utility-sprite/svg/symbols.svg#email',
		'end_call': iconBasePath + 'utility-sprite/svg/symbols.svg#end_call',
		'erect_window': iconBasePath + 'utility-sprite/svg/symbols.svg#erect_window',
		'error': iconBasePath + 'utility-sprite/svg/symbols.svg#error',
		'event': iconBasePath + 'utility-sprite/svg/symbols.svg#event',
		'expand_alt': iconBasePath + 'utility-sprite/svg/symbols.svg#expand_alt',
		'expand': iconBasePath + 'utility-sprite/svg/symbols.svg#expand',
		'favorite': iconBasePath + 'utility-sprite/svg/symbols.svg#favorite',
		'filter': iconBasePath + 'utility-sprite/svg/symbols.svg#filter',
		'filterList': iconBasePath + 'utility-sprite/svg/symbols.svg#filterList',
		'forward': iconBasePath + 'utility-sprite/svg/symbols.svg#forward',
		'frozen': iconBasePath + 'utility-sprite/svg/symbols.svg#frozen',
		'groups': iconBasePath + 'utility-sprite/svg/symbols.svg#groups',
		'help': iconBasePath + 'utility-sprite/svg/symbols.svg#help',
		'home': iconBasePath + 'utility-sprite/svg/symbols.svg#home',
		'identity': iconBasePath + 'utility-sprite/svg/symbols.svg#identity',
		'image': iconBasePath + 'utility-sprite/svg/symbols.svg#image',
		'inbox': iconBasePath + 'utility-sprite/svg/symbols.svg#inbox',
		'info': iconBasePath + 'utility-sprite/svg/symbols.svg#info',
		'insert_tag_field': iconBasePath + 'utility-sprite/svg/symbols.svg#insert_tag_field',
		'insert_template': iconBasePath + 'utility-sprite/svg/symbols.svg#insert_template',
		'italic': iconBasePath + 'utility-sprite/svg/symbols.svg#italic',
		'justify_text': iconBasePath + 'utility-sprite/svg/symbols.svg#justify_text',
		'kanban': iconBasePath + 'utility-sprite/svg/symbols.svg#kanban',
		'knowledge_base': iconBasePath + 'utility-sprite/svg/symbols.svg#knowledge_base',
		'layout': iconBasePath + 'utility-sprite/svg/symbols.svg#layout',
		'left_align_text': iconBasePath + 'utility-sprite/svg/symbols.svg#left_align_text',
		'left': iconBasePath + 'utility-sprite/svg/symbols.svg#left',
		'like': iconBasePath + 'utility-sprite/svg/symbols.svg#like',
		'link': iconBasePath + 'utility-sprite/svg/symbols.svg#link',
		'list': iconBasePath + 'utility-sprite/svg/symbols.svg#list',
		'location': iconBasePath + 'utility-sprite/svg/symbols.svg#location',
		'lock': iconBasePath + 'utility-sprite/svg/symbols.svg#lock',
		'logout': iconBasePath + 'utility-sprite/svg/symbols.svg#logout',
		'magicwand': iconBasePath + 'utility-sprite/svg/symbols.svg#magicwand',
		'matrix': iconBasePath + 'utility-sprite/svg/symbols.svg#matrix',
		'minimize_window': iconBasePath + 'utility-sprite/svg/symbols.svg#minimize_window',
		'monthlyview': iconBasePath + 'utility-sprite/svg/symbols.svg#monthlyview',
		'move': iconBasePath + 'utility-sprite/svg/symbols.svg#move',
		'muted': iconBasePath + 'utility-sprite/svg/symbols.svg#muted',
		'new_window': iconBasePath + 'utility-sprite/svg/symbols.svg#new_window',
		'new': iconBasePath + 'utility-sprite/svg/symbols.svg#new',
		'news': iconBasePath + 'utility-sprite/svg/symbols.svg#news',
		'notebook': iconBasePath + 'utility-sprite/svg/symbols.svg#notebook',
		'notification': iconBasePath + 'utility-sprite/svg/symbols.svg#notification',
		'office365': iconBasePath + 'utility-sprite/svg/symbols.svg#office365',
		'offline': iconBasePath + 'utility-sprite/svg/symbols.svg#offline',
		'open_folder': iconBasePath + 'utility-sprite/svg/symbols.svg#open_folder',
		'open': iconBasePath + 'utility-sprite/svg/symbols.svg#open',
		'opened_folder': iconBasePath + 'utility-sprite/svg/symbols.svg#opened_folder',
		'package_org_beta': iconBasePath + 'utility-sprite/svg/symbols.svg#package_org_beta',
		'package_org': iconBasePath + 'utility-sprite/svg/symbols.svg#package_org',
		'package': iconBasePath + 'utility-sprite/svg/symbols.svg#package',
		'page': iconBasePath + 'utility-sprite/svg/symbols.svg#page',
		'palette': iconBasePath + 'utility-sprite/svg/symbols.svg#palette',
		'paste': iconBasePath + 'utility-sprite/svg/symbols.svg#paste',
		'people': iconBasePath + 'utility-sprite/svg/symbols.svg#people',
		'phone_landscape': iconBasePath + 'utility-sprite/svg/symbols.svg#phone_landscape',
		'phone_portrait': iconBasePath + 'utility-sprite/svg/symbols.svg#phone_portrait',
		'photo': iconBasePath + 'utility-sprite/svg/symbols.svg#photo',
		'power': iconBasePath + 'utility-sprite/svg/symbols.svg#power',
		'preview': iconBasePath + 'utility-sprite/svg/symbols.svg#preview',
		'priority': iconBasePath + 'utility-sprite/svg/symbols.svg#priority',
		'process': iconBasePath + 'utility-sprite/svg/symbols.svg#process',
		'push': iconBasePath + 'utility-sprite/svg/symbols.svg#push',
		'puzzle': iconBasePath + 'utility-sprite/svg/symbols.svg#puzzle',
		'question': iconBasePath + 'utility-sprite/svg/symbols.svg#question',
		'questions_and_answers': iconBasePath + 'utility-sprite/svg/symbols.svg#questions_and_answers',
		'record': iconBasePath + 'utility-sprite/svg/symbols.svg#record',
		'redo': iconBasePath + 'utility-sprite/svg/symbols.svg#redo',
		'refresh': iconBasePath + 'utility-sprite/svg/symbols.svg#refresh',
		'relate': iconBasePath + 'utility-sprite/svg/symbols.svg#relate',
		'remove_formatting': iconBasePath + 'utility-sprite/svg/symbols.svg#remove_formatting',
		'remove_link': iconBasePath + 'utility-sprite/svg/symbols.svg#remove_link',
		'replace': iconBasePath + 'utility-sprite/svg/symbols.svg#replace',
		'reply': iconBasePath + 'utility-sprite/svg/symbols.svg#reply',
		'reset_password': iconBasePath + 'utility-sprite/svg/symbols.svg#reset_password',
		'retweet': iconBasePath + 'utility-sprite/svg/symbols.svg#retweet',
		'richtextbulletedlist': iconBasePath + 'utility-sprite/svg/symbols.svg#richtextbulletedlist',
		'richtextindent': iconBasePath + 'utility-sprite/svg/symbols.svg#richtextindent',
		'richtextnumberedlist': iconBasePath + 'utility-sprite/svg/symbols.svg#richtextnumberedlist',
		'richtextoutdent': iconBasePath + 'utility-sprite/svg/symbols.svg#richtextoutdent',
		'right_align_text': iconBasePath + 'utility-sprite/svg/symbols.svg#right_align_text',
		'right': iconBasePath + 'utility-sprite/svg/symbols.svg#right',
		'rotate': iconBasePath + 'utility-sprite/svg/symbols.svg#rotate',
		'rows': iconBasePath + 'utility-sprite/svg/symbols.svg#rows',
		'salesforce1': iconBasePath + 'utility-sprite/svg/symbols.svg#salesforce1',
		'search': iconBasePath + 'utility-sprite/svg/symbols.svg#search',
		'settings': iconBasePath + 'utility-sprite/svg/symbols.svg#settings',
		'setup_assistant_guide': iconBasePath + 'utility-sprite/svg/symbols.svg#setup_assistant_guide',
		'setup': iconBasePath + 'utility-sprite/svg/symbols.svg#setup',
		'share': iconBasePath + 'utility-sprite/svg/symbols.svg#share',
		'shield': iconBasePath + 'utility-sprite/svg/symbols.svg#shield',
		'side_list': iconBasePath + 'utility-sprite/svg/symbols.svg#side_list',
		'signpost': iconBasePath + 'utility-sprite/svg/symbols.svg#signpost',
		'sms': iconBasePath + 'utility-sprite/svg/symbols.svg#sms',
		'snippet': iconBasePath + 'utility-sprite/svg/symbols.svg#snippet',
		'socialshare': iconBasePath + 'utility-sprite/svg/symbols.svg#socialshare',
		'sort': iconBasePath + 'utility-sprite/svg/symbols.svg#sort',
		'spinner': iconBasePath + 'utility-sprite/svg/symbols.svg#spinner',
		'standard_objects': iconBasePath + 'utility-sprite/svg/symbols.svg#standard_objects',
		'stop': iconBasePath + 'utility-sprite/svg/symbols.svg#stop',
		'strikethrough': iconBasePath + 'utility-sprite/svg/symbols.svg#strikethrough',
		'success': iconBasePath + 'utility-sprite/svg/symbols.svg#success',
		'summary': iconBasePath + 'utility-sprite/svg/symbols.svg#summary',
		'summarydetail': iconBasePath + 'utility-sprite/svg/symbols.svg#summarydetail',
		'switch': iconBasePath + 'utility-sprite/svg/symbols.svg#switch',
		'table': iconBasePath + 'utility-sprite/svg/symbols.svg#table',
		'tablet_landscape': iconBasePath + 'utility-sprite/svg/symbols.svg#tablet_landscape',
		'tablet_portrait': iconBasePath + 'utility-sprite/svg/symbols.svg#tablet_portrait',
		'text_background_color': iconBasePath + 'utility-sprite/svg/symbols.svg#text_background_color',
		'text_color': iconBasePath + 'utility-sprite/svg/symbols.svg#text_color',
		'threedots': iconBasePath + 'utility-sprite/svg/symbols.svg#threedots',
		'tile_card_list': iconBasePath + 'utility-sprite/svg/symbols.svg#tile_card_list',
		'topic': iconBasePath + 'utility-sprite/svg/symbols.svg#topic',
		'trail': iconBasePath + 'utility-sprite/svg/symbols.svg#trail',
		'undelete': iconBasePath + 'utility-sprite/svg/symbols.svg#undelete',
		'undeprecate': iconBasePath + 'utility-sprite/svg/symbols.svg#undeprecate',
		'underline': iconBasePath + 'utility-sprite/svg/symbols.svg#underline',
		'undo': iconBasePath + 'utility-sprite/svg/symbols.svg#undo',
		'unlock': iconBasePath + 'utility-sprite/svg/symbols.svg#unlock',
		'unmuted': iconBasePath + 'utility-sprite/svg/symbols.svg#unmuted',
		'up': iconBasePath + 'utility-sprite/svg/symbols.svg#up',
		'upload': iconBasePath + 'utility-sprite/svg/symbols.svg#upload',
		'user': iconBasePath + 'utility-sprite/svg/symbols.svg#user',
		'volume_high': iconBasePath + 'utility-sprite/svg/symbols.svg#volume_high',
		'volume_low': iconBasePath + 'utility-sprite/svg/symbols.svg#volume_low',
		'volume_off': iconBasePath + 'utility-sprite/svg/symbols.svg#volume_off',
		'warning': iconBasePath + 'utility-sprite/svg/symbols.svg#warning',
		'weeklyview': iconBasePath + 'utility-sprite/svg/symbols.svg#weeklyview',
		'world': iconBasePath + 'utility-sprite/svg/symbols.svg#world',
		'zoomin': iconBasePath + 'utility-sprite/svg/symbols.svg#zoomin',
		'zoomout': iconBasePath + 'utility-sprite/svg/symbols.svg#zoomout'
	}
};

export default icons;
