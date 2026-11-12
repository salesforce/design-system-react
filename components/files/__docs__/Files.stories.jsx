import IconSettings from '../../icon-settings';
import Files from '../';
import File from '../file';
import Icon from '../../icon';

export default {
	title: 'Components/Files',
	component: Files,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		crop: {
			control: { type: 'select' },
			options: ['16-by-9', '4-by-3', '1-by-1'],
		},
	},
};

// Default files grid
export const Default = {
	render: () => (
		<Files>
			<File
				id="file-1"
				labels={{ title: 'Sales Presentation.pptx' }}
				assistiveText={{ image: 'Sales Presentation' }}
				icon={<Icon category="doctype" name="ppt" />}
				image="/assets/images/placeholder-img@16x9.jpg"
			/>
			<File
				id="file-2"
				labels={{ title: 'Q4 Report.pdf' }}
				assistiveText={{ image: 'Q4 Report' }}
				icon={<Icon category="doctype" name="pdf" />}
				image="/assets/images/placeholder-img@16x9.jpg"
			/>
			<File
				id="file-3"
				labels={{ title: 'Budget.xlsx' }}
				assistiveText={{ image: 'Budget' }}
				icon={<Icon category="doctype" name="excel" />}
				image="/assets/images/placeholder-img@16x9.jpg"
			/>
		</Files>
	),
};

// 16 by 9 crop
export const Crop16By9 = {
	render: () => (
		<Files crop="16-by-9">
			<File
				id="file-1"
				labels={{ title: 'Video.mp4' }}
				assistiveText={{ image: 'Video' }}
				icon={<Icon category="doctype" name="video" />}
				image="/assets/images/placeholder-img@16x9.jpg"
				crop="16-by-9"
			/>
			<File
				id="file-2"
				labels={{ title: 'Webinar.mp4' }}
				assistiveText={{ image: 'Webinar' }}
				icon={<Icon category="doctype" name="video" />}
				image="/assets/images/placeholder-img@16x9.jpg"
				crop="16-by-9"
			/>
		</Files>
	),
};

// 1 by 1 crop (square)
export const Crop1By1 = {
	render: () => (
		<Files crop="1-by-1">
			<File
				id="file-1"
				labels={{ title: 'Avatar.png' }}
				assistiveText={{ image: 'Avatar' }}
				icon={<Icon category="doctype" name="image" />}
				image="/assets/images/placeholder-img@16x9.jpg"
				crop="1-by-1"
			/>
			<File
				id="file-2"
				labels={{ title: 'Logo.svg' }}
				assistiveText={{ image: 'Logo' }}
				icon={<Icon category="doctype" name="image" />}
				image="/assets/images/placeholder-img@16x9.jpg"
				crop="1-by-1"
			/>
			<File
				id="file-3"
				labels={{ title: 'Icon.png' }}
				assistiveText={{ image: 'Icon' }}
				icon={<Icon category="doctype" name="image" />}
				image="/assets/images/placeholder-img@16x9.jpg"
				crop="1-by-1"
			/>
		</Files>
	),
};
