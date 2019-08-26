import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export enum ExportOption {
  XLSX,
  CSV,
  JSON
}

enum FileExtension {
  XLSX = '.xlsx',
  CSV = '.csv',
  JSON = '.json'
}

enum MIMEType {
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV = 'text/comma-separated-values',
  JSON = 'application/json'
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  /**
   * export - Exports the transferred data as a file.
   *
   * @param json          json data to be exported
   * @param filename      name of the exported file
   * @param exportOption  type of the export
   */
  public export(json: any[], filename: string, exportOption: ExportOption): void {
    switch (exportOption) {
      case ExportOption.XLSX: this.exportAsExcelFile(json, filename); break;
      case ExportOption.CSV: this.exportAsCSVFile(json, filename); break;
      default: this.exportAsJSONFile(json, filename); break;
    }
  }

  /**
   * exportAsExcelFile - Excel export.
   *
   * @param json      json data to be exported
   * @param filename  name of the exported file
   */
  private exportAsExcelFile(json: any[], filename: string): void {
    const worksheet: XLSX.WorkSheet = this.getWorksheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'data');

    const output: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.save(output, filename, FileExtension.XLSX, MIMEType.XLSX);
  }

  /**
   * exportAsCSVFile - CSV export.
   *
   * @param json      json data to be exported
   * @param filename  name of the exported file
   */
  private exportAsCSVFile(json: any[], filename: string): void {
    const worksheet: XLSX.WorkSheet = this.getWorksheet(json);
    const output = XLSX.utils.sheet_to_csv(worksheet, { FS: ';' });
    this.save(output, filename, FileExtension.CSV, MIMEType.CSV);
  }

  /**
   * exportAsJSONFile - JSON export.
   *
   * @param json      json data to be exported
   * @param filename  name of the exported file
   */
  private exportAsJSONFile(json: any[], filename: string): void {
    this.save(json, filename, FileExtension.JSON, MIMEType.JSON);
  }

  /**
   * getWorksheet - Returns the json data as a worksheet.
   *
   * @param json json data to be exported into the worksheet
   */
  private getWorksheet(json: any[]): XLSX.WorkSheet {
    return XLSX.utils.json_to_sheet(json);
  }

  /**
   * save - Saves the transmitted output as a file.
   *
   * @param output    output to be saved as file
   * @param filename  name of the exported file
   * @param extension file extension
   * @param mimeType  MIME type of the exported file
   */
  private save(output: any, filename: string, extension: string, mimeType: string): void {
    const data: Blob = new Blob([output], {type: mimeType});
    console.log(data);
    FileSaver.saveAs(data, filename + extension);
  }
}
