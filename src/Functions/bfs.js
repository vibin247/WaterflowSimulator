var totalRows = -1;
var totalColumns = -1;
function isValid(visited, row, col)
{
    if (row < 0 || col < 0 || row >= totalRows || col >= totalColumns) { return false; }
    if (visited[row][col]) { return false; }
    return true;
}

function isObstructed(obstructionsArray, row, col){
    return obstructionsArray[row][col];
}

function BFSSearchMethod(visited, obstructionsArray, row, col, result){
    var queue = [];
    queue.push([row, col]);
    visited[row][col] = true;
    while (queue.length !== 0){
        var cell = queue[0];
        var currRow = cell[0];
        var currCol = cell[1];
        queue.shift();
        if(currRow > totalRows-1) continue;
        if(obstructionsArray[currRow][currCol]) continue;
        result.push(cell);
        CheckCurrentBlock(obstructionsArray, currRow, currCol, visited, queue);
    }
}

function CheckCurrentBlock(obstructionsArray, currRow, currCol, visited, queue) {
    if (isValid(visited, currRow + 1, currCol)){
        if (isObstructed(obstructionsArray, currRow + 1, currCol)) {
            if (!isObstructed(obstructionsArray, currRow, currCol + 1) && isValid(visited, currRow, currCol + 1)) {
                queue.push([currRow, currCol + 1]);
                visited[currRow][currCol + 1] = true;
            }
            if (!isObstructed(obstructionsArray, currRow, currCol - 1) && isValid(visited, currRow, currCol - 1)) {
                queue.push([currRow, currCol - 1]);
                visited[currRow][currCol - 1] = true;
            }
        }
        else {
            queue.push([currRow + 1, currCol]);
            visited[currRow + 1][currCol] = true;
        }
    }
}

function searchFlowPath(rows, cols, blockArray, entry){
    var result = [];
    totalRows = rows;
    totalColumns = cols;
    var visited = Array.from(Array(totalRows), ()=> Array(totalColumns).fill(false));    
    var obstructionsArray = Array.from(Array(totalRows), ()=> Array(totalColumns).fill(false));
    blockArray.forEach(element => {
      obstructionsArray[element[0]][element[1]] =  true;
    });
    console.log(obstructionsArray);
    BFSSearchMethod(visited, obstructionsArray, entry[0], entry[1], result);
    return result;
}


export default searchFlowPath;
