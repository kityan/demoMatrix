const lib = require('../lib/').matrix;

describe('matrix', function () {

  it('should throw error on invalid matrix format', function () {

    let arr = [
      '1 2 3\n 4 6\n7 8 9',
      '1 2\n4 5'
    ];

    arr.forEach((el) => {
      expect(() => lib.untwist(el))
        .throw(Error).that.has
        .property('message').that
        .equal('Invalid matrix format');
    });

  });


  it('should throw error on invalid element format in matrix', function () {

    let arr = [
      [[1, 2, 3], [4, 5, 6], [7, 8, 'X']]
    ];

    arr.forEach((el) => {
      expect(() => lib.untwist(el))
        .throw(Error).that.has
        .property('message').that
        .equal('Invalid element format in matrix');
    });

  });

  it('should correctly untwist', function () {
    let arr = [];

    arr[0] = {
      m:
        [
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10],
          [11, 12, 13, 14, 15],
          [16, 17, 18, 19, 20],
          [21, 22, 23, 24, 25],
        ],
      r: '13 12 17 18 19 14 9 8 7 6 11 16 21 22 23 24 25 20 15 10 5 4 3 2 1'
    };

    arr[1] = {
      m: '1 2 3\n 4 5 6\n7 8 9',
      r: '5 4 7 8 9 6 3 2 1'
    };

    arr[2] = {
      m: [[10]],
      r: '10'
    };

    arr.forEach((el) => {
      expect(lib.untwist(el.m, true)).to.equal(el.r);
    });

  });


});
