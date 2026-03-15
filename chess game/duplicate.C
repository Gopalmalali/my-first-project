#include<stdio.h>
int main(){
    int j,arr[11],i,times=1,skip_arr[11],size=0,skip=0,n;
    printf("enter the size of array\n");
    scanf("%d",&n);
    printf("enter array elements\n");
    for(i=0;i<n;i++){
            scanf("%d",&arr[i]);
        }
    printf("processing to find dublicates.....\n");
    printf("now : \n");

    for(i=0;i<n;i++){
        for(j=0;j<=size;j++){
            if(skip_arr[j]==i){
                skip=1;
            }
        }
        if(skip==1){
            skip=0;
            continue;
        }
        for(j=i+1;j<n;j++){
            if(arr[i]==arr[j]){
                skip_arr[size]=j;
                size++;
                times++;
            }
        }
        if(times>1){
          printf("\n");
            printf("%d is repeats %d times\n ",arr[i],times);
            times=1;
        }

    }
return 0;

}