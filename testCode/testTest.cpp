#include<stdio.h>
#include "banned.h" 


int main() {
	int n;
    int arr[10] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0,};
    while(1){ 
        scanf("%d", &n);
        if(n < 0 || n > 9){
            break;
        }
        arr[n] += 1;
    }
    for(int i=0;i<10;i++){
        printf("%d = %d\n", i, arr[i]);
    }
	return 0;
}