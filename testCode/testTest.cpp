#include <stdio.h>
#include <math.h>
#include "banned.h" 

int  a[1000],h[1000],mark[1000];
char b[1000][1000];
int main()
{
    int i,j=0,n,x=0,k=0,h1,ch=0,mx=1,mn=-1,ii,jj;
    scanf("%d",&n);
    if(n<0){
        printf("Error");
        return 0;
    }
    for(i=0;i<n;i++){
        k=j;
        scanf("%d",&h[i]);
        if(h[i]<0) ch=1;
        else ch=0;
        if(mx<h[i] && h[i] > 0) mx=h[i];
        if(h[i]<0 && h[i]<mn) mn=h[i];
        h[i]=abs(h[i]);
        h1=h[i];
        for(j=k;j<=k+(h[i]-1)*2;j+=2){
            mark[j]=ch;
            a[j]=h1;
            h1--;
        }
        x+=h[i];
    }
    for(j=0;j<x*2;j+=2){
        if(!mark[j]){
            ii=5000,jj=j;
            while(a[j]){
                b[ii][jj]='*';
                ii--,jj++;
                a[j]--;
            }
        }
        else if(mark[j]){
            ii=5000,jj=j;
            while(a[j]){
                b[ii][jj]='*';
                ii++,jj++;
                a[j]--;
            }
        }
    }
    for(i=5000-mx+1;i<5000-mn;i++){
        for(j=0;j<(x*2)-1;j++){
            if(b[i][j]!='*') printf(" ");
            else printf("%c",b[i][j]);
        }
        printf("\n");
    }
    return 0;
}

    