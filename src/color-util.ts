class ColorUtil {
  public static readonly defaultColor = '#00FF00';
  public static commonColor = '#0000FF';

  public static isValid(colorValue: string): boolean {
    return /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(colorValue);
  }
}

export default ColorUtil;