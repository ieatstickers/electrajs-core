import { PublicProperties } from "../Type/PublicProperties";
import { AbstractPayload } from "../Payload/AbstractPayload";
import { EventInterface } from "./EventInterface";
export declare abstract class AbstractEvent<Payload extends AbstractPayload, Response> implements EventInterface<Response> {
    private readonly payload;
    constructor(payload: Payload | PublicProperties<Payload>);
    protected abstract getPayload(data: PublicProperties<Payload>): Payload;
    protected abstract process(payload: Payload): Response;
    execute(): Response;
}
