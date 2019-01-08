const rotateClockwise = (matrix) => {
    let size = matrix.length;
    let newMatrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix[size - j - 1][i])
        }
        newMatrix.push(row);
    }

    return newMatrix;
};

const rotateCounterClockwise = (matrix) => {
    let size = matrix.length;
    let newMatrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix[j][size - i - 1])
        }
        newMatrix.push(row);
    }

    return newMatrix;
};

const rotateIndicesClockwise = (rowIndex, colIndex, size) => {
    if (size <= 0) {
        throw new Error("Size of matrix has to be greater than 0");
    }

    if (rowIndex >= size || colIndex >= size) {
        throw new Error("Indices has to be less than size of matrix");
    }

    return [colIndex, size - rowIndex - 1];
}

const rotateIndicesCounterClockwise = (rowIndex, colIndex, size) => {
    if (size <= 0) {
        throw new Error("Size of matrix has to be greater than 0");
    }

    if (rowIndex >= size || colIndex >= size) {
        throw new Error("Indices has to be less than size of matrix");
    }

    return [size - colIndex - 1, rowIndex];
}
const getGainsMatrix = (tokenColIndex, gameMatrix) => {
    // Assume the direction is vertical, so the agent
    // selects over a column
    let size = gameMatrix.length;
    let gainsMatrix = [];
    let nGameMatrix = gameMatrix;
    let nTokenColIndex = tokenColIndex;

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            if (nGameMatrix[i][nTokenColIndex] <= 0) {
                row.push(0);
            } else {
                row.push(nGameMatrix[i][nTokenColIndex] - nGameMatrix[i][j]);
            }
        }
        gainsMatrix.push(row);
    }

    return gainsMatrix;
};

const getBestGain = (tokenRowIndex, tokenColIndex, gainsMatrix, boardMatrix) => {
    // assume the direction is vertical
    let size = gainsMatrix.length;
    let minGains = [];

    // get the min gains in every row
    for (let i = 0; i < size; i++) {
        let minGain = null;
        for (let j = 0; j < size; j++) {
            if (j === tokenColIndex) { // avoid the column of the token
                continue;
            }
            if (minGain === null || minGain > gainsMatrix[i][j]) {
                minGain = gainsMatrix[i][j];
            }
        }
        minGains.push(minGain);
    }

    // obtain the index of the max gain
    let rowIndex = -1;
    let maxGain = null;
    for (let i = 0; i < size; i++) {
        // The token has to move to other position: tokenRowIndex !== i
        // Also, a cell has to be in the position: boardMatrix[i][tokenColIndex] > 0
        if ((maxGain === null || maxGain < minGains[i]) &&
            tokenRowIndex !== i &&
            boardMatrix[i][tokenColIndex] > 0) {
            maxGain = minGains[i];
            rowIndex = i;
        }
    }

    return rowIndex;
};

const randomInteger = (min, max) => {
    let r = Math.random();
    return min + Math.round(r * (max - min));
};

const updateObjectFromJsonString = (object, jsonString) => {
    const literal = JSON.parse(jsonString);
    updateObjectFromLiteral(object, literal);
};

const updateObjectFromLiteral = (object, literal) => {
    if (literal === undefined) {
        throw new Error("Undefined object");
    }

    for (const key of Object.keys(literal)) {
        if (object.hasOwnProperty(key) &&
            object[key].constructor.name === literal[key].constructor.name) {
            object[key] = literal[key];
        }
    }
};

const vectorToMatrix = (vector) => {
    const size = Math.sqrt(vector.length);
    if (size > 0 && Number.isInteger(size)) {
        let matrix = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(vector[size * i + j]);
            }
            matrix.push(row);
        }
        return matrix;
    } else {
        throw new Error("Invalid vector size");
    }
};

module.exports = {
    rotateClockwise,
    rotateCounterClockwise,
    rotateIndicesClockwise,
    rotateIndicesCounterClockwise,
    getGainsMatrix,
    getBestGain,
    randomInteger,
    updateObjectFromJsonString,
    updateObjectFromLiteral,
    vectorToMatrix
};