import { PublicProperties } from "../Type/PublicProperties";
import { AbstractPayload } from "../Payload/AbstractPayload";
import { AbstractResponse } from "../Response/AbstractResponse";
import { EventInterface } from "./EventInterface";

export abstract class AbstractEvent<Payload extends AbstractPayload, Response extends AbstractResponse | Promise<AbstractResponse>> implements EventInterface<Response>
{
  private readonly payload: Payload;

  public constructor(payload: Payload | PublicProperties<Payload>)
  {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new TypeError(`Payload data passed to ${this.constructor.name} must be an object`);
    this.payload = payload instanceof AbstractPayload ? payload : this.getPayload(payload);
    if (!this.payload.validate()) throw new TypeError(`Invalid payload data passed to ${this.constructor.name}`);
  }

  protected abstract getPayload(data: PublicProperties<Payload>): Payload;

  protected abstract process(payload: Payload): Response;

  public execute(): Response
  {
    return this.process(this.payload);
  }
}
