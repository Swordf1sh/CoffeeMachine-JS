const input = require('sync-input')
let result = null;
let reason = null;

const coffee = {
    'espresso': {
        'water': 250,
        'milk': 0,
        'beans': 16,
        'cost': 4
    },
    'latte': {
        'water': 350,
        'milk': 75,
        'beans': 20,
        'cost': 7
    },
    'cappuccino': {
        'water': 200,
        'milk': 100,
        'beans': 12,
        'cost': 6
    }
}
let budget = 550;
let water = 400;
let milk = 540;
let beans = 120;
let cups = 9;

function welcomeMessage() {
    console.log(`The coffee machine has:`);
    console.log(`${water} ml of water`);
    console.log(`${milk} ml of milk`);
    console.log(`${beans} g of coffee beans`);
    console.log(`${cups} disposable cups`);
    console.log(`$${budget} of money`);
    console.log();
}

function makeCoffee(waterC, milkC, beansC, priceC) {
  if (water < waterC) { return [false, 'water'] }
  else {
    water -= waterC;
    milk -= milkC;
    beans -= beansC;
    budget += priceC;
    cups--;
    return [true, ''];
  }
}

function chooseCoffee() {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ")
    switch (Number(input())) {
        case 1: // espresso
            result, reason = makeCoffee(coffee.espresso.water, coffee.espresso.milk, coffee.espresso.beans,
                                       coffee.espresso.cost)
            break;
        case 2:
            result, reason = makeCoffee(coffee.latte.water, coffee.latte.milk, coffee.latte.beans,
                                       coffee.latte.cost)
            break;
        case 3:
            water -= coffee.cappuccino.water;
            milk -= coffee.cappuccino.milk;
            beans -= coffee.cappuccino.beans;
            budget += coffee.cappuccino.cost;
            cups--;
            break;
        default:
            return
    }
}

function takeBudget() {
    budget = 0;
    console.log(`I give you $${budget}`)
}

function fillMachine() {
    console.log("Write how many ml of water you want to add:");
    water += Number(input());
    console.log("Write how many ml of milk you want to add:");
    milk += Number(input());
    console.log("Write how many grams of coffee beans you want to add:");
    beans += Number(input());
    console.log("Write how many disposable cups you want to add:");
    cups += Number(input());
}

while (true) {
    console.log("Write action (buy, fill, take, remaining, exit):");
    let exit = false;
    switch (input()) {
        case 'buy':
            chooseCoffee();
            break;
        case 'take':
            takeBudget();
            break;
        case 'fill':
            fillMachine();
            break;
        case 'remaining':
            welcomeMessage();
            break;
        case 'exit':
            exit = true;
            break;
    }
    if (exit) { break }
}
