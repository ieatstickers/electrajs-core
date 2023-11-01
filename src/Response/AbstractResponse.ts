
export abstract class AbstractResponse
{
  public serialize(): string
  {
    return JSON.stringify(this);
  }
}
