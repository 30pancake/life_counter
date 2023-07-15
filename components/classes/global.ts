export default class Global {
  static readonly DRAG_TEXT_DATA_KEY:string = "drag_data_text";

  static setObjectDataToDragEvent(event: DragEvent, data: object): void {
    let textData = JSON.stringify(data);
    event.dataTransfer?.setData(this.DRAG_TEXT_DATA_KEY, textData);
  }

  static tryGetObjectDataFromDragEvent<T>(event: DragEvent, parseFunc: (jsonText: string) => T): {success: boolean, data: T | undefined} {
    try {
      let textData = event.dataTransfer?.getData(this.DRAG_TEXT_DATA_KEY);
      if (textData != undefined) {
        return {
          success: true,
          data: parseFunc(textData)
        }
      } else {
        throw new Error("eventからのテキストデータ取得失敗");
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

  static tryGetNumberDataFromDragEvent(event: DragEvent): {success: boolean, data: number | undefined} {
    try {
      let textData = event.dataTransfer?.getData(this.DRAG_TEXT_DATA_KEY);
      if (textData != undefined) {
        return {
          success: true,
          data: parseInt(textData)
        }
      } else {
        throw new Error("eventからのテキストデータ取得失敗");
      }  
    } catch {
      return {
        success: false,
        data: undefined
      }
    }
  } 
}