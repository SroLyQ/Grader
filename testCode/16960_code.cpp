#include"banned.h"
#include<iostream>
#include<vector>
#include<cmath>
using namespace std;
int main()
{
    double a,b,c;
    double x1,x2;
    cin >> a >> b >> c;
    x1=(-1*b+sqrt(b*b-4*a*c))/(2*a);
    x2=(-1*b-sqrt(b*b-4*a*c))/(2*a);
    if((b*b-4*a*c)<0)
        cout << "Error" << endl;
    else if(x1!=x2)
    {
        if(x1<x2)
            printf("x1 = %.2f, x2 = %.2f",x1,x2);
        else
            printf("x1 = %.2f, x2 = %.2f",x2,x1);
    }
    else
        printf("x = %.2f",x1);
    return 0;
}