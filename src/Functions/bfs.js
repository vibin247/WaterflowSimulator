var result = [];
var totalRows = -1;
var totalColumns = -1;
function isValid(vis, row, col)
{
    if (row < 0 || col < 0 || row >= totalRows || col >= totalColumns) { return false; }
    if (vis[row][col]) { return false; }
    return true;
}


function BFSSearchMethod(vis, obstructionsArray, row, col){
    var queue = [];
    queue.push([row, col]);
    vis[row][col] = true;
    while (queue.length !== 0){
        var cell = queue[0];
        var currRow = cell[0];
        var currCol = cell[1];
        queue.shift();
        result.push([currRow,currCol]);
        if(currRow >= totalRows-1) continue;
        if(obstructionsArray[currRow][currCol]) continue;
        CheckCurrentBlock(obstructionsArray, currRow, currCol, vis, queue);
    }
}

function CheckCurrentBlock(obstructionsArray, currRow, currCol, vis, queue) {
    if (obstructionsArray[currRow + 1][currCol]) {
        if (!obstructionsArray[currRow][currCol + 1] && isValid(vis, currRow, currCol + 1)) {
            queue.push([currRow, currCol + 1]);
            vis[currRow][currCol + 1] = true;
        }
        if (!obstructionsArray[currRow][currCol - 1] && isValid(vis, currRow, currCol - 1)) {
            queue.push([currRow, currCol - 1]);
            vis[currRow][currCol - 1] = true;
        }
    }
    else if (isValid(vis, currRow + 1, currCol)) {
        queue.push([currRow + 1, currCol]);
        vis[currRow + 1][currCol] = true;
    }
}

function searchFlowPath(rows, cols, blockArray, entry){
    totalRows = rows;
    totalColumns = cols;
    var vis = Array.from(Array(totalRows), ()=> Array(totalColumns).fill(false));    
    var obstructionsArray = Array.from(Array(totalRows), ()=> Array(totalColumns).fill(false));
    blockArray.forEach(element => {
      obstructionsArray[element[0]][element[1]] =  true;
    });
    BFSSearchMethod(vis, obstructionsArray, entry[0], entry[1]);
    return result;
}


export default searchFlowPath;
