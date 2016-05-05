import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import {SLDSModal} from '../../components'
const { Simulate,
        renderIntoDocument,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithClass } = TestUtils

describe('SLDSModal: ', function(){
  let container, renderedNode;

  afterEach(() => {
   ReactDOM.unmountComponentAtNode(container);
   document.body.removeChild(container)
   container = null;
  })

  const defaultProps = {align: "top", isOpen: false, children: <div>hello</div>}

  const renderModal = (modalInstance) => {
    container = document.createElement('div');
    const opener = <button>{modalInstance}</button>;
    document.body.appendChild(container);
    renderedNode = ReactDOM.render(opener, container);
    return renderedNode;
  }

  const createModal = (props) => React.createElement(SLDSModal, assign({}, defaultProps, props));

  const getModal = props => renderModal(createModal(props));

  const getModalNode = dom => dom.querySelector('.slds-modal');

  describe('Closed modal', () => {
    let cmp;

    beforeEach(() => {
      cmp = getModal({isOpen: false});
    })

    it('updates the overflow', () => {
      expect(document.body.style.overflow).to.equal('inherit');
    })

    it('does not render to the body', () => {
      expect(getModalNode(document.body)).to.be.null;
    })
  })

  describe('Open modal', () => {
    let cmp, closed, modal;

    beforeEach(() => {
      closed = false;
      cmp = getModal({isOpen: true, size: 'large', onRequestClose: () => closed = true});
      modal = getModalNode(document.body);
    })

    it('renders a noscript', () => {
      const renderedNode = React.findDOMNode(cmp);
      expect(renderedNode.firstChild.tagName).to.equal('NOSCRIPT');
    })

    it('adds the large class', () => {
      expect(modal.className).to.include('slds-modal--large');
    })

    it('calls onRequestClose', () => {
      const close_btn = modal.querySelector('.slds-modal__close');
      expect(closed).to.be.false;
      Simulate.click(close_btn, {});
      expect(closed).to.be.true;
    })
  })


  describe('Open with Prompt and Footer', () => {
    let cmp, modal;

    beforeEach(() => {
      const feet = [<div className="toes">Toes</div>]
      cmp = getModal({isOpen: true, prompt: 'warning', footer: feet })
      modal = getModalNode(document.body)
    })

    it('adds the footer', () => {
      const footer = modal.querySelector('.slds-modal__footer')
      expect(footer.className).to.include('slds-theme--default')
    })

    it('adds the prompt class', () => {
      expect(modal.className).to.include('slds-modal--prompt')
    })

    it('adds the prompt class', () => {
      expect(modal.querySelector('.toes').innerHTML).to.equal('Toes')
    })
  })

  describe('Open Directional', () => {
    let cmp, modal;

    beforeEach(() => {
      const feet = [<div className="toes">Toes</div>]
      cmp = getModal({isOpen: true, directional: true, footer: feet})
      modal = getModalNode(document.body)
    })

    it('adds the footer', () => {
      const footer = modal.querySelector('.slds-modal__footer--directional')
      expect(footer.className).to.include('slds-modal__footer')
    })
  })

  describe('Keyboard behavior', () => {
    let cmp, closed, modal;

    beforeEach(() => {
      closed = false;
      const feet = [
        <button className="cancel">Cancel</button>,
        <button className="save">Save</button>
      ]
      cmp = getModal({isOpen: true, directional: true, footer: feet, onRequestClose: () => closed = true})
      modal = getModalNode(document.body)
    })

    it('first tab focuses close button', (done) => {
      setTimeout(() => {
        Simulate.keyDown(modal, {key: 'Tab', keyCode: 9, which: 9})
        setTimeout(() => {
          expect(document.activeElement.className).to.include('slds-modal__close');
          done();
        }, 200);
      }, 200);
    })

    it('enter on close button works', () => {
      //TODO: simulate enter on close button and modal is undefined
    })

    it('traps focus inside Modal', () => {
      //TODO: simulate tabbing around inside of Modal
    })
  })
})

