import {JsonObject, JsonMember, TypedJSON} from "./../../typed-json";

@JsonObject
class Person {
    @JsonMember({ type: String })
    firstName: string;

    @JsonMember({ type: String })
    lastName: string;

    public getFullname(): string {
        return this.firstName + " " + this.lastName;
    }
}

export function test(log: boolean): boolean {
    var person = TypedJSON.parse('{ "firstName": "John", "lastName": "Doe" }', Person);

    return person.getFullname() === "John Doe" && person instanceof Person;
}
