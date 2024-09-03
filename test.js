import { words } from "./common/word_list.js";
import axios from "axios";
async function getFrequency(word){
    //makes api call to https://api.datamuse.com/words?sp=${word}&md=f&max=1
    //returns the frequency of the word
    try{
        const response = await axios.get(`https://api.datamuse.com/words?sp=${word}&md=f&max=1`);
        return parseFloat(response.data[0].tags[0].split(":")[1]);
    } catch(e){
        console.log(word);
        return 0;
    }
}
(async () => {
    const wordFrequencyPromises = words.map(word => getFrequency(word).then(frequency => ({ word, frequency })));
  
    const wordFrequencies = await Promise.all(wordFrequencyPromises);
  
    wordFrequencies.sort((a, b) => b.frequency - a.frequency);
    // console.log(wordFrequencies);
    //log every 20th word:
    for(let i = 0; i < wordFrequencies.length; i += 20){
        console.log(wordFrequencies[i]);
    }
})();