import { AbstractPayload } from "./AbstractPayload";

class TestPayload extends AbstractPayload
{
  public exampleProperty: string = null;
  public anotherExampleProperty: number = null;
}

describe("AbstractPayload", () => {
  let payload: TestPayload;
  
  beforeEach(() => {
    payload = new TestPayload();
  })
  
  describe("validate", () => {
    it("returns true by default", () => {
      expect(payload.validate()).toBe(true);
    })
  });
  
  describe("serialize", () => {
    it("returns a JSON string", () => {
      expect(payload.serialize()).toBe(JSON.stringify(payload));
    });
  });
  
});
