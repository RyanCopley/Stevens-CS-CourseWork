/* references:
    https://gist.github.com/dineshrajpurohit/d14349fc48c6da937a04
    https://gist.github.com/mycodeschool/7867739
*/

let  postfixstr;
let answ= ""; 
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin,output: process.stdout});

//Function for assigning weights to operators.
function prec(ch){ 
  switch(ch){
      case '+' : return 1;
      case '-' : return 1;
      case '*' : return 2;
      case '/' : return 2;
      case '%' : return 2;
      case 'POW' : return 3;
      case '(' : return 0;
      default : return -1;
  }};

//Function for determining operator precedence.
function hashigherprec(op1,op2){
  let op1W = prec(op1);
	let op2W = prec(op2);
  return (op1W <= op2W) ? true : false;
  };
 
//Function to convert infix to postFix.
function convert(answ){
    postfixstr = '';
    let operandstack=[];
    let postfixQ= [];
    let r;
    let infixstr = answ;
    console.log('Entered Infix Expression is:', answ);
    let infixQ = infixstr.split(" ");
    while( infixQ.length > 0)
    { 
      r = infixQ[0];
      if(r>= 0 && r <= 999999999){ 
        r = parseFloat(infixQ[0]);
        }
        infixQ.splice(0,1);
      if(r>= 0 && r <= 999999999){  // 1
        postfixQ.push(r);   
      } else if (operandstack.length == 0){ //2
        operandstack.push(r);
      } else if (r== '('){    //3
        operandstack.push(r);
      } else if (r == ')'){   //4
        let s = operandstack.pop();
        operandstack.push(s);;
        while (s !=='(')
        {
          postfixQ.push(operandstack.pop());
          s = operandstack.pop();
          operandstack.push(s);
        }
        operandstack.pop();
      }
      else    //5
      {
        let q = operandstack.pop();
        operandstack.push(q);
        while(operandstack.length > 0 && q !=="(" && hashigherprec(r,q))
        { 
          postfixQ.push(q);
          operandstack.pop();
          q = operandstack.pop();
          operandstack.push(q);
        }
        operandstack.push(r);
      }
    }
    while(operandstack.length>0)
    {
        postfixQ.push(operandstack.pop());
    }
      postfixstr = postfixQ.join(" ");
      console.log('postfix expression of entered infix expression is: ', postfixQ.join(" "));
      solve(postfixstr);};
//Funcytion to read input
function infix (){
  
    rl.question('Enter quit to end the program or Please input your infix math problem: ', answ => {
      if(answ === 'quit' ){
          rl.close(); 
      }
      else { 
        convert (answ);
        }
    });
  };
//Function to solve the postfix expression
function solve (postfixstr){
  let postfix = postfixstr;
  let t =[];
  let resultstack = [];
  let result
  let splitpostfix = postfix.split(" ");
  while(splitpostfix.length > 0)
    {
      t =  splitpostfix[0];
      if(t>= 0 && t <= 999999999){
      t =  parseFloat(splitpostfix[0]);
      }
      splitpostfix.splice(0,1);
      if(t>= 0 && t <= 999999999)
      { 
        resultstack.push(t);
      } 
      else
      { 
        let a = resultstack.pop();
        let b = resultstack.pop();
        switch  ( t ) 
        {
          case '+': result = parseFloat(b)+parseFloat(a) ; break;
          case '-': result = parseFloat(b)-parseFloat(a) ; break;
          case '*': result = parseFloat(b)*parseFloat(a) ; break;
          case '/': result = parseFloat(b)/parseFloat(a) ; break;
          case '%': result = parseFloat(b)%parseFloat(a) ; break;
          case 'POW': result = Math.pow(parseFloat(b),parseFloat(a)) ; break;
        }
        resultstack.push(result);
      }
    }
  let finalresult = resultstack[0];
  console.log('solution of entered Infix Expression is: ',finalresult);
  evaluate();};
//Start the program
function evaluate(){
    infix();
  };
evaluate();