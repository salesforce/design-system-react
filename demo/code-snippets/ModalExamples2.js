class ModalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen(){
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){
    return (
      <div>
        <SLDSButton label="View Text" onClick={this.toggleOpen.bind(this)} variant="brand" />
        <SLDSModal
          align="top"
          isOpen={this.state.isOpen}
          onRequestClose={this.toggleOpen.bind(this)}
          size="large">
            <h4 className="slds-text-heading--medium">Jack London - The Scarlet Plague</h4>
            <p>"He's always saying that," he said to Edwin. "What is scarlet?"</p>
            <p>"'The scarlet of the maples can shake me like the cry of bugles going  by,'" the old man quoted.</p>
            <p>"It's red," Edwin answered the question. "And you don't know it because  you come from the Chauffeur Tribe. They never did know nothing, none of  them. Scarlet is red&mdash;I know that."</p>
            <p>"Red is red, ain't it?" Hare-Lip grumbled. "Then what's the good of  gettin' cocky and calling it scarlet?"</p>
            <p>"Granser, what for do you always say so much what nobody knows?" he  asked. "Scarlet ain't anything, but red is red. Why don't you say red,  then?"</p>
            <p>"Red is not the right word," was the reply. "The plague was scarlet.  The whole face and body turned scarlet in an hour's time. Don't I  know? Didn't I see enough of it? And I am telling you it was scarlet  because&mdash;well, because it was scarlet. There is no other word for it."</p>
            <p>"Red is good enough for me," Hare-Lip muttered obstinately. "My dad  calls red red, and he ought to know. He says everybody died of the Red  Death."</p>
            <p>"Your dad is a common fellow, descended from a common fellow," Granser  retorted heatedly. "Don't I know the beginnings of the Chauffeurs? Your  grandsire was a chauffeur, a servant, and without education. He worked  for other persons. But your grandmother was of good stock, only the  children did not take after her. Don't I remember when I first met them,  catching fish at Lake Temescal?"</p>
            <p>"What is education?" Edwin asked.</p>
        </SLDSModal>
      </div>
    );
  }

}

ReactDOM.render(<ModalExample />, mountNode);
