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
    icon = null
    if(@props.isSelected)
      icon = <Icon name='like'  position='left' category='utility' />

    <section
      onMouseOver={@handleMouseOver}
    >
      { icon }
      {
        @props.data.strongLabel
      }
    </section>
)