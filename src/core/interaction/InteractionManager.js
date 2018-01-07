import MouseInteraction from './mouse/MouseInteraction'
import InteractionEvent from './InteractionEvent'
import { Point, Rect } from '../geometry'

import { shared } from '../ticker'

class InteractionManager {
  constructor (displayobject) {
    this.displayobject = displayobject
    this.renderer = this.displayobject.renderer

    this.interactionDOMElement = null
    this.onEvent = this.onEvent.bind(this)
    this.setTargetElement(this.renderer.view, this.renderer.resolution)
  }

  processInteraction (interactionEvent, displayObject, func, hitTest, interactive) {
    // let event = new InteractionEvent(interactionEvent)
    // displayObject = displayObject || this.displayobject
    let hit = false

    if (!displayObject || !displayObject.visible) {
      return false
    }

    // displayObject.interactiveChildren &&
    if (displayObject.children) {
      const children = displayObject.children

      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i]
        const childHit = this.processInteraction(interactionEvent, child, func, hitTest, true)

        if (childHit) {
          if (!child.parent) {
            continue
          }

          if (childHit) {
            if (interactionEvent.target) {
              hitTest = false
            }
            hit = true
          }
        }
      }
    } else {
      console.log('geen children')
    }

    if (interactive) {
      if (hitTest && !interactionEvent.target) {
        if (displayObject.containsPoint) {
          if (displayObject.containsPoint(interactionEvent.point)) {
            hit = true
          }
        }
      }
    }

    if (displayObject.interactive) {
      if (hit && !interactionEvent.target) {
        interactionEvent.target = displayObject
      }

      if (func) {
        func(interactionEvent, displayObject, !!hit)
      }
    }
    return hit
  }

  /**
   * Translate event coordinates like Mouse or Touch to World coordinates.
   *
   * @param {number} speed
   * @param {number} speed
   */
  translateEventPointToWorldPoint (x, y) {
    var windowRect = new Rect(this.renderer.view.x, this.renderer.view.y, this.renderer.width, this.renderer.height) // TODO: Wrong x / y does not exist but it passes now
    var translatedPoint = Point.create(x, y)
    translatedPoint.x -= windowRect.x
    translatedPoint.y -= windowRect.y

    return translatedPoint
  }

  onEvent (event) {

    if (event instanceof MouseEvent) {
      var mypoint = this.translateEventPointToWorldPoint(event.clientX, event.clientY)
      var interactionEvent = new InteractionEvent(event)

      interactionEvent.x = mypoint.x
      interactionEvent.y = mypoint.y
      interactionEvent.point = mypoint

      // console.log(this.displayobject)
      this.processInteraction(interactionEvent, this.displayobject, () => {
        console.log('callback hit')
      }, true)

      console.log(mypoint)
      console.log(interactionEvent)
    }

  }

  setTargetElement (element, resolution = 1) {
    this.removeEvents()
    this.interactionDOMElement = element
    this.addEvents()
  }

  addEvents () {
    this.mouseInteraction = new MouseInteraction(this.interactionDOMElement, this.onEvent)
  }

  removeEvents () {
    if (!this.interactionDOMElement) {
      return
    }

    this.interactionDOMElement = null
  }
}

module
  .exports = InteractionManager
