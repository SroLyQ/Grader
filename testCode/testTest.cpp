
#include <stdio.h>
#include "banned.h" 
 
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
