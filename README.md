# @electra/core

A collection of core classes use across the suite of @electra packages.

This is a simple package that allows contains the bare bones for wrapping up chunks of logic into events that can be
executed.

The main classes that exist are `AbstractPayload`, `AbstractResponse` and `AbstractEvent`.

`AbstractPayload` is used to define the data that will be passed into an event. It also contains a `validate()` method
that can be overridden to perform validation on the data.

`AbstractResponse` is used to define the data that will be returned from an event.

`AbstractEvent` is used to define the logic that will be executed when an event is executed. It contains a `process()`
method that can be overridden to perform the event's main logic.

The `AbstractEvent`'s constructor calls the payload's `validate` method and throws a `TypeError` if it is invalid. This
prevents the event from being executed with invalid data.

This payload, event, response pattern allows for a clean separation of conce rns and allows for the event to be tested
in isolation. It also allows us to call the logic programmatically, queue up a payload to be processed later by a
worker, or register the event with an HTTP router and hydrate the payload parameters from the request body/route
params (see @electra/web).

## Installation

Using npm:

```bash
npm install @electra/core
```

Using yarn:

```bash
yarn add @electra/core
```

## Usage

Classes are exported as named exports from `@electra/core`.

```typescript
// Import classes and types from @electra/core
import { AbstractPayload, AbstractResponse, AbstractEvent, PublicProperties } from '@electra/core';

// Define a payload class
class UpdateUserPayload extends AbstractPayload
{
  public id: number;
  public name: string;
  public age: number;
  
  // This payload is only valid if all properties are set
  public validate(): boolean
  {
    return Boolean(this.id && this.name && this.age);
  }
}

// Define a response class
class UpdateUserResponse extends AbstractResponse
{
  public user: { id: number, name: string, age: number };
}

// Define the event clas
class UpdateUserEvent extends AbstractEvent<UpdateUserPayload, UpdateUserResponse>
{
  // The getPayload method is used to convert the data passed into the event into the payload class
  // This allows the event constructor to accept a payload class instance or the necessary data to construct one
  // The PublicProperties type is used to extract the public properties from the payload class
  protected getPayload(data: PublicProperties<UpdateUserPayload>): UpdateUserPayload
  {
    const payload = new UpdateUserPayload();
    payload.id = data.id;
    payload.name = data.name;
    payload.age = data.age;
    return payload;
  }
  
  // The process method is used to perform the event's main logic
  protected process(payload: UpdateUserPayload): UpdateUserResponse
  {
    const response = new UpdateUserResponse();
    
    // Save user to database
    const user = User.getById(payload.id);
    user.name = payload.name;
    user.age = payload.age;
    user.save();
    
    // Add user to response
    response.user = user;
    
    return response;
  }
}

// Create an instance of the event (this will hydrate the relevant payload class by calling the getPayload method)
// If the resulting payload instance is invalid, a TypeError will be thrown
const event = new UpdateUserEvent({ id: 1, name: "John McClane", age: 35 });
// The event can be executed by calling the execute method (this internally calls the process method)
event.execute();

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
