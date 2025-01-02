import type Draggable from './Draggable'

export default class TouchDraggable implements Draggable<TouchEvent> {
  pointerX: number | undefined
  pointerY: number | undefined
  offsetX: number | undefined
  offsetY: number | undefined
  element: HTMLElement
  started: boolean = false
  blocked: boolean = false

  constructor(o: HTMLElement) {
    this.element = o
  }

  move(event: TouchEvent) {
    if (!this.blocked) {
      const touch = event.targetTouches[0]
      const boundingBox = this.element!.getBoundingClientRect()
      this.offsetX = this.pointerX! - boundingBox.x
      this.offsetY = this.pointerY! - boundingBox.y
      this.element!.style.left = `${touch.clientX - this.offsetX}px`
      this.element!.style.top = `${touch.clientY - this.offsetY}px`
    }
    event.preventDefault()
  }

  begin(event: TouchEvent) {
    if (!this.blocked) {
      this.pointerX = event.targetTouches[0].clientX
      this.pointerY = event.targetTouches[0].clientY
    }

    if (!this.started) {
      this.element!.ontouchmove = (e: TouchEvent) => this.move(e)
      this.started = true
    }
  }

  end() {
    this.started = false
    this.element!.ontouchmove = () => {}
  }

  scroll() {
    this.blocked = true
  }

  scrollend() {
    this.blocked = false
  }

  static create(o: HTMLElement) {
    const draggable = new TouchDraggable(o)
    document.ontouchmove = (e) => draggable.begin(e)
    document.ontouchend = () => draggable.end()
    document.onscroll = () => draggable.scroll()
    document.onscrollend = () => draggable.scrollend()
  }
}
