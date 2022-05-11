// import all required modules
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const height = 10;
const width = 10;

// Field class which contains the methods 

class Field {
    
    constructor(field = [[]]) {
       this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        
        // Set the starting position in the field as the pathCharacter
        this.field[0][0] = pathCharacter;



      /*  for (let a = 0; a < height; a++) 
        {
            this.field[a] = [];
        }
        this.generateField();*/

    }

    /*generateField() 
    {
        for (let y = 0; y < width; y++) 
        {
            for(let x = 0; x < height; x++)
            {
                const prob = Math.random();
                this.field[y][x] = fieldCharacter;
            }
        }
    }*/


    

    
    runGame() {

        let gameActive = true;

        while(gameActive){

            this.print();
            this.askQuestion();

            if((this.locationY < 0 || this.locationX < 0) || (this.locationY > this.field.length))
                {
                console.log ("Out of bound.You Lose! Game over");
                gameActive = false;
                break;
                }
                else if (this.field[this.locationY][this.locationX] === hole)
                 {
                 console.log("sorry, you fell down  a hole!");
                 gameActive = false;
                 break;  
                 } 
                 else if (this.field[this.locationY][this.locationX] === hat)
                    {
                    console.log("Congrats, You found your hat, you win");
                    gameActive = false;
                    break;
                    }
                else  {
                        console.log("Play again");
                 }

                this.field[this.locationY][this.locationX] = pathCharacter;       
        }

        
    }
        // prompt the player with the question of which way they want to go to find their hat U, D, L, or R
    
        askQuestion() {
        const direction = prompt('Which way you want to go? ').toUpperCase();
        switch (direction) {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            case 'R':
                this.locationX += 1;
                break;
            default:
                console.log(' Please Enter U for Up, D for Down, L for Left, R for Right ');
                this.askQuestion();
                break;
        }
    }
            
    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    //generating fields with holes
    
     static generateField(height, width, percentage) {
        const field = new Array(height).fill(0).map(element => new Array(width));
        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }


        // creating the hat location object
        const hatLocation = {
           hatx: Math.floor(Math.random() * width),
           haty: Math.floor(Math.random() * height)
        };
        if (hatLocation.hatx === 0 && hatLocation.haty === 0) {
            hatLocation.hatx = Math.floor(Math.random() * width);
            hatLocation.haty = Math.floor(Math.random() * height);
        }
        field[hatLocation.haty][hatLocation.hatx] = hat;
        return field;
    }
}
      const myField = new Field(Field.generateField(10,10,0.2));
      myField.runGame();


  
    
      
   
     