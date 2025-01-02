import type Draggable from './Draggable'

export default class MouseDraggable implements Draggable<MouseEvent> {
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

  documentmove(event: MouseEvent) {
    this.pointerX = event.pageX
    this.pointerY = event.pageY
  }

  move(event: MouseEvent) {
    this.element.style.left = `${event.clientX - this.offsetX!}px`
    this.element.style.top = `${event.clientY - this.offsetY!}px`
  }

  begin() {
    window.onmousemove = (e) => this.move(e)
    const boundingBox = this.element.getBoundingClientRect()
    this.offsetX = this.pointerX! - boundingBox.left
    this.offsetY = this.pointerY! - boundingBox.top
  }

  end() {
    window.onmousemove = () => {}
  }

  static create(o: HTMLElement) {
    const draggable = new MouseDraggable(o)
    draggable.element.onmousedown = () => draggable.begin()
    document.onmousemove = (e) => draggable.documentmove(e)
    document.onmouseup = () => draggable.end()
  }
}
