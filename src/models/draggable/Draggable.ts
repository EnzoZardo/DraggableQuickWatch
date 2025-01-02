/* eslint-disable */
export default interface Draggable<T extends UIEvent> {
  pointerX: number | undefined
  pointerY: number | undefined
  offsetX: number | undefined
  offsetY: number | undefined
  element: HTMLElement
  move: (event: T) => void
  begin: (...args: any[]) => void
  end: (...args: any[] | undefined[]) => void
  create?: (element: HTMLElement) => void
}
