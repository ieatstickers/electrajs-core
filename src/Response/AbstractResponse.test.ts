import { AbstractResponse } from "./AbstractResponse";

class TestResponse extends AbstractResponse
{
  public exampleProperty: string = null;
  public anotherExampleProperty: number = null;
}

describe("AbstractResponse", () => {
  let response: TestResponse;
  
  beforeEach(() => {
    response = new TestResponse();
  })
  
  describe("serialize", () => {
    it("returns a JSON string", () => {
      expect(response.serialize()).toBe(JSON.stringify(response));
    });
  });
  
});
