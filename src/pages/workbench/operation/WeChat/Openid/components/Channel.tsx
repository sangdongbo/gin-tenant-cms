import { measureTextWidth } from '@ant-design/charts';
import { ChartsCard, ChartsPie } from '@/components/Dashboard';
import { querySubscribeSceneRule } from '../service';

function renderStatistic(containerWidth: number, text: any, style: any) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
  const R = containerWidth / 2;

  let scale = 1;

  if (containerWidth < textWidth) {
    scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
  }

  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}

export default ({ appid, ...props }: any) => {

  return (
    <div>
      <ChartsCard
        row={3}
        titleIocn={
          // <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M213.6 753.696A383.264 383.264 0 0 0 512 896a383.04 383.04 0 0 0 286.304-128.096l-148.608-122.08A191.424 191.424 0 0 1 512 704a191.52 191.52 0 0 1-143.52-64.448l-154.88 114.144z m-19.104-25.664l154.784-114.08A191.104 191.104 0 0 1 320 512c0-36.224 10.048-70.112 27.488-99.04l-155.104-113.92A382.208 382.208 0 0 0 128 512c0 80.096 24.544 154.496 66.496 216.032z m16.768-454.816l154.976 113.824A191.616 191.616 0 0 1 496 320.64V128.32a383.328 383.328 0 0 0-284.736 144.864zM528 128.32v192.32a192 192 0 0 1 142.016 300.48l148.64 122.048A382.304 382.304 0 0 0 896 512c0-206.72-163.328-375.296-368-383.68zM512 928C282.24 928 96 741.76 96 512S282.24 96 512 96s416 186.24 416 416-186.24 416-416 416z m0-256a160 160 0 1 0 0-320 160 160 0 0 0 0 320z"></path></svg>
          <svg fill={MAINCOLOR2} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path d="M543.2 93.9V226c0 16.6-13.4 30-30 30s-30-13.4-30-30V93.9c0-16.6 13.4-30 30-30s30 13.4 30 30zM309 703.3l-95.9 95.9c-11.7 11.7-30.7 11.7-42.4 0s-11.7-30.7 0-42.4l95.9-95.9c11.7-11.7 30.7-11.7 42.4 0s11.7 30.7 0 42.4zM719.7 703.3l95.9 95.9c11.7 11.7 30.7 11.7 42.4 0s11.7-30.7 0-42.4l-95.9-95.9c-11.7-11.7-30.7-11.7-42.4 0-11.8 11.7-11.8 30.7 0 42.4z"></path>
            <path d="M511.8 123.9c52.6 0 103.7 10.3 151.7 30.6 46.4 19.6 88.1 47.7 123.9 83.5s63.9 77.5 83.5 123.9c20.3 48 30.6 99 30.6 151.7s-10.3 103.7-30.6 151.7c-19.6 46.4-47.7 88.1-83.5 123.9s-77.5 63.9-123.9 83.5c-48 20.3-99 30.6-151.7 30.6S408.2 893 360.2 872.7c-46.4-19.6-88.1-47.7-123.9-83.5s-63.9-77.5-83.5-123.9c-20.3-48-30.6-99-30.6-151.7s10.3-103.7 30.6-151.7c19.6-46.4 47.7-88.1 83.5-123.9s77.5-63.9 123.9-83.5c48-20.3 99-30.6 151.6-30.6m0-60c-248.4 0-449.7 201.3-449.7 449.7s201.3 449.7 449.7 449.7S961.5 762 961.5 513.6 760.2 63.9 511.8 63.9z"></path>
            <path d="M512.5 264.6c33.8 0 66.6 6.6 97.4 19.6 29.8 12.6 56.5 30.6 79.5 53.6s41 49.8 53.6 79.5c13 30.8 19.6 63.6 19.6 97.4s-6.6 66.6-19.6 97.4c-12.6 29.8-30.6 56.5-53.6 79.5s-49.8 41-79.5 53.6c-30.8 13-63.6 19.6-97.4 19.6s-66.6-6.6-97.4-19.6c-29.8-12.6-56.5-30.6-79.5-53.6s-41-49.8-53.6-79.5c-13-30.8-19.6-63.6-19.6-97.4s6.6-66.6 19.6-97.4c12.6-29.8 30.6-56.5 53.6-79.5s49.8-41 79.5-53.6c30.9-13 63.6-19.6 97.4-19.6m0-60c-171.3 0-310.2 138.9-310.2 310.2S341.2 825 512.5 825s310.2-138.9 310.2-310.2-138.9-310.2-310.2-310.2z"></path>
          </svg>
        }
        title="渠道构成"
        params={{
          appid,
        }}
        time={false}
        {...props}
      >
        <ChartsPie
          label={{
            type: 'outer',
            content: '{name} {value}人',
            offset: 50,
          }}
          mapping={() => {
            return {
              statistic: {
                title: {
                  offsetY: -4,
                  style: {
                    fontSize: 16,
                  },
                  customHtml: (container: any) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    return renderStatistic(d, '关注', {});
                  },
                },
                content: {
                  offsetY: 4,
                  style: {
                    color: '#9A9A9A',
                    fontSize: 14,
                  },
                  customHtml: (container: any, view: any, datum: any, data: any) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum ? `${datum.value}人` : `${data.reduce((r: any, d: any) => r + d.value, 0)}人`;
                    return renderStatistic(width, text, {});
                  },
                },
              }
            }
          }}
          request={querySubscribeSceneRule}
        />
      </ChartsCard>
    </div>
  )
}
