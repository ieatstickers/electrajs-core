import { AbstractResponse } from "../Response/AbstractResponse";

export interface EventInterface<Response extends AbstractResponse | Promise<AbstractResponse>>
{
  execute(): Response | Promise<Response>
}
