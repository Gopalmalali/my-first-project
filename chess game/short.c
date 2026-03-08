#include <stdio.h>
int main(){
    int j,temp,temp2,temp3,k;
    int shorting;
int aar[10],limit,i;
printf("entre the limit of the array\n");
scanf("%d",&limit);
printf("enter %d elements countinously\n",limit);
for(i=0;i<limit;i++){
scanf("%d",&aar[i]);
printf("acsess the element\n");
}
printf("this is the pattern of the array as you entered\n ");
for(i=0;i<limit;i++){
    printf("%d\t",aar[i]);
}
printf("\n");
printf("if you want to do shorting the elements press 1/N\n");
scanf("%d",&shorting);
temp=0;
temp2=0;
temp3=0;
if(shorting==1){
    for(i=0;i<limit;i++){
for(j=i+1;j<limit;j++){
if(aar[i]>aar[j]){
temp=aar[i];
aar[i]=aar[j];
aar[j]=temp;
}
}   }
for(i=0;i<limit;i++){
printf("\t %d",aar[i]);
}
}
return 0;
}