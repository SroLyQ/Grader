#include<stdio.h>
#include<string.h>
#include "banned.h" 

int main(){
	char string[100];
	scanf("%[^\n]",string);
	for(int i=0;i<strlen(string);i++){
		if((string[i]>=65&&string[i]<=90&&string[i+1]>=48&&string[i+1]<=57)||(string[i]>=97&&string[i]<=122&&string[i+1]>=48&&string[i+1]<=57)){
			for(int j=0;j<string[i+1]-48;j++){
				printf("%c",string[i]);
			}
		}
		else if(string[i]>=48&&string[i]<=57);
		else{
			printf("%c",string[i]);	
		}
	}
	return 0;
}