import { tooltip } from '../src/index'
import { ArrowPosition } from '../src/utils/svg'

const defaultText = `Supply-chains podcasting tag virtual. Synergize bleeding-edge, addelivery: portals leading-edge embrace embrace turn-key, strategize interactive, magnetic. Podcasting viral standards-compliant e-business reinvent synergistic iterate. Social communities whiteboard expedite seize weblogs innovate streamline proactive, citizen-media extend; whiteboard. Front-end cross-media applications frictionless architect webservices killer empower scalable, infomediaries, "real-time user-centred," transparent extensible post."
Extend applications B2C syndicate, out-of-the-box dynamic sticky viral engineer revolutionary methodologies back-end rich-clientAPIs synergistic global productize. Peer-to-peer relationships users target synergies synergies methodologies integrate. Recontextualize B2B seize, envisioneer, disintermediate communities embedded long-tail integrate leverage. Extend communities addelivery communities generate engage drive beta-test, e-business. Networkeffects transition; supply-chains innovate incentivize leading-edge dynamic end-to-end incentivize architectures aggregate peer-to-peer web services B2C.`

function getInputValue (id: string): string {
  const input = document.getElementById(id) as HTMLInputElement
  return input.value
}

function getInputNumValue (id: string): number {
  return parseFloat(getInputValue(id))
}

function getInputCheckedValue (id: string): boolean {
  return (document.getElementById(id) as HTMLInputElement).checked
}

function getArrowPosition (): ArrowPosition | null {
  const inputs = document.getElementsByName('arrow') as NodeListOf<HTMLInputElement>
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      if (inputs[i].value === 'none') return null
      return inputs[i].value as ArrowPosition
    }
  }
  return null
}

function recreateTooltip () {
  const width = getInputNumValue('width')
  const height = getInputNumValue('height')
  const arrowPosition = getArrowPosition()

  const { svg, insets, size } = tooltip({
    width: getInputNumValue('width'),
    height: getInputNumValue('height'),
    shadow: {
      size: getInputNumValue('shadow')
    },
    fillColor: getInputValue('color'),
    cornerRadius: {
      upperLeft: getInputNumValue('topLeftCorner'),
      upperRight: getInputNumValue('topRightCorner'),
      lowerLeft: getInputNumValue('bottomLeftCorner'),
      lowerRight: getInputNumValue('bottomRightCorner')
    },
    arrow: (arrowPosition) ? {
      position: arrowPosition,
      base: getInputNumValue('arrowBase'),
      height: getInputNumValue('arrowHeight'),
      start: getInputNumValue('arrowOffset')
    } : undefined
  })

  const svgTextArea = (document.getElementById('svg') as HTMLTextAreaElement)
  svgTextArea.value = svg

  const base64 = `data:image/svg+xml;base64,${btoa(svg)}`

  const tooltipElement = document.getElementById('tooltip') as HTMLDivElement
  tooltipElement.style.backgroundImage = `url(${base64})`
  tooltipElement.style.padding = `${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px`
  tooltipElement.style.width = `${size.width}px`
  tooltipElement.style.height = `${size.height}px`

  const tooltipContent = document.getElementById('tooltipContent') as HTMLDivElement
  tooltipContent.innerText = (document.getElementById('text') as HTMLInputElement).value
}

window['recreateTooltip'] = recreateTooltip

window.onload = () => {
  (document.getElementById('text') as HTMLInputElement).value = defaultText
  recreateTooltip()
}
