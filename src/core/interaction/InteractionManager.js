import MouseEvent from './mouse/MouseEvent';

class InteractionManager {
  constructor (displayobject) {
    this.displayobject = displayobject
    this.renderer = this.displayobject.renderer

    this.interactionDOMElement = null
    this.setTargetElement(this.renderer.view, this.renderer.resolution);
    this.mouseInteraction = new MouseEvent(this);
  }

  setTargetElement (element, resolution = 1) {
    this.removeEvents()
    this.interactionDOMElement = element
    this.addEvents()
  }

  addEvents () {

    // this.mouseInteraction.init();

  }

  removeEvents () {
    this.interactionDOMElement = null
  }
}

module.exports = InteractionManager
