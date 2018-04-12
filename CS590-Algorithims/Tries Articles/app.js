/* References
https://www.youtube.com/watch?v=7XmS8McW_1U
https://www.youtube.com/watch?v=zIjfhVPRZCg*/

let Node = function(){ // creates a Map 
    this.keys = new Map();
    this.end = false;
    this.setEnd = function(){
        this.end = true;
    };
    this.isEnd =function(){
        return this.end;
    };
};
let Trie = function(){ // creates a Trie data Structure
    this.root = new Node();
    this.add = function(input, node = this.root){ // Adds elements to Trie
        if (input.length == 0){
            node.setEnd();
            return;
        } else if (!node.keys.has(input[0])){
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1),node.keys.get(input[0]));
        } else{
            return this.add(input.substr(1),node.keys.get(input[0]));
        };
    };
    this.print = function() { // Prints the Trie
        let words = new Array();
        let search = function(node, string) {
            if (node.keys.size != 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                };
                if (node.isEnd()) {
                    words.push(string);
                };
            } else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            };
        };
        search(this.root, new String());
        return words.length > 0 ? words : mo;
    };    
    this.isWord = function(word) { // Searchs the Trie and returns True or False
    let node = this.root;
    while (word.length > 1) {
        if (!node.keys.has(word[0])) {
            return false;
        } else {
            node = node.keys.get(word[0]);
            word = word.substr(1);
        };
    };
    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? 
    true : false;
    };
};
// Declare all the required Variables
let myTrie = new Trie();
let fs = require('fs');
let util = require("util");
let ArticleStr = "";
let WordCount = 1;
let tempStr;
let finalStr = '';
let freqs={};
let freqs1={};
let tuples=[];
let tuples1=[];
let tuples2=[];
let rawWordCount = 1;
let len =0;
var omitWordCount = 0;
let companyNames,dups;
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin,output: process.stdout});
// read the Companies.dat file present in the same folder as the program/
fs.readFile('companies.dat','utf8',(err,data)=>{ 
            if (err) console.error("an error occured",err);
        else{
            companyNames = data;
            companyNames = companyNames.replace(/[.,-]/g, "");
            companyNames = companyNames.split("\r\n");
            for(var c = 0; c < companyNames.length; c++) {
                companyNames[c] = companyNames[c].split('\t');
            }
            dups = companyNames;
            // adding company names into trie structure
            for (let i=0; i< dups.length; i++){
                let l = dups[i].length;
                for (let j =0;j <l;j++)
                {
                    myTrie.add(dups[i][j]);
                }
            }
            console.log('A Trie Data structure is created with the Companies');  
            console.log("\nEnter Article below. End with a \".\" on a line by itself to mention end of Article.\n");
            // Read the Article
            rl.on('line', (input) => {
                if ( input == "." ) {	
                    rl.close();
                    ArticleStr = ArticleStr.trim();
                    for ( c = 0; c < ArticleStr.length ; c++ ){	//Word Count
                        if ( ArticleStr[c] == " " ){
                        rawWordCount += 1;
                        }
                    }
                    var LowerCaseArticleStr = ArticleStr;
                    var NoPunctArticleStr = "";
                    var StartPoint, EndPoint, CompanyN;
                    //Count omitted words
                    LowerCaseArticleStr = LowerCaseArticleStr.split(' ');
                    var omittedWords = ["and","but","the","an","a","or"];
                        for (let i = 0; i<omittedWords.length;i++){
                            for(let j= 0;j<LowerCaseArticleStr.length;j++){
                                if (omittedWords[i] == LowerCaseArticleStr[j]){
                                    omitWordCount = omitWordCount + 1;
                                }
                            }
                        }
                    for (var chr in ArticleStr) //Normalize article to remove punctuation
                        if ( ArticleStr[chr] != "!" && ArticleStr[chr] != ";" && ArticleStr[chr] != ":" && ArticleStr[chr] != "," && ArticleStr[chr] != "." && ArticleStr[chr] != "?" )
                            NoPunctArticleStr = NoPunctArticleStr + ArticleStr[chr];
                    NoPunctArticleStr = NoPunctArticleStr + " #";
                    WordCount = rawWordCount - omitWordCount ; 
                    frequency(NoPunctArticleStr);
                    for( var freq in freqs){
                        tuples.push([freq,freqs[freq]]);
                    }
                    len = tuples.length;
                    while (tuples.length > 0){
                        if (myTrie.isWord(tuples[0][0])){
                            for (let i=0; i< dups.length; i++){
                                let l = dups[i].length;
                                for (let j =0;j <l;j++)
                                {   
                                    if(tuples[0][0] ==dups[i][j])
                                    {
                                    tuples1.push(dups[i][0]);
                                    break;
                                    }
                                }
                            }
                            tuples.shift();
                        } 
                        else
                        {
                            tuples.shift();
                        }
                    }
                    finalStr =tuples1.join(' ');
                    frequency1(finalStr);
                    for( var freq in freqs1){
                        tuples2.push([freq,freqs1[freq]]);
                    }
                    report(); // displays result
                }
                else {
                    tempStr = input.trim() + " ";
                    ArticleStr = ArticleStr + tempStr;
                }
            });
        }});
let report = function(){ // Diaplays result
        console.log('===========================================================');
        console.log('\nCompany\t\t\tHit Count\tRelavence');
        let relavence = 0;
        while (tuples2.length >0){
            let letter = tuples2[0][0];
            if (letter.length < 6 )
            console.log('\n',tuples2[0][0],'\t\t\t',tuples2[0][1],'\t\t',Math.floor(tuples2[0][1]/WordCount*100*10000)/10000 ,'%'); 
            else if (letter.length > 5 && letter.length < 11 )
            console.log('\n',tuples2[0][0],'\t\t',tuples2[0][1],'\t\t',Math.floor(tuples2[0][1]/WordCount*100*10000)/10000,'%');
            else if (letter.length > 10 && letter.length < 16)
            console.log('\n',tuples2[0][0],'\t',tuples2[0][1],'\t\t',Math.floor(tuples2[0][1]/WordCount*100*10000)/10000,'%');
            else 
            console.log('\n',tuples2[0][0],'\t',tuples2[0][1],'\t\t',Math.floor(tuples2[0][1]/WordCount*100*10000)/10000,'%');
            relavence = relavence + tuples2[0][1];
            tuples2.shift();
        }
        console.log('===========================================================');
        console.log('\nTotal','\t\t\t',relavence ,'\t\t',Math.floor(relavence/WordCount*100*10000)/10000,'%');
        console.log('===========================================================');
        console.log('\nTotal Words\t\t',WordCount);
        console.log('===========================================================');
}
function frequency(str){ //gets frequency of Company names with Multi characters
    var words = str.replace(/[.]/g, '').split(/\s/);
    let temp1 = '';
    let words1 = [];
    for (let i=0; i <words.length;i++){
        if(words[i][0].toUpperCase() == words[i][0] && words[i]!='#')
        {
            if(words[i+1][0].toUpperCase() == words[i+1][0] && words[i+1]!='#')
            {
                if(words[i+2][0].toUpperCase() == words[i+2][0] && words[i+2]!='#')
                {
                    if(words[i+3][0].toUpperCase() == words[i+3][0] && words[i+3]!='#')
                    {
                        temp1 = words[i] + ' ' + words[i+1] + ' '+ words[i+2]+' '+words[i+3];
                        words1.push(temp1);
                        i = i +3;
                    }
                    else {
                        temp1 = words[i] + ' ' + words[i+1] + ' '+ words[i+2];
                        words1.push(temp1);
                        i = i +2;
                    }
                }
                else 
                {
                    temp1 = words[i] + ' ' + words[i+1];
                    words1.push(temp1);
                    i = i +1;
                }
            }
            else 
            {
                temp1 = words[i];
                words1.push(temp1);
            }
        }
        else 
        {
            words1.push(words[i]);
        }
    }
        words1.forEach(function(w){
        if (!freqs[w]) 
        {
             freqs[w] = 0;
        }
        freqs[w] += 1;
    });
    return freqs;
}
function frequency1(str){ //gets frequency of words
    var dummy = str.replace(/[.]/g, '').split(/\s/);
    dummy.forEach(function(w){
        if (!freqs1[w]) 
        {
             freqs1[w] = 0;
        }
        freqs1[w] += 1;
    });
    return freqs1;
}