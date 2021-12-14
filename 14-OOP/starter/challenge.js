'use strict';


// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h.

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console.

Car.prototype.accelerate = function () {
  this.speed *= 10;
  console.log('this is speed * 10', this.speed);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5,and log the new speed to the console.

Car.prototype.brake = function () {
  this.speed = Number(this.speed) / 5;
  console.log('this is speed / 5', this.speed);
};

// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

const familyCar = new Car('van', 40);
console.log('family Car', familyCar);
familyCar.accelerate();

const bachelorCar = new Car('corvette', 150);
console.log(bachelorCar);
bachelorCar.accelerate();

// CODING CHALLENGE 2

//  1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    return this.speed * 10;
  }

  brake() {
    return this.speed / 5;
  }

  // 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
  // by 1.6)

  get speedUS() {
    const speedUS = this.speed / 1.6;
    return `${speedUS} mi/h`;
  }

  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
  // converts it to km/h before storing the value, by multiplying the input by 1.6)

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  // 4. Create a new car and experiment with the 'accelerate' and 'brake'
  // methods, and with the getter and setter.
}

const nissan = new CarCl('nissan', 200);
console.log(nissan);
console.log('this is nissan.accelerate', nissan.accelerate());
console.log(' this is nissan.brake', nissan.brake());
nissan.speedUS = 50;

// CODING CHALLENGE 3

// 1. Use a constructor function to implement an Electric Car (called'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
    this.charge = charge;
  }
    
    // 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
    
    EV.prototype = Object.create(Car.prototype);

    EV.prototype.chargeBattery = function  (chargeTo)  {
      this.charge = chargeTo;
    }
    
    // 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
    
    EV.prototype.accelerate = function (){
      console.log(typeof this.speed)
      this.speed += 20;
      this.charge --;
      console.log(`${this.make} going at ${this.speed}, with a charge of ${this.charge}%`)
    }


// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉
// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.chargeBattery = 90;
console.log(tesla)
tesla.accelerate();


// CHALLENGE 4

// 1. Re-create Challenge#3,but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class

class EVCl extends CarCl {
  #charge
  constructor(make, speed, charge) {
    super(make, speed)
    this.#charge = charge;
  }
  // 2. Make the 'charge' property private
  
  // 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
  accelerate(){
    this.speed += 20;
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  brake() {
    this.speed / 5;
    return this;
  }

}

// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian)
//console.log(rivian.#charge)

console.log("this is rivian")
rivian.accelerate().accelerate().accelerate().brake().chargeBattery(50).accelerate()
console.log(rivian.speedUS)
