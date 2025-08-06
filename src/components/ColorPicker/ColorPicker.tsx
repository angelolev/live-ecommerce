import React from 'react';
import styles from './ColorPicker.module.css';

interface Color {
  name: string;
  hex: string;
}

interface ColorPickerProps {
  colors: Color[];
  selectedColor: string | null;
  onColorSelect: (colorName: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onColorSelect
}) => {
  return (
    <div className={styles.colorPicker}>
      <h3 className={styles.label}>Color</h3>
      <div className={styles.colors}>
        {colors.map((color) => (
          <button
            key={color.name}
            className={`${styles.colorButton} ${
              selectedColor === color.name ? styles.selected : ''
            }`}
            onClick={() => onColorSelect(color.name)}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
};