import { PublicProperties } from "../Type/PublicProperties";
import { AbstractPayload } from "../Payload/AbstractPayload";
import { AbstractResponse } from "../Response/AbstractResponse";
import { EventInterface } from "./EventInterface";
export declare abstract class AbstractEvent<Payload extends AbstractPayload, Response extends AbstractResponse | Promise<AbstractResponse>> implements EventInterface<Response> {
    private readonly payload;
    constructor(payload: Payload | PublicProperties<Payload>);
    protected abstract getPayload(data: PublicProperties<Payload>): Payload;
    protected abstract process(payload: Payload): Response;
    execute(): Response;
}
