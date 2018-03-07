/**
 * @module Matrix
 */

/**
 * Parse matrix in text format.
 * @param {string} str - Matrix in text format: \n for each new row and space-separated elements in rows
 * @private
 * @returns {array[]}
 */
function _parseStringArg(str) {
  let res = [];
  let rows = str
    .replace(/\n /g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\r/g, '')
    .split('\n');

  for (let i = 0, qty = rows.length; i < qty; i++) {
    res.push(rows[i].split(' ').map((el) => +el));
  }
  return res;
}

/**
 * Validate matrix as array of arrays of finite numbers.
 * Checking for: square matrix; all elements are numbers; 2n+1 size;
 * @param {array[]} m - matrix as array of arrays
 * @private
 * @returns {boolean}
 */
function _validateMatrix(m) {
  if (typeof m !== 'object' || !Array.isArray(m)) {
    throw (new Error('Invalid matrix format'));
  }
  let size = m.length;
  if (size % 2 === 0) {
    throw (new Error('Invalid matrix format'));
  }
  for (let i = 0; i < size; i++) {
    if (typeof m[i] !== 'object' || !Array.isArray(m[i]) || m[i].length !== size) {
      throw (new Error('Invalid matrix format'));
    }
  }
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (typeof m[i][j] !== 'number' || !isFinite(m[i][j])) {
        throw (new Error('Invalid element format in matrix'));
      }
    }
  }
}


/**
 * Untwist matrix to array
 * @param {array[]} m - matrix as array of arrays
 * @private
 * @returns {array}
 */
function _untwist(m) {
  let center = Math.floor(m.length / 2);

  let res = [];
  res.push(m[center][center]);
  if (center === 0) { return res; }

  let distance = 1;
  let x, y;

  while (true) {

    x = center - distance;
    y = center - distance;

    while (y < center + distance) {
      y++;
      res.push(m[y][x]);
    }

    while (x < center + distance) {
      x++;
      res.push(m[y][x]);
    }

    while (y > center - distance) {
      y--;
      res.push(m[y][x]);
    }

    while (x > center - distance) {
      x--;
      res.push(m[y][x]);
    }

    distance++;
    if (distance > center) { break; }
  }
  return res;
}


/**
 * Untwist matrix
 * @param {string|array[]} arg - matrix in text format or as array of arrays
 * @param {boolean=} toString - convert outputto string with space-separated elements
 * @returns {array,string}
 */
function untwist(arg, toString) {
  let
    res,
    m = (typeof arg === 'string') ? _parseStringArg(arg) : arg;

  _validateMatrix(m);
  res = _untwist(m);
  return ((toString) ? res.join(' ') : res);
}


module.exports = {
  untwist: untwist
};
