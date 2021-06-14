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
    output: `***\n***\n***$.$*\n$.$$.$****\n****\n****\n****`,
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
var code6=`#include<stdio.h>
#include<string.h>
int main()
{
    int n,m;
    scanf("%d %d",&n,&m);
    char arr[n][m];
    char alp='A';
    char action[200];
    scanf("%s",&action);
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            arr[i][j]=alp;
        }
        alp++;
    }
    for(int i=0;i<strlen(action);i++)
    {
        if(i%2==1)
        {
            char temp;
            if(action[i-1]=='U')
            {
                for(int j=0;j<n-1;j++)
                {
                    temp=arr[j][action[i]-'0'];
                    arr[j][action[i]-'0']=arr[j+1][action[i]-'0'];
                    arr[j+1][action[i]-'0'] = temp;
                }
            }
            else if(action[i-1]=='D')
            {
                for(int j=n-1;j>0;j--)
                {
                    temp=arr[j][action[i]-'0'];
                    arr[j][action[i]-'0']=arr[j-1][action[i]-'0'];
                    arr[j-1][action[i]-'0'] = temp;
                }
            }
            else if(action[i-1]=='L')
            {
                for(int j=0;j<m-1;j++)
                {
                    temp=arr[action[i]-'0'][j];
                    arr[action[i]-'0'][j]=arr[action[i]-'0'][j+1];
                    arr[action[i]-'0'][j+1] = temp;
                }
            }
            else if(action[i-1]=='R')
            {
                for(int j=m-1;j>0;j--)
                {
                    temp=arr[action[i]-'0'][j];
                    arr[action[i]-'0'][j]=arr[action[i]-'0'][j-1];
                    arr[action[i]-'0'][j-1] = temp;
                }
            }
        }
    }
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
        {
            printf("%c",arr[i][j]);
        }
        printf("\\n");
    }
}
`
var testDummy6 = {
    input:`3 3
    U1U2L1R2D1$.$3 4
    U1U2U3L1$.$9 9
    U1L1U2L2D1D0D0D0U3R5L8D0R1$.$5 5
    D0D1D2D0L1L1L1L1R1R2L2$.$7 7
    L1U5U0$.$6 3
    U0U1U0U2L1L2R5`,
    output:`ACB
CBB
ACA$.$ABBB  
CCCB
CAAA$.$IABBAAAAA  
BGBCCBBBB
HBCDCCCCC
IDEEDDDDD
AEFFEEEEE
CDFGGFFFF
FGHHGGGGG
DHIIHHHHH
EAAIIIIIF$.$DEEAA
BBEAA
ABBCC
BCCDD
CDDEE$.$BAAAABA
CBBBBCB
DCCCCDC
EDDDDED
FEEEEFE
GFFFFGF
AGGGGAG$.$CBB
CCD
DDE
FEE
AFF
ABA`,
    sourceCode:code6
}
async function tester() {
    
    console.log(await checkResult(testDummy1));
    //console.log(await checkResult(testDummy2));
    //console.log(await checkResult(testDummy3));
    //console.log(await checkResult(testDummy4));
    //console.log(await checkResult(testDummy5));
    //console.log(await checkResult(testDummy6));
}
tester();