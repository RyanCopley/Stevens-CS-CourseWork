/* Read Me: 
1. This program is to generate Huffman Codes for characters in a given input file.
2. Input is read from infile.dat and Output is stored in outdile.dat.
3. Both input and output files are assumed to be present in the same folder where this program is present.
4. Input file contains text data whose characters should be encoded using huffman algorithim.
5. As described by the problem statment,all blanks, all punctuation marks, all special symbols are ignored.*/

// Priority Queue 
function PriorityQueue() {
    let collection = [];
    this.printCollection = function(){  //print function
        console.log(collection);
    };
    this.isEmpty = function(){  //used to check if queue is empty
        return (collection.length === 0);
    };
    this.size = function(){     //gives size of queue
        return collection.length;
    };
    this.dequeue = function(){  //removes first element of queue
        return collection.shift();
    };
    this.first = function(){ //custom function to remove braces
        return collection[[0]];
    };
    this.pop = function(){ //removes last element of queue
        return collection.pop();
    };
    this.unshift = function(element){   //adds element at the begining of queue
        return collection.unshift(element);
    };
    this.enqueue = function(element){   //adds element depending on its priority
        if (this.isEmpty()) {
        collection.push(element);} 
        else{
            let added = false;
            for (let i=0;i<collection.length;i++){
                if(element[0]<collection[i][0]){
                    collection.splice(i,0,element);
                    added = true;
                    break;
                }
            }
            if(!added){
            collection.push(element);
            }
        }
    };
    this.buildtree = function() {   //builds Huffman Tree
        while(array.size()>1){
            let a = array.dequeue();
            let b = array.dequeue();
            var leasttwo = [a[1],b[1]];
            var combfreq = a[0] + b[0];
            let ext = [combfreq,leasttwo];
            array.enqueue(ext);
        }
    return array
    };
    
}

// initialize the required variables
let fs= require('fs');
let char,char1,strlen,pairs;
let freqs={};
let tuples=[];
let tuples2=[];
let temp=[];
let codes = {};
let pat ='';
let total=0;
input();    // input function is invoked it returns a string of all characters present in iput file 
strlen= char.length;
if(strlen!=0){
    frequency(char1);   //frequency function is invoked which returns frequency of characters
    convertArray(freqs);    // frequencies are converted into an array of frequencies
    var tuples1 = new PriorityQueue()
    while(tuples.length>0){
        tuples1.enqueue(tuples[0]);
        tuples.shift();
    }
    fs.writeFileSync('outfile.dat','Symbol  Frequency \n');
    var array = new PriorityQueue()     //priority queue is initialized
    array = tuples1;
    let array1 = tuples1;
    let array2 = [];
    let tsize = array1.size();
    while(tsize>0){
        let t = array1.pop();
        array2.push(t);
        array1.unshift(t);
        tsize--;
    }
    for (i in array2){
        a= array2[i][1];
        b= array2[i][0];
        c = b/strlen*100;
        var saveData = '  '+a + ',     ' + c + ' % \n'; 
        fs.appendFileSync('outfile.dat', saveData);
    }
    array.buildtree();      // function to build tree is invoked
    firstElement = array.first();
    let tree = firstElement[1];
    assigncodes(tree,pat);  // function to assign codes is invoked
    let encode =[];
    fs.appendFileSync('outfile.dat','\n\nSymbol  Huffman Codes \n');
    for( var code in codes){
        encode.push([code,codes[code]]);
    }
    let len = array2.length;
    for (let i =0;i<len;i++){
        for(let j =0;j<len;j++){
            a= array2[i][1];
            b= encode[j][0];
            c = encode[j][1];
            d = array2[i][0];
            if (a==b){
                var saveData = '  '+a + ',     ' + c + ' \n'; 
                fs.appendFileSync('outfile.dat', saveData);
                total = total + (d*c.length);
                break;
            }
        }
    }
    fs.appendFileSync('outfile.dat','\n Total Bits: '+ total);
}
else
{
    console.log('No data in the input file')
}

function input(){ //reads data from the file 
    let data = fs.readFileSync('infile.dat','utf8', (err,data) => {
        if (err) throw err;
        console.log('Error !!');
    });
    char = data;
    char = char.replace(/[^a-zA-Z0-9]/g, "");
    char1 = char.split('').sort().join('');
    return char1;
}
function frequency(str){ //gets frequency of charachters
    for ( i in str){
        if(freqs[str[i]]==undefined){
            freqs[str[i]]=1;
        }
        else{
            freqs[str[i]]=freqs[str[i]]+1;
        }
    }
    return freqs;
}
function convertArray(freqs){   //converts input to an array
    for( var freq in freqs){
        tuples.push([freqs[freq],freq]);
    }
    return tuples;
}

function assigncodes(tree,pat){ //codes are assigned according to weights
    pat=pat || "";
    if (typeof tree==typeof ""){       
        codes[tree]=pat;
    }
    else{
        assigncodes(tree[0],pat+"0");
        assigncodes(tree[1],pat+"1");
    }
    return codes;
}
    

  
