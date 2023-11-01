import { AbstractPayload } from "../Payload/AbstractPayload";
import { AbstractResponse } from "../Response/AbstractResponse";
import { AbstractEvent } from "./AbstractEvent";
import { PublicProperties } from "../Type/PublicProperties";

class TestPayload extends AbstractPayload
{
  public examplePayloadProperty: string = null;
  public anotherExamplePayloadProperty: number = null;
  
  public validate(): boolean
  {
    return Boolean(this.examplePayloadProperty && this.anotherExamplePayloadProperty);
  }
}

class TestResponse extends AbstractResponse
{
  public exampleResponseProperty: string = null;
  public anotherExampleResponseProperty: number = null;
}

class TestEvent extends AbstractEvent<TestPayload, TestResponse>
{
  protected getPayload(data: PublicProperties<TestPayload>): TestPayload
  {
    const payload = new TestPayload();
    payload.examplePayloadProperty = data.examplePayloadProperty;
    payload.anotherExamplePayloadProperty = data.anotherExamplePayloadProperty;
    return payload;
  }

  protected process(payload: TestPayload): TestResponse
  {
    return new TestResponse();
  }
}

describe("AbstractEvent", () => {
 
  describe("constructor", () => {
    
    it("creates an instance of the event class when passed a valid payload instance", () => {
      const payload = new TestPayload();
      payload.examplePayloadProperty = "example";
      payload.anotherExamplePayloadProperty = 123;
      const event = new TestEvent(payload);
      expect(event).toBeInstanceOf(TestEvent);
    });
    
    it("creates an instance of the event class when passed valid payload data", () => {
      const event = new TestEvent({
        examplePayloadProperty: "example",
        anotherExamplePayloadProperty: 123,
      });
      expect(event).toBeInstanceOf(TestEvent);
    });
    
    it("throws an error if it is passed a non-object payload", () => {
      const nonObjectPayloads = [ null, undefined, 123, "example", true, false, () => {}, [1, 2, 3] ];
      
      for (const payload of nonObjectPayloads)
      {
        expect(() => {
          new TestEvent(payload as any);
        }).toThrow(TypeError);
      }
    });
 
    it("throws an error if the payload is invalid object", () => {
      expect(() => {
        new TestEvent({
          examplePayloadProperty: "example",
          anotherExamplePayloadProperty: null,
        });
      }).toThrow(TypeError);
      expect(() => {
        new TestEvent({
          examplePayloadProperty: null,
          anotherExamplePayloadProperty: 123,
        });
      }).toThrow(TypeError);
    });
    
    it("calls the payload validate method once (if payload instance provided)", () => {
      const payload = new TestPayload();
      payload.examplePayloadProperty = "example";
      payload.anotherExamplePayloadProperty = 123;
      const mockValidateMethod = jest.spyOn(payload, 'validate');
      const event = new TestEvent(payload);
      expect(event).toBeInstanceOf(TestEvent);
      expect(mockValidateMethod).toHaveBeenCalledTimes(1);
    });
    
  });
  
  describe("execute", () => {
    
    it("returns an instance of the response class", () => {
      const event = new TestEvent({
        examplePayloadProperty: "example",
        anotherExamplePayloadProperty: 123,
      });
      const response = event.execute();
      expect(response).toBeInstanceOf(TestResponse);
    });
    
    it("process method is called internally once", () => {
      const event = new TestEvent({
        examplePayloadProperty: "example",
        anotherExamplePayloadProperty: 123,
      });
      const mockProcessMethod = jest.spyOn(event as any, 'process');
      const response = event.execute();
      expect(response).toBeInstanceOf(TestResponse);
      expect(mockProcessMethod).toHaveBeenCalledTimes(1);
    });
    
  });
  
});
