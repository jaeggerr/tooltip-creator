import { tooltipSVG } from '../src/index'
import { ArrowPosition } from '../src/utils/svg'

function liveGeneration (): boolean {
  const live = document.getElementById('liveGeneration') as HTMLInputElement
  return live.checked
}

function getInputValue (id: string): string {
  const input = document.getElementById(id) as HTMLInputElement
  return input.value
}

function getInputNumValue (id: string): number {
  return parseFloat(getInputValue(id))
}

function getArrowPosition (): ArrowPosition {
  const inputs = document.getElementsByName('arrow') as NodeListOf<HTMLInputElement>
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) return inputs[i].value as ArrowPosition
  }
  return 'top'
}

window.onload = () => {
  window['recreateTooltip']()
}

window['onSettingInputChange'] = function () {
  if (liveGeneration()) {
    window['recreateTooltip']()
  }
}

window['recreateTooltip'] = function () {
  const svg = tooltipSVG({
    width: getInputNumValue('width'),
    height: getInputNumValue('height'),
    shadowSize: getInputNumValue('shadow'),
    fillColor: getInputValue('color'),
    cornerRadius: {
      upperLeft: getInputNumValue('topLeftCorner'),
      upperRight: getInputNumValue('topRightCorner'),
      lowerLeft: getInputNumValue('bottomLeftCorner'),
      lowerRight: getInputNumValue('bottomRightCorner')
    },
    arrow: {
      position: getArrowPosition(),
      base: 40,
      height: 20,
      start: 25
    }
  })

  const base64 = btoa(svg)
  const image = document.getElementById('svg') as HTMLImageElement
  image.src = `data:image/svg+xml;base64,${base64}`
}
