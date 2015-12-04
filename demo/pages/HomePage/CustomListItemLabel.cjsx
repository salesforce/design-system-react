React = require('react')
SLDS = require('../../../components')
SLDSPicklistBase = SLDS.SLDSPicklistBase
SLDSIcons = SLDS.SLDSIcons
Icon = SLDSIcons.Icon
module.exports = React.createClass(
  getDefaultProps: ->
    {
      index: 0
      label: ''
      value: null
      inverted: false
      isSelected: false
      isHighlighted: false
      data: {}
    }
  handleMouseOver: (event) ->
    console.log 'OVER: ' + @props.label
    return

  render: ->

    <section
      onMouseOver={@handleMouseOver}
    >
      <Icon name='like' position='left' category='utility' size="x-small" className="slds-icon--selected slds-icon-text-default slds-m-right--x-small" />
      {
        @props.data.strongLabel
      }
    </section>
)
