const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const fifa2014 = fifaData.filter((pop)=>{
    return pop.Year === 2014
})
const home2014 = fifa2014.map((fifa)=>{
    return `Home Teams of ${fifa.Year}: ${fifa["Home Team Name"]}`
    // creates an array of only this sentence lol
})
console.log(home2014)

//(b) Away Team name for 2014 world cup final
const awayTeam = fifa2014.map((object) => {
    return `Away Teams of ${object.Year}: ${object["Away Team Name"]}`
})
console.log(awayTeam)

//(c) Home Team goals for 2014 world cup final
const homeGoals = fifa2014.map((fifa) => {
    return `${fifa["Home Team Name"]}: ${fifa["Home Team Goals"]}`
})
console.log(homeGoals)

//(d) Away Team goals for 2014 world cup final
const awayGoals = fifa2014.map((fifa) => {
    return `${fifa["Away Team Name"]}: ${fifa["Away Team Goals"]}`
})
console.log(awayGoals)

//(e) Winner of 2014 world cup final */
const finalGame = fifa2014.filter((fifa) => {
    return fifa.Stage === "Final";
})

console.log(finalGame)

const finalWinner = finalGame.map((win) => {
    if(win["Home Team Goals"] > win["Away Team Goals"]) {
        return `${win["Home Team Name"]} is the winner of ${win["Year"]} Final`
    } else if(win["Away Team Goals"] > win["Home Team Goals"]) {
        return `${win["Away Team Name"]} is the winner of ${win["Year"]} Final`
    }else {
        return 'there is an error in this code'
    }
})

console.log(finalWinner)


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(dataArray) {
    return dataArray.filter((object) => {
        return object.Stage === "Final";
    })
 }

 console.log(getFinals(fifaData))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, cb) {
   
    const finals = cb(arr);
    const years = finals.map((object) => {
        return object.Year;
    })

    return years;
}

console.log(getYears(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, cb) {
    const finals = cb(arr)
    const winners = finals.map((objects) => {
        if(objects["Home Team Goals"] > objects["Away Team Goals"]) {
            return objects["Home Team Name"];
        } else if(objects["Away Team Goals"] > objects["Home Team Goals"]) {
            return objects["Away Team Name"];
        }else if(objects["Away Team Goals"] === objects["Home Team Goals"]){

            //additional condition to find the tie split
            const splicedString = objects["Win conditions"].split(' ')
                if(splicedString.includes(objects["Home Team Name"])){
                    return objects["Home Team Name"];
                } else if(splicedString.includes(objects["Away Team Name"])){
                    return objects["Away Team Name"];
                } else {
                    return `This did not work`
                }
        }
    })
    return winners;
}

console.log(getWinners(fifaData, getFinals))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, finalsCb, yearsCb, winnersCb) {

    //feed in the first param, as a param of another function
    const years = yearsCb(arr, finalsCb)
    const winner = winnersCb(arr, finalsCb)

    const yearWon = winner.map((item, index) => {
        return `In ${years[index]}, ${item} won the world cup!`
    })
    return yearWon;
}

console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners))



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(cb) {
    const sumGoals = cb.reduce((accumulator, current) => {
        return (accumulator + current["Home Team Goals"] + current["Away Team Goals"]) 
    }, 0);
    return (sumGoals / cb.length).toFixed(2)
 }
 console.log(getAverageGoals(getFinals(fifaData)));


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials, finals){
    const homeIN = "Home Team Initials";
    const awayIN = "Away Team Initials";
    const homeGoal = "Home Team Goals"
    const awayGoal = "Away Team Goals"

    const init = initials.toUpperCase()


    const winn = finals(data).map((elem) => {
        if(elem[homeGoal] > elem[awayGoal]){
            return elem[homeIN]
        } else if(elem[homeGoal] < elem[awayGoal]) {
            return elem[awayIN]
        } else if (elem[homeGoal] === elem[awayGoal]){
            const winCo = elem["Win conditions"].split(' ')

            if(winCo.includes(elem["Home Team Name"])){
                return elem[homeIN]
            } else if(winCo.includes(elem["Away Team Name"])) {
                return elem[awayIN]
            }
            return;
        }
        return;
    })

    console.log(winn)
        
    let counter = 0;

    winn.forEach((elem) => {

        if(elem === init){
            counter++
            return;
        } else if(elem === init){
            counter++
            return;
        } else {
            // return console.log('help');
        }

    })

    if(counter !== 0){
        return `The country you have input (${initials}) has won the world cup ${counter} times!`
    } else if(counter === 0) { 
        return `The country you have input (${initials})has never won the world cup.`
    }

    return includes;
    //needs function that cycles matchs winner initials 
    //needs function that matches initials to winner
}

console.log(getCountryWins(fifaData, "FRG", getFinals))


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

    //find team with most goals
    // divide how many times that team has played
    const homeNgoal = data.map((elem) => {
        return {name: elem["Home Team Name"], goal: elem["Home Team Goals"]}
    })

    const awayNgoal = data.map((elem) => {
        return {name: elem["Away Team Name"], goal: elem["Away Team Goals"]}
    })

    const allNameNgoal = [...homeNgoal, ...awayNgoal]

    // loop through array
    // goal : group like name into one object ?

    const setName = new Set(allNameNgoal.map(elem => elem.name))
    const arrayName = [...setName]

    //create set = one name
    // turn set into array
    // push each goal into corresponding object

    const grouped = []

    //creates base object
    arrayName.forEach((elem) => {
        grouped.push({name: elem, goal: 0, appear: 0, goalPerApp: 0})
    })

    // allNameNgoal.forEach((elem) => {
    //     if(elem.name === grouped.name) {
    //         grouped.push
    //     }
    // })

    //need one loop to go over the array with name and goals
    //nested loop to go over setArray == find corresponding object

    //goes over each object in name and goal array
    for(let i = 0; i < allNameNgoal.length; i++) {

        // loops over set array(array for group)
        for(let j = 0; j < grouped.length; j++) {

            if(allNameNgoal[i].name === grouped[j].name) {
                let counter = grouped[j].goal;
                counter += allNameNgoal[i].goal;
                grouped[j].goal = counter;
                // grouped[j].push(allNameNgoal[i].goal)
            }
        }

        // loop to accumulate total appear
        for(let k = 0; k < grouped.length; k++) {
            if(allNameNgoal[i].name === grouped[k].name) {
                let countApp = grouped[k].appear
                countApp++
                grouped[k].appear = countApp;
            }
        }
    }

    const avGoalperApp = []

    grouped.forEach((elem) => {
        let quot = Math.round(elem.goal / elem.appear);

        avGoalperApp.push(quot);

        let num = elem.goalPerApp;
        num += quot
        elem.goalPerApp = num;
    })

    const greatestAv = Math.max(...avGoalperApp)

    const indexHold = []

    for(let l = 0; l < grouped.length; l++) {
        if(grouped[l].goalPerApp === greatestAv) {
            indexHold.push(grouped.indexOf(grouped[l]))
        }
    }

    if(indexHold.length <= 1) {
        return `The team with the greatest goals per appearance is ${grouped[indexHold[0]].name}`
    } else {
        return `The teams with the greatest goals per appearance is ${grouped[indexHold[0]].name} and ${grouped[indexHold[1]].name} at a ${grouped[indexHold[0]].goalPerApp} point average!`
    }

}

const finalFIFA = getFinals(fifaData)
console.log(getGoals(finalFIFA))

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {

    //find team with most goals
    // divide how many times that team has played
    const homeNgoal = data.map((elem) => {
        return {name: elem["Home Team Name"], goalOppos: elem["Away Team Goals"]}
    })

    const awayNgoal = data.map((elem) => {
        return {name: elem["Away Team Name"], goalOppos: elem["Home Team Goals"]}
    })

    const allNameNgoal = [...homeNgoal, ...awayNgoal]

    // loop through array
    // goal : group like name into one object ?

    const setName = new Set(allNameNgoal.map(elem => elem.name))
    const arrayName = [...setName]

    //create set = one name
    // turn set into array
    // push each goal into corresponding object

    const grouped = []

    //creates base object
    arrayName.forEach((elem) => {
        grouped.push({name: elem, goalOppos: 0, appear: 0, opposGoalPerApp: 0})
    })

    //need one loop to go over the array with name and goals
    //nested loop to go over setArray == find corresponding object

    //goes over each object in name and goal array
    for(let i = 0; i < allNameNgoal.length; i++) {

        // loops over set array(array for group)
        for(let j = 0; j < grouped.length; j++) {

            if(allNameNgoal[i].name === grouped[j].name) {
                let counter = grouped[j].goalOppos;
                counter += allNameNgoal[i].goalOppos;
                grouped[j].goalOppos = counter;
                // grouped[j].push(allNameNgoal[i].goal)
            }
        }

        // loop to accumulate total appear
        for(let k = 0; k < grouped.length; k++) {
            if(allNameNgoal[i].name === grouped[k].name) {
                let countApp = grouped[k].appear
                countApp++
                grouped[k].appear = countApp;
            }
        }
    }

    const avGoalperApp = []

    grouped.forEach((elem) => {
        let quot = Math.round(elem.goalOppos / elem.appear);

        avGoalperApp.push(quot);

        let num = elem.opposGoalPerApp;
        num += quot
        elem.opposGoalPerApp = num;
    })

    const greatestAv = Math.max(...avGoalperApp)

    const indexHold = []

    for(let l = 0; l < grouped.length; l++) {
        if(grouped[l].opposGoalPerApp === greatestAv) {
            indexHold.push(grouped.indexOf(grouped[l]))
        }
    }

    if(indexHold.length <= 1) {
        return `The team with the weakest defense per appearance is ${grouped[indexHold[0]].name} at a ${grouped[indexHold[0]].opposGoalPerApp} point average against them...`
    } else {
        return `The teams with the weakest defense per appearance is ${grouped[indexHold[0]].name} and ${grouped[indexHold[1]].name} at a ${grouped[indexHold[0]].opposGoalPerApp} point average against them...`
    }

}

console.log(badDefense(finalFIFA))

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
