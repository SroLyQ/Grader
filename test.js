
const axios = require('axios')
const {
    checkResult
} = require('./run.js');
var code1 = `
#include<iostream>
using namespace std;
int main() {
    string input;
    int list[10];
    cin >> input;
    cout << input;
    return 0;
}
`
var testDummy1 = {
    input: 'Hello$.$World$.$HAHA$.$TEST$.$TEST$.$Whoami$.$bibi$.$eiei$.$thisisbug$.$lol',
    output: 'Hello$.$World$.$HAHA$.$TEST$.$TEST$.$Whoami$.$bibi$.$eiei$.$thisisbug$.$lol',
    sourceCode: code1
}

var code2 = `#include <stdio.h> 
            int main(){
                int n;
                scanf("%d",&n);
                for(int i=0;i<n;i++){
                    for(int j=0;j<n;j++){
                        printf("*");
                    }
                    printf("\\n");
                }
                return 0;
            }
    `
var testDummy2 = {
    input: `3$.$1$.$0$.$4`,
    output: `***
    ***
    ***$.$*
    $.$$.$****
    ****
    ****
    ****`,
    sourceCode: code2
}

var code3 = `
#include <stdio.h> 
            int main(){
               int n;
               scanf("%d",&n);
               for(int i=0;i<n;i++){
                   if(i%2==0){
                       printf("1 ");
                   }
                   else{
                       printf("0 ");
                   }
                }
                return 0;
            }
`
var testDummy3 = {
    input: `6$.$2`,
    output: `1 0 1 0 1 0$.$1 0 `,
    sourceCode: code3
}
//timeout testDummy
var code4 = `
#include <string.h>
#include "math.h"
#include <stdio.h>
int main(){
    int i;
    for(i=1;i<11;++i){
        printf("%d",i);
        if(i==2){
            return 0;
        }
    }
    return 0;
}
`

var testDummy4 = {
    input: '',
    output: `1`,
    sourceCode: code4
}

var code5 = `
#include <stdio.h> 
int main(){
    char a;
    int pp=99;
    int b[100000],c[100000],d[100000],h[100000];
    scanf(" %c",&a);
    while(pp--){
        printf("a;lkjshdfoiughy98qy23098674h190862h39841569-28365-19086724-9018y3-oeidhfo1iy-938n7e89017-39086eyr-908gyo1piwhroify-198ew6jnfmh9861-098e6h-90gn8y1-9ieyrhu1-tg9j8167-23498561082364078g108746509186204987-09v8y129084yfj109382467509186209jf09186h9083609156098612098630958idk9028h6n39586g1b-982639-816-ih1touihyi1uh64n5789f0189u3heiuyr0876098647-12984jm-9586b981nyh-983em8ut98oyuo2iy-9438567-8u3jr0-u123-171430957-09jfhn1-098347hn-561g9037yureiokh3t-189634-598ygn198364hn-51g\\n");
    }
    return 0;
}
`
//Out of buffer
var testDummy5 = {
    input: `6$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2`,
    output: `6$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2 `,
    sourceCode: code5
}
var code6=`#include <bits/stdc++.h>
using namespace std;
int main(){
    int a;
    scanf("%d",&a);
    printf("%d\\n",a);
    return 0;
}
`
var testDummy6 = {
    input:`1$.$2$.$3$.$2$.$3$.$2$.$3$.$2$.$3`,
    output:`1$.$2$.$3$.$2$.$3$.$2$.$3$.$2$.$3`,
    sourceCode:code6
}
async function tester() {
    console.log(await checkResult(code1,testDummy1.input,testDummy1.output));
    // var i;
    // const body = {
    //     code:`#include <stdio.h>
    //     int main(){
    //         int a;
    //         scanf("%d",&a);
    //         printf("%d\\n",a);
    //         return 0;
    //     }`,
    //     input : `1$.$2$.$3$.$2$.$3$.$2$.$3$.$2$.$3`,
    //     output : `1$.$2$.$3$.$2$.$3$.$2$.$3$.$2$.$3`,
    //     userId : `60ce02cdf95da466b8ac77f8`,
    //     questionId : `60d95503d8ac664aec4a6447`
    // }
    // for(i=0;i<20;i++){
    //     //console.log(body.code);
    //     axios.post('http://localhost:3400/check_result',{
    //         code : body.code,
    //         input : body.input,
    //         output : body.output,
    //         userId : body.userId,
    //         questionId : body.questionId
    //     })
    //     .then((response) => {
    //         console.log(response.data);
    //     },(error) =>{
    //         console.log(error);
    //     });
    // }
}
tester();