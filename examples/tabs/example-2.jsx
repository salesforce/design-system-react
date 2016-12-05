import Tabs from 'design-system-react/components/tabs';
import Panel from 'design-system-react/components/tabs/panel';

<Tabs id="tabs-example-1">
	<TabsPanel label="Tab 1">
		<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
		<p>Note that &ldquo;Tab 2&rdquo; is disabled.</p>
		<p>You can make a tab disabled by adding the <code>disabled</code> prop to the <code>Panel</code> element.</p>
	</TabsPanel>
	<TabsPanel label="Tab 2 is disabled" disabled>
		<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
		<p>And they&rsquo;re also amazing.</p>
	</TabsPanel>
</Tabs>
