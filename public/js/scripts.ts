import * as readline from 'readline';
import { printTitle } from './asciArt';
import { quickSort, heapSort, stableSort, mergeSort } from "./sortingAlgs";
import { typeText, textSpeed, textColor } from "./TextPrinter";
import { PersonInfo } from './app';
import { CommandMenu } from './CommandMenu';
import * as inpVal from './inputValidation';


let name = "Recruiter";
let fullName = "Recruiter";
let nameData = ['R', 'e', 'c', 'r', 'u,', 'i', 't', 'e', 'r'];
const fs = require('fs');
const dataPath = 'flatData.json';
const validStates: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];


export async function menuSorts() {
    let sortLoop = true;
    while (sortLoop) {
        await typeText(`\n\nWhich sorting algorithm do you want to learn about?\n`, textSpeed.very_fast, false, textColor.green);
        await typeText(`\n\n1. Merge Sort\n2. Quick Sort\n0. Back to menu\n`, textSpeed.uber_speed, false, textColor.green);
        let sortReader = newReadLine();
        let sortChoice = await getUserInput(sortReader);
        sortReader.close();
        switch (sortChoice) {
            case "1":
                await typeText("\n\nMerge sort has a great best-case time complexity of nlogn, and allows for more deterministic/reliable time predictions when compared to quicksort (which uses random pivots).", textSpeed.very_fast, false, textColor.green);
                await typeText("\n\nIt retains relative positions of identical values, and so is useful when stability is paramount.", textSpeed.very_fast, false, textColor.green);

                let mergeSortLoop = true;
                while (mergeSortLoop) {

                    await typeText(`\n\nWould you like to know more?`, textSpeed.very_fast, false, textColor.green);
                    await typeText(`\n\n1. Show me in action\n2. When to use mergesort?\n3. Back to other sorts\n`, textSpeed.uber_speed, false, textColor.green);
                    let mergeSortReader = newReadLine();
                    let mergeSortChoice = await getUserInput(mergeSortReader);
                    mergeSortReader.close();

                    switch (mergeSortChoice) {
                        case "1":
                            await typeText(`\nAnd we're left with your sorted name: ${mergeSort(name.toLocaleLowerCase())}`, textSpeed.very_fast, false, textColor.green);
                            break;

                        case "2":
                            await typeText("\n\nSay you, me, and some other grumpy people are waiting at the dmv. First we take everyone’s names and ask what they need:\n\n", textSpeed.very_fast, false, textColor.green);

                            let dmv: PersonInfo[] = [];
                            dmv.push({ fName: "Seth", licenseType: "A" });
                            dmv.push({ fName: "Jeff", licenseType: "B" });
                            dmv.push({ fName: name, licenseType: "C" });
                            dmv.push({ fName: "Jack", licenseType: "C" });
                            dmv.push({ fName: "Zack", licenseType: "A" });
                            dmv.push({ fName: "Jenny", licenseType: "B" });
                            dmv.push({ fName: "Becka", licenseType: "B" });
                            dmv.push({ fName: "Daisy", licenseType: "A" });
                            dmv.push({ fName: "Lenny", licenseType: "C" });

                            dmv.forEach((patron) => {
                                console.log(patron.fName + " needs a class " + patron.licenseType + " license");
                            })

                            await typeText("\nNow, everyone is claiming they were there first. What a headache! We decide the only fair way to see people is in alphabetical order.", textSpeed.very_fast, false, textColor.green);
                            await typeText(" We want to get started right away, so we use heapsort. This leaves us with:\n", textSpeed.very_fast, false, textColor.green);

                            const dmv_Alph = heapSort(dmv, "fName");
                            const maxNameLength = Math.max(...dmv.map((person) => person.fName.length));

                            dmv_Alph.forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });

                            await typeText("\nIt was almost easy, but it turns out it takes longer to process class C licenses than to process class B licenses. ", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nWe decide to use heap sort on our new array, this time sorting by license type:\n", textSpeed.very_fast, false, textColor.green);

                            const wrongSort = heapSort([...dmv_Alph], "licenseType");
                            wrongSort.forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });

                            await typeText("\nOh no! Now the licenses are in order but our work sorting names alphabetically has been destroyed! \n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nYou see, If we had used a stable sorting algorithm like Merge Sort, we could have kept relative positions of names intact: \n", textSpeed.very_fast, false, textColor.green);

                            stableSort(dmv_Alph).forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });
                            break;
                        default:
                            mergeSortLoop = false;
                            break;
                    }
                }

                break;
            case "2":
                await typeText("Quicksort is similar to merge sort in terms of its divide and conquer approach, but instead of always dividing a dataset in half, it chooses a pivot and recursively sorts the sides of the dataset that are larger or smaller.\n\n", textSpeed.very_fast, false, textColor.green);
                await typeText("It retains the best case scenario time complexity of merge sort: (nlogn), but does better with memory: (logn)\n", textSpeed.very_fast, false, textColor.green);
                let quickSortLoop = true;
                while (quickSortLoop) {
                    await typeText(`\n\nWould you like to know more?`, textSpeed.very_fast, false, textColor.green);
                    await typeText(`\n\n1. Show me in action\n2. When to use quicksort?\n0. Back to other sorts\n`, textSpeed.uber_speed, false, textColor.green);
                    let quickSortReader = newReadLine();
                    let quickSortChoice = await getUserInput(quickSortReader);
                    quickSortReader.close();

                    switch (quickSortChoice) {
                        case "1":
                            await typeText("If we were to sort you name alphabetically using quicksort, it would go like this:\n", textSpeed.very_fast, false, textColor.green);
                            const sortedName: string = quickSort(fullName.toLowerCase().replace(/ /g, ''));
                            await typeText("\nAnd now we're left with your new, better sorted name! ", textSpeed.very_fast, false, textColor.green);
                            await typeText(" I think " + sortedName + " fits you better anyway.", textSpeed.very_fast, false, textColor.green);
                            break;
                        case "2":
                            await typeText("Quicksort sorts items “in place”, meaning it does not need to create copies of the data it’s sorting, but rather partitions and sorts data within the original array. \n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nWhile mergesort might be more efficient when sorting large datasets, quicksort can still be preferable for large datasets when memory is a consideration.\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nSuppose you're working on a server application that needs to sort a large dataset of customer orders for a retail website.\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nEach order is represented as an object with various details, including order number, date, customer information, and order value. You need to sort these orders by order number, and the dataset is too large to fit entirely in memory.\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\n\nIn this instance, quicksort would be the ideal choice.\n", textSpeed.very_fast, false, textColor.green);
                            break;
                        case "0":
                            quickSortLoop = false;
                            break;

                        default:
                            break;
                    }
                }
                break;
            case "0":
                sortLoop = false;
                break;
            default:
                break;
        }
    }
}

export async function menu_input() {
    const inputMenu = new CommandMenu();
    inputMenu.setMenuMessage("Handling input is one of the most important aspects of a user interface. Invalid input, whether entered purposely or by mistake accounts for most of the code in place for decision fields.")
    inputMenu.setMenuQuestion("What would you liek to know?")
    inputMenu.addOption("Run an example", async () => {
        await example_inputValidation();
    })
    inputMenu.addOption("Types of input validation", async () => {
        const validationTypesMenu = new CommandMenu();
        validationTypesMenu.setMenuMessage("Whitelisting and Blacklisting are two broad categories of input validation, but there are many more specific types depending on your needs.")
        validationTypesMenu.setMenuQuestion("Which type of validation would you like to learn about?")
        
        validationTypesMenu.addOption("Blacklisting", async () => {
            await typeText("\nIn terms of input validation, blacklisting is a technique used to block or reject specific inputs that match predefined patterns or criteria.", textSpeed.very_fast, true, textColor.green);
            await typeText("It involves maintaining a list (the 'blacklist') of input values, characters, patterns, or keywords that are considered invalid or potentially dangerous, and any input that matches these criteria is rejected or flagged.\n", textSpeed.very_fast, true, textColor.green);
        })  
        validationTypesMenu.addOption("Whitelisting", async () => {
            await typeText("\nIn the context of input validation, whitelisting is a security approach where you explicitly define and allow only specific, predefined inputs or input patterns as valid, while rejecting or blocking any input that does not match these approved criteria.\n", textSpeed.very_fast, true, textColor.green);
            await typeText("\n\nWhitelisting is used in this code whenever you are asked to select a number!\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Length Check Validation", async () => {
            await typeText("\nLength Checks Validation checks whether the length of the data is within acceptable limits. For example, validating that a password is at least 8 characters long.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Range Check Validation", async () => {
            await typeText("\nRange checks involve verifying that a value falls within an acceptable range. For instance, ensuring that an age field contains a value between 0 and 150.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Type Check Validation:", async () => {
            await typeText("\nType checks involve verifying that the data entered is of the correct data type. For example, ensuring that a field meant for numerical values only contains numbers, and a field meant for email addresses contains a valid email format.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Pattern Matching Validation:", async () => {
            await typeText("\nPattern matching checks use regular expressions or patterns to validate data. For example, validating that a date is in the format YYYY-MM-DD.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("List Check Validation:", async () => {
            await typeText("\nList checks involve validating that the entered data matches an item from a predefined list. For instance, validating that a state code corresponds to a valid U.S. state\n", textSpeed.very_fast, true, textColor.green);
        })
        await validationTypesMenu.start();
    })
    await inputMenu.start();
}

export async function message_intro() {
    await typeText("Welcome to the back end", textSpeed.medium, true, textColor.green);
    printTitle();
    await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of programming tasks; An interactive mind map to showcase my knowledge and give you insight into my approach to problem solving.\n", textSpeed.very_fast, false, textColor.green);

}

async function example_inputValidation() {


    let nameLimit = 11; //char limit for names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

    const inputForm = new CommandMenu();

    inputForm.setMenuMessage("\nLet’s present some questions you might find on an average form, and we’ll discuss the input validation needed to process your input:\n");
    inputForm.setMenuQuestion("Select a field to fill out:");
    inputForm.addOption('Age', async () => {
        let ageValid = false;
        while (!ageValid) {
            await typeText("\n\nPlease enter your age: \n", textSpeed.fast, true, textColor.cyan);

            let ageReader = newReadLine();
            const ageChoice = await getUserInput(ageReader);
            ageReader.close();

            //Data Type
            if (inpVal.dataTypeValid(ageChoice, "number")) {
                await typeText("1. Using Data Type Validation, we can determine that your input is indeed an integer\n", textSpeed.very_fast, false, textColor.green);
                const age = parseInt(ageChoice);

                //Range
                if (inpVal.rangeValid(age, 5, 105)) {
                    await typeText("2. Using Range Validation, we can determine that the age given is within the bounds of reasonability: (5 > age < 105)", textSpeed.very_fast, false, textColor.green);
                    await typeText("\nBased on these results, we can be reasonably sure the given age is valid!\n", textSpeed.very_fast, false, textColor.white);
                    ageValid = true;
                } else {
                    await typeText("2. Using Range Validation , we determine that the given age is outside the range of reasonability. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Data Type Validation, we can determine that your input is not an integer, and thus is not valid. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    });

    inputForm.addOption('Name', async () => {
        let nameValid = false;
        while (!nameValid) {
            await typeText("\n\nPlease enter your full name: \n", textSpeed.fast, true, textColor.cyan);

            let nameReader = newReadLine();
            const nameChoice = await getUserInput(nameReader);
            nameReader.close();
            let fullNameArray = nameChoice.split(" ");

            //Validation//
            //range of array
            if (inpVal.rangeValid(fullNameArray, 1, 5)) {
                await typeText("1. Using Range Validation, we can determine that your input contains between 2 and 4 names\n", textSpeed.very_fast, false, textColor.green);

                //length of names 
                let lengthValid = true;
                for (let i = 0; i < fullNameArray.length; i++) {
                    const name = fullNameArray[i];
                    if (!inpVal.lengthValid(name, nameLimit)) {
                        lengthValid = false;
                        break;
                    }
                }
                if (lengthValid) {
                    await typeText("2. Using Length Validation, we can determine your names are a reasonable length\n", textSpeed.very_fast, false, textColor.green);

                    //datatype
                    if (!inpVal.StringHasInt(nameChoice)) {
                        await typeText("3. Using Data Type Validation, we can determine that your input does not contain integers\n", textSpeed.very_fast, false, textColor.green);

                        //blacklist
                        if (inpVal.noBlacklistedItems(nameChoice, charBlackList)) {
                            await typeText("4. Using Blacklist Validation, we can determine that your input does not contain any blacklisted chars\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nBased on these results, we can be reasonably sure the given name is valid!\n", textSpeed.very_fast, false, textColor.white);
                            nameValid = true;
                        } else {
                            await typeText("4. Using Blacklist Validation, we can determine that your names contain blacklisted chars. Try again?\n", textSpeed.very_fast, false, textColor.red);

                        }

                    } else {
                        await typeText("3. Using Data Type Validation, we determine that the given name contains an integer. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
                    }
                } else {
                    await typeText("2. Using Length Validation, we can determine that one of your names is not an acceptable length\n", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Range Validation, we can determine that your input does not contain between 2 and 4 names. Try entering your FULL name\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    });

    inputForm.addOption('Birthday', async () => {
        let dateValid = false;
        while (!dateValid) {
            await typeText("\n\nPlease enter your birthdate in the form MM/DD/YYYY: \n", textSpeed.fast, true, textColor.cyan);
            let dateReader = newReadLine();
            const dateChoice = await getUserInput(dateReader);
            dateReader.close();

            if (inpVal.dateValid(dateChoice)) {
                await typeText("1. Using Format Check Validation, we can determine that your date is valid.\n", textSpeed.very_fast, false, textColor.green);
                const birthDate = new Date(dateChoice);
                const currentDate = new Date();

                const currentYear = currentDate.getFullYear();
                const birthYear = birthDate.getFullYear();

                if (inpVal.rangeValid(birthYear, currentYear - 100, currentYear - 10)) {
                    await typeText("2. Using Range Validation, we can determine that your date is in a reasonable range\n", textSpeed.very_fast, false, textColor.green);
                    await typeText("\nBased on these results, we can be reasonably sure your birthdate is valid!\n", textSpeed.very_fast, false, textColor.white);
                    dateValid = true;
                } else{
                    await typeText("2. Using Range Validation, we can determine that your input is invalid. Unless you are ", textSpeed.very_fast, false, textColor.red);
                    await typeText((currentYear - birthYear).toString() + " years old.", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Format Check Validation, we can determine that your date you entered is not in a valid form. Try again:\n", textSpeed.very_fast, false, textColor.red);
            }

        }
    });

    inputForm.addOption('State', async () => {
        let stateValid = false;
        while (!stateValid){
            await typeText("Please enter your state in two-letter format (example: TX)\n", textSpeed.very_fast, false, textColor.green);
             let stateReader = newReadLine();
            const stateChoice = await getUserInput(stateReader);
            stateReader.close();

            if(validStates.includes(stateChoice.toUpperCase())){
                await typeText("1. Using List Check Validation, we can determine that your input is a valid state.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("Note: Because List Check Validation is a form of whitelisting, other validation methods like length and type validation are not needed!\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nBased on these results, we can be reasonably sure your state input is valid\n", textSpeed.very_fast, false, textColor.white);
                stateValid = true;
            } else{
                await typeText("1. Using List Check Validation, we can determine that your input is not a valid state.\n", textSpeed.very_fast, false, textColor.red);
            }
            
        }
    })

    await inputForm.start();
}


export async function checkData() {

    const emptyData = {
        "nameData": "",
    }
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify(emptyData), 'utf8');
        await askForName();
    } else {
        let dataBank = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        name = dataBank.nameData[0];
        fullName = dataBank.nameData.join(" ");
        nameData = dataBank.nameData;

        await typeText("\nWelcome back, " + name + "!", textSpeed.very_fast, false, textColor.green);
    }
}

export async function askForName() {

    await typeText("\n\nLet’s start out simple: What is your", textSpeed.fast, false, textColor.green);
    process.stdout.write(" name");
    await typeText("?\n\n", textSpeed.uber_speed, false, textColor.green);

    let q1_Input = newReadLine();
    const userInput = await getUserInput(q1_Input);
    q1_Input.close();

    const nameArray = userInput.split(' ');
    name = nameArray[0];
    fullName = userInput;
    nameData = nameArray;

    let nameLimit = 10; //char limit for first names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

    let dataBank = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    dataBank.nameData = nameData;

    fs.writeFileSync(dataPath, JSON.stringify(dataBank));

    //check for blank input
    if (nameArray[0].trim() == "") {
        name = "Recruiter"
        await typeText("\nNot the very trusting sort, are you?", textSpeed.very_fast, false, textColor.green);
        await typeText("\nI suppose you can never be too careful in this day in age", textSpeed.very_fast, false, textColor.green);
        await typeText("\nI'll just call you Recruiter", textSpeed.very_fast, false, textColor.green);
    }

    //otherwise print normal response
    else {
        await typeText("\nNice to meet you, " + name + "!", textSpeed.very_fast, false, textColor.green);
        if (nameArray[0].length > nameLimit || !inpVal.noBlacklistedItems(fullName, charBlackList) || nameArray.length > 3) {
            await typeText("\n(Although I doubt that's your real name...)", textSpeed.very_fast, false, textColor.green);
            await typeText("\n\nWhatever your name may be, let’s get down to buisness", textSpeed.very_fast, false, textColor.green);
        }
        else {
            await typeText("\n\nNow that we’re on a first name basis, I'll save your name into my memory", textSpeed.very_fast, false, textColor.green);
        }
    }
}

function newReadLine(): readline.Interface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}



function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}

function getUserInput(rl: readline.Interface): Promise<string> {
    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            resolve(input);
        });
    });
}



