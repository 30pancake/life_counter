export default class Global {
  static readonly DRAG_TEXT_DATA_KEY:string = "drag_data_text";

  static setObjectDataToDragEvent(event: DragEvent, data: object): void {
    let textData = JSON.stringify(data);
    event.dataTransfer?.setData(this.DRAG_TEXT_DATA_KEY, textData);
  }

  static getObjectDataFromDragEvent<T>(event: DragEvent, parseFunc: (jsonText: string) => T): T {
    let textData = event.dataTransfer?.getData(this.DRAG_TEXT_DATA_KEY);
    if (textData != undefined) {
      return parseFunc(textData);
    } else {
      throw new Error("eventからのテキストデータ取得失敗");
    }
  }

  static tryGetObjectDataFromDragEvent<T>(event: DragEvent, parseFunc: (jsonText: string) => T): {success: boolean, data: T | undefined} {
    try {
      return {
        success: true,
        data: this.getObjectDataFromDragEvent(event, parseFunc)
      }
    } catch {
      return {
        success: false,
        data: undefined
      }
    }
  }

  static setNumberDataToDragEvent<T>(event: DragEvent, data: number): void {
    let textData = data.toString();
    event.dataTransfer?.setData(this.DRAG_TEXT_DATA_KEY, textData);
  }

  static getNumberDataFromDragEvent(event: DragEvent): number {
    let textData = event.dataTransfer?.getData(this.DRAG_TEXT_DATA_KEY);
      if (textData != undefined) {
        return parseInt(textData);
      } else {
        throw new Error("eventからのテキストデータ取得失敗");
      }
  }

  static tryGetNumberDataFromDragEvent(event: DragEvent): {success: boolean, data: number | undefined} {
    try {
      let data = this.getNumberDataFromDragEvent(event);
      return {
        success: true,
        data: data
      }
    } catch {
      return {
        success: false,
        data: undefined
      }
    }
  }

  static countGroup<T extends Equals>(array: T[]): Map<T, number> {
    let groupedMap: Map<T, number> = new Map();
    array.forEach(item => {
      let keyItem = Array.from(groupedMap.keys()).find(x => x.equals(item));
      if (keyItem != undefined) {
        groupedMap.set(keyItem, groupedMap.get(keyItem)! + 1);
      } else {
        groupedMap.set(item, 1);
      }
    });
    return groupedMap;
  }
}