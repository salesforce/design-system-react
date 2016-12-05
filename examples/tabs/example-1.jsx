import Tabs from 'design-system-react/components/tabs';
import Panel from 'design-system-react/components/tabs/panel';

<Tabs id="tabs-example-1">
	<TabsPanel label="Tab 1">
		<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
		<p>And they&rsquo;re amazing.</p>
		<p>It's awesome.</p>
		<p>You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate around. Try it!</p>
		<p className="slds-box slds-theme--info slds-m-top--large">
			(You might have to hit shift+tab to put the focus onto the tab bar ;)
		</p>
	</TabsPanel>
	<TabsPanel label="Tab 2">
		<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
		<p>And they&rsquo;re also amazing.</p>
	</TabsPanel>
	<TabsPanel label="Tab 3">
		<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
		<p>And they&rsquo;re quite spectacular.</p>
	</TabsPanel>
</Tabs>
