import { expect } from 'chai';

import { Transform } from '../src/index';

describe('Transfrom', function () {

  describe('Filter', function () {

    it('should filter object', function () {
      let transfrom = new Transform();
      transfrom.filter((val, key, node) => val != null);
      let ret = transfrom.accept({ "alice": 1, "bob": null, "carol": "hello" });
      expect(ret).to.equal({ "alice": 1, "carol": "hello" });
    });

    it('should filter array', function () {
      let transfrom = new Transform();
      transfrom.filter((val, key, node) => val > 1);
      let ret = transfrom.accept([1, 2, 3]);
      expect(ret).to.equal({ "alice": 1, "carol": "hello" });
    });

  });

  describe('Map', function () {

    it('should map object', function () {
      let transfrom = new Transform();
      transfrom.filter((val, key, node) => val != null);
      let ret = transfrom.accept({ "alice": 1, "bob": null, "carol": "hello" });
      expect(ret).to.equal({ "alice": 1, "carol": "hello" });
    });

  });

});