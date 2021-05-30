import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "./grid-wrapper.css";
import { Fragment } from "preact/compat";

export default function GridWrapper({ gridTitle, data, columns }) {
    const agGridColumns = columns.map((column) => (<AgGridColumn             
        autoHeight = {true} 
        wrapText={true} 
        sortable={true} 
        field={column} 
        flex={1} />))
  return (
    <Fragment>
      <h1 class="grid-wrapper-title">{ gridTitle }</h1>
      <div className="ag-theme-material grid-wrapper-container" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={data}>
            {agGridColumns}
        </AgGridReact>
      </div>
    </Fragment>
  );
}
