import MouseInteraction from './mouse/MouseInteraction'
import InteractionEvent from './InteractionEvent'
import { shared } from '../ticker'

class InteractionManager {
  constructor (displayobject) {
    this.displayobject = displayobject
    this.renderer = this.displayobject.renderer

    this.interactionDOMElement = null
    this.processInteraction = this.processInteraction.bind(this)
    this.setTargetElement(this.renderer.view, this.renderer.resolution)

  }

  processInteraction (interaction, displayobject, interactive) {
    let event = new InteractionEvent(interaction)
    let displayObject = displayobject || this.displayobject
    let hit = false

    if (!displayObject || !displayObject.visible === false) {
      return false
    }

    console.log(displayObject)

    // displayObject.interactiveChildren &&
    if (displayObject.children) {
      const children = displayObject.children

      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        const childHit = this.processInteraction(interaction, child, true)

        if (childHit) {
          if (!child.parent) {
            continue
          }


        }
        console.log(childHit)
      }

    }

    if (interactive) {

    }

    return hit
  }

  setTargetElement (element, resolution = 1) {
    this.removeEvents()
    this.interactionDOMElement = element
    this.addEvents()
  }

  addEvents () {
    this.mouseInteraction = new MouseInteraction(this.interactionDOMElement, this.processInteraction)

    console.log('added')
  }

  removeEvents () {
    if (!this.interactionDOMElement) {
      return
    }

    this.interactionDOMElement = null
  }
}

module.exports = InteractionManager
