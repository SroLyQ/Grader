#include <iostream>
#include"banned.h"


using namespace std;
int main()
{

    int n;
    cin>>n;
    for(int i=0;i<n;i++)
    {
        cout<<"*";
    }
    cout<<endl;
    int st=1,en=n-2;
    for(int i=1;i<n-1;i++)
    {
        for(int j=0;j<n;j++)
        {
            if(j==st||j==en||j==0||j==n-1)
                cout<<"*";
            else
                cout<<" ";
        }
        if(i<n/2) st++,en--;
        else st--,en++;

        cout<<endl;
    }
    for(int i=0;i<n;i++)
    {
        cout<<"*";
    }

    return 0;

}