export class DateUtils {
  public static getTodayString(): string {
    const today = new Date();
    return today.toDateString();
  }
}
