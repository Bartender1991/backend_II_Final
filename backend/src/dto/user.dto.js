export default class UserDTO {
    constructor(user) {
        this.id = user._id;
        // this.fullName = `${user.first_name} ${user.last_name}`;
        this.fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart;
        this.age = user.age;
    }
}