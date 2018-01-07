/**
 * Class for Matrix math calculations. Please be aware
 * of the fact that the rows and columns start of by 0 and
 * not at 1.
 *
 * @class
 * @memberof py.math
 */
class Matrix {

  /**
   * Instantiate a new Matrix Object.
   *
   * @constructor
   * @param {number} rows The number of rows in the matrix
   * @param {number} cols The number of columns in the matrix
   * @param {number} [fill=0] The initial fill for the matrix
   */
  constructor (rows = 0, columns = 0, fill = 0) {
    this.rows = rows
    this.columns = columns
    this.matrix = Array(rows).fill().map(() => Array(columns).fill(fill))
  }

  /**
   * Clone the matrix into a new Matrix object.
   *
   * @returns {py.math.Matrix}
   */
  clone () {
    let clone = new Matrix(this.rows, this.columns)
    clone.matrix = this.matrix.map(value => { return value })
    return clone
  }

  constrain (n, low, high) {
    if (n < low) n = low
    if (n > high) n = high
    return n
  }

  /**
   * Set the value inside the matrix
   *
   * @param {number} row The row on which to set the value
   * @param {number} column The column on which to set the value
   * @param {number} value The value to set on the coordinates
   * @returns {Matrix} The matrix object it self
   */
  setValue (row, column, value) {
    this.matrix[row][column] = value
    return this
  }

  /**
   *
   * @param {number} row The row on which to get the value
   * @param {number} column The column on which to get the value
   * @returns {number} value at this position
   */
  valueAt (row, column) {
    return this.matrix[row][column]
  }

  /**
   * Get the value of the matrix
   *
   * @returns {Array} Return the Matrix Array
   */
  valueOf () {
    return this.matrix
  }

  /**
   * Get the size of the Matrix
   *
   * @returns {(number|Array)} returns the number of rows and columns in the Matrix
   */
  size () {
    return [this.rows, this.columns]
  }

  resize (rows = 0, columns = 0, fill = 0) {

    let subset = this.clone()

    if (rows < this.rows && columns < this.columns) {
      subset = this.subset(0, 0, rows, columns)
    }

    if (rows > this.rows) {
      let delta = rows - this.rows
      for (let i = 0; i < delta; i++) {
        subset.matrix.push(Array(columns).fill(fill))
      }
    }

    if (columns > this.columns) {
      let delta = columns - this.columns
      for (let row = 0; row < this.rows; row++) {
        for (let column = this.columns; column < this.columns+delta; column++ ) {
          subset.setValue(row, column, fill);
        }
      }
    }

    return subset
  }

  /**
   * @example
   *  let matrix = new py.math.Matrix(3,3)
   * matrix.setValue(0, 0, 'A')
   *  .setValue(0, 1, 'B')
   *  .setValue(0, 2, 'C')
   *  .setValue(1, 0, 'D')
   *  .setValue(1, 1, 'E')
   *  .setValue(1, 2, 'F')
   *  .setValue(2, 0, 'G')
   *  .setValue(2, 1, 'H')
   *  .setValue(2, 2, 'I')
   *
   *
   * // Creates a matrix like this
   * // [A,B,C]
   * // [D,E,F]
   * // [G,H,I]
   *
   * let start_row = 0
   * let start_column = 1
   * let row_offset = 3
   * let column_offset = 2
   * let subset = matrix.subset(start_row, start_column, row_offset, column_offset);
   *
   * // Results in a subset of
   * // [B, C]
   * // [E, F]
   * // [H, I]
   * console.table(subset.valueof());
   *
   *
   * @param {number} row The starting row
   * @param {number} column The starting row
   * @param {number} row_offset The number of rows for the subset
   * @param {number} column_offset The number of columns for the subset
   * @returns {boolean|Matrix}
   */
  subset (row, column, row_offset, column_offset) {

    if (row > this.rows || column > this.columns) {
      return false
    }

    let subset = new Matrix(row_offset, column_offset)
    let max_rows = this.constrain(row + row_offset, 0, this.rows)
    let max_columns = this.constrain(column + column_offset, 0, this.columns)
    let target_row = 0
    let target_column = 0

    for (let source_row = row; source_row < max_rows; source_row++) {
      target_column = 0
      for (let source_column = column; source_column < max_columns; source_column++) {
        subset.setValue(target_row, target_column, this.valueAt(source_row, source_column))
        target_column++
      }
      target_row++
    }
    return subset
  }

  /**
   *
   * @param {number|Matrix} n Add a number to the matrix or add a an other Matrix object
   * @returns {py.math.Matrix}
   */
  add (n) {
    if (n instanceof Matrix) {
      n.matrix.map((row, row_index) => {
        row.map((column_value, column_index) => {
          let value = this.valueAt(row_index, column_index) + column_value
          this.setValue(row_index, column_index, value)
        })
      })
    } else {
      this.matrix.map((row, row_index) => {
        row.map((column_value, column_index) => {
          let value = this.valueAt(row_index, column_index) + n
          this.setValue(row_index, column_index, value)
        })
      })
    }

    return this
  }

  /**
   *
   * @param {number|Matrix} n Add a number to the matrix or add a an other Matrix object
   * @returns {py.math.Matrix}
   */
  subtract (n) {
    if (n instanceof Matrix) {
      n.matrix.map((row, row_index) => {
        row.map((column_value, column_index) => {
          let value = this.valueAt(row_index, column_index) - column_value
          this.setValue(row_index, column_index, value)
        })
      })
    } else {
      this.matrix.map((row, row_index) => {
        row.map((column_value, column_index) => {
          let value = this.valueAt(row_index, column_index) - n
          this.setValue(row_index, column_index, value)
        })
      })
    }

    return this
  }

  /**
   *
   * @param {number|Matrix} n Multiply a number to the matrix or multiply a an other Matrix object
   * @returns {py.math.Matrix}
   */
  multiply (n) {
    if (n instanceof Matrix) {
      n.matrix.map((row, row_index) => {
        row.map((column_value, column_index) => {
          let value = this.valueAt(row_index, column_index) * column_value
          this.setValue(row_index, column_index, value)
        })
      })
    } else {
      this.matrix.map((row, row_index) => {
        row.map((column_value, column_index) => {
          let value = this.valueAt(row_index, column_index) * n
          this.setValue(row_index, column_index, value)
        })
      })
    }

    return this
  }
}

module.exports = Matrix