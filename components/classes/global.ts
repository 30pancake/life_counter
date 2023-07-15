export default class Global {
  static readonly DRAG_TEXT_DATA_KEY:string = "drag_data_text";

  static setObjectDataToDragEvent(event: DragEvent, data: object): void {
    let textData = JSON.stringify(data);
    event.dataTransfer?.setData(this.DRAG_TEXT_DATA_KEY, textData);
  }

  static tryGetDataFromDragEvent<T>(event: DragEvent, parseFunc: (jsonText: string) => T): {success: boolean, data: T | undefined} {
    try {
      let textData = event.dataTransfer?.getData(this.DRAG_TEXT_DATA_KEY);
      if (textData != undefined) {
        return {
          success: true,
          data: parseFunc(textData)
        }
      } else {
        throw new Error();
      }  
    } catch {
      return {
        success: false,
        data: undefined
      }
    }
  }
}