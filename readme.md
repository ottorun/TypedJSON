# ts-json

Based on TypedJson https://github.com/ottorun/TypedJSON/ v0.1.4

JSON parsing and serializing for TypeScript that preserves type information, using [decorators](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md). Parse JSON into actual class instances. Recommended (but not required) to be used with [ReflectDecorators](https://github.com/rbuckton/ReflectDecorators), a prototype for an ES7 Reflection API for Decorator Metadata.

## Install & Use

```none
npm install ts-json
```

```none
Install-Package TypedJSON
```

 1. Snap the [@JsonObject decorator](https://github.com/ottorun/TypedJSON/wiki/API-reference#jsonobject) on a class
 2. Snap the [@JsonMember decorator](https://github.com/ottorun/TypedJSON/wiki/API-reference#jsonmember) on properties which should be serialized and deserialized
 3. Parse and stringify with the [TypedJSON class](https://github.com/ottorun/TypedJSON/wiki/API-reference#typedjson)

```typescript
@JsonObject
class Person {
    @JsonMember
    firstName: string;

    @JsonMember
    lastName: string;

    public getFullname() {
        return this.firstName + " " + this.lastName;
    }
}
```

```typescript
var person = TypedJSON.parse('{ "firstName": "John", "lastName": "Doe" }', Person);

person instanceof Person; // true
person.getFullname(); // "John Doe"
```

If you choose to omit using [ReflectDecorators](https://github.com/rbuckton/ReflectDecorators), the class (constructor function) of each [@JsonMember](https://github.com/ottorun/TypedJSON/wiki/API-reference#jsonmember) decorated property must be specified manually through the [`type` setting](https://github.com/ottorun/TypedJSON/wiki/API-reference#jsonmember), for example:

```typescript
@JsonMember({ type: String })
firstName: string;
```

[Learn more about decorators in TypeScript](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md)

## Features

 - Parse regular JSON into actual class instances safely
 - Handles complex nested objects and polymorphism
 - Seamlessly integrate into existing code with decorators, lightweight syntax
 - Customize serialization and deserialization process, like custom names, default values, and ordering

## Documentation

 - [API reference](https://github.com/ottorun/TypedJSON/wiki/API-reference)

## License

ts-json is licensed under the MIT License.
