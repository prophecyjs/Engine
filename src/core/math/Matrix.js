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
  constructor (rows, cols, fill = 0) {
    this.rows = rows
    this.cols = cols
    this.matrix = Array(rows).fill().map(() => Array(cols).fill(fill))
  }

  /**
   * Clone the matrix into a new Matrix object.
   *
   * @returns {py.math.Matrix}
   */
  clone () {
    let clone = new Matrix(this.rows, this.cols)
    clone.matrix = this.matrix.map(value => { return value })

    return clone
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
   * Get the size of the Matrix
   *
   * @returns {(number|Array)} returns the number of rows and columns in the Matrix
   */
  size () {
    return [this.rows, this.cols]
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