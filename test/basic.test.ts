import { expect } from 'chai';

import { Transform } from '../src/Transform';

describe('Transfrom', function () {


  it('should pick object', function () {
    let transfrom = new Transform();
    transfrom.pick((val, key, node) => val != null);
    let ret = transfrom.apply({ "alice": 1, "bob": null, "carol": "hello" });
    expect(ret).to.deep.equal({ "alice": 1, "carol": "hello" });
  });

  it('should pick array', function () {
    let transfrom = new Transform();
    transfrom.pick((val, key, node) => node.isObject() || node.isArray() || typeof val == 'number' && val > 1);
    let ret = transfrom.apply([1, 2, 3]);
    expect(ret).to.deep.equal([2, 3]);
  });

  it('should omit property', function () {
    let transfrom = new Transform();
    transfrom.omit((val, key, node) => val === null);
    let ret = transfrom.apply({ "alice": 1, "bob": null, "carol": "hello" });
    expect(ret).to.deep.equal({ "alice": 1, "carol": "hello" });
  });

  it('should set primitive value', function () {
    let transfrom = new Transform();
    transfrom.map((val, key, node) => node.setValue(0), (val, key, node) => val == null);
    let ret = transfrom.apply({ "alice": 1, "bob": null, "carol": "hello" });
    expect(ret).to.deep.equal({ "alice": 1, "bob": 0, "carol": "hello" });
  });

  it('should alter object', function () {

    let ret =
      new Transform()
        .map((val, key, node) => val.retired = true, (val, key, node) => val.age >= 60)
        .apply({ "alice": { "age": 20 }, "bob": { "age": 25 }, "carol": { "age": 60 } });

    expect(ret).to.deep.equal({ "alice": { "age": 20 }, "bob": { "age": 25 }, "carol": { "age": 60, retired: true } });
  });

  it('', function () {

    let ret =
      new Transform()
        .map((val, key, node) => val.retired = true, (val, key, node) => node.isChildOf(['carol', 'contact']))
        .apply({ "development": { "plugin": { "people": [] } } });

    expect(ret).to.deep.equal({ "alice": { "age": 20 }, "bob": { "age": 25 }, "carol": { "age": 60, retired: true } });
  });


});