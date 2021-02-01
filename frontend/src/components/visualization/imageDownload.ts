import { saveSvgAsPng } from 'save-svg-as-png';
import moment from 'moment';

const IMAGE_DOWNLOAD_OPTIONS = [
  ['large', 1500],
  ['medium', 900],
  ['small', 500]
];

const downloadImage = (el: SVGElement, width: number, height: number, source: string, range: number): void => {
  saveSvgAsPng(
    el,
    `${source}-${moment.unix(range[0]).format('YYYY-MM-DD-hh-mm')}-to-${moment
      .unix(range[1])
      .format('YYYY-MM-DD-hh-mm')}.png`,
    { width, height }
  );
};

const clone = (scale: number, source: string): SVGElement => {
  // Construct one svg based on the two rendered SVGs
  const w3Svg = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(w3Svg, 'svg');
  const g1 = document.createElementNS(w3Svg, 'g');
  const g2 = document.createElementNS(w3Svg, 'g');
  const svg1 = document.querySelectorAll(`#${source}-1 div`)[1].firstChild;
  const svg2 = document.querySelectorAll(`#${source}-2 div`)[1].firstChild as SVGDescElement;
  const NewSvg1 = svg1.cloneNode(true) as SVGElement;
  const NewSvg2 = svg2.cloneNode(true) as SVGElement;

  // transform inner svgs depending on desired scale
  NewSvg1.setAttribute('transform', `scale(${scale})`);
  NewSvg2.setAttribute('transform', `scale(${scale})`);

  g1.appendChild(NewSvg1);
  g2.appendChild(NewSvg2);
  svg.append(g1);
  svg.append(g2);

  return svg;
};

const calculateImageSize = (w: string, source: string): { width: number; height: number; scale: number } => {
  const sourceString = `#${source}-1 div`;
  const { clientWidth, clientHeight }: { clientWidth: number; clientHeight: number } = document.querySelectorAll(
    sourceString
  )[1].firstChild as HTMLBodyElement;
  const scale = parseInt(w, 10) / clientWidth;

  return {
    width: scale * clientWidth,
    height: scale * clientHeight,
    scale
  };
};

export { IMAGE_DOWNLOAD_OPTIONS, calculateImageSize, clone, downloadImage };
