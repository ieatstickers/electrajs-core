
export abstract class AbstractPayload
{
  public validate(): boolean
  {
    return true;
  }
  
  public serialize(): string
  {
    return JSON.stringify(this);
  }
}
