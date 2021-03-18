export default class ColorUtil {
  private static readonly defaultColor = '#00FF00';
  private static used: number = 0;

  public static isValid(colorValue: string): boolean {
    ColorUtil.used++;
    console.log(ColorUtil.used);
    return /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(colorValue);
  }
}