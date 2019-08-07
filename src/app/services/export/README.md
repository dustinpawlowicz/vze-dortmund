# Export Service
A service used to export user data as a file.

## Documentation
Documentation of external functionalities within the service.

**Notice:** The documentation within the corresponding 'service.ts' is to be used for the service's own methods.

### SheetJS js-xlsx
Parser and writer for various spreadsheet formats.

js-xlsx:
 * API: https://sheetjs.gitbooks.io/docs/#sheetjs-js-xlsx
 * npm: https://www.npmjs.com/package/xlsx#utility-functions

#### Installation:
```typescript
npm install xlsx --save
```

#### Imports
```typescript
import * as XLSX from 'xlsx';
```

#### Methods
Creates a new workbooks:
```typescript
XLSX$Utils.book_new(): XLSX.WorkBook
```

Append a worksheet to a workbook:
```typescript
XLSX$Utils.book_append_sheet(workbook: XLSX.WorkBook, worksheet: XLSX.WorkSheet, name?: string): void
```

Generates delimiter-separated-values output:
```typescript
XLSX$Utils.sheet_to_csv(worksheet: XLSX.WorkSheet, options?: XLSX.Sheet2CSVOpts): string
```

Converts an array of JS objects to a workshee:
```typescript
XLSX$Utils.json_to_sheet<any>(data: any[], opts?: XLSX.JSON2SheetOpts): XLSX.WorkSheet (+1 overload)
```

##### Functions
Attempts to write the workbook data:
```typescript
function write(data: XLSX.WorkBook, opts?: XLSX.WritingOptions): any
```

### FileSaver
FileSaver.js is the solution to saving files on the client-side

file-saver:
 * API: https://github.com/eligrey/FileSaver.js#readme
 * npm: https://www.npmjs.com/package/file-saver

#### Installation:
```typescript
npm install file-saver --save
```

#### Imports
```typescript
import * as FileSaver from 'file-saver';
```

#### Methods
Saves file:
```typescript
saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
```
