import { useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import { useEffect } from 'react';
import colorRgb from '@/utils/colorRgb';
import theme from '../../../../../../../../../config/theme';

export default ({ value, onChange }: any) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const defaultHex: string = theme.colorPrimary || '';
  const defaultRgb: any = colorRgb(defaultHex);
  const [color, setColor] = useState<any>({
    ...defaultRgb,
    a: '1',
  });

  const styles: any = reactCSS({
    default: {
      color: {
        width: '46px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (_color: any) => {
    onChange?.({ hex: _color.hex, rgb: _color.rgb });
    setColor({ ..._color.rgb });
  };

  useEffect(() => {
    if (value) {
      setColor(value.rgb);
    } else {
      handleChange({
        rgb: color,
        hex: defaultHex,
      });
    };
  }, [value]);

  return (
    <div style={{ paddingLeft: 14 }}>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} style={{ zIndex: 100 }} />
        </div>
      ) : null}
    </div>
  );
};
