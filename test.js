const {
    checkResult
} = require('./run.js');

var code1 = `
#include<iostream>
using namespace std;
int main() {
    string input;
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
var code4 = `
#include <stdio.h> 
int main(){
    char a;
    scanf(" %c",&a);
    printf("%c",a);
    while(1);
    return 0;
}
`

var testDummy4 = {
    input: `6$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2`,
    output: `6$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2$.$2 `,
    sourceCode: code4
}

var code5 = `
#include<stdio.h>
int main()
{
    int n,m,x,y,i,j,ii,jj,iii,jjj;
    char a[100][100];
    scanf("%d %d",&n,&m);
    for(i=0; i<n; i++)
    {
        for(j=0; j<m; j++)
        {
            scanf(" %c",&a[i][j]);
        }
    }
    scanf("%d %d",&x,&y);
    ii=y,jj=x;
    while(ii>=0 && ii<n && jj>=0 && jj<m)
    {
        iii=ii,jjj=jj;
        if(a[ii][jj]=='N')
        {
            ii--;
        }
        else if(a[ii][jj]=='S')
        {
            ii++;
        }
        else if(a[ii][jj]=='E')
        {
            jj++;
        }
        else if(a[ii][jj]=='W')
        {
            jj--;
        }
        else if(a[ii][jj]=='P')
        {
            printf("NO");
            return 0;
        }
        a[iii][jjj]='P';
    }
    printf("YES\\n");

    return 0;
}
`

var testDummy5 = {
    input: `4 4 N W E S 
    W W N S 
     N S W E 
     W E N S 
     2 3$.$4 4 N W E S W W N S N S W E W S N S 2 3$.$10 10
    S E W W N E N E W W
    W W N E E E W S E N
    S N W W S N S N W E
    W E N N E W W W E N
    S N W W E S N N W S
    N E E N W E E N S S
    S W S N W W E N W N
    E E W W S S N N E W
    S W S W S W N E N N
    S N N N E N N N W N
    3 4`,
    output: `NO$.$YES$.$YES`,
    sourceCode: code5
}
var code6=`#include <bits/stdc++.h>
using namespace std;
int main(){
    int a;
    scanf("%d",%a);
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
    
    //console.log(await checkResult(testDummy1));
    //console.log(await checkResult(testDummy2));
    //console.log(await checkResult(testDummy3));
    //console.log(await checkResult(testDummy4));
    //console.log(await checkResult(testDummy5));
    //console.log(await checkResult(testDummy6));
    console.log(await checkResult(testDummy6))
}
tester();