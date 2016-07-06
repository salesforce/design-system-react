import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { APP_LAUNCHER } from '../../utilities/constants';

import AppLauncher from '../../components/app-launcher';

const DemoAppLauncher = React.createClass({
	displayName: 'DemoAppLauncher',

	/* eslint-disable max-len */
	getInitialState () {
		return {
			collection: [
				{
					applicationUrl: '#/dashboard',
					appDescription: '',
					appName: 'Home',
					categoryIcon: {
						category: 'custom',
						name: 'home',
						background: '#ED8B00',
						SVGViewBox: '0 0 19 20',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M18.6197899,9.9032898 L16.6391319,9.9032898 L16.6391319,18.6181848 C16.6391319,18.8558638 16.4806793,19.0143164 16.2430003,19.0143164 L12.2816844,19.0143164 C12.0440055,19.0143164 11.8855528,18.8558638 11.8855528,18.6181848 L11.8855528,11.8839478 L7.13197371,11.8839478 L7.13197371,18.6181848 C7.13197371,18.8558638 6.97352108,19.0143164 6.73584212,19.0143164 L2.7745262,19.0143164 C2.53684725,19.0143164 2.37839461,18.8558638 2.37839461,18.6181848 L2.37839461,9.9032898 L0.397736652,9.9032898 C0.239284015,9.9032898 0.0808313784,9.82406348 0.0412182192,9.66561084 C-0.0380080991,9.50715821 0.00160506004,9.34870557 0.120444538,9.22986609 L9.23147115,0.118839478 C9.38992379,-0.0396131592 9.6672159,-0.0396131592 9.78605538,0.118839478 L18.897082,9.22986609 C19.0159215,9.34870557 19.0159215,9.50715821 18.9763083,9.66561084 C18.9366952,9.82406348 18.7782425,9.9032898 18.6197899,9.9032898 L18.6197899,9.9032898 Z'
									}
								}
							}
						}
					},
					categoryName: 'Marketing Cloud',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'http://www.marketingcloud.com/'
				},
				{
					applicationUrl: '#/pulse',
					appDescription: '',
					appName: 'Pulse',
					categoryIcon: {
						category: 'custom',
						name: 'dashboard',
						background: '#ED8B00',
						SVGViewBox: '0 0 26 26',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M12.5405405,22.3842724 C12.3783784,22.3842724 12.1621622,22.3302183 11.9459459,22.2221102 C11.6216216,22.059948 11.3513514,21.6815696 11.2972973,21.3572453 L8.21621622,8.87075884 L5.56756757,14.8167048 C5.40540541,15.3031913 4.97297297,15.5734615 4.48648649,15.5734615 L0.810810811,15.5734615 C0.378378378,15.5734615 0,15.2491372 0,14.8167048 L0,14.005894 C0,13.5734615 0.378378378,13.1950832 0.810810811,13.1950832 L3.62162162,13.1950832 L7.35135135,4.70859668 C7.56756757,4.27616424 8.05405405,3.95183992 8.59459459,4.00589397 C9.13513514,4.05994803 9.56756757,4.38427235 9.67567568,4.92481289 L12.8648649,17.5734615 L17.1351351,8.3302183 C17.3513514,7.84373181 17.8378378,7.57346154 18.3243243,7.6275156 C18.7567568,7.68156965 19.1891892,8.00589397 19.4054054,8.43832641 L21.5135135,13.2491372 L25.1891892,13.2491372 C25.6216216,13.2491372 26,13.6275156 26,14.059948 L26,14.8167048 C26,15.2491372 25.6216216,15.6275156 25.1891892,15.6275156 L20.7567568,15.6275156 C20.2702703,15.6275156 19.8378378,15.3572453 19.6216216,14.9248129 L18.2702703,11.8437318 L13.7297297,21.7356237 C13.4594595,22.1140021 13.0810811,22.3842724 12.5405405,22.3842724 L12.5405405,22.3842724 Z'
									}
								}
							}
						},
						noPadding: true
					},
					categoryName: 'Marketing Cloud',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'http://www.marketingcloud.com/'
				},
				{
					applicationUrl: 'pb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Playbooks',
					categoryIcon: {
						category: 'custom',
						name: 'playbooks',
						background: '#ED8B00',
						SVGViewBox: '0 0 20 20',
						SVGData: {
							g: {
								g: {
									path: [
										{
											d: 'M15.7083333,9.75 L16,9.45833333 C16.1666667,9.29166667 16.1666667,9.04166667 16.0416667,8.875 L12.7916667,5.25 C12.625,5.08333333 12.3333333,5.08333333 12.1666667,5.25 L8.875,8.83333333 C8.70833333,9 8.70833333,9.25 8.875,9.41666667 L9.16666667,9.70833333 C9.33333333,9.875 9.58333333,9.875 9.75,9.70833333 L11.0416667,8.29166667 C11.2916667,8 11.75,8.20833333 11.75,8.58333333 L11.75,9 C11.75,14.9166667 6.79166667,18.5833333 1.54166667,18.7916667 C1.375,18.75 1.25,18.9583333 1.25,19.1666667 L1.25,19.5833333 C1.25,19.8333333 1.375,20 1.625,20 C7.33333333,19.7916667 13.0833333,15.625 13.0833333,8.95833333 L13.0833333,8.5 C13.0833333,8.125 13.5416667,7.95833333 13.7916667,8.25 L15.125,9.75 C15.2916667,9.91666667 15.5416667,9.91666667 15.7083333,9.75 L15.7083333,9.75 Z'
										},
										{
											d: 'M7.04166667,6.45833333 C8.83333333,6.45833333 10.2916667,5 10.2916667,3.20833333 C10.2916667,1.41666667 8.83333333,0 7.04166667,0 C5.25,0 3.79166667,1.45833333 3.79166667,3.25 C3.79166667,5.04166667 5.25,6.45833333 7.04166667,6.45833333 L7.04166667,6.45833333 Z M7.04166667,1.25 C8.125,1.25 9.04166667,2.125 9.04166667,3.25 C9.04166667,4.375 8.16666667,5.25 7.04166667,5.25 C5.91666667,5.25 5.04166667,4.375 5.04166667,3.25 C5.04166667,2.125 5.95833333,1.25 7.04166667,1.25 L7.04166667,1.25 Z'
										},
										{
											d: 'M18.25,16.125 C18.0833333,15.9583333 18.0833333,15.7083333 18.25,15.5416667 L19.875,13.9166667 C20.0416667,13.75 20.0416667,13.5 19.875,13.3333333 L19.5833333,13 C19.4166667,12.8333333 19.1666667,12.8333333 19,13 L17.375,14.625 C17.2083333,14.7916667 16.9583333,14.7916667 16.7916667,14.625 L15.1666667,13 C15,12.8333333 14.75,12.8333333 14.5833333,13 L14.2916667,13.2916667 C14.125,13.4583333 14.125,13.7083333 14.2916667,13.875 L15.9166667,15.5 C16.0833333,15.6666667 16.0833333,15.9166667 15.9166667,16.0833333 L14.2916667,17.7083333 C14.125,17.875 14.125,18.125 14.2916667,18.2916667 L14.5833333,18.5833333 C14.75,18.75 15,18.75 15.1666667,18.5833333 L16.7916667,16.9583333 C16.9583333,16.7916667 17.2083333,16.7916667 17.375,16.9583333 L19,18.5833333 C19.1666667,18.75 19.4166667,18.75 19.5833333,18.5833333 L19.875,18.2916667 C20.0416667,18.125 20.0416667,17.875 19.875,17.7083333 L18.25,16.125 L18.25,16.125 Z'
										},
										{
											d: 'M3.25,12.7083333 L4.875,14.3333333 C5.04166667,14.5 5.29166667,14.5 5.45833333,14.3333333 L5.75,14.0416667 C5.91666667,13.875 5.91666667,13.625 5.75,13.4583333 L4.125,11.8333333 C3.95833333,11.6666667 3.95833333,11.4166667 4.125,11.25 L5.75,9.625 C5.91666667,9.45833333 5.91666667,9.20833333 5.75,9.04166667 L5.45833333,8.75 C5.29166667,8.58333333 5.04166667,8.58333333 4.875,8.75 L3.25,10.375 C3.08333333,10.5416667 2.83333333,10.5416667 2.66666667,10.375 L1.04166667,8.75 C0.875,8.58333333 0.625,8.58333333 0.458333333,8.75 L0.166666667,9.04166667 C-6.01370805e-16,9.20833333 -6.01370805e-16,9.45833333 0.166666667,9.625 L1.75,11.25 C1.91666667,11.4166667 1.91666667,11.6666667 1.75,11.8333333 L0.125,13.4583333 C-0.0416666667,13.625 -0.0416666667,13.875 0.125,14.0416667 L0.416666667,14.375 C0.583333333,14.5416667 0.833333333,14.5416667 1,14.375 L2.625,12.75 C2.79166667,12.5416667 3.08333333,12.5416667 3.25,12.7083333 L3.25,12.7083333 Z'
										}
									]
								}
							}
						}
					},
					categoryName: 'Playbooks',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: 'ca',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Calendar',
					categoryIcon: {
						category: 'custom',
						name: 'calendar',
						background: '#ED8B00',
						SVGViewBox: '0 0 18 20',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M17.3863636,7.36363636 L0.613636364,7.36363636 C0.286363636,7.36363636 0,7.65 0,7.97727273 L0,18 C0,18.9 0.736363636,19.6363636 1.63636364,19.6363636 L16.3636364,19.6363636 C17.2636364,19.6363636 18,18.9 18,18 L18,7.97727273 C18,7.65 17.7136364,7.36363636 17.3863636,7.36363636 L17.3863636,7.36363636 Z M6.13636364,16.3636364 C6.13636364,16.6090909 5.97272727,16.7727273 5.72727273,16.7727273 L4.09090909,16.7727273 C3.84545455,16.7727273 3.68181818,16.6090909 3.68181818,16.3636364 L3.68181818,14.7272727 C3.68181818,14.4818182 3.84545455,14.3181818 4.09090909,14.3181818 L5.72727273,14.3181818 C5.97272727,14.3181818 6.13636364,14.4818182 6.13636364,14.7272727 L6.13636364,16.3636364 L6.13636364,16.3636364 Z M6.13636364,12.2727273 C6.13636364,12.5181818 5.97272727,12.6818182 5.72727273,12.6818182 L4.09090909,12.6818182 C3.84545455,12.6818182 3.68181818,12.5181818 3.68181818,12.2727273 L3.68181818,10.6363636 C3.68181818,10.3909091 3.84545455,10.2272727 4.09090909,10.2272727 L5.72727273,10.2272727 C5.97272727,10.2272727 6.13636364,10.3909091 6.13636364,10.6363636 L6.13636364,12.2727273 L6.13636364,12.2727273 Z M10.2272727,16.3636364 C10.2272727,16.6090909 10.0636364,16.7727273 9.81818182,16.7727273 L8.18181818,16.7727273 C7.93636364,16.7727273 7.77272727,16.6090909 7.77272727,16.3636364 L7.77272727,14.7272727 C7.77272727,14.4818182 7.93636364,14.3181818 8.18181818,14.3181818 L9.81818182,14.3181818 C10.0636364,14.3181818 10.2272727,14.4818182 10.2272727,14.7272727 L10.2272727,16.3636364 L10.2272727,16.3636364 Z M10.2272727,12.2727273 C10.2272727,12.5181818 10.0636364,12.6818182 9.81818182,12.6818182 L8.18181818,12.6818182 C7.93636364,12.6818182 7.77272727,12.5181818 7.77272727,12.2727273 L7.77272727,10.6363636 C7.77272727,10.3909091 7.93636364,10.2272727 8.18181818,10.2272727 L9.81818182,10.2272727 C10.0636364,10.2272727 10.2272727,10.3909091 10.2272727,10.6363636 L10.2272727,12.2727273 L10.2272727,12.2727273 Z M14.3181818,16.3636364 C14.3181818,16.6090909 14.1545455,16.7727273 13.9090909,16.7727273 L12.2727273,16.7727273 C12.0272727,16.7727273 11.8636364,16.6090909 11.8636364,16.3636364 L11.8636364,14.7272727 C11.8636364,14.4818182 12.0272727,14.3181818 12.2727273,14.3181818 L13.9090909,14.3181818 C14.1545455,14.3181818 14.3181818,14.4818182 14.3181818,14.7272727 L14.3181818,16.3636364 L14.3181818,16.3636364 Z M14.3181818,12.2727273 C14.3181818,12.5181818 14.1545455,12.6818182 13.9090909,12.6818182 L12.2727273,12.6818182 C12.0272727,12.6818182 11.8636364,12.5181818 11.8636364,12.2727273 L11.8636364,10.6363636 C11.8636364,10.3909091 12.0272727,10.2272727 12.2727273,10.2272727 L13.9090909,10.2272727 C14.1545455,10.2272727 14.3181818,10.3909091 14.3181818,10.6363636 L14.3181818,12.2727273 L14.3181818,12.2727273 Z M16.3636364,2.04545455 L14.3181818,2.04545455 L14.3181818,1.22727273 C14.3181818,0.572727273 13.7863636,0 13.0909091,0 C12.4363636,0 11.8636364,0.531818182 11.8636364,1.22727273 L11.8636364,2.04545455 L6.13636364,2.04545455 L6.13636364,1.22727273 C6.13636364,0.572727273 5.60454545,0 4.90909091,0 C4.25454545,0 3.68181818,0.531818182 3.68181818,1.22727273 L3.68181818,2.04545455 L1.63636364,2.04545455 C0.736363636,2.04545455 0,2.78181818 0,3.68181818 L0,4.70454545 C0,5.03181818 0.286363636,5.31818182 0.613636364,5.31818182 L17.3863636,5.31818182 C17.7136364,5.31818182 18,5.03181818 18,4.70454545 L18,3.68181818 C18,2.78181818 17.2636364,2.04545455 16.3636364,2.04545455 L16.3636364,2.04545455 Z'
									}
								}
							}
						}
					},
					categoryName: 'Calendar',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: 'camp',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Campaigns',
					categoryIcon: {
						category: 'custom',
						name: 'campaigns',
						background: '#ED8B00',
						SVGViewBox: '0 0 21 22',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M8.87142857,19.2916392 L8.31428571,18.8571429 C7.71428571,18.4226465 7.71428571,17.5536537 7.71428571,17.1191573 L7.71428571,15.8591178 C7.71428571,15.5115207 7.41428571,15.2073733 7.07142857,15.2073733 L4.5,15.2073733 C4.15714286,15.2073733 3.85714286,15.5115207 3.85714286,15.8591178 L3.85714286,19.20474 C3.85714286,20.3778802 4.54285714,21.2903226 5.61428571,21.2903226 L7.71428571,21.2903226 C8.95714286,21.2903226 9.04285714,20.4213298 9.04285714,20.4213298 C9.04285714,20.4213298 9.25714286,19.6392363 8.87142857,19.2916392 L8.87142857,19.2916392 Z M18.4285714,7.38643845 L18.4285714,1.43383805 C18.4285714,0.391046741 17.1428571,0.0868992758 16.4571429,0.782093483 L12.6428571,4.43186307 C12.0428571,4.95325872 11.2714286,5.17050691 10.5,5.17050691 L3.98571429,5.17050691 C1.75714286,5.21395655 0,7.16919026 0,9.42857143 L0,9.5154707 C0,11.7748519 1.75714286,13.4693878 3.98571429,13.4693878 L10.5,13.4693878 C11.3142857,13.4693878 12.0857143,13.8169849 12.6857143,14.3383805 L16.4571429,18.0750494 C17.1428571,18.7702436 18.4285714,18.5095458 18.4285714,17.4667544 L18.4285714,11.5576037 C19.7142857,11.5576037 20.4857143,10.6451613 20.4857143,9.47202107 C20.4857143,8.29888084 19.7142857,7.38643845 18.4285714,7.38643845 L18.4285714,7.38643845 Z'
									}
								}
							}
						}
					},
					categoryName: 'Campaigns',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: '#/pulse',
					appDescription: '',
					appName: 'App w/ no Access',
					categoryIcon: {
						category: 'custom',
						name: 'dashboard',
						background: '#F69D01',
						SVGViewBox: '0 0 208 208',
						SVGData: {
							path: [
								{
									d: 'M104.75,60.28A27.82,27.82,0,1,1,76.93,88.1a27.85,27.85,0,0,1,27.82-27.82m0-10A37.82,37.82,0,1,0,142.57,88.1a37.82,37.82,0,0,0-37.82-37.82h0Z'
								},
								{
									d: 'M65.39,121.11L65.33,121,65.27,121a51.37,51.37,0,1,1,78.93,0l-0.07.08-0.07.08-22.62,28.27a45.72,45.72,0,0,1,9.2,4.51l21.23-26.54a61.37,61.37,0,1,0-94.29-.05L79.86,155.2a46,46,0,0,1,8.88-4.9Z'
								},
								{
									d: 'M169.24,165.84a55.64,55.64,0,0,0-22.76,4.84,47.23,47.23,0,0,0-15.83-16.73,45.57,45.57,0,0,0-50.78,1.26A46.93,46.93,0,0,0,73.11,161,50.72,50.72,0,0,0,0,153.14V208H208V181.49A55.79,55.79,0,0,0,169.24,165.84Z'
								}
							],
							circle: {
								cx: '104.75',
								cy: '88.1',
								r: '13.75'
							}
						},
						noPadding: true
					},
					categoryName: 'Marketing Cloud',
					cloudName: '',
					hasAccess: false,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'http://www.marketingcloud.com/'
				},
				{
					applicationUrl: '#/email-studio',
					appDescription: 'These are just a few of the words I want to say',
					appName: 'Email Studio',
					categoryIcon: {
						category: 'custom',
						name: 'emailstudio',
						background: '#E99056',
						SVGViewBox: '0 0 21 16',
						SVGData: {
							g: {
								g: {
									g: {
										path: {
											d: 'M18.8065967,-8.8817842e-16 L1.1994003,-8.8817842e-16 C0.539730135,-8.8817842e-16 0,0.551724138 0,1.22338831 L0,2.08695652 C0,2.18290855 0.035982009,2.26686657 0.107946027,2.32683658 L8.98350825,9.6071964 C8.98350825,9.6071964 8.98350825,9.6071964 8.99550225,9.6191904 C9.6071964,10.1589205 10.3868066,10.1589205 10.9985007,9.6191904 C10.9985007,9.6191904 10.9985007,9.6191904 11.0104948,9.6071964 L19.886057,2.32683658 C19.958021,2.26686657 19.994003,2.18290855 19.994003,2.08695652 L19.994003,1.23538231 C19.994003,0.551724138 19.4662669,-8.8817842e-16 18.8065967,-8.8817842e-16 L18.8065967,-8.8817842e-16 Z M0.011994003,3.92203898 C0.011994003,3.80209895 0.071964018,3.69415292 0.179910045,3.64617691 C0.287856072,3.5862069 0.407796102,3.6101949 0.503748126,3.69415292 L4.8095952,7.52023988 C4.86956522,7.56821589 4.90554723,7.64017991 4.90554723,7.73613193 C4.90554723,7.82008996 4.88155922,7.90404798 4.82158921,7.96401799 L0.515742129,12.029985 C0.431784108,12.125937 0.299850075,12.149925 0.191904048,12.101949 C0.071964018,12.053973 0.011994003,11.946027 0.011994003,11.814093 L0.011994003,3.92203898 L0.011994003,3.92203898 Z M0.011994003,13.7811094 C0.011994003,13.6971514 0.047976012,13.6131934 0.107946027,13.5532234 L5.52923538,8.50374813 C5.63718141,8.3958021 5.80509745,8.3958021 5.92503748,8.50374813 L8.21589205,10.5427286 C9.27136432,11.4902549 10.7226387,11.4782609 11.7781109,10.5427286 L14.0689655,8.50374813 C14.1889055,8.3958021 14.3568216,8.4077961 14.4647676,8.50374813 L19.886057,13.5532234 C19.946027,13.6131934 19.982009,13.6851574 19.982009,13.7811094 L19.982009,14.7646177 C19.982009,15.4482759 19.4422789,16 18.7826087,16 L1.1994003,16 C0.539730135,16 0,15.4482759 0,14.7646177 L0,13.7811094 L0.011994003,13.7811094 Z M19.994003,11.802099 C19.994003,11.934033 19.922039,12.041979 19.814093,12.089955 C19.6941529,12.137931 19.5742129,12.101949 19.4902549,12.017991 L15.1844078,7.95202399 C15.1244378,7.89205397 15.1004498,7.80809595 15.1004498,7.72413793 C15.1004498,7.64017991 15.1364318,7.55622189 15.2083958,7.50824588 L19.5142429,3.68215892 C19.5982009,3.6101949 19.7181409,3.5862069 19.826087,3.64617691 C19.934033,3.69415292 20.005997,3.80209895 20.005997,3.92203898 L20.005997,11.802099 L19.994003,11.802099 Z'
										}
									}
								}
							}
						}
					},
					categoryName: 'Email Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'distributed-sending',
					appDescription: 'This sentence is exactly fifty characters long end',
					appName: 'Distributed Sending',
					categoryIcon: {
						category: 'custom',
						name: 'emailstudio',
						background: '#E99056',
						SVGViewBox: '0 0 21 16',
						SVGData: {
							g: {
								g: {
									g: {
										path: {
											d: 'M18.8065967,-8.8817842e-16 L1.1994003,-8.8817842e-16 C0.539730135,-8.8817842e-16 0,0.551724138 0,1.22338831 L0,2.08695652 C0,2.18290855 0.035982009,2.26686657 0.107946027,2.32683658 L8.98350825,9.6071964 C8.98350825,9.6071964 8.98350825,9.6071964 8.99550225,9.6191904 C9.6071964,10.1589205 10.3868066,10.1589205 10.9985007,9.6191904 C10.9985007,9.6191904 10.9985007,9.6191904 11.0104948,9.6071964 L19.886057,2.32683658 C19.958021,2.26686657 19.994003,2.18290855 19.994003,2.08695652 L19.994003,1.23538231 C19.994003,0.551724138 19.4662669,-8.8817842e-16 18.8065967,-8.8817842e-16 L18.8065967,-8.8817842e-16 Z M0.011994003,3.92203898 C0.011994003,3.80209895 0.071964018,3.69415292 0.179910045,3.64617691 C0.287856072,3.5862069 0.407796102,3.6101949 0.503748126,3.69415292 L4.8095952,7.52023988 C4.86956522,7.56821589 4.90554723,7.64017991 4.90554723,7.73613193 C4.90554723,7.82008996 4.88155922,7.90404798 4.82158921,7.96401799 L0.515742129,12.029985 C0.431784108,12.125937 0.299850075,12.149925 0.191904048,12.101949 C0.071964018,12.053973 0.011994003,11.946027 0.011994003,11.814093 L0.011994003,3.92203898 L0.011994003,3.92203898 Z M0.011994003,13.7811094 C0.011994003,13.6971514 0.047976012,13.6131934 0.107946027,13.5532234 L5.52923538,8.50374813 C5.63718141,8.3958021 5.80509745,8.3958021 5.92503748,8.50374813 L8.21589205,10.5427286 C9.27136432,11.4902549 10.7226387,11.4782609 11.7781109,10.5427286 L14.0689655,8.50374813 C14.1889055,8.3958021 14.3568216,8.4077961 14.4647676,8.50374813 L19.886057,13.5532234 C19.946027,13.6131934 19.982009,13.6851574 19.982009,13.7811094 L19.982009,14.7646177 C19.982009,15.4482759 19.4422789,16 18.7826087,16 L1.1994003,16 C0.539730135,16 0,15.4482759 0,14.7646177 L0,13.7811094 L0.011994003,13.7811094 Z M19.994003,11.802099 C19.994003,11.934033 19.922039,12.041979 19.814093,12.089955 C19.6941529,12.137931 19.5742129,12.101949 19.4902549,12.017991 L15.1844078,7.95202399 C15.1244378,7.89205397 15.1004498,7.80809595 15.1004498,7.72413793 C15.1004498,7.64017991 15.1364318,7.55622189 15.2083958,7.50824588 L19.5142429,3.68215892 C19.5982009,3.6101949 19.7181409,3.5862069 19.826087,3.64617691 C19.934033,3.69415292 20.005997,3.80209895 20.005997,3.92203898 L20.005997,11.802099 L19.994003,11.802099 Z'
										}
									}
								}
							}
						}
					},
					categoryName: 'Email Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'mobile-push',
					appDescription: 'This sentence is exactly eighty characters long and goes on and on in the last o.',
					appName: 'MobilePush',
					categoryIcon: {
						category: 'custom',
						name: 'mobilestudio',
						background: '#0082E9',
						SVGViewBox: '0 0 14 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,0.893333333 L2.29333333,0.893333333 C1.01333333,0.893333333 0,1.86666667 0,3.10666667 L0,20.8533333 C0,22.08 1.01333333,23.12 2.29333333,23.12 L11.04,23.12 C12.3066667,23.12 13.3333333,22.0933333 13.3333333,20.8533333 L13.3333333,3.10666667 C13.3333333,1.86666667 12.32,0.893333333 11.04,0.893333333 L11.04,0.893333333 Z M5.04,2.17333333 L8.29333333,2.17333333 C8.4,2.17333333 8.49333333,2.26666667 8.49333333,2.37333333 C8.49333333,2.46666667 8.38666667,2.57333333 8.29333333,2.57333333 L5.04,2.57333333 C4.93333333,2.57333333 4.84,2.48 4.84,2.37333333 C4.84,2.26666667 4.93333333,2.17333333 5.04,2.17333333 L5.04,2.17333333 Z M7.93333333,21.5333333 C7.93333333,21.6266667 7.82666667,21.7333333 7.68,21.7333333 L5.6,21.7333333 C5.49333333,21.7333333 5.4,21.64 5.4,21.5333333 L5.4,20.6 C5.4,20.5066667 5.50666667,20.36 5.6,20.36 L7.68,20.36 C7.82666667,20.36 7.93333333,20.5066667 7.93333333,20.6 L7.93333333,21.5333333 L7.93333333,21.5333333 Z M12.0133333,18.7866667 C12.0133333,18.9333333 11.9066667,19.0266667 11.76,19.0266667 L1.57333333,19.0266667 C1.42666667,19.0266667 1.32,18.9333333 1.32,18.7866667 L1.32,4.04 C1.32,3.89333333 1.42666667,3.74666667 1.57333333,3.74666667 L11.7466667,3.74666667 C11.8933333,3.74666667 12,3.89333333 12,4.04 L12,18.7866667 L12.0133333,18.7866667 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Mobile Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'mobile-connect',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'MobileConnect',
					categoryIcon: {
						category: 'custom',
						name: 'mobilestudio',
						background: '#0082E9',
						SVGViewBox: '0 0 14 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,0.893333333 L2.29333333,0.893333333 C1.01333333,0.893333333 0,1.86666667 0,3.10666667 L0,20.8533333 C0,22.08 1.01333333,23.12 2.29333333,23.12 L11.04,23.12 C12.3066667,23.12 13.3333333,22.0933333 13.3333333,20.8533333 L13.3333333,3.10666667 C13.3333333,1.86666667 12.32,0.893333333 11.04,0.893333333 L11.04,0.893333333 Z M5.04,2.17333333 L8.29333333,2.17333333 C8.4,2.17333333 8.49333333,2.26666667 8.49333333,2.37333333 C8.49333333,2.46666667 8.38666667,2.57333333 8.29333333,2.57333333 L5.04,2.57333333 C4.93333333,2.57333333 4.84,2.48 4.84,2.37333333 C4.84,2.26666667 4.93333333,2.17333333 5.04,2.17333333 L5.04,2.17333333 Z M7.93333333,21.5333333 C7.93333333,21.6266667 7.82666667,21.7333333 7.68,21.7333333 L5.6,21.7333333 C5.49333333,21.7333333 5.4,21.64 5.4,21.5333333 L5.4,20.6 C5.4,20.5066667 5.50666667,20.36 5.6,20.36 L7.68,20.36 C7.82666667,20.36 7.93333333,20.5066667 7.93333333,20.6 L7.93333333,21.5333333 L7.93333333,21.5333333 Z M12.0133333,18.7866667 C12.0133333,18.9333333 11.9066667,19.0266667 11.76,19.0266667 L1.57333333,19.0266667 C1.42666667,19.0266667 1.32,18.9333333 1.32,18.7866667 L1.32,4.04 C1.32,3.89333333 1.42666667,3.74666667 1.57333333,3.74666667 L11.7466667,3.74666667 C11.8933333,3.74666667 12,3.89333333 12,4.04 L12,18.7866667 L12.0133333,18.7866667 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Mobile Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'group-connect',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'GroupConnect',
					categoryIcon: {
						category: 'custom',
						name: 'mobilestudio',
						background: '#0082E9',
						SVGViewBox: '0 0 14 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,0.893333333 L2.29333333,0.893333333 C1.01333333,0.893333333 0,1.86666667 0,3.10666667 L0,20.8533333 C0,22.08 1.01333333,23.12 2.29333333,23.12 L11.04,23.12 C12.3066667,23.12 13.3333333,22.0933333 13.3333333,20.8533333 L13.3333333,3.10666667 C13.3333333,1.86666667 12.32,0.893333333 11.04,0.893333333 L11.04,0.893333333 Z M5.04,2.17333333 L8.29333333,2.17333333 C8.4,2.17333333 8.49333333,2.26666667 8.49333333,2.37333333 C8.49333333,2.46666667 8.38666667,2.57333333 8.29333333,2.57333333 L5.04,2.57333333 C4.93333333,2.57333333 4.84,2.48 4.84,2.37333333 C4.84,2.26666667 4.93333333,2.17333333 5.04,2.17333333 L5.04,2.17333333 Z M7.93333333,21.5333333 C7.93333333,21.6266667 7.82666667,21.7333333 7.68,21.7333333 L5.6,21.7333333 C5.49333333,21.7333333 5.4,21.64 5.4,21.5333333 L5.4,20.6 C5.4,20.5066667 5.50666667,20.36 5.6,20.36 L7.68,20.36 C7.82666667,20.36 7.93333333,20.5066667 7.93333333,20.6 L7.93333333,21.5333333 L7.93333333,21.5333333 Z M12.0133333,18.7866667 C12.0133333,18.9333333 11.9066667,19.0266667 11.76,19.0266667 L1.57333333,19.0266667 C1.42666667,19.0266667 1.32,18.9333333 1.32,18.7866667 L1.32,4.04 C1.32,3.89333333 1.42666667,3.74666667 1.57333333,3.74666667 L11.7466667,3.74666667 C11.8933333,3.74666667 12,3.89333333 12,4.04 L12,18.7866667 L12.0133333,18.7866667 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Mobile Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'social-pages',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Social Pages',
					categoryIcon: {
						category: 'custom',
						name: 'socialstudio',
						background: '#C17ECB',
						SVGViewBox: '1 0 20 21',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,10.72 C8.17333333,10.0533333 5.21333333,10.0533333 2.34666667,10.72 C1.41333333,10.9733333 0.666666667,12.0133333 0.666666667,12.92 L0.666666667,14.6933333 C0.666666667,15.6133333 1.41333333,16.6533333 2.34666667,16.8933333 C2.61333333,16.96 2.88,17 3.14666667,17.0533333 L5.4,20.28 C5.81333333,20.8666667 6.14666667,20.76 6.14666667,20.04 L6.14666667,17.3733333 C7.78666667,17.4266667 9.44,17.2666667 11.04,16.8933333 C11.9733333,16.64 12.72,15.6 12.72,14.6933333 L12.72,12.92 C12.7333333,12.0133333 11.9866667,10.9733333 11.04,10.72 L11.04,10.72 Z M18.9866667,1.4 C15.0933333,0.426666667 11.04,0.426666667 7.14666667,1.4 C6.21333333,1.65333333 5.46666667,2.69333333 5.46666667,3.61333333 L5.46666667,6.76 C5.46666667,7.68 6.21333333,8.72 7.14666667,8.97333333 C9.32,9.52 11.5466667,9.74666667 13.76,9.68 L13.76,13.3866667 C13.76,14.0933333 14.0933333,14.2133333 14.4933333,13.6266667 L17.52,9.29333333 C18.0133333,9.2 18.4933333,9.09333333 18.9733333,8.97333333 C19.9066667,8.72 20.6533333,7.68 20.6533333,6.76 L20.6533333,3.61333333 C20.6666667,2.69333333 19.92,1.65333333 18.9866667,1.4 L18.9866667,1.4 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Social Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'social-studio',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Social Studio',
					categoryIcon: {
						category: 'custom',
						name: 'socialstudio',
						background: '#C17ECB',
						SVGViewBox: '1 0 20 21',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,10.72 C8.17333333,10.0533333 5.21333333,10.0533333 2.34666667,10.72 C1.41333333,10.9733333 0.666666667,12.0133333 0.666666667,12.92 L0.666666667,14.6933333 C0.666666667,15.6133333 1.41333333,16.6533333 2.34666667,16.8933333 C2.61333333,16.96 2.88,17 3.14666667,17.0533333 L5.4,20.28 C5.81333333,20.8666667 6.14666667,20.76 6.14666667,20.04 L6.14666667,17.3733333 C7.78666667,17.4266667 9.44,17.2666667 11.04,16.8933333 C11.9733333,16.64 12.72,15.6 12.72,14.6933333 L12.72,12.92 C12.7333333,12.0133333 11.9866667,10.9733333 11.04,10.72 L11.04,10.72 Z M18.9866667,1.4 C15.0933333,0.426666667 11.04,0.426666667 7.14666667,1.4 C6.21333333,1.65333333 5.46666667,2.69333333 5.46666667,3.61333333 L5.46666667,6.76 C5.46666667,7.68 6.21333333,8.72 7.14666667,8.97333333 C9.32,9.52 11.5466667,9.74666667 13.76,9.68 L13.76,13.3866667 C13.76,14.0933333 14.0933333,14.2133333 14.4933333,13.6266667 L17.52,9.29333333 C18.0133333,9.2 18.4933333,9.09333333 18.9733333,8.97333333 C19.9066667,8.72 20.6533333,7.68 20.6533333,6.76 L20.6533333,3.61333333 C20.6666667,2.69333333 19.92,1.65333333 18.9866667,1.4 L18.9866667,1.4 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Social Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'wma',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Web & Mobile Analytics',
					categoryIcon: {
						category: 'custom',
						name: 'analyticsbuilder',
						background: '#4AB8AA',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: [
													{
														d: 'M4.6,15.6266667 L1.33333333,15.6266667 C1.09333333,15.6266667 0.893333333,15.8133333 0.893333333,16.0533333 L0.893333333,22.68 C0.893333333,22.92 1.09333333,23.1066667 1.33333333,23.1066667 L4.6,23.1066667 C4.84,23.1066667 5.04,22.92 5.04,22.68 L5.04,16.0533333 C5.05333333,15.8266667 4.85333333,15.6266667 4.6,15.6266667 L4.6,15.6266667 Z'
													},
													{
														d: 'M10.6266667,13.5866667 L7.36,13.5866667 C7.12,13.5866667 6.92,13.7733333 6.92,14.0133333 L6.92,22.6933333 C6.92,22.9333333 7.12,23.12 7.36,23.12 L10.6266667,23.12 C10.8666667,23.12 11.0666667,22.9333333 11.0666667,22.6933333 L11.0666667,14.0133333 C11.0666667,13.7733333 10.8666667,13.5866667 10.6266667,13.5866667 L10.6266667,13.5866667 Z'
													},
													{
														d: 'M16.64,6.09333333 L13.3733333,6.09333333 C13.1333333,6.09333333 12.9333333,6.28 12.9333333,6.52 L12.9333333,22.6933333 C12.9333333,22.9333333 13.1333333,23.12 13.3733333,23.12 L16.64,23.12 C16.88,23.12 17.08,22.9333333 17.08,22.6933333 L17.08,6.52 C17.0933333,6.28 16.8933333,6.09333333 16.64,6.09333333 L16.64,6.09333333 Z'
													},
													{
														d: 'M22.6666667,0.893333333 L19.4,0.893333333 C19.16,0.893333333 18.96,1.08 18.96,1.32 L18.96,22.6933333 C18.96,22.9333333 19.16,23.12 19.4,23.12 L22.6666667,23.12 C22.9066667,23.12 23.1066667,22.9333333 23.1066667,22.6933333 L23.1066667,1.32 C23.1066667,1.08 22.9066667,0.893333333 22.6666667,0.893333333 L22.6666667,0.893333333 Z'
													}
												]
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Analytics Builder',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'mc-reports',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Reports',
					categoryIcon: {
						category: 'custom',
						name: 'analyticsbuilder',
						background: '#4AB8AA',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: [
													{
														d: 'M4.6,15.6266667 L1.33333333,15.6266667 C1.09333333,15.6266667 0.893333333,15.8133333 0.893333333,16.0533333 L0.893333333,22.68 C0.893333333,22.92 1.09333333,23.1066667 1.33333333,23.1066667 L4.6,23.1066667 C4.84,23.1066667 5.04,22.92 5.04,22.68 L5.04,16.0533333 C5.05333333,15.8266667 4.85333333,15.6266667 4.6,15.6266667 L4.6,15.6266667 Z'
													},
													{
														d: 'M10.6266667,13.5866667 L7.36,13.5866667 C7.12,13.5866667 6.92,13.7733333 6.92,14.0133333 L6.92,22.6933333 C6.92,22.9333333 7.12,23.12 7.36,23.12 L10.6266667,23.12 C10.8666667,23.12 11.0666667,22.9333333 11.0666667,22.6933333 L11.0666667,14.0133333 C11.0666667,13.7733333 10.8666667,13.5866667 10.6266667,13.5866667 L10.6266667,13.5866667 Z'
													},
													{
														d: 'M16.64,6.09333333 L13.3733333,6.09333333 C13.1333333,6.09333333 12.9333333,6.28 12.9333333,6.52 L12.9333333,22.6933333 C12.9333333,22.9333333 13.1333333,23.12 13.3733333,23.12 L16.64,23.12 C16.88,23.12 17.08,22.9333333 17.08,22.6933333 L17.08,6.52 C17.0933333,6.28 16.8933333,6.09333333 16.64,6.09333333 L16.64,6.09333333 Z'
													},
													{
														d: 'M22.6666667,0.893333333 L19.4,0.893333333 C19.16,0.893333333 18.96,1.08 18.96,1.32 L18.96,22.6933333 C18.96,22.9333333 19.16,23.12 19.4,23.12 L22.6666667,23.12 C22.9066667,23.12 23.1066667,22.9333333 23.1066667,22.6933333 L23.1066667,1.32 C23.1066667,1.08 22.9066667,0.893333333 22.6666667,0.893333333 L22.6666667,0.893333333 Z'
													}
												]
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Analytics Builder',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Journey Builder',
					categoryIcon: {
						category: 'custom',
						name: 'journeybuilder',
						background: '#68AED3',
						SVGViewBox: '0 0 17 23',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M8.4,0.996 C3.984,0.996 0.396,4.62 0.396,9.096 C0.396,15.66 8.4,22.992 8.4,22.992 C8.4,22.992 16.404,15.372 16.404,9.096 C16.404,4.632 12.816,0.996 8.4,0.996 L8.4,0.996 Z M8.4,12.576 C6.504,12.576 4.968,11.016 4.968,9.108 C4.968,7.2 6.504,5.628 8.4,5.628 C10.296,5.628 11.832,7.188 11.832,9.096 C11.832,11.004 10.296,12.576 8.4,12.576 L8.4,12.576 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Journey Builder',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Platform',
					categoryIcon: {
						category: 'custom',
						name: 'platform',
						background: '#E2B90A',
						SVGViewBox: '0 0 23 15',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M22.6666667,6.30133333 L22.1453333,5.49666667 L20.5926667,6.16533333 C18.5866667,2.93533333 14.9146667,0.566666667 11.084,0.566666667 C5.38333333,0.566666667 0,5.814 0,11.3673333 C0,11.4806667 0.0113333333,11.594 0.0113333333,11.7073333 L0.034,12.1606667 L2.754,12.1606667 L2.72,11.7073333 C2.70866667,11.594 2.70866667,11.492 2.70866667,11.3786667 C2.70866667,6.89066667 6.46,3.23 11.0726667,3.23 C14.1213333,3.23 16.7846667,4.828 18.2466667,7.19666667 L12.9313333,9.50866667 C12.0133333,8.738 10.6646667,8.54533333 9.52,9.13466667 C8.024,9.894 7.446,11.696 8.23933333,13.158 C9.02133333,14.62 10.8686667,15.1753333 12.3646667,14.416 C13.5093333,13.8266667 14.11,12.648 13.9853333,11.4693333 L18.9153333,8.54533333 C19.2553333,9.42933333 19.448,10.3813333 19.448,11.39 C19.448,11.5033333 19.4366667,11.6166667 19.4366667,11.7186667 L19.4026667,12.172 L22.1226667,12.172 L22.1453333,11.7186667 C22.1566667,11.6053333 22.1566667,11.5033333 22.1566667,11.3786667 C22.1566667,9.93933333 21.7826667,8.52266667 21.148,7.208 L22.6666667,6.30133333 L22.6666667,6.30133333 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Platform',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'HubExchange',
					categoryIcon: {
						category: 'custom',
						name: 'hubexchange',
						background: '#DF6861',
						SVGViewBox: '0 0 26 22',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M12.4,15.8133333 L12.5866667,14.56 L14.3466667,13.36 L13.96,11.7066667 L13.72,11.6933333 L11.8666667,11.5466667 L11.1466667,10.5333333 L11.56,8.4 L10.16,7.50666667 L9.98666667,7.68 L8.58666667,8.92 L7.38666667,8.73333333 L6.21333333,6.92 L4.62666667,7.32 L4.61333333,7.57333333 L4.48,9.48 L3.49333333,10.2266667 L1.42666667,9.78666667 L0.573333333,11.24 L0.733333333,11.4266667 L1.93333333,12.88 L1.76,14.1333333 L0,15.3333333 L0.386666667,16.9733333 L0.626666667,17 L2.46666667,17.1466667 L3.18666667,18.16 L2.76,20.2933333 L4.16,21.1733333 L4.34666667,21.0133333 L5.74666667,19.76 L6.94666667,19.9466667 L8.10666667,21.76 L9.69333333,21.36 L9.70666667,21.1066667 L9.84,19.2 L10.8266667,18.4533333 L12.88,18.8933333 L13.7333333,17.44 L13.5733333,17.2533333 L12.4,15.8133333 L12.4,15.8133333 Z M9.96,16.1066667 C9.02666667,17.7066667 7.02666667,18.2133333 5.48,17.24 C3.94666667,16.2666667 3.45333333,14.2 4.37333333,12.6 C5.30666667,11 7.30666667,10.4933333 8.85333333,11.4533333 C10.4,12.4266667 10.8933333,14.5066667 9.96,16.1066667 L9.96,16.1066667 Z'
												},
												{
													d: 'M24.7333333,9.56 L24.92,8.30666667 L26.6666667,7.10666667 L26.28,5.46666667 L26.04,5.45333333 L24.2,5.30666667 L23.4666667,4.28 L23.88,2.14666667 L22.48,1.26666667 L22.2933333,1.42666667 L20.8933333,2.66666667 L19.6933333,2.48 L18.5466667,0.666666667 L16.96,1.06666667 L16.9333333,1.32 L16.8,3.22666667 L15.8133333,3.97333333 L13.76,3.53333333 L12.9066667,4.98666667 L13.0666667,5.18666667 L14.2666667,6.64 L14.08,7.89333333 L12.3333333,9.09333333 L12.72,10.7333333 L12.96,10.7466667 L14.8,10.8933333 L15.52,11.92 L15.0933333,14.0533333 L16.4933333,14.9333333 L16.68,14.7733333 L18.08,13.52 L19.28,13.7066667 L20.44,15.52 L22.0266667,15.12 L22.04,14.8666667 L22.1733333,12.96 L23.16,12.2133333 L25.2266667,12.6533333 L26.08,11.2 L25.92,11.0133333 L24.7333333,9.56 L24.7333333,9.56 Z M22.28,9.85333333 C21.3466667,11.4533333 19.3466667,11.96 17.8,10.9866667 C16.2533333,10.0133333 15.7733333,7.93333333 16.7066667,6.34666667 C17.64,4.74666667 19.64,4.24 21.1866667,5.2 C22.7333333,6.16 23.2133333,8.25333333 22.28,9.85333333 L22.28,9.85333333 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'HubExchange',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Content Builder',
					categoryIcon: {
						category: 'custom',
						name: 'contentbuilder',
						background: '#7A79AC',
						SVGViewBox: '0 0 24 28',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M22.3,0.66 L1.7,0.66 C0.94,0.66 0.32,1.3 0.32,2.06 L0.32,9.08 L23.66,9.08 L23.66,2.08 C23.66,1.3 23.04,0.66 22.3,0.66 L22.3,0.66 Z'
												},
												{
													d: 'M9.94,10.5 L9.94,27.34 L22.3,27.34 C23.06,27.34 23.68,26.7 23.68,25.94 L23.68,10.5 L9.94,10.5 L9.94,10.5 Z'
												},
												{
													d: 'M0.34,10.5 L0.34,25.94 C0.34,26.72 0.96,27.34 1.72,27.34 L8.58,27.34 L8.58,10.5 L0.34,10.5 L0.34,10.5 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Content Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Advertising Studio',
					categoryIcon: {
						category: 'custom',
						name: 'advertisingstudio',
						background: '#DC6A87',
						SVGViewBox: '0 0 25 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: {
													d: 'M10.2,19.716 C10.416,19.62 10.668,19.476 10.98,19.308 C11.604,18.96 12.384,18.516 13.344,18.18 C13.116,17.748 12.912,17.244 12.684,16.668 C12.672,16.632 12.66,16.584 12.648,16.548 C11.832,16.884 10.944,17.076 9.996,17.076 C6.132,17.076 3,13.932 3,10.08 C3,6.228 6.144,3.084 9.996,3.084 C13.68,3.084 16.704,5.952 16.968,9.564 C18.54,9.732 19.428,10.512 19.896,11.376 C19.956,10.944 19.992,10.512 19.992,10.068 C19.992,4.548 15.516,0.072 9.996,0.072 C4.476,0.072 0,4.548 0,10.068 C0,15.444 4.236,19.812 9.552,20.04 C9.756,19.932 9.96,19.824 10.2,19.716 L10.2,19.716 Z'
												},
												circle: {
													cx: '9.996',
													cy: '10.068',
													r: '3'
												}
											},
											path: {
												d: 'M22.188,20.616 C21.252,20.196 19.872,19.128 17.82,18.768 C18.348,18.204 18.744,17.328 19.152,16.284 C19.392,15.684 19.344,15.168 19.344,14.436 C19.344,13.896 19.44,13.032 19.308,12.552 C18.852,10.944 17.712,10.5 16.38,10.5 C15.036,10.5 13.896,10.944 13.44,12.564 C13.308,13.044 13.404,13.908 13.404,14.448 C13.404,15.18 13.368,15.696 13.596,16.296 C14.004,17.34 14.4,18.216 14.916,18.78 C12.888,19.152 11.508,20.22 10.584,20.628 C8.664,21.48 8.652,22.416 8.652,22.416 L8.652,24 L24.096,24 L24.096,22.416 C24.12,22.404 24.12,21.468 22.188,20.616 L22.188,20.616 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Advertising Studio',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Web Studio',
					categoryIcon: {
						category: 'custom',
						name: 'webstudio',
						background: '#4EAE7D',
						SVGViewBox: '0 0 22 18',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M2.94666667,11.6666667 L18.4,11.6666667 C18.5066667,11.6666667 18.6,11.56 18.6,11.4533333 L18.6,0.773333333 C18.6,0.546666667 18.4266667,0.44 18.2,0.44 L3.14666667,0.44 C2.93333333,0.44 2.70666667,0.546666667 2.70666667,0.773333333 L2.70666667,11.4533333 C2.69333333,11.56 2.84,11.6666667 2.94666667,11.6666667 L2.94666667,11.6666667 Z M4.25333333,2.22666667 C4.25333333,2.12 4.34666667,2.02666667 4.45333333,2.02666667 L16.84,2.02666667 C16.9466667,2.02666667 17.04,2.12 17.04,2.22666667 L17.04,9.89333333 C17.04,10 16.9466667,10.0933333 16.84,10.0933333 L4.45333333,10.0933333 C4.34666667,10.0933333 4.25333333,10 4.25333333,9.89333333 L4.25333333,2.22666667 L4.25333333,2.22666667 Z'
												},
												{
													d: 'M20.6133333,16.4933333 L18.64,12.4933333 C18.6,12.4266667 18.5333333,12.3733333 18.4666667,12.3733333 L2.85333333,12.3733333 C2.78666667,12.3733333 2.72,12.4266667 2.68,12.4933333 L0.706666667,16.4933333 C0.56,16.76 0.746666667,17.12 1.05333333,17.12 L20.2666667,17.12 C20.5733333,17.1066667 20.76,16.76 20.6133333,16.4933333 L20.6133333,16.4933333 Z M12.68,16.24 L8.65333333,16.24 C8.57333333,16.24 8.52,16.12 8.56,16.0533333 L9.13333333,14.96 C9.17333333,14.8933333 9.24,14.84 9.30666667,14.84 L12.0133333,14.84 C12.08,14.84 12.1466667,14.88 12.1866667,14.9333333 L12.76,16.0533333 C12.8,16.12 12.76,16.24 12.68,16.24 L12.68,16.24 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Web Studio',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Audience Builder',
					categoryIcon: {
						category: 'custom',
						name: 'audiencebuilder',
						background: '#FD90B5',
						SVGViewBox: '0 0 25 16',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: [
													{
														d: 'M22.751746,10.1453968 C22.088254,9.83174603 21.1111111,9.03555556 19.6634921,8.77015873 C20.0374603,8.34793651 20.3149206,7.69650794 20.6044444,6.92444444 C20.7733333,6.47809524 20.7492063,6.09206349 20.7492063,5.54920635 C20.7492063,5.15111111 20.8215873,4.49968254 20.7250794,4.13777778 C20.3993651,2.93142857 19.5911111,2.60571429 18.6501587,2.60571429 C17.6971429,2.60571429 16.8888889,2.94349206 16.5752381,4.13777778 C16.4787302,4.48761905 16.5511111,5.13904762 16.5511111,5.53714286 C16.5511111,6.08 16.5269841,6.46603175 16.695873,6.92444444 C16.9853968,7.70857143 17.2628571,8.36 17.6368254,8.77015873 C16.8406349,8.92698413 16.1892063,9.24063492 15.6463492,9.54222222 C16.4666667,9.88 17.1542857,10.2901587 17.7092063,10.615873 C18.0349206,10.8088889 18.3244444,10.9777778 18.5536508,11.0863492 C19.6634921,11.6050794 20.2787302,12.1720635 20.6406349,12.6787302 L24.1390476,12.6787302 L24.1390476,11.4965079 C24.1269841,11.4844444 24.1149206,10.7847619 22.751746,10.1453968 L22.751746,10.1453968 Z'
													},
													{
														d: 'M5.57333333,11.0863492 C5.80253968,10.9777778 6.09206349,10.8088889 6.41777778,10.615873 C6.9847619,10.2780952 7.67238095,9.88 8.49269841,9.54222222 C7.94984127,9.24063492 7.28634921,8.92698413 6.47809524,8.77015873 C6.85206349,8.34793651 7.12952381,7.69650794 7.41904762,6.92444444 C7.58793651,6.47809524 7.56380952,6.09206349 7.56380952,5.54920635 C7.56380952,5.15111111 7.63619048,4.49968254 7.53968254,4.13777778 C7.21396825,2.93142857 6.40571429,2.60571429 5.4647619,2.60571429 C4.51174603,2.60571429 3.70349206,2.94349206 3.38984127,4.13777778 C3.28126984,4.48761905 3.35365079,5.13904762 3.35365079,5.53714286 C3.35365079,6.08 3.32952381,6.46603175 3.4984127,6.92444444 C3.78793651,7.70857143 4.06539683,8.36 4.43936508,8.77015873 C3.00380952,9.04761905 2.02666667,9.84380952 1.3752381,10.1453968 C0.0120634921,10.7847619 0,11.4844444 0,11.4844444 L0,12.6666667 L3.4984127,12.6666667 C3.86031746,12.184127 4.47555556,11.6050794 5.57333333,11.0863492 L5.57333333,11.0863492 Z'
													},
													{
														d: 'M18.2038095,11.8946032 C17.2146032,11.4361905 15.7428571,10.2419048 13.5714286,9.83174603 C14.1263492,9.20444444 14.5485714,8.22730159 14.9828571,7.06920635 C15.2361905,6.39365079 15.1879365,5.82666667 15.1879365,5.00634921 C15.1879365,4.4031746 15.2965079,3.43809524 15.151746,2.90730159 C14.6692063,1.10984127 13.4628571,0.615238095 12.0393651,0.615238095 C10.615873,0.615238095 9.40952381,1.10984127 8.92698413,2.91936508 C8.79428571,3.43809524 8.90285714,4.4031746 8.90285714,5.00634921 C8.90285714,5.82666667 8.86666667,6.40571429 9.10793651,7.06920635 C9.54222222,8.23936508 9.95238095,9.21650794 10.5073016,9.84380952 C8.34793651,10.2660317 6.90031746,11.448254 5.91111111,11.9066667 C3.87238095,12.8596825 3.87238095,13.9092063 3.87238095,13.9092063 L3.87238095,15.6825397 L20.2425397,15.6825397 L20.2425397,13.9092063 C20.2546032,13.9092063 20.2425397,12.8596825 18.2038095,11.8946032 L18.2038095,11.8946032 Z'
													}
												]
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Audience Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'pw',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Predictive Web',
					categoryIcon: {
						category: 'custom',
						name: 'personalizationbuilder',
						background: '#0079BC',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M13.344,9.972 C13.32,9.96 13.308,9.96 13.296,9.948 C12.372,9.54 11.016,8.484 9,8.124 C9.516,7.584 9.912,6.72 10.308,5.688 C10.536,5.1 10.5,4.596 10.5,3.876 C10.5,3.348 10.596,2.496 10.464,2.028 C10.02,0.432 8.904,0 7.584,0 C6.264,0 5.136,0.444 4.692,2.028 C4.56,2.496 4.668,3.348 4.668,3.876 C4.668,4.596 4.632,5.1 4.86,5.7 C5.268,6.72 5.652,7.584 6.156,8.136 C4.164,8.508 2.808,9.552 1.896,9.948 C0.012,10.8 0,11.712 0,11.712 L0,14.748 L9.456,14.748 C10.068,12.684 11.484,10.98 13.344,9.972 L13.344,9.972 Z'
												},
												{
													d: 'M17.124,20.136 C15.408,20.136 14.016,18.744 14.016,17.028 C14.016,15.312 15.408,13.92 17.124,13.92 C18.84,13.92 20.232,15.312 20.232,17.028 C20.244,18.744 18.84,20.136 17.124,20.136 L17.124,20.136 Z M23.988,17.772 L23.988,16.212 L23.772,16.14 L22.092,15.6 L21.648,14.532 L22.5,12.72 L21.396,11.616 L21.192,11.724 L19.632,12.516 L18.552,12.072 L17.88,10.188 L16.32,10.188 L16.248,10.404 L15.696,12.072 L14.616,12.516 L12.804,11.664 L11.7,12.768 L11.808,12.972 L12.6,14.544 L12.156,15.624 L10.272,16.296 L10.272,17.856 L10.488,17.928 L12.156,18.48 L12.6,19.56 L11.736,21.372 L12.84,22.476 L13.044,22.368 L14.616,21.576 L15.696,22.02 L16.368,23.904 L17.928,23.904 L18,23.688 L18.552,22.02 L19.632,21.576 L21.444,22.428 L22.548,21.324 L22.44,21.12 L21.648,19.56 L22.092,18.48 L23.988,17.772 L23.988,17.772 L23.988,17.772 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Personalization Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: 'pe',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Predictive Email',
					categoryIcon: {
						category: 'custom',
						name: 'personalizationbuilder',
						background: '#D15878',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M13.344,9.972 C13.32,9.96 13.308,9.96 13.296,9.948 C12.372,9.54 11.016,8.484 9,8.124 C9.516,7.584 9.912,6.72 10.308,5.688 C10.536,5.1 10.5,4.596 10.5,3.876 C10.5,3.348 10.596,2.496 10.464,2.028 C10.02,0.432 8.904,0 7.584,0 C6.264,0 5.136,0.444 4.692,2.028 C4.56,2.496 4.668,3.348 4.668,3.876 C4.668,4.596 4.632,5.1 4.86,5.7 C5.268,6.72 5.652,7.584 6.156,8.136 C4.164,8.508 2.808,9.552 1.896,9.948 C0.012,10.8 0,11.712 0,11.712 L0,14.748 L9.456,14.748 C10.068,12.684 11.484,10.98 13.344,9.972 L13.344,9.972 Z'
												},
												{
													d: 'M17.124,20.136 C15.408,20.136 14.016,18.744 14.016,17.028 C14.016,15.312 15.408,13.92 17.124,13.92 C18.84,13.92 20.232,15.312 20.232,17.028 C20.244,18.744 18.84,20.136 17.124,20.136 L17.124,20.136 Z M23.988,17.772 L23.988,16.212 L23.772,16.14 L22.092,15.6 L21.648,14.532 L22.5,12.72 L21.396,11.616 L21.192,11.724 L19.632,12.516 L18.552,12.072 L17.88,10.188 L16.32,10.188 L16.248,10.404 L15.696,12.072 L14.616,12.516 L12.804,11.664 L11.7,12.768 L11.808,12.972 L12.6,14.544 L12.156,15.624 L10.272,16.296 L10.272,17.856 L10.488,17.928 L12.156,18.48 L12.6,19.56 L11.736,21.372 L12.84,22.476 L13.044,22.368 L14.616,21.576 L15.696,22.02 L16.368,23.904 L17.928,23.904 L18,23.688 L18.552,22.02 L19.632,21.576 L21.444,22.428 L22.548,21.324 L22.44,21.12 L21.648,19.56 L22.092,18.48 L23.988,17.772 L23.988,17.772 L23.988,17.772 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Personalization Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				}
			],
			localization: [
				{
					applicationUrl: '#/dashboard',
					appDescription: '',
					appName: 'Home',
					categoryIcon: {
						category: 'custom',
						name: 'home',
						background: '#ED8B00',
						SVGViewBox: '0 0 19 20',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M18.6197899,9.9032898 L16.6391319,9.9032898 L16.6391319,18.6181848 C16.6391319,18.8558638 16.4806793,19.0143164 16.2430003,19.0143164 L12.2816844,19.0143164 C12.0440055,19.0143164 11.8855528,18.8558638 11.8855528,18.6181848 L11.8855528,11.8839478 L7.13197371,11.8839478 L7.13197371,18.6181848 C7.13197371,18.8558638 6.97352108,19.0143164 6.73584212,19.0143164 L2.7745262,19.0143164 C2.53684725,19.0143164 2.37839461,18.8558638 2.37839461,18.6181848 L2.37839461,9.9032898 L0.397736652,9.9032898 C0.239284015,9.9032898 0.0808313784,9.82406348 0.0412182192,9.66561084 C-0.0380080991,9.50715821 0.00160506004,9.34870557 0.120444538,9.22986609 L9.23147115,0.118839478 C9.38992379,-0.0396131592 9.6672159,-0.0396131592 9.78605538,0.118839478 L18.897082,9.22986609 C19.0159215,9.34870557 19.0159215,9.50715821 18.9763083,9.66561084 C18.9366952,9.82406348 18.7782425,9.9032898 18.6197899,9.9032898 L18.6197899,9.9032898 Z'
									}
								}
							}
						}
					},
					categoryName: 'Marketing Cloud',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'http://www.marketingcloud.com/'
				},
				{
					applicationUrl: '#/pulse',
					appDescription: '',
					appName: 'Pulse',
					categoryIcon: {
						category: 'custom',
						name: 'dashboard',
						background: '#ED8B00',
						SVGViewBox: '0 0 26 26',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M12.5405405,22.3842724 C12.3783784,22.3842724 12.1621622,22.3302183 11.9459459,22.2221102 C11.6216216,22.059948 11.3513514,21.6815696 11.2972973,21.3572453 L8.21621622,8.87075884 L5.56756757,14.8167048 C5.40540541,15.3031913 4.97297297,15.5734615 4.48648649,15.5734615 L0.810810811,15.5734615 C0.378378378,15.5734615 0,15.2491372 0,14.8167048 L0,14.005894 C0,13.5734615 0.378378378,13.1950832 0.810810811,13.1950832 L3.62162162,13.1950832 L7.35135135,4.70859668 C7.56756757,4.27616424 8.05405405,3.95183992 8.59459459,4.00589397 C9.13513514,4.05994803 9.56756757,4.38427235 9.67567568,4.92481289 L12.8648649,17.5734615 L17.1351351,8.3302183 C17.3513514,7.84373181 17.8378378,7.57346154 18.3243243,7.6275156 C18.7567568,7.68156965 19.1891892,8.00589397 19.4054054,8.43832641 L21.5135135,13.2491372 L25.1891892,13.2491372 C25.6216216,13.2491372 26,13.6275156 26,14.059948 L26,14.8167048 C26,15.2491372 25.6216216,15.6275156 25.1891892,15.6275156 L20.7567568,15.6275156 C20.2702703,15.6275156 19.8378378,15.3572453 19.6216216,14.9248129 L18.2702703,11.8437318 L13.7297297,21.7356237 C13.4594595,22.1140021 13.0810811,22.3842724 12.5405405,22.3842724 L12.5405405,22.3842724 Z'
									}
								}
							}
						},
						noPadding: true
					},
					categoryName: 'Marketing Cloud',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'http://www.marketingcloud.com/'
				},
				{
					applicationUrl: 'pb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Playbooks',
					categoryIcon: {
						category: 'custom',
						name: 'playbooks',
						background: '#ED8B00',
						SVGViewBox: '0 0 20 20',
						SVGData: {
							g: {
								g: {
									path: [
										{
											d: 'M15.7083333,9.75 L16,9.45833333 C16.1666667,9.29166667 16.1666667,9.04166667 16.0416667,8.875 L12.7916667,5.25 C12.625,5.08333333 12.3333333,5.08333333 12.1666667,5.25 L8.875,8.83333333 C8.70833333,9 8.70833333,9.25 8.875,9.41666667 L9.16666667,9.70833333 C9.33333333,9.875 9.58333333,9.875 9.75,9.70833333 L11.0416667,8.29166667 C11.2916667,8 11.75,8.20833333 11.75,8.58333333 L11.75,9 C11.75,14.9166667 6.79166667,18.5833333 1.54166667,18.7916667 C1.375,18.75 1.25,18.9583333 1.25,19.1666667 L1.25,19.5833333 C1.25,19.8333333 1.375,20 1.625,20 C7.33333333,19.7916667 13.0833333,15.625 13.0833333,8.95833333 L13.0833333,8.5 C13.0833333,8.125 13.5416667,7.95833333 13.7916667,8.25 L15.125,9.75 C15.2916667,9.91666667 15.5416667,9.91666667 15.7083333,9.75 L15.7083333,9.75 Z'
										},
										{
											d: 'M7.04166667,6.45833333 C8.83333333,6.45833333 10.2916667,5 10.2916667,3.20833333 C10.2916667,1.41666667 8.83333333,0 7.04166667,0 C5.25,0 3.79166667,1.45833333 3.79166667,3.25 C3.79166667,5.04166667 5.25,6.45833333 7.04166667,6.45833333 L7.04166667,6.45833333 Z M7.04166667,1.25 C8.125,1.25 9.04166667,2.125 9.04166667,3.25 C9.04166667,4.375 8.16666667,5.25 7.04166667,5.25 C5.91666667,5.25 5.04166667,4.375 5.04166667,3.25 C5.04166667,2.125 5.95833333,1.25 7.04166667,1.25 L7.04166667,1.25 Z'
										},
										{
											d: 'M18.25,16.125 C18.0833333,15.9583333 18.0833333,15.7083333 18.25,15.5416667 L19.875,13.9166667 C20.0416667,13.75 20.0416667,13.5 19.875,13.3333333 L19.5833333,13 C19.4166667,12.8333333 19.1666667,12.8333333 19,13 L17.375,14.625 C17.2083333,14.7916667 16.9583333,14.7916667 16.7916667,14.625 L15.1666667,13 C15,12.8333333 14.75,12.8333333 14.5833333,13 L14.2916667,13.2916667 C14.125,13.4583333 14.125,13.7083333 14.2916667,13.875 L15.9166667,15.5 C16.0833333,15.6666667 16.0833333,15.9166667 15.9166667,16.0833333 L14.2916667,17.7083333 C14.125,17.875 14.125,18.125 14.2916667,18.2916667 L14.5833333,18.5833333 C14.75,18.75 15,18.75 15.1666667,18.5833333 L16.7916667,16.9583333 C16.9583333,16.7916667 17.2083333,16.7916667 17.375,16.9583333 L19,18.5833333 C19.1666667,18.75 19.4166667,18.75 19.5833333,18.5833333 L19.875,18.2916667 C20.0416667,18.125 20.0416667,17.875 19.875,17.7083333 L18.25,16.125 L18.25,16.125 Z'
										},
										{
											d: 'M3.25,12.7083333 L4.875,14.3333333 C5.04166667,14.5 5.29166667,14.5 5.45833333,14.3333333 L5.75,14.0416667 C5.91666667,13.875 5.91666667,13.625 5.75,13.4583333 L4.125,11.8333333 C3.95833333,11.6666667 3.95833333,11.4166667 4.125,11.25 L5.75,9.625 C5.91666667,9.45833333 5.91666667,9.20833333 5.75,9.04166667 L5.45833333,8.75 C5.29166667,8.58333333 5.04166667,8.58333333 4.875,8.75 L3.25,10.375 C3.08333333,10.5416667 2.83333333,10.5416667 2.66666667,10.375 L1.04166667,8.75 C0.875,8.58333333 0.625,8.58333333 0.458333333,8.75 L0.166666667,9.04166667 C-6.01370805e-16,9.20833333 -6.01370805e-16,9.45833333 0.166666667,9.625 L1.75,11.25 C1.91666667,11.4166667 1.91666667,11.6666667 1.75,11.8333333 L0.125,13.4583333 C-0.0416666667,13.625 -0.0416666667,13.875 0.125,14.0416667 L0.416666667,14.375 C0.583333333,14.5416667 0.833333333,14.5416667 1,14.375 L2.625,12.75 C2.79166667,12.5416667 3.08333333,12.5416667 3.25,12.7083333 L3.25,12.7083333 Z'
										}
									]
								}
							}
						}
					},
					categoryName: 'Playbooks',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: 'ca',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Calendar',
					categoryIcon: {
						category: 'custom',
						name: 'calendar',
						background: '#ED8B00',
						SVGViewBox: '0 0 18 20',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M17.3863636,7.36363636 L0.613636364,7.36363636 C0.286363636,7.36363636 0,7.65 0,7.97727273 L0,18 C0,18.9 0.736363636,19.6363636 1.63636364,19.6363636 L16.3636364,19.6363636 C17.2636364,19.6363636 18,18.9 18,18 L18,7.97727273 C18,7.65 17.7136364,7.36363636 17.3863636,7.36363636 L17.3863636,7.36363636 Z M6.13636364,16.3636364 C6.13636364,16.6090909 5.97272727,16.7727273 5.72727273,16.7727273 L4.09090909,16.7727273 C3.84545455,16.7727273 3.68181818,16.6090909 3.68181818,16.3636364 L3.68181818,14.7272727 C3.68181818,14.4818182 3.84545455,14.3181818 4.09090909,14.3181818 L5.72727273,14.3181818 C5.97272727,14.3181818 6.13636364,14.4818182 6.13636364,14.7272727 L6.13636364,16.3636364 L6.13636364,16.3636364 Z M6.13636364,12.2727273 C6.13636364,12.5181818 5.97272727,12.6818182 5.72727273,12.6818182 L4.09090909,12.6818182 C3.84545455,12.6818182 3.68181818,12.5181818 3.68181818,12.2727273 L3.68181818,10.6363636 C3.68181818,10.3909091 3.84545455,10.2272727 4.09090909,10.2272727 L5.72727273,10.2272727 C5.97272727,10.2272727 6.13636364,10.3909091 6.13636364,10.6363636 L6.13636364,12.2727273 L6.13636364,12.2727273 Z M10.2272727,16.3636364 C10.2272727,16.6090909 10.0636364,16.7727273 9.81818182,16.7727273 L8.18181818,16.7727273 C7.93636364,16.7727273 7.77272727,16.6090909 7.77272727,16.3636364 L7.77272727,14.7272727 C7.77272727,14.4818182 7.93636364,14.3181818 8.18181818,14.3181818 L9.81818182,14.3181818 C10.0636364,14.3181818 10.2272727,14.4818182 10.2272727,14.7272727 L10.2272727,16.3636364 L10.2272727,16.3636364 Z M10.2272727,12.2727273 C10.2272727,12.5181818 10.0636364,12.6818182 9.81818182,12.6818182 L8.18181818,12.6818182 C7.93636364,12.6818182 7.77272727,12.5181818 7.77272727,12.2727273 L7.77272727,10.6363636 C7.77272727,10.3909091 7.93636364,10.2272727 8.18181818,10.2272727 L9.81818182,10.2272727 C10.0636364,10.2272727 10.2272727,10.3909091 10.2272727,10.6363636 L10.2272727,12.2727273 L10.2272727,12.2727273 Z M14.3181818,16.3636364 C14.3181818,16.6090909 14.1545455,16.7727273 13.9090909,16.7727273 L12.2727273,16.7727273 C12.0272727,16.7727273 11.8636364,16.6090909 11.8636364,16.3636364 L11.8636364,14.7272727 C11.8636364,14.4818182 12.0272727,14.3181818 12.2727273,14.3181818 L13.9090909,14.3181818 C14.1545455,14.3181818 14.3181818,14.4818182 14.3181818,14.7272727 L14.3181818,16.3636364 L14.3181818,16.3636364 Z M14.3181818,12.2727273 C14.3181818,12.5181818 14.1545455,12.6818182 13.9090909,12.6818182 L12.2727273,12.6818182 C12.0272727,12.6818182 11.8636364,12.5181818 11.8636364,12.2727273 L11.8636364,10.6363636 C11.8636364,10.3909091 12.0272727,10.2272727 12.2727273,10.2272727 L13.9090909,10.2272727 C14.1545455,10.2272727 14.3181818,10.3909091 14.3181818,10.6363636 L14.3181818,12.2727273 L14.3181818,12.2727273 Z M16.3636364,2.04545455 L14.3181818,2.04545455 L14.3181818,1.22727273 C14.3181818,0.572727273 13.7863636,0 13.0909091,0 C12.4363636,0 11.8636364,0.531818182 11.8636364,1.22727273 L11.8636364,2.04545455 L6.13636364,2.04545455 L6.13636364,1.22727273 C6.13636364,0.572727273 5.60454545,0 4.90909091,0 C4.25454545,0 3.68181818,0.531818182 3.68181818,1.22727273 L3.68181818,2.04545455 L1.63636364,2.04545455 C0.736363636,2.04545455 0,2.78181818 0,3.68181818 L0,4.70454545 C0,5.03181818 0.286363636,5.31818182 0.613636364,5.31818182 L17.3863636,5.31818182 C17.7136364,5.31818182 18,5.03181818 18,4.70454545 L18,3.68181818 C18,2.78181818 17.2636364,2.04545455 16.3636364,2.04545455 L16.3636364,2.04545455 Z'
									}
								}
							}
						}
					},
					categoryName: 'Calendar',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: 'camp',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Campaigns',
					categoryIcon: {
						category: 'custom',
						name: 'campaigns',
						background: '#ED8B00',
						SVGViewBox: '0 0 21 22',
						SVGData: {
							g: {
								g: {
									path: {
										d: 'M8.87142857,19.2916392 L8.31428571,18.8571429 C7.71428571,18.4226465 7.71428571,17.5536537 7.71428571,17.1191573 L7.71428571,15.8591178 C7.71428571,15.5115207 7.41428571,15.2073733 7.07142857,15.2073733 L4.5,15.2073733 C4.15714286,15.2073733 3.85714286,15.5115207 3.85714286,15.8591178 L3.85714286,19.20474 C3.85714286,20.3778802 4.54285714,21.2903226 5.61428571,21.2903226 L7.71428571,21.2903226 C8.95714286,21.2903226 9.04285714,20.4213298 9.04285714,20.4213298 C9.04285714,20.4213298 9.25714286,19.6392363 8.87142857,19.2916392 L8.87142857,19.2916392 Z M18.4285714,7.38643845 L18.4285714,1.43383805 C18.4285714,0.391046741 17.1428571,0.0868992758 16.4571429,0.782093483 L12.6428571,4.43186307 C12.0428571,4.95325872 11.2714286,5.17050691 10.5,5.17050691 L3.98571429,5.17050691 C1.75714286,5.21395655 0,7.16919026 0,9.42857143 L0,9.5154707 C0,11.7748519 1.75714286,13.4693878 3.98571429,13.4693878 L10.5,13.4693878 C11.3142857,13.4693878 12.0857143,13.8169849 12.6857143,14.3383805 L16.4571429,18.0750494 C17.1428571,18.7702436 18.4285714,18.5095458 18.4285714,17.4667544 L18.4285714,11.5576037 C19.7142857,11.5576037 20.4857143,10.6451613 20.4857143,9.47202107 C20.4857143,8.29888084 19.7142857,7.38643845 18.4285714,7.38643845 L18.4285714,7.38643845 Z'
									}
								}
							}
						}
					},
					categoryName: 'Campaigns',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: '#/pulse',
					appDescription: '',
					appName: 'App w/ no Access',
					categoryIcon: {
						category: 'custom',
						name: 'dashboard',
						background: '#F69D01',
						SVGViewBox: '0 0 208 208',
						SVGData: {
							path: [
								{
									d: 'M104.75,60.28A27.82,27.82,0,1,1,76.93,88.1a27.85,27.85,0,0,1,27.82-27.82m0-10A37.82,37.82,0,1,0,142.57,88.1a37.82,37.82,0,0,0-37.82-37.82h0Z'
								},
								{
									d: 'M65.39,121.11L65.33,121,65.27,121a51.37,51.37,0,1,1,78.93,0l-0.07.08-0.07.08-22.62,28.27a45.72,45.72,0,0,1,9.2,4.51l21.23-26.54a61.37,61.37,0,1,0-94.29-.05L79.86,155.2a46,46,0,0,1,8.88-4.9Z'
								},
								{
									d: 'M169.24,165.84a55.64,55.64,0,0,0-22.76,4.84,47.23,47.23,0,0,0-15.83-16.73,45.57,45.57,0,0,0-50.78,1.26A46.93,46.93,0,0,0,73.11,161,50.72,50.72,0,0,0,0,153.14V208H208V181.49A55.79,55.79,0,0,0,169.24,165.84Z'
								}
							],
							circle: {
								cx: '104.75',
								cy: '88.1',
								r: '13.75'
							}
						},
						noPadding: true
					},
					categoryName: 'Marketing Cloud',
					cloudName: '',
					hasAccess: false,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'http://www.marketingcloud.com/'
				},
				{
					applicationUrl: '#/email-studio',
					appDescription: 'These are just a few of the words I want to say',
					appName: 'Email Studio',
					categoryIcon: {
						category: 'custom',
						name: 'emailstudio',
						background: '#E99056',
						SVGViewBox: '0 0 21 16',
						SVGData: {
							g: {
								g: {
									g: {
										path: {
											d: 'M18.8065967,-8.8817842e-16 L1.1994003,-8.8817842e-16 C0.539730135,-8.8817842e-16 0,0.551724138 0,1.22338831 L0,2.08695652 C0,2.18290855 0.035982009,2.26686657 0.107946027,2.32683658 L8.98350825,9.6071964 C8.98350825,9.6071964 8.98350825,9.6071964 8.99550225,9.6191904 C9.6071964,10.1589205 10.3868066,10.1589205 10.9985007,9.6191904 C10.9985007,9.6191904 10.9985007,9.6191904 11.0104948,9.6071964 L19.886057,2.32683658 C19.958021,2.26686657 19.994003,2.18290855 19.994003,2.08695652 L19.994003,1.23538231 C19.994003,0.551724138 19.4662669,-8.8817842e-16 18.8065967,-8.8817842e-16 L18.8065967,-8.8817842e-16 Z M0.011994003,3.92203898 C0.011994003,3.80209895 0.071964018,3.69415292 0.179910045,3.64617691 C0.287856072,3.5862069 0.407796102,3.6101949 0.503748126,3.69415292 L4.8095952,7.52023988 C4.86956522,7.56821589 4.90554723,7.64017991 4.90554723,7.73613193 C4.90554723,7.82008996 4.88155922,7.90404798 4.82158921,7.96401799 L0.515742129,12.029985 C0.431784108,12.125937 0.299850075,12.149925 0.191904048,12.101949 C0.071964018,12.053973 0.011994003,11.946027 0.011994003,11.814093 L0.011994003,3.92203898 L0.011994003,3.92203898 Z M0.011994003,13.7811094 C0.011994003,13.6971514 0.047976012,13.6131934 0.107946027,13.5532234 L5.52923538,8.50374813 C5.63718141,8.3958021 5.80509745,8.3958021 5.92503748,8.50374813 L8.21589205,10.5427286 C9.27136432,11.4902549 10.7226387,11.4782609 11.7781109,10.5427286 L14.0689655,8.50374813 C14.1889055,8.3958021 14.3568216,8.4077961 14.4647676,8.50374813 L19.886057,13.5532234 C19.946027,13.6131934 19.982009,13.6851574 19.982009,13.7811094 L19.982009,14.7646177 C19.982009,15.4482759 19.4422789,16 18.7826087,16 L1.1994003,16 C0.539730135,16 0,15.4482759 0,14.7646177 L0,13.7811094 L0.011994003,13.7811094 Z M19.994003,11.802099 C19.994003,11.934033 19.922039,12.041979 19.814093,12.089955 C19.6941529,12.137931 19.5742129,12.101949 19.4902549,12.017991 L15.1844078,7.95202399 C15.1244378,7.89205397 15.1004498,7.80809595 15.1004498,7.72413793 C15.1004498,7.64017991 15.1364318,7.55622189 15.2083958,7.50824588 L19.5142429,3.68215892 C19.5982009,3.6101949 19.7181409,3.5862069 19.826087,3.64617691 C19.934033,3.69415292 20.005997,3.80209895 20.005997,3.92203898 L20.005997,11.802099 L19.994003,11.802099 Z'
										}
									}
								}
							}
						}
					},
					categoryName: 'Email Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'distributed-sending',
					appDescription: 'This sentence is exactly fifty characters long end',
					appName: 'Distributed Sending',
					categoryIcon: {
						category: 'custom',
						name: 'emailstudio',
						background: '#E99056',
						SVGViewBox: '0 0 21 16',
						SVGData: {
							g: {
								g: {
									g: {
										path: {
											d: 'M18.8065967,-8.8817842e-16 L1.1994003,-8.8817842e-16 C0.539730135,-8.8817842e-16 0,0.551724138 0,1.22338831 L0,2.08695652 C0,2.18290855 0.035982009,2.26686657 0.107946027,2.32683658 L8.98350825,9.6071964 C8.98350825,9.6071964 8.98350825,9.6071964 8.99550225,9.6191904 C9.6071964,10.1589205 10.3868066,10.1589205 10.9985007,9.6191904 C10.9985007,9.6191904 10.9985007,9.6191904 11.0104948,9.6071964 L19.886057,2.32683658 C19.958021,2.26686657 19.994003,2.18290855 19.994003,2.08695652 L19.994003,1.23538231 C19.994003,0.551724138 19.4662669,-8.8817842e-16 18.8065967,-8.8817842e-16 L18.8065967,-8.8817842e-16 Z M0.011994003,3.92203898 C0.011994003,3.80209895 0.071964018,3.69415292 0.179910045,3.64617691 C0.287856072,3.5862069 0.407796102,3.6101949 0.503748126,3.69415292 L4.8095952,7.52023988 C4.86956522,7.56821589 4.90554723,7.64017991 4.90554723,7.73613193 C4.90554723,7.82008996 4.88155922,7.90404798 4.82158921,7.96401799 L0.515742129,12.029985 C0.431784108,12.125937 0.299850075,12.149925 0.191904048,12.101949 C0.071964018,12.053973 0.011994003,11.946027 0.011994003,11.814093 L0.011994003,3.92203898 L0.011994003,3.92203898 Z M0.011994003,13.7811094 C0.011994003,13.6971514 0.047976012,13.6131934 0.107946027,13.5532234 L5.52923538,8.50374813 C5.63718141,8.3958021 5.80509745,8.3958021 5.92503748,8.50374813 L8.21589205,10.5427286 C9.27136432,11.4902549 10.7226387,11.4782609 11.7781109,10.5427286 L14.0689655,8.50374813 C14.1889055,8.3958021 14.3568216,8.4077961 14.4647676,8.50374813 L19.886057,13.5532234 C19.946027,13.6131934 19.982009,13.6851574 19.982009,13.7811094 L19.982009,14.7646177 C19.982009,15.4482759 19.4422789,16 18.7826087,16 L1.1994003,16 C0.539730135,16 0,15.4482759 0,14.7646177 L0,13.7811094 L0.011994003,13.7811094 Z M19.994003,11.802099 C19.994003,11.934033 19.922039,12.041979 19.814093,12.089955 C19.6941529,12.137931 19.5742129,12.101949 19.4902549,12.017991 L15.1844078,7.95202399 C15.1244378,7.89205397 15.1004498,7.80809595 15.1004498,7.72413793 C15.1004498,7.64017991 15.1364318,7.55622189 15.2083958,7.50824588 L19.5142429,3.68215892 C19.5982009,3.6101949 19.7181409,3.5862069 19.826087,3.64617691 C19.934033,3.69415292 20.005997,3.80209895 20.005997,3.92203898 L20.005997,11.802099 L19.994003,11.802099 Z'
										}
									}
								}
							}
						}
					},
					categoryName: 'Email Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'mobile-push',
					appDescription: 'This sentence is exactly eighty characters long and goes on and on in the last o.',
					appName: 'MobilePush',
					categoryIcon: {
						category: 'custom',
						name: 'mobilestudio',
						background: '#0082E9',
						SVGViewBox: '0 0 14 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,0.893333333 L2.29333333,0.893333333 C1.01333333,0.893333333 0,1.86666667 0,3.10666667 L0,20.8533333 C0,22.08 1.01333333,23.12 2.29333333,23.12 L11.04,23.12 C12.3066667,23.12 13.3333333,22.0933333 13.3333333,20.8533333 L13.3333333,3.10666667 C13.3333333,1.86666667 12.32,0.893333333 11.04,0.893333333 L11.04,0.893333333 Z M5.04,2.17333333 L8.29333333,2.17333333 C8.4,2.17333333 8.49333333,2.26666667 8.49333333,2.37333333 C8.49333333,2.46666667 8.38666667,2.57333333 8.29333333,2.57333333 L5.04,2.57333333 C4.93333333,2.57333333 4.84,2.48 4.84,2.37333333 C4.84,2.26666667 4.93333333,2.17333333 5.04,2.17333333 L5.04,2.17333333 Z M7.93333333,21.5333333 C7.93333333,21.6266667 7.82666667,21.7333333 7.68,21.7333333 L5.6,21.7333333 C5.49333333,21.7333333 5.4,21.64 5.4,21.5333333 L5.4,20.6 C5.4,20.5066667 5.50666667,20.36 5.6,20.36 L7.68,20.36 C7.82666667,20.36 7.93333333,20.5066667 7.93333333,20.6 L7.93333333,21.5333333 L7.93333333,21.5333333 Z M12.0133333,18.7866667 C12.0133333,18.9333333 11.9066667,19.0266667 11.76,19.0266667 L1.57333333,19.0266667 C1.42666667,19.0266667 1.32,18.9333333 1.32,18.7866667 L1.32,4.04 C1.32,3.89333333 1.42666667,3.74666667 1.57333333,3.74666667 L11.7466667,3.74666667 C11.8933333,3.74666667 12,3.89333333 12,4.04 L12,18.7866667 L12.0133333,18.7866667 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Mobile Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'mobile-connect',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'MobileConnect',
					categoryIcon: {
						category: 'custom',
						name: 'mobilestudio',
						background: '#0082E9',
						SVGViewBox: '0 0 14 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,0.893333333 L2.29333333,0.893333333 C1.01333333,0.893333333 0,1.86666667 0,3.10666667 L0,20.8533333 C0,22.08 1.01333333,23.12 2.29333333,23.12 L11.04,23.12 C12.3066667,23.12 13.3333333,22.0933333 13.3333333,20.8533333 L13.3333333,3.10666667 C13.3333333,1.86666667 12.32,0.893333333 11.04,0.893333333 L11.04,0.893333333 Z M5.04,2.17333333 L8.29333333,2.17333333 C8.4,2.17333333 8.49333333,2.26666667 8.49333333,2.37333333 C8.49333333,2.46666667 8.38666667,2.57333333 8.29333333,2.57333333 L5.04,2.57333333 C4.93333333,2.57333333 4.84,2.48 4.84,2.37333333 C4.84,2.26666667 4.93333333,2.17333333 5.04,2.17333333 L5.04,2.17333333 Z M7.93333333,21.5333333 C7.93333333,21.6266667 7.82666667,21.7333333 7.68,21.7333333 L5.6,21.7333333 C5.49333333,21.7333333 5.4,21.64 5.4,21.5333333 L5.4,20.6 C5.4,20.5066667 5.50666667,20.36 5.6,20.36 L7.68,20.36 C7.82666667,20.36 7.93333333,20.5066667 7.93333333,20.6 L7.93333333,21.5333333 L7.93333333,21.5333333 Z M12.0133333,18.7866667 C12.0133333,18.9333333 11.9066667,19.0266667 11.76,19.0266667 L1.57333333,19.0266667 C1.42666667,19.0266667 1.32,18.9333333 1.32,18.7866667 L1.32,4.04 C1.32,3.89333333 1.42666667,3.74666667 1.57333333,3.74666667 L11.7466667,3.74666667 C11.8933333,3.74666667 12,3.89333333 12,4.04 L12,18.7866667 L12.0133333,18.7866667 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Mobile Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'group-connect',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'GroupConnect',
					categoryIcon: {
						category: 'custom',
						name: 'mobilestudio',
						background: '#0082E9',
						SVGViewBox: '0 0 14 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,0.893333333 L2.29333333,0.893333333 C1.01333333,0.893333333 0,1.86666667 0,3.10666667 L0,20.8533333 C0,22.08 1.01333333,23.12 2.29333333,23.12 L11.04,23.12 C12.3066667,23.12 13.3333333,22.0933333 13.3333333,20.8533333 L13.3333333,3.10666667 C13.3333333,1.86666667 12.32,0.893333333 11.04,0.893333333 L11.04,0.893333333 Z M5.04,2.17333333 L8.29333333,2.17333333 C8.4,2.17333333 8.49333333,2.26666667 8.49333333,2.37333333 C8.49333333,2.46666667 8.38666667,2.57333333 8.29333333,2.57333333 L5.04,2.57333333 C4.93333333,2.57333333 4.84,2.48 4.84,2.37333333 C4.84,2.26666667 4.93333333,2.17333333 5.04,2.17333333 L5.04,2.17333333 Z M7.93333333,21.5333333 C7.93333333,21.6266667 7.82666667,21.7333333 7.68,21.7333333 L5.6,21.7333333 C5.49333333,21.7333333 5.4,21.64 5.4,21.5333333 L5.4,20.6 C5.4,20.5066667 5.50666667,20.36 5.6,20.36 L7.68,20.36 C7.82666667,20.36 7.93333333,20.5066667 7.93333333,20.6 L7.93333333,21.5333333 L7.93333333,21.5333333 Z M12.0133333,18.7866667 C12.0133333,18.9333333 11.9066667,19.0266667 11.76,19.0266667 L1.57333333,19.0266667 C1.42666667,19.0266667 1.32,18.9333333 1.32,18.7866667 L1.32,4.04 C1.32,3.89333333 1.42666667,3.74666667 1.57333333,3.74666667 L11.7466667,3.74666667 C11.8933333,3.74666667 12,3.89333333 12,4.04 L12,18.7866667 L12.0133333,18.7866667 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Mobile Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'social-pages',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Social Pages',
					categoryIcon: {
						category: 'custom',
						name: 'socialstudio',
						background: '#C17ECB',
						SVGViewBox: '1 0 20 21',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,10.72 C8.17333333,10.0533333 5.21333333,10.0533333 2.34666667,10.72 C1.41333333,10.9733333 0.666666667,12.0133333 0.666666667,12.92 L0.666666667,14.6933333 C0.666666667,15.6133333 1.41333333,16.6533333 2.34666667,16.8933333 C2.61333333,16.96 2.88,17 3.14666667,17.0533333 L5.4,20.28 C5.81333333,20.8666667 6.14666667,20.76 6.14666667,20.04 L6.14666667,17.3733333 C7.78666667,17.4266667 9.44,17.2666667 11.04,16.8933333 C11.9733333,16.64 12.72,15.6 12.72,14.6933333 L12.72,12.92 C12.7333333,12.0133333 11.9866667,10.9733333 11.04,10.72 L11.04,10.72 Z M18.9866667,1.4 C15.0933333,0.426666667 11.04,0.426666667 7.14666667,1.4 C6.21333333,1.65333333 5.46666667,2.69333333 5.46666667,3.61333333 L5.46666667,6.76 C5.46666667,7.68 6.21333333,8.72 7.14666667,8.97333333 C9.32,9.52 11.5466667,9.74666667 13.76,9.68 L13.76,13.3866667 C13.76,14.0933333 14.0933333,14.2133333 14.4933333,13.6266667 L17.52,9.29333333 C18.0133333,9.2 18.4933333,9.09333333 18.9733333,8.97333333 C19.9066667,8.72 20.6533333,7.68 20.6533333,6.76 L20.6533333,3.61333333 C20.6666667,2.69333333 19.92,1.65333333 18.9866667,1.4 L18.9866667,1.4 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Social Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'social-studio',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Social Studio',
					categoryIcon: {
						category: 'custom',
						name: 'socialstudio',
						background: '#C17ECB',
						SVGViewBox: '1 0 20 21',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M11.04,10.72 C8.17333333,10.0533333 5.21333333,10.0533333 2.34666667,10.72 C1.41333333,10.9733333 0.666666667,12.0133333 0.666666667,12.92 L0.666666667,14.6933333 C0.666666667,15.6133333 1.41333333,16.6533333 2.34666667,16.8933333 C2.61333333,16.96 2.88,17 3.14666667,17.0533333 L5.4,20.28 C5.81333333,20.8666667 6.14666667,20.76 6.14666667,20.04 L6.14666667,17.3733333 C7.78666667,17.4266667 9.44,17.2666667 11.04,16.8933333 C11.9733333,16.64 12.72,15.6 12.72,14.6933333 L12.72,12.92 C12.7333333,12.0133333 11.9866667,10.9733333 11.04,10.72 L11.04,10.72 Z M18.9866667,1.4 C15.0933333,0.426666667 11.04,0.426666667 7.14666667,1.4 C6.21333333,1.65333333 5.46666667,2.69333333 5.46666667,3.61333333 L5.46666667,6.76 C5.46666667,7.68 6.21333333,8.72 7.14666667,8.97333333 C9.32,9.52 11.5466667,9.74666667 13.76,9.68 L13.76,13.3866667 C13.76,14.0933333 14.0933333,14.2133333 14.4933333,13.6266667 L17.52,9.29333333 C18.0133333,9.2 18.4933333,9.09333333 18.9733333,8.97333333 C19.9066667,8.72 20.6533333,7.68 20.6533333,6.76 L20.6533333,3.61333333 C20.6666667,2.69333333 19.92,1.65333333 18.9866667,1.4 L18.9866667,1.4 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Social Studio',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: true,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: true,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'wma',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Web & Mobile Analytics',
					categoryIcon: {
						category: 'custom',
						name: 'analyticsbuilder',
						background: '#4AB8AA',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: [
													{
														d: 'M4.6,15.6266667 L1.33333333,15.6266667 C1.09333333,15.6266667 0.893333333,15.8133333 0.893333333,16.0533333 L0.893333333,22.68 C0.893333333,22.92 1.09333333,23.1066667 1.33333333,23.1066667 L4.6,23.1066667 C4.84,23.1066667 5.04,22.92 5.04,22.68 L5.04,16.0533333 C5.05333333,15.8266667 4.85333333,15.6266667 4.6,15.6266667 L4.6,15.6266667 Z'
													},
													{
														d: 'M10.6266667,13.5866667 L7.36,13.5866667 C7.12,13.5866667 6.92,13.7733333 6.92,14.0133333 L6.92,22.6933333 C6.92,22.9333333 7.12,23.12 7.36,23.12 L10.6266667,23.12 C10.8666667,23.12 11.0666667,22.9333333 11.0666667,22.6933333 L11.0666667,14.0133333 C11.0666667,13.7733333 10.8666667,13.5866667 10.6266667,13.5866667 L10.6266667,13.5866667 Z'
													},
													{
														d: 'M16.64,6.09333333 L13.3733333,6.09333333 C13.1333333,6.09333333 12.9333333,6.28 12.9333333,6.52 L12.9333333,22.6933333 C12.9333333,22.9333333 13.1333333,23.12 13.3733333,23.12 L16.64,23.12 C16.88,23.12 17.08,22.9333333 17.08,22.6933333 L17.08,6.52 C17.0933333,6.28 16.8933333,6.09333333 16.64,6.09333333 L16.64,6.09333333 Z'
													},
													{
														d: 'M22.6666667,0.893333333 L19.4,0.893333333 C19.16,0.893333333 18.96,1.08 18.96,1.32 L18.96,22.6933333 C18.96,22.9333333 19.16,23.12 19.4,23.12 L22.6666667,23.12 C22.9066667,23.12 23.1066667,22.9333333 23.1066667,22.6933333 L23.1066667,1.32 C23.1066667,1.08 22.9066667,0.893333333 22.6666667,0.893333333 L22.6666667,0.893333333 Z'
													}
												]
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Analytics Builder',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'mc-reports',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Reports',
					categoryIcon: {
						category: 'custom',
						name: 'analyticsbuilder',
						background: '#4AB8AA',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: [
													{
														d: 'M4.6,15.6266667 L1.33333333,15.6266667 C1.09333333,15.6266667 0.893333333,15.8133333 0.893333333,16.0533333 L0.893333333,22.68 C0.893333333,22.92 1.09333333,23.1066667 1.33333333,23.1066667 L4.6,23.1066667 C4.84,23.1066667 5.04,22.92 5.04,22.68 L5.04,16.0533333 C5.05333333,15.8266667 4.85333333,15.6266667 4.6,15.6266667 L4.6,15.6266667 Z'
													},
													{
														d: 'M10.6266667,13.5866667 L7.36,13.5866667 C7.12,13.5866667 6.92,13.7733333 6.92,14.0133333 L6.92,22.6933333 C6.92,22.9333333 7.12,23.12 7.36,23.12 L10.6266667,23.12 C10.8666667,23.12 11.0666667,22.9333333 11.0666667,22.6933333 L11.0666667,14.0133333 C11.0666667,13.7733333 10.8666667,13.5866667 10.6266667,13.5866667 L10.6266667,13.5866667 Z'
													},
													{
														d: 'M16.64,6.09333333 L13.3733333,6.09333333 C13.1333333,6.09333333 12.9333333,6.28 12.9333333,6.52 L12.9333333,22.6933333 C12.9333333,22.9333333 13.1333333,23.12 13.3733333,23.12 L16.64,23.12 C16.88,23.12 17.08,22.9333333 17.08,22.6933333 L17.08,6.52 C17.0933333,6.28 16.8933333,6.09333333 16.64,6.09333333 L16.64,6.09333333 Z'
													},
													{
														d: 'M22.6666667,0.893333333 L19.4,0.893333333 C19.16,0.893333333 18.96,1.08 18.96,1.32 L18.96,22.6933333 C18.96,22.9333333 19.16,23.12 19.4,23.12 L22.6666667,23.12 C22.9066667,23.12 23.1066667,22.9333333 23.1066667,22.6933333 L23.1066667,1.32 C23.1066667,1.08 22.9066667,0.893333333 22.6666667,0.893333333 L22.6666667,0.893333333 Z'
													}
												]
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Analytics Builder',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {
						applicationId: '45372cbb-06e0-438e-88d8-008981f7a18b',
						applicationGroupId: 12,
						applicationUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
						helpUrl: '',
						hasAccess: false,
						iconUrl: 'https://resource.s1.marketingcloud…81f7a18b/icon',
						isAlwaysVisible: false,
						isExpired: false,
						isProvisioned: false,
						isSubscribed: true,
						isVisibleImh: true,
						logoutUrl: 'https://app.igodogital.com/etlogout',
						name: 'Email Studio'
					}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Journey Builder',
					categoryIcon: {
						category: 'custom',
						name: 'journeybuilder',
						background: '#68AED3',
						SVGViewBox: '0 0 17 23',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M8.4,0.996 C3.984,0.996 0.396,4.62 0.396,9.096 C0.396,15.66 8.4,22.992 8.4,22.992 C8.4,22.992 16.404,15.372 16.404,9.096 C16.404,4.632 12.816,0.996 8.4,0.996 L8.4,0.996 Z M8.4,12.576 C6.504,12.576 4.968,11.016 4.968,9.108 C4.968,7.2 6.504,5.628 8.4,5.628 C10.296,5.628 11.832,7.188 11.832,9.096 C11.832,11.004 10.296,12.576 8.4,12.576 L8.4,12.576 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Journey Builder',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Platform',
					categoryIcon: {
						category: 'custom',
						name: 'platform',
						background: '#E2B90A',
						SVGViewBox: '0 0 23 15',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: {
												d: 'M22.6666667,6.30133333 L22.1453333,5.49666667 L20.5926667,6.16533333 C18.5866667,2.93533333 14.9146667,0.566666667 11.084,0.566666667 C5.38333333,0.566666667 0,5.814 0,11.3673333 C0,11.4806667 0.0113333333,11.594 0.0113333333,11.7073333 L0.034,12.1606667 L2.754,12.1606667 L2.72,11.7073333 C2.70866667,11.594 2.70866667,11.492 2.70866667,11.3786667 C2.70866667,6.89066667 6.46,3.23 11.0726667,3.23 C14.1213333,3.23 16.7846667,4.828 18.2466667,7.19666667 L12.9313333,9.50866667 C12.0133333,8.738 10.6646667,8.54533333 9.52,9.13466667 C8.024,9.894 7.446,11.696 8.23933333,13.158 C9.02133333,14.62 10.8686667,15.1753333 12.3646667,14.416 C13.5093333,13.8266667 14.11,12.648 13.9853333,11.4693333 L18.9153333,8.54533333 C19.2553333,9.42933333 19.448,10.3813333 19.448,11.39 C19.448,11.5033333 19.4366667,11.6166667 19.4366667,11.7186667 L19.4026667,12.172 L22.1226667,12.172 L22.1453333,11.7186667 C22.1566667,11.6053333 22.1566667,11.5033333 22.1566667,11.3786667 C22.1566667,9.93933333 21.7826667,8.52266667 21.148,7.208 L22.6666667,6.30133333 L22.6666667,6.30133333 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Platform',
					cloudName: '',
					hasAccess: true,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'HubExchange',
					categoryIcon: {
						category: 'custom',
						name: 'hubexchange',
						background: '#DF6861',
						SVGViewBox: '0 0 26 22',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M12.4,15.8133333 L12.5866667,14.56 L14.3466667,13.36 L13.96,11.7066667 L13.72,11.6933333 L11.8666667,11.5466667 L11.1466667,10.5333333 L11.56,8.4 L10.16,7.50666667 L9.98666667,7.68 L8.58666667,8.92 L7.38666667,8.73333333 L6.21333333,6.92 L4.62666667,7.32 L4.61333333,7.57333333 L4.48,9.48 L3.49333333,10.2266667 L1.42666667,9.78666667 L0.573333333,11.24 L0.733333333,11.4266667 L1.93333333,12.88 L1.76,14.1333333 L0,15.3333333 L0.386666667,16.9733333 L0.626666667,17 L2.46666667,17.1466667 L3.18666667,18.16 L2.76,20.2933333 L4.16,21.1733333 L4.34666667,21.0133333 L5.74666667,19.76 L6.94666667,19.9466667 L8.10666667,21.76 L9.69333333,21.36 L9.70666667,21.1066667 L9.84,19.2 L10.8266667,18.4533333 L12.88,18.8933333 L13.7333333,17.44 L13.5733333,17.2533333 L12.4,15.8133333 L12.4,15.8133333 Z M9.96,16.1066667 C9.02666667,17.7066667 7.02666667,18.2133333 5.48,17.24 C3.94666667,16.2666667 3.45333333,14.2 4.37333333,12.6 C5.30666667,11 7.30666667,10.4933333 8.85333333,11.4533333 C10.4,12.4266667 10.8933333,14.5066667 9.96,16.1066667 L9.96,16.1066667 Z'
												},
												{
													d: 'M24.7333333,9.56 L24.92,8.30666667 L26.6666667,7.10666667 L26.28,5.46666667 L26.04,5.45333333 L24.2,5.30666667 L23.4666667,4.28 L23.88,2.14666667 L22.48,1.26666667 L22.2933333,1.42666667 L20.8933333,2.66666667 L19.6933333,2.48 L18.5466667,0.666666667 L16.96,1.06666667 L16.9333333,1.32 L16.8,3.22666667 L15.8133333,3.97333333 L13.76,3.53333333 L12.9066667,4.98666667 L13.0666667,5.18666667 L14.2666667,6.64 L14.08,7.89333333 L12.3333333,9.09333333 L12.72,10.7333333 L12.96,10.7466667 L14.8,10.8933333 L15.52,11.92 L15.0933333,14.0533333 L16.4933333,14.9333333 L16.68,14.7733333 L18.08,13.52 L19.28,13.7066667 L20.44,15.52 L22.0266667,15.12 L22.04,14.8666667 L22.1733333,12.96 L23.16,12.2133333 L25.2266667,12.6533333 L26.08,11.2 L25.92,11.0133333 L24.7333333,9.56 L24.7333333,9.56 Z M22.28,9.85333333 C21.3466667,11.4533333 19.3466667,11.96 17.8,10.9866667 C16.2533333,10.0133333 15.7733333,7.93333333 16.7066667,6.34666667 C17.64,4.74666667 19.64,4.24 21.1866667,5.2 C22.7333333,6.16 23.2133333,8.25333333 22.28,9.85333333 L22.28,9.85333333 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'HubExchange',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Content Builder',
					categoryIcon: {
						category: 'custom',
						name: 'contentbuilder',
						background: '#7A79AC',
						SVGViewBox: '0 0 24 28',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M22.3,0.66 L1.7,0.66 C0.94,0.66 0.32,1.3 0.32,2.06 L0.32,9.08 L23.66,9.08 L23.66,2.08 C23.66,1.3 23.04,0.66 22.3,0.66 L22.3,0.66 Z'
												},
												{
													d: 'M9.94,10.5 L9.94,27.34 L22.3,27.34 C23.06,27.34 23.68,26.7 23.68,25.94 L23.68,10.5 L9.94,10.5 L9.94,10.5 Z'
												},
												{
													d: 'M0.34,10.5 L0.34,25.94 C0.34,26.72 0.96,27.34 1.72,27.34 L8.58,27.34 L8.58,10.5 L0.34,10.5 L0.34,10.5 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Content Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Advertising Studio',
					categoryIcon: {
						category: 'custom',
						name: 'advertisingstudio',
						background: '#DC6A87',
						SVGViewBox: '0 0 25 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: {
													d: 'M10.2,19.716 C10.416,19.62 10.668,19.476 10.98,19.308 C11.604,18.96 12.384,18.516 13.344,18.18 C13.116,17.748 12.912,17.244 12.684,16.668 C12.672,16.632 12.66,16.584 12.648,16.548 C11.832,16.884 10.944,17.076 9.996,17.076 C6.132,17.076 3,13.932 3,10.08 C3,6.228 6.144,3.084 9.996,3.084 C13.68,3.084 16.704,5.952 16.968,9.564 C18.54,9.732 19.428,10.512 19.896,11.376 C19.956,10.944 19.992,10.512 19.992,10.068 C19.992,4.548 15.516,0.072 9.996,0.072 C4.476,0.072 0,4.548 0,10.068 C0,15.444 4.236,19.812 9.552,20.04 C9.756,19.932 9.96,19.824 10.2,19.716 L10.2,19.716 Z'
												},
												circle: {
													cx: '9.996',
													cy: '10.068',
													r: '3'
												}
											},
											path: {
												d: 'M22.188,20.616 C21.252,20.196 19.872,19.128 17.82,18.768 C18.348,18.204 18.744,17.328 19.152,16.284 C19.392,15.684 19.344,15.168 19.344,14.436 C19.344,13.896 19.44,13.032 19.308,12.552 C18.852,10.944 17.712,10.5 16.38,10.5 C15.036,10.5 13.896,10.944 13.44,12.564 C13.308,13.044 13.404,13.908 13.404,14.448 C13.404,15.18 13.368,15.696 13.596,16.296 C14.004,17.34 14.4,18.216 14.916,18.78 C12.888,19.152 11.508,20.22 10.584,20.628 C8.664,21.48 8.652,22.416 8.652,22.416 L8.652,24 L24.096,24 L24.096,22.416 C24.12,22.404 24.12,21.468 22.188,20.616 L22.188,20.616 Z'
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Advertising Studio',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Web Studio',
					categoryIcon: {
						category: 'custom',
						name: 'webstudio',
						background: '#4EAE7D',
						SVGViewBox: '0 0 22 18',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M2.94666667,11.6666667 L18.4,11.6666667 C18.5066667,11.6666667 18.6,11.56 18.6,11.4533333 L18.6,0.773333333 C18.6,0.546666667 18.4266667,0.44 18.2,0.44 L3.14666667,0.44 C2.93333333,0.44 2.70666667,0.546666667 2.70666667,0.773333333 L2.70666667,11.4533333 C2.69333333,11.56 2.84,11.6666667 2.94666667,11.6666667 L2.94666667,11.6666667 Z M4.25333333,2.22666667 C4.25333333,2.12 4.34666667,2.02666667 4.45333333,2.02666667 L16.84,2.02666667 C16.9466667,2.02666667 17.04,2.12 17.04,2.22666667 L17.04,9.89333333 C17.04,10 16.9466667,10.0933333 16.84,10.0933333 L4.45333333,10.0933333 C4.34666667,10.0933333 4.25333333,10 4.25333333,9.89333333 L4.25333333,2.22666667 L4.25333333,2.22666667 Z'
												},
												{
													d: 'M20.6133333,16.4933333 L18.64,12.4933333 C18.6,12.4266667 18.5333333,12.3733333 18.4666667,12.3733333 L2.85333333,12.3733333 C2.78666667,12.3733333 2.72,12.4266667 2.68,12.4933333 L0.706666667,16.4933333 C0.56,16.76 0.746666667,17.12 1.05333333,17.12 L20.2666667,17.12 C20.5733333,17.1066667 20.76,16.76 20.6133333,16.4933333 L20.6133333,16.4933333 Z M12.68,16.24 L8.65333333,16.24 C8.57333333,16.24 8.52,16.12 8.56,16.0533333 L9.13333333,14.96 C9.17333333,14.8933333 9.24,14.84 9.30666667,14.84 L12.0133333,14.84 C12.08,14.84 12.1466667,14.88 12.1866667,14.9333333 L12.76,16.0533333 C12.8,16.12 12.76,16.24 12.68,16.24 L12.68,16.24 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Web Studio',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'jb',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Audience Builder',
					categoryIcon: {
						category: 'custom',
						name: 'audiencebuilder',
						background: '#FD90B5',
						SVGViewBox: '0 0 25 16',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											g: {
												path: [
													{
														d: 'M22.751746,10.1453968 C22.088254,9.83174603 21.1111111,9.03555556 19.6634921,8.77015873 C20.0374603,8.34793651 20.3149206,7.69650794 20.6044444,6.92444444 C20.7733333,6.47809524 20.7492063,6.09206349 20.7492063,5.54920635 C20.7492063,5.15111111 20.8215873,4.49968254 20.7250794,4.13777778 C20.3993651,2.93142857 19.5911111,2.60571429 18.6501587,2.60571429 C17.6971429,2.60571429 16.8888889,2.94349206 16.5752381,4.13777778 C16.4787302,4.48761905 16.5511111,5.13904762 16.5511111,5.53714286 C16.5511111,6.08 16.5269841,6.46603175 16.695873,6.92444444 C16.9853968,7.70857143 17.2628571,8.36 17.6368254,8.77015873 C16.8406349,8.92698413 16.1892063,9.24063492 15.6463492,9.54222222 C16.4666667,9.88 17.1542857,10.2901587 17.7092063,10.615873 C18.0349206,10.8088889 18.3244444,10.9777778 18.5536508,11.0863492 C19.6634921,11.6050794 20.2787302,12.1720635 20.6406349,12.6787302 L24.1390476,12.6787302 L24.1390476,11.4965079 C24.1269841,11.4844444 24.1149206,10.7847619 22.751746,10.1453968 L22.751746,10.1453968 Z'
													},
													{
														d: 'M5.57333333,11.0863492 C5.80253968,10.9777778 6.09206349,10.8088889 6.41777778,10.615873 C6.9847619,10.2780952 7.67238095,9.88 8.49269841,9.54222222 C7.94984127,9.24063492 7.28634921,8.92698413 6.47809524,8.77015873 C6.85206349,8.34793651 7.12952381,7.69650794 7.41904762,6.92444444 C7.58793651,6.47809524 7.56380952,6.09206349 7.56380952,5.54920635 C7.56380952,5.15111111 7.63619048,4.49968254 7.53968254,4.13777778 C7.21396825,2.93142857 6.40571429,2.60571429 5.4647619,2.60571429 C4.51174603,2.60571429 3.70349206,2.94349206 3.38984127,4.13777778 C3.28126984,4.48761905 3.35365079,5.13904762 3.35365079,5.53714286 C3.35365079,6.08 3.32952381,6.46603175 3.4984127,6.92444444 C3.78793651,7.70857143 4.06539683,8.36 4.43936508,8.77015873 C3.00380952,9.04761905 2.02666667,9.84380952 1.3752381,10.1453968 C0.0120634921,10.7847619 0,11.4844444 0,11.4844444 L0,12.6666667 L3.4984127,12.6666667 C3.86031746,12.184127 4.47555556,11.6050794 5.57333333,11.0863492 L5.57333333,11.0863492 Z'
													},
													{
														d: 'M18.2038095,11.8946032 C17.2146032,11.4361905 15.7428571,10.2419048 13.5714286,9.83174603 C14.1263492,9.20444444 14.5485714,8.22730159 14.9828571,7.06920635 C15.2361905,6.39365079 15.1879365,5.82666667 15.1879365,5.00634921 C15.1879365,4.4031746 15.2965079,3.43809524 15.151746,2.90730159 C14.6692063,1.10984127 13.4628571,0.615238095 12.0393651,0.615238095 C10.615873,0.615238095 9.40952381,1.10984127 8.92698413,2.91936508 C8.79428571,3.43809524 8.90285714,4.4031746 8.90285714,5.00634921 C8.90285714,5.82666667 8.86666667,6.40571429 9.10793651,7.06920635 C9.54222222,8.23936508 9.95238095,9.21650794 10.5073016,9.84380952 C8.34793651,10.2660317 6.90031746,11.448254 5.91111111,11.9066667 C3.87238095,12.8596825 3.87238095,13.9092063 3.87238095,13.9092063 L3.87238095,15.6825397 L20.2425397,15.6825397 L20.2425397,13.9092063 C20.2546032,13.9092063 20.2425397,12.8596825 18.2038095,11.8946032 L18.2038095,11.8946032 Z'
													}
												]
											}
										}
									}
								}
							}
						}
					},
					categoryName: 'Audience Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: 'https://mc.s8.exacttarget.com/cloud/tools/SSO.aspx?appId=45372cbb-06e0-438e-88d8-008981f7a18b&env=default&legacy=1',
					data: {}
				},
				{
					applicationUrl: 'pw',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Predictive Web',
					categoryIcon: {
						category: 'custom',
						name: 'personalizationbuilder',
						background: '#0079BC',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M13.344,9.972 C13.32,9.96 13.308,9.96 13.296,9.948 C12.372,9.54 11.016,8.484 9,8.124 C9.516,7.584 9.912,6.72 10.308,5.688 C10.536,5.1 10.5,4.596 10.5,3.876 C10.5,3.348 10.596,2.496 10.464,2.028 C10.02,0.432 8.904,0 7.584,0 C6.264,0 5.136,0.444 4.692,2.028 C4.56,2.496 4.668,3.348 4.668,3.876 C4.668,4.596 4.632,5.1 4.86,5.7 C5.268,6.72 5.652,7.584 6.156,8.136 C4.164,8.508 2.808,9.552 1.896,9.948 C0.012,10.8 0,11.712 0,11.712 L0,14.748 L9.456,14.748 C10.068,12.684 11.484,10.98 13.344,9.972 L13.344,9.972 Z'
												},
												{
													d: 'M17.124,20.136 C15.408,20.136 14.016,18.744 14.016,17.028 C14.016,15.312 15.408,13.92 17.124,13.92 C18.84,13.92 20.232,15.312 20.232,17.028 C20.244,18.744 18.84,20.136 17.124,20.136 L17.124,20.136 Z M23.988,17.772 L23.988,16.212 L23.772,16.14 L22.092,15.6 L21.648,14.532 L22.5,12.72 L21.396,11.616 L21.192,11.724 L19.632,12.516 L18.552,12.072 L17.88,10.188 L16.32,10.188 L16.248,10.404 L15.696,12.072 L14.616,12.516 L12.804,11.664 L11.7,12.768 L11.808,12.972 L12.6,14.544 L12.156,15.624 L10.272,16.296 L10.272,17.856 L10.488,17.928 L12.156,18.48 L12.6,19.56 L11.736,21.372 L12.84,22.476 L13.044,22.368 L14.616,21.576 L15.696,22.02 L16.368,23.904 L17.928,23.904 L18,23.688 L18.552,22.02 L19.632,21.576 L21.444,22.428 L22.548,21.324 L22.44,21.12 L21.648,19.56 L22.092,18.48 L23.988,17.772 L23.988,17.772 L23.988,17.772 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Personalization Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: false,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				},
				{
					applicationUrl: 'pe',
					appDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					appName: 'Predictive Email',
					categoryIcon: {
						category: 'custom',
						name: 'personalizationbuilder',
						background: '#D15878',
						SVGViewBox: '0 0 24 24',
						SVGData: {
							g: {
								g: {
									g: {
										g: {
											path: [
												{
													d: 'M13.344,9.972 C13.32,9.96 13.308,9.96 13.296,9.948 C12.372,9.54 11.016,8.484 9,8.124 C9.516,7.584 9.912,6.72 10.308,5.688 C10.536,5.1 10.5,4.596 10.5,3.876 C10.5,3.348 10.596,2.496 10.464,2.028 C10.02,0.432 8.904,0 7.584,0 C6.264,0 5.136,0.444 4.692,2.028 C4.56,2.496 4.668,3.348 4.668,3.876 C4.668,4.596 4.632,5.1 4.86,5.7 C5.268,6.72 5.652,7.584 6.156,8.136 C4.164,8.508 2.808,9.552 1.896,9.948 C0.012,10.8 0,11.712 0,11.712 L0,14.748 L9.456,14.748 C10.068,12.684 11.484,10.98 13.344,9.972 L13.344,9.972 Z'
												},
												{
													d: 'M17.124,20.136 C15.408,20.136 14.016,18.744 14.016,17.028 C14.016,15.312 15.408,13.92 17.124,13.92 C18.84,13.92 20.232,15.312 20.232,17.028 C20.244,18.744 18.84,20.136 17.124,20.136 L17.124,20.136 Z M23.988,17.772 L23.988,16.212 L23.772,16.14 L22.092,15.6 L21.648,14.532 L22.5,12.72 L21.396,11.616 L21.192,11.724 L19.632,12.516 L18.552,12.072 L17.88,10.188 L16.32,10.188 L16.248,10.404 L15.696,12.072 L14.616,12.516 L12.804,11.664 L11.7,12.768 L11.808,12.972 L12.6,14.544 L12.156,15.624 L10.272,16.296 L10.272,17.856 L10.488,17.928 L12.156,18.48 L12.6,19.56 L11.736,21.372 L12.84,22.476 L13.044,22.368 L14.616,21.576 L15.696,22.02 L16.368,23.904 L17.928,23.904 L18,23.688 L18.552,22.02 L19.632,21.576 L21.444,22.428 L22.548,21.324 L22.44,21.12 L21.648,19.56 L22.092,18.48 L23.988,17.772 L23.988,17.772 L23.988,17.772 Z'
												}
											]
										}
									}
								}
							}
						}
					},
					categoryName: 'Personalization Builder',
					cloudName: '',
					hasAccess: false,
					isProvisioned: true,
					isVisibleImh: true,
					productUrl: '',
					data: {}
				}
			]
		};
	},

	/* eslint-enable max-len */

	render () {
		return (
			<AppLauncher
				collection={this.state.collection}
				modalIsOpen
				{...this.props}
			/>
		);
	}
});

storiesOf(APP_LAUNCHER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => <DemoAppLauncher />);
