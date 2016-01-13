React = require('react')
SLDS = require('../../../components')
SLDSPicklistBase = SLDS.SLDSPicklistBase
SLDSIcon = SLDS.SLDSIcon

escapeRegExp = require('lodash.escaperegexp')

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

  boldSearchText: (children) ->
    regex = @props.boldRegex
    if !regex
      term = @props.searchTerm
      if !children or !term
        return children
      regex = new RegExp('(' + escapeRegExp(term) + ')', 'gi')
    React.Children.map children, (c) ->
      if typeof c == 'string' then <span dangerouslySetInnerHTML={{ __html: c.replace(regex, '<mark>$1</mark>')}}></span> else c

  render: ->
    <section>
      <SLDSIcon name='open_folder' category="utility" size="small" className="slds-icon-text-default" />

      { this.boldSearchText(this.props.children.label) }
    </section>
)
